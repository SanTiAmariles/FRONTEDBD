import React, { useState } from 'react';

// Componente Login
function Login() {
  // Estado para almacenar el tipo de usuario, correo y contraseña
  const [userType, setUserType] = useState('');  // Estado para el tipo de usuario (vacío inicialmente)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Manejo del inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    if (!userType) {
      alert("Por favor, selecciona un tipo de usuario.");
    } else {
      console.log(`Iniciando sesión como ${userType} con correo ${email}`);
      // Aquí puedes agregar la lógica de autenticación (por ejemplo, enviar los datos a un servidor)
    }
  };

  return (
    <div style={styles.container}>
      <h1>Attenzio</h1>

      {/* Botones para seleccionar el tipo de usuario */}
      {userType === '' && (
        <div style={styles.buttonContainer}>
          <button 
            onClick={() => setUserType('Estudiante')} 
            style={userType === 'Estudiante' ? styles.activeButton : styles.inactiveButton}
          >
            Estudiante
          </button>
          <button 
            onClick={() => setUserType('Profesor')} 
            style={userType === 'Profesor' ? styles.activeButton : styles.inactiveButton}
          >
            Profesor
          </button>
        </div>
      )}

      {/* Formulario de inicio de sesión */}
      {userType && (
        <form onSubmit={handleLogin}>
          <div>
            <label>Correo institucional</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Correo institucional"
              style={styles.input}
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Contraseña"
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Iniciar sesión</button>
          
          {/* Mensaje dependiendo del tipo de usuario */}
          {userType === 'Estudiante' && (
            <p>
              ¿No estás registrado?{' '}
              <a href="mailto:profesor@universidad.com" style={styles.link}>
                Contacta a tu profesor
              </a>
            </p>
          )}
          {userType === 'Profesor' && (
            <p>
              ¿Eres profesor nuevo?{' '}
              <a href="/register" style={styles.link}>Regístrate aquí</a>
            </p>
          )}
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#E6E6FA',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    margin: 'auto',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    width: '100%',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '45%',
  },
  inactiveButton: {
    backgroundColor: '#f1f1f1',
    color: '#555',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '45%',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default Login;
