var gulp = require('gulp'),
    zip = require('gulp-zip');
    bump = require('gulp-bump'),
    FormData = require('form-data'),
    fs = require('fs'),
    http = require('http'),
    // decompress = require('gulp-decompress'),
    // log = require('fancy-log'),
    // combiner = require('stream-combiner2'),
    // filesExist = require('files-exist'),
    // sizeOf = require('image-size'),
    // color = require('gulp-color'),
    // scan = require('gulp-scan'),
    // splitLines = require('split-lines'),
    // loadJsonFile = require('load-json-file'),
    // _ = require('underscore'),
    // path = require('path'),
    // clean = require('gulp-clean'),
    config = require('./config.js');


  gulp.task('bumpWidgetVersion', function() {
    return gulp.src('src/manifest.json', { base: './'})
     .pipe(bump())
     .pipe(gulp.dest('./'));
  });

  gulp.task('zipWidget', function() {
    return gulp.src('src/**')
      .pipe(zip('widget.zip'))
      .pipe(gulp.dest('./'));
  });

  gulp.task('uploadWidget', function(cb) {
    var widget_form = new FormData();
    widget_form.append('secret', config.WIDGET.secret_key);
    widget_form.append('widget', config.WIDGET.widget_code);
    widget_form.append('amouser',  config.ACCOUNT.amouser);
    widget_form.append('amohash', config.ACCOUNT.amohash);
    widget_form.append('widget', fs.createReadStream('widget.zip'));
    widget_form.submit('https://widgets.amocrm.ru/' + config.ACCOUNT.subdomain + '/upload', function(err, res) {
      console.log(res);
      cb();
    });
  });


gulp.task('default',
  gulp.series
  (
    'bumpWidgetVersion',
    'zipWidget',
    'uploadWidget'
  )
);
