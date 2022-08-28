const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/user routes

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);



module.exports = router;