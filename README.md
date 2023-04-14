# Face Detection App


## In-progress:

Current plan of attack is as follows:

* route/home rout -->  GET request (data)
-->  response :this is working 

* sign-in route  -->  POST request (JSON) 
-->  response:success  or  if failure = register route

* register route-->  POST request (database)
-->  response:user object

* profile/(userID)-->  GET request (user)	
-->  response:user information

* Ranking	-->  PUT request (user data)
-->  update :user object (count)


## To run this app

1. Clone this repo
2. Run `npm install`
3. Run `npm start`


## note
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.
You may also see any lint errors in the console.

This app uses cors to run on your local host server

Find the front end of this app @ https://github.com/DevonGifford/FaceDetectionApp-Frontend/blob/main/README.md

## futher ...
This applet is using an outdated package of bcrypt, specifically bcrypt-nodejs
The reason for this is that this project is merely a showcase app for my portfolio.
For simplicity, deployment& showcasing reasons I want the hashing of passwords to work no matter the users system (macOS or Windows).

In future renditons I will update the package to a up to date package of bcrypt...
