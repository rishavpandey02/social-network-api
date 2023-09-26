const Models = require("../models");
const Person = Models.User;
const Idea = Models.Thought;

const ThoughtHandlers = {

  fetchAllIdeas(req, res) {
    Idea.find({})
      .then(ideaList => res.json(ideaList))
      .catch(err => res.status(500).json(err));
  },

  fetchIdeaById(req, res) {
    const ideaId = req.params.ideaId;
    Idea.findById(ideaId)
      .select("-__v")
      .then(singleIdea => {
        if (!singleIdea) {
          res.status(404).json({ note: "Cannot locate Idea by ID." });
        } else {
          res.json(singleIdea);
        }
      })
      .catch(err => res.status(500).json(err));
  },

  generateNewIdea(req, res) {
    Idea.create(req.body)
      .then(({ _id }) => {
        return Person.findByIdAndUpdate(
          req.body.personId,
          { $addToSet: { ideas: _id } },
          { new: true }
        );
      })
      .then(associatedIdea => {
        if (!associatedIdea) {
          res.status(404).json({ note: "Cannot locate User by ID." });
        } else {
          res.json(associatedIdea);
        }
      })
      .catch(err => res.status(500).json(err));
  },

  reviseIdea(req, res) {
    Idea.findByIdAndUpdate(
      req.params.ideaId,
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(updatedIdea => {
        if (!updatedIdea) {
          res.status(404).json({ note: "Cannot locate Idea by ID." });
        } else {
          res.json(updatedIdea);
        }
      })
      .catch(err => res.status(500).json(err));
  },

  eradicateIdea(req, res) {
    Idea.findByIdAndRemove(req.params.ideaId)
      .then(removedIdea => {
        if (!removedIdea) {
          res.status(404).json({ note: "Cannot locate Idea by ID." });
        } else {
          return Person.updateOne(
            { ideas: req.params.ideaId },
            { $pull: { ideas: req.params.ideaId } },
            { new: true }
          );
        }
      })
      .then(result => res.json({ note: "Idea and associations updated." }))
      .catch(err => res.status(500).json(err));
  },

  addFeedback(req, res) {
    Idea.findByIdAndUpdate(
      req.params.ideaId,
      { $addToSet: { feedbacks: req.body } },
      { runValidators: true, new: true }
    )
      .then(updatedIdea => {
        if (!updatedIdea) {
          res.status(404).json({ note: "Cannot locate Idea by ID." });
        } else {
          res.json(updatedIdea);
        }
      })
      .catch(err => res.status(500).json(err));
  },

  removeFeedback(req, res) {
    Idea.findByIdAndUpdate(
      req.params.ideaId,
      { $pull: { feedbacks: { feedbackId: req.params.feedbackId } } },
      { runValidators: true, new: true }
    )
      .then(updatedIdea => {
        if (!updatedIdea) {
          res.status(404).json({ note: "Cannot locate Idea by ID." });
        } else {
          res.json(updatedIdea);
        }
      })
      .catch(err => res.status(500).json(err));
  },

};

module.exports = ThoughtHandlers;
