// src/data/mockData.js
// Datos culturales y patrimoniales de la Parroquia Guevara, Isla de Margarita

export const homeCardsMock = [
  {
    id: 1,
    tipo: 'memoria',
    titulo: 'La Iglesia de Tacarigua',
    descripcion: 'Construida en el siglo XVIII, la Iglesia de Nuestra Señora del Pilar de Tacarigua es el corazón espiritual de la Parroquia Guevara. Su arquitectura colonial y su icónica plaza hexagonal forman un conjunto patrimonial único en Margarita.',
    imagen: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    tipo: 'agenda',
    titulo: 'Fiestas de la Virgen del Pilar',
    descripcion: 'Cada mes de octubre, la comunidad de Tacarigua celebra sus fiestas patronales en honor a la Virgen del Pilar con misas solemnes, procesiones, jotas, polos y malagueñas. Una tradición viva de más de 300 años.',
    imagen: null
  },
  {
    id: 3,
    tipo: 'sugerencia',
    titulo: 'Sugerencia Aprobada: Mapa de Caseríos',
    descripcion: 'La comunidad ha aprobado la incorporación de un mapa interactivo con los caseríos históricos de Tacarigua, El Salado, San Sebastián y Lagunita, enriqueciendo el módulo de Geografía.',
    imagen: null
  }
];

export const cultoresMock = [
  {
    id: 1,
    nombre: 'Maestro Antonio Salazar',
    disciplina: 'Luthier',
    especialidad: 'Cuatro venezolano y mandolina',
    localidad: 'Tacarigua',
    anios: '40 años de oficio',
    bandera: '🇻🇪',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    descripcion: 'Maestro luthier cuya familia lleva cuatro generaciones fabricando el cuatro venezolano en Tacarigua. Cada instrumento es tallado a mano en maderas locales.'
  },
  {
    id: 2,
    nombre: 'Doña Carmen Rodríguez',
    disciplina: 'Artesana',
    especialidad: 'Cerámica y alfarería tradicional',
    localidad: 'San Sebastián',
    anios: '35 años de oficio',
    bandera: '🇻🇪',
    imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    descripcion: 'Alfarera que preserva la técnica prehispánica de modelado con arcilla del valle de Tacarigua, produciendo piezas utilitarias y decorativas con diseños tradicionales margariteños.'
  },
  {
    id: 3,
    nombre: 'Maestro José Gregorio Fermín',
    disciplina: 'Músico',
    especialidad: 'Polo y Galerón margariteño',
    localidad: 'Tacarigua',
    anios: '50 años de oficio',
    bandera: '🇻🇪',
    imagen: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
    descripcion: 'Reconocido intérprete del polo margariteño, género declarado Patrimonio Cultural Inmaterial. Ha participado en numerosos festivales nacionales representando la identidad musical de Guevara.'
  },
  {
    id: 4,
    nombre: 'Maestra Rosa Marcano',
    disciplina: 'Tejedora',
    especialidad: 'Hamacas y chinchorros',
    localidad: 'El Salado',
    anios: '28 años de oficio',
    bandera: '🇻🇪',
    imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    descripcion: 'Maestra tejedora de hamacas y chinchorros en fibra de moriche y algodón. Su técnica, heredada de su abuela, es parte esencial del patrimonio textil de la Parroquia Guevara.'
  },
  {
    id: 5,
    nombre: 'Maestro Luis Velásquez',
    disciplina: 'Pescador Artesanal',
    especialidad: 'Construcción de peñeros y red de atarraya',
    localidad: 'Lagunita',
    anios: '45 años de oficio',
    bandera: '🇻🇪',
    imagen: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop',
    descripcion: 'Constructor de peñeros artesanales y tejedor de redes de atarraya. Preserva la tradición de pesca costera margariteña transmitida oralmente de generación en generación.'
  },
  {
    id: 6,
    nombre: 'Maestra Inés Gutiérrez',
    disciplina: 'Cocinera Tradicional',
    especialidad: 'Gastronomía margariteña',
    localidad: 'Tacarigua',
    anios: '30 años de oficio',
    bandera: '🇻🇪',
    imagen: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    descripcion: 'Guardiana de las recetas tradicionales de la Parroquia: sancocho de pescado, empanadas de cazón, buñuelos de yuca y dulce de leche. Organizadora de la Feria Gastronómica anual.'
  }
];

