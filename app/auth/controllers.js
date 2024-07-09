const TemporaryUser = require('./TemporaryUser');
const {sendEmail} = require('./emailServise')
const User = require('./User')
const jwt = require('jsonwebtoken')
const {jwtOptions} = require('./passport')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
  
    try {
        const { email, password, username } = req.body;
        
        // Хеширование пароля
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).send('Error hashing password');
            }
            
            // Создание пользователя с хешированным паролем
            const user = await User.create({
                email ,
                password: hash,
                fullName: username
            });
            const token = jwt.sign({    
                id : user.id,
                email : user.email,
                username : user.fullName,
               
            } , jwtOptions.secretOrKey, {
                expiresIn : 24 * 60 * 60 * 365
            })
            res.status(200).send({token})

           
        });
    } catch (error) {
        console.error('Error sending password:', error);
        res.status(500).json({ message: 'Error sending password', error });
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ where: { email: email } });

    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                // Обработка ошибки
                return res.status(500).send('Error comparing passwords');
            } else if (result) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    username: user.fullName,
                }, jwtOptions.secretOrKey, {
                    expiresIn: 24 * 60 * 60 * 365
                });
                return res.status(200).send({ token });
            } else {
                // Неправильный пароль
                return res.status(401).send('Authentication failed. Wrong password.');
            }
        });
    } else {
        // Пользователь не найден
        return res.status(404).send('User not found.');
    }
}


const editProfile = async (req , res)=>{
    const user = await User.findByPk(req.params.id)
    if(user){
        user.update({
            email : req.body.email,
            fullName : req.body.fullName
        })
        res.status(200).send('ok')
    }
}







module.exports = { signUp , login , editProfile };










// const sign = async (req, res) => {
//     const user =await User.findOne({where:{email : req.body.email }})

//     if(!user){
//         const user = await User.create({
//             email : req.body.email,
//             password:req.body.password,
//             fullName: req.body.fullname,
//         });
//         const token = jwt.sign({ id: user.id, email: user.email }, 
//             opts.secretOrKey, { expiresIn: '1y' });
//              res.send({token})
//         }else if(user){
//             const token = jwt.sign({ id: user.id, email: user.email }, 
//                 opts.secretOrKey, { expiresIn: '1y' });
//                  res.send({token})
//         }
//     }
    

  

    

    

    


