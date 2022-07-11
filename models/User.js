const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  
const UserSchema = new Schema({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  thoughts: {
    type: Schema.Types.ObjectId,
    ref: 'Thought'
},
  friends: { 
    type: Schema.Types.ObjectId,
    ref: 'User'
}
},

{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  })

  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  })


  const User = model('User', UserSchema);

module.exports = User;