import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Login.css';
import { useAuthStore } from '../../store/authStore';
import { loginService } from '../../services/auth.service';
import { AuthResponse } from '../../types';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [isUsValid, setIsUsValid] = useState<boolean>(true);
    const [errorUsername, setErrorUsername] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [isPassValid, setIsPassValid] = useState<boolean>(true);
    const [errorPass, setErrorPass] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate()

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const loginAction = useAuthStore((state) => state.login)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home')
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        loginAction(username, password)
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

    const handleVerifyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const inputValue: string = e.target.value;

        if(e.target.id == "UserName"){
            if(inputValue.length < 3){
                setIsUsValid(false);
                setErrorUsername("El usuario debe tener al menos 3 caracteres");
            }
            else{
                setIsUsValid(true);
                setErrorUsername('');
            }
            setUsername(inputValue);
        }
        else if(e.target.id == "Pass"){
            const exReg = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
            if(!exReg.test(inputValue)){
                setIsPassValid(false);
                setErrorPass("La constraseña debe de tener al menos 1 minuscula, 1 mayuscula y al menos 8 caracteres");
            }
            else{
                setIsPassValid(true);
                setErrorPass('');
            }
            setPassword(inputValue);
        }

    } 

    return (
        <div className="login-container">
            <h2>Inicia sesión</h2>
            {
                error  && <p>{error}</p>
            }
            <form onSubmit={handleSubmit}>
                <input
                    id='UserName'
                    className={isUsValid ? 'valid' : 'invalid'}
                    type="text"
                    placeholder="Escribe tu usuario"
                    value={username}
                    onChange={handleVerifyInput}
                    required
                />
                {errorUsername  && <p className='error-mesage'>{errorUsername}</p> }


                <input
                    id='Pass'
                    className={isPassValid ? 'valid' : 'invalid'}
                    type="password"
                    placeholder="Escribe tu contraseña"
                    value={password}
                    onChange={handleVerifyInput}
                    required
                />
                {errorPass && <p className='error-mesage'>{errorPass}</p>}


                <button type="submit">Iniciar sesión</button>
                <button type='button' className='reg-button' onClick={() => {navigate('/register')}}>Crear Nueva cuenta</button>
            </form>
        </div>
    );
};

export default Login;