import * as http from 'http';
import express from 'express';
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import handleImage from './controllers/image.js';

// Importing PostgreSQL database 
const db = knex({
	client: 'pg', 	//PostgreSQL 
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : 'dev',
	  database : 'users_data'
	}
  });

// for testing purposes - checking if connection is made to with knex and postgres 
// console.log(db.select('*').from('users'));
  db.select('*').from('users').then(data => {
	console.log(data);
  });  

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) =>{ res.send('success'); })

app.post('/register', handleRegister(db, bcrypt))

app.post('/signin', handleSignin(db, bcrypt))

app.get('/profile/:id', handleProfile(db))

app.put('/image', handleImage(db))



app.listen(3000, ()=> {
	console.log('dev test- app is running on port 3000');
})

	
	
//old database - need to delete this.  
// const test_database = {
// 	users: [
// 		{
// 			id : '123',
// 			name : 'Lisa',
// 			email : 'Lisa@gmail.com',
// 			password : 'Lisa123',
// 			entries : 0,
// 			joined : new Date()
// 		},
// 		{
// 			id : '321',
// 			name : 'Jack',
// 			email : 'Jack@gmail.com',
// 			password : 'Jack123',
// 			entries : 0,
// 			joined : new Date()
// 		}
// 	], login: [
// 		{
// 			id: '987',
// 			hash: '',
// 			email: 'Lisa@gmail.com'

// 		}
// 	]
// }

/* 
planning API - what will our design look like

✔route/home rout 	-->  GET request 	(data)			-->  response 	:  this is working ✔
✔sign-in route  	-->  POST request 	(JSON) 			-->  response 	:  success  or  if failure = register route
✔register route		-->  POST request 	(database)		-->  response 	:  user object
✔profile/(userID)	-->  GET request 	(user)			-->  response 	:  user information
✔Ranking				-->  PUT request 	(user data)		-->  update 	:  user object (count)


*/