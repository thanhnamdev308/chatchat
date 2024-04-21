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
- If there is no `async` and `await`, the `get` will continue executing without waiting for `getMessage()` to finish. Then in the response, you will get the `messages` as `Promise{<pending>}`.
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
4. Create a simple frontend to demonstrate the API
- The fronent will be a simple HTML:
    ```html
    <!-- index.html -->
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ChatChat</title>
        <style>
            .chat-window {
                border: 1px solid #ddd;
                padding: 10px;
                height: 400px;
                overflow-y: scroll;
            }

            .message {
                margin-bottom: 10px;
            }

            .message .owner {
                font-weight: bold;
            }
        </style>
    </head>

    <body>
        <h1>ChatChat Window</h1>
        <div class="chat-window" id="chat-window"></div>
        <br>
        <input type="text" id="name-input" placeholder="Your Name">
        <input type="text" id="message-input" placeholder="Your Message">
        <button id="send-button">Send</button>

        <script>
            // Script to handle API calls...
        </script>
    </body>

    </html>
    ```
- In the script section, use `fetch()` syntax to make API calls:
    ```html
        <script>
            const baseURL = "http://localhost:3000";
            const chatWindow = document.getElementById('chat-window');
            const nameInput = document.getElementById('name-input');
            const messageInput = document.getElementById('message-input');
            const sendButton = document.getElementById('send-button');

            // Function to display a message in the chat window
            function displayMessage(message) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `<span class="owner">${message.owner}:</span> ${message.content}`;
                chatWindow.appendChild(messageElement);

                // Scroll to the bottom of the chat window after adding a message
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }

            // Fetch initial messages on page load
            fetch(`${baseURL}/api/v1/message`)
                .then(response => response.json())
                .then(messages => {
                    const reversedMessages = Object.entries(messages).reverse();
                    for (const [, message] of reversedMessages) {
                        displayMessage(message);
                    }
                });

            // Send message on button click
            sendButton.addEventListener('click', () => {
                const name = nameInput.value.trim();
                const message = messageInput.value.trim();

                if (!message) {
                    return;  // Do nothing if message is empty
                }

                // Simulate sending message to server
                fetch(`${baseURL}/api/v1/message`, {
                    method: 'POST',
                    body: JSON.stringify({ owner: name, content: message })
                })
                    .then(() => {
                        messageInput.value = '';   // Clear message input after sending
                        displayMessage({ owner: name, content: message });
                    });
            });
        </script>
    ```

## Part 2: Implement User Module and work with MongoDB

## Part 3: Add Sign Up and Login feature

Look into `jwt`, `accessToken`,...

## Part 4: Implement Frontend for users to interact

## Part 5: Implement `socket.io` for real-time messaging
