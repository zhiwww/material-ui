"use strict";

var gulp        = require("gulp");
var del         = require("del");
var webpack     = require("webpack");
var browserSync = require("browser-sync").create();
var runSequence = require("run-sequence");
var $           = require("gulp-load-plugins")();

var dest = "./build";

gulp.task("clean", del.bind(null, [dest], {dot: true}));

gulp.task("static", function() {
  gulp
  .src(["./src/static/**/*", "./src/index.html"])
  .pipe($.changed(dest))
  .pipe(gulp.dest(dest));
});

gulp.task("bundle", function(cb) {
  var started = false;
  var config = require("./webpack.config");
  var bundler = webpack(config);

  var bundle = function(err, stats) {
    if(err) {
      $.util.PluginError("webpack", err);
    }

    $.util.log("[webpack]", stats.toString({colors: true}));

    if (!started) {
      started = true;
      return cb();
    }
  };

  bundler.run(bundle);
});

gulp.task("build", function(cb) {
  runSequence(
    ["static", "bundle"],
    "size",
    function() {
      cb();
    }
  );
});

gulp.task("refresh", function() {
  browserSync.reload();
});

gulp.task("size", function(cb) {
  var p = gulp
  .src([dest + "/**/*", "!" + dest + "**/*.map"])
  .pipe($.size({gzip: false, title: "origin size"}))
  .pipe($.size({gzip: true, title: "final size"}))
  .pipe(gulp.dest("./temp"));

  p.on("end", function() {
    del("./temp", {dot: true});
    cb();
  });

});

gulp.task("serve", ["build"], function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

    gulp.watch(["../lib/**/*.js", "../lib/**/*.css", "./src/**/*"], function() {
      runSequence("build", "refresh", function() {
      });
    });
});

gulp.task("default", ["serve"]);
