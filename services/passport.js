const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser((id, done)=>{
    User.findById(id).then(user =>{
        done(null, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done)=>{
    // console.log(accessToken);
    // console.log(profile.id);
    User.findOne({
        facebookId: profile.id
    })
    .then((existingUser)=>{
        if(existingUser){
            //do nothing
            done(null, existingUser);
        }else{
            //make new user record
            new User ({facebookId: profile.id, facebookName: profile.displayName} ).save()
            .then(user => done(null, user));
        }
    })
})
);