/**
 - Compile LESS files to CSS, combine, minify (in production)
 - Compiles LESS to CSS, leave unminified (in dev)
 - Transpile TypeScript to ES5 via Browserify
 - Combine and minify ES5 for prod via Browserify
 - Compile Angular templates to JavaScript
 */

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const development = plugins.environments.development;
const production = plugins.environments.production;

const config = {
  vendorAssets: [
    {
      src: "bootstrap/dist/css",
      dest: "bootstrap/css",
      styles: ["bootstrap.min.css"],
      js: []
    }
  ]
};

gulp.task('default', function(done) {
  plugins.util.log("It worked!");

  config.vendorAssets.forEach(f => {
    
    gulp.src("node_modules/" + f.src + '/**/*')
        .pipe(plugins.debug())

  })

  done();
});