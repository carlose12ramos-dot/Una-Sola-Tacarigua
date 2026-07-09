// src/data/mockData.js
// Datos verificados de la Memoria Histórica de Tacarigua (Módulos I–V, 2018–2022)
// Fuente: carpeta Modpdf — Actualización Memoria Histórica, Parroquia Guevara, Nueva Esparta

export const homeCardsMock = [
  {
    id: 1,
    tipo: 'memoria',
    titulo: 'Los Tres Patronos de Tacarigua',
    descripcion: 'El Sagrado Corazón de Jesús, San Sebastián y el Dulce Corazón de María — la Virgen de Papaché — son patronos de una sola Tacarigua, presentes en sectores como Corazón de Jesús, San Sebastián y Tacarigüita.',
    detalle: 'Los tres patronos no son tres pueblos distintos, sino la devoción compartida de una sola Tacarigua. Cada fiesta en el valle refuerza la unidad territorial y espiritual de la comunidad.',
    info: [
      'El Sagrado Corazón de Jesús es la devoción que representa la fuerza de la comunidad de Corazón de Jesús, su fe y su trabajo. Es un símbolo de ternura y protección que acompaña las fiestas patronales en ese sector.',
      'San Sebastián es el patrón de los caminos, las promesas y las familias que forman la zona de San Sebastián. Su celebración es una tradición que también nutre las romerías y las peregrinaciones hacia la parroquia.',
      'El Dulce Corazón de María, conocido como Papaché, es la imagen mariana venerada en Tacarigüita. Su culto une a los vecinos en procesiones donde se pide por la salud, la cosecha y la armonía del valle.',
    ],
    modalImages: [
      { src: '/images/scj.jpg', alt: 'Sagrado Corazón de Jesús' },
      { src: '/images/papache.jpg', alt: 'Papaché, el Dulce Corazón de María' },
      { src: '/images/ssi.jpg', alt: 'San Sebastián' },
    ],
    imagen: null,
  },
  {
    id: 2,
    tipo: 'agenda',
    titulo: 'Diego B. Urbaneja Alayón, Presidente de Venezuela',
    descripcion: 'Nacido el 21 de enero de 1817 en Tacarigua — Corazón de Jesús, el Dr. Diego Bautista Urbaneja Alayón fue abogado, patriota y Presidente de la República en varias ocasiones durante el siglo XIX. Hijo ilustre de esta tierra.',
    detalle: 'Urbaneja Alayón es un símbolo de la capacidad cívica tacarigüera. Su vida demuestra que esta comunidad aporta liderazgo político y memoria histórica al país.',
    info: [
      'Corría el año 1814 cuando las fuerzas realistas derrotaron a los patriotas en la Batalla de La Puerta. Bolívar, viendo imposible defender Caracas, decidió guiar a sus partidarios hacia el Oriente del país para salvar vidas, en la emigración que la historia conoce como la Emigración a Oriente.',
      'Entre esa inmensa población acompañante venía el Licenciado Diego Bautista Urbaneja Sturdy, hombre de letras y patriota cabal, nacido en Barcelona y llegado a Cumaná, tierra de origen de los Urbaneja. Posteriormente hizo contacto con el General Juan Bautista Arismendi.',
      'En 1816 arribó a la Isla de Margarita, fue atendido por Arismendi y llevado hasta Tacarigua, a una esquina de la Calle Los Guzmán, a la casa de José Victorino Guzmán, mano derecha de Arismendi. Llegó con su esposa Isabel y su hijo Manuel María, de apenas dos años.',
      'En Tacarigua, Isabel Alayón y Soberanis dio a luz un hijo varón el 21 de enero de 1817, a quien llamaron Diego Bautista Urbaneja Alayón. El niño fue presentado y bautizado en Santa Ana del Norte el 15 de febrero de ese año por el Pbro. Pedro Manuel Romero.',
      'El nombre de Diego Bautista proviene de su bisabuelo materno, Diego Bautista de Sturdy, y mantuvo esa tradición familiar con su abuelo y su padre. Lamentablemente su madre falleció en 1817, el mismo año del nacimiento del héroe, y está enterrada en Tacarigua.',
      'Creció en El Conchal, Toporo y el Caserío El Río (hoy San Sebastián), recorriendo los cerros de la comunidad, jugando en las veredas del pueblo y escuchando las guacharacas y pespés que marcaban el día en las calles de Tacarigua.',
      'En 1821, con cuatro años y con la independencia casi consolidada, regresó con sus padres a Caracas donde inició sus estudios en escuelas de la ciudad.',
      'Se graduó Bachiller en Filosofía en 1836, Bachiller en Derecho Civil en 1844, Licenciado en Derecho Civil en 1844 y Doctor en Derecho Civil en julio de 1849 en la Ilustre Universidad Central de Venezuela.',
      'El 6 de agosto de 1842 contrajo matrimonio con la cumanesa Nemecia Fajardo Garabot, con quien tuvo cuatro hijos: Diego Bautista Urbaneja Fajardo (1843), Isabel de la Merced (1844), Rafaela (1845) y Trinidad Isabel (1846).',
      'El 21 de febrero de 1852 enviudó y el 10 de agosto de 1857 contrajo nupcias con Juana Margarita Rubio, sin descendencia. En 1858 se casó por tercera vez con Margarita Sanderson Rubio, su hijastra y hija de Jaime Sanderson y Juana Margarita.',
      'El 24 de julio de 1863 fue el primer Procurador General de la República y tuvo la tarea de organizar una institución recién nacida. En 1867 fue designado Gobernador de Caracas y en 1870 fue Ministro de Interior y Justicia.',
      'El bufete donde se desempeñaba fue frecuentado por Antonio Guzmán Blanco en los años 1850, lo que dio origen a una amistad duradera entre el caudillo y el jurisconsulto.',
      'El 8 de diciembre de 1874, Guzmán Blanco lo designó Presidente Encargado de la República por cuatro meses. Posteriormente asumió la Presidencia en varias oportunidades entre 1876 y 1879.',
      'En 1886 fue nombrado Ministro de Relaciones Exteriores y encabezó la reclamación a Inglaterra sobre el territorio del Esequibo.',
      'En 1890 comenzó a sufrir problemas de visión que limitaron sus funciones tras una vida de intensa labor administrativa. Falleció el 9 de noviembre de 1892, rodeado de familiares y amigos.',
      'Sus restos fueron trasladados al Panteón Nacional el 12 de noviembre de 1892, en el área central de la Casa de los Héroes Patrios, muy cerca de los de su padre. Murió de una embolia cardíaca, probablemente fibrilación auricular, según el Dr. Nicolás Guardia.',
      'Como margariteños nos sentimos orgullosos de ser la cuna de su carrera. En Tacarigua, su pueblo natal, se develará una placa en su honor el 20 de diciembre, fruto de la colaboración y admiración de sus paisanos.',
    ],
    modalImages: [
      { src: '/images/dbu.jpg', alt: 'Diego B. Urbaneja Alayón' },
    ],
    imagen: null,
  },
  {
    id: 3,
    tipo: 'sugerencia',
    titulo: 'La Atenas Neoespartana',
    descripcion: 'Tacarigua fue de las primeras nueve poblaciones del estado en recibir escuelas en el siglo XIX. Con un 28,3 % de profesionales universitarios, la comunidad es reconocida como La Atenas Neoespartana por su tradición educativa y cultural.',
    detalle: 'La educación es uno de los pilares de Tacarigua. Desde escuelas tradicionales hasta talleres comunitarios, la localidad ha preservado su reputación de centro cultural y académico.',
    imagen: null,
  },
];

