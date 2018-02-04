const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    facebookId: String,
    facebookName: String
});

mongoose.model('users', userSchema);