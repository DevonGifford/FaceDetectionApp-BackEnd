const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json('incorrect form database');
    }
	db.select('email', 'hash')
	  .from('login')
	  .where('email', '=', email)
	  .then(data => {
		const isUser = bcrypt.compareSync(password, data[0].hash);
		if (isUser) {
		  return db.select('*')
		    .from('users')
			.where('email', '=', email)
			.then(user => {
			  res.json(user[0])
			})
			.catch(err => res.status(400).json('Hmm... unable to get user'))
		} else {
		  res.status(400).json('Sorry - wrong credentials')
		}
	  })
	  .catch(err => res.status(400).json('Sorry - wrong credentials'))
  }

export default handleSignin;

//commenting out local test_database
// app.post('/signin', (req, res) => {
// 	db.select('email', 'hash').from('login')
//     .where('email', '=', req.body.email)
//     .then(data => {
//       const isUser = bcrypt.compareSync(req.body.password, data[0].hash);
// 	  console.log(isUser);
//       if (isUser) {
//         return db.select('*').from('users')
// 		.where('email', '=', req.body.email)
// 		.then(user => {
// 			console.log(user);
// 			res.json(user[0])
// 		})
// 		.catch(err => res.status(400).json('unable to get user'))
// 	} else {
// 		res.status(400).json('wrong credentials')
// 	}
//     }).catch(err => res.status(400).json('wrong credentials'))
// })
// commenting out local test_database 
// if (req.body.email === test_database.users[0].email && 
// 	req.body.password === test_database.users[0].password) {
// 	res.json('sign in success');
// }else {
// 	res.status(400).json('error logging in');
// }