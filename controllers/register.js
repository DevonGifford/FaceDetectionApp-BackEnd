const handleRegister = (db, bcrypt) => (req, res) => {
	const { email, name, password } = req.body;
	const hash = bcrypt.hashSync(password);
	//linking PostgreSQL database here, in transaction block
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0].email,
						name: name, 
						joined: new Date()
						//not using our hash here
						//not using entries count here - default is already 0 
					})
					.then(user => {
						res.json(user[0]);
					})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err =>
			res.status(400).json('unable to register')) //removing err - leaking database information 
}

export default handleRegister;


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