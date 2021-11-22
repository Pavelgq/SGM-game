"use strict";

const gulp = require("gulp");
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const minify = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const run = require("run-sequence");
const uglify = require('gulp-uglify');
const pump = require('pump');
const htmlmin = require('gulp-htmlmin');
const csscomb = require('csscomb');
const del = require("del");
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

//Создание файла стилей и минификация
gulp.task("style", function () {
  return gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());

});

// Минификация js
gulp.task("uglify", function () {
  return gulp.src(["src/*.js", "src/**/*.js"])
    .pipe(sourcemaps.init())
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    // .pipe(concat('all.js'))
    // .pipe(uglify())

    // .pipe(rename({
    //   suffix: ".min"
    // }))
    .pipe(gulp.dest("build/src"))
    .pipe(server.stream());
});

// Размещение кода в разметке
gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

// Формирование изображений в формате webp
gulp.task("webp", function () {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({
      quality: 80
    }))
    .pipe(gulp.dest("build/img"));
});


// Создание векторного спрайта
// gulp.task("sprite", function () {
//   return gulp.src("img/**/*.svg")
//     .pipe(svgSprite({
//       mode: {
//         stack: {
//             sprite: "../sprite.svg"  //sprite file name
//         }
//     },
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img/svg"));
// });

gulp.task('sprite', function () {
  return gulp.src("img/**/*.svg")
    // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    // .pipe(cheerio({
    // 	run: function ($) {
    // 		$('[fill]').removeAttr('fill');
    // 		$('[stroke]').removeAttr('stroke');
    // 		$('[style]').removeAttr('style');
    // 	},
    // 	parserOptions: {xmlMode: true}
    // }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg",
        }
      }
    }))
    .pipe(gulp.dest('build/img/svg'));
});

// Сортировка css-свойств
gulp.task("csscomb", function () {
  return gulp.src("less/blocks/*.less")
    .pipe(csscomb())
    .pipe(gulp.dest("less/blocks/"));
});

// Оптимизация изображений
gulp.task("imagemin", function () {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img"));
});

// Запуск сервера со слежением за необходимыми файлами
gulp.task("serve", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch('less/**/*.less', gulp.parallel(["style"]));
  gulp.watch('*.html', gulp.parallel(["html"]));
  gulp.watch('build/src/*.html').on('change', server.reload);
  gulp.watch(['src/*.js', 'src/**/*.js'], gulp.parallel(["uglify"]));

});
// Копирование файлов
gulp.task("copy", function () {
  return gulp.src([
      "fonts/*.{woff,woff2}",
      "img/**",
      "js/*.js",
      "data/*.json"
    ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task('copy-data', function() {
  return gulp.src('./src/data/*.json')
    .pipe(gulp.dest('build/data'));
});


// Удаление файлов
gulp.task("clean", function () {
  return del("build");
});


// Сборка проекта
gulp.task("build", gulp.series(
  "clean",
  "copy",
  "copy-data",
  "style",
  "uglify",
  "sprite",
  "html",
  "webp",
));