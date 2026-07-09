import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Sociedad from '../components/Sociedad/Sociedad';

const SociedadModule = () => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4 }}
  >
    <Helmet>
      <title>Sociedad | Una Sola Tacarigua</title>
      <meta name="description" content="Información sobre la educación, salud, deportes y desarrollo social de la parroquia Tacarigua." />
    </Helmet>
    <Sociedad />
  </motion.div>
);

export default SociedadModule;
