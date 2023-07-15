import * as http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors';
import knex from 'knex';

import register from './controllers/register.js';
import signin from './controllers/signin.js';
import profile from './controllers/profile.js';
import image from './controllers/image.js';

// Importing PostgreSQL database 
const db = knex({
	client: 'pg', 	//PostgreSQL 
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false},		
		host : process.env.DATABASE_HOST,
		port: 5432,	
		user : process.env.DATABASE_USER,
		password : process.env.DATABASE_PW,
		database : process.env.DATABASE_DB
	}
  });

// for testing purposes - checking if connection is made to with knex and postgres 
// console.log(db.select('*').from('users'));
//   db.select('*').from('users').then(data => {
// 	console.log(data);
//   });  

const app = express();
app.use(bodyParser.json());
app.use(
	cors({
		origin: 'https://devon-facedetection-app.onrender.com/',
	})
);


app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})

