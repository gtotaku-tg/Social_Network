const { User, Thought } = require('../models');

// get all thoughts
const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find()
        res.status(200).json(Thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get single thought by id
const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({_id: req.params.id})
        res.status(200).json(Thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

// create a thought
const createThought = async (req, res) => {
    try {
        const result = await Thought.create(req.body);
        res.status(200).json({message:'Success', Thought: result});
    } catch (err) {
        res.status(500).json(err);
    }
}

// update a thought
const updateThought = async (req, res) => {
    try {
        const result = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$Set: {thoughtText: req.body.thoughtText, reactions: req.body.reactions}},
            // pass in options
            {new: true, runValidators: true}
        )
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

// delete a thought
const deleteThought = async (req, res) => {
    try {
        const result = await Thought.findOneAndDelete({_id: req.params.id});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

// add a reaction
const addReaction = async (req, res) => {
    try {
        const result = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {reactions: req.body}},
            // pass in options
            {new: true, runValidators: true}
        )
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

// delete a reaction
const deleteReaction = async (req, res) => {
    try {
        const result = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            // pass in options
            {new: true, runValidators: true}
        )
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getThoughts,
    getSingleThought,
    createThought,  
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
}
