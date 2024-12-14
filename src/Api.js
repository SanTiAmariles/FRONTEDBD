import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',  // Asegúrate de que esta sea la URL correcta del backend
    timeout: 5000,  // Establece un tiempo de espera máximo para las respuestas
    headers: {
      'Content-Type': 'application/json',  // Esto es necesario si se está enviando datos en formato JSON
    },
});

// Ahora, puedes usar `api` para hacer las solicitudes

// Función para manejar el inicio de sesión
export const login = async (email, password) => {
  try {
    const response = await api.post('/token/', {
      email: email,
      password: password,
    });
    return response.data;  // Retorna los datos del token (o un error)
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response ? error.response.data : error);
    throw error;
  }
};

// Función para registrar un estudiante
export const registerStudent = async (studentData) => {
  try {
    const response = await api.post('/estudiantes/', studentData);  // Cambia la ruta si es necesario
    return response.data;  // Datos del estudiante registrado
  } catch (error) {
    console.error('Error al registrar estudiante:', error.response ? error.response.data : error);
    throw error;
  }
};

// Función para registrar un profesor
export const registerTeacher = async (teacherData) => {
  try {
    const response = await api.post('/profesores/', teacherData);  // Cambia la ruta si es necesario
    return response.data;  // Datos del profesor registrado
  } catch (error) {
    console.error('Error al registrar profesor:', error.response ? error.response.data : error);
    throw error;
  }
};

// Función para obtener la lista de estudiantes
export const getStudents = async () => {
  try {
    const response = await api.get('/estudiantes/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener estudiantes:', error.response ? error.response.data : error);
    throw error;
  }
};

// Función para obtener la lista de profesores
export const getTeachers = async () => {
  try {
    const response = await api.get('/profesores/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener profesores:', error.response ? error.response.data : error);
    throw error;
  }
};

export default api;
