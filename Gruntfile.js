module.exports = function(grunt) {
	var auth = grunt.file.readJSON('screeps-auth.json');
	grunt.loadNpmTasks('grunt-screeps');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: ".jshintrc",
			},
			dist: {
				src: ['dist/*.js']
			}
		},
		screeps: {
			options: {
				branch: 'UpgradeMain',
				email: auth.email,
				password: auth.password,
			},
			dist: {
				src: ['dist/*.js']
			}
		},
	});

	grunt.registerTask('default', ['jshint', 'screeps']);
}