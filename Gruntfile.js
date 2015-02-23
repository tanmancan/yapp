module.exports = function(grunt) {
	'use strict';

	// Plugins
	require('load-grunt-tasks')(grunt);

	// Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
	    	all: ['Gruntfile.js', 'js/yapp.js']
		},
		uglify: {
			options: {
				mangle: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %>\n' +
        				'The MIT License (MIT)\n' +
        				'Copyright (c) 2015 Tanveer Karim\n' +
						'http://www.tkarimdesign.com/\n' +
						'*/\n'
			},
			dist: {
		      files: {
		        'js/yapp.min.js': ['js/yapp.js']
		      }
		    }
		}
	});

	// Task(s)
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['uglify']);

};