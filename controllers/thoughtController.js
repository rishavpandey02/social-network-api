const { User, Thought } = require('../models');

module.exports = {

    getThoughts(req, res) {
        Thought.find().then((thought) => res.json(thought))
        .catch((err) => {
            console.log("error", err);
        res.status(200).json(err)});
    },

    getSingleThought(req, res) {
        Thought.findOne({
            _id: req.params.userId
        })
        .select("-__v")
        .then((thought) => 
        !thought ? res.status(404).json({message: "No thoughts found with this certain ID"})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body).then(( data ) => {
            return User.findOneAndUpdate(
                {
                    _id: req.body.userId
                },
                { 
                    $push:{ thoughts:{_id}} 
                },
                {
                    new:true
                }
            );
        })
        .then((thought) => 
        !thought ? res.status(404).json({ message: "No user found with this certain ID" })
        :res.json(thought)
        )
        .catch((err) => res.status(200).json(err));
    },

   updateThought(req, res) {
    Thought.findOneAndUpdate(
        {
            _id: req.params.thoughtId
        }, 
        {
            $set: req.body 
        },
        {
            runValidators: true,
            New: true
        }
    )
    .then((user) =>
    !user?  res.status(404).json({message:"No thought found with that id."}) 
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
   },

   deleteThought(req, res) {
    Thought.findOneAndDelete({
        _id: req.params.userId
    })
    .then((thought) =>
    !thought ? res.status(404).json({message:"No thoughts found via ID"})
    : User.findOneAndUpdate(
        {
            thoughts: req.params.thoughtId
        },
        {
           $pull: { 
            thoughts: req.params.thoughtId
           } 
        },
        {
            new: true
        }
    )
    )
    .then((user) => 
    !user ? res.status(404).json({message: "Though has been deleted but user is not found"})
    : res.json({ message: "Thought deleted"})
    )
    .catch((err) => res.status(500).json(err));
   },

   addReaction(req, res) {
    Thought.findOneAndUpdate(
        {
            _id: req.params.thoughtId
        },
        {
            $addToSet: {
                reactions: req.body
            }
        },
        {
            runValidators:true,
            new: true
        }
    )
    .then((thought) =>
    !thought
    ?res.status(404).json({message: 'No thought with that id'})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
   },

   deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        {
            _id: req.params.thoughtId
        },
        {
            $pull:{
                reactions:{
                    reactionId:req.params.reactionId
                }
            }
        },
        {
            runValidators: true,
            new: true
        }
    )
    .then((thought) => 
    !thought ? res.status(404).json({message:"No thoughts find through ID"})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
   },
};