import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '995a8ba49af14bf7be04d5d2a8dda63b'     //Please insert your own API key here....
});
const handleApiCall = (req, res) => {
    app.models
        .predict('face-detection', req.body.input)
        .then(data => {
            res.json(data);
        })
    .catch(err => res.status(400).json('api is not responding'))
}

const handleImage = (db) => (req, res) => {
	const { id } = req.body;
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

export { 
    handleImage, 
    handleApiCall, 
}

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