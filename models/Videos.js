'use strict';

var mongoose = require('mongoose');
var request = require('request');

const spawn = require( 'child_process' ).spawn;

var VideosSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true
	},
	title: String,
    order: Number
}, {
    collection: 'videos'
});

const EventEmitter = require('events');
const stopEmitter = new EventEmitter();

VideosSchema.methods.playThis = function(player, player_options, video_url, cb) {
	
	// Play video!
	const playing = spawn( player, [ player_options, video_url ] );
	
	console.log('Starting ' + process.env.PLAYER + ' with ' + ( player_options || 'no options.'));
	
	playing.stdout.on( 'data', data => {
		console.log( `stdout: ${data}` );
	});
	
	playing.stderr.on( 'data', data => {
		//console.log( `stderr: ${data}` );
	});
	
	stopEmitter.on('stopEvent', () => {
		playing.kill('SIGINT');
		console.log('Playback stopped!');
	});
	
	// Close when video finished (I don't want to generates a playlist, understand?)
	playing.on( 'close', code => {
		console.log( `Player finshed playing with code ${code}` );
		//request('http://localhost:3000/api/videos/stop');
		playing.kill('SIGINT');
	});
	
	return cb;
	
};

VideosSchema.methods.stopAll = function(cb) {
	stopEmitter.emit('stopEvent');
	
	return cb;
}


var Videos = mongoose.model('videos', VideosSchema);

var schemas = {
    'Videos': Videos
}

module.exports = schemas;
