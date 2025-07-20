import axios from 'axios';
import { useEffect, useState } from 'react';

interface Permissions {
  access_web_polygons: boolean;
  access_calendar: boolean;
  access_equipment: boolean;
  access_statistics: boolean;
  access_archive: boolean;
}

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<Permissions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('http://myhectare.ru:8000/api/v1/users/permissions/');
        setPermissions(response.data as Permissions)
      } catch (err) {
        setError('Не удалось загрузить права доступа');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  return { permissions, loading, error };
};
