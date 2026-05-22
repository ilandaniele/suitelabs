const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const args = require('ns-args').argv();
const _ = require('underscore');
const glob = require('glob').sync;
const package_manager = require('../package-manager');

gulp.task('extract3pls', done => {
    const distroDir = path.dirname(package_manager.env.distro);
    let outputDir = args.output;

    if (!outputDir) {
        throw new Error('Please specify an output directory with --output parameter');
    }
    outputDir = path.join(process.gulp_init_cwd || process.cwd(), outputDir);

    if (!outputDir.startsWith(process.gulp_init_cwd || process.cwd())) {
        throw new Error(
            'For security reasons, the output dir needs to be inside the current working directory'
        );
    }

    const thirdparties = package_manager.distro.modules
        .filter(e => {
            return e.startsWith(package_manager.distro.folders.thirdPartyModules);
        })
        .map(e => {
            return path.join(distroDir, e, 'ns.package.json');
        });

    if (fs.existsSync(outputDir)) {
        console.log('Deleting ', outputDir);
        fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    let src = [];

    const validResources = [
        'javascript',
        'javascript-lib',
        'javascript-ext',
        'javascript-move',
        'ssp-libraries',
        'suitescript2'
    ];

    _.each(thirdparties, nsPackage => {
        // eslint-disable-next-line
        const nsPackageJson = require(nsPackage);
        const nsPackageJsonDir = path.dirname(nsPackage);

        _.each(nsPackageJson.gulp, (files, resource) => {
            if (_.contains(validResources, resource)) {
                _.each(files, file => {
                    src = _.union(src, glob(path.join(nsPackageJsonDir, file)));
                });
            }
        });
    });
    // console.log(outputDir);
    src.forEach(lib => {
        const folder = lib.split('third_parties')[1];
        const newName = path.join(outputDir, folder);
        console.log('Copying', lib, newName);
        fs.mkdirSync(path.dirname(newName), { recursive: true });
        fs.writeFileSync(newName, fs.readFileSync(lib));
    });
    done();
});
