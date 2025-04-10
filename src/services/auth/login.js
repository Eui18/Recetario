import axios from "axios"

export const loginService = async ({correo, contraseña}) => {
    try {
        console.log({
           correo, contraseña
        })
     const result = await axios.post('https://379e-2806-10ae-f-d40-5432-4ede-309c-f5c9.ngrok-free.app/users/login', {
       contraseña ,
       correo
     });


     return result.data;

    } catch (error) {
        console.log({error})
        console.log('hubo un error', error.message)
        throw new Error ('Hubo un problema al intentar iniciar sesion')
    }
}