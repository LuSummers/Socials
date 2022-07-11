const {Thought, User} = require('../models');

const thoughtController = {


    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: params.userId}, {$push: {thought: _id}}, {new: true});
        })
        .then(dbThoughts => {
            if(!dbThoughts) {
                res.status(404).json({message: 'No thoughts with this ID!'});
                return;
            }
            res.json(dbThoughts)
        })
        .catch(err => res.json(err)); 
    },

    getAllThoughts(req,res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughts => res.json(dbThoughts))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtsById({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbThoughts => {
            if(!dbThoughts) {
            res.status(404).json({message: 'No thoughts with this ID!'});
            return;
        }
        res.json(dbThoughts)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    updateThoughts({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({message: 'No thoughts with this ID!'});
                return;
            }
                res.json(dbThoughts);
        })
        .catch(err => res.json(err));
    },

    deleteThoughts({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({message: 'No thoughts with this ID!'});
                return;
            }
            res.json(dbThoughts);
            })
            .catch(err => res.status(400).json(err));
    },

    // Add a new Reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughts => {
        if (!dbThoughts) {
            res.status(404).json({message: 'No thoughts with this ID!'});
            return;
        }
        res.json(dbThoughts);
        })
        .catch(err => res.status(400).json(err))

    },

    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({message: 'No thoughts with this ID!'});
                return;
            }
            res.json(dbThoughts);
        })
        .catch(err => res.status(400).json(err));
    }

};


module.exports = thoughtController;