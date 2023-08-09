// const { User, Thought } = require('../models').default;
const User = require('../models/User');
    // get all users
    const getUsers = async (req, res) => {
        try {
            // get all users
            const User = await User.find()
            // .populate('pokemon')
            // .populate('badges')
            res.status(200).json(User);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // get single user by id
    const getSingleUser= async (req, res) => {
        try{
            // find individual user with id
            const User = await User.find({_id: req.paramas.id})
            // populate thoughts and friends
            .populate('Thought')
            .populate('Friends');
            res.status(200).json(User);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // create a user
    const createUser= async (req, res) => {
        try {
            const result = await User.create(req.body);
            res.status(200).json({message:'Success', User: result});
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // update a user
    const updateUser = async (req, res) => {
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
    }
    // delete a user and associated thoughts
    const deleteUser = async (req, res) => {
        try {
            const result = await User.findOneAndDelete({_id: req.params.id});
            res.status(200).json(result);
            // delete associated thoughts
            await Thought.deleteMany({_id: result.thoughts});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // add a friend
    const addFriend = async (req, res) => {
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
    }

    // delete a friend 
    const deleteFriend = async (req, res) => {
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


module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
}