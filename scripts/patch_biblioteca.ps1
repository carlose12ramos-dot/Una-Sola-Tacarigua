$content = @'
import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Play, X, Search, BookOpen, Music, Film, Download, ExternalLink, FileText, Image } from 'lucide-react';
import styles from './BibliotecaModule.module.css';
import { bibliotecaMock } from '../data/mockData';
import librosAutoData from '../data/librosAuto.json';
import musicaAutoData from '../data/musicaAuto.json';
import videosAutoData from '../data/videosAuto.json';
import documentosAutoData from '../data/documentosAuto.json';
import imagenesAutoData from '../data/imagenesAuto.json';
'@

$original = [System.IO.File]::ReadAllText((Resolve-Path 'src\views\BibliotecaModule.jsx').Path, [System.Text.Encoding]::UTF8)

# Replace the old imports block (lines 1-9)
$oldImports = "import { useState, useEffect, useMemo } from 'react';
import { Play, X, Search, BookOpen, Music, Film, Download, ExternalLink, FileText, Image } from 'lucide-react';
import styles from './BibliotecaModule.module.css';
import { bibliotecaMock } from '../data/mockData';
import librosAutoData from '../data/librosAuto.json';
import musicaAutoData from '../data/musicaAuto.json';
import videosAutoData from '../data/videosAuto.json';
import documentosAutoData from '../data/documentosAuto.json';
import imagenesAutoData from '../data/imagenesAuto.json';"

$newImports = "import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Play, X, Search, BookOpen, Music, Film, Download, ExternalLink, FileText, Image } from 'lucide-react';
import styles from './BibliotecaModule.module.css';
import { bibliotecaMock } from '../data/mockData';
import librosAutoData from '../data/librosAuto.json';
import musicaAutoData from '../data/musicaAuto.json';
import videosAutoData from '../data/videosAuto.json';
import documentosAutoData from '../data/documentosAuto.json';
import imagenesAutoData from '../data/imagenesAuto.json';"

$oldSection = '    <section className={styles.container} id="biblioteca">'
$newSection = '    <motion.section
      className={styles.container}
      id="biblioteca"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Biblioteca | Una Sola Tacarigua</title>
        <meta name="description" content="Accede a libros historicos, musica, documentos y fotos de la comunidad de Tacarigua." />
      </Helmet>'

$oldClose = '    </section>
  );
}

export default BibliotecaModule;'
$newClose = '    </motion.section>
  );
}

export default BibliotecaModule;'

$patched = $original.Replace($oldImports, $newImports).Replace($oldSection, $newSection).Replace($oldClose, $newClose)

[System.IO.File]::WriteAllText(
    (Resolve-Path 'src\views\BibliotecaModule.jsx').Path,
    $patched,
    [System.Text.Encoding]::UTF8
)
Write-Host "BibliotecaModule.jsx actualizado exitosamente."
