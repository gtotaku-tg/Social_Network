// const { User, Thought } = require('../models');
const User = require('../models/User');
const {Thought} = require('../models');

// get all thoughts
module.export = {

    // get all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .populate({ path: 'reactions', select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(thoughts => res.json(thoughts))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // get one thought 
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .populate({ path: 'reactions',  select: '-__v'
        })
        .select('-__v')
        .then((thought) => {
            if (!thought) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(thought);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate({_id: req.body.userId}, {$push: {thoughts: thought._id}}, {new: true}
            );
        })
        .then((user) => {
            if (!user) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(user);
        }
        )
        .catch(err => res.json(err));
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {runValidators: true, new: true})
        .then((thought) => {
            if (!thought) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(thought);
        })
        .catch(err => res.json(err));
    }
    ,
   
    // add a reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$push: {reactions: req.body}}, {runValidators: true, new: true})
        .then((thought) => {
            if (!thought) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(thought);
        })
        .catch(err => res.json(err));
    }
    ,
     // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) => {
            if (!thought) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            return User.findOneAndUpdate({_id: req.body.userId}, {$pull: {thoughts: req.params.thoughtId}}, {new: true}
            );
        })
        .then((user) => {
            if (!user) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(user);
        }
        )
        .catch(err => res.json(err));
    },
    // delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {runValidators: true, new: true})
        .then((thought) => {
            if (!thought) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(thought);
        })
        .catch(err => res.json(err));
    }
};
