const { Schema, model } = require('mongoose');



// const validateEmail = (email) => {
//     const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email);
//   };
  
const UserSchema = new Schema({
   
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
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ],
  },
  thoughts: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Thought'
}
],
  friends: [{ 
    type: Schema.Types.ObjectId,
    ref: 'User'
}]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  });
  const User = model('User', UserSchema);

  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });



module.exports = User;