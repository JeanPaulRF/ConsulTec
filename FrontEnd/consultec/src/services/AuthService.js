import { collection, getDocs, query, where } from "@firebase/firestore"
import { db } from "../firebase_setup/firebase"

const AuthService = {
    login: async (email, password) => {

        // llamada a la API para autenticar
        const userCollection = await getDocs(collection(db, "users"));
        const userQuery = query(userCollection,
            where("email", "==", email),
            where("password", "==", password));

        try {
            //obtiene el query del usuario encontrado
            const querySnapshot = await getDocs(userQuery);

            //si el query no esta vacio
            if (!querySnapshot.empty) {
                const user = querySnapshot.docs[0].data();
                return { success: true, user: { email: user.email } };
            }
            else {
                return { success: false, user: { email: '' } };
            }
        }
        catch (error) {
            console.log("Error verifying user:", error);
            return { success: false, user: { email: '' } };
        }
    },
};

export default AuthService;
