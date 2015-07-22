/**
 * @overview Remove everything in a file except JSDoc-style comments. By enabling this plugin, you
 * can document source files that are not valid JavaScript (including source files for other
 * languages).
 * @module plugins/commentsOnly
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 */
'use strict';
exports.handlers = {
    beforeParse: function(e) {
      var code = "//"
      var withoutspaces = e.source.replace(/^ +/gm, '');
        var regex = /\/\*[\s\S]*?\*\/|(^[\s\S]*?$)/gm;
        var replaced = withoutspaces.replace(regex, function(m, group1) {
            if (group1) return code;
            else return m;
        });
      e.source = replaced.replace(/^[ \t]*$\r?\n/gm,code+'\n'); 
    }
};