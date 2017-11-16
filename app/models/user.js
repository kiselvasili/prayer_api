let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

let UserSchema = new mongoose.Schema({
    email: {
        type: String, 
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

UserSchema.pre('save', function(next) {
    let user = this;
    let SALT_FACTOR = 5;

    if(!user.isModified('password')) {
        return next(err);
    }

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if(err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) {
                return next(err);
            }

            user.password = hash;

            next();
        });
    });
});

UserSchema.methods.comparePassword = function(passwordAttempt, cb) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);