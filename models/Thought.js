const { Schema, model, Types } = require('mongoose');


const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {
    toJSON: {
        getters: true
    } 
    }
);
const ThoughtSchema = new Schema(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      thoughtText: {
        type: String,
        required:true,
        minlength:1,
        maxlength:280,
      },

        createdAt: {
          type: Date,
          default: Date.now,
          get: (createdAtVal) => dateFormat(createdAtVal)
        },

        username: {
            type: String,
            required: true
        },
        reactions: 
            [reactionSchema]
        },

        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
            }
)
  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

  module.exports = Thought;