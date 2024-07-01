const { Strategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('./User'); // Подключение модели пользователя из базы данных
const passport = require('passport');
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'poka' // Установите здесь свой секретный ключ для подписи JWT токенов
};

const setupPassportStrategy = () => {
  passport.use(new Strategy(jwtOptions, async (jwtpayload, done) => {
    try {
      const user = await User.findByPk(jwtpayload.id);
      if (user) {
        return done(null, user);
      }
    } catch (err) {
      return done(err, false);
    }
  }));
};
setupPassportStrategy()
module.exports = {
  jwtOptions
};


// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;
// const User = require('./User')

// const jwtOptions ={

//     jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey : 'poka'
    

// }

// passport.use(new JWTStrategy(jwtOptions, async(jwtPayload , done)=>{
//     const user = await User.findByPk(jwtPayload.id)


//     if(user) done(null , user) 
//     else done (null , false)
// }))

// module.exports = {
//     jwtOptions
// }

