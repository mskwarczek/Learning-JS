const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://testuser:testpass1@ds115592.mlab.com:15592/nodeappdatabase', {useNewUrlParser: true});

const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

userSchema.methods.manify = function(next) {
    this.name = this.name + '-boy';
    return next(null, this.name);
};

userSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

const User = mongoose.model('User', userSchema);

const kenny = new User({
    name: 'Kenny',
    username: 'Kenny_the_boy',
    password: 'password'
});

kenny.manify(function (err, name) {
    if (err) throw err;
});

kenny.save(function (err) {
    if (err) throw err;
    console.log('Uzytkownik ' + kenny.name + ' zapisany pomyslnie');
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});

benny.manify(function (err, name) {
    if (err) throw err;
});

benny.save(function (err) {
    if (err) throw err;
    console.log('Uzytkownik ' + benny.name + ' zapisany pomyslnie');
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});

mark.manify(function (err, name) {
    if (err) throw err;
});

mark.save(function (err) {
    if (err) throw err;
    console.log('Uzytkownik ' + mark.name + ' zapisany pomyslnie');
});

const findAllUsers = function() {
    return User.find({}, function(err, res) {
        if (err) throw err;
        console.log('Actual database records are: ' + res);
    });
}

const findSpecificRecord = function(param) {
    return User.find({ username: param }, function(err, res) {
        if (err) throw err;
        console.log('Record you are looking for is:\n' + res);
    })
}

const updadeUserPassword = function(param1, param2) {
    return User.findOne({ username: param1 })
        .then(function(user) {
            console.log('Old password is ' + user.password);
            console.log('Name ' + user.name);
            user.password = param2;
            console.log('New password is ' + user.password);
            return user.save(function(err) {
                if (err) throw err;
                console.log('Uzytkownik ' + user.name + ' zostal pomyslnie zaktualizowany');
            })
        })
        .catch(console.log.bind(console));
}

const updateUsername = function(param1, param2) {
    return User.findOneAndUpdate({ username: param1 }, { username: param2 }, { new: true }, function(err, user) {
        if (err) throw err;
        console.log('Nazwa uzytkownika po aktualizacji to ' + user.username);
    })
}

const removeUser = function(param) {
    return User.findOneAndRemove({ username: param })
        .then(function(user) {
            return user.remove(function() {
                console.log('User successfully deleted');
            });
        })
        .catch(console.log.bind(console));
}

const removeAll = function() {
    return User.deleteMany({}, function(err) {
        if (err) throw err;
        console.log('All users have been removed')
    });
}

process.stdin.setEncoding('utf-8');
console.log(`
Commands:
/findAll (show all users)
/findUser <userName> (example: /find Kenny_the_boy)
/changePassword <userName> <newPassword> (example: /changePassword Kenny_the_boy qwe123)
/changeName <userName> <newName> (example: /changeName Kenny_the_boy Kenny)
/removeUser <userName> (example: /removeUser Kenny_the_boy)
/removeAll (removes ALL users from the collection\n`)

process.stdin.on('readable', function() {
    let input = process.stdin.read();
    if (input !== null) {
        let instruction = input.toString().trim().split(' ');
        switch (instruction[0]) {
            case '/findAll': findAllUsers(); break;
            case '/findUser': findSpecificRecord(instruction[1]); break;
            case '/changePassword': updadeUserPassword(instruction[1], instruction[2]); break;
            case '/changeName': updateUsername(instruction[1], instruction[2]); break;
            case '/removeUser': removeUser(instruction[1]); break;
            case '/removeAll': removeAll(); break;
            default: console.log('Wrong instruction!\n');
        }
    }
});