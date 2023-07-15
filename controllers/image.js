const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '995a8ba49af14bf7be04d5d2a8dda63b'   //Please insert your own API key here....
});


const handleApiCall = (req, res) => {
    app.models.predict('face-detection', req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
  }

const handleImage = (req, res, db) => {
	const { id } = req.body;
    db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		//console.log(entries)
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('Error getting entries - unable to get entries'))
};


module.exports = {
  handleImage,
  handleApiCall,
};