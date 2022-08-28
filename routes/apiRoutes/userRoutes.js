const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
} = require('../../controllers/userController');

// /api/user routes

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);



module.exports = router;