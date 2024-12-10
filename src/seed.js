import { models, sequelize } from './models/index.js'
const { User } = models

const seedDatabase = async () => {
  try {
    // Sync the database models with the database schema
    await sequelize.sync({ force: true })

    // Create some users
    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'abcd5678',
        role: 'USER',
      },
      {
        firstName: 'James',
        lastName: 'Johnson',
        email: 'jamesjohnson@gmail.com',
        password: 'abcd5678',
        role: 'USER',
      },
      {
        firstName: 'Ali',
        lastName: 'Raza',
        email: 'aliraza@gmail.com',
        password: 'abcd5678',
        role: 'ADMIN',
      },
    ]

    await User.bulkCreate(users)

    const products = [
      {
        name: 'Burger',
        description:
          'A delicious beef burger with lettuce, tomato, and cheese.',
        price: 8.99,
        image: 'burger.jpg',
      },
      {
        name: 'Caesar Salad',
        description:
          'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese.',
        price: 6.99,
        image: 'caesar_salad.jpg',
      },
      {
        name: 'Chocolate Cake',
        description:
          'Rich and moist chocolate cake with a creamy chocolate frosting.',
        price: 4.99,
        image: 'chocolate_cake.jpg',
      },
    ]

    await models.Product.bulkCreate(products)

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Unable to seed the database:', error)
  } finally {
    // Close the database connection when done
    // await sequelize.close();
  }
}

export { seedDatabase }
