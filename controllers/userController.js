const { User, Thought } = require('../models');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    };
}

// Creates a new user
const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ error });
    };
};

// Get One User By Id with thoughts and friends populated
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('thoughts')
            .populate('friends');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    };
};

// Update a User by id
const updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            {
                new: true,
            },
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    };
};

// Deletes a User by Id
const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        // delete associated thoughts
        await Thought.deleteMany({username: deletedUser.username});
        res.status(200).json(deletedUser);
      } catch (error) {
        res.status(500).json({error});
      };
};

// Add a friend to the friends array by ID
const addFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $addToSet: {
                    friends: req.params.friendId,
                },
            },
            {
                new: true,
            },
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    };
};

// Remove a friend from friends array by ID
const deleteFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $pull: {
                    friends: req.params.friendId,
                },
            },
            {
                new: true,
            },
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    };
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend,
};