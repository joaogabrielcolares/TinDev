import React, {useEffect, useState} from 'react';

import './Main.css';
import api from '../services/api'
import logo from '../img/logo.png';
import like from '../img/like.jpeg';
import dislike from '../img/dislike.png';

export default function Main({match}){
    const [users, setUsers] = useState([]);    
    
    useEffect(()=>{
        async function loadUsers() {
            const response = await api.get('/dev', {
                headers:{
                    user:match.params.id
                }
            })
            setUsers(response.data)           
        }
        loadUsers();
    }, [match.params.id]);
    
    async function handleLike(id){
        await api.post(`/dev${id}/like`, null, 
            {headers: {user:match.params.id}});
        setUsers(users.filter(user=>user._id=! id));      
    }
    async function handleDislike(id){
        await api.post(`/dev${id}/dislikes`, null, 
            {headers: {user:match.params.id}});
        setUsers(users.filter(user=>user._id=! id));     
    }
    return (
        <div className="main-container">
            <img src={logo} alt="TinDev"/>
            <ul>
                {users.map(user=>(
                    <li key={user.id}>
                        <img src="user.avatar" alt="" />
                        <footer>
                            <strong>user.name </strong>
                            <p>user.bio</p>
                        </footer>
                        <div className='buttons'>
                            <button className='buttons' onClick={ () => handleDislike(user._id)}>
                                <img src={dislike} alt="Dislike"/>
                            </button>
                            <button className='buttons' onClick={ () => handleLike(user._id)}>>
                                <img src={like} alt="Like"/>
                            </button>
                        </div>
                    </li>
                ))}                
            </ul>
        </div>
    )
}