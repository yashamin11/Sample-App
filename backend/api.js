const router = require('express').Router();
let User = require('./models/user');
let Token = require('./models/token');
const bcrypt = require('bcrypt');
const { application } = require('express');
const { check, validationResult } = require('express-validator');

const multer = require('multer');
let path = require('path');
const { v4: uuidv4 } = require('uuid');


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};








function Authorize(req)
{
    
    const token = req.header('Authorization');
    console.log(token);
  
    return Token.findOne({ token: token })
        .then(token => {
            if(!token) {return null;}

            return token.user;
        })
        .catch(err => {
            console.log("Error!");
            res.status(400).send(err);
        });
};




router.post('/users/add', (req, res) => {
    if (req.body.password!=req.body.confirm_password)
    return res.status(422).send({'message': 'Passwords do not match.'});

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) res.status(400).send(err);
        else
        {
            let user = new User(req.body);

            user.password = hash;
            user.save()
            .then(user => {
                user.password = undefined;
                res.status(201).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
        }
    });
});

router.post('/users/login', (req, res) => {
    let username = req.body.username, password = req.body.password;
    if(!username || !password) return res.status(400).send({'message': 'Please enter all fields'});

    User.findOne({ username: username })
        .then(user => {
            if(user){
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result){
                        Token.findOne({user})
                            .populate({
                                path: 'user'
                            })
                            .then(token => {
                                if(!token)
                                {
                                    token = new Token({user: user});
                                    token.save();
                                }
                                token.user.password = undefined;
                                token.expire = undefined;
                                token._id = undefined;
                                res.status(200).send({token});
                            })
                            .catch(err => {
                                res.status(400).send({'message': 'Token invalid'});
                            });
                    }
                    else res.status(400).send({'message': 'Password Incorrect'});
                });
            }
        else res.status(400).send({'message': "User not found"});
        })
        .catch(err => console.log(err));
});







// Get Recruiter Profile

router.get('/rprofile', (req, res) => {

    Authorize(req)
    .then(user =>{
    if(!user) return res.status(400).json({'message': 'User not found'});
    User.findOne({_id:user})
    .then(profile=>
        {
            console.log(profile);
            res.status(200).json(profile);
        })
    console.log("hello " + user);
    });
       
});


router.route('/details/delete').post((req, res)=> {
  
    Authorize(req)
    .then(user =>{
        if(!user) 
        {
            return res.status(401).json({'message': 'User not found'});
        }
    User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                console.log(req.body.id);
                if (req.body.id==1)
                {
                    user.flag=1;
                }
                if(req.body.id==2)
                {
                    user.email = '';
                }
                if(req.body.id==3)
                {
                    user.address= '';
                }
                console.log(user);
                user.save();
            })
    .catch(err => {
        res.status(400).send(err);
    });
});
});



module.exports = router;
