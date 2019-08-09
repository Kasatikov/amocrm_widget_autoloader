var gulp = require('gulp'),
    zip = require('gulp-zip');
    bump = require('gulp-bump'),
    FormData = require('form-data'),
    fs = require('fs'),
    http = require('http'),
    config = require('./config.js');


  gulp.task('bumpWidgetVersion', function() {
    return gulp.src('widget/manifest.json', { base: './'})
     .pipe(bump())
     .pipe(gulp.dest('./'));
  });

  gulp.task('zipWidget', function() {
    return gulp.src('widget/**')
      .pipe(zip('widget.zip'))
      .pipe(gulp.dest('./'));
  });

  gulp.task('uploadWidget', function(cb) {
    var widget_form = new FormData(),
        body = '';
    widget_form.append('secret', config.WIDGET.secret_key);
    widget_form.append('widget', config.WIDGET.widget_code);
    widget_form.append('amouser',  config.ACCOUNT.amouser);
    widget_form.append('amohash', config.ACCOUNT.amohash);
    widget_form.append('widget', fs.createReadStream('widget.zip'));
    widget_form.submit('https://widgets.amocrm.ru/' + config.ACCOUNT.subdomain + '/upload', function(err, response) {
      if (err) return err;
      response.on('data', function (chunk) {
        body += chunk;
      });
      response.on('end', function () {
        if (body.indexOf('{"response":true}')) {
          console.log('Widget successfully uploaded');
        }
      });
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
