const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    // On sauvegarde la nouvelle sauce
    sauce.save()
    .then(() => res.status(201).json({ message: "New sauce registered!"}))
    .catch((error) => res.status(400).json({ error }));
};

// Middleware to modify the sauce 
exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modofied!' }))
    .catch((error) => res.status(400).json({ error }));
};

// Middleware to delete the specific sauce 
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce deleted!' }))
            .catch((error) => res.status(400).json({ error }));
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Middleware to get one specific sauce 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

// Middleware to get all the sauces 
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.likesASauce = (req, res, next) => {
    const userId = req.body.userId;
    const likeStatement = req.body.like;
  
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        const alreadyLiked = sauce.usersLiked.find((id) => id === userId);
        const alreadyDisliked = sauce.usersDisliked.find((id) => id === userId);

        console.log("--------------");
        console.log("userId liked: "+userId);
        console.log(sauce.usersLiked.find((id) => id === userId));

        console.log("--------------");
        console.log("userId disliked: "+userId);
        console.log(alreadyDisliked);

        switch(likeStatement) {
            case 1:
                sauce.likes++;
                sauce.usersLiked.push(userId);
                break;
            case 0:
                if(alreadyLiked) {
                    sauce.likes--;
                    sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId);
                }
                if(alreadyDisliked) {
                    sauce.dislikes--;
                    sauce.usersDisliked = sauce.usersDisliked.filter((id) => id !== userId);
                }
                break;
            case -1:
                sauce.dislikes++;
                sauce.usersDisliked.push(userId);
                break;
        }
        sauce.save()
        .then(() => res.status(201).json({ message: "successfully registered!"}))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};