export const historiaMock = [
  {
    id: 1,
    anio: 'Siglo XV',
    activo: true,
    titulo: 'Los Pueblos Guaiqueríes',
    descripcion: 'Antes de la conquista española, las costas y valles de Margarita estaban habitados por los Guaiqueríes, hábiles pescadores y navegantes. En el valle de Tacarigua establecieron asentamientos que aprovechaban los suelos fértiles y las fuentes de agua subterránea.',
    imagen: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=300&fit=crop',
    tag: 'Período Prehispánico'
  },
  {
    id: 2,
    anio: '1525',
    activo: true,
    titulo: 'La Colonización Española',
    descripcion: 'Los españoles establecen misiones y encomiendas en la isla de Margarita. La Parroquia Guevara comienza a configurarse como asentamiento colonial alrededor de una capilla doctrinera, donde convergen familias de colonos, Guaiqueríes y pobladores afrodescendientes.',
    imagen: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600&h=300&fit=crop',
    tag: 'Época Colonial'
  },
  {
    id: 3,
    anio: '1700s',
    activo: true,
    titulo: 'Fundación de la Parroquia Guevara',
    descripcion: 'Se formaliza la Parroquia eclesiástica de Tacarigua bajo la advocación de Nuestra Señora del Pilar. Se construye la iglesia colonial y se diseña la distintiva plaza hexagonal que organiza el centro del pueblo. Familias fundadoras como los Marcano, Fermín y Velásquez se establecen en los caseríos circundantes.',
    imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop',
    tag: 'Fundación'
  },
  {
    id: 4,
    anio: '1810',
    activo: true,
    titulo: 'La Independencia y Margarita',
    descripcion: 'Margarita juega un papel crucial en la independencia venezolana. La isla fue proclamada libre el 4 de mayo de 1810 y sirvió de refugio y base estratégica para el Libertador Simón Bolívar. Hombres de Tacarigua se unieron a las filas patriotas.',
    imagen: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=300&fit=crop',
    tag: 'Independencia'
  },
  {
    id: 5,
    anio: '1974',
    activo: true,
    titulo: 'Declaratoria del Parque Nacional Cerro Copey',
    descripcion: 'El cerro más alto de Margarita (917 m.s.n.m.), colindante con la Parroquia Guevara, es declarado Parque Nacional. Esta decisión protege las fuentes de agua que abastecen a Tacarigua y preserva la biodiversidad única del bosque húmedo de montaña de la isla.',
    imagen: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=300&fit=crop',
    tag: 'Patrimonio Natural'
  },
  {
    id: 6,
    anio: '2024',
    activo: true,
    titulo: 'Proyecto Tacarigua Digital',
    descripcion: 'Se inicia el proyecto de implantación de la plataforma geocultural "Tacarigua Digital", la primera iniciativa digital de la Parroquia Guevara para preservar, moderar y difundir la memoria histórica, el patrimonio cultural y las tradiciones vivas de la comunidad.',
    imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop',
    tag: 'Era Digital'
  }
];

