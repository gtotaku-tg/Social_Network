// basic user model
const { Schema, model } = require ('mongoose');
const reactionSch = require('./Reaction');
const moment = require('moment');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: 'Username is required!'
        },
        // subdocument for reactions
        // reactions: [reactionSchema] 
        reactions: [reactionSch]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Create a virtual called reactionCount that retrieves 
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports =Thought;
            
                