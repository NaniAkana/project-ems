import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // Import dotenv

import authrouter from './routes/auth.js';
import employeeRouter from './routes/employee.js';
import departmentRouter from './routes/department.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';
import dashboardRouter from './routes/dashboard.js';
import connectToDatabase from './db/db.js';

// Load environment variables
dotenv.config();

const app = express();

connectToDatabase();

app.use(cors({
    origin: "https://projectfrontend-ems.vercel.app/login",
    credentials: true
}));

app.use(express.json());
app.use(express.static('public/uploads'));
app.use('/api/auth', authrouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
