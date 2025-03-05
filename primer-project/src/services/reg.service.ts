import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../types";

 /**
 * Funcion que realiza el registro de un nuevo usuario
 * @param username - Nombre de usuario 
 * @param password - Contraseña
 * @returns  Promise<AuthResponse> - Respuesta de la peticion
 */
 export const registerService = (username: string, password: string): Promise<AuthResponse> => {
    return axios.post('http://localhost:8080/register', {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  )
    .then((response: AxiosResponse<AuthResponse>) => response.data)
    .catch((error) => {
      throw new Error("Algo fallo al registrarse");
    })
  }