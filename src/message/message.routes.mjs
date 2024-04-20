import express from 'express';
import { getOneMessage, getMessage, createMessage } from './message.controller.mjs'
import bodyParser from 'body-parser';

const MessageRouter = express.Router();
MessageRouter.use(bodyParser.json());

// TODO: Declare API Endpoints for Message

MessageRouter.get('/', async (req, res) => {
    console.log(`Get all messages`);

    const messages = await getMessage();

    res.json({ messages });
});

MessageRouter.get('/:id', async (req, res) => {
    const messageId = req.params.id;
    console.log(`Get message with ID: ${messageId}`);

    const message = await getOneMessage(messageId);

    console.log(`Message found: ${message}`);

    res.json({ message });
});

MessageRouter.post('/', async (req, res) => {
    console.log(`Post message`);

    const owner = req.body.owner;
    const content = req.body.content;

    console.log(`Post Message`);
    console.log(`Owner: ${owner}`);
    console.log(`Content: ${content}`);

    await createMessage(owner, content);

    res.json({ message: `Post message` });
});

export { MessageRouter };  // Export the router object
