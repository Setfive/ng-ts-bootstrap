## Setup

First, blow away any old installed gulps:

```
sudo npm rm --global gulp-cli
sudo npm rm --global gulp
```

Then install gulp-cli latest:
```
sudo npm install --global gulp-cli
```

And finally install the local dependencies:
```
npm install
```

Assuming everything worked, you can build everything by running:
```
gulp
```

The web/ folder will become the web root so you'll need something to serve assets.

PHP or Python's built in webservers both work:
```
php -S localhost:8000

```

```
python -mSimpleHTTPServer
```

## Some things of note...

To add a JavaScript library to the project you need to do the following:

* Run an "npm install --save" to grab it and add it to package.json
* In the gulpfile.js update config.browserifyLibs to include the new package name, this will add it as a Browserify library
* In app.ts add an "import" to bring it into scope
* If no Typescript typings are available for the library, you can create the object as an "any" type to avoid the tsc compiler complaining

Adding a new Angular module is fairly easy too! Just do the following,
 
* Create a new folder under src/ for the module
* Create the source file, say main.ts, and create an exported default class - "export default class DashboardModule {"
* Add a static configure() method in that class to do the Angular configurations
* Now, import that class in app.ts, call it's static configure method, and add an Angular dependency on the module.