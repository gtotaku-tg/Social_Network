const { Schema, model } = require('mongoose');

// create the reaction schema
const reactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Reaction is required!',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Username is required!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

//export the reaction schema
module.exports = reactionSchema;