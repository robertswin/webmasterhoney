
// VARS AND CONSTANTS
var gulp      = require('gulp');
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var csscomb = require('gulp-csscomb');
var prefix = require('gulp-autoprefixer');
var htmlbeautify = require('gulp-html-beautify');
var htmlhint = require("gulp-htmlhint");
var menu = require("gulp-menu");

// VARS AND CONSTANTS END



// WATCH AND BROWSER SYNC FUNCTION
gulp.task('default', ['watch'], function(){
	 browserSync({ 
        server: { 
            baseDir: 'app' 
        },
		port: '777',
        notify: false 
    });
});



gulp.task('go', ['saveme','htmlbeautify'], function(){
	menu(this);
});


gulp.task('watch', ['go'], function() {
	gulp.watch('app/css/*.css',['autoprefix'],browserSync.reload);
	gulp.watch('app/css/prefix/*.css',['styles'],browserSync.reload);
	gulp.watch('app/css/*.css', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload); 

});

// save docs
gulp.task('saveme', function(){
	return gulp.src('app/**/*')
	.pipe (gulp.dest('dist'))
	
})

//prefix
gulp.task('autoprefix', function () {
    return gulp.src('app/css/style.css')
        .pipe(prefix({
            browsers: ['> 1%'],
            cascade: false
        }))
		
        .pipe(gulp.dest('app/css/prefix/'));
});

// CSS BEAUTYFY 
		gulp.task('styles', function() {
		return gulp.src('app/css/prefix/style.css')
		.pipe(csscomb())
       	.pipe(gulp.dest('app/css/'));
		});
		// CSS BEAUTYFY END
		
// HTML BEAUTYFY	
		gulp.task('htmlbeautify', function() {
		  var options = ({
			"indent_size": 3,

    "eol": "\n",
    "indent_level": 1,
    "indent_with_tabs": true,
    "preserve_newlines": true,
    "max_preserve_newlines": 1000,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": false
    
    
		  });
		  gulp.src('app/*.html')
			.pipe(htmlbeautify(options))
			.pipe(gulp.dest('app/'))
		menu(this);	
		});
		// HTML BEAUTYFY
				
gulp.task('hint', function() {	
	
	gulp.src("app/*.html")
    .pipe(htmlhint())
	.pipe(htmlhint.failReporter())
	menu(this);
});
		
		