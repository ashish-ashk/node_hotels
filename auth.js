const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy; // Username ans Password starategy
const Person = require('./models/person')

passport.use(new LocalStrategy(async (username, password, done) => {
    // Authentication logic here
    try{
        console.log('Received credentials: ', username, password);
        const user = await Person.findOne({username: username});
        if(!user)
            return done(null, false, {message: 'Incorrect username'});

        // const isPasswordMatch = user.password ===password ? true : false;
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch)
            return done(null, user);
        else 
            return done(null, false, {message: 'incorrect password'});
    }
    catch(err){
        return done(err);
    }
}))

module.exports = passport;