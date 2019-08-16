import React, { useState } from 'react';

import './login.css';
import api from '../services/api'
import logo from '../img/logo.png';

export default function Login({history}) {
    const [ username, setUsername]  = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/dev', {
            username
        }) ;
        const {_id} = response.data;               

        history.push(`/dev/${_id}`);
    }

    return (
        <div className="Login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="tindev" />
                <input 
                    placeholder="Digite seu nome no GitHub" 
                    value ={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit"> Enviar</button>
            </form>
        </div>
    );
}

