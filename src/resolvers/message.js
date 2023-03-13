// import { v4 as uuidv4 } from 'uuid';

export default {
    Query: {
        myMessages: async (parent, args, { me, Message }) => {
            return await Message.findAll({
                where: {
                    userId: me.id,
                },
            });
        },
        message: async (parent, { id }, { Message }) => {
            return await Message.findByPk(id);
        },
        messages: async (parent, args, { Message }) => {
            return await Message.findAll();
        }
    },

    Mutation: {
        createMessage: async (parent, { text }, { me, Message }) => {
            return await Message.create({
                text,
                userId: me.id,
            });
            // const id = uuidv4();
            // const message = {
            //     id,
            //     text,
            //     userId: me.id,
            // };

            // models.messages[id] = message;
            // models.users[me.id].messageIds.push(id);

            // return message;
        },

        deleteMessage: async (parent, { id }, { Message }) => {
            return await Message.destroy({
                where: {
                    id
                }
            });
            // const { [id]: message, ...otherMessages } = models.messages;

            // if (!message) {
            //     return false;
            // }

            // models.messages = otherMessages;

            // return true;
        },
    },

    Message: {
        user: async (message, args, { User }) => {
            return await User.findByPk(message.userId);
        },
    },
};