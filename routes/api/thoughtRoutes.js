const router = require('express').Router();


const {
    fetchAllIdeas,
    fetchIdeaById,
    generateNewIdea,
    reviseIdea,
    eradicateIdea,
    addFeedback,
    removeFeedback
} 

= require('../../controllers/thoughtController');  

router.route('/')
    .get(fetchAllIdeas)
    .post(generateNewIdea);

router.route('/:thoughtId/reactions/:reactionsId')
    .delete(removeFeedback);

router.route('/:thoughtId/reactions')
    .post(addFeedback);

router.route('/:thoughtId')
    .get(fetchIdeaById)
    .put(reviseIdea)
    .delete(eradicateIdea);

module.exports = router;
