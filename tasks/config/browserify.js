/**
 * Browserify files
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [browserify](https://github.com/gruntjs/grunt-browserify)
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-browserify
 */
module.exports = function(grunt) {
  console.log("HEY");
  var version = grunt.file.readJSON('package.json').version;
  console.log("MEH");
  grunt.config.set('browserify', {
    js: {
      src : require('../pipeline').browserifyMainFile,
      dest: '.tmp/public/browserify/debug.' + version + '.js'
    },

  });

  grunt.loadNpmTasks('grunt-browserify');
};