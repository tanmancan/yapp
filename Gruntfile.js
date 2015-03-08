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
						'https://github.com/tanmancan/yapp\n' +
						'*/\n'
			},
			dist: {
		      files: {
		        'js/yapp.min.js': ['js/yapp.js']
		      }
		    }
		},
		//Compile SASS
        sass: {
            dist: {
                options: { 
                    outputStyle: 'compressed',
                    sourceMap: false
                },
                files: { 
                    'demo/demo.css': 'demo/demo.scss'
                }
            }
        },
		// Watch
        watch: {
	        sass: {
	            files: ['demo/*.scss'],
	            tasks: ['sass:dist']
	        },
            other: {
                files: ['*.html', 'js/*.js']
            },
            // Live reload on file changes
            options: { 
                livereload: true 
            }
        },
	});

	// Task(s)
    grunt.registerTask('dev', ['watch']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['uglify']);

};