/**
 - Compile LESS files to CSS, combine, minify (in production)
 - Compiles LESS to CSS, leave unminified (in dev)
 - Transpile TypeScript to ES5 via Browserify
 - Combine and minify ES5 for prod via Browserify
 - Compile Angular templates to JavaScript
 */

const _ = require("lodash");
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const development = plugins.environments.development;
const production = plugins.environments.production;

const config = {

  index: "./src/index.html",

  dest: "./web/",

  vendorAssets: [
    {
      src: "bootstrap/dist",
      dest: "bootstrap",
      styles: ["css/bootstrap.min.css"],
      js: []
    }
  ]
};

function filterVendors(paths, file){
  return _.find(paths, p => {
    const re = new RegExp(p + "$");
    return re.test(file.path);
  });
}

// styles.pipe(plugins.debug());
// // .pipe(plugins.debug())
gulp.task('default', function(done) {

  const copiedVendorAssets = config.vendorAssets.map(f => {
    const filterStyles = plugins.filter(fn => filterVendors(f.styles, fn));
    const filterJS = plugins.filter(fn => filterVendors(f.js, fn));

    const copiedFiles = gulp.src("node_modules/" + f.src + '/**/*')
                            .pipe(gulp.dest('web/vendors/' + f.dest));

    return plugins.merge(copiedFiles.pipe(filterStyles), copiedFiles.pipe(filterJS));
  });

  const mergedAssets = plugins.merge.apply(null, copiedVendorAssets);
  const index = gulp.src(config.index);

  index
    .pipe( plugins.inject(mergedAssets, {ignorePath: "/web"}) )
    .pipe( gulp.dest(config.dest) );

  done();
});