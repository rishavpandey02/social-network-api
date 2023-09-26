const Models = require("../models");
const Person = Models.User;
const Idea = Models.Thought;

const handlers = {
  retrieveAllUsers(req, res) {
    Person.find({})
      .then(allUsers => res.json(allUsers))
      .catch(error => res.status(500).json(error));
  },

  fetchUserById(req, res) {
    const id = req.params.personId;
    Person.findById(id)
      .populate("ideas")
      .populate("connections")
      .select("-__v")
      .then(person => {
        if (!person) {
          res.status(404).json({ note: "No matching Person found." });
        } else {
          res.json(person);
        }
      })
      .catch(error => res.status(500).json(error));
  },

  addNewUser(req, res) {
    Person.create(req.body)
      .then(newUser => res.json(newUser))
      .catch(error => {
        console.error(error);
        res.status(500).json(error);
      });
  },

  modifyUser(req, res) {
    const id = req.params.personId;
    Person.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true, new: true })
      .then(updatedUser => {
        if (!updatedUser) {
          res.status(404).json({ note: "No matching Person found." });
        } else {
          res.json(updatedUser);
        }
      })
      .catch(error => res.status(500).json(error));
  },

  removeUser(req, res) {
    const id = req.params.personId;
    Person.findByIdAndRemove(id)
      .then(removedUser => {
        if (!removedUser) {
          res.status(404).json({ note: "No matching Person found." });
        } else {
          Idea.deleteMany({ _id: { $in: removedUser.ideas } });
        }
      })
      .then(() => res.json({ note: "Person and associated Ideas removed." }))
      .catch(error => res.status(500).json(error));
  },

  linkFriend(req, res) {
    const id = req.params.personId;
    const friendId = req.params.connectionId;
    Person.findByIdAndUpdate(id, { $addToSet: { connections: friendId } }, { runValidators: true, new: true })
      .then(updatedPerson => {
        if (!updatedPerson) {
          res.status(404).json({ note: "No matching Person found." });
        } else {
          res.json(updatedPerson);
        }
      })
      .catch(error => res.status(500).json(error));
  },

  unlinkFriend(req, res) {
    const id = req.params.personId;
    const friendId = req.params.connectionId;
    Person.findByIdAndUpdate(id, { $pull: { connections: friendId } }, { new: true })
      .then(updatedPerson => {
        if (!updatedPerson) {
          res.status(404).json({ note: "No matching Person found." });
        } else {
          res.json(updatedPerson);
        }
      })
      .catch(error => res.status(500).json(error));
  },
};

module.exports = handlers;
