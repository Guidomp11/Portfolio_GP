import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;

    
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])


    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    const {email, password} = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        if(password.length < 6){
            mostrarAlerta('La contraseña debe tener al menos 6 caracteres', 'alerta-error');
            return;
        }

        iniciarSesion({email, password});

    }

    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="E-mail"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Crear Cuenta</Link> 
            </div>
        </div>
    );
}
 
export default Login;