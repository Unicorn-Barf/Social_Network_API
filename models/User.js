const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Must provide a username!']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Must provide an email!'],
            match: /^[a-z\d_\.-]+@[a-z\d\.-]+\.[a-z\.]{2,6}$/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = model('User', userSchema);