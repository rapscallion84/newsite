# NewSite

## Running the site locally
Open terminal and run the following command: `gulp`

This will run through a list of tasks to build the site and then launch it using browser-sync.

## Gulp tasks
The following is a list of all the gulp tasks with a brief description of what they do.

### clean
This deletes the `dist` folder from the local directory so that the site is built from scratch.

### images
This copies all of the files from `src/lib/img` to `dist/lib/img`.

### styles
This does the following, in this order:
1. Compiles scss into css
2. Concatenates all of the css files into one big file called `main.css` which is also uglified (whitespace removed to reduce file size)
3. Replaces all mentions of `/src` with an empty path - this is because the path urls are different between development and production environments
4. Copies the `main.css` file to `dest/lib/css`

### scripts
This does the following, in this order:
1. Concatenates all of the js files into one big file called `main.js`
2. Uglifies the JavaScript, i.e. removes all whitespace to reduce the file size
3. Copies the `main.js` file to `dest/lib/js`

### common
Copies any common assets to `dist/common`.

### pages
Renders nunjucks partial views (there are currently none in this project) and then copies all html files to the root of the `dist` directory.

### build
First runs the `clean` task, then runs through the `images`, `styles`, `scripts`, `common` and `pages` tasks asynchronously.

### watch
Launches browser-sync and observes the `src` directory for file changes, refreshing the browser when a change is detected.

### default
This is the task that is run when `gulp` command is executed, it first runs `build` and then `watch`