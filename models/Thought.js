const { Schema, model } = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

// reaction subdocument schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            
        }
    }

);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatTimestamp,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual to get total reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Getter function to format the 'createdAt' timestamp
// ex. Result August 22, 2020 at 6:45 PM
function formatTimestamp(createdAt) {
    return `${(new Date(createdAt)).toLocaleDateString([], { dateStyle: 'long' })} at ${(new Date(createdAt)).toLocaleTimeString([], { timeStyle: 'short' })}`;
};

module.exports = model('Thought', thoughtSchema);