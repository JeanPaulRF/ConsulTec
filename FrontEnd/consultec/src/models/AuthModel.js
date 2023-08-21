// Este es un modelo simple para manejar el estado de autenticación
const AuthModel = {
    user: null,

    setUser: (user) => {
        AuthModel.user = user;
    },

    clearUser: () => {
        AuthModel.user = null;
    },
};

export default AuthModel;
