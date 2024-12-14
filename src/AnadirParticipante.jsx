import React, { useState } from "react";
import './AnadirParticipante.css'; // Asegúrate de tener el archivo CSS

function AnadirParticipante() {
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participants, setParticipants] = useState([]);

  // Función para agregar participantes al estado
  const handleAddParticipant = (e) => {
    e.preventDefault();

    if (!participantName || !participantEmail) {
      alert("Por favor, ingresa el nombre y el correo del participante.");
      return;
    }

    // Crear un objeto con los datos del participante
    const newParticipant = { name: participantName, email: participantEmail };

    // Añadir el nuevo participante al array de participantes
    setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);

    // Limpiar los campos del formulario
    setParticipantName("");
    setParticipantEmail("");
  };

  return (
    <div className="add-participant-container">
      <h3>Registrar Participante</h3>
      <form onSubmit={handleAddParticipant}>
        <input
          type="text"
          placeholder="Nombre del Participante"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo del Participante"
          value={participantEmail}
          onChange={(e) => setParticipantEmail(e.target.value)}
        />
        <button type="submit">Registrar Participante</button>
      </form>

      {/* Mostrar los participantes registrados debajo del formulario */}
      {participants.length > 0 && (
        <div className="participant-list">
          <h4>Participantes Registrados</h4>
          {participants.map((participant, index) => (
            <div className="participant-item" key={index}>
              <p><span>Nombre:</span> {participant.name}</p>
              <p><span>Correo:</span> {participant.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnadirParticipante;
