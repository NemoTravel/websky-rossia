const gulp = require('gulp'),
    del = require('del'),
    browserify = require('browserify'),
    strictify = require('strictify'),
    buffer = require('vinyl-buffer'),
    ngHtml2Js = require('gulp-ng-html2js'),
    minifyHtml = require('gulp-minify-html'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    gulpfileLocal = require('./gulpfile.local'),
    fs = require('fs-extra'),
    path = require('path');

gulp.task('clean', () => {
    return del('build');
});

gulp.task('build:html', () => {
    return gulp.src('src/**/*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: 'app',
            rename: function (url) {
                return url.replace('src/', '');
            }
        }))
        .pipe(concat('templates-rossia.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

function addFiles() {
    const addFilesConfig = gulpfileLocal.addFiles;

    if (!addFilesConfig) {
        console.error('There is no config for add files!');

        return false;
    }

    const writeTo = addFilesConfig.writeTo || null;
    const copyTo = addFilesConfig.copyTo || null;
    const prefix = addFilesConfig.prefix || null;
    const scripts = addFilesConfig.scripts || [];
    const styles = addFilesConfig.styles || [];

    if (writeTo === null || copyTo === null || prefix === null) return;

    if (scripts.length > 0 || styles.length > 0) {
        fs.writeFileSync(writeTo, '');
    }

    if (fs.existsSync(`${copyTo}/${prefix}`) === false) {
        fs.mkdirSync(`${copyTo}/${prefix}`);
    }

    if (scripts.length > 0) {
        scripts.forEach((scriptCur) => {
            const fileName = path.basename(scriptCur);
            const src = '${page.dirPathname}/themes/websky/assets/static/debug/' + `${prefix}/${fileName}`;

            if (new RegExp(/^(http|https|ftp|ftps)/).test(scriptCur) === false) {
                fs.copySync(scriptCur, `${copyTo}/${prefix}/${fileName}`);
                fs.appendFileSync(writeTo, `<script src="${src}" defer></script>` + '\r\n');
            } else {
                fs.appendFileSync(writeTo, `<script src="${scriptCur}" defer></script> refer` + '\r\n');
            }
        });
    }

    if (styles.length > 0) {
        styles.forEach((styleCur) => {
            const fileName = path.basename(styleCur);
            const src = '${page.dirPathname}/themes/websky/assets/static/debug/' + `${prefix}/${fileName}`;

            if (new RegExp(/^(http|https|ftp|ftps|www)/).test(styleCur) === false) {
                fs.copySync(styleCur, `${copyTo}/${prefix}/${fileName}`);
                fs.appendFileSync(writeTo, `<link href="${src}" rel="stylesheet" type="text/css" />` + '\r\n');
            } else {
                fs.appendFileSync(writeTo, `<link href="${styleCur}" rel="stylesheet" type="text/css" />` + '\r\n');
            }
        });
    }
}

gulp.task('build:js', () => {
    return browserify('src/index.js', {transform: strictify})
        .bundle()
        .pipe(source('controllers-rossia.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/'))
        .on('end', addFiles)
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.*', gulp.series('build:js', 'build:html'));
});

gulp.task('build', gulp.series('build:js', 'build:html'));

gulp.task('default', gulp.series('build', 'watch'));