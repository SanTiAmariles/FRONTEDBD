import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentView = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 1, name: 'Base de Datos', code: '12734', professor: 'Dr. Pérez' },
    { id: 2, name: 'Estructuras de Datos', code: '12845', professor: 'Dra. Gómez' },
  ];

  return (
    <div style={styles.container}>
      {/* Barra lateral */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Menú</h2>
        <ul style={styles.sidebarMenu}>
          <li style={styles.sidebarItem}>Mis Cursos</li>
          <li style={styles.sidebarItem}>Notificaciones</li>
          <li style={styles.sidebarItem}>Perfil</li>
          <li
            style={styles.sidebarItem}
            onClick={() => navigate('/')} // Redirige al login
          >
            Cerrar Sesión
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Bienvenido, Estudiante</h1>
        <p style={styles.subtitle}>
          Aquí puedes ver tus cursos y actividades asignadas.
        </p>

        {/* Tarjetas de cursos */}
        <div style={styles.cardsContainer}>
          {courses.map((course) => (
            <div key={course.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{course.name}</h3>
              <p style={styles.cardInfo}>Código: {course.code}</p>
              <p style={styles.cardInfo}>Profesor: {course.professor}</p>
              <button
                style={styles.cardButton}
                onClick={() => navigate(`/class-detail/${course.id}`)} // Navega a los detalles del curso
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f9f9f9',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    },
    sidebarTitle: {
      fontSize: '20px',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    sidebarMenu: {
      listStyleType: 'none',
      padding: 0,
    },
    sidebarItem: {
      padding: '10px 15px',
      marginBottom: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    mainContent: {
      flex: 1,
      padding: '30px',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: '28px',
      color: '#333',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#777',
      marginBottom: '30px',
    },
    cardsContainer: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
    },
    card: {
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: 'calc(33% - 20px)',
      textAlign: 'center',
      transition: 'transform 0.3s',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    },
    cardInfo: {
      fontSize: '14px',
      color: '#555',
      marginBottom: '10px',
    },
    cardButton: {
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
  };
  
  export default StudentView;