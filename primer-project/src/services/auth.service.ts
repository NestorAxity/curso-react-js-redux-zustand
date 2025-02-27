import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../types";

/*export const loginService = async(username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8080/login', {
            username,
            password
        });
        return response.data
    } catch (error) {
        console.error("ERROR AL CONSUMIR: ", error)
    }
}*/

/**
 * Funcion que realiza la peticion de login
 * @param username - Nombre de usuario 
 * @param password - Contraseña
 * @returns  Promise<AuthResponse> - Respuesta de la peticion
 */
export const loginService = (username: string, password: string): Promise<AuthResponse> => {
    return axios.post('http://localhost:8080/login', {
      username,
      password,
    })
    .then((response: AxiosResponse<AuthResponse>) => response.data)
    .catch((error) => {
      throw new Error("Algo fallo al iniciar sesion");
    })
  }