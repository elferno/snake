const {src, dest, series, watch} = require('gulp')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const del = require('del')
const sync = require('browser-sync').create()

function html() {
  return src('src/index.html')
    .pipe(include({prefix: '@@'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(dest('app'))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({overrideBrowserslist:  ['last 2 versions'],cascade: false}))
    //.pipe(csso())
    .pipe(concat('app.css'))
    .pipe(dest('app/css'))
}

function appJS() {
  return src('src/jsx/app.js')
    .pipe(include({prefix: '@@'}))
    //.pipe(uglify())
    .pipe(dest('app/js'))
}

function serve() {
  sync.init({server: './app'})

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
  watch('src/jsx/**.js', series(appJS)).on('change', sync.reload)
}

function clear() {
  return del('app');
}

exports.run = series(clear, html, appJS, scss, serve);
