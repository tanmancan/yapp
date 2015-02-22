module.exports = function(grunt) {
	'use strict';

	// Plugins
	require('load-grunt-tasks')(grunt);

	// Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
	    	all: ['Gruntfile.js', 'js/*.js']
		}

	});

	// Task(s)
	grunt.registerTask('default', ['jshint']);

};