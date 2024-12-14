import React, { useState, useRef } from 'react';
import './UploadMaterialButton.css';

const UploadMaterialButton = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const handleFileRemove = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-container">
      <h2 className="title">Subir Material de la sesión</h2>
      
      {/* Botón de Subir Material */}
      <button className="upload-btn" onClick={handleFileInputClick}>
        Seleccionar archivos
      </button>

      {/* Cuadro para arrastrar y soltar archivos */}
      <div
        className="drop-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleFileInputClick}
      >
        <p>Arrastra y suelta archivos aquí o</p>
        <p className="select-files">Seleccionar archivos</p>
      </div>

      {/* Input oculto para selección de archivos */}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="file-input"
      />

      {/* Si no hay archivos */}
      {files.length === 0 ? (
        <p className="no-files">No se han seleccionado archivos aún.</p>
      ) : (
        <div className="uploaded-files">
          <h3>Archivos Subidos:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="file-item">
                <span>{file.name}</span>
                <button className="remove-btn" onClick={() => handleFileRemove(index)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadMaterialButton;
