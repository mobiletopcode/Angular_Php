'use strict';

import gulp     from 'gulp';
import webpackStream  from 'webpack-stream';
import webpack from 'webpack';
import path     from 'path';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import yargs    from 'yargs';
import gutil    from 'gulp-util';
import WebpackDevServer from "webpack-dev-server";
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

let root = 'client';

// helper method for resolving paths
let resolveToApp = (glob) => {
  glob = glob || '';
  return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob) => {
  glob = glob || '';
  return path.join(root, 'app/components', glob); // app/components/{glob}
};

// map of all paths
let paths = {
  js: [resolveToComponents('**/*!(.spec.js).js'), resolveToApp('common/**/*!(.spec.js).js')], // exclude spec files
  styl: resolveToApp('**/*.styl'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: path.join(root, 'app/app.js'),
  output: path.join(root, 'assets'),
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**')
};

// use webpack.config.js to build modules
gulp.task('webpack', () => {
  return gulp.src(paths.entry)
    .pipe(webpackStream(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
});

gulp.task('component', () => {
  let cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  let name = yargs.argv.name;
  let parentPath = yargs.argv.parent || '';
  let destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task("webpack-dev-server", function(callback) {
  // Start a webpack-dev-server
  var wpc = require('./webpack.config');

  wpc.plugins.push(new BrowserSyncPlugin(
      {
          host: 'localhost',
          port: 3000,
          proxy: 'http://localhost:3100/'
      },
      {
          reload: true
      }
  ));
  wpc.plugins.push(new webpack.HotModuleReplacementPlugin());

  var compiler = webpack(wpc);

  new WebpackDevServer(compiler, {
    contentBase: root,
    // hot: true,

    quiet: true,
    noInfo: true,
    publicPath: '/assets/'

    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 1000
    // },

    // server and middleware options
  }).listen(3100, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:3100");

    // keep the server alive or continue?
    // callback();
  });
});

gulp.task('default', ['webpack-dev-server']);