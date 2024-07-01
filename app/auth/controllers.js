const TemporaryUser = require('./TemporaryUser');
const {sendEmail} = require('./emailServise')
const User = require('./User')
const jwt = require('jsonwebtoken')
const {jwtOptions} = require('./passport')

const sendPassword = async (req, res) => {
    let password = 'IN' + Date.now();
    const validTill = new Date(Date.now() + 1000000);



    try {
        const tempUser = await TemporaryUser.create({
            email: req.body.email,
            password: password,
            valid_till: validTill,
        });
        // Отправляем пароль на указанный email
         sendEmail(req.body.email, password);

        res.send('Password sent successfully');
    } catch (error) {
        console.error('Error sending password:', error);
        res.status(500).json({ message: 'Error sending password', error });
    }
}


const login = async (req , res)=>{

    const tempUser = await TemporaryUser.findOne({where:{ email: req.body.email}})
    if(!tempUser){
        res.status(401).send({error : 'code is invalid1'})
      
    }else if(new Date(tempUser.valid_till).getTime() < Date.now()){
        console.log('new'+tempUser.valid_till.getTime());
        console.log('now'+Date.now());
        res.status(401).send({error : 'code is invalid2'})

    }else if(tempUser.password != req.body.password){  
        res.status(401).send({error : 'code is invalid3'})
    }else{

        let user = await User.findOne({where:{email : req.body.email}})
        if(!user){
            
            user = await User .create({
                email: req.body.email ,
                password : req.body.password
                
            }) 
        }
        
        const token = jwt.sign({    
            id : user.id,
            email : user.email,
            full_name : user.fullname,
           
        } , jwtOptions.secretOrKey, {
            expiresIn : 24 * 60 * 60 * 365
        })
        res.status(200).send({token})
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







module.exports = { sendPassword , login , editProfile };










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
    

  

    

    

    


