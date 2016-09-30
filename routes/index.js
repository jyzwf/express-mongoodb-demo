module.exports = function(app){
	require('./login')(app);
	require('./home')(app);
	require('./logout')(app);
	require('./cart')(app);
	require('./register')(app);
}