import axios from "axios"

const API_URL = 'https://jsonplaceholder.typicode.com'

export const getTodos = async() => {
    try {
        const response = axios(`${API_URL}/todos`)
        return (await response).data
    } catch (error) {
        console.error(error)
        throw new Error('Algo fallo')
    }
}