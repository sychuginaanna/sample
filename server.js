let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');
let path = require('path');

let technolibs = require('technolibs');

app.use('/', express.static('public'));
technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

/*app.post('/api/messages', (req, res) => {
	technolibs.publish(req.body).then(body => res.json(req.body));
});
*/

let listofemails = {};

app.post('/users', (req, res, body) => {

	let email = req.body.email;

	if (email in listofemails ) {
		listofemails[email]++;

	}
	else {
		listofemails [email] = 0;

	}

	res.send( { number : listofemails [email] });
	console.log( { number : listofemails[email] })
// TODO: вернуть количество обращений
});

app.get('/api/messages', function (req, res) {
	res.send([
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message'))
	])
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
