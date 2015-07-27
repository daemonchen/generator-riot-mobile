var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var riotify = require('riotify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

var WEB_PORT = 9000;
var APP_DIR = '<%= appPath %>/app';
var DIST_DIR = '<%= appPath %>/dist';

var SCRIPTS_DEST = '<%= appPath %>/dist/js/';
var CSS_DEST = '<%= appPath %>/dist/css/';
var IMAGE_DEST = '<%= appPath %>/dist/img/';

function errorHandler(error) {
    console.log(error.toString());
    // this.emit('end');
}

gulp.task('watch-index', function(cb){
    $.sequence('index', 'reload')(cb)
})
gulp.task('watch-vender-css', function(cb){
    $.sequence('vender-css', 'reload')(cb)
})
gulp.task('watch-css', function(cb){
    $.sequence('css', 'reload')(cb)
})
gulp.task('watch-lib-js', function(cb){
    $.sequence('lib-js', 'reload')(cb)
})
gulp.task('watch-browserify', function(cb){
    $.sequence('browserify', 'reload')(cb)
})

gulp.task('watch', function() {
    gulp.watch('<%= appPath %>/app/index.html', ['watch-index']);
    gulp.watch('<%= appPath %>/bower_components/**/*.css', ['watch-vender-css']);
    gulp.watch('<%= appPath %>/app/css/*.css', ['watch-css']);
    gulp.watch('<%= appPath %>/app/js/lib/*.js', ['watch-lib-js']);
    gulp.watch(['<%= appPath %>/app/**/*.js', '<%= appPath %>/app/js/**/*.tag'], ['watch-browserify']);
});

gulp.task('clean', function() {
    return gulp.src(['<%= appPath %>/dist'], {
            read: false
        })
        .pipe($.clean());
});

gulp.task('index', function(){
    return gulp.src('<%= appPath %>/app/index.html')
        .pipe($.minifyHtml())
        .pipe(gulp.dest(DIST_DIR));
})

gulp.task('vender-css', function(){
    return gulp.src(['<%= appPath %>/bower_components/animate.css/animate.min.css'])
        .pipe($.concat('vendor.css'))
        .pipe(gulp.dest(CSS_DEST))
        .pipe($.minifyCss())
        .pipe($.rename('vendor.min.css'))
        .pipe(gulp.dest(CSS_DEST));
})

gulp.task('css', function(){
    return gulp.src('<%= appPath %>/app/css/*.css')
        .pipe($.concat('style.css'))
        .pipe(gulp.dest(CSS_DEST))
        .pipe($.minifyCss())
        .pipe($.rename('style.min.css'))
        .pipe(gulp.dest(CSS_DEST));
})

gulp.task('lib-js', function(){
    return gulp.src('<%= appPath %>/app/js/lib/*.js')
        .pipe($.concat('lib.js'))
        .pipe(gulp.dest(SCRIPTS_DEST))
        .pipe($.uglify())
        .pipe($.rename('lib.min.js'))
        .pipe(gulp.dest(SCRIPTS_DEST));
})

gulp.task('reload', function(){
    return gulp.src([DIST_DIR]).pipe($.connect.reload())
})

gulp.task('browserify', function(){
    return browserify({
            entries: ['<%= appPath %>/app/js/index.js']
        })
        .transform(riotify) // pass options if you need
        .bundle().on('error', errorHandler)
        .pipe(source('app.js'))
        .pipe(gulp.dest(SCRIPTS_DEST))
        .pipe(buffer())
        .pipe($.uglify()).on('error', errorHandler)
        .pipe($.rename('app.min.js')).on('error', errorHandler)
        .pipe(gulp.dest(SCRIPTS_DEST));
})

gulp.task('manifest', function() {
    return gulp.src(['<%= appPath %>/dist/**/*'])
        .pipe($.manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'index.manifest',
            exclude: 'index.manifest'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('http-server', function() {
    $.connect.server({
        root: DIST_DIR,
        port: WEB_PORT,
        livereload: true
    });
});

gulp.task('bundle', function(cb){
    $.sequence('clean', ['index', 'vender-css', 'css', 'lib-js', 'browserify'])(cb)
});

gulp.task('dev', function(cb){
     $.sequence('watch', 'bundle', 'http-server')(cb)
});

gulp.task('prod', function(cb){
    $.sequence('bundle','manifest')(cb)
});

gulp.task('default', ['dev']);
