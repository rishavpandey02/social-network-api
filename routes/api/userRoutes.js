const router = require('express').Router();


const {
    retrieveAllUsers,
    fetchUserById,
    addNewUser,
    modifyUser,
    removeUser,
    linkFriend,
    unlinkFriend
} 

= require('../../controllers/userController'); 


router.route('/')
    .get(retrieveAllUsers)
    .post(addNewUser);

router.route('/:userId/friends/:friendId')
    .post(linkFriend)
    .delete(unlinkFriend);

router.route('/:userId')
    .get(fetchUserById)
    .put(modifyUser)
    .delete(removeUser);

module.exports = router;
