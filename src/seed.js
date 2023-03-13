import { models, sequelize }  from "./models/index.js";
const { User, Message } = models;

const seedDatabase = async () => {

  try {
    // Sync the database models with the database schema
    await sequelize.sync({ force: true });

    // Create some users
    const users = [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'abcd5678',
            role: 'USER',
            username: 'John Doe', 
            productIds: [1],
            messageIds: [1], 
        },
        {
            firstName: 'James',
            lastName: 'Johnson',
            email: 'jamesjohnson@gmail.com',
            password: 'abcd5678',
            role: 'USER',
            username: 'James Johnson',
            productIds: [2],
            messageIds: [2],  
        },
        {
            firstName: 'Ali',
            lastName: 'Raza',
            email: 'aliraza@gmail.com',
            password: 'abcd5678',
            username: 'Ali Raza',
            role: 'ADMIN',
            productIds: [3],
            messageIds: [3],
        },
      ];
      
    await User.bulkCreate(users);
   

    // Create some messages
    const messages = [
      { text: 'Hello, world!', userId: 1 },
      { text: 'How are you?', userId: 2 },
      { text: 'Nice to meet you!', userId: 3 },
    ];

    await Message.bulkCreate(messages);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Unable to seed the database:', error);
  } finally {
    // Close the database connection when done
    // await sequelize.close();
  }
};

export { seedDatabase };