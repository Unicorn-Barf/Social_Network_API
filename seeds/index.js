const { User, Thought } = require('../models');
const usersSeed = require('./users');
const thoughtsSeed = require('./thoughts');
const mongoose = require('mongoose');
require('dotenv').config();


const seeder = async () => {

    try {
        await mongoose.connect(process.env.DB_STRING);
        console.log('Connected to Database.');

        await Thought.deleteMany();
        console.log('Successfully deleted all thoughts!');

        await User.deleteMany();
        console.log('Successfully deleted all users!');

        await User.insertMany(usersSeed);
        console.log('Successfully seeded users!');

        const newThoughts = await Thought.insertMany(thoughtsSeed);

        for (const thought of newThoughts) {
            await User.findOneAndUpdate(
                { username: thought.username },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
        };
        console.log('Successfully seeded thoughts!');
    } catch (error) {
        console.log(error);
    }
    process.exit(0);
};

seeder();