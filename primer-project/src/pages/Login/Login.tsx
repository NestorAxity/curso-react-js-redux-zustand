import React, { useState } from 'react'
import { loginService } from '../../services/auth.service'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { AuthResponse } from '../../types'

const Login: React.FC = () => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      loginService(username, password)
      .then((response: AuthResponse) => {
          if (response && response?.status === 200) { 
              navigate('/home')
          }else{
              setError('Usuario o contraseña incorrectos')
          } 
      })
      .catch((error) => setError(error.message));
    };

  return (
    <div>
        <h2>Inicia sesión</h2>
        {
          error && <p>{error}</p>
        }
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Escribe tu usuario' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" placeholder='Escribe  tu contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Iniciar sesión</button>
        </form>
    </div>
  )
}

export default Login