import React, { useState } from 'react'
import { loginService } from '../services/auth.service'

const Login: React.FC = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault()
        const response = await loginService(username, password)
        localStorage.setItem("token", response)
    }

  return (
    <div>
        <h2>Inicia sesión</h2>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Escribe tu usuario' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" placeholder='Escribe  tu contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Iniciar sesión</button>
        </form>
    </div>
  )
}

export default Login