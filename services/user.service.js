// Imports //
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



// REGISTER NEW USER //
async function register(email, pseudo, password) {

    const existingEmail = await User.findOne({ email });

    // SI EMAIL PAS EXISTANT //
    if (!existingEmail) {

        const existingPseudo = await User.findOne({ pseudo });

        // SI PSEUDO PAS EXISTANT //
        if (!existingPseudo) {

            // CREATION USER //
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            const data = { email, pseudo, password };

            await User.create(data)


            // TOKEN //
            const currentUser = await User.findOne({ email });
            const token = jwt.sign({ id: currentUser._id }, process.env.ACCESSTOKENSECRET, { expiresIn: process.env.JWTEXPIRE })

            return {
                token
            }
        }
        else throw new Error('Email et/ou pseudo invalide');
    }

    else throw new Error('Email et/ou pseudo invalide');
};


// UPDATE USER //
async function update(data) {

    const currentUser = await User.findOne({ email });

    if (currentUser) {

        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);


        await User.create(data);
    }

    else throw new Error('Email incorrect');
};


// LOGIN EXISTING USER //
async function login(email, password) {

    const currentUser = await User.findOne({ email });
    console.log(currentUser);

    if (currentUser) {

        const isPasswordOk = await bcrypt.compare(password, currentUser.password);

        if (isPasswordOk) {
            const token = jwt.sign({ id: currentUser._id }, process.env.ACCESSTOKENSECRET, { expiresIn: process.env.JWTEXPIRE })

            return {
                token
            }
        }
        throw new Error('Mot de passe incorrect');
    }

    else throw new Error('Email incorrect');
};


// ADD FRIEND //
async function addFriend(userId, pseudo) {

    console.log(pseudo);

    const currentUser = await User.findById(userId);
    const friendUser = await User.findOne({ pseudo: { $regex: new RegExp('^' + pseudo +'$', 'i')} });       // pseudo reçu --> insensitive search dans le field pseudo `/^${pseudo}$/i` || '/^'+pseudo+'$/i'
   
    console.log('currentUser', currentUser);
    console.log('friendUser', friendUser);
 
    // SI PSEUDO PAS EXISTANT & PAS SOI-MÊME & PAS DEJA EN AMI //
    if (friendUser && friendUser.id!=currentUser.id && !currentUser.friends.includes(friendUser.id) ) {

        currentUser.friends.push(friendUser._id);

        await currentUser.save();
    }

    else throw new Error('Pseudo invalide');
};


// GET FRIEND LIST //
async function getFriendsList(userId) {
    
    const currentUser = await User.findById(userId).populate('friends');            // Populate toujours sur un model

    console.log(currentUser);

    if (currentUser.friends) {

        const friends = currentUser.friends.map(f => ({pseudo: f.pseudo}));  
                     
        friends.sort((a,b) => (a.pseudo > b.pseudo) ? 1 : ((b.pseudo > a.pseudo) ? -1 : 0)) // Donne un poids au pseudo et trie en fct du poids

        return friends
    }

    else throw new Error(`Liste d'amis vide`);
};


module.exports = {
    register,
    update,
    login,
    addFriend,
    getFriendsList
};
