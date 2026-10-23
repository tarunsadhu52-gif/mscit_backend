import express from 'express';
import cors from 'cors';
import connectDb from './config/db.js';
import router from './route/userRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

// Mount the router properly
app.use(router); 

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.listen(5000, () => {
	console.log('Server is running on port 5000');
});
