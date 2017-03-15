import gulp from 'gulp';
import browserSyncMod from 'browser-sync';
import sass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import del from 'del';

const browserSync = browserSyncMod.create();

const paths = {
	html: {
		src: './src/*.{html,ico}',
		dest: './dest/'
	},
	styles: {
		src: './src/styles/**/*.scss',
		dest: './dest/styles'
	},
	scripts: {
		src: './src/scripts/**/*.js',
		dest: './dest/scripts'
	},
	images: {
		src: './src/images/**/*',
		dest: './dest/images'
	}
};

function bs() {
	browserSync.init({
		server: {
			baseDir: './dest'
		}
	});
}

const clean = () => del([ './dest' ]);
export { clean };

function html() {
	return gulp.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest));
}

function styles() {
	return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([ autoprefixer() ]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.stream());
}

function images() {
	return gulp.src(paths.images.src)
		.pipe(gulp.dest(paths.images.dest));
}

function scripts() {
	return gulp.src(paths.scripts.src, { sourcemaps: true })
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.html.src, html);
	gulp.watch(paths.images.src, images);
}

function deploy() {
	var ghpages = require('gh-pages');
	var path = require('path');

	ghpages.publish(path.join(__dirname, 'dest'), function(err) { ... });
}

const dev = gulp.series(clean, gulp.parallel(styles, scripts, html, images), gulp.parallel(bs, watch));
export { dev };
