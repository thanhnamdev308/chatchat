import express from 'express';
import { getOneMessage, getMessage, createMessage } from './message.controller.mjs'

const MessageRouter = express.Router();

// TODO: Declare API Endpoints for Message

MessageRouter.get('/message', (req, res) => {
    console.log(`Get all messages`);

    res.json({ message: 'Get all messages' });
});

MessageRouter.get('/message/:id', (req, res) => {
    const messageId = req.params.id;
    console.log(`Get message with ID: ${messageId}`);

    res.json({ message: `Get message with ID: ${messageId}` });
});

MessageRouter.post('/message', (req, res) => {
    console.log(`Post message`);

    res.json({ message: `Post message` });
});

export { MessageRouter };  // Export the router object
