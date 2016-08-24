var gulp = require('gulp');
var browserSync = require('browser-sync');
var proxy = require('proxy-middleware');
var url = require('url');
var paths = require('../paths');
gulp.task('serve', ['build' ], function(done) {

  var proxyOptionsAccessControl = function(req,res, next){
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
  };
  var proxyOptionsApiRoute = url.parse('http://localhost:' + paths.nodeJsPort +  '/api') ;
  proxyOptionsApiRoute.route = '/api';

  var proxyOptionsAuthRoute = url.parse('http://localhost:' + paths.nodeJsPort +  '/auth') ;
  proxyOptionsAuthRoute.route = '/auth';

  browserSync({
    open: false,
    port: paths.webServerPort,
    server: {
      baseDir: ['.'],
      middleware: [
        proxyOptionsAccessControl,
        proxy(proxyOptionsApiRoute),
        proxy(proxyOptionsAuthRoute)]
    }
  }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-bundle', ['bundle'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-export', ['export'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['./export'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});
