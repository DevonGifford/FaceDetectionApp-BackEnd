import * as http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.get('/', (req, res) =>{
	res.send('testing if server is working');
})

app.listen(3000, ()=> {
	console.log('dev test- app is running on port 3000');
})





/* 
planning API - what will our design look like

route/home rout 	-->  GET request 	(data)			-->  response 	:  this is working 
sign-in route  		-->  POST request 	(JSON) 			-->  response 	:  success  or  if failure = register route
register route		-->  POST request 	(database)		-->  response 	:  user object
profile/(userID)	-->  GET request 	(user)			-->  response 	:  user information
Ranking				-->  PUT request 	(user data)		-->  update 	:  user object (count)

*/