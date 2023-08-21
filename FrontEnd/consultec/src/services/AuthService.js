// Este es solo un ejemplo
const AuthService = {
    login: async (username, password) => {
        // Simular una llamada a la API para autenticar
        if (username === 'usuario' && password === 'contraseña') {
            // Simular una respuesta exitosa
            return { success: true, user: { username: 'usuario' } };
        } else {
            // Simular una respuesta de error
            throw new Error('Credenciales inválidas');
        }
    },
};

export default AuthService;
