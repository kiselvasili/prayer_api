let gulp = require('gulp');
// let tslint = require('gulp-tslint');
let ts = require('gulp-typescript');
let runSequence = require('run-sequence');

let tsProject = ts.createProject('tsconfig.json');

let spawn = require('child_process').spawn;
let node;

gulp.task('build', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('build'));
});

gulp.task('watch', () => {
    gulp.watch(['./src/**/*.ts', '!./node_modules/**/*'], () => {
        runSequence('stop', 'build', 'start');
    });
});

gulp.task('start', () => {
    if (node) node.kill();
    node = spawn('node', ['build/index.js'], { stdio: 'inherit' });
});

gulp.task('stop', () => {
    if (node) node.kill();
});

gulp.task('default', ['stop', 'watch'], () => {
    gulp.start('start');
});