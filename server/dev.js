const path = require('path');
const Bundler = require('parcel-bundler');
const app = require('.');
const entry = 'client/index.html';
const bundle = new Bundler(entry);
const port = process.env.PORT;

app.use(bundle.middleware());

app.listen(port, (error) => {
	if (error) throw error;
	console.log(`Express server started on port ${port}.`);
});
