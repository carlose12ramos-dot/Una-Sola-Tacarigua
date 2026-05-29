import React, { useEffect } from 'react';
import Sociedad from '../components/Sociedad/Sociedad';
import { supabase } from '../config/supabaseClient';

const SociedadModule = () => {
  useEffect(() => {
    if (!supabase) {
      console.warn('Supabase no configurado. Revisa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env.local');
      return;
    }

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
