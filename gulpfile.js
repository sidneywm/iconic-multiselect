const { series, src, dest } = require("gulp");

const babel = require("gulp-babel");
const concat = require("gulp-concat");
const decomment = require("gulp-decomment");
const del = require("del");
const minify = require("gulp-minify");
const plumber = require("gulp-plumber");

function jsBuild(done) {
  return src("./src/multi-select.js")
    .pipe(plumber())
    .pipe(concat("multi-select.js"))
    .pipe(
      babel({
        plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-private-methods"],
        presets: [
          [
            "@babel/env",
            {
              targets: [">= 0.5%", "ie 11"],
            },
          ],
        ],
      })
    )
    .pipe(decomment({ trim: true, safe: true }))
    .pipe(dest("./dist"))
    .pipe(dest("./tmp/"));
}

function jsMin(done) {
  const file = "./tmp/multi-select.js";
  return src(file)
    .pipe(plumber())
    .pipe(minify({ preserveComments: "some" }))
    .pipe(dest("./dist"))
    .pipe(dest("./tmp"));
}

function clean(done) {
  return del("./tmp", { force: true });
}

exports.default = series(jsBuild, jsMin, clean);
