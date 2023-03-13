import { sequelize } from '../db.js';
import { User } from './user.js';
import { Product } from './product.js';
import { Message } from './message.js';


const models = {
  User,
  Product,
  Message,
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

export { sequelize, models };

// models.User = import('./user.js')
// .then(a => {
//     // user.user();
//     // console.log("aa", a.user);
//     const r = a.user(sequelize, DataTypes);
//     (async () => {
//      let me = await r.findByLogin('Ali Raza');
//      console.log(me);
//     })();

    
// })
// .catch(err => {
//     console.error(err);
// });

// const User = require(`${__dirname}/user`)(sequelize);
// const Message = require(`${__dirname}/message`)(sequelize);

// const models = {
//   User: sequelize.import(`${__dirname}/models/user`),
//   Message: sequelize.import(`${__dirname}/models/message`),
// };

// Object.keys(models).forEach(key => {
//   if ('associate' in models[key]) {
//     models[key].associate(models);
//   }
// });

// export { sequelize };

// export default models;



// let users = {
//     1: {
//         id: '1',
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'johndoe@gmail.com',
//         productIds: [1],
//         username: 'John Doe',
//         messageIds: [1],
//     },
//     2: {
//         id: '2',
//         firstName: 'James',
//         lastName: 'Johnson',
//         email: 'jamesjohnson@gmail.com',
//         productIds: [2],
//         username: 'James Johnson',
//         messageIds: [2],
//     },
//     3: {
//         id: '3',
//         firstName: 'Ali',
//         lastName: 'Raza',
//         email: 'aliraza@gmail.com',
//         productIds: [3],
//         username: 'Ali Raza',
//         messageIds: [3],
//     }
//   };

//   let products = {
//     1: {
//       id: '1',
//       name: 'Brown eggs',
//       description: "Raw organic brown eggs in a basket",
//       price: 28.1,
//       userId: 1
//     },
//     2: {
//       id: '2',
//       name: 'Fresh stawberry',
//       description: "Sweet fresh stawberry on the wooden table",
//       price: 29.45,
//       userId: 2
//     },
//     3: {
//       id: '3',
//       name: 'Bread',
//       description: "Homemade bread",
//       price: 17.48,
//       userId: 3
//     },
//   };

//   let messages = {
//     1: {
//       id: '1',
//       text: 'Hello World',
//       userId: 1
//     },
//     2: {
//       id: '2',
//       text: 'Bye World',
//       userId: 2
//     },
//   };

//   models.users = users;
//   models.products = products;
//   models.messages = messages;

//   module.exports = { sequelize, models };
 


//   console.log(models);

  // export default {
  //   users,
  //   products,
  //   messages,
  // };