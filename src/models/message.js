import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { User } from './user.js';

// export const message = (sequelize) => {
//     const Message = sequelize.define("Message", {
//         text: {
//           type: DataTypes.STRING,
//         },
//       },
//       {
//         timestamps: false,
//       });
//       return Message;
// };


const Message = sequelize.define('message', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        },
  },
  },
});

Message.belongsTo(User);
User.hasMany(Message);

export { Message };