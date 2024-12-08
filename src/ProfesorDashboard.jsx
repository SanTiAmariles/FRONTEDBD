import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para navegar
import "./ProfesorDashboard.css";

function ProfesorDashboard() {
  const [classes, setClasses] = useState([]);
  const [showAddClassForm, setShowAddClassForm] = useState(false);
  const [newClass, setNewClass] = useState({ name: "", group: "", code: "" });
  const navigate = useNavigate(); // Hook de navegación

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
    if (!newClass.name || !newClass.group || !newClass.code) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Crear nueva clase y agregarla a la lista
    const newClassWithId = { ...newClass, id: Date.now() };
    const updatedClasses = [...classes, newClassWithId];

    // Guardar en localStorage
    localStorage.setItem("classes", JSON.stringify(updatedClasses));

    setClasses(updatedClasses);
    setShowAddClassForm(false);
    setNewClass({ name: "", group: "", code: "" });
  };

  const handleClassClick = (clase) => {
    // Redirigir a la página de detalles de la clase con el ID
    navigate(`/class-detail/${clase.id}`);
  };

  return (
    <div className="profesor-dashboard">
      <div className="sidebar">
        <ul>
          <li>Home</li>
          <li>Configuración</li>
          <li>Reportes</li>
          <li>Cerrar sesión</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Hola, ¿Qué deseas hacer?</h1>
        <div className="tarjetas-clases">
          {classes.map((clase) => (
            <div
              key={clase.id}
              className="tarjeta-clase"
              onClick={() => handleClassClick(clase)}
            >
              <h2>{clase.name}</h2>
              <p>{clase.group}</p>
              <p>{clase.code}</p>
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
            <button type="submit">Añadir</button>
          </form>
          <button onClick={() => setShowAddClassForm(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default ProfesorDashboard;