// const { User, Thought } = require('../models').default;
const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
    // get all users
    async getUsers (req, res) {
        try {
            // get all users
            const User = await User.find()
            // .populate('pokemon')
            // .populate('badges')
            res.status(200).json(User);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single user by id
    async getSingleUser(req, res) {
        try{
            // find individual user with id
            const User = await User.findOne({_id: req.paramas.id})
            if (!User) {
                res.status(404).json({message: 'No User with this id!'});
                return;
            }else{
            res.status(200).json(User);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a user
    async createUser(req, res)  {
        try {
            const result = await User.create(req.body);
            res.status(200).json({message:'Success', User: result});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update a user
    async updateUser (req, res)  {
        try {
            const result = await User.findOneAndUpdate(
                {_id: req.params.id},
                // set 
                {$Set: {username: req.body.username, email: req.body.email}},
                // pass in options
                {new: true, runValidators: true}
            )
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a user and associated thoughts
    async deleteUser (req, res) {
        try {
            const result = await User.findOneAndDelete({_id: req.params.id});
            res.status(200).json(result);
            // // delete associated thoughts
            // await Thought.deleteMany({_id: result.thoughts});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add a friend
    async addFriend  (req, res) {
        try {
            const result = await User.findOneAndUpdate(
                {_id: req.params.id},
                // set
                {$push: {friends: req.params.friendId}},
                // pass in options
                {new: true}
            )
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a friend 
    async deleteFriend  (req, res) {
        try {
            const result = await User.findOneAndUpdate(
                {_id: req.params.id},
                // set
                {$pull: {friends: req.params.friendId}},
                // pass in options
                {new: true}
            )
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}


module.exports = userController;