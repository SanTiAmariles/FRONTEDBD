import React, { useState } from 'react';
import axios from 'axios';

const StudentRegistration = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correoInstitucional: '',
    numeroCelular: '',
    codigoEstudiante: '',
  });

  // Estado para almacenar la lista de estudiantes registrados
  const [studentsList, setStudentsList] = useState([]);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Actualiza el campo correspondiente
    });
  };

  // Manejo del formulario al ser enviado
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar recargar la página

    // Crear un FormData para enviar los datos del estudiante
    const formDataToSend = new FormData();
    formDataToSend.append('nombres', formData.nombres);
    formDataToSend.append('apellidos', formData.apellidos);
    formDataToSend.append('correoInstitucional', formData.correoInstitucional);
    formDataToSend.append('numeroCelular', formData.numeroCelular);
    formDataToSend.append('codigoEstudiante', formData.codigoEstudiante);

    // Enviar los datos al backend
    axios
      .post('http://127.0.0.1:8000/api/estudiantes/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necesario para enviar archivos
        },
      })
      .then((response) => {
        console.log('Estudiante registrado:', response.data);
        setStudentsList([...studentsList, response.data]); // Agregar el nuevo estudiante a la lista
        // Limpiar los campos del formulario
        setFormData({
          nombres: '',
          apellidos: '',
          correoInstitucional: '',
          numeroCelular: '',
          codigoEstudiante: '',
        });
      })
      .catch((error) => {
        console.error('Hubo un error al registrar el estudiante:', error);
        alert('Error al registrar el estudiante');
      });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Título principal */}
      <h1 style={{ textAlign: 'center' }}>Gestión de Estudiantes</h1>
      <p style={{ textAlign: 'center', color: '#555' }}>
        Registro de nuevos estudiantes en el sistema
      </p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Formulario de registro de estudiantes */}
        <div style={{ flex: 1, border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h2>Registrar Nuevo Estudiante</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Campo: Nombres */}
            <input
              type="text"
              name="nombres"
              placeholder="Nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {/* Campo: Apellidos */}
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {/* Campo: Correo Institucional */}
            <input
              type="email"
              name="correoInstitucional"
              placeholder="Correo Institucional"
              value={formData.correoInstitucional}
              onChange={handleChange}
              required
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {/* Campo: Número de Celular */}
            <input
              type="tel"
              name="numeroCelular"
              placeholder="Número de Celular"
              value={formData.numeroCelular}
              onChange={handleChange}
              required
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {/* Campo: Código de Estudiante */}
            <input
              type="text"
              name="codigoEstudiante"
              placeholder="Código de Estudiante"
              value={formData.codigoEstudiante}
              onChange={handleChange}
              required
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {/* Botón para registrar al estudiante */}
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Registrar Estudiante
            </button>
          </form>
        </div>

        {/* Lista de estudiantes registrados */}
        <div style={{ flex: 1, border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h2>Estudiantes Registrados</h2>
          {studentsList.length === 0 ? (
            // Mensaje si no hay estudiantes registrados
            <p style={{ color: '#999' }}>No hay estudiantes registrados aún</p>
          ) : (
            <ul>
              {/* Mostrar la lista de estudiantes */}
              {studentsList.map((student, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '4px',
                  }}
                >
                  <p>
                    <strong>
                      {student.nombres} {student.apellidos}
                    </strong>
                  </p>
                  <p style={{ fontSize: '14px', color: '#666' }}>{student.correoInstitucional}</p>
                  <p style={{ fontSize: '14px', color: '#666' }}>Código: {student.codigoEstudiante}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;

