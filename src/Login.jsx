import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Necesitamos usar `useNavigate` para navegar a otras páginas
import axios from 'axios';  // Importamos Axios para hacer las solicitudes

function Login() {
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Para mostrar errores de autenticación
  const navigate = useNavigate();  // Hook para navegar entre rutas

  // Manejo del inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userType) {
      alert("Por favor, selecciona un tipo de usuario.");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        email,
        password,
      });

      const { access, refresh } = response.data;

      // Guardar los tokens en el localStorage para hacer solicitudes autenticadas
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Redirigir dependiendo del tipo de usuario
      if (userType === 'Estudiante') {
        navigate('/estudiante');  // Redirigir a la página de estudiante
      } else if (userType === 'Profesor') {
        navigate('/profesor-dashboard');  // Redirigir al dashboard del profesor
      }

    } catch (error) {
      console.error('Error al autenticar el usuario:', error);
      setError('Credenciales incorrectas. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Attenzio</h1>

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
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Correo institucional</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Correo institucional"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Contraseña"
              style={styles.input}
              required
            />
          </div>

          {/* Mostrar el error si no se pueden autenticar las credenciales */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" style={styles.button}>Iniciar sesión</button>

          {/* Mensaje dependiendo del tipo de usuario */}
          {userType === 'Estudiante' && (
            <p style={styles.text}>
              ¿No estás registrado?{' '}
              <span 
                onClick={() => navigate('/register')}  // Redirige al formulario de registro de estudiante
                style={styles.link}
              >
                Contacta a tu profesor
              </span>
            </p>
          )}
          {userType === 'Profesor' && (
            <p style={styles.text}>
              ¿Eres profesor nuevo?{' '}
              <span 
                onClick={() => navigate('/teacher-register')}  // Redirige al formulario de registro de profesor
                style={styles.link}
              >
                Regístrate aquí
              </span>
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
    borderRadius: '15px',
    width: '300px',
    margin: 'auto',
    textAlign: 'center',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/linen.png")',
    backgroundSize: 'cover',
    minWidth: '300px',
  },
  header: {
    fontSize: '2em',
    color: '#333',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: '10px',
    textAlign: 'left',
    width: '100%',
  },
  label: {
    fontSize: '13px',
    color: '#555',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '15px',
    width: '100%',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '45%',
  },
  inactiveButton: {
    backgroundColor: '#f1f1f1',
    color: '#555',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '45%',
  },
  text: {
    fontSize: '13px',
    color: '#555',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  form: {
    width: '100%',
  },
};

export default Login;

