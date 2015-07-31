'use strict';
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    shell: {
      generateJSON: {
        command: 'jsdoc --configure ./conf.json ./videojs-src > cumulative.json'
      }
    },
    concat: {
        dist: {
            src: ['var-name.txt',
                'cumulative.json',
                'semicolon.txt'
            ],
            dest: 'doc-data-full.js'
        }
    },
    uglify: {
        dist: {
            src: 'doc-data-full.js',
            dest: 'doc-data.js'
        }
    }
 });

    // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.task.registerTask('createFiles', 'Create files into which docs will be injected', function() {
    var classData = [],
        docData = '',
        contentStr = '<!DOCTYPE html> <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <title></title> <script src="//use.edgefonts.net/source-code-pro.js"></script> <link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700" rel="stylesheet" type="text/css"> <!-- there are many other style for highlighted code here: https://cdnjs.com/libraries/highlight.js --> <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/atelier-forest.light.min.css"> <link rel="stylesheet" type="text/css" href="css/api-docs.css"> <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script> </head> <body> <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/highlight.min.js"></script><script src="js/highlight-syntax.js"></script> </body> </html>',
        DOMParser = require('xmldom').DOMParser;
    //read the JSDoc JSON into a variable
    docData = grunt.file.readJSON('cumulative.json');
    // extract the class items from the doc data
    classData = getSubArray(docData, 'kind', 'class');
    // now create the array of filenames
    createFilenameArray(classData);

    /**
     * get a subset of objects in array of objects
     * based on some property value
     *
     * @param {array} targetArray - array to search
     * @param {string} objProperty - object property to search
     * @param {string|number} value - value of the property to search for
     * @return {array} array of objects with matching property value
     */
    function getSubArray(targetArray, objProperty, value) {
      var i, totalItems = targetArray.length,
        idxArr = [];
      for (i = 0; i < totalItems; i++) {
        if (targetArray[i][objProperty] === value) {
          idxArr.push(targetArray[i]);
        }
      }
      return idxArr;
    }
    /**
     * create the HTML files for the classes
     * @param {array} filenameArray - array of the filenames
     */
    function createFiles(filenameArray) {
      var i,
        iMax = filenameArray.length,
        filename,
        fullpath,
        document;
      for (i = 0; i < iMax; i++) {
        filename = filenameArray[i];
        document =  = new DOMParser().parseFromString(contentStr);
        // create file with name=filename and contents=contentStr
        fullpath = './docs/api/' + filename;
        grunt.file.write(fullpath, contentStr);
      }
    }

    function createFilenameArray(classData) {
      var filenameArray = [],
        i,
        iMax = classData.length,
        item,
        str;
      // extract the filenames from the class items
      for (i = 0; i < iMax; i++) {
        item = classData[i];
        str = item.meta.filename;
        str = str.substr(str.lastIndexOf('/') + 1);
        str = str.replace('.js', '.html');
        filenameArray.push(str);
      }
      // videojs is special case
      filenameArray.push('video.html');
      filenameArray = filenameArray.sort();
      console.log('filenameArray', filenameArray);
      // now create the files
      createFiles(filenameArray);
    }
  });
  // Default task.
  grunt.registerTask('default', ['shell', 'concat','uglify','createFiles']);
}