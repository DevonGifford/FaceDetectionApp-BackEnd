import * as http from 'http';
import express from 'express';
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors';
import knex from 'knex';

const db = knex({
	// My PostgreSQL database 
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

// app.use(bodyParser.json()); 		shouldn't have to use this anymore 
app.use(express.json());
app.use(cors());

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


app.get('/', (req, res) =>{
	res.send(test_database.users);
})


app.post('/signin', (req, res) => {
if (req.body.email === test_database.users[0].email && 
	req.body.password === test_database.users[0].password) {
	res.json('sign in success');
}else {
	res.status(400).json('error logging in');
}
})
	
app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	//linking PostgreSQL database here
	db('users')
		.returning('*')
		.insert({
			email: email,
			name: name, 
			joined: new Date()
			//not using our hash here
			//not using entries count here - default is already 0 
	}).then(user => {
		res.json(user[0]);
	}).catch(err =>
		res.status(400).json('unable to register')) //removing err - leaking database information 

	bcrypt.hash("bacon", null, null, function(err, hash) {
		console.log(hash);
	});

	// commenting out local test_database 
	// test_database.users.push({
	// 	id: '987',
	// 	name: name,
	// 	email: email,
	// 	password: password,
	// 	entries: 0,
	// 	joined: new Date()
	// })
	// res.json(test_database.users[test_database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({
		id: id
	})
	.then(user => {
		//console.log(user)
		if (user.length) {
			res.json(user[0]);		
		} else {
			res.status(400).json('Not found')
		}
	})
	.catch(err => res.status(400).json('Error getting user - no users found with those credentials '))
})
// commenting out local test_database 
//let foundUser = false;  we don't need the found anymore
// test_database.users.forEach(user => {
// 	if (user.id === id) {
// 		foundUser = true;
// 		return res.json(user);	
// 	}
// })
// if (!foundUser) {
// 	res.status(400).json('no user found');
// }

app.put('/image', (req, res)=> {
	const { id, entries } = req.body;
	db.select('*').from('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		//console.log(entries)
		res.json(entries[0].entries);
	})
})
//commenting out local test_database
// let foundUser = false; 
// test_database.users.forEach(user => {
// 	if (user.id === id) {
// 		foundUser = true;
// 		user.entries++
// 		return res.json(user.entries);	
// 	}
// })
// if (!foundUser) {
// 	res.status(400).json('no user found - thus error');
// }






app.listen(3000, ()=> {
	console.log('dev test- app is running on port 3000');
})

	
	


/* 
planning API - what will our design look like

✔route/home rout 	-->  GET request 	(data)			-->  response 	:  this is working ✔
✔sign-in route  	-->  POST request 	(JSON) 			-->  response 	:  success  or  if failure = register route
✔register route		-->  POST request 	(database)		-->  response 	:  user object
✔profile/(userID)	-->  GET request 	(user)			-->  response 	:  user information
✔Ranking				-->  PUT request 	(user data)		-->  update 	:  user object (count)

for quick use:  link to:  https://www.npmjs.com/package/bcrypt-nodejs?activeTab=readme

bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});



*/