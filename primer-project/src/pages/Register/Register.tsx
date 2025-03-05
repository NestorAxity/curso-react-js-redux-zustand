import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Register.css';
import { useAuthStore } from '../../store/authStore';
import { registerService } from '../../services/reg.service';
import { AuthResponse } from '../../types';
import { useRegStore } from '../../store/regStore';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [isUsValid, setIsUsValid] = useState<boolean>(true);
    const [errorUsername, setErrorUsername] = useState<string>('');


    const [password, setPassword] = useState<string>('');
    const [isPassValid, setIsPassValid] = useState<boolean>(true);
    const [errorPass, setErrorPass] = useState<string | null>(null);

    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isPassConfirm, setIsPassConfirm] = useState<boolean>(true);
    const [errorConfirmPass, setErrorConfirmPass] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate()

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    const isRegistred = useRegStore((state) => state.isRegistred)
    const registerAction = useRegStore((state) => state.regis)
    const registerOut = useRegStore((state) => state.regisOut)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home')
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isUsValid && isPassValid && isPassConfirm){
            registerAction(username, password)
            registerService(username, password)
            .then((response: AuthResponse) => {
                if (response && response?.status === 200) { 
                    setError('')
                    console.log(response)
                }else{
                    setError('Error al registrarse');
                } 
            })
            .catch((error) => setError(error.message));
        }
    };

    function confirmPass(pass: string, confirPass:string){
        if (pass !== confirPass){
            setIsPassConfirm(false);
            setErrorConfirmPass('Las contraseñas deben coincidir');
        }
        else{
            setIsPassConfirm(true);
            setErrorConfirmPass('');
        }
    }

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

            confirmPass(inputValue, confirmPassword);
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
        else if(e.target.id == "ValidPass"){
            setConfirmPassword(inputValue)
            confirmPass(password, inputValue);
        }

    } 

    const hnadleContinue = () => {
        registerOut();
        navigate('/login');
    }

    if(isRegistred){
        return (
            <div className='form-container'>
                <h1>El usuario se ha registrado correctamente</h1>
                <button type="button" onClick={hnadleContinue}>Continuar</button>
            </div>
        )
    }
    else{
        return (
        
            <div className='form-container'>
                <h2>Registra tu cuenta</h2>
                {
                    error  && <p>{error}</p>
                }
                <form onSubmit={handleSubmit}>
                    
                    <label>
                        Usuario*:
                        <input
                            id='UserName'
                            className={isUsValid ? 'valid' : 'invalid'}
                            type="text"
                            placeholder="Escribe tu usuario"
                            value={username}
                            onChange={handleVerifyInput}
                            required
                        />
                        { errorUsername  && <p className='error-mesage'>{errorUsername}</p> }
                    </label>
                    
                    <label>
                        Contraseña*:
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
                    </label>

                    <label>
                        Confirmar Contraseña*:
                        <input
                            id='ValidPass'
                            className={isPassConfirm ? 'valid' : 'invalid'}
                            type="password"
                            placeholder="Confirma tu contraseña"
                            value={confirmPassword}
                            onChange={handleVerifyInput}
                            required
                        />
                        {errorConfirmPass  && <p className='error-mesage'>{errorConfirmPass}</p> }
                    </label>
                    <button type="submit" >Registrarse</button>
                </form>
            </div>
        );
    }
    
};

export default Register;