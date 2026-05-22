/*
@module gulp.clean

This will clean up all generated files, mainliy these are the folders Distribution and Deploy.

##Usage

	gulp clean

*/

const gulp = require('gulp');
const fs = require('fs');

gulp.task('clean', function() {
    fs.rmSync(process.gulp_dest_distro, { recursive: true, force: true });
    fs.rmSync(process.gulp_dest_deploy, { recursive: true, force: true });
});
