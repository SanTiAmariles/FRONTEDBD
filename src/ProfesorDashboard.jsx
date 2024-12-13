// ProfesorDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook de navegación
import "./ProfesorDashboard.css";

function ProfesorDashboard() {
  const [classes, setClasses] = useState([]);
  const [showAddClassForm, setShowAddClassForm] = useState(false);
  const [newClass, setNewClass] = useState({ name: "", group: "", code: "", semester: "" });
  const [showErrorModal, setShowErrorModal] = useState(false); // Para mostrar el modal de error
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    // Cargar clases desde localStorage
    const storedClasses = JSON.parse(localStorage.getItem("classes"));
    if (storedClasses) {
      setClasses(storedClasses);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    if (!newClass.name || !newClass.group || !newClass.code || !newClass.semester) {
      setShowErrorModal(true); // Mostrar el modal de error
      return;
    }

    // Crear nueva clase y agregarla a la lista
    const newClassWithId = { ...newClass, id: Date.now() };
    const updatedClasses = [...classes, newClassWithId];

    // Guardar en localStorage
    localStorage.setItem("classes", JSON.stringify(updatedClasses));

    setClasses(updatedClasses);
    setShowAddClassForm(false);
    setNewClass({ name: "", group: "", code: "", semester: "" });
  };

  const handleClassClick = (clase) => {
    // Redirigir a la página de detalles de la clase con el ID
    navigate(`/class-detail/${clase.id}`);
  };

  const handleLogout = () => {
    navigate("/"); // Redirige al usuario a la pantalla de Login
  };

  const closeErrorModal = () => {
    setShowErrorModal(false); // Cerrar el modal de error
  };

  return (
    <div className="profesor-dashboard">
      <div className="sidebar">
        <ul>
          <li onClick={() => navigate("/profesor-dashboard")}>Home</li>
          <li onClick={() => navigate("/configuracion")}>Configuración</li>
          <li onClick={() => navigate("/reportes")}>Reportes</li> {/* Aquí se redirige a la sección de reportes */}
          <li onClick={handleLogout}>Cerrar sesión</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Bienvenido</h1>
        <div className="tarjetas-clases">
          {classes.map((clase) => (
            <div
              key={clase.id}
              className="tarjeta-clase"
              onClick={() => handleClassClick(clase)} // Lógica para redirigir
            >
              <h2>{clase.name}</h2>
              <p>{clase.group}</p>
              <p>{clase.code}</p>
              <p>Semestre: {clase.semester || "No asignado"}</p> {/* Muestra el semestre de la clase */}
            </div>
          ))}
          <div
            className="tarjeta-clase agregar-clase"
            onClick={() => setShowAddClassForm(true)}
          >
            <span>+</span>
            <p>Añadir otra clase</p>
          </div>
        </div>
      </div>

      {/* Modal para agregar clase */}
      {showAddClassForm && (
        <div className="modal">
          <h2>Añadir Clase</h2>
          <form onSubmit={handleAddClass}>
            <input
              name="name"
              type="text"
              placeholder="Nombre de la clase"
              value={newClass.name}
              onChange={handleInputChange}
            />
            <input
              name="group"
              type="text"
              placeholder="Grupo"
              value={newClass.group}
              onChange={handleInputChange}
            />
            <input
              name="code"
              type="text"
              placeholder="Código"
              value={newClass.code}
              onChange={handleInputChange}
            />
            {/* Selector de semestre dentro del modal */}
            <label htmlFor="semester">Semestre: </label>
            <select
              id="semester"
              name="semester"
              value={newClass.semester}
              onChange={handleInputChange}
            >
              <option value="2023-1">2023-1</option>
              <option value="2023-2">2023-2</option>
              <option value="2024-1">2024-1</option>
            </select>
            <button type="submit">Añadir</button>
          </form>
          <button onClick={() => setShowAddClassForm(false)}>Cerrar</button>
        </div>
      )}

      {/* Modal de error si falta algún campo */}
      {showErrorModal && (
        <div className="error-modal">
          <div className="error-modal-content">
            <h3>¡Faltan campos!</h3>
            <p>Por favor completa todos los campos (nombre, grupo, código, semestre).</p>
            <button onClick={closeErrorModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfesorDashboard;
