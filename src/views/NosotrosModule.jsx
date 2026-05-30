import styles from './NosotrosModule.module.css';
import { IMAGES } from '../data/images';

function NosotrosModule() {
  return (
    <div className={styles.nosotrosContainer}>
      <header className={styles.header}>
        <span className={styles.badge}>Memoria Histórica</span>
        <h1 className={styles.title}>Sobre Tacarigua Digital</h1>
        <div className={styles.divider} />
        <p className={styles.lead}>
          Plataforma geocultural para preservar y difundir la memoria histórica verificada
          de la Parroquia Guevara, basada en la investigación comunitaria iniciada en 2018.
        </p>
      </header>

      <section className={styles.grid}>
        <article className={styles.card}>
          <div className={styles.iconWrapper}>📜</div>
          <h3 className={styles.cardTitle}>Memoria Histórica Verificada</h3>
          <p className={styles.cardDesc}>
            En febrero de 2018, un grupo de tacarigüeros nativos y amigos de la comunidad creó
            un Equipo de Trabajo para reconstruir la memoria histórica en cinco módulos:
            Historia, Educación, Cultura, Sanidad y Deportes, con asesoría de la Academia de
            la Historia de Nueva Esparta.
          </p>
        </article>

        <article className={styles.card}>
          <div className={styles.iconWrapper}>🏺</div>
          <h3 className={styles.cardTitle}>Patrimonio de Cultores</h3>
          <p className={styles.cardDesc}>
            Directorio de músicos, artesanos, cronistas y compositores documentados en el
            Módulo de Cultura: desde José España Gil, el mejor requintista de Venezuela,
            hasta los olleros del Valle y los 76 libros publicados por autores tacarigüeros.
          </p>
        </article>

        <article className={styles.card}>
          <div className={styles.iconWrapper}>📖</div>
          <h3 className={styles.cardTitle}>Biblioteca Comunitaria</h3>
          <p className={styles.cardDesc}>
            Acceso a las obras de José Joaquín Salazar Franco "Cheguaco", los módulos de
            Memoria Histórica, archivos periodísticos como "El Alarmador" (1966) y registros
            de música folclórica y tradiciones vivas de Tacarigua.
          </p>
        </article>

        <article className={styles.card}>
          <div className={styles.iconWrapper}>🎓</div>
          <h3 className={styles.cardTitle}>La Atenas Neoespartana</h3>
          <p className={styles.cardDesc}>
            Tacarigua fue de las primeras nueve poblaciones del estado en recibir escuelas
            en el siglo XIX. Con un 28,3 % de profesionales universitarios registrado ante la
            UNESCO, la comunidad es reconocida como La Atenas Neoespartana.
          </p>
        </article>
      </section>

      <section className={styles.aboutContent}>
        <div className={styles.textBlock}>
          <h2 className={styles.sectionTitle}>¿Por qué Tacarigua Digital?</h2>
          <p className={styles.text}>
            La Parroquia Guevara atesora siglos de historia: desde el encuentro de los indios
            Tacaribas con Miguel Maza de Lizana en 1579, pasando por héroes de la Independencia
            como José Victorino Guzmán, hasta el nacimiento del Presidente Diego B. Urbaneja
            Alayón en 1817. Esa memoria, documentada por el cronista José Joaquín Salazar Franco
            y actualizada en 2022, no debe quedar en el olvido.
          </p>
          <p className={styles.text}>
            Tacarigua Digital nace como la plataforma que lleva esa investigación al mundo
            digital: accesible, moderada y fiel a las fuentes comunitarias que la hicieron posible.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <img
            src={IMAGES.iglesiaPlazaAerea.src}
            alt={IMAGES.iglesiaPlazaAerea.alt}
            className={styles.sideImage}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = IMAGES.iglesiaPlazaAerea.fallback; }}
          />
        </div>
      </section>
    </div>
  );
}

export default NosotrosModule;
