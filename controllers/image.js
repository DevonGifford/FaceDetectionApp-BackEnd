const handleImage = (db) => (req, res) => {
	const { id, entries } = req.body;
	db.select('*')
    .from('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		//console.log(entries)
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('Error getting entries - unable to get entries'))
};

export default handleImage;

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