import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import UploadMaterialButton from "./UploadMaterialButton"; // Ruta relativa
import QuestionClass from "./QuestionClass"; // Ruta relativa
import AnadirParticipante from "./AnadirParticipante"; // Asegúrate de que esta ruta sea correcta

import "./ClassDetail.css";

function ClassDetail() {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showQuizCreator, setShowQuizCreator] = useState(false); // Nuevo estado para mostrar el creador de preguntas
  const [showRegisterStudents, setShowRegisterStudents] = useState(false); // Estado para mostrar registro de estudiantes
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessionTopic, setSessionTopic] = useState(""); // Campo para el tema de la sesión
  const [sessions, setSessions] = useState([]);
  const [showSessionForm, setShowSessionForm] = useState(false); // Estado para mostrar formulario de añadir sesión
  const [showUpload, setShowUpload] = useState(false); // Estado para mostrar formulario de subir material
  const navigate = useNavigate();

  useEffect(() => {
    const storedClasses = JSON.parse(localStorage.getItem("classes"));
    const selectedClass = storedClasses.find((clase) => clase.id === parseInt(id));
    setClassDetail(selectedClass);
  }, [id]);

  // Función para manejar la eliminación de la clase
  const handleDeleteClass = () => {
    const storedClasses = JSON.parse(localStorage.getItem("classes"));
    const updatedClasses = storedClasses.filter((clase) => clase.id !== parseInt(id));
    localStorage.setItem("classes", JSON.stringify(updatedClasses));
    navigate("/profesor-dashboard"); // Redirigir después de eliminar
  };

  // Función para manejar el envío del formulario de añadir sesión
  const handleAddSession = (e) => {
    e.preventDefault();
    if (!sessionDate || !sessionTime || !sessionTopic) {
      alert("Por favor, ingresa la fecha, hora y tema de la sesión.");
      return;
    }
    const newSession = { date: sessionDate, time: sessionTime, topic: sessionTopic };
    setSessions([...sessions, newSession]);
    setSessionDate("");
    setSessionTime("");
    setSessionTopic(""); // Limpiar el campo de tema
  };

  return (
    <div className="class-detail-container">
      <div className="sidebar">
        <ul>
          <li onClick={() => navigate("/profesor-dashboard")}>Home</li>
          <li>Configuración</li>
          <li>Reportes</li>
          <li onClick={() => navigate("/")}>Cerrar sesión</li>
        </ul>
      </div>
      <div className="main-content">
        {classDetail ? (
          <div>
            <div className="class-info">
              <h1>{classDetail.name}</h1>
              <p>Grupo: {classDetail.group}</p>
              <p>Código: {classDetail.code}</p>
            </div>

            <div className="line"></div>

            <div className="other-content">
              <button className="back-button" onClick={() => navigate("/profesor-dashboard")}>
                Volver al Dashboard
              </button>

              <button className="attendance-button" onClick={() => setShowQRCode(!showQRCode)}>
                {showQRCode ? "Cerrar QR" : "Tomar Asistencia con QR"}
              </button>

              {/* Botón para mostrar/ocultar el creador de preguntas del quiz */}
              <button 
                className="quiz-creator-button" 
                onClick={() => setShowQuizCreator(!showQuizCreator)}
              >
                {showQuizCreator ? "Cerrar Creador de Quiz" : "Crear Preguntas para el Quiz"}
              </button>

              {/* Botón para mostrar/ocultar el registro de estudiantes */}
              <button 
                className="register-students-button" 
                onClick={() => setShowRegisterStudents(!showRegisterStudents)}
              >
                {showRegisterStudents ? "Cerrar Registro de Estudiantes" : "Registrar Estudiantes"}
              </button>

              {/* Mostrar el QR si el estado showQRCode es verdadero */}
              {showQRCode && (
                <div className="qr-container">
                  <QRCodeCanvas value={`http://example.com/attendance/${classDetail.id}`} size={256} />
                </div>
              )}

              {/* Mostrar el creador de preguntas del quiz si el estado showQuizCreator es verdadero */}
              {showQuizCreator && (
                <div className="quiz-creator-container">
                  <QuestionClass />
                </div>
              )}

              {/* Mostrar el formulario de registro de estudiantes si el estado showRegisterStudents es verdadero */}
              {showRegisterStudents && (
                <div className="register-students-container">
                  <AnadirParticipante />
                </div>
              )}

              {/* Botón para mostrar el formulario de Añadir Sesión */}
              <button
                className="add-session-button"
                onClick={() => setShowSessionForm(!showSessionForm)} // Solo cambia el estado de showSessionForm
              >
                {showSessionForm ? "Cerrar Formulario de Sesión" : "Añadir Sesión"}
              </button>

              {/* Formulario de Añadir Sesión */}
                
                {showSessionForm && (
                  <form onSubmit={handleAddSession} className="session-form">
                    <div className="form-group">
                      <label htmlFor="session-date">Fecha de la sesión</label>
                      <input
                        id="session-date"
                        type="date"
                        value={sessionDate}
                        onChange={(e) => setSessionDate(e.target.value)}
                        placeholder="Fecha de la sesión"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="session-time">Hora de la sesión</label>
                      <input
                        id="session-time"
                        type="time"
                        value={sessionTime}
                        onChange={(e) => setSessionTime(e.target.value)}
                        placeholder="Hora de la sesión"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="session-topic">Tema de la sesión</label>
                      <input
                        id="session-topic"
                        type="text"
                        value={sessionTopic}
                        onChange={(e) => setSessionTopic(e.target.value)}
                        placeholder="Tema de la sesión"
                      />
                    </div>
                    <button type="submit" className="submit-button">Registrar sesión</button>
                  </form>
                )}
              {/* Mostrar las sesiones registradas */}
              <div className="sessions-list">
                {sessions.map((session, index) => (
                  <div key={index} className="session-item">
                    <p>{`Fecha: ${session.date} | Hora: ${session.time} | Tema: ${session.topic}`}</p>
                  </div>
                ))}
              </div>
              

              {/* Botón para mostrar/ocultar el formulario de Subir Material */}
              <button 
                className="upload-button" 
                onClick={() => setShowUpload(!showUpload)}
              >
                {showUpload ? "Cerrar Subir Material" : "Subir Material"}
              </button>

              {/* Mostrar el formulario de subir material */}
              {showUpload && (
                <div className="upload-material-container">
                  <UploadMaterialButton />
                </div>
              )}

            </div>
              
            <button className="delete-button" onClick={handleDeleteClass}>
              Eliminar Clase
            </button>
          </div>
        ) : (
          <p>Cargando clase...</p>
        )}
      </div>
    </div>
  );
}

export default ClassDetail;