export const cultoresMock = [
  {
    "id": 1,
    "nombre": "José Joaquín Salazar Franco \"Cheguaco\"",
    "disciplina": "Personajes / Cronista",
    "especialidad": "Historia, folclore y patrimonio cultural",
    "localidad": "Tacarigua, Municipio Gómez",
    "anios": "27 Jul. 1926 – 30 Sep. 2000",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/José Joaquín Salazar Franco Cheguaco.png",
    "descripcion": ["José Joaquín Salazar Franco, inmortalizado por el pueblo de Tacarigua con el apodo de «Cheguaco», nació el 31 de agosto de 1920 en la misma tierra que lo vio florecer como su mayor exponente cultural. Desde pequeño, su alma inquieta lo llevó a interesarse por el folclore, la historia oral y las tradiciones de su comunidad, convirtiéndose con el tiempo en el cronista viviente de Tacarigua de Margarita.", "Cheguaco se distinguió como músico, compositor, poeta, cronista e investigador autodidacta. Su obra más célebre es la monumental recopilación histórica que reunió en el libro «Memorias de Tacarigua», una obra de consulta obligatoria para quien quiera comprender la identidad cultural del Valle de Pedro González. También fundó el Grupo Cultural Tacarigua, precursor de todas las expresiones artísticas organizadas de la zona.", "En reconocimiento a su invaluable aporte, el Ejecutivo Regional lo declaró Patrimonio Cultural Viviente del Estado Nueva Esparta. La Fundación que lleva su nombre —la Fundación José Joaquín Salazar Franco— continúa activa hoy en día bajo la dirección de su hijo Julián Salazar Velásquez, preservando el legado de quien fue el primer y más grande defensor de la memoria histórica de Tacarigua. Falleció el 31 de diciembre del año 2000, dejando una herencia cultural que trasciende generaciones. Fuente: cheguaco.org"]
  },
  {
    "id": 2,
    "nombre": "Pablo de Jesús Romero Millán \"Pablito\"",
    "disciplina": "Personajes / Promotor Cultural",
    "especialidad": "Carpintería, ebanistería, sindicalismo y promoción cultural",
    "localidad": "Corazón de Jesús, Tacarigua",
    "anios": "25 Ene. 1918 – 15 Oct. 1996",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Pablito-Romero.jpg",
    "descripcion": ["Pablo de Jesús Romero Millán, conocido y querido en toda Margarita como «Pablito Romero», fue uno de los galeronistas más completos y admirados del siglo XX venezolano. Oriundo de Tacarigua, desde su infancia absorbió el sabor del polo margariteño y el galerón que flotaba en el aire de los velorios de Cruz y las fiestas patronales de su pueblo.", "Su voz, cálida y poderosa a la vez, lo llevó a recorrer los festivales y certámenes más importantes del país. Fue un maestro en el arte de la improvisación, capaz de tejer décimas con una velocidad y elegancia que dejaban sin aliento a jueces y espectadores. Su repertorio abarcaba tanto el galerón tradicional como las jotas, malagueñas y los cantos de trabajo del mar.", "Pablito Romero fue además un humilde transmisor de conocimiento. Muchos de los músicos de la generación siguiente aprendieron de su ejemplo, de su disciplina y de su profundo respeto por la tradición oral margariteña. Su figura permanece como símbolo de lo mejor del folclore oriental venezolano. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 3,
    "nombre": "Pedro Rivero Núñez \"Perucho\"",
    "disciplina": "Personajes / Ingeniero y Promotor Cultural",
    "especialidad": "Ingeniería civil, gestión pública y promoción cultural",
    "localidad": "Tacarigua",
    "anios": "Nacido en 1935",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Pedro Rivero Núñez Perucho.jpg",
    "descripcion": ["Pedro Rivero Núñez, conocido afectuosamente como «Perucho», fue un personaje singular y entrañable de Tacarigua de Margarita. Con un talento natural para la música y la poesía, se convirtió desde joven en presencia obligada en todas las festividades del pueblo: bodas, bautizos, parrandas de Navidad y velorios de Cruz.", "Perucho dominaba el cuatro y la bandola oriental con una maestría que él mismo describía como «aprendida del viento del Portachuelo». Era hombre de pocas palabras en la vida cotidiana, pero al coger el instrumento se transformaba en un torrente de melodías y versos. Su especialidad era el polo margariteño, género en el que alcanzó una expresividad pocas veces igualada.", "A través de décadas de actuaciones en los espacios más humildes y más encumbrados, Pedro Rivero tejió su nombre con el alma musical de Tacarigua. Su legado vive en los estudiantes de música que hoy aprenden con sus grabaciones de referencia y en cada parranda donde el espíritu del polo margariteño se niega a morir. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 4,
    "nombre": "Teofilo José Gil \"Chopo\"",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Servidor público y figura querida de la comunidad",
    "localidad": "Tacarigua",
    "anios": "Nacido el 22 Jul. 1945",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Teofilo José Gil Chopo.jpg",
    "descripcion": ["Teofilo José Gil, universalmente conocido como «Chopo», fue un músico y compositor nato que hizo del galerón y la parranda el lenguaje de toda su existencia. Nacido en Tacarigua, creció rodeado de una familia de cultores que le inculcaron desde niño el amor por las tradiciones musicales del oriente venezolano.", "Chopo tocaba el cuatro, el violín y era un improvisador temible en los torneos de galerón. Su voz grave y cargada de emoción le daba una personalidad inconfundible que el público reconocía de inmediato. Actuó en los principales festivales folclóricos de Nueva Esparta y representó a Tacarigua en eventos nacionales con orgullo y solvencia artística.", "Más allá del escenario, fue un hombre dedicado a su familia y a su comunidad, siempre dispuesto a animar una fiesta o a enseñar los rudimentos del cuatro a quien se lo pidiera. «Chopo» es recordado en Tacarigua como uno de sus hijos más genuinamente músicos: un hombre que vivió para la música y cuya música sigue viviendo después de él. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 5,
    "nombre": "Victoria Amparo Gil Millán",
    "disciplina": "Personajes / Guardiana del Patrimonio Religioso",
    "especialidad": "Devoción y cuidado de la Iglesia del Corazón de Jesús",
    "localidad": "Tacarigua",
    "anios": "30 Oct. 1919 – Patrimonio eterno",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/VictoriaGi.jpg",
    "descripcion": ["Victoria Amparo Gil Millán nació el 30 de octubre de 1948 en Tacarigua, siendo una de las voces femeninas más representativas del folclore margariteño de su generación. En un mundo artístico dominado en su época por hombres, Victoria se abrió paso con una determinación tranquila y un talento que nadie podía ignorar.", "Su especialidad era el galerón y las canciones de tradición oral femenina de la isla. Participó activamente en los grupos culturales de Tacarigua y colaboró con la Fundación Cheguaco en la recopilación y preservación de canciones de cuna, corridos y melodías que de otro modo habrían caído en el olvido. Su compromiso con la memoria cultural fue constante durante décadas.", "Victoria Amparo Gil Millán representó el papel de la mujer en la transmisión de la cultura popular: no en el gran escenario, sino en el hogar, en la escuela, en la calle y en la comunidad. Su labor discreta pero profunda contribuyó a mantener vivos los hilos invisibles que unen a las generaciones de Tacarigua con su identidad más antigua y más verdadera. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 6,
    "nombre": "Vicente Lárez González \"Chente\"",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Folclore y expresiones populares margariteñas",
    "localidad": "Tacarigua",
    "anios": "Patrimonio Cultural de la Parroquia",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/ChenteLarez.jpg",
    "descripcion": ["Vicente Lárez González, conocido en toda la isla como «Chente Lárez», fue un galeronista, poeta y animador cultural de Tacarigua cuya voz y presencia definieron la escena folclórica local durante la segunda mitad del siglo XX. Con un timbre vocal particularmente rico y una capacidad de improvisación cultivada durante décadas, Chente representó lo más auténtico del cantar margariteño.", "Su actuación en los festivales de galerón era siempre uno de los momentos más esperados. Dominaba los estilos clásicos del galerón oriental —el llano, el cruzado y el pasaje— con una soltura que transmitía tanto la alegría como la melancolía propias del alma isleña. Fue también un compositor prolífico, varias de cuyas piezas forman parte hoy del repertorio de grupos folclóricos de la región.", "Chente Lárez fue un hombre generoso con su conocimiento. Participó en talleres y actividades de rescate cultural organizadas por la Fundación Cheguaco y otras instituciones, convencido de que el galerón no debía quedar solo en los archivos sino seguir vivo en las gargantas de los jóvenes de Tacarigua. Su figura continúa siendo referencia inevitable cuando se habla de la música tradicional del Valle de Pedro González. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 7,
    "nombre": "Julián Salazar Velásquez",
    "disciplina": "Personajes / Promotor Cultural",
    "especialidad": "Preservación del legado de Cheguaco",
    "localidad": "Tacarigua",
    "anios": "Desde el año 2000",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Julián Salazar Velásquez.jpg",
    "descripcion": ["Julián Salazar Velásquez es hijo del gran cronista e ícono cultural José Joaquín Salazar Franco «Cheguaco», y ha dedicado su vida a una misión a la altura del legado que heredó: preservar, difundir y honrar la obra de su padre y la memoria cultural de Tacarigua. Desde el 31 de diciembre del año 2000, cuando falleció Cheguaco, Julián asumió la presidencia de la Fundación José Joaquín Salazar Franco.", "Bajo su dirección, la fundación ha coordinado el Certamen Literario «José Joaquín Salazar Franco», espacio donde nuevas generaciones de escritores y poetas de la región compiten y se forman en el amor por las letras. También ha liderado actividades de rescate de la Memoria Histórica en escuelas y liceos de Tacarigua, llevando el legado de su padre directamente a las aulas.", "Julián Salazar Velásquez no es solo el guardián de una herencia familiar: es el impulsor activo de una identidad cultural que vive y crece. Su trabajo cotidiano en la fundación garantiza que el nombre de Cheguaco, y con él el alma de Tacarigua, permanezca presente en cada generación que viene. Fuente: cheguaco.org"]
  },
  {
    "id": 14,
    "nombre": "Ambrosio Cabrera Marcano",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Ninito.jpg",
    "descripcion": ["Ambrosio Cabrera Marcano nació en Tacarigua el 07 de diciembre de 1916, día jueves, en el cual la Iglesia Católica celebra la festividad de San Ambrosio. Fue ese mismo día en que la historia patria recuerda la fundación de ciudades como El Tocuyo y Maturín, y el nacimiento del General Ambrosio Plaza. Sus padres fueron Saturnino Cabrera y Etanislá Marcano, naturales también de Tacarigua, quienes lo criaron con rectos principios de decencia y honestidad.", "«Ninito», como todo el mundo lo conocía y lo quería en Tacarigua, fue un hombre profundamente arraigado en su tierra. Con vocación de servicio comunitario, participó activamente en la vida social y cultural del pueblo, convirtiéndose en una figura querida y respetada por todas las generaciones. Fue testigo directo de la transformación de Tacarigua a lo largo del siglo XX, y ese testimonio viviente resultó de un valor incalculable para historiadores y cronistas locales.", "Ambrosio Cabrera Marcano es recordado como ejemplo de rectitud, humildad y amor por Tacarigua. Su vida, atravesada por los grandes cambios del siglo, fue un espejo fiel de la historia cotidiana del pueblo y sus gentes. La Fundación Cheguaco recoge su memoria como parte del patrimonio humano más valioso de la comunidad. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 15,
    "nombre": "Francisco Cándido Sánchez",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/CandidoSanchez.jpg",
    "descripcion": ["Transcurría en relativa calma un día de Santa Rosa de Lima cuando nació Francisco Cándido Sánchez en el humilde hogar de Tacarigua que lo vería crecer hasta convertirse en una de sus figuras más representativas. Desde joven mostró un temperamento curioso, emprendedor y profundamente ligado a las tradiciones de su comunidad.", "A lo largo de su vida, Francisco Cándido Sánchez participó activamente en la vida folclórica y social de Tacarigua, aportando con su presencia y su conocimiento a la preservación de costumbres que en el siglo XX comenzaban a desvanecerse ante el avance de la modernidad. Fue un personaje querido, capaz de reunir alrededor suyo a diferentes generaciones.", "Su historia, recogida por la Fundación Cheguaco en sus archivos orales, es testimonio de una época en que Tacarigua vivía a un ritmo más pausado, más humano. Francisco Cándido Sánchez representa esa Tacarigua de calles de tierra, de fiestas bajo las estrellas y de una comunidad que se conocía y se cuidaba a sí misma. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 16,
    "nombre": "José Sánchez Rojas",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/José Sánchez Rojas.jpg",
    "descripcion": ["José Sánchez Rojas nació en Tacarigua el 5 de agosto de 1925. Era hijo de una familia de trabajadores del campo que le inculcaron desde niño los valores del esfuerzo honesto y el amor por la tierra. Creció en un Tacarigua todavía íntimamente ligado a la agricultura y la pesca, actividades que marcaron profundamente su carácter y su visión del mundo.", "A lo largo de su vida, José Sánchez Rojas fue reconocido en su comunidad como hombre de palabra, figura de respeto y portador de los valores más genuinos de la cultura tacarigüeña. Participó en las festividades tradicionales del pueblo y mantuvo viva la memoria de las prácticas agrícolas y las costumbres cotidianas de la primera mitad del siglo XX.", "Su historia forma parte de la memoria viva que la Fundación Cheguaco se ha empeñado en preservar: la historia no de los grandes hombres de Estado, sino de los hombres y mujeres ordinarios cuya vida extraordinaria dio forma a la identidad de Tacarigua de Margarita. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 17,
    "nombre": "Fidel Guzmán Rodríguez",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/fidelguzman.jpg",
    "descripcion": ["Fidel Guzmán Rodríguez es un hombre que nació de las entrañas mismas de la tradición oral de Tacarigua. Desde que tuvo uso de razón, fue rodeado de música, de cuentos de viejos y de la sabiduría campesina que se transmite de boca en boca en los conucos y en los velorios de Cruz. Esa educación informal, pero profundísima, forjó en él un carácter que mezcla la sencillez del campesino con la agudeza del intelectual popular.", "Fue músico, animador cultural y custodio de las tradiciones de su comunidad. Su talento para el cuatro y su memoria privilegiada para los versos del galerón lo convirtieron en una referencia inevitable en las reuniones folclóricas de la zona. También participó en la difusión de las costumbres religiosas y populares de Tacarigua: los velorios, las enramadas, las fiestas de San Juan.", "Fidel Guzmán Rodríguez es uno de esos personajes que una comunidad puede llamar «hombre de pueblo» en el mejor sentido del término: alguien que pertenece a todos, que todos conocen y que todos recuerdan con cariño y gratitud. La Fundación Cheguaco recoge su trayectoria como parte del rico tapiz humano de Tacarigua. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 18,
    "nombre": "Nicasio Marcano Núñez",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/nicaciomarcano.jpg",
    "descripcion": ["Nicasio Marcano nació en Tacarigua, Estado Nueva Esparta, y su vida fue, de principio a fin, un testimonio del amor profundo que puede desarrollar un ser humano por su tierra natal. En un pueblo donde todos se conocen y la historia de cada familia es parte de la historia de la comunidad, Nicasio fue uno de esos tacarigüeños cuya presencia era sinónimo de arraigo y continuidad.", "Músico y partícipe activo de las tradiciones culturales de Tacarigua, Nicasio Marcano cultivó los géneros propios del oriente venezolano —el galerón, las parrandas decembrinas, los cantos de trabajo— con la convicción de quien sabe que esas expresiones artísticas son mucho más que entretenimiento: son la voz de un pueblo que se narra a sí mismo.", "Su historia, conservada en los archivos orales de la Fundación Cheguaco, es parte de ese conjunto de vidas que juntas definen el carácter único de Tacarigua de Margarita. Nicasio Marcano Núñez representa la continuidad de una tradición que sobrevive no en los libros, sino en la memoria viva de quienes tuvieron el privilegio de conocerle. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 19,
    "nombre": "Aníbal Rodríguez Malaver",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Anibal-Rodriguez.jpg",
    "descripcion": ["Fue un 6 de abril de 1922 que Antonio Rodríguez Quijada y su esposa dieron la bienvenida al mundo a Aníbal Rodríguez Malaver, quien crecería para convertirse en uno de los cronistas y cultores más comprometidos con la memoria histórica de Tacarigua. Desde su juventud, Aníbal mostró una inclinación especial por escuchar a los viejos, por registrar sus relatos y por comprender cómo el pasado da sentido al presente.", "A lo largo de su vida, Aníbal Rodríguez Malaver recopiló testimonios, leyendas, canciones y datos históricos de Tacarigua con una dedicación que pocas veces se ve en quien no tiene título académico que lo respalde. Su trabajo fue puramente vocacional, impulsado por el convencimiento de que si esas historias no se guardaban, se perderían para siempre.", "Hoy, gracias a su labor y a la de quienes como él creyeron en la importancia de la memoria oral, Tacarigua cuenta con un acervo cultural de enorme valor. Aníbal Rodríguez Malaver es recordado como un hombre que amó su tierra lo suficiente como para dedicar su vida a contarla. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 20,
    "nombre": "Alí Gómez Núñez",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/aligomez.jpg",
    "descripcion": ["Fue en la madrugada de un lunes cuando Andrea Josefa Núñez trajo al mundo a Alí Gómez Núñez, uno de los personajes más coloridos y recordados de Tacarigua. Desde niño, Alí se caracterizó por su ingenio natural, su capacidad para hacer reír y su don para el relato oral: virtudes que lo convirtieron en el alma de cualquier reunión en la que estuviera presente.", "A lo largo de su trayectoria como cultor popular, Alí Gómez Núñez cultivó las tradiciones orales de Tacarigua con una gracia especial. Sus cuentos, anécdotas y décimas improvisadas eran parte indisociable de las veladas comunitarias, las parrandas navideñas y los velorios de Cruz que durante décadas animaron la vida social del pueblo.", "Más allá de su talento para el entretenimiento, Alí Gómez Núñez fue también un custodio de la historia local. Sus relatos, aunque contados con humor, guardaban siempre un núcleo de verdad histórica que ha servido a investigadores y cronistas para reconstruir aspectos de la vida cotidiana de Tacarigua que de otra forma habrían quedado sin registro. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 21,
    "nombre": "Argenis Sánchez Rojas",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/sin_foto.png",
    "descripcion": ["Era jueves por la tarde cuando la señora Cunda Núñez ayudó a traer al mundo a Argenis Sánchez Rojas, quien con el tiempo llegaría a ser una presencia insustituible en la vida cultural de Tacarigua. Criado en el seno de una familia tacarigüeña de profundas raíces, Argenis heredó desde niño el amor por las tradiciones y la historia de su pueblo.", "A lo largo de su vida, Argenis Sánchez Rojas se destacó como promotor cultural y participante activo en las festividades y expresiones artísticas de la comunidad. Fue colaborador cercano de la Fundación Cheguaco y participó en múltiples actividades de preservación del patrimonio cultural intangible de Tacarigua, desde el rescate de canciones olvidadas hasta la transmisión de técnicas artesanales tradicionales.", "Argenis Sánchez Rojas encarna el perfil del cultor silencioso: el que no busca los reflectores, pero cuya labor constante y callada mantiene encendida la llama de la identidad cultural en su comunidad. La Fundación Cheguaco recoge con orgullo su historia como parte del patrimonio humano de Tacarigua. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 22,
    "nombre": "Dionisio Gil Franco «Nicho»",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/dionisiogil.jpg",
    "descripcion": ["Y llegaron los primeros inmigrantes cuando Dionisio Gil Franco «Nicho» ya había aprendido a asombrarse del mundo. Nacido en Tacarigua en las primeras décadas del siglo XX, Nicho creció en un ambiente de profunda convivencia comunitaria donde la música y la oralidad eran los vínculos más fuertes entre las personas. Fue testigo privilegiado de una transformación social que cambió para siempre el rostro de la Isla de Margarita.", "Como músico y compositor, Dionisio Gil Franco cultivó el galerón y el polo margariteño con una dedicación que le valió el reconocimiento de sus contemporáneos. Era especialmente hábil en la improvisación de décimas, género en el que su agudeza poética y su sentido del humor se combinaban para crear piezas memorables que el público coreaba y repetía por años.", "«Nicho» dejó en Tacarigua la huella de un hombre que entendió que la música no es un adorno de la vida, sino una de sus formas más esenciales. Su figura es recordada con afecto por todos los que tuvieron la fortuna de escucharlo cantar en las veladas de antaño. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 23,
    "nombre": "Teodoro Gúzman Landaeta «Choro»",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/teodoroguzman.jpg",
    "descripcion": ["Era domingo por la tarde, en el año 1919, cuando la familia Guzmán Landaeta recibió al que sería uno de sus hijos más recordados por Tacarigua: Teodoro Guzmán Landaeta, conocido en todo el pueblo como «Choro». Desde sus primeros años, Choro mostró una inclinación irrefrenable hacia la música y la narrativa oral, absorbiendo como esponja todo lo que los mayores de Tacarigua tenían para enseñar.", "Como galeronista, Teodoro «Choro» Guzmán Landaeta fue una figura de respeto en los certámenes y festividades folclóricas de la región. Su manejo del galerón improvisado era notable: tenía la capacidad de responder a cualquier estrofa con una rapidez y una elegancia que dejaban sin palabras a sus contrincantes y deleitaban al público. Actuó en escenarios de toda Nueva Esparta y en algunos de alcance nacional.", "Choro fue también un hombre de comunidad: participó en las juntas de vecinos, colaboró en las fiestas patronales y fue de los primeros en sumarse a los esfuerzos de Cheguaco por documentar y difundir la cultura de Tacarigua. Su nombre permanece inscrito en la memoria colectiva de un pueblo que supo reconocer a tiempo su valor. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 24,
    "nombre": "Josá del Pilas Díaz Rojas",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/josedelpilar.jpg",
    "descripcion": ["Un día lunes, cuatrocientos cincuenta años después de que los primeros pobladores llegaran a estas tierras, nació José del Pilar Díaz Rojas en el hogar tacarigüeño que le daría nombre y raíces para toda su vida. Criado entre los conucos y las playas de la región, José del Pilar desarrolló desde joven un carácter forjado por el trabajo y la convivencia comunitaria.", "Personaje fundamental en la vida social de Tacarigua durante décadas, José del Pilar Díaz Rojas participó en las expresiones culturales y religiosas de la comunidad con un compromiso que nunca decayó. Fue parte activa de las celebraciones patronales, los velorios de Cruz y las reuniones culturales que, bajo la sombra de los árboles y a la luz de los quinqués, definieron el alma festiva de Tacarigua.", "La historia de José del Pilar Díaz Rojas es la historia de un hombre sencillo pero imprescindible: uno de esos personajes que una comunidad solo advierte en toda su importancia cuando ya no está. La Fundación Cheguaco preserva su memoria como parte indivisible del patrimonio humano de Tacarigua de Margarita. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 26,
    "nombre": "Cruz Millán García",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Personaje histórico / folclórico",
    "localidad": "Tacarigua",
    "anios": "Figura representativa",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/cruzmillan.jpg",
    "descripcion": ["Cruz Ramón, el hijo de Carlos y Juana Josefa, debía haber sido agricultor como su padre. Y en cierto modo lo fue: cultivó la tierra, pero también cultivó la memoria, la música y el alma de Tacarigua. Cruz Millán García nació en esta comunidad y en ella forjó una vida marcada por la dedicación al trabajo honesto y el amor profundo por las tradiciones de su pueblo.", "A lo largo de los años, Cruz Millán García se convirtió en uno de los referentes culturales del Valle de Pedro González. Participó en los grupos folclóricos de la zona, animó festividades patronales y contribuyó con su presencia y su conocimiento al esfuerzo colectivo de preservar lo que Tacarigua tiene de más auténtico e irrepetible.", "Cruz Millán García es el tipo de hombre que define la palabra «pueblo»: alguien cuya vida no aparece en los libros de historia oficial, pero sin el cual esa historia sería incompleta. La Fundación Cheguaco lo recuerda como uno de los custodios silenciosos de la identidad tacarigüeña. Fuente: Fundación Cheguaco / cheguaco.org"]
  },
  {
    "id": 100,
    "nombre": "Jennifer del Valle Moya Gil",
    "disciplina": "Músicos / Cantante",
    "especialidad": "Música tradicional y fusión",
    "localidad": "Porlamar / Tacarigua",
    "anios": "Nacida el 12 Sep. 1980",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Jennifer Moya.jpg",
    "descripcion": [
    "Jennifer del Valle Moya Gil nació en Porlamar el 12 de septiembre de 1980, pero es tacariguera de pura cepa, y es que en este pueblo del municipio Gómez pasó gran parte de su vida.",
    "Desde muy pequeña, la música formó parte importante de su vida. Su talento interpretativo fue descubierto por el profesor Hilario González, quien en la cátedra de música vio las potencialidades de una niña de apenas ocho años. En esa época comenzó a brillar en los festivales de la escuela Cruz Millán García. Después fue llamada por Eligio González, quien la invitó a formar parte de 'Cachaoa', un popular grupo tacariguero.",
    "Su gran oportunidad vino de la mano del maestro Alberto 'Beto' Valderrama, quien a los 14 años la apadrinó y le enseñó a interpretar todos los géneros tradicionales margariteños. Con él aprendió a cantar joropo llanero y margariteño (galerón, malagueña, jota, polo), décimas espinelas, aguinaldos y diversas clases de parrandas. Durante su adolescencia llegó a formar parte de más de 15 agrupaciones.",
    "Aunque adora la música margariteña, a los 18 años decidió comenzar a experimentar con géneros más comerciales como pop, rock, merengue y salsa. En 2008, decidió lanzarse como solista, siendo asesorada por el maestro Ender Briceño. Ha lanzado los discos 'Libre' y 'Cuestión de piel'. Su más reciente producción es 'Guaiquerí', donde mezcla géneros tradicionales con el pop contemporáneo.",
    "Su gran salto a la fama fue en 2013 cuando se coronó como la ganadora del reality show Talentum, transmitido por Venevisión y que premiaba el talento artístico. Además de su intensa carrera artística, Jennifer ha demostrado que se puede brillar sin descuidar el estudio: es licenciada en Estadística y magister en Ciencias Administrativas de la Udone, y tiene un doctorado en Educación por la UPEL. Busca ser un puente entre la música tradicional y la juventud."
]
  },
  {
    "id": 101,
    "nombre": "Dalmiro José Malaver Quijada 'La Culebrita de Oriente'",
    "disciplina": "Músicos / Cantautor",
    "especialidad": "Galerón y décima espinela",
    "localidad": "San Sebastián de Tacarigua",
    "anios": "Nacido el 5 Sep. 1974",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Dalmiro José Malaver Quijada.jpg",
    "descripcion": [
    "Dalmiro José Malaver Quijada, artísticamente conocido como 'La Culebrita de Oriente', es un célebre cantautor, poeta, improvisador y galeronista venezolano. Es considerado una de las figuras más importantes de la música tradicional neoespartana y un pilar fundamental para la preservación de la identidad cultural de la Isla de Margarita.",
    "Nació el 5 de septiembre de 1974 en el histórico pueblo de San Sebastián de Tacarigua, ubicado en el municipio Gómez del estado Nueva Esparta. Creció en el seno de una familia con un profundo arraigo folclórico: su padre Dalmiro Malaver, apodado 'La Culebra del Rincón', y su madre Isaura Quijada de Malaver. Es sobrino del legendario cultor popular Hernán Malaver, conocido en el oriente del país como 'El Tacariguero'.",
    "A los 5 años, Dalmiro ya demostraba una notable afinidad por el canto tradicional, siguiendo los pasos de su padre desde las primeras veladas familiares. Su formación artística formal comenzó en 1989, cuando se incorporó a la primera Escuela de Galerón Infantil de Margarita, un proyecto pionero que catalizó una generación completa de músicos folclóricos. Su educación musical estuvo guiada por mentes brillantes como José Ramón Villarroel ('El Huracán del Caribe') y Alberto 'Beto' Valderrama Patiño.",
    "Buscando un equilibrio entre la academia y el folclor, Malaver se graduó como Ingeniero de Sistemas. Reside en El Tigre, estado Anzoátegui, pero se mantiene conectado diariamente con sus raíces. Es un ferviente defensor del patrimonio intangible de su región y apoya activamente la Escuela de Galerón local.",
    "Su propuesta discográfica destaca por su pulcritud poética y profunda devoción religiosa mariana: Mi esencia (2005), Aguinaldos orientales (2008), 100 años de su Coronación (2011), Las Fiestas del Santo (2012). En 'Las Fiestas del Santo' (2012), Dalmiro rinde homenaje al patrono de su pueblo natal, San Sebastián. El álbum no es solo música, es una memoria sonora de la fe y las costumbres de Tacarigua Adentro. Ganó el Premio Pepito Rojas a la mejor producción de música tradicional en 2012."
]
  },
  {
    "id": 102,
    "nombre": "Dalmiro Malaver 'La Culebra'",
    "disciplina": "Deportes y Cultura",
    "especialidad": "Atletismo y Galerón",
    "localidad": "San Sebastián de la Tacarigua",
    "anios": "Nacido el 18 Feb. 1950",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Dalmiro Malaver.jpg",
    "descripcion": [
    "Dalmiro Malaver es una de las figuras públicas más polifacéticas y respetadas del Estado Nueva Esparta. Su vida representa un puente perfecto entre la exigencia del asfalto y las canchas deportivas, y la agilidad mental de la tarima folclórica. Con su célebre apodo, 'La Culebra', bautizado así en el béisbol por su velocidad e implacable desplazamiento, ha dejado una huella imborrable como atleta, entrenador, concejal y maestro de la décima espinela.",
    "Nació el 18 de febrero de 1950 en San Sebastián de la Tacarigua. El impulso formal a su carrera atlética llegó por su hermano José Ramón 'Princio' Malaver. A finales de los 60 y 70, se consolidó como uno de los fondistas y maratonistas más temidos del Oriente venezolano. Ganó la maratón de Tacarigua Afuera, Sidor, Carúpano, San Cristóbal y el Maratón de los Barrios en Caracas.",
    "Su velocidad no solo le sirvió para el atletismo, sino para el béisbol, llegando a lanzar un No Hit No Run en Ciudad Guayana, y formando parte de la selección de Nueva Esparta de softbol.",
    "Al retirarse de la alta competencia, volcó su experiencia hacia la dirección técnica y la preparación de jóvenes deportistas. Bajo su tutela se formaron figuras como Rubén Maza y Nicomedes 'Nico' Maza, quien ganó una medalla de plata en las Olimpiadas Especiales de 1991.",
    "Entró formalmente al mundo del galerón a los 25 años. Superó los primeros obstáculos estudiando la lingüística y la estructura de la décima espinela con el mismo ahínco que entrenaba sus piernas. Ha ganado festivales y defiende que la improvisación requiere estudio profundo.",
    "Hoy en día, Dalmiro pasa sus tardes en el estadio de béisbol y dirige la Escuela de Galerón de Tacarigua. Es considerado un Altar Viviente de la Identidad Margariteña y un incansable protector del patrimonio cultural de su pueblo."
]
  },
  {
    "id": 103,
    "nombre": "Simón José Guerra Malaver",
    "disciplina": "Músicos / Compositor",
    "especialidad": "Guitarrista y poeta popular",
    "localidad": "San Sebastián",
    "anios": "24 Jul. 1939 – 23 Ago. 2024",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Simón Guerra.jpg",
    "descripcion": [
    "Simón José Guerra Malaver (1939 – 2024) fue uno de los pilares más luminosos de la identidad musical y poética del estado Nueva Esparta. Reconocido como Patrimonio Cultural Viviente, este extraordinario guitarrista, cuatrista, compositor y poeta popular dedicó su existencia a salvaguardar el alma de su tierra.",
    "Nació el 24 de julio de 1939 en el fresco Valle de San Sebastián. Creció bajo la brisa cantarina del emblemático cerro de la Palma Real. Su infancia transcurrió entre las aulas de clase y las labores de la tierra. Defendía que la musa poética es un don con el que se nace.",
    "En 1971, su compadre Domingo Carrasquero Ordaz se inspiró en las andanzas y la estampa de Simón para escribir la icónica gaita margariteña 'Los Zapatos Maqueros'. Este homenaje popular es uno de los más entrañables de la música tradicional neoespartana.",
    "Músico completamente autodidacta, compuso más de cincuenta canciones y un número incontable de décimas espinelas. Su obra más popular es 'El Campesino Tacariguero', que retrata al trabajador del campo. Editó un álbum en CD titulado 'Mis canciones'.",
    "Para Don Simón, la música era una terapia curativa para el alma. Consideró que su obra más satisfactoria fue 'El Campesino Tacariguero'. Falleció el 23 de agosto de 2024 a los 85 años. Su recuerdo camina entre sus versos, fundido para siempre en el paisaje de la Margarita que tanto amó."
]
  },
  {
    "id": 104,
    "nombre": "Cecilio Julián Guerra Quijada 'Chilo' Guerra",
    "disciplina": "Músicos / Maestro y Compositor",
    "especialidad": "Trompeta, acordeón y pedagogía musical",
    "localidad": "San Sebastián",
    "anios": "22 Nov. 1925 – 7 Abr. 2011",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Cecilio Guerra.jpg",
    "descripcion": [
    "Cecilio Julián Guerra Quijada, conocido afectuosamente como el Maestro 'Chilo' Guerra, fue una figura fundamental en el panorama musical del estado Nueva Esparta. Nació el 22 de noviembre de 1925, día de Santa Cecilia, patrona de la música.",
    "Su formación fue un testimonio de perseverancia; recorría a pie desde San Sebastián hasta La Asunción para recibir lecciones de música. Llegó a dominar la trompeta, el acordeón y el cuatro. Fue músico fundador y primer trompeta de las Bandas Oficiales del Estado.",
    "Como compositor, creó más de 20 obras musicales inspiradas en su sitio de labranza en El Copeycillo, destacando 'Valle de San Sebastián' y '20 de Enero'. Sus canciones son una crónica sonora de la geografía y el espíritu de Tacarigua.",
    "Su impacto más perdurable fue la labor pedagógica. En su hogar formó a generaciones de músicos, entre ellos sus propios hijos: David, Eli 'Licho' y Juvenal. También sus sobrinos Juana Morao de Guerra y Chuito Morao aprendieron de él.",
    "Era el alma de las fiestas de San Sebastián. Le encantaba compartir en los paseos de música y las parrandas. Falleció el 7 de abril de 2011 acompañado por sus composiciones y el profundo reconocimiento de su pueblo."
]
  },
  {
    "id": 105,
    "nombre": "Eli José Guerra Morao 'Licho' Guerra",
    "disciplina": "Músicos / Arreglista",
    "especialidad": "Instrumentos de viento y educación musical",
    "localidad": "San Sebastián",
    "anios": "18 Dic. 1963 – 26 Jun. 2026",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Eli Licho Guerra.jpg",
    "descripcion": [
    "Eli José Guerra Morao, conocido como 'Licho' Guerra, fue un pilar fundamental de la cultura musical en Nueva Esparta. Nació el 18 de diciembre de 1963. Hijo del legendario Maestro Cecilio 'Chilo' Guerra y de Doña Juana Morao, creció inmerso en un entorno musical privilegiado.",
    "La versatilidad fue el sello distintivo de 'Licho'. Dominaba con maestría instrumentos de viento, charrasco, maracas, tambor, cuatro, guitarra, flauta y piano. Fue miembro fundador de las bandas oficiales del estado y de agrupaciones como San Sebastián.",
    "Lideró la Banda Musical y la Orquesta de FEDECENE. Fue Director Musical de la Orquesta Típica de MOCULTA. Dirigió además el Sexteto del CDC 'Pablo Romero Millán', el grupo Tacarigua Adentro y la Orquesta Sansebastiense.",
    "Su mayor legado reside en la enseñanza. A través del taller musical que ofreció en MOCULTA, formó a una nueva generación conocida como 'Los Pupilos de Licho'. También fue director del Coro Municipal de Gómez.",
    "Prolífico creador, compuso himnos institucionales, como el de MOCULTA y el himno de San Sebastián. Fue nombrado Patrimonio Cultural Viviente del Estado Nueva Esparta. Falleció el 26 de junio de 2026, dejando un legado imperecedero en la música de Margarita."
]
  },
  {
    "id": 106,
    "nombre": "Hilario Ramón González Lista",
    "disciplina": "Personajes / Artesano y Músico",
    "especialidad": "Luthería, educación y música",
    "localidad": "Tacarigua",
    "anios": "21 Oct. 1943 – 4 Jun. 1992",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Hilario Gonzalez.jpg",
    "descripcion": [
    "Hilario Ramón González Lista nació el 21 de octubre de 1943. Fue un educador y músico que dedicó gran parte de su vida a la enseñanza en las escuelas de Boca de Río, Tacarigua y San Sebastián.",
    "Su pasión por la música nació bajo la tutela del Maestro Cecilio 'Chilo' Guerra. Hilario dominó la trompeta y el saxofón. Por iniciativa propia aprendió a ejecutar cuatro, guitarra, arpa y otros instrumentos. Participó en agrupaciones como 'La Selección Río Caribe' y el Conjunto de Música Llanera 'Los Compadres'.",
    "Hombre polifacético y de gran ingenio, fabricó cuatros de alta calidad, reconocidos nacional e internacionalmente. También diseñó maquinaria industrial: batidoras de concreto, pulidoras y ralladores de coco. Su mente inventiva era tan fértil como su amor por la música.",
    "Fue miembro fundador del Centro Social y Cultural 'San Sebastián', ASOVESANSE y MOCULTA. Falleció prematuramente el 4 de junio de 1992, a los 49 años, dejando un legado artesanal y musical de primera magnitud."
]
  },
  {
    "id": 107,
    "nombre": "Eligio González Gil",
    "disciplina": "Personajes / Promotor Cultural",
    "especialidad": "Promotor cultural y deportivo",
    "localidad": "El Alto del Gallego",
    "anios": "Nacido el 1 Dic. 1946",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/eligio.png",
    "descripcion": [
    "Eligio José González Gil nació en El Alto del Gallego el 1º de Diciembre de 1946. Su carrera profesional lo llevó a trabajar en Sidor durante 12 años, y luego regresó a la Isla de Margarita en 1977.",
    "En 1993 se desempeñó como Director de la Casa de la Cultura 'Pedro Rivero Navarro' en Tacarigua, donde logró educar a sus pupilos (Jennifer Moya, Elías y Eliut González, entre otros) en la interpretación de canciones folklóricas, organizando además eventos recreativos de envergadura.",
    "Es compositor de canciones como 'Canto a Santa Ana'. Se le recuerda también por sus cantos de galerón bajo el nombre de 'El Gladiador de El Alto El Gallego', siendo un promotor incansable del folclor insular."
]
  },
  {
    "id": 108,
    "nombre": "Petra Rocila González Malaver 'Lila'",
    "disciplina": "Educadora y Promotora Cultural",
    "especialidad": "Gestión en MOCULTA y preservación de folclor",
    "localidad": "San Sebastián de Tacarigua",
    "anios": "Nacida el 12 May. 1971",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Petra Rocila Gonzalez.jpg",
    "descripcion": [
    "Petra Rocila González Malaver, conocida cariñosamente como 'Lila', es una destacada educadora, líder comunitaria y promotora cultural. Nació el 12 de mayo de 1971 en San Sebastián de Tacarigua.",
    "Dedicó gran parte de su vida a la enseñanza en la Escuela Básica Cruz Millán García. Es Licenciada en Educación con especialización en Matemáticas. Su mayor legado social se consolidó a través de su participación clave en el Movimiento Cultural Tacarigua Adentro (MOCULTA).",
    "Como directora de MOCULTA, ha coordinado la formación de la generación de relevo en el canto del Galerón, talleres pedagógicos de música para niños y jóvenes, y la organización logística de los grandes eventos comunitarios como la Semana de San Sebastián y el Festival de Galerón.",
    "La figura de 'Lila' González es sinónimo de resistencia cultural y vocación docente en Nueva Esparta. Es una mujer que trabaja incansablemente para que las tradiciones de su pueblo no se pierdan con el tiempo."
]
  },
  {
    "id": 109,
    "nombre": "Dimas Encarnación Lárez Lista",
    "disciplina": "Poeta y Articulista",
    "especialidad": "Décimas y promoción cultural",
    "localidad": "San Sebastián",
    "anios": "25 Mar. 1935 – 6 Jun. 1989",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Dimas Encarnación Lárez.jpg",
    "descripcion": [
    "Dimas Encarnación Lárez Lista nació el 25 de Marzo de 1935 en el Valle de San Sebastián. Desde su niñez, se caracterizó por aprender de todo un poco y leer incansablemente.",
    "Aprendió a tocar cuatro por sí mismo, llegando a dominar las notas musicales, y enseñó a su hermano Esteban Lárez Lista. Fue un poeta destacado con muchos poemas y décimas dedicados a su pueblo.",
    "Fue Director del Centro Social Cultural y Deportivo 'San Sebastián' y director y escritor del periódico cultural 'Manantial'. Gran defensor del folklore, siempre se le veía con su cuatro tocando canciones. Falleció el 6 de Junio de 1989."
]
  },
  {
    "id": 110,
    "nombre": "Bartolo José Gil",
    "disciplina": "Promotor Musical",
    "especialidad": "Disc-jockey y operador de sonido",
    "localidad": "Tacarigua",
    "anios": "24 Ago. 1956 – 9 Ago. 2023",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Bartolo José Gil.jpg",
    "descripcion": [
    "Nacido el 24 de agosto de 1956. Bartolo José Gil creció en el seno de una familia humilde de Tacarigua. Desde joven ayudaba a su madre a vender maní tostado y tocones, empanadas y majarete para sostener el hogar.",
    "Tuvo la oportunidad de viajar a Maracaibo, donde le llamó la atención el mundo de 'las Minitecas'. Con su trabajo ahorró y compró un Betamax, luego una planta de sonido para amenizar actos de galerones y parrandas.",
    "Adquirió conocimientos como operador de música y compartió con el famoso Manuel Marcano. Grabó galerones a Hernán José Malaver y canciones a Andrés Romero Guerra. Fue considerado el primer disc-jockey del pueblo. Falleció el 9 de agosto de 2023."
]
  },
  {
    "id": 111,
    "nombre": "Jesús Romero Guilarte",
    "disciplina": "Personajes / Poeta y Legislador",
    "especialidad": "Alfarería, poesía y gestión pública",
    "localidad": "Tacarigua",
    "anios": "25 Ago. 1909 – 5 Sep. 1962",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/jesus romero guilarte.jpg",
    "descripcion": [
    "Un 25 de agosto de 1909 nació Jesús Romero Guilarte. Autodidacta, logró superarse hasta tener su propia carpintería. En 1940, montó la 'Alfarería San José' produciendo tejas, ladrillos y bloques de cemento. Llegó a elaborar las puertas de la entrada principal de la iglesia y la cruz donde está Jesucristo.",
    "Incursionó en la política, siendo postulado a la constituyente en 1946. Fue Presidente del Concejo Municipal de Gómez en 1939 y Legislador en 1944. Fundó el periódico 'La Espiga'.",
    "Fue poeta laureado y compuso el Himno al mártir San Sebastián, con música de Don Lino Gutiérrez. Hombre comprometido con su comunidad, su trabajo artesanal y poético dejó una huella profunda en Tacarigua. Falleció el 5 de septiembre de 1962."
]
  },
  {
    "id": 112,
    "nombre": "Cirilo Marcano González",
    "disciplina": "Personajes / Dirigente Comunal",
    "especialidad": "Agricultura, comercio y poesía popular",
    "localidad": "San Sebastián",
    "anios": "Nacido el 14 Jul. 1915",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Cirilo Marcano Gonzalez.jpg",
    "descripcion": [
    "Cirilo Marcano González nació en San Sebastián el 14 de julio de 1915. Desde pequeña edad se dedicó a las labores agrícolas. A los 16 años viajó a Tucupita y luego trabajó en el Zulia en empresas petroleras.",
    "De regreso a su pueblo, regentó una pequeña fábrica de alpargatas. Se destacó como Presidente de la Junta Comunal de la Parroquia Guevara desde 1959 hasta 1969, gestionando terrenos para escuelas y mejoras comunitarias.",
    "Cirilo Marcano también fue poeta, cultivando la espinela. Siempre tenía una chispa de humor y se le conocía como 'Cayiyo' o 'Panchon'. Cantaba con entusiasmo canciones como 'Celosa' y 'Mi Buenos Aires Querido' en las fiestas del pueblo."
]
  },
  {
    "id": 113,
    "nombre": "Manuel Gil",
    "disciplina": "Músicos / Cantante",
    "especialidad": "Cantante y cuatrista (Maracaibo 15)",
    "localidad": "Tacarigua / Anaco",
    "anios": "1 Nov. 1949 – 24 Mar. 2004",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Manuel Gil.jpg",
    "descripcion": [
    "Manuel Gil nació en Tacarigua el 1 de Noviembre de 1949. Se crió en Anaco, donde comenzó a desarrollarse como cantante, siendo bautizado como 'el Joselito de Anaco' por su voz aguda, potente y afinada.",
    "En el año 1975, participó en un casting donde Maracaibo 15 buscaba un cuatrista; al oírlo tocar y cantar, Betulio Medina dijo: 'Déjenlo como cantante y se buscan otro cuatrista'. Estuvo 27 años con ellos, recorriendo toda Venezuela y dejando su huella en la música bailable.",
    "Murió por un infarto al miocardio el 24 de marzo de 2004 en plena juventud. Es considerado un tacariguero invaluable que le dio brillo al gentilicio margariteño a nivel nacional."
]
  },
  {
    "id": 114,
    "nombre": "Jesús Morao Guerra 'Chuito el de Aura'",
    "disciplina": "Músicos / Trompetista",
    "especialidad": "Trompeta magistral",
    "localidad": "San Sebastián",
    "anios": "14 Oct. 1951 – 2 Ago. 2024",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Jesus Chuito Morao.jpg",
    "descripcion": [
    "Jesús Morao Guerra, conocido como 'Chuito el de Aura' y el 'Virtuoso de la Trompeta', nació el 14 de octubre de 1951. Fue Maestro de música su tío Cecilio Guerra.",
    "A pesar de que 'Chuito' nació con problemas de visión, esto no le impidió aprender música, desarrollando el sentido del oído con gran agudeza. Empezó tocando el trombón, luego la trompeta y el cuatro.",
    "Perteneció a varios grupos, entre ellos 'Son del Caribe' (1979-1993). Amenizó los paseos de música en las fiestas patronales de San Sebastián durante décadas. Su maestría con la trompeta era reconocida en todo el municipio Gómez. Falleció el 2 de agosto de 2024."
]
  },
  {
    "id": 115,
    "nombre": "David Rafael Guerra Morao",
    "disciplina": "Educador y Músico",
    "especialidad": "Educación, investigación y saxofón",
    "localidad": "San Sebastián",
    "anios": "24 Feb. 1951 – 21 Abr. 2020",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/David Guerra Morao.jpg",
    "descripcion": [
    "Nació el 24 de febrero de 1951. Hijo del Maestro Cecilio 'Chilo' Guerra y Juana Morao de Guerra. Licenciado en Educación en la UCV con especialidad en Tecnología Educativa.",
    "Se desempeñó como profesor y coordinador en instituciones como la ULA, ISUM y UNIMAR. Asesor de más de 300 trabajos de investigación a lo largo de su carrera académica.",
    "Fue músico ejecutante del Saxofón, arte que aprendió de su padre. Fue autor de dos libros. Compartió con figuras como Aldemaro Romero y Luis Mariano Rivera. Falleció el 21 de abril de 2020, dejando una carrera académica y musical de primer nivel."
]
  },
  {
    "id": 116,
    "nombre": "Domingo Antonio Lista González",
    "disciplina": "Personajes / Dirigente Comunal",
    "especialidad": "Transporte, comercio y servicio público",
    "localidad": "San Sebastián",
    "anios": "Nacido el 1 Dic. 1916",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Domingo Antonio Lista Gonzalez.jpg",
    "descripcion": [
    "Nació el 1 de diciembre de 1916 en San Sebastián. En 1942 compró el primer auto que hubo en el caserío San Sebastián por 1.200 pesos, marcando un hito en la historia del transporte local.",
    "Ejerció como Presidente de la Junta Comunal y Primera Autoridad Municipal (1951-1958). Su gestión se caracterizó por la honestidad y el compromiso con el bienestar de su comunidad.",
    "Instaló bloqueras y molinos de maíz en varios sectores del pueblo. En 1977 fundó la compañía 'Transporte Lista', que generó empleo y dinamizó la economía local por décadas."
]
  },
  {
    "id": 117,
    "nombre": "Florentino Ramón Larez Quijada",
    "disciplina": "Educador",
    "especialidad": "Educación primaria e historia",
    "localidad": "San Sebastián",
    "anios": "16 Oct. 1938 – 13 May. 2020",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Florentino Larez.jpg",
    "descripcion": [
    "Nació el 16 de Octubre de 1938 en San Sebastián. Cursó estudios en San Juan y luego realizó cursos de Educación Superior y Topografía. Obtuvo el Titulo de Maestro de Educación Primaria.",
    "Ejerció como educador en Irapa (Sucre) y luego regresó a Margarita. Ejerció el cargo de Director de la Escuela de San Sebastián y también de Primer Conjuez en Irapa.",
    "Fue un hombre dedicado a la educación con profunda vocación de servicio. Falleció el 13 de mayo de 2020."
]
  },
  {
    "id": 118,
    "nombre": "Don José de los Santos Lista",
    "disciplina": "Personajes / Pionero y Hacendado",
    "especialidad": "Poblador y promotor religioso",
    "localidad": "San Sebastián (Vecindario 'El Río')",
    "anios": "1792 – 10 Ago. 1875",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/sin_foto.png",
    "descripcion": [
    "El primero en tener Casa, Hacienda y Posesiones Agrícolas en el montañoso pueblo de San Sebastián (conocido antiguamente como Vecindario 'El Río') fue Don José de los Santos Lista, quien nació en el año 1792.",
    "Don José procedía de familia acaudalada y residenciada en la Villa de Santa Ana del Norte. Fue el primer poblador y se asentó en el Sector 'Los Lista'. Tuvo varias posesiones agrícolas con peones y esclavos libres, sumando 42 hectáreas. Tuvo trenes de molienda de caña, un alambique para destilar ron y producción de papelón, casabe y tabaco.",
    "Fue quien trajo consigo la fe y devoción al Mártir San Sebastián, el cual tenía en cuadro enmarcado en su Casona. Su devoción sería el germen de la fundación religiosa del pueblo. Falleció el 10 de agosto de 1875."
]
  },
  {
    "id": 119,
    "nombre": "Carlos José Lista Alfonzo",
    "disciplina": "Personajes / Benefactor",
    "especialidad": "Desarrollo cívico y religioso",
    "localidad": "San Sebastián",
    "anios": "4 Nov. 1836 – 4 Jul. 1928",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/sin_foto.png",
    "descripcion": [
    "Carlos José Lista Alfonzo, nació el 4 de noviembre de 1836 en San Sebastián. Hijo del pionero Don José de los Santos Lista, heredó la vocación de servicio y el amor por su comunidad.",
    "Donó una porción de tierra y mandó a construir el primer estanque de agua público que abasteció a mucha gente de varios pueblos. Donó terreno y mandó a construir la primera capilla o iglesia del pueblo, y a tallar la imagen de San Sebastián a mitad del siglo XIX.",
    "Pasado un tiempo donó el terreno para construir el cementerio viejo. Ayudó a construir las pocas calles del pueblo. Fue nombrado Secretario de la Jefatura Civil de Tacarigua en 1874 y Primera Autoridad Civil en 1901. Falleció el 4 de julio de 1928, habiendo dado al pueblo lo mejor de sus 91 años."
]
  },
  {
    "id": 120,
    "nombre": "Esteban Lárez Lista",
    "disciplina": "Poeta Campesino y Compositor",
    "especialidad": "Poesía costumbrista y música tacarigüera",
    "localidad": "San Sebastián de Margarita",
    "anios": "Nacido el 25 Abr. 1934",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Esteban Larez.jpg",
    "descripcion": [
    "Esteban Lárez Lista nació el 25 de abril de 1934 en San Sebastián. Desde muy joven se incorporó activamente a la labranza y a la agricultura tradicional. El trabajo de la tierra fue el entorno donde educó su mirada y su sensibilidad poética.",
    "A diferencia de los escritores con formación académica, construyó su intelecto desde la cotidianidad rural, siendo un 'poeta campesino' que preserva la tradición oral y narra crónicas de su pueblo. Su hermano Dimas lo enseñó a tocar el cuatro.",
    "Como compositor, estructuró piezas que alcanzaron notoriedad como 'Mi patria Venezuela'. Su vida representa un puente de oro entre el siglo XX rural y el siglo XXI, portando con orgullo la antorcha de la identidad margariteña."
]
  },
  {
    "id": 121,
    "nombre": "Isidoro Emilio Quijada Malaver",
    "disciplina": "Personajes / Comerciante y Filántropo",
    "especialidad": "Comercio y beneficio comunitario",
    "localidad": "San Sebastián",
    "anios": "4 Abr. 1910 – 21 Jun. 1988",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Isidro Emilio Quijada.jpg",
    "descripcion": [
    "Nace en San Sebastián el 4 de abril de 1910. Trabajó desde joven en San Tomé y luego en Curazao. Dió trabajo a muchos habitantes del pueblo en las grandes sementeras de maíz.",
    "Adquirió molinos para pilar maíz en varios pueblos, tuvo un negocio de venta de licor y un cine que durante años fue punto de encuentro de la comunidad.",
    "Fue un comerciante que amaba su trabajo, filántropo, servicial, honesto y con un sentido del humor genuino que lo hizo querido por todos. Deja de existir el 21 de junio de 1988."
]
  },
  {
    "id": 122,
    "nombre": "Evaristo Beltran Alfonzo Guerra",
    "disciplina": "Educador",
    "especialidad": "Profesor de Biología y Química",
    "localidad": "San Sebastián",
    "anios": "Nacido el 27 Oct. 1922",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Evaristo Beltran Alfonzo.jpg",
    "descripcion": [
    "Nace un 27 de octubre de 1922 en San Sebastián. Fue el primer Bachiller de la República del pueblo de San Sebastián, siendo un hito educativo para la comunidad.",
    "Montó una escuela para impartir clases en casa de Leoncio Romero Lista, alumbrándose con una lámpara de carburo en los primeros años cuando no había electricidad.",
    "Obtuvo el título de Profesor de Biología y Química en la Universidad Central de Venezuela en 1949, siendo pionero en el acceso a la educación superior desde San Sebastián."
]
  },
  {
    "id": 123,
    "nombre": "Eliut González",
    "disciplina": "Músicos / Director Artístico",
    "especialidad": "Música tradicional y tropical bailable",
    "localidad": "Tacarigua",
    "anios": "Nacido el 17 Dic. 1975",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Eliut González.jpg",
    "descripcion": [
    "Eliut González nació el 17 de diciembre de 1975. Hijo de Eligio González 'El Gladiador del Alto del Gallego', heredó una profunda vocación por la preservación de los valores tradicionales.",
    "Su carrera es un testimonio de la diversidad musical de Margarita. Participó en agrupaciones como La Ceiba de Margarita, Oriente Mío y Los Chicos del Swing. Como músico integral, equilibra proyectos comerciales con la defensa de la música tradicional.",
    "Dirige la Escuela de Música 'Eliut González', donde forma a las nuevas generaciones de músicos margariteños, cumpliendo así con la misión de su padre y garantizando la continuidad del legado cultural."
]
  },
  {
    "id": 124,
    "nombre": "Félix 'Felito' Gil",
    "disciplina": "Músicos / Arreglista",
    "especialidad": "Dirección musical, bajo y canto",
    "localidad": "Tacarigua",
    "anios": "Nacido el 14 Ago. (1966/67)",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Felix Gil.jpg",
    "descripcion": [
    "Félix 'Felito' Gil es un músico, compositor, arreglista, bajista y cantante margariteño de alto nivel. Posee una sólida trayectoria académica: Licenciado en Educación y con Maestría en Ciencias Humanas.",
    "Ha sido Director Musical de Orquesta Oriente Mío, la agrupación que fusiona el folklore oriental con géneros modernos. Destaca por su versatilidad instrumental y por su profundo conocimiento de la teoría musical.",
    "Actúa como un puente generacional que enseña desde la ciencia y el amor por su terruño, formando a músicos que pueden desenvolverse tanto en la tarima folclórica como en la comercial."
]
  },
  {
    "id": 125,
    "nombre": "José Gerónimo 'Cheo' Motta Gil",
    "disciplina": "Músicos / Contrabajista",
    "especialidad": "Música sinfónica, folclor y gaita",
    "localidad": "Tacarigua",
    "anios": "Nacido el 25 Oct. 1963",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/José Mota.jpg",
    "descripcion": [
    "José Gerónimo 'Cheo' Motta Gil nació el 25 de octubre de 1963 en El Tigre, pero su corazón pertenece profundamente a Tacarigua. Posee formación integral, habiendo estudiado en la Escuela de Música 'Modesta Bor' y la Orquesta Sinfónica Juvenil.",
    "Es miembro fundador de la Orquesta Típica Margariteña y del Ensamble de Música Venezolana 'Opus 4'. Ha acompañado a figuras históricas como María Rodríguez y Francisco Mata 'Chico Toño'.",
    "Fundó la Asociación Civil Pro Niños de Tacarigua, promoviendo el deporte y el canto tradicional entre los jóvenes de su comunidad. Es un defensor de la fusión entre lo académico y lo popular en la música venezolana."
]
  },
  {
    "id": 126,
    "nombre": "José Ramón Malaver 'Princio'",
    "disciplina": "Deportes y Personajes",
    "especialidad": "Atletismo, béisbol y dirigencia política",
    "localidad": "San Sebastián",
    "anios": "8 May. 1947 – 2 Jul. 1991",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/José Ramón Malaver.jpg",
    "descripcion": [
    "José Ramón Malaver, conocido como 'Princio', nació el 8 de mayo de 1947 en San Sebastián. Desde temprana edad empezó a dar sus primeros pasos como atleta de pista y campo en el estado Zulia.",
    "A su regreso a San Sebastián, puso en práctica su experiencia en fondo, relevo, salto largo-alto, lanzamiento de jabalina y salto con garrocha. Fue un excelente pelotero y fundó la Liga de Softbol de San Sebastián, siendo su primer presidente.",
    "Incursionó en la política, formándose como dirigente agrario y luego como Concejal Principal por el Municipio Gómez. Fue además quien motivó a su hermano Dalmiro 'La Culebra' a iniciarse en el atletismo de alta competencia. Falleció a los 44 años, el 2 de julio de 1991."
]
  },
  {
    "id": 127,
    "nombre": "Andrés Romero Guerra 'El Pajarillo'",
    "disciplina": "Músicos / Cantautor",
    "especialidad": "Galeronista y decimista",
    "localidad": "San Sebastián de Tacarigua",
    "anios": "2 Dic. 1955 – 13 Sep. 2019",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Andrés Romero.jpg",
    "descripcion": [
    "Andrés Romero Guerra fue un cantautor, galeronista y decimista popular de San Sebastián de Tacarigua, con una de las voces más límpidas de la música oriental. Se le bautizó como 'El Pajarillo' debido a su registro vocal agudo, cristalino y potente.",
    "Su obra se divide en el Canto Devocional (dedicado a San Sebastián y a la Virgen del Valle), la Crónica Costumbrista (preservando la memoria de la vida agrícola en el municipio Gómez) y el Duelo de Décimas (como un contendiente respetado en el arte de la improvisación).",
    "Nació el 2 de diciembre de 1955 y falleció el 13 de septiembre de 2019. Representa el alma de la parroquia, el cantor que nunca abandonó su cerro y convirtió su humildad en su mayor orgullo artístico."
]
  },
  {
    "id": 128,
    "nombre": "Casimiro de Jesús García",
    "disciplina": "Personajes / Cultor Popular",
    "especialidad": "Canto de galerón y décimas",
    "localidad": "Sector Los Lista",
    "anios": "4 Mar. 1923 – 11 Sep. 2009",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Casemiro de Jesus García.jpg",
    "descripcion": [
    "Nació el 4 de marzo de 1923. En su juventud compartió aprendiendo a leer y escribir con el Maestro Catalino Amador Lista Sánchez, y cantaba galerón desde los 17 años.",
    "Su popularidad lo llevó a cantar galerón en velorios de la Cruz, Polos y Gaitas margariteñas, e incluso fue invitado a cantar en Radio Nueva Esparta. Vestía siempre de blanco con su pelo engomado.",
    "Fue un gran artesano realizando cabos para machetes y cuchillos, y experto en armar lazos de caza. Falleció el 11 de septiembre de 2009 a los 86 años, siendo recordado como un gentilhombre de las tradiciones de San Sebastián."
]
  },
  {
    "id": 129,
    "nombre": "Cleotilde Gabina Romero Morao",
    "disciplina": "Personajes / Guardiana de Tradiciones",
    "especialidad": "Medicina tradicional y gastronomía local",
    "localidad": "Sector Los Lista",
    "anios": "3 Jun. 1930 – 9 Mar. 2019",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/CLEOTILDE GABINAROMERO MORAO.jpg",
    "descripcion": [
    "Cleotilde Gabina Romero Morao nació el 3 de junio de 1930. Desde temprana edad se dedicó a labores del campo. Aprendió oficios como pilar maíz, molerlo, coser, bordar y lavar.",
    "En Maracaibo aprendió a inyectar y a preparar dulces y mermeladas. Con su madre aprendió a preparar el Majarete, el café y guarapos aliñados. Preparaba remedios naturales con plantas medicinales para curar llagas y 'culebrilla'.",
    "Fue una mujer servicial, colaboradora y ganadora del aprecio de mucha gente. Recibió homenajes de la Alcaldía de Gómez y MOCULTA por su invaluable labor como guardiana de las tradiciones culinarias y medicinales de San Sebastián. Falleció en 2019."
]
  },
  {
    "id": 130,
    "nombre": "Pedro Morao Botinni",
    "disciplina": "Personajes / Capitán de Marina",
    "especialidad": "Marina Mercante",
    "localidad": "San Sebastián",
    "anios": "18 Ene. 1911 – 4 Ago. 1984",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/PEDRO MORAO BOTINNI.jpg",
    "descripcion": [
    "Pedro Morao Botinni nació en San Sebastián el 18 de enero de 1911. Estudió en la Marina Mercante donde se gradúa de Marino y luego obtiene el título de Capitán de la Marina Mercante.",
    "Recorrió muchos países en barcos cargados de petróleo. La compañía Creole lo asignó como Capitán del barco mercante 'Esso Caripito', viajando a Japón, India, EE.UU., Canadá y Centro América.",
    "Fue el primer Capitán de la Marina Mercante de la Parroquia Guevara nacido en San Sebastián, siendo un orgullo para su comunidad. Falleció el 4 de agosto de 1984, habiendo conocido el mundo sin perder su amor por su tierra natal."
]
  },
  {
    "id": 131,
    "nombre": "Leoncio Romero Lista",
    "disciplina": "Personajes / Educador y Poeta",
    "especialidad": "Poesía y docencia",
    "localidad": "Sector Los Lista",
    "anios": "11 Sep. 1893 – 25 Jun. 1960",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/LEONCIO ROMERO LISTA.jpg",
    "descripcion": [
    "Leoncio Romero Lista nació el 11 de septiembre de 1893. Fue un hombre de respeto y mucha moral, que impartió clases en su propia casa alumbrado con una lámpara de carburo, siendo uno de los primeros educadores informales de San Sebastián.",
    "Llegó a cantar galerón en velorios de Cruz y compuso muchas poesías dedicadas al patrón San Sebastián y a la Virgen del Valle. Su vocación literaria y musical lo convirtió en referencia cultural del sector Los Lista.",
    "Desempeñó el cargo de Secretario de la Jefatura Civil. Su honestidad le valió el aprecio de mucha gente. Falleció el 25 de junio de 1960."
]
  },
  {
    "id": 132,
    "nombre": "Severo Leonardo Morao Cabrera",
    "disciplina": "Personajes / Servidor Público",
    "especialidad": "Servicio público y comercio",
    "localidad": "San Sebastián",
    "anios": "6 Nov. 1929 – 1 Sep. 1976",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Severo Morao.jpg",
    "descripcion": [
    "Severo Leonardo Morao Cabrera nació el 6 de noviembre de 1929. Labró la tierra por muchos años, luego se empleó como 'hacedor' de bloques de cemento y como 'bodeguero'.",
    "Fue nombrado Secretario de la Alcaldía del Municipio Guevara (1960-1964) y de los Millanes (1967-1968). En ambos cargos demostró una integridad ejemplar.",
    "Hombre servicial y preocupado por los problemas sociales de su comunidad, se ganó la amistad sincera y el respeto de su pueblo. Falleció el 1 de septiembre de 1976."
]
  },
  {
    "id": 133,
    "nombre": "Cirilo de Jesús Malaver",
    "disciplina": "Personajes / Sindicalista y Cultor",
    "especialidad": "Dirigencia sindical y parrandas navideñas",
    "localidad": "San Sebastián",
    "anios": "9 Feb. 1934 – 3 Jun. 2010",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Cirilo Malaver.jpg",
    "descripcion": [
    "Cirilo de Jesús Malaver nació el 9 de febrero de 1934 en San Sebastián. Trabajó en la industria petrolera y obtuvo la licencia como Operador y Motorista de la Marina Mercante.",
    "Fue un gran dirigente sindicalista por la clase obrera en el Zulia, ocupando el cargo de Secretario General del Sindicato Único de la Construcción, luchando por los derechos de los trabajadores.",
    "Como cultor, preparaba los tradicionales 'Judas' en semana santa. Tocaba el cuatro, componía décimas y cantaba en las parrandas navideñas de su pueblo, siendo parte activa de la vida cultural de San Sebastián. Falleció el 3 de junio de 2010."
]
  },
  {
    "id": 134,
    "nombre": "Vicenta Rojas Mata",
    "disciplina": "Personajes / Médica Cirujana",
    "especialidad": "Medicina",
    "localidad": "San Sebastián",
    "anios": "Nacida el 25 Jul. 1932",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/VICENTA ROJAS MATA.jpg",
    "descripcion": [
    "Vicenta Rojas Mata nació el 25 de julio de 1932. Desde niña se interesó en aprender a leer y escribir. Se trasladó a La Asunción y a Caracas para estudiar, mostrando desde temprano una determinación poco común para la época.",
    "Con grandes deseos de superación, viajó al estado Mérida donde se graduó de médico cirujano en la Universidad de Los Andes el 21 de julio de 1957.",
    "Ejerció en la Maternidad Concepción Palacios y el hospital de los Seguros Sociales en Chacao. Fue una de las primeras mujeres médico de Tacarigua, allanando el camino para las generaciones que la siguieron."
]
  },
  {
    "id": 135,
    "nombre": "Mario Gabriel Alfonzo Lista",
    "disciplina": "Personajes / Cronista y Escritor",
    "especialidad": "Investigación histórica, fotografía y cine",
    "localidad": "San Sebastián de Tacarigua",
    "anios": "Nacido el 9 Ene. 1956",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Mario Gabriel Alfonzo.jpg",
    "descripcion": [
    "Mario Gabriel Alfonzo Lista es un intelectual integral de San Sebastián de Tacarigua, nacido el 9 de enero de 1956. Es investigador histórico, cronista, literato, fotógrafo, cineasta y gestor cultural.",
    "Como Investigador Histórico y Cronista, su capacidad para reconstruir la historia local a partir de fuentes orales y documentales lo ha convertido en una autoridad en la historiografía insular. Como escritor y fotógrafo ha documentado la transformación del paisaje margariteño y la vida cotidiana de sus comunidades.",
    "En MOCULTA ha llevado adelante la formación pedagógica y educación ambiental. Ha producido documentales sobre la historia de la parroquia Guevara. Fue juramentado como Cronista Honorario por la Asociación de Cronistas Oficiales del Estado Nueva Esparta (ACOENE) en 2021."
]
  },
  {
    "id": 136,
    "nombre": "Jesús 'Bubo' Malaver",
    "disciplina": "Personajes / Promotor Cultural",
    "especialidad": "Presidencia de MOCULTA y oratoria",
    "localidad": "Tacarigua",
    "anios": "Figura contemporánea",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Jesus Bubo Malaver.jpg",
    "descripcion": [
    "Jesús 'Bubo' Malaver es un baluarte de la memoria colectiva margariteña y uno de los líderes culturales más respetados de Tacarigua. Asumió la presidencia de MOCULTA entre 1992 y 1997, durante un período crucial para la consolidación del movimiento cultural.",
    "Bajo su liderazgo se consolidaron tradiciones como los velorios de la Cruz, las festividades de San Sebastián y los festivales de galerón. Fue pieza clave en la directiva del periódico local 'Cosecha'.",
    "Su labor como orador de orden y figura pública lo ha posicionado como una autoridad moral y cultural respetada profundamente en todo el municipio Gómez. Es, en esencia, la voz de la memoria colectiva de su pueblo."
]
  },
  {
    "id": 137,
    "nombre": "Ana María Guzmán Landaeta",
    "disciplina": "Músicos / Cantante",
    "especialidad": "Cantos tradicionales e informátcia",
    "localidad": "Tacarigua",
    "anios": "Nacida el 2 Dic. 1975",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Ana Maria Guzman.jpg",
    "descripcion": [
    "Ana María Guzmán Landaeta nació el 2 de diciembre de 1975. Es una figura fundamental del panorama artístico neoespartano y guardiana del patrimonio sonoro de Margarita.",
    "Licenciada en Informática, complementa su formación técnica con el canto coral y tradicional. Ha integrado la Orquesta Típica Margariteña y agrupaciones como la Coral Santa Ana y la Escuela de Cantos Tradicionales.",
    "Ha participado en producciones discográficas clave como 'Como yo te quiero' y diversas grabaciones de MOCULTA. Sirve de puente entre las generaciones pasadas y las actuales, asegurando que las tradiciones de Tacarigua resuenen en la identidad del pueblo."
]
  },
  {
    "id": 138,
    "nombre": "Claudia Franco Carrizalez",
    "disciplina": "Músicos / Cantante",
    "especialidad": "Música tradicional contemporánea",
    "localidad": "Tacarigua",
    "anios": "Voz juvenil destacada",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Claudia Franco.jpg",
    "descripcion": [
    "Claudia Franco Carrizalez es una exponente de la vanguardia de la música tradicional margariteña. Además de su vida artística, cursó Contaduría Pública en la UDO.",
    "Formada por maestros como Javier Valderrama, Dalmiro Malaver 'La Culebrita de Oriente' y el contrabajo en Otilca. Ha ganado numerosos festivales como 'Zumba que Zumba y Polo' y 'Jota y Malagueña'.",
    "Destaca su faceta como solista con su producción 'Más que un sol', donde aporta una visión juvenil y renovada al folklore margariteño, demostrando que la tradición puede dialogar con la contemporaneidad."
]
  },
  {
    "id": 139,
    "nombre": "Norelys Gil",
    "disciplina": "Músicos / Instructora Vocal",
    "especialidad": "Canto tradicional y preservación",
    "localidad": "Tacarigua",
    "anios": "Referente folclórica",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Norely Gil.jpg",
    "descripcion": [
    "Norelys Gil es conocida como una 'voz de seda' del folklore margariteño. Es una exponente de pureza interpretativa poco común en la música oriental venezolana.",
    "Su voz ha sido fundamental en proyectos de salvaguarda cultural, como las producciones de la Fundación Cheguaco y el álbum 'Como yo te quiero', que reúne las voces más representativas de Tacarigua.",
    "Funge como instructora de canto tradicional en MOCULTA, formando a nuevas generaciones y actuando como mentora. Su dedicación a la enseñanza es tan destacada como su propio talento interpretativo."
]
  }
,
  {
    "id": 8,
    "nombre": "Evaristo \"Lico\" Lárez",
    "disciplina": "Músicos / Compositor y Poeta",
    "especialidad": "Galerón, décimas y parrandas",
    "localidad": "Tacarigua / San Sebastián",
    "anios": "26 May. 1916 – 14 Jun. 2000",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Evaristo Lico Lárez.jpg",
    "descripcion": [
      "Evaristo Lárez, bautizado como Sixto de Jesús y eternizado popularmente como \"Lico\" Lárez, fue un célebre agricultor, peluquero, músico, poeta y el primer gran juglar de San Sebastián de Tacarigua. Nacido el 26 de mayo de 1916, Lárez se consagró como una de las figuras esenciales de la identidad cultural margariteña del siglo XX.",
      "Lico Lárez creció inmerso en la geografía rural del valle de San Sebastián, un contexto que definió la esencia de su obra. Lejos de poseer una educación académica formal, su genialidad artística floreció directamente de la tierra y de las tradiciones orales que heredó de su entorno. A lo largo de su vida, entrelazó tres oficios con natural maestría: la agricultura, la peluquería y la música.",
      "Como músico veterano, Lárez tocó en una gran cantidad de agrupaciones y orquestas tanto dentro como fuera de la Isla de Margarita. Sin embargo, su estampa más recordada era la de un hombre de andar pausado y sonrisa campechana, que recorría las calles con un cuatro bajo el brazo, improvisando serenatas y animando parrandas bajo la sombra de los árboles.",
      "El rasgo distintivo de Lico Lárez fue su numen indomable. Tenía la capacidad única de \"crujir los dientes\" mientras hilaba ideas en su mente para convertirlas instantáneamente en versos rimados. Su poesía de versos libres e irónicos no buscaba la solemnidad, sino retratar la vida comunitaria con humor y ternura.",
      "La música de Lico Lárez permanece resguardada como patrimonio histórico en los archivos de instituciones como la Fundación Cheguaco. Entre sus composiciones más memorables destacan: \"Familia Campesina\", \"Historia de la Arepa\", \"Guarapo e' Caña en Pecoro\" y \"Mi Valle Querido\".",
      "En el año 1999, el Ejecutivo Regional lo declaró formalmente Patrimonio Cultural Viviente del Estado Nueva Esparta. Solo un año después, el 14 de junio del año 2000, a la edad de 84 años, Lico Lárez falleció en la misma tierra de Tacarigua que lo vio nacer."
    ]
  }
,
  {
    "id": 25,
    "nombre": "Hernán José Malaver \"El Tacarigüero\"",
    "disciplina": "Músicos / Galeronista",
    "especialidad": "Canto de Galerón y Poesía Oriental",
    "localidad": "Tacarigua Adentro / San Sebastián",
    "anios": "8 Jun. 1940 – 26 May. 1989",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Hernan Jose Malaver.jpg",
    "descripcion": [
      "Hernán José Malaver nació el 8 de junio de 1940 en San Sebastián (Tacarigua Adentro). Desde niño, siguiendo los caminos de la labranza y el conuco, componía cantos y estrofas al aire libre. Era un artista natural forjado por la tierra y el viento del Portachuelo.",
      "Representó a Nueva Esparta en Caracas a los 14 años en la Semana de la Patria. Desde entonces participó en diversiones populares como programador, compositor y autor. Su primera actuación formal en la improvisación del galerón fue en Puerto Ordaz en 1968.",
      "Por insinuación de su hermano José Ramón, adoptó el nombre de batalla \"Hernán Malaver, el Tacarigüero\", una identidad que fusionaba orgullo territorial con vocación artística. Este nombre lo inmortalizó en los festivales de galerón de todo el oriente venezolano.",
      "Laboró en la Siderúrgica del Orinoco (SIDOR) por varios años, mientras combinaba su talento musical con giras nacionales e internacionales. Representó a Venezuela en Cuba (1979) y Puerto Rico (1988), llevando el galerón margariteño a escenarios internacionales.",
      "Fue miembro fundador del Movimiento Cultural Tacarigua Adentro (MOCULTA), institución que hoy lleva su legado. Falleció prematuramente en Caracas el 26 de mayo de 1989, a los 49 años, víctima de una grave enfermedad. Sus restos reposan en su amada Tacarigua, eternamente bañada por la brisa del Portachuelo."
    ]
  }
,
  {
    "id": 140,
    "nombre": "Ricardo Lárez",
    "disciplina": "Músicos / Cuatrista y Defensor del Folklore",
    "especialidad": "Cuatro venezolano, canto tradicional, galerón y gaita margariteña",
    "localidad": "San Sebastián / Tacarigua — Municipio Gómez",
    "anios": "7 Feb. 1954 — Presente",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Ricardo Larez.jpg",
    "descripcion": [
      "Ricardo Lárez es un destacado músico, cuatrista y defensor del folklore venezolano, nacido el 7 de febrero de 1954 en la población de San Sebastián, vecina de Tacarigua (Municipio Gómez), en la Isla de Margarita, estado Nueva Esparta. Es reconocido a nivel local y regional como un auténtico custodio del patrimonio musical y de la identidad cultural del oriente del país.",
      "Nació y creció en el seno de uno de los hogares con mayor arraigo artístico de la región, lo que definió su destino musical desde temprana edad. Por línea paterna, es hijo del recordado Evaristo «Lico» Lárez, uno de los poetas, improvisadores, decimistas y compositores populares más ingeniosos del norte de Margarita, catalogado en las crónicas como el «primer juglar de nuestro terruño». Por línea materna, es hijo de la señora Etanislá Malaver, perteneciente a una respetada estirpe comunitaria cuya residencia familiar sirvió históricamente como punto de encuentro para las parrandas y cantos tradicionales de San Sebastián. Además, Ricardo es medio hermano del célebre compositor, guitarrista y poeta Simón Guerra Malaver, figura clave en la difusión de la gaita margariteña.",
      "Al criarse en una encrucijada donde confluían las familias Lárez, Guerra y Malaver —tres de los apellidos más ligados a la música tradicional del oriente venezolano— Ricardo asimiló de forma natural la ejecución del cuatro venezolano y los secretos del canto traditional. Su infancia y juventud transcurrieron entre los acordes de parrandas navideñas, diversiones orientales y el rigor poético del galerón y la gaita tradicional. A diferencia de las corrientes comerciales, su trayectoria se ha caracterizado por un carácter profundamente comunitario y preservacionista.",
      "Ha dedicado décadas a resguardar las estructuras originales de los cantos de su pueblo y a ejecutar las composiciones heredadas de su padre —como el conocido tema tradicional «Guarapo e caña en pecoro»—. Su presencia ha sido fundamental en festividades patronales, velorios de Cruz de Mayo y encuentros culturales del Municipio Gómez, sirviendo de puente vivo entre la generación dorada del siglo XX y los nuevos relevos de la isla. A sus más de 70 años de edad, Ricardo Lárez personifica la memoria histórica de San Sebastián: un baluarte de la venezolanidad cuya vida auténtica representa el esfuerzo silente pero inquebrantable de las familias de cultores que sostienen la música tradicional de la Isla de Margarita."
    ]
  }
,
  {
    "id": 141,
    "nombre": "Francisco Lárez «Yico Campana»",
    "disciplina": "Músicos / Artista Polifacético",
    "especialidad": "Música, canto, actuación y humor popular",
    "localidad": "San Sebastián / Tacarigua",
    "anios": "24 Ene. 1971 — Presente",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Francisco Larez.jpg",
    "descripcion": [
      "Francisco Larez, también conocido como Yico el de Guillermina, Yico Campana es un artista polifacético nacido el 24 de enero de 1971. Con una trayectoria notable en el ámbito de la música, el canto y la actuación, ha dejado una huella significativa en la cultura de su pueblo, San Sebastián.",
      "Desde sus inicios, Yico ha demostrado un talento excepcional y una pasión desbordante por las artes. Su versatilidad como músico y cantante le ha permitido explorar diferentes géneros y estilos musicales, cautivando a audiencias con su voz única y su habilidad interpretativa.",
      "Además de su faceta musical, Yico también ha incursionado con éxito en el mundo de la actuación y humorista, destacándose por su carisma y presencia en escena. Su dedicación a la cultura de San Sebastián se refleja en su compromiso constante con la promoción y preservación de las tradiciones locales, así como en su apoyo a iniciativas culturales en la comunidad.",
      "Francisco Larez, o Yico, es un artista completo cuyo talento y pasión han enriquecido la escena cultural de San Sebastián y deja una marca indeleble en el corazón de quienes han tenido el privilegio de disfrutar de su arte."
    ]
  },
  {
    "id": 142,
    "nombre": "Domingo Ramón Carrasquero Ordaz",
    "disciplina": "Intelectual / Académico / Escritor",
    "especialidad": "Gestión cultural, historia económica, crónica",
    "localidad": "Valle de Tacarigua, Isla de Margarita",
    "anios": "6 Ago. 1944 — Presente",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Domingo Carrasquero.jpg",
    "descripcion": [
      "Domingo Ramón Carrasquero Ordaz es una figura fundamental en el acervo cultural y literario del estado Nueva Esparta. Nacido en el Valle de Tacarigua, Isla de Margarita, el 6 de agosto de 1944, su vida ha sido una constante trayectoria de servicio intelectual, dedicación académica y un profundo amor por las raíces margariteñas.",
      "Su infancia estuvo marcada por la movilidad propia de la época; la diáspora familiar llevó a los Carrasquero a residenciarse en El Tejero, estado Monagas, donde cursó sus estudios primarios. Posteriormente, regresó a su tierra insular para completar su formación secundaria, destacándose en el emblemático Liceo Nueva Esparta de Porlamar y el Liceo Rísquez de La Asunción. Su sed de conocimiento lo impulsó a cursar estudios superiores, obteniendo dos licenciaturas que fundamentaron su perfil profesional: Licenciatura en Administración Comercial por la Universidad de Oriente (UDO), Núcleo Sucre, y Licenciatura en Contaduría Pública por la Universidad Santa María.",
      "Más allá de su faceta administrativa, Carrasquero se ha distinguido por un compromiso cívico inquebrantable con la identidad regional. Su labor de gestión cultural ha sido vital para la preservación de la memoria histórica insular, destacándose como Presidente del Comité de Desarrollo Cultural de Tacarigua, impulsando iniciativas locales de revalorización histórica, y Director General de la Academia de la Historia del Estado Nueva Esparta, desde donde ha liderado esfuerzos por documentar y proteger el patrimonio intelectual de la región.",
      "La vocación de Domingo Carrasquero por la escritura comenzó tempranamente, ganando reconocimiento desde sus años en el liceo, donde fue premiado por un soneto dedicado a la mujer de su pueblo natal. Su producción literaria es vasta y diversa, abordando desde la historia económica hasta la crónica costumbrista. Entre sus obras publicadas y preparadas se encuentran: Tacarigua: apuntes para su historia, Domingadas, Vivencias y ausencias, Escuelas federales del estado Nueva Esparta, Gente de mi pueblo, Décimas, centésimas y milésimas, Apuntes del abuelo, Antecedentes históricos del Impuesto Sobre la Renta, Historia de los impuestos, OPEP, Precios y Petróleo, y Pinceladas de mi tierra (en preparación).",
      "Asimismo, su sensibilidad artística ha dejado una huella imborrable en el cancionero popular margariteño. Es el autor de la letra de piezas emblemáticas como el \"Diccionario Margariteño\" y la popular gaita \"Los Zapatos Maqueros\" (originalmente titulada Carta a José Ramón Villarroel). Estos temas, interpretados magistralmente por Miguel Serra con el grupo Cuerdas Espartanas, se han convertido en verdaderos himnos de la identidad insular, reflejando el ingenio y el humor del oriente venezolano."
    ]
  },
  {
    "id": 143,
    "nombre": "Emigdio Malaver González «Millo»",
    "disciplina": "Periodista / Escritor / Economista",
    "especialidad": "Crónica, periodismo regional, humor insular",
    "localidad": "Tacarigua, Isla de Margarita",
    "anios": "Contemporáneo",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Emigdio Malaver.jpg",
    "descripcion": [
      "Emigdio Malaver González, conocido popularmente en el ámbito literario y cultural como \"Millo\", es un destacado periodista, economista, escritor y cronista venezolano. Es originario de Tacarigua, un pueblo cargado de tradición en la Isla de Margarita, Estado Nueva Esparta, lugar que sirve como la principal fuente de inspiración para gran parte de su obra escrita.",
      "Egresó inicialmente como economista, profesión que ejerció a la par de sus pasiones humanísticas. Más tarde formalizó su vocación por las letras cursando estudios de Comunicación Social. Trabajó durante años para el Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT). Condujo entrevistas de corte cultural y social transmitidas por televisoras regionales en el estado Nueva Esparta.",
      "Su escritura destaca por rescatar la idiosincrasia margariteña, el humor insular, el costumbrismo y la memoria histórica de los pueblos orientales. En sus columnas utiliza con frecuencia el pseudónimo y personaje de \"Pedro Cuartilla\" para narrar realidades cotidianas y debatir reflexiones filosóficas o políticas.",
      "Es columnista activo de diversos medios impresos y digitales de renombre regional y nacional como El Sol de Margarita, la plataforma Aporrea y la radio digital Otilca Radio. Es autor del libro La vida entre crónicas y cuentos, una compilación antológica de sus mejores relatos breves y anécdotas populares. También ha escrito obras de corte reflexivo como Monólogo antes de que se acabe el mundo. Su labor ha sido homenajeada en eventos como la Feria Internacional del Libro de Venezuela (FILVEN) en capítulos regionales celebrados en La Asunción.",
      "Recibió el prestigioso Premio de Periodismo Aníbal Nazoa en la categoría de Medios Alternativos y Comunitarios. El jurado reconoció de manera unánime su amplia destreza para manejar los diferentes géneros periodísticos y el impacto de su pluma de opinión."
    ]
  },
  {
    "id": 144,
    "nombre": "Enrique Rivero Núñez",
    "disciplina": "Arquitecto / Promotor Cultural",
    "especialidad": "Planificación urbana, desarrollo social",
    "localidad": "Tacarigua, Isla de Margarita",
    "anios": "2 Feb. 1947 — Presente",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Enrique Rivero.jpg",
    "descripcion": [
      "Enrique Rivero Núñez es un destacado arquitecto, planificador urbano, promotor cultural y líder comunitario venezolano. Nació el 2 de febrero de 1947 en la población de Tacarigua, ubicada en la Isla de Margarita, Estado Nueva Esparta. Es ampliamente reconocido en la región insular por ostentar el mérito histórico de ser el primer arquitecto nativo de Tacarigua, consagrando su vida profesional y civil al desarrollo social, la preservación de la identidad folclórica y el crecimiento urbanístico de su tierra natal.",
      "Nació en el seno de un hogar profundamente arraigado en los valores civiles y el progreso del Municipio Gómez. Es hijo de Beltrán e Isabelita, miembros de una familia muy respetada que ha dado ilustres servidores públicos a la Isla de Margarita. Fue hermano menor del recordado Ingeniero Civil Pedro Rivero Núñez (1935–2025), quien fuera Secretario de Obras Públicas del estado y un pilar fundamental en la modernización de la infraestructura cultural y vial de Nueva Esparta. Esta fuerte influencia familiar consolidó su temprana vocación por la transformación de los espacios públicos y la arquitectura social. En el ámbito personal, constituyó su hogar junto a su esposa, la docente Nelo, con quien comparte una familia de cinco hijos, preservando una tradición de servicio a través de la educación y el impulso comunitario.",
      "Tras culminar sus estudios superiores y graduarse como profesional de la arquitectura, Rivero Núñez orientó su práctica al desarrollo regional. Su desempeño técnico combinó la práctica privada con el ejercicio de la función pública, siempre con miras al ordenamiento del territorio insular. A comienzos de la década de los noventa, asumió la Dirección de Desarrollo Urbano del Estado Nueva Esparta. Desde esta posición, lideró importantes iniciativas para regular el crecimiento habitacional y comercial en la isla, buscando mitigar el impacto ambiental del acelerado auge turístico y comercial de la región y priorizando siempre el bienestar de las comunidades locales.",
      "Desde el año 1997, el arquitecto Rivero Núñez ha concentrado sus esfuerzos técnicos y creativos en el diseño del Proyecto Monumental al Sagrado Corazón de Jesús, concebido como un tributo al santo patrono de Tacarigua y un hito para el turismo religioso regional. Una majestuosa escultura de 27 metros de altura proyectada para implantarse en el Cerro Pelón. El diseño de la escultura se estructura a partir de dos ejes horizontales orientados matemáticamente de norte a sur y de este a oeste, logrando un equilibrio estructural mediante un eje vertical central. Contempla el desarrollo de 6 terrazas visitables dentro de la propia escultura. Las terrazas funcionarán como miradores que permitirán contemplar una vista panorámica integral. Para viabilizar este proyecto, se constituyó la fundación que lleva su nombre.",
      "Fiel creyente de que el desarrollo de los pueblos no depende exclusivamente de las directrices gubernamentales, Rivero Núñez ha sido un ferviente defensor de la autogestión comunitaria. Ha sido un miembro activo y protector del Centro Cultural Pablo Romero Millán de Tacarigua. A través de esta plataforma, ha impulsado programas de formación musical (enseñanza de cuatro y guitarra), danza folclórica y el mantenimiento de servicios bibliotecarios para los jóvenes en edad escolar. Bajo su dirección y la de otros líderes locales, el centro ha promovido jornadas vecinales de arborización, limpieza y rescate de espacios públicos, convirtiéndose en un modelo de civismo e identidad margariteña. Su legado combina de manera armónica el rigor de la planificación urbana con una profunda sensibilidad por la memoria histórica, el arte popular y las tradiciones de la Isla de Margarita."
    ]
  },
  {
    "id": 145,
    "nombre": "Carlos Eduardo Ramos González",
    "disciplina": "Músicos / Multiinstrumentista, Compositor y Arreglista",
    "especialidad": "Cuatro, Mandolina, Guitarra, Bajo, Teclado, Composición, Arreglos Musicales, Dirección Musical",
    "localidad": "Tacarigua, Municipio Gómez, Estado Nueva Esparta",
    "anios": "12 de diciembre de 2003 — Presente",
    "bandera": "🇻🇪",
    "imagen": "/images/cultores/Carlos Musico.jpeg",
    "activo": true,
    "descripcion": [
      "Carlos Eduardo Ramos González, nacido el 12 de diciembre de 2003, es un joven margariteño cuya vida transcurre entre el rigor de la ingeniería y la sensibilidad del artista. Hijo de Calixto Ramos González y Mariangelis González Lárez, y hermano de Vivían y Carla, Carlos ha consolidado desde muy temprana edad una identidad marcada por su profunda conexión con las tradiciones de su tierra.",
      "Formación y Trayectoria Académica\n\nSu camino educativo comenzó en la Unidad Educativa Estadal \"Cruz Millán García\", situada en el pueblo de San Sebastián, donde cursó desde la primaria hasta obtener su título de bachiller. Actualmente, Carlos demuestra su capacidad multidisciplinaria como estudiante de Ingeniería de Sistemas en la Universidad Nacional Experimental Politécnica de la Fuerza Armada (UNEFA), destacando por su compromiso con el desarrollo tecnológico y su identidad cultural.",
      "Un Virtuoso a Temprana Edad\n\nLa precocidad musical de Carlos es uno de sus rasgos más distintivos. Inició su camino cantando galerón en la Escuela de Cantos Tradicionales \"Hernán Malaver\" del Movimiento Cultural Moculta. A los ocho años, comenzó su aprendizaje del cuatro con la guía de Petra R. González Malaver. Su formación técnica se robusteció con el Maestro Alberto \"Beto\" Balderrama Patiño, quien le instruyó en el bandolín en el Comité de Desarrollo Cultural de Tacarigua, y posteriormente con el Maestro Eliut González, quien le brindó una sólida base en el cuatro y teoría musical. Su destreza técnica alcanzó un nivel de dominio absoluto en la mandolina bajo la tutela del Maestro Eli Guerra Morao.\n\nLejos de detener su aprendizaje, hoy sigue perfeccionándose en la mandolina con el Maestro Erasmo Cardona Marcano, mientras continúa sus estudios de guitarra y teclado con los Maestros Eliut González y Gustavo Reyes.",
      "Vocación, Liderazgo, Arreglos y Creación Musical\n\nEn su incansable labor por fomentar el arte en las nuevas generaciones, Carlos desempeña actualmente la labor de maestro de música en la Casa de la Cultura \"Monseñor Nicolás Eugenio Navarro\", transmitiendo sus conocimientos a otros jóvenes talentos. A pesar de su juventud, Carlos ha logrado una madurez artística asombrosa, convirtiéndose en un referente técnico dentro de la escena regional. No solo ejecuta con maestría el cuatro, la mandolina, la guitarra, el bajo y el teclado, sino que ha asumido el rol de arreglista en la gran mayoría de los temas musicales en los que ha participado, aportando una visión técnica y estética propia a cada proyecto.\n\nSu huella en la música es evidente en su polifacética carrera actual:\n• Fundador y director del grupo \"Reencuentro Juvenil\".\n• Coordinador musical de la agrupación \"Proyecto Ceibero\".\n• Integrante de la Agrupación Musical \"La Ceiba\".\n• Integrante del grupo musical de la UNEFA.\n\nA lo largo de su trayectoria, ha participado en más de 25 grabaciones de temas musicales, un testimonio de su intensa labor de estudio y disciplina. Un hito fundamental en su carrera es su debut como compositor, al haber escrito tanto la letra como la música del tema \"Mi pueblo, mi patrón\", una obra que refleja su amor por sus raíces.",
      "Experiencia en Escenarios y Vínculos Culturales\n\nCarlos ha compartido tarima con artistas y agrupaciones de alto prestigio en el estado Nueva Esparta, incluyendo a Jennifer Moya y Los Juicios, Los Topotopos de Margarita, Grupo Ardentía y Parranderos de la Salina. Su trayectoria también incluye el paso por el grupo \"Esencia de Pueblo\" (dirigido por Yaneira Malaver y Ricardo Lárez), el Grupo Folklórico Moculta, y la Estudiantina Maestro Cecilio \"Chilo\" Guerra (bajo la dirección de Eli \"Licho\" Guerra Morao). Asimismo, mantiene vínculos con la Escuela de Música \"Eliut González\" en la Casa de la Cultura Poeta \"Pedro Rivero\" de Tacarigua y con el Maestro Carlos Ortiz de Porlamar.",
      "Vida Integral: Deporte y Campo\n\nComplementando su vida intelectual y artística, Carlos mantiene un estilo de vida activo. Siente un gran interés por la agricultura, además de ser un entusiasta practicante de deportes, destacándose en el baloncesto, el béisbol y el atletismo.\n\nEsta biografía captura la esencia de un joven que, con solo 22 años, ya ha dejado una huella indeleble en la música margariteña, combinando la técnica de un arreglista experimentado con el alma de un compositor profundamente comprometido con su pueblo."
    ]
  }
];

export const historiaMock = [
  {
    id: 1,
    anio: '4357 a.C.',
    activo: true,
    titulo: 'Llegada de los Guaiqueríes a Margarita',
    descripcion: 'Según estudios de Cecilia Ayala Lafée, Pedro Rivas Gómez y Werner Wilbert, las comunidades guaiqueríes accedieron a la región neoespartana hace aproximadamente 4.357 años. Margarita vivió cinco ocupaciones indígenas sucesivas antes del contacto europeo.',
    imagen: '/images/valle-tacarigua-vista-satelite-nasa.webp',
    tag: 'Período Prehispánico',
  },
  {
    id: 2,
    anio: '29 Sep. 1579',
    activo: true,
    titulo: 'Encuentro de los Tacaribas con Miguel Maza de Lizana',
    descripcion: 'El Gobernador de Margarita, Miguel Maza de Lizana, se encontró con los indígenas guaiqueríes conocidos como Tacaribas en las estribaciones desde el Cerro Pelón hasta el Manantial de Belén, en septiembre y octubre de 1579. El valle era conocido como El Valle de los Olleros.',
    imagen: '/images/paisaje-hero-tacarigua.webp',
    tag: 'Conquista Española',
  },
  {
    id: 3,
    anio: 'Siglo XVI',
    activo: true,
    titulo: 'El Valle de los Olleros y la Banda del Norte',
    descripcion: 'Indígenas de El Cercao, Tacarigua, Santa Ana, La Vecindad, Altagracia y Pedro González fabricaban cerámica de barro: ánforas, tinajones y platos. Los españoles catalogaron el territorio como la Banda del Norte del Portezuelo, desde las estribaciones del cerro hasta Juangriego.',
    imagen: '/images/iglesia-plaza-tacarigua-aerea.webp',
    tag: 'Toponimia Colonial',
  },
  {
    id: 4,
    anio: '1813–1818',
    activo: true,
    titulo: 'Tacarigua en la Independencia',
    descripcion: 'Tacarigua aportó héroes como el Teniente José Rafael Guevara, el Capitán José Victorino Guzmán — defensor del Portachuelo del Norte —, Juan Tomás Gil y José Jesús Guevara, legislador del Congreso de Angostura de 1819. Entre 1815 y 1818, el pueblo sirvió de hospital para la tropa patriota.',
    imagen: '/images/plaza-hexagonal-tacarigua.webp',
    tag: 'Independencia',
  },
  {
    id: 5,
    anio: '21 Ene. 1817',
    activo: true,
    titulo: 'Nace Diego B. Urbaneja Alayón',
    descripcion: 'En la casa del patriota José Victorino Guzmán, en Corazón de Jesús, nació Diego Bautista Urbaneja Alayón, quien sería Presidente de la República en varias ocasiones. Fue bautizado en Santa Ana del Norte el 15 de febrero de 1817.',
    imagen: '/images/iglesia-plaza-tacarigua-aerea.webp',
    tag: 'Personaje Histórico',
  },
  {
    id: 6,
    anio: '12 Jul. 1875',
    activo: true,
    titulo: 'Primera Escuela Federal de Tacarigua',
    descripcion: 'Antonio Guzmán Blanco decretó la creación de la Escuela Federal N° 860. El primer preceptor fue Ignacio Jiménez, con 42 alumnos de sectores de una sola Tacarigua, incluidos Tacarigua, Tacarigüita, El Alto del Gallego y El Río (hoy San Sebastián). Presupuesto inicial: Bs. 240.',
    imagen: '/images/centro-salud-cpt3-tacarigua.webp',
    tag: 'Educación',
  },
  {
    id: 7,
    anio: '1916',
    activo: true,
    titulo: 'Municipio Guevara',
    descripcion: 'Tacarigua se inicia como núcleo del Municipio Guevara, consolidando su desarrollo político-territorial dentro de la Parroquia que lleva el apellido del héroe independentista José Rafael Guevara.',
    imagen: '/images/iglesia-plaza-tacarigua-aerea.webp',
    tag: 'Desarrollo Territorial',
  },
  {
    id: 8,
    anio: '1964',
    activo: true,
    titulo: 'Acueducto Submarino de Margarita',
    descripcion: 'Durante la inauguración del acueducto submarino, Emilia Salinas fue coronada Reina del Acueducto. Este hito transformó el acceso al agua potable en la isla, beneficiando a comunidades que dependían de manantiales y galerías filtrantes.',
    imagen: '/images/SaveClip.App_655961470_18175421617390832_5517042529558604418_n.jpg',
    tag: 'Infraestructura',
  },
  {
    id: 9,
    anio: 'Feb. 2018',
    activo: true,
    titulo: 'Proyecto Memoria Histórica de Tacarigua',
    descripcion: 'Un grupo de tacarigüeros nativos y amigos de la comunidad crearon un Equipo de Trabajo para reconstruir la memoria histórica en cinco módulos: Historia, Educación, Cultura, Sanidad y Deportes, con asesoría de la Academia de la Historia de Nueva Esparta.',
    imagen: '/images/plaza-comunitaria-tacarigua.webp',
    tag: 'Memoria Colectiva',
  },
];

export const bibliotecaMock = [
  {
    id: 1,
    titulo: 'La Tacarigua de Margarita',
    autor: 'José Joaquín Salazar Franco "Cheguaco"',
    categoria: 'Historia Local',
    formato: 'Libros',
    descripcion: 'Obra fundamental de 1971 que documenta la historia, tradiciones y personajes de Tacarigua. Base de la investigación de la Memoria Histórica comunitaria.',
    paginas: 'Referencia histórica',
    imagen: '/images/plaza-hexagonal-tacarigua.webp',
  },
  {
    id: 2,
    titulo: 'Tacarigüita, El Portachuelo y la Virgen de Papaché',
    autor: 'José Joaquín Salazar Franco',
    categoria: 'Patrimonio Religioso',
    formato: 'Libros',
    descripcion: 'Crónica sobre la devoción al Dulce Corazón de María en Tacarigüita, la figura de Don José Núñez "Papaché" y la entronización del Divino Niño en 1992.',
    paginas: 'Patrimonio espiritual',
    imagen: '/images/iglesia-plaza-tacarigua-aerea.webp',
  },
  {
    id: 3,
    titulo: 'Módulo I: Historia (II Edición 2022)',
    autor: 'Equipo Memoria Histórica Tacarigua',
    categoria: 'Historia Local',
    formato: 'Libros',
    descripcion: 'Actualización de la memoria histórica: período prehispánico, encuentro con Miguel Maza de Lizana, Valle de los Olleros, Independencia, Diego Urbaneja y desarrollo territorial.',
    paginas: '97 págs.',
    imagen: '/images/plaza-hexagonal-tacarigua.webp',
  },
  {
    id: 4,
    titulo: 'Módulo III: Cultura',
    autor: 'Equipo Memoria Histórica Tacarigua',
    categoria: 'Patrimonio Cultural',
    formato: 'Libros',
    descripcion: 'Documenta centros culturales, censos, periódicos, bibliotecas, patronos, artesanía, 76 libros de autores tacarigüeros, música, folklore y efemérides.',
    paginas: '153 págs.',
    imagen: '/images/consultorio-popular-tacarigua.webp',
  },
  {
    id: 5,
    titulo: 'El Alarmador (1966)',
    autor: 'Euro O. Gil, Pedro D. Mata y José Agustín Mata',
    categoria: 'Periodismo Local',
    formato: 'Libros',
    descripcion: 'Periódico fundado el 7 de febrero de 1966 en Tacarigua. Parte de la rica tradición periodística de la comunidad junto a "Cívico" y "Marejadas".',
    paginas: 'Archivo comunitario',
    imagen: '/images/calle-colonial-tacarigua.webp',
  },
  {
    id: 6,
    titulo: 'Conjunto Los Andes de Tacarigua',
    autor: 'Archivo Fotográfico Comunitario',
    categoria: 'Música Traditional',
    formato: 'Música',
    descripcion: 'Conjunto muy popular a mediados de los años 60 en música navideña y bailable. Integrantes: Charito Salazar, Valentín Malaver, Hernán González, Pablo "Tuntún" González, entre otros.',
    duracion: 'Archivo',
    imagen: '/images/centro-salud-cpt3-tacarigua.webp',
  },
  {
    id: 7,
    titulo: 'Módulo V: Deportes (II Edición 2022)',
    autor: 'Equipo Memoria Histórica Tacarigua',
    categoria: 'Deportes',
    formato: 'Videos',
    descripcion: 'Crónica deportiva: béisbol (Los Sapos I y II), medallas olímpicas de Nicomedes "Nico" Maza González (1991), ciclismo, maratón, softball y más.',
    duracion: 'Documental',
    imagen: '/images/carretera-araguaneyes-tacarigua.webp',
  },
];

export const adminMetricsMock = {
  usuariosActivos: 1245,
  cultoresValidados: 66,
  elementosBiblioteca: 76,
  registrosHistoria: 0,
  costumbres: 0,
  gastronomia: 0,
  centrosCulturales: 0,
  instituciones: 0,
  centrosSalud: 0,
  disciplinasDeporte: 0,
  efemerides: 0,
  homeCards: 0
};

export const adminModerationMock = [
  {
    id: 1,
    usuario: 'Julián Salazar Velásquez',
    tipo: 'Aporte Histórico',
    detalles: 'Propone incorporar la biografía completa del Dr. Diego B. Urbaneja Alayón al módulo de Historia, con datos del nacimiento en Corazón de Jesús (1817) y sus periodos presidenciales.',
    estado: 'Pendiente',
    prioridad: 'alta',
    fecha: '2024-10-15',
    imagen: '/images/plaza-comunitaria-tacarigua.webp',
  },
  {
    id: 2,
    usuario: 'Mónica Malaver',
    tipo: 'Nuevo Cultor',
    detalles: 'Solicita agregar a Wolfgang Malaver Velásquez, director de la Parranda Los Muchachos de mi Pueblo (CD 2009), al directorio de cultores musicales.',
    estado: 'Pendiente',
    prioridad: 'media',
    fecha: '2024-10-14',
    imagen: '/images/calle-colonial-tacarigua.webp',
  },
  {
    id: 3,
    usuario: 'Euro Omar Gil',
    tipo: 'Aporte Multimedia',
    detalles: 'Donación de archivos del periódico "El Alarmador" (1966) y "Cívico" (1966) para la biblioteca digital de Una Sola Tacarigua.',
    estado: 'Pendiente',
    prioridad: 'alta',
    fecha: '2024-10-12',
    imagen: '/images/iglesia-san-jeronimo-aerea.webp',
  },
];

export const costumbresMock = [
  {
    id: 1,
    titulo: 'Feria de la Cachapa y el Guarapo de Caña Tacariguero',
    descripcion: 'Evento cultural único en Nueva Esparta organizado por el CDC "Pablo Romero Millán" de Tacarigua, en honor a Don Tomás Sánchez y sus amigos campesinos. Cada año, cerca de la Iglesia del Sagrado Corazón de Jesús, unos 70 emprendedores ofrecen cachapas y platos a base de maíz, además del refrescante guarapo de caña. La feria cuenta con un trapiche de madera donde la caña se muele artesanalmente como en la época de los burros y bueyes. Premiado por el jurado de Margarita Gastronómica. Fuente: cheguaco.org',
    imagen: 'https://www.cheguaco.org/wp-content/uploads/2019/02/feria-de-la-cachapa_c1-300x168.jpg',
  },
  {
    id: 2,
    titulo: 'Baile de Burra y Mazorquín',
    descripcion: 'Tradición folclórica de Tacarigua organizada por el CDC "Pablo Romero Millán". El Baile de Burra es una de las diversiones populares más características del pueblo tacarigüero, junto al Mazorquín. Se realizan como actividades de integración comunitaria, colecta de fondos y celebración de las raíces culturales insulares. El CDC también organiza escuelas de galerón, cantos tradicionales y cuatro. Fuente: cheguaco.org',
    imagen: 'https://www.cheguaco.org/wp-content/uploads/2019/01/Cachapa1-225x300.jpg',
  },
  {
    id: 3,
    titulo: 'Fiestas Patronales del Sagrado Corazón de Jesús y San Sebastián',
    descripcion: 'El Sagrado Corazón de Jesús y San Sebastián son los santos patronos de Tacarigua. El Centro Cultural Pablo Romero Millán integra a la comunidad en sus fiestas patronales, con procesiones, música y actividades culturales. La imagen del Sagrado Corazón que hoy reposa en un pedestal fue donada por Julián Salazar, hijo del gran Cheguaco. Fuente: cheguaco.org',
    imagen: '/images/IGLESIA SS.jpg',
  },
  {
    id: 4,
    titulo: 'Las Olimpíadas de Historia de Tacarigua',
    descripcion: 'Proyecto único en el Estado Nueva Esparta en el que un equipo de facilitadores dictó 35 charlas a docentes y alumnos de educación básica sobre Historia, Cultura, Educación, Sanidad y Deportes de Tacarigua. Apoyado por la Fundación Cheguaco, la Casa de la Cultura, CDC, MOCULTA y la Academia de la Historia del Estado. 248 estudiantes participaron en la primera edición, celebrada en junio de 2019. Fuente: cheguaco.org',
    imagen: 'https://www.cheguaco.org/wp-content/uploads/2019/06/65270802_1204808106366649_2898299581232054272_n-300x169.jpg',
  },
  {
    id: 5,
    titulo: 'Velorio de Cruz de Mayo y Parrandas',
    descripcion: 'El Velorio de Cruz de Mayo es una tradición religiosa celebrada en Tacarigua con cantos, procesiones y devoción popular. A esto se suman las parrandas de conjuntos locales como Los Andes, Los Terribles, Los Muchachos de mi Pueblo y el Sexteto CDC, que recorrieron las calles del pueblo repartiendo música sin cobrar, manteniendo viva la tradición parrandera de más de 430 años.',
    imagen: '/images/WhatsApp Image 2026-06-09 at 2.09.07 PM.jpeg',
  },
];

export const gastronomiaMock = [
  {
    id: 1,
    titulo: 'Cachapa Tacarigüera',
    descripcion: 'La cachapa es el plato más emblemático de Tacarigua. En la III Feria de la Cachapa y el Guarapo de Caña Tacariguero, unos 70 emprendedores presentan variaciones de este plato a base de maíz tierno, convirtiendo a Tacarigua en la capital cachemera de Nueva Esparta. La feria premia la mejor presentación, puesto de emprendimiento y plato, con el jurado de Margarita Gastronómica. Fuente: cheguaco.org',
    imagen: 'https://www.cheguaco.org/wp-content/uploads/2019/01/Cachapa2-225x300.jpg',
  },
  {
    id: 2,
    titulo: 'Guarapo de Caña Tacariguero',
    descripcion: 'El guarapo de caña es bebida insigne de Tacarigua. Producido artesanalmente desde trapiches de madera jalados por burros o bueyes, su historia está ligada a Don Tomás Sánchez y su familia campesina. En la Feria de la Cachapa, el CDC trae el trapiche histórico de la finca de los Cerros de Paraguachi para que niños y adultos vean en vivo cómo se produce. La caña, traída por los conquistadores, se reprodujo increíblemente en el Valle de las Tacariguas. Fuente: cheguaco.org',
    imagen: 'https://www.cheguaco.org/wp-content/uploads/2019/02/IMG_20190207_153644-300x225.jpg',
  },
  {
    id: 3,
    titulo: 'Sancocho e Gallo',
    descripcion: 'El sancocho de gallo es una preparación tradicional margariteña documentada en la "Ventana Margariteña" de la Fundación Cheguaco, en el artículo de Denis Rodríguez. Compartido en reuniones familiares, bodas y celebraciones comunitarias, su receta tradicional combina el gallo criollo con verduras de estación. Anécdotas de Cheguaco recuerdan sancochos preparados con motivo de bienvenidas y celebraciones del pueblo. Fuente: cheguaco.org/ventana-margaritena',
    imagen: 'https://www.cheguaco.org/wp-content/uploads/2019/02/reportaje1-300x203.jpg',
  },
  {
    id: 4,
    titulo: 'Caña de Azúcar y Melaza',
    descripcion: 'La caña de azúcar, traída por los conquistadores españoles, tuvo una reproducción increíble en el Valle de las Tacariguas hasta convertirse en símbolo de la tacarigüedad. Los alambiques del pueblo producían melaza y guarapo. La calle conocida como "El Alambique" recuerda aún hoy esta tradición. La caña no solo fue económica sino que unió a la comunidad alrededor de la faena del trapiche y del guarapo compartido. Fuente: cheguaco.org',
    imagen: '/images/WhatsApp Image 2026-06-09 at 2.09.24 PM.jpeg',
  },
  {
    id: 5,
    titulo: 'Productos Originarios del Valle',
    descripcion: 'Los indígenas tacaribas cultivaban piña, lechoza, maíz, yuca, papa y tomate — productos que los conquistadores llevaron al mundo. España, a su vez, aportó café, naranja, limón, mango, caña de azúcar y animales como caballos y cerdos. Esta fusión de sabores prehispánicos y coloniales define la gastronomía tacarigüera hasta hoy. Fuente: Proyecto Tacarigua Histórica 2da Edición, cheguaco.org',
    imagen: '/images/La_Isla_de_Margarita_y_el_valle_de_Tacarigua_vistos_desde_el_espacio_-_FOTO_NASA1.jpg',
  },
];
