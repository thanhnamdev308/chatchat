# ChatChat

Just my development of ChatChat app

## Part 1: First simple implementation
- Backend to work with messages in messages.json file:
    ```json
    "0003": {
        "id": 3,
        "owner": "ChatChat",
        "content": "Type your message and press enter, it will appear here."
    },
    "0002": {
        "id": 2,
        "owner": "ChatChat",
        "content": "Welcome to my chat channel."
    },
    "0001": {
        "id": 3,
        "owner": "ChatChat",
        "content": "Hello World!"
    }
    ```
- Simple Frontend to make it accessible to Client.

__What I did:__
1. Define `message.routes.mjs` with `MessageRouter`,
    ```js
    import bodyParser from 'body-parser';

    const MessageRouter = express.Router();
    MessageRouter.use(bodyParser.json());  // To Parse the body of the requests
    ```

2. Use `async` and `await` to handle requests:
    ```js
    MessageRouter.get('/message', async (req, res) => {
        console.log(`Get all messages`);

        const messages = await getMessage();

        res.json({ messages });
    });

    MessageRouter.get('/message/:id', async (req, res) => {
        const messageId = req.params.id;
        console.log(`Get message with ID: ${messageId}`);

        const message = await getOneMessage(messageId);

        console.log(`Message found: ${message}`);

        res.json({ message });
    });

    MessageRouter.post('/message', async (req, res) => {
        console.log(`Post message`);

        // Can't do this without bodyParser
        const owner = req.body.owner;
        const content = req.body.content;

        console.log(`Post Message`);
        console.log(`Owner: ${owner}`);
        console.log(`Content: ${content}`);

        await createMessage(owner, content);

        res.json({ message: `Post message` });
    });
    ```
3. Define `message.controller.mjs` to do the job behind `MessageRouter`:
    ```js
    import { readFile, writeFile } from 'fs/promises';

    export const getOneMessage = async (id) => {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);

        return messages[id];
    }

    export const getMessage = async () => {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);

        return messages;
    }

    export const createMessage = async (owner, content) => {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);

        const id = Math.floor(Math.random() * 999);

        messages[id] = { id, owner, content };

        await writeFile('messages.json', JSON.stringify(messages));
    }
    ```
4. Create a simple frontend to demonstrate the API (TODO)

## Part 2: Implement User Module and work with MongoDB

## Part 3: Add Sign Up and Login feature

Look into `jwt`, `accessToken`,...

## Part 4: Implement Frontend for users to interact

## Part 5: Implement `socket.io` for real-time messaging
