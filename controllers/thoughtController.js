const { User, Thought } = require('../models');

// Get all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (error) {
        res.status(500).json({ error });
    };
}

// Creates a new thought
const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        // Update user's thought array
        await User.findOneAndUpdate(
            { username: req.body.username },
            {
                $push: {
                    thoughts: newThought._id,
                },
            });
        res.status(200).json(newThought);
    } catch (error) {
        res.status(500).json({ error });
    };
};

// Get One Thought By Id
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error });
    };
};

// Update a Thought by id
const updateThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            {
                new: true,
            },
        );
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error });
    };
};

// Deletes a Thought by Id
const deleteThoughtById = async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
        // delete associated thoughts
        await User.findOneAndUpdate(
            { username: deletedThought.username },
            {
                $pull: {
                    thoughts: deletedThought._id,
                }
            }
        );
        res.status(200).json(deletedThought);
    } catch (error) {
        res.status(500).json({ error });
    };
};

// Add a reaction to reactions array by ID
const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            {
                $addToSet: {
                    reactions: req.body,
                },
            },
            {
                new: true,
            },
        );
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error });
    };
};

// Remove a reaction from reactions array by ID
const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            {
                $pull: {
                    reactions: {reactionId: req.params.reactionId},
                },
            },
            {
                new: true,
            },
        );
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error });
    };
};

module.exports = {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction,
};