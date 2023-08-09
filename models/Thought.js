// basic user model
const { Schema, model } = require ('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought is required!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: (timestamp) => dateFormat(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: 'Username is required!'
        },
        // subdocument for reactions
        // reactions: [reactionSchema] 
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
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
            
                