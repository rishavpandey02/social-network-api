const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(200).json(err));
    },


    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId}).populate("thought").populate("friends").select("-__v").then((user) =>
        !user ? res.status(404).json({message:"User not found with this certain ID"}) : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log("error", err);
            return res.status(500).json(err);
        });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.userId 
            },
            {
                $set: req.body
            },
            {
                runValidators: true,
                new: true,
            },
        )
        .then((user) =>
        !user?res.status(404).json({ message:'No user was updated' }): res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete(
            {
                _id: req.params.userId
            }
        )
        .then((user) =>
        !user ? res.status(404).json({message:"User not Found with that certain ID"}) 
        : Thought.deleteMany(
            {_id:{'$in':user.thoughts}}),
        )
        .then(() => res.json({message:"User and User's Thoughts have been deleted"}))
        .catch((err) => res.status(500).json(err));
        
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            {
                _id:req.params.userId
            },
            {
                $addToSet:{friends:req.params.friendId}
            },
            { 
                runValidators: true,
                new:true
            },
        )
        .then((user) => 
        !user ? res.status(404).json({message:"Users not found with that certain ID"}) : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {
                _id:req.params.userId
            },
            {
                $pull:{friends:req.params.friendId}
            },
            {
                new:true
            }
            
        )
        .then((user) => 
        !user ? res.status(404).json({message:"Users not found with this certain ID"}) : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};