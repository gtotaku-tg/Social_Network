// basic user model
const { Schema, model, Types } = require ('mongoose');
// import Thought from './Thought';
const thoughts = require('./Thought');


// Create the User Schema using the Mongoose Schema constructor
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
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

// Create a virtual called friendCount that retrieves 
//the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;