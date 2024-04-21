import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import path from 'path';
import { MessageRouter } from './message/message.routes.mjs';

// Declare constants
const app = express();
const port = process.env.PORT || 3000;  // TODO: implement environment variables


// App use statements
app.use(helmet());
app.use(cors());


// Routers
app.use("/api/v1/message", MessageRouter);


// // Middleware for parsing incoming data (optional)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// Define routes (replace with your specific routes)
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Nothing here.');
});


// Serve static files (optional)
// TODO: resolve __dirname error
// app.use(express.static(path.join(__dirname, 'public')));


// Error handling (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


// Start the server and listen on port 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
