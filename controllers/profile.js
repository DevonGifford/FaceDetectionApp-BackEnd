const handleProfile = (db) => (req, res) => {
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
}


export default handleProfile; 

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