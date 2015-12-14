# Video.js Documentation

This repository is the home of the [Video.js Docs](http://docs.videojs.com/)

This repo contains a grunt process that clones the video.js repo and generates the documentation:

* Guides are copied and converted from markdown to html
* Examples are copied
* API docs are generated from the video.js source code comments

**No content is edited here.** If you want to add or make corrections to the content, do that in [https://github.com/videojs/video.js] and then enter an issue here to regenerate the docs. If you want to enhance or fix the doc generation process, fork this repo and send a pull request.

## Information on the grunt process

* Dependencies: in the top level directory, run:
    `npm install`

View the package to see what the dependencies are.

* The plugins are the standard JSDoc plugins EXCEPT **commentsOnly.js**. This creates the files from which the docs are actually built. The plugin has been modified to leave blank lines where actual code exists in the source instead of removing all non-comment lines.
* The **createFiles** task unconditionally overwrites existing files, which is intended.
* The **Gruntfile.js** can be executed by simply using **grunt** at the command line.

## Contributing

This repo contains a grunt process that clones the video.js repo and generates the documentation:

* Guides are copied and converted from markdown to html
* Examples are copied
* API docs are generated from the video.js source code comments

**No content is edited here.** If you want to add or make corrections to the content, do that in [https://github.com/videojs/video.js] and then enter an issue here to regenerate the docs. If you want to enhance or fix the doc generation process, fork this repo and send a pull request.

Pull requests are welcome against the `master` branch. Merges into the `gh-pages` branch, from which the docs are served, will happen periodically.
