import React, { useEffect } from 'react';
import Sociedad from '../components/Sociedad/Sociedad';
import { supabase } from '../config/supabaseClient';

const SociedadModule = () => {
  useEffect(() => {
    // Ejemplo básico de cómo hacer un fetch de datos desde Supabase
    const fetchDatos = async () => {
      const { data, error } = await supabase
        .from('nombre_de_tu_tabla') // Reemplaza con el nombre de tu tabla en Supabase
        .select('*');
        
      if (error) {
        console.error('Error fetching data from Supabase:', error);
      } else {
        console.log('Data from Supabase:', data);
      }
    };

    fetchDatos();
  }, []);

  return <Sociedad />;
};

export default SociedadModule;
