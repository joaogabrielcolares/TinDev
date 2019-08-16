const dev = require('../models/dev');

module.exports = {
    async store(req, res) {        
        
        const {devsId} = req.params;
        const {user} = req.headers;
        
        const loggedDev = await dev.findById(user);
        const targetDev = await dev.findById(devsId);   

        if(!targetDev){
            res.status(400).json({error:'dev not exists'});
        }

        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save

        res.json({ loggedDev }); 
    }

}