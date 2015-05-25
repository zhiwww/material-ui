"use strict";

var runSequence = require("run-sequence");
var gulp        = require("gulp");
var del         = require("del");
var $           = require("gulp-load-plugins")();


var src = "./src/";
var lib = "./lib/";

var paths = {
  css: [src + "**/*.css"],
  less: [src + "**/*.less"],
  jsx: [src + "**/*.jsx"],
  js: [src + "**/*.js"],
  statics: [src + "**/*.png", src + "**/*.jpg"]
};

gulp.task("clean", del.bind(null, [lib], {dot: true}));

gulp.task("css", function() {
  gulp
  .src(paths.css)
  .pipe(gulp.dest(lib));
});

gulp.task("less-test", function(cb) {
  gulp
  .src(paths.less.concat(["!" + src + "/less/components/**/*"]))
  .pipe($.less())
  .pipe(gulp.dest("./temp-less"))
  .on("end", function() {
    del("./temp-less");
    cb();
  });
});

gulp.task("less", function() {
  gulp
  .src(paths.less)
  .pipe(gulp.dest(lib));
});

gulp.task("jsx", function() {
  gulp
  .src(paths.jsx)
  .pipe($.react())
  .pipe(gulp.dest(lib));
});

gulp.task("js", function() {
  gulp
  .src(paths.js)
  .pipe(gulp.dest(lib));
});

gulp.task("statics", function() {
  gulp
  .src(paths.statics)
  .pipe(gulp.dest(lib));
});

gulp.task("watch", function() {
  gulp.watch(paths.js, ["js"]);
  gulp.watch(paths.jsx, ["jsx"]);
  gulp.watch(paths.css, ["css"]);
  gulp.watch(paths.less, ["less"]);
  gulp.watch(paths.statics, ["statics"]);
});

gulp.task("build", ["css", "less", "js", "jsx", "statics"], function(callback) {

});
