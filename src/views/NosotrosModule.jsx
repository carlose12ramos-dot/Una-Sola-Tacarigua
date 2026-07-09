import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import styles from './NosotrosModule.module.css';
import HeroHeader from '../components/ui/HeroHeader';
import ScrollReveal, { StaggerItem, StaggerContainer } from '../components/ui/ScrollReveal';
import { Phone, Mail, User, MessageCircle } from 'lucide-react';

const IMAGES = {
  TACARIGUA: {
    src: '/images/TACARIGUA.webp',
    fallback: '/images/TACARIGUA.jpg',
    alt: 'Vista aerea de la Iglesia y Plaza de Tacarigua de Margarita',
  },
  CREATOR: {
    src: '/images/Carlos Ramos.png',
    alt: 'Carlos Eduardo Ramos González - Creador del Proyecto',
  },
};

const API_BASE = import.meta.env.VITE_API_URL || '/api';

function NosotrosModule() {
  const [featuresData, setFeaturesData] = useState([]);
  const [valuesData, setValuesData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [misionVisionData, setMisionVisionData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/nosotros/features`)
      .then(res => res.json())
      .then(data => { if (data?.length) setFeaturesData(data.map(d => ({ icon: d.icono, title: d.titulo, description: d.descripcion }))); })
      .catch(() => {});
    fetch(`${API_BASE}/nosotros/valores`)
      .then(res => res.json())
      .then(data => { if (data?.length) setValuesData(data.map(d => ({ icon: d.icono, title: d.titulo, description: d.descripcion }))); })
      .catch(() => {});
    fetch(`${API_BASE}/nosotros/stats`)
      .then(res => res.json())
      .then(data => { if (data?.length) setStatsData(data.map(d => ({ icon: d.icono, label: d.label, value: d.valor }))); })
      .catch(() => {});
    fetch(`${API_BASE}/nosotros/mision-vision`)
      .then(res => res.json())
      .then(data => {
        if (data?.length) {
          setMisionVisionData(data.map(d => ({
            icon: d.tipo === 'mision' ? '\u{1F3AF}' : '\u{1F52D}',
            title: d.titulo,
            text: d.contenido,
          })));
        }
      })
      .catch(() => {});
  }, []);
  return (
    <motion.section
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Nosotros | Una Sola Tacarigua</title>
        <meta name="description" content="Conoce la mision, vision y los valores del proyecto Una Sola Tacarigua." />
      </Helmet>

      <HeroHeader
        title="Sobre Nosotros"
        description="Preservando la memoria historica de Tacarigua de Margarita, Estado Nueva Esparta, Venezuela, para las generaciones futuras."
        theme="primary"
        shape="waves"
        images={[
          '/images/calle.jpg',
          '/images/San-Sebastian-1.jpg',
          '/Imagenes Santos/nosotros.jpg',
          '/Imagenes Santos/nosotros 2.jpg'
        ]}
      />

      <div className={styles.innerContent}>

        {/* Mission / Vision */}
        <section className={styles.featureSection}>
          <StaggerContainer delay={0.05}>
            <div className={styles.featureGridDouble}>
              {(misionVisionData.length > 0 ? misionVisionData : [
                { icon: '\u{1F3AF}', title: 'Nuestra Mision', text: 'Digitalizar y preservar la memoria historica de Tacarigua de Margarita, haciendo accesible su rico patrimonio cultural, educativo y social a traves de una plataforma interactiva y colaborativa.' },
                { icon: '\u{1F52D}', title: 'Nuestra Vision',  text: 'Convertirnos en el referente digital mas completo sobre la historia y cultura de Tacarigua, conectando a las generaciones actuales y futuras con sus raices a traves de la tecnologia y la innovacion.' },
              ]).map((item, i) => (
                <StaggerItem key={item.title} index={i}>
                  <motion.article
                    className={styles.featureCard}
                    whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  >
                    <div className={styles.featureIcon}>{item.icon}</div>
                    <h3 className={styles.featureTitle}>{item.title}</h3>
                    <p className={styles.featureText}>{item.text}</p>
                  </motion.article>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        {/* Stats */}
        <section className={styles.mediaSection}>
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.mediaHeader}>
              <h3 className={styles.mediaTitle}>Datos Destacados</h3>
              <p className={styles.mediaLead}>Cifras que reflejan la riqueza historica y cultural de Tacarigua de Margarita.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer delay={0.05}>
            <div className={styles.statsGrid}>
              {(statsData.length > 0 ? statsData : []).map((stat, i) => (
                <StaggerItem key={stat.label} index={i}>
                  <motion.div
                    className={styles.statCard}
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: 'spring', stiffness: 250 }}
                  >
                    <div className={styles.statIcon}>{stat.icon}</div>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        {/* Modules */}
        <section className={styles.featureSection}>
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.mediaHeader}>
              <h3 className={styles.mediaTitle}>Nuestros Modulos</h3>
              <p className={styles.mediaLead}>Conoce las areas que conforman la memoria historica de Tacarigua.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer delay={0.06}>
            <div className={styles.featureGrid}>
              {(featuresData.length > 0 ? featuresData : []).map((feature, i) => (
                <StaggerItem key={feature.title} index={i}>
                  <motion.article
                    className={styles.featureCard}
                    whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    transition={{ type: 'spring', stiffness: 250 }}
                  >
                    <div className={styles.featureIcon}>{feature.icon}</div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureText}>{feature.description}</p>
                  </motion.article>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        {/* Values */}
        <section className={styles.featureSection}>
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.mediaHeader}>
              <h3 className={styles.mediaTitle}>Nuestros Principios</h3>
              <p className={styles.mediaLead}>Los valores que guian nuestro trabajo en preservar la historia de Tacarigua.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer delay={0.05}>
            <div className={styles.valuesGrid}>
              {(valuesData.length > 0 ? valuesData : []).map((value, i) => (
                <StaggerItem key={value.title} index={i}>
                  <motion.div
                    className={styles.valueCard}
                    whileHover={{ scale: 1.04, y: -4 }}
                    transition={{ type: 'spring', stiffness: 250 }}
                  >
                    <div className={styles.valueIcon}>{value.icon}</div>
                    <h4 className={styles.valueTitle}>{value.title}</h4>
                    <p className={styles.valueText}>{value.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        {/* About */}
        <section className={styles.mediaSection}>
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.mediaHeader}>
              <h3 className={styles.mediaTitle}>Por que Una Sola Tacarigua?</h3>
              <p className={styles.mediaLead}>La historia detras de nuestra plataforma digital.</p>
            </div>
          </ScrollReveal>
          <div className={styles.aboutContent}>
            <ScrollReveal variant="left" delay={0.2}>
              <div className={styles.textBlock}>
                <p className={styles.text}>
                  La Parroquia Guevara atesora siglos de historia: desde el encuentro de los indios Tacaribas con Miguel Maza de Lizana en 1579, pasando por heroes de la Independencia como Jose Victorino Guzman, hasta el nacimiento del Presidente Diego B. Urbaneja Alayon en 1817.
                </p>
                <p className={styles.text}>
                  Una Sola Tacarigua nace como la plataforma que lleva esa investigacion al mundo digital: accesible, moderada y fiel a las fuentes comunitarias que la hicieron posible.
                </p>
                <p className={styles.text}>
                  Este proyecto busca preservar y difundir el patrimonio historico, cultural, geografico y social de Tacarigua de Margarita, creando una herramienta educativa gratuita para escuelas, investigadores y la comunidad en general. A traves de modulos interactivos, documentacion digital y recursos multimedia, aseguramos que la memoria de nuestro pueblo trascienda generaciones.
                </p>
                <p className={styles.text}>
                  Nuestro objetivo es evitar la perdida de la memoria historica local, fomentar la identidad cultural en las nuevas generaciones y proporcionar un acceso democratizado al conocimiento, demostrando que la tecnologia puede ser una aliada poderosa en la preservacion de nuestras raices.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right" delay={0.3}>
              <div className={styles.imageBlock}>
                <img
                  src={IMAGES.TACARIGUA.src}
                  alt={IMAGES.TACARIGUA.alt}
                  className={styles.sideImage}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = IMAGES.TACARIGUA.fallback; }}
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Creator */}
        <section className={styles.creatorSection}>
          <ScrollReveal variant="up" delay={0.1}>
            <div className={styles.mediaHeader}>
              <h3 className={styles.mediaTitle}>Creador del Proyecto</h3>
              <p className={styles.mediaLead}>Conoce al desarrollador detrás de Una Sola Tacarigua.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={0.2}>
            <motion.div
              className={styles.creatorCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.creatorBadge}>
                <User size={14} />
                CREADOR DEL PROYECTO
              </div>
              <div className={styles.creatorAvatar}>
                <div className={styles.creatorAvatarInner}>
                  <img
                    src={IMAGES.CREATOR.src}
                    alt={IMAGES.CREATOR.alt}
                    className={styles.creatorAvatarImg}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              </div>
              <div className={styles.creatorDivider} />
              <h3 className={styles.creatorName}>Carlos Eduardo Ramos González</h3>
              <p className={styles.creatorRole}>
                Estudiante de Ingeniería de Sistemas · Músico · Cultor
              </p>
              <p className={styles.creatorBio}>
                &ldquo;Apasionado por la historia, la cultura y las tradiciones de su tierra natal.
                Este proyecto nace del amor por Tacarigua de Margarita y el compromiso de
                preservar su memoria para las futuras generaciones, combinando la formación
                en ingeniería de sistemas con el profundo respeto por nuestras raíces.&rdquo;
              </p>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <Phone size={16} />
                  <span>(0416) 198-0831</span>
                </div>
                <div className={styles.contactItem}>
                  <Mail size={16} />
                  <span>carlose12ramos@gmail.com</span>
                </div>
              </div>
              <motion.a
                href="https://wa.me/584161980831"
                target="_blank"
                rel="noreferrer"
                className={styles.whatsappBtn}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={20} />
                Contáctame por WhatsApp
              </motion.a>
            </motion.div>
          </ScrollReveal>
        </section>

      </div>
    </motion.section>
  );
}

export default NosotrosModule;
