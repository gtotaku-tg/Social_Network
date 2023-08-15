// const { User, Thought } = require('../models').default;
const {User} = require('../models');
// const Thought = require('../models/Thought');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(users => res.json(users))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then((user) => {
            if (!user) {
                res.status(404).json({message: 'Found nobody with this id!'});
                return;
            }
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch(err => res.json(err));
    },
    // update a user 
    updateUser(req, res) {   
        User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {new: true, runValidators: true})
        .then((user) => {
            if (!user) {
                res.status(404).json({message: 'Found nobody with this id!'});
                return;
            }
            res.json(user);
        })
        .catch(err => res.json(err));
    },

    // add a friend
    addFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$push: {friends: req.params.friendId}}, {new: true})
        .then((user) => {
            if (!user) {
                res.status(404).json({message: 'Found nobody with this id!'});
                return;
            }
            res.json(user);
        })
        .catch(err => res.json(err));
    },
        // delete a user
        deleteUser(req, res) {
            User.findOneAndDelete({_id: req.params.userId})
            .then((user) => {
                if (!user) {
                    res.status(404).json({message: 'Found nobody with this id!'});
                    return;
                }
                res.json(user);
            })
            .catch(err => res.json(err));
        },
    // delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true})
        .then((user) => {
            if (!user) {
                res.status(404).json({message: 'Found nobody with this id!'});
                return;
            }
            res.json(user);
        })
        .catch(err => res.json(err));
    }

};

