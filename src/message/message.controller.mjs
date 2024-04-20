// TODO: API handler for Message
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
