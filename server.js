import * as http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


const app = express();
app.use(bodyParser.json());


const test_database = {
	users: [
		{
			id : '123',
			name : 'Lisa',
			email : 'Lisa@gmail.com',
			password : 'Lisa123',
			entries : 0,
			joined : new Date()
		},
		{
			id : '321',
			name : 'Jack',
			email : 'Jack@gmail.com',
			password : 'Jack123',
			entries : 0,
			joined : new Date()
		}
	], login: [
		{
			id: '987',
			hash: '',
			email: 'Lisa@gmail.com'

		}
	]
}


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
	bcrypt.hash(password, saltRounds, function(err, hash) {
		console.log(hash);
		console.log(password);
		// Store hash in your password DB.
	});
	test_database.users.push({
		id: '987',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(test_database.users[test_database.users.length-1]);
})


app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let foundUser = false; 
	test_database.users.forEach(user => {
		if (user.id === id) {
			foundUser = true;
			return res.json(user);	
		}
	})
	if (!foundUser) {
		res.status(400).json('no user found');
	}
})

app.put('/image', (req, res)=> {
	const { id } = req.body;
	let foundUser = false; 
	test_database.users.forEach(user => {
		if (user.id === id) {
			foundUser = true;
			user.entries++
			return res.json(user.entries);	
		}
	})
	if (!foundUser) {
		res.status(400).json('no user found - thus error');
	}
})


// //To Hash a password
// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });



// //To check a password
// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });



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

*/