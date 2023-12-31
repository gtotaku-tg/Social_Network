const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    updateThought,
    createThought,
    deleteThought,
    addReaction,
    deleteReaction  
} = require('../../controllers/thoughtController');

// get & post at /api/thoughts
router.route('/').get(getThoughts).post(createThought);
// get, put, & delete at /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought); 
// post at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);
 // delete at /api/thoughts/:thoughtId/reactions/:reactionId          
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;