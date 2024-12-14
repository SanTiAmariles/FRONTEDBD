import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import StudentRegistration from './StudentRegistration';
import TeacherRegistration from './TeacherRegistration';
import ProfesorDashboard from './ProfesorDashboard';
import ClassDetail from './ClassDetail'; 
import Reportes from './Reportes'; 
import StudentView from './StudentView'; // Asegúrate de que la ruta sea correcta

// Crear una instancia de Axios para la configuración predeterminada
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Asegúrate de que esta sea la URL correcta
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', // Esto es necesario si se envía JSON
  },
});

function App() {
  const [authToken, setAuthToken] = useState(null);  // Estado para guardar el token

  // Comprobar si el token existe en el localStorage y configurarlo en Axios
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      api.defaults.headers['Authorization'] = `Bearer ${token}`;  // Añadir el token a las solicitudes
    }
  }, []);

  // Función para manejar el login y guardar el token
  const handleLogin = async (email, password) => {
    try {
      const response = await api.post('/token/', { email, password });
      const token = response.data.access;  // Suponiendo que el backend devuelve el token
      localStorage.setItem('token', token);  // Guardar el token en el localStorage
      setAuthToken(token);  // Actualizar el estado con el token
      api.defaults.headers['Authorization'] = `Bearer ${token}`;  // Añadir el token a las solicitudes
      alert('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales no válidas');
    }
  };

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('token');  // Eliminar el token del localStorage
    setAuthToken(null);  // Limpiar el estado del token
    api.defaults.headers['Authorization'] = '';  // Eliminar el token de las solicitudes
    alert('Sesión cerrada');
  };

  // Ruta protegida: Si no hay token, redirigir al login
  const ProtectedRoute = ({ children }) => {
    if (!authToken) {
      return <Navigate to="/" />;  // Redirige al login si no hay token
    }
    return children;  // Si hay token, muestra el contenido de la ruta
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        
        {/* Rutas públicas */}
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/teacher-register" element={<TeacherRegistration />} />
        
        {/* Ruta protegida para el dashboard del profesor */}
        <Route
          path="/profesor-dashboard"
          element={
            <ProtectedRoute>
              <ProfesorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para ver los detalles de la clase */}
        <Route
          path="/class-detail/:id"
          element={
            <ProtectedRoute>
              <ClassDetail />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para los reportes */}
        <Route
          path="/reportes"
          element={
            <ProtectedRoute>
              <Reportes />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para ver el estudiante */}
        <Route
          path="/estudiante"
          element={
            <ProtectedRoute>
              <StudentView />
            </ProtectedRoute>
          }
        />

        {/* Otras rutas */}
        <Route path="/configuracion" element={<div>Configuración</div>} />
      </Routes>

      {/* Si el usuario está logueado, mostrar botón de logout */}
      {authToken && <button onClick={handleLogout}>Cerrar sesión</button>}
    </Router>
  );
}

export default App;
