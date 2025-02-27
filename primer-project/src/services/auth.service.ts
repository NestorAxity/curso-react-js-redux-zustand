import axios from "axios";

export const loginService = async(username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8080/login', {
            username,
            password
        });
        return response.data?.token || null
    } catch (error) {
        console.error("ERROR AL CONSUMIR: ", error)
    }
}