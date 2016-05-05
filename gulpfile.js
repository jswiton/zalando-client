'use strict';

var gulp = require('gulp'); 

var 	jshint 		= require('gulp-jshint'),
		changed 	= require('gulp-changed'),
		minifyHTML 	= require('gulp-minify-html'),
		autoprefix 	= require('gulp-autoprefixer'),
		minifyCSS 	= require('gulp-minify-css'),
		concat 		= require('gulp-concat'),
		stripDebug 	= require('gulp-strip-debug'),
		uglify 		= require('gulp-uglify'),
		sass 		= require('gulp-sass'),
		watch 		= require('gulp-watch'),
		rimraf 		= require('gulp-rimraf'),
		replace 	= require('gulp-replace'),
		image 		= require('gulp-image'),
		ngmin 		= require('gulp-ngmin'),
		runSequence = require('run-sequence'),
		plugins 	= require('gulp-load-plugins')({ camelize: true }),
		flatten 	= require('gulp-flatten'),
		filter 		= require('gulp-filter'),
		angularFilesort = require('gulp-angular-filesort'),
		inject 		= require('gulp-inject'),
		browserSync = require('browser-sync');
	
var options = {
	sass: {
		errLogToConsole: true,
		outputStyle		: 	'compressed'
	},
	path: {
		fontsSrc				: 	['./src/fonts/**/*.*'],
		fontsDest				: 	'./build/fonts/',
		imagesSrc				: 	['./src/images/*.*'],
		imagesDest				: 	'./build/images/',
		vendorSrc				:	'./src/scripts/vendor/*.js',
		vendorDst				:	'./build/scripts/vendor/',
		frontScriptsSrc			: 	'./src/scripts/scripts.js',
		angularScriptsSrc		: 	['./src/scripts/app.js',
									'./src/scripts/controllers/Controllers.js',
									'./src/scripts/controllers/BrandController.js',
									'./src/scripts/controllers/CategoryController.js',
									'./src/scripts/controllers/ProductDetailController.js',
									'./src/scripts/controllers/ProductsListController.js',
									'./src/scripts/directives/directives.js',
									'./src/scripts/directives/backLink.js',
									'./src/scripts/directives/ngEnter.js',
									'./src/scripts/directives/aDirective.js',
									'./src/scripts/filters/filters.js',
									'./src/scripts/filters/formatZalandoUrl.js',
									'./src/scripts/filters/mapGender.js',
									'./src/scripts/filters/range.js',
									'./src/scripts/services/services.js',
									'./src/scripts/services/filterService.js',
									'./src/scripts/services/zalandoAPIservice.js',
									'!./src/scripts/vendor/*.js'],
		scriptsDest				: 	'./build/scripts/',
		cssSrc					: 	['./src/sass/*.scss', './src/sass/**/*.scss'],
		cssDest					: 	'./build/styles/',
		viewsSrc				:	['./src/*.html', './src/views/**/*.html', './src/views/*.html'],
		viewsDst				:	'./build/views/',
		indexSrc				:	['./src/index.html', './src/.htaccess'],
		buildDst				:	'./build/',
		jQuerySrc				: 	['./src/scripts/jQuery/*.js', './src/scripts/jQuery/**/*.js'],
		jQueryDest				: 	'./build/scripts/jQuery/'
	}
};

gulp.task('js-hint', function() {
  gulp.src(options.path.angularScriptsSrc)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
	.pipe(browserSync.stream());
});

gulp.task('angular-scripts', function() {
  gulp.src(options.path.angularScriptsSrc)
    .pipe(concat('app.min.js'))
	.pipe(ngmin())
    //.pipe(stripDebug())
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(options.path.scriptsDest))
	.pipe(browserSync.stream());
});

gulp.task('front-scripts', function() {
  gulp.src(options.path.frontScriptsSrc)
    .pipe(concat('front.min.js'))
    //.pipe(stripDebug())
    .pipe(uglify())
	.pipe(gulp.dest(options.path.scriptsDest))
	.pipe(browserSync.stream());
});

gulp.task('jQuery-scripts', function() {
  gulp.src(options.path.jQuerySrc)
    .pipe(gulp.dest(options.path.jQueryDest));
});

gulp.task('fonts', function () {
    gulp.src(options.path.fontsSrc)
      .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe(flatten())
      .pipe(gulp.dest(options.path.fontsDest));
});

gulp.task('images', function () {
  gulp.src(options.path.imagesSrc)
    .pipe(image())
    .pipe(gulp.dest(options.path.imagesDest));
});

gulp.task('css-styles', function() {
	gulp.src(options.path.cssSrc)
	    .pipe(sass(options.sass).on('error', sass.logError))
		.pipe(concat('styles.min.css'))
        .pipe(gulp.dest(options.path.cssDest))
		.pipe(browserSync.stream());
});

gulp.task('views', function() {
  return gulp.src(options.path.viewsSrc)
	  .pipe(plugins.changed(options.path.viewsDst))
	  .pipe(gulp.dest(options.path.viewsDst))
	  .pipe(browserSync.stream());
});

gulp.task('clean', function () {
	console.log("Clean all files in build folder");
	return gulp.src(options.path.buildDst + "*", { read: false }).pipe(rimraf({ force: true }));
});

gulp.task('copy-views-files', function() {
	gulp.src(options.path.viewsSrc)
        .pipe(gulp.dest(options.path.viewsDst))
		.pipe(browserSync.stream());
});

gulp.task('copy-vendor-files', function() {
	gulp.src(options.path.vendorSrc)
        .pipe(gulp.dest(options.path.vendorDst))
		.pipe(browserSync.stream());
});

gulp.task('copy-index-file', function() {
	gulp.src(options.path.indexSrc)
        .pipe(gulp.dest(options.path.buildDst))
		.pipe(browserSync.stream());
});

gulp.task('build', function(callback) {
	runSequence('clean',
				'copy-index-file',
				'copy-vendor-files',
			    'copy-views-files',
				['js-hint', 'angular-scripts', 'front-scripts'],
				'jQuery-scripts',
				'fonts',
				'images',
				'css-styles',
			callback);
});

gulp.task('watch', function() {
	
	watch(options.path.cssSrc, function() {
		gulp.start(['css-styles']);
	});
	watch(options.path.cssSrc, function() {
		gulp.start(['fonts']);
	});
	watch(options.path.cssSrc, function() {
		gulp.start(['images']);
	});
	watch(options.path.indexSrc, function() {
		gulp.start(['copy-index-file']);
	});
	watch(options.path.viewsSrc, function() {
		gulp.start(['views']);
	});
	watch(options.path.angularScriptsSrc, function() {
		gulp.start(['js-hint', 'angular-scripts']);
	});
	watch(options.path.frontScriptsSrc, function() {
		gulp.start(['js-hint', 'front-scripts']);
	});
	
});

//<link type="text/css" rel="stylesheet" href="http://localhost/wp-gulp-starter/wp-content/themes/olimpiada-theme/styles/styles.min.css">

gulp.task('serve', ['build', 'watch'], function () {

    browserSync.init({
        proxy: "yourlocal.dev",
		logLevel: "debug",
		proxyTarget: 'localhost',
		startPath: 'found-shop/build/',
		notify: false,
		watchOptions: {
		  debounceDelay: 2000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads
		}
    });
	
});