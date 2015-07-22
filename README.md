# Information on the grunt process

* JSDoc needs to be installed (I was using global install)
* In the shell task, the path to the source docs will need to be altered. It is currently set to **./videojs-src**.
* The plugins are the standard JSDoc plugins EXCEPT **commentsOnly.js**. This creates the files from which the docs are actually built. The plugin has been modified to leave blank lines where actual code exists in the source instead of removing all non-comment lines.
* The **createFiles** task unconditionally overwrites existing files, which is intended.
* The **Gruntfile.js** can be executed by simply using **grunt** at the command line. 
