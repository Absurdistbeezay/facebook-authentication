const cookieSession = require('cookie-session');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI)
.then(()=>console.log('MongoDB Connected'))
.catch(err =>console.log(err));

const app = express();

//cookie
app.use(cookieSession({
   
    keys: [keys.cookieKey],
     //30 days
    maxAge: 30*24*60*60*1000
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', (req, res)=>{
res.send('Nepali!');
});

const port = 3500;

app.listen(port, ()=> {
    console.log('Server started on port ' + port);
});
