import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI    //Please insert your own API key here....
});


const handleApiCall = (req, res) => {
    app.models
        .predict('face-detection', req.body.input)
        .then(data => {
            res.json(data);
        })
    .catch(err => res.status(400).json('api is not responding'))
}

const handleImage = (db) => (req, res, db) => {
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
};

