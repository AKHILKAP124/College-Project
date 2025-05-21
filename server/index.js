import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app, server} from './socket/index.js'

dotenv.config();
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};


const port = process.env.PORT || 3000;

server.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});


// Middleware
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// routes

import userRoutes from './routes/UserRoutes.js';
import taskRoutes from './routes/TaskRoutes.js';
import memberRoutes from './routes/MemberRoute.js';
import projectRouter from './routes/ProjectRoutes.js';
import projectTaskRouter from './routes/ProjectTaskRoutes.js';

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/project', projectRouter);
app.use('/api/projecttask', projectTaskRouter);


