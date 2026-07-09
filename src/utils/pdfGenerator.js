import jsPDF from 'jspdf';

// Utility to convert image URL to base64
const getBase64Image = (imgUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const isPNG = typeof imgUrl === 'string' && imgUrl.toLowerCase().endsWith('.png');
      const format = isPNG ? 'image/png' : 'image/jpeg';
      const dataURL = canvas.toDataURL(format);
      resolve(dataURL);
    };
    img.onerror = error => reject(error);
    img.src = imgUrl;
  });
};

const LOGO_URL = '/images/logotacarigua.png';
let logoBase64 = null;

const getLogo = async () => {
  if (logoBase64) return logoBase64;
  try {
    logoBase64 = await getBase64Image(LOGO_URL);
  } catch {
    logoBase64 = null;
  }
  return logoBase64;
};

const addWatermark = (doc) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const savedSize = doc.getFontSize();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(40);
  doc.setTextColor(210, 210, 210);

  const text = 'Una Sola Tacarigua';
  const cx = pageWidth / 2;
  const cy = pageHeight / 2;

  doc.text(text, cx + 20, cy, { angle: -30, align: 'center' });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(savedSize);
};

const addFooter = (doc) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.setFont('helvetica', 'normal');
  doc.text('Una Sola Tacarigua — Catálogo de Cultores', pageWidth / 2, pageHeight - 10, {
    align: 'center',
  });
  doc.setTextColor(0);
};

const addCultorToPDF = async (doc, cultor, startY = 20) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let currentY = startY;

  addWatermark(doc);
  addFooter(doc);

  // 1. Add Image
  if (cultor.imagen) {
    try {
      const imgData = await getBase64Image(cultor.imagen);
      const imgSize = 50;
      const xOffset = (pageWidth - imgSize) / 2;
      const isPNG = cultor.imagen.toLowerCase().endsWith('.png');
      doc.addImage(imgData, isPNG ? 'PNG' : 'JPEG', xOffset, currentY, imgSize, imgSize);
      currentY += imgSize + 10;
    } catch (error) {
      console.warn(`Failed to load image for ${cultor.nombre}:`, error);
      currentY += 10;
    }
  } else {
    currentY += 10;
  }

  // 2. Add Name
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  const nameWidth = doc.getTextWidth(cultor.nombre);
  doc.text(cultor.nombre, (pageWidth - nameWidth) / 2, currentY);
  currentY += 8;

  // 3. Add Discipline and Speciality
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const disciplineText = `${cultor.disciplina} | ${cultor.especialidad}`;
  const discWidth = doc.getTextWidth(disciplineText);
  doc.text(disciplineText, (pageWidth - discWidth) / 2, currentY);
  currentY += 6;

  // 4. Add Location and Years
  doc.setFontSize(10);
  doc.setTextColor(100);
  const infoText = `${cultor.localidad} | ${cultor.anios} ${cultor.bandera || ''}`;
  const infoWidth = doc.getTextWidth(infoText);
  doc.text(infoText, (pageWidth - infoWidth) / 2, currentY);
  currentY += 12;

  doc.setTextColor(0);

  // 5. Add Biography
  doc.setFontSize(11);
  const bioContent = Array.isArray(cultor.descripcion)
    ? cultor.descripcion.join('\n\n')
    : cultor.descripcion;

  const textLines = doc.splitTextToSize(bioContent, pageWidth - (margin * 2));

  for (let i = 0; i < textLines.length; i++) {
    if (currentY > pageHeight - margin) {
      doc.addPage();
      addWatermark(doc);
      addFooter(doc);
      currentY = margin;
    }
    doc.text(textLines[i], margin, currentY);
    currentY += 6;
  }

  return currentY;
};

const addCoverPage = async (doc, title, subtitle) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  addWatermark(doc);

  // Logo
  try {
    const logo = await getLogo();
    if (logo) {
      const logoSize = 40;
      const xOffset = (pageWidth - logoSize) / 2;
      doc.addImage(logo, 'PNG', xOffset, 40, logoSize, logoSize);
    }
  } catch {
    // silently skip logo
  }

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('Una Sola Tacarigua', pageWidth / 2, 100, { align: 'center' });

  doc.setFontSize(18);
  doc.text(title, pageWidth / 2, 115, { align: 'center' });

  if (subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(subtitle, pageWidth / 2, 130, { align: 'center' });
  }

  addFooter(doc);
};

export const generateCultorPDF = async (cultor) => {
  const doc = new jsPDF();

  await addCoverPage(doc, 'Biografía', cultor.nombre);

  doc.addPage();
  await addCultorToPDF(doc, cultor, 20);

  doc.save(`${cultor.nombre.replace(/\s+/g, '_')}_Biografia.pdf`);
};

export const generateAllCultoresPDF = async (cultores) => {
  const doc = new jsPDF();

  await addCoverPage(doc, 'Catálogo General de Cultores', `Total: ${cultores.length} cultores`);

  for (let i = 0; i < cultores.length; i++) {
    doc.addPage();

    await addCultorToPDF(doc, cultores[i], 20);
  }

  doc.save('Catalogo_General_Cultores.pdf');
};
