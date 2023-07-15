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

