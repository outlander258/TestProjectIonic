// Definición de la estructura de usuario
export interface Usuario {
    username: string;
    password: string;
  }
  
  // Arreglo de usuarios válidos (simulación de base de datos)
  export const usuariosValidos: Usuario[] = [
    { username: 'jonathan', password: 'castillo123' },
    { username: 'jean', password: 'guital123' },
    { username: 'danilo', password: 'jara123' }
    // Agrega más usuarios aquí
  ];