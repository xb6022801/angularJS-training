'use strict'

var gulp = require('gulp'),
    rimraf = require('rimraf'),
    runsequence = require('run-sequence'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    processhtml = require('gulp-processhtml'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel')

var devDeployFolder = './build',
    timestamp = new Date().getTime(),
    jsResource,
    cssResource

var scssFiles = [
  'client/statics/style/*.scss',
  'client/app/**/*.scss',

]

var libJsFile = [
  'client/bower_components/angular/angular.min.js',
  'client/bower_components/angular-cookies/angular-cookies.min.js',
  'client/bower_components/angular-ui-router/release/angular-ui-router.min.js'
]    

var devJsFile = [
  'client/app/bxu1.module.js',
  'client/app/app.constant.js',
  'client/app/filters/*.js',
  'client/app/services/*.js',
  'client/app/bxu1.route.js',
  'client/app/components/**/*.js',
  'client/app/directives/*.js',
  'client/app/pages/**/*.js',
  // 'client/app/bxu1.route.js',
]

var pageHtmls = [
  'client/app/pages/**/*.html'
]

var componentHtmls = [
  'client/app/components/**/*.html'
]

gulp.task('clean', function(cb) {
  rimraf(devDeployFolder + '/*', cb)
})

gulp.task('process-scss', function() {
  gulp.src(scssFiles)
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('c' + timestamp + '.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(devDeployFolder + '/static/css'));
});


gulp.task('process-html', function() {
  gulp.src(pageHtmls)
    .pipe(processhtml({}))
    .pipe(gulp.dest(devDeployFolder + '/app/pages'))

  gulp.src(componentHtmls)
    .pipe(processhtml({}))
    .pipe(gulp.dest(devDeployFolder + '/app/components'))
})

gulp.task('process-js', function() {
  gulp.src(libJsFile, {base: './client'})
    .pipe(gulp.dest(devDeployFolder))

  gulp.src(devJsFile, {base: './client'})
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify({mangle: false}))
    .pipe(concat('j' + timestamp + '.min.js'))
    .pipe(gulp.dest(devDeployFolder + '/static/js'))
})

gulp.task('process-index-js', function() {
  setTimeout(function() {
    jsResource = gulp.src(
      devDeployFolder + '/static/js/j' + timestamp + '.min.js',
      {read: false}
    )
  
    gulp.src('index.html')
      .pipe(inject(jsResource, {ignorePath: 'build/', addRootSlash: false}))
      .pipe(gulp.dest('./'))
      .pipe(processhtml({}))
      .pipe(gulp.dest(devDeployFolder))
  }, 1000)
})

gulp.task('process-index-css', function() {
  setTimeout(function() {
    cssResource = gulp.src(devDeployFolder + '/static/css/c' + timestamp + '.min.css',
      {read: false})
    
    gulp.src('index.html')
      .pipe(inject(cssResource, {ignorePath: 'build/', addRootSlash: false}))
      .pipe(gulp.dest('./'))
      .pipe(processhtml())
      .pipe(gulp.dest(devDeployFolder))
  }, 1500)
})

gulp.task('build', function() {
  runsequence(
    'clean',
    'process-scss',
    'process-js',
    'process-index-css',
    'process-index-js',
    'process-html'
  )
})

gulp.task('watch', function() {
  gulp.watch(devJsFile, ['process-js', 'process-index-js'])
  gulp.watch(pageHtmls, ['process-html'])
  gulp.watch(componentHtmls, ['process-html'])
  gulp.watch(scssFiles, ['process-scss', 'process-index-css'])
})

gulp.task('default', function() {
  runsequence(
    'build',
    'watch'
  )
})
