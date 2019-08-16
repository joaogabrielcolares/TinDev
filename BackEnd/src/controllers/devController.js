const axios = require('axios');
const Dev = require('../models/dev')

module.exports = {
    async index (req,res){
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);
        console.log(loggedDev);
         
        const users = await Dev.find({
            $and:[
                {_id: {$ne: user}},
                {_id: {$nin: loggedDev.likes}},
                {_id: {$nin: loggedDev.dislikes}}
            ]
        })
        res.send(users)
    },

    async store(req, res) {        
        const { username } = req.body;        
        const userExist = await Dev.findOne({ username: username });    

        if (userExist) {
            res.json(userExist)
        }else{
            
        const response = await axios.get(`https://api.github.com/users/${username}`)        
        const { login:name, bio, avatar_url: avatar } = response.data;        
        const dev = await Dev.create({
            name,
            username,
            bio,
            avatar
        });
        res.json(dev);
        }
    }
};