module.exports = function(grunt) {

	var commandOptions = {
		'stdout': true,
		'stderr': true,
		'failOnError': true
	};

	grunt.initConfig({
		'meta': {
			'testFile': 'tests/tests.js'
		},
		'shell': {
			'options': {
				'stdout': true,
				'stderr': true,
				'failOnError': true
			},
			'cover': {
				'command': 'istanbul cover --report "html" --verbose --dir "coverage" "<%= meta.testFile %>"; istanbul report --root "coverage" --format "html"'
			},
			// Rhino 1.7R4 has a bug that makes it impossible to test regenerate.
			// https://bugzilla.mozilla.org/show_bug.cgi?id=775566
			// To test, use Rhino 1.7R3, or wait (heh) for the 1.7R5 release.
			'test-rhino': {
				'command': 'echo "Testing in Rhino..."; rhino -opt -1 "tests.js"',
				'options': {
					'execOptions': {
						'cwd': 'tests'
					}
				}
			},
			'test-ringo': {
				'command': 'echo "Testing in Ringo..."; ringo -o -1 "<%= meta.testFile %>"'
			},
			'test-narwhal': {
				'command': 'echo "Testing in Narwhal..."; export NARWHAL_OPTIMIZATION=-1; narwhal "<%= meta.testFile %>"'
			},
			'test-node': {
				'command': 'echo "Testing in Node..."; node "<%= meta.testFile %>"'
			},
			'test-browser': {
				'command': 'echo "Testing in a browser..."; open "tests/index.html"'
			}
		}
	});

	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('cover', 'shell:cover');
	grunt.registerTask('test', [
		'shell:test-rhino',
		'shell:test-ringo',
		'shell:test-narwhal',
		'shell:test-node',
		'shell:test-browser'
	]);

	grunt.registerTask('default', [
		'shell:test-node',
		'cover'
	]);

};