import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook de navegación
import "./Reportes.css"; // Asegúrate de tener el archivo CSS para estilos si es necesario

function Reportes() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar las clases desde localStorage
    const storedClasses = JSON.parse(localStorage.getItem("classes")) || [];
    setClasses(storedClasses); // Guardar las clases en el estado
  }, []);

  const handleClassChange = (e) => {
    const classId = e.target.value;
    const selectedClass = classes.find((clase) => clase.id === parseInt(classId));
    setSelectedClass(selectedClass);
  };

  const handleLogout = () => {
    navigate("/"); // Redirige al usuario a la pantalla de Login
  };

  return (
    <div className="reportes-container">
      {/* Barra lateral */}
      <div className="sidebar">
        <ul>
          <li onClick={() => navigate("/profesor-dashboard")}>Home</li>
          <li onClick={() => navigate("/configuracion")}>Configuración</li>
          <li onClick={() => navigate("/reportes")}>Reportes</li>
          <li onClick={handleLogout}>Cerrar sesión</li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <h1>Reportes de Clases</h1>

        {/* Filtros */}
        <div className="filtros">
          <h2>Filtros</h2>
          <select onChange={handleClassChange} value={selectedClass ? selectedClass.id : ""}>
            <option value="">Selecciona una clase</option>
            {classes.map((clase) => (
              <option key={clase.id} value={clase.id}>
                {clase.name}
              </option>
            ))}
          </select>
        </div>

        {/* Detalles de la clase seleccionada */}
        {selectedClass && (
          <div className="clase-detalle">
            <h3>{selectedClass.name}</h3>
            <p>Grupo: {selectedClass.group}</p>
            <p>Código: {selectedClass.code}</p>

            {/* Botones de reportes */}
            <div className="botones-reportes">
              <button className="boton-reporte">Lista de Estudiantes</button>
              <button className="boton-reporte">Resumen del Periodo</button>
              <button className="boton-reporte">Total Secciones</button>
              <button className="boton-reporte">Asistencia Promedio</button>
              <button className="boton-reporte">Participación Promedio</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reportes;
