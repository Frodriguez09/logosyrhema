const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        const {username, email, password }= req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '8h'}
        )
        res.status(201).json({token, user: {id: user._id, username }});
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message: 'Credenciales invalidas'});
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '8h'}
        )
        res.json({token, user:{id: user._id, username: user.username}});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}