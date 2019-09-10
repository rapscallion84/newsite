var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var nunjucksRender = require('gulp-nunjucks-render');
var uglify = require('gulp-uglify');
var browser = require('browser-sync').create();

// Clean: Delete the dist folder at the start of each build
gulp.task('clean', function () {
  return del(['dist']);
});

// Images: Copy images to the dist folder
gulp.task('images', function () {
  return gulp.src('src/lib/img/**/*')
    .pipe(gulp.dest('dist/lib/img/'))
    .pipe(browser.stream());
});

// Styles: Compile SASS into CSS in dist/lib/css
gulp.task('styles', function () {
  return gulp.src('src/lib/scss/**/*')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(concat('main.css'))
    .pipe(replace('/src', ''))
    .pipe(gulp.dest('dist/lib/css'))
    .pipe(browser.stream());
});

// Scripts:
gulp.task('scripts', function () {
  return gulp.src('src/lib/js/**/*')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest("dist/lib/js"))
    .pipe(browser.stream());
});

// Common: Copy common pages into dist/common
gulp.task('common', function () {
  return gulp.src('src/common/**/*')
    .pipe(gulp.dest('dist/common'))
    .pipe(browser.stream());
});

// Pages: Copy all HTML pages into dist
gulp.task('pages', function () {
  return gulp.src('src/pages/**/*')
    .pipe(nunjucksRender({
      path: ['src/pages']
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browser.stream());
});

// Build: Clean the dist folder and then runs all build tasks
gulp.task('build',
  gulp.series('clean',
    gulp.parallel('images', 'styles', 'scripts', 'common', 'pages'))
);

// Watch:
gulp.task('watch', function () {
  // Start browser-sync
  browser.init({
    logLevel: 'debug',
    open: true,
    browser: 'google chrome',
    server: {
      baseDir: "./dist/"
    }
  });

  // Watch folders
  gulp.watch('src/lib/img/**/*', gulp.series('images'));
  gulp.watch('src/lib/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('src/lib/js/**/*.js', gulp.series('scripts'));
  gulp.watch('src/common/**/*.html', gulp.series('common'));
  gulp.watch('src/pages/**/*.html', gulp.series('pages'));
  gulp.watch('gulpfile.js', gulp.series('build'));
});

// Default: Run the build task then initiate watch
gulp.task('default',
  gulp.series('build', 'watch')
);

gulp.task('prod',
  gulp.series('build')
);