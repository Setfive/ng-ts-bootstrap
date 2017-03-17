## Setup

First, blow away any old installed gulps:

```
sudo npm rm --global gulp-cli
sudo npm rm --global gulp
```

Then install gulp-cli latest:
```
sudo install rm --global gulp-cli
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