export const bibliotecaMock = [
  {
    id: 1,
    titulo: 'Polo Margariteño — Tradición Viva',
    autor: 'Maestro José Gregorio Fermín',
    categoria: 'Canto Traditional',
    formato: 'Música',
    descripcion: 'Colección de polos margariteños interpretados por el Maestro Fermín, incluyendo "El Polo del Morro" y "La Bella Margarita". Grabación de archivo comunitario.',
    duracion: '4:23',
    imagen: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    titulo: 'Jotas y Malagueñas de Guevara',
    autor: 'Conjunto Folclórico Parroquia Guevara',
    categoria: 'Música Traditional',
    formato: 'Música',
    descripcion: 'Interpretaciones en vivo del Conjunto Folclórico durante las Fiestas Patronales de la Virgen del Pilar, 2019. Incluye jotas, malagueñas y puntos de llano.',
    duracion: '12:47',
    imagen: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    titulo: 'Galerón del Pescador',
    autor: 'Luis Velásquez y Voces del Mar',
    categoria: 'Poesía Cantada',
    formato: 'Música',
    descripcion: 'El galerón, manifestación poética y musical de Margarita, en la voz de pescadores artesanales de Lagunita. Una muestra del ingenio oral de la cultura margariteña.',
    duracion: '6:15',
    imagen: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop'
  },
  {
    id: 4,
    titulo: 'Crónicas de la Parroquia Guevara',
    autor: 'Prof. María Antonia Millán',
    categoria: 'Historia Local',
    formato: 'Libros',
    descripcion: 'Recopilación histórica de la Parroquia Guevara desde la época precolombina hasta el siglo XX. Incluye relatos orales de los habitantes más antiguos y fotografías de archivo.',
    paginas: '187 págs.',
    imagen: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop'
  },
  {
    id: 5,
    titulo: 'La Artesanía Margariteña: Técnicas y Significados',
    autor: 'Instituto del Patrimonio Cultural',
    categoria: 'Artesanía',
    formato: 'Libros',
    descripcion: 'Estudio etnográfico sobre las técnicas artesanales de la Isla de Margarita: tejido, alfarería, cestería y construcción naval artesanal. Publicación del IPC, 2015.',
    paginas: '124 págs.',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop'
  },
  {
    id: 6,
    titulo: 'Fiestas Patronales de Tacarigua 2022',
    autor: 'Comunidad Parroquia Guevara',
    categoria: 'Patrimonio Vivo',
    formato: 'Videos',
    descripcion: 'Registro audiovisual de las fiestas en honor a la Virgen del Pilar. Incluye la procesión, serenatas y la tradicional quema de fuegos artificiales en la plaza hexagonal.',
    duracion: '28:10',
    imagen: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=100&h=100&fit=crop'
  },
  {
    id: 7,
    titulo: 'El Arte del Cuatro Venezolano',
    autor: 'Maestro Antonio Salazar',
    categoria: 'Luthería',
    formato: 'Videos',
    descripcion: 'Documental que muestra el proceso completo de fabricación de un cuatro venezolano en el taller del Maestro Salazar: selección de maderas, tallado, ensamblado y afinación.',
    duracion: '45:30',
    imagen: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=100&h=100&fit=crop'
  }
];

export const adminMetricsMock = {
  usuariosActivos: '1,245',
  cultoresValidados: '88',
  sugerenciasPendientes: '14',
  elementosBiblioteca: '247'
};

export const adminModerationMock = [
  {
    id: 1,
    usuario: 'Carlos Eduardo Ramos González',
    tipo: 'Nuevo Cultor',
    detalles: 'Propone agregar al Sr. Pedro Mata (Caserío El Salado) como tejedor de sombreros de palma al directorio de cultores. Adjunta fotografías y reseña biográfica.',
    estado: 'Pendiente',
    prioridad: 'alta',
    fecha: '2024-10-15',
    imagen: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
  },
  {
    id: 2,
    usuario: 'María Valentina Espinoza',
    tipo: 'Corrección Histórica',
    detalles: 'Sugiere corregir la fecha de fundación de la Capilla del Caserío San Sebastián de 1820 a 1798, según documento parroquial original que adjunta en PDF.',
    estado: 'Pendiente',
    prioridad: 'media',
    fecha: '2024-10-14',
    imagen: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop'
  },
  {
    id: 3,
    usuario: 'José Luis Marcano',
    tipo: 'Aporte Multimedia',
    detalles: 'Donación de 15 fotografías analógicas digitalizadas de la procesión de la Virgen del Pilar de los años 1975-1985. Material histórico de gran valor documental.',
    estado: 'Pendiente',
    prioridad: 'alta',
    fecha: '2024-10-12',
    imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
  }
];
