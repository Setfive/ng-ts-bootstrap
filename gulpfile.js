/**
 - Compile LESS files to CSS, combine, minify (in production) - use .pipe(gulpif(condition, uglify()))
 - Compiles LESS to CSS, leave unminified (in dev)
 - Transpile TypeScript to ES5 via Browserify
 - Combine and minify ES5 for prod via Browserify
 - Compile Angular templates to JavaScript
 */

const _ = require("lodash");
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const del = require('del');
const merge2 = require("merge2");
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const inlineAngularTemplates = require('gulp-inline-angular-templates');

const development = plugins.environments.development;
const production = plugins.environments.production;

// .pipe(plugins.debug())

const config = {

  src: "./src",
  index: "./src/index.html",
  appEntry: "./src/app.ts",

  dest: "./web",

  vendorAssets: [
    {
      src: "bootstrap/dist",
      dest: "bootstrap",
      styles: ["css/bootstrap.min.css"],
      js: []
    },
    {
      src: "jquery/dist",
      dest: "jquery",
      styles: [],
      js: ['jquery.min.js']
    }
  ],

  browserifyLibs: [
    "angular",
    "angular-ui-router",
    "angular-translate",
  ]

};

function filterVendors(paths, file){
  return _.find(paths, p => {
    const re = new RegExp(p + "$");
    return re.test(file.path);
  });
}

gulp.task('less', function(done) {
  return gulp
    .src(config.src + "/**/*.less")
    .pipe(plugins.less())
    .pipe(plugins.rename(function(path) {
      path.basename = path.dirname.toLowerCase() + "_" + path.basename;
    }))
    .pipe(plugins.flatten())
    .pipe(gulp.dest(config.dest + '/css'));
});

gulp.task('clean', function(done) {
  return del([config.dest + "/**/*"]);
});

gulp.task('vendors', function(done) {
  const copiedVendorAssets = config.vendorAssets.map(f => {
    const filterStyles = plugins.filter(fn => filterVendors(f.styles, fn));
    const filterJS = plugins.filter(fn => filterVendors(f.js, fn));

    const copiedFiles = gulp.src("node_modules/" + f.src + '/**/*')
                            .pipe(gulp.dest(config.dest + '/vendors/' + f.dest));

    return [copiedFiles.pipe(filterStyles), copiedFiles.pipe(filterJS)];
  });

  return merge2(_.flatten(copiedVendorAssets));
});

gulp.task('js-libs', function () {
  const b = browserify({ debug: true });

  config.browserifyLibs.forEach(function(lib) {
    b.require(lib);
  });

  return b.bundle()
          .on('error', console.error)
          .pipe(source('./libs.js'))
          .pipe(buffer())
          .pipe(plugins.uglify())
          .pipe(plugins.rename("libs.js"))
          .pipe(gulp.dest(config.dest + '/js'))
    ;
});

gulp.task('ts', function(done) {
  var b = browserify({
    entries: config.appEntry,
    debug: true,
  });

  config.browserifyLibs.forEach(function(lib) {
    b.external(lib);
  });

  return b.plugin('tsify', {target: 'es6'})
          .bundle()
          .on('error', console.error)
          .pipe(source("./app.ts"))
          .pipe(buffer())
          .pipe(plugins.rename("app.js"))
          .pipe(gulp.dest(config.dest + '/js'));
});

gulp.task("assets", function(){
  return gulp.src( config.src + "/public/**/*" )
             .pipe( gulp.dest(config.dest + "/") )
});

gulp.task('index', function(done) {
  const copiedVendorAssets = config.vendorAssets.map(f => {
    const filterStyles = plugins.filter(fn => filterVendors(f.styles, fn));
    const filterJS = plugins.filter(fn => filterVendors(f.js, fn));
    const vendorFiles = gulp.src(config.dest + '/vendors/' + f.dest + "/**/*");
    return [vendorFiles.pipe(filterStyles), vendorFiles.pipe(filterJS)];
  });

  const jsFiles = gulp
                    .src(config.dest + '/js/**/*')
                    .pipe(plugins.order([
                      'libs.js',
                      'templates.js',
                      'app.js',
                    ]))
    ;

  const mergedAssets = merge2(_.flatten(copiedVendorAssets), gulp.src(config.dest + '/css/**/*'), jsFiles);

  return gulp.src(config.index)
             .pipe( plugins.inject(mergedAssets, {ignorePath: ["/web"]}) )
             .pipe( gulp.dest(config.dest + "/") )
  ;

});

gulp.task('templates', gulp.series("index", function(done) {
  return gulp
    .src([config.src + "/**/*.html", '!' + config.index])
    .pipe(inlineAngularTemplates(config.dest + "/index.html", {base: "src/"}))
    .pipe(gulp.dest(config.dest + "/"));
}));

gulp.task("watch", function(done){
  gulp.watch(config.src + "/**/*.ts", gulp.series("ts"));
  gulp.watch(config.src + "/**/*.less", gulp.series("less"));
  gulp.watch(config.src + "/**/*.tpl", gulp.series("index", "templates"));

  return new Promise(function (resolve, reject) {

  });
});

gulp.task('default', gulp.series('clean', 'vendors', 'less', 'js-libs', 'ts', 'assets', 'index', 'templates'));