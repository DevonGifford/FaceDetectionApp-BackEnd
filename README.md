# Face Detection App


## In-progress:  current plan

planning API 

route/home rout 	-->  GET request 	(data)			-->  response 	:  this is working 
sign-in route  		-->  POST request 	(JSON) 			-->  response 	:  success  or  if failure = register route
register route		-->  POST request 	(database)		-->  response 	:  user object
profile/(userID)	-->  GET request 	(user)			-->  response 	:  user information
Ranking				-->  PUT request 	(user data)		-->  update 	:  user object (count)


## Created using class based components
-
-
-


## To run this app

1. Clone this repo
2. Run `npm install`
3. Run `npm start`
4. You must add your own API key in the src/App.js file to connect to Clarifai.

You can grab Clarifai API key [here](https://www.clarifai.com/)




## note
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.