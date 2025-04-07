import axios from "axios"

export const loginService = async ({password, email}) => {
    try {
     const result = await axios.post('http://localhost:3000/auth', {
        password,
        email
     });


     return result.data;

    } catch (error) {
        console.log(error)
        throw new Error ('Hubo un problema al intentar iniciar sesion')
    }
}