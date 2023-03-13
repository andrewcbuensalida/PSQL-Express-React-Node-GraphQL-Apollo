import 'dotenv/config';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import express from "express";
import { ApolloServer, AuthenticationError, } from "apollo-server-express";
// import { default as Upload } from 'graphql-upload/Upload.js';

import schema from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import { models, sequelize }  from "./models/index.js";
import { seedDatabase } from './seed.js';
const { User, Product, Message } = models;

// import pkg from "./models/index.cjs";
// const { sequelize } = pkg;


const app = express();
app.use(cors());

// let users = {
//     1: {
//         id: '1',
//         username: 'John Doe',
//         messageIds: [1],
//     },
//     2: {
//         id: '2',
//         username: 'James Johnson',
//         messageIds: [2],
//     },
//     3: {
//         id: '3',
//         username: 'Ali Raza',
//         messageIds: [3],
//     }
//   };
// console.log(users[2].messageIds)
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

// const me = users[3];

// const schema = gql`
//     type Query {
//         me: User
//         user(id: ID!): User
//         users: [User!]

//         message(id: ID!): Message
//         messages: [Message!]
//     }

//     type User {
//         id: ID!
//         username: String!
//         messages: [Message!]
//     }

//     type Message {
//         id: ID!
//         text: String!
//         user: User!
//     }

//     type Mutation {
//         createMessage(text: String!): Message!
//         deleteMessage(id: ID!): Boolean!
//     }
// `;

// const resolvers = {
//     Query: {
//         me: (parent, args, { me }) => {
//             return me;
//         },
//         user: (parent, args) => {
//             return users[args.id];
//         },
//         users: () => {
//             return Object.values(users);
//         },

//         message: (parent, { id }) => {
//             return messages[id];
//         },
//         messages: () => {
//             return Object.values(messages);
//         }
//     },

//     Mutation: {
//         createMessage: (parent, { text }, { me }) => {
//             const id = uuidv4();
//             const message = {
//                 id,
//                 text,
//                 userId: me.id,
//             };

//             messages[id] = message;
//             users[me.id].messageIds.push(id);

//             return message;
//         },

//         deleteMessage: (parent, { id }) => {
//             const { [id]: message, ...otherMessages } = messages;

//             if (!message) {
//                 return false;
//             }

//             messages = otherMessages;

//             return true;
//         },
//     },

//     User: {
//         // username: (user) => `${user.firstname} ${user.lastname}`,
//         messages: user => {
//             return Object.values(messages).filter(
//                 message => message.userId == user.id,
//             );
//         },
//     },

//     Message: {
//         // user: (parent, args, { me }) => {
//         //     return me;
//         // },
//         user: (message) => {
//             return users[message.userId];
//         },
//     },
// };


const getMe = async (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // const token = req.headers['Authorization'];
  // console.log(token);

  // Verify the token
  if (token) {
    try {
      // console.log("hello")
      const payload = jwt.verify(token, process.env.SECRET);
      // Add the decoded token to the context
      
      console.log(payload);
      return payload;
    } catch (err) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
  // If there's no token, continue without authentication
  // return {};
};

async function startServer() {
    const apolloServer = new ApolloServer({
      typeDefs: schema,
      resolvers,
      // scalarsMap: { Upload: Upload },
      // formatError: error => {
      //   const message = error.message
      //     .replace('SequelizeValidationError: ', '')
      //     .replace('Validation error: ', '');
    
      //   return {
      //     ...error,
      //     message,
      //   };
      // },
      context: async ({ req }) => {
        const me = await getMe(req);
        return {
          User,
          Product,
          Message,
          me,
          secret: process.env.SECRET,
        }
      },
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();


// const createUsersWithMessages = async () => {

//   await models.User.create(
//     {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'johndoe@gmail.com',
//       username: 'John Doe',
//       // messages: [
//       //   {
//       //     text: 'Happy to release ...',
//       //   },
//       //   {
//       //     text: 'Published a complete ...',
//       //   },
//       // ],
//     },
    
//   );
// };

// const eraseDatabaseOnSync = true;

// await sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
//   if (eraseDatabaseOnSync) {
//     createUsersWithMessages();
//   }

//   app.listen({ port: 4000 }, () => {
//       console.log("Server is running on http://localhost:4000/graphql");
//   });
// });


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Sync the User and Message models with the database schema to create the "users" and "messages" tables
    return sequelize.sync({ force: true });
  })
  .then(() => {
    console.log('User and Message tables created successfully.');

    // Seed the database with some users and messages
    return seedDatabase();
  })
  .then(() => {
    console.log('Database seeded successfully.');

    // Now you can run your queries that reference the "users" and "messages" tables
    return User.findAll();
  })
  .then((users) => {
    // console.log(users);

    return Message.findAll();
  })
  .then((messages) => {
    // console.log(messages);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


  app.listen({ port: 4000 }, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });  