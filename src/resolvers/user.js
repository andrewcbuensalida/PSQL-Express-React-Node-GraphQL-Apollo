import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError, ForbiddenError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization.js';

const createToken = async (user, secret, expiresIn) => {
    const { id, email, role } = user;
    return await jwt.sign({ id, email, role }, secret, {
        expiresIn,
    });
};

export default {
    Query: {
        me: async (parent, args, { User, me }) => {
            if (!me) {
                return null;
            }
            return await User.findByPk(me.id);
        },
        getUser: async (parent, { id }, { User }) => {
            return await User.findByPk(id);
        },
        getAllUsers: async (parent, args, { User, me }) => {
                return await User.findAll();
        },
    },

    User: {
        messages: async (user, args, { Message }) => {
            return await Message.findAll({
                where: {
                    userId: user.id,
                },
            });
        },
        products: async (user) => {
            return await user.getProducts();
        }
        // products: (user, args, { models }) => {
        //     return Object.values(models.products).filter(
        //         product => product.userId == user.id,
        //     );
        // },
    },

    Mutation: {
        signIn: async(parent, { email, password }, { User, secret }) => {
            const user = await User.findByLogin(email);
            if (!user) {
                throw new UserInputError(
                  'No user found with this login credentials.',
                );
            }

            const isValid = await user.validatePassword(password);
            if (!isValid) {
                throw new AuthenticationError('Invalid password.');
            }

            return { token: createToken(user, secret, '30m') };
        },
    },
};