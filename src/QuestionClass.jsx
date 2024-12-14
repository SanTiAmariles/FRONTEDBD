import React, { useState } from 'react';
import './QuestionClass.css'; // Asegúrate de crear y enlazar un archivo CSS para los estilos

const QuestionClass = () => {
  // Estado para la pregunta actual en creación
  const [preguntaActual, setPreguntaActual] = useState({
    texto: '',
    opciones: [
      { id: 'a', texto: '', esCorrecta: false },
      { id: 'b', texto: '', esCorrecta: false },
      { id: 'c', texto: '', esCorrecta: false },
      { id: 'd', texto: '', esCorrecta: false }
    ]
  });

  // Lista de preguntas creadas
  const [preguntas, setPreguntas] = useState([]);

  // Modo de visualización
  const [modo, setModo] = useState('crear'); // 'crear' o 'revisar'

  // Actualizar texto de la pregunta
  const actualizarTextoPregunta = (e) => {
    setPreguntaActual({
      ...preguntaActual,
      texto: e.target.value
    });
  };

  // Actualizar texto de una opción
  const actualizarTextoOpcion = (index, e) => {
    const nuevasOpciones = [...preguntaActual.opciones];
    nuevasOpciones[index].texto = e.target.value;
    setPreguntaActual({
      ...preguntaActual,
      opciones: nuevasOpciones
    });
  };

  // Marcar/desmarcar respuesta correcta
  const toggleRespuestaCorrecta = (index) => {
    const nuevasOpciones = preguntaActual.opciones.map((opcion, i) => 
      i === index 
        ? { ...opcion, esCorrecta: !opcion.esCorrecta }
        : opcion
    );
    setPreguntaActual({
      ...preguntaActual,
      opciones: nuevasOpciones
    });
  };

  // Guardar pregunta
  const guardarPregunta = () => {
    // Validaciones básicas
    if (!preguntaActual.texto.trim()) {
      alert('Por favor, ingresa el texto de la pregunta');
      return;
    }

    const opcionesValidas = preguntaActual.opciones.filter(opcion => opcion.texto.trim());
    if (opcionesValidas.length < 2) {
      alert('Debes ingresar al menos dos opciones');
      return;
    }

    const respuestasCorrectas = preguntaActual.opciones.filter(opcion => opcion.esCorrecta);
    if (respuestasCorrectas.length === 0) {
      alert('Debes seleccionar al menos una respuesta correcta');
      return;
    }

    // Agregar pregunta a la lista de preguntas
    setPreguntas([...preguntas, {
      ...preguntaActual,
      id: Date.now() // Identificador único
    }]);

    // Limpiar el formulario
    setPreguntaActual({
      texto: '',
      opciones: [
        { id: 'a', texto: '', esCorrecta: false },
        { id: 'b', texto: '', esCorrecta: false },
        { id: 'c', texto: '', esCorrecta: false },
        { id: 'd', texto: '', esCorrecta: false }
      ]
    });

    // Cambiar a modo de revisión
    setModo('revisar');
  };

  // Eliminar pregunta
  const eliminarPregunta = (id) => {
    setPreguntas(preguntas.filter(p => p.id !== id));
  };

  // Renderizar interfaz de creación de pregunta
  const renderCrearPregunta = () => (
    <div className="question-form">
      {/* Input para el texto de la pregunta */}
      <div>
        <label className="label">Texto de la Pregunta</label>
        <input 
          type="text"
          value={preguntaActual.texto}
          onChange={actualizarTextoPregunta}
          placeholder="Escribe tu pregunta aquí"
          className="input"
        />
      </div>

      {/* Inputs para las opciones */}
      {preguntaActual.opciones.map((opcion, index) => (
        <div key={opcion.id} className="option-group">
          <input 
            type="text"
            value={opcion.texto}
            onChange={(e) => actualizarTextoOpcion(index, e)}
            placeholder={`Opción ${String.fromCharCode(97 + index)}`}
            className="input option-input"
          />
          <div className="checkbox-container">
            <input 
              type="checkbox"
              checked={opcion.esCorrecta}
              onChange={() => toggleRespuestaCorrecta(index)}
              className="checkbox"
            />
            <label>Correcta</label>
          </div>
        </div>
      ))}

      {/* Botón para guardar la pregunta */}
      <button 
        onClick={guardarPregunta} 
        className="btn-create"
      >
        Crear Pregunta
      </button>
    </div>
  );

  // Renderizar lista de preguntas creadas
  const renderRevisarPreguntas = () => (
    <div className="review-questions">
      <h2 className="title">Preguntas Creadas</h2>
      {preguntas.length === 0 ? (
        <p className="no-questions">Aún no has creado preguntas</p>
      ) : (
        preguntas.map((pregunta) => (
          <div key={pregunta.id} className="card">
            <div className="card-content">
              <h3 className="question-text">{pregunta.texto}</h3>
              <ul className="options-list">
                {pregunta.opciones.map((opcion) => (
                  <li key={opcion.id} className={opcion.esCorrecta ? 'correct-answer' : ''}>
                    {opcion.texto} {opcion.esCorrecta && "(Correcta)"}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => eliminarPregunta(pregunta.id)}
                className="btn-delete"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
      <button 
        onClick={() => setModo('crear')} 
        className="btn-create-new"
      >
        Crear Nueva Pregunta
      </button>
    </div>
  );

  return (
    <div className="question-class-container">
      <h1 className="header">
        {modo === 'crear' ? 'Crear Pregunta' : 'Revisar Preguntas'}
      </h1>
      {modo === 'crear' ? renderCrearPregunta() : renderRevisarPreguntas()}
    </div>
  );
};

export default QuestionClass;
