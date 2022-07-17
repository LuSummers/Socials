
const router = require('express').Router();


const { 
    getAllThoughts, 
    getThoughtsById, 
    createThought, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

router.route('/')
    .get(getAllThoughts)
    .post(createThought);

router.route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts); 

router.route('/:userId')
    .post(createThought);

router.route('/:thoughtId/reactions')
.post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;