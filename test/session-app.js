'use strict';
var path = require('path');
var fse = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var deps = [
  [helpers.createDummyGenerator(), 'jhipster:modules']
];

describe('JHipster Ionic Session generator test', function () {
  describe('default Session generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Running JHipster");
          directory = process.cwd();
          fse.mkdirsSync(process.cwd() + '/jhipster-client');
          jhipDir = process.cwd() + '/jhipster-client';
          process.chdir(jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/session/default'), jhipDir)
        })
        .withOptions({
          testmode: true
        })
        .withPrompts({
          message: 'simple message to say hello'
        })
        .withGenerators(deps)
        .on('end', function() {
          return helpers
            .run(path.join( __dirname, '../generators/app'))
            .inTmpDir(function (dir) {
              console.log("Running jhipster-ionic")
              fse.mkdirsSync(directory + '/jhipster-ionic-app');
              jhipIonicDir = directory + '/jhipster-ionic-app';
              process.chdir(jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/session/default'), jhipIonicDir)
            })
            .withOptions({
              testmode: true,
              skipInstall: true,
              force: true,
              cordova: false
            })
            .withPrompts({
              message: 'simple message to say hello'
            })
            .withGenerators(deps)
            .on('end', done)
            .on('error', function (error) {
              console.log('Oh Noes!', error);
            });
        });
    });

    it('should generate a JHipster project and a JHipster-Ionic project with default Session settings', function () {
      //check for the JHipster project
      assert.file([
        jhipDir + '/src/main/webapp/index.html'
      ]);
      //check for the JHipster-Ionic project
      assert.file([
        jhipIonicDir + '/app/app.js',
        jhipIonicDir + '/app/index.html',
        jhipIonicDir + '/app/main/main.js'
      ]);
    });
  });

  describe('all session generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Running JHipster");
          directory = process.cwd();
          fse.mkdirsSync(process.cwd() + '/jhipster-client');
          jhipDir = process.cwd() + '/jhipster-client';
          process.chdir(jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/session/all'), jhipDir)
        })
        .withOptions({
          testmode: true,
          websocket: 'spring-websocket'
        })
        .withPrompts({
          message: 'simple message to say hello'
        })
        .withGenerators(deps)
        .on('end', function() {
          return helpers
            .run(path.join( __dirname, '../generators/app'))
            .inTmpDir(function (dir) {
              console.log("Running jhipster-ionic")
              fse.mkdirsSync(directory + '/jhipster-ionic-app');
              jhipIonicDir = directory + '/jhipster-ionic-app';
              process.chdir(jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/session/default'), jhipIonicDir)
            })
            .withOptions({
              testmode: true,
              skipInstall: true,
              force: true,
              cordova: false
            })
            .withPrompts({
              message: 'simple message to say hello'
            })
            .withGenerators(deps)
            .on('end', done)
            .on('error', function (error) {
              console.log('Oh Noes!', error);
            });
        });
    });

    it('should generate a JHipster project and a JHipster-Ionic project with all options and Session', function () {
      //check for the JHipster project
      assert.file([
        jhipDir + '/src/main/webapp/index.html'
      ]);
      //check for the JHipster-Ionic project
      assert.file([
        jhipIonicDir + '/app/app.js',
        jhipIonicDir + '/app/index.html',
        jhipIonicDir + '/app/main/main.js'
      ]);
    });
  });
  // describe('social session generator test', function () {
  //   var directory;
  //   var jhipDir;
  //   var jhipIonicDir;
  //   this.timeout(60000);
  //   before(function (done) {
  //     helpers
  //       .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
  //       .inTmpDir(function (dir) {
  //         console.log("Running JHipster");
  //         directory = process.cwd();
  //         fse.mkdirsSync(process.cwd() + '/jhipster-client');
  //         jhipDir = process.cwd() + '/jhipster-client';
  //         process.chdir(jhipDir);
  //         fse.copySync(path.join(__dirname, '../test/templates/session/social'), jhipDir)
  //       })
  //       .withOptions({
  //         testmode: true
  //       })
  //       .withPrompts({
  //         message: 'simple message to say hello'
  //       })
  //       .withGenerators(deps)
  //       .on('end', function() {
  //         return helpers
  //           .run(path.join( __dirname, '../generators/app'))
  //           .inTmpDir(function (dir) {
  //             console.log("Running jhipster-ionic")
  //             fse.mkdirsSync(directory + '/jhipster-ionic-app');
  //             jhipIonicDir = directory + '/jhipster-ionic-app';
  //             process.chdir(jhipIonicDir);
  //             fse.copySync(path.join(__dirname, '../test/templates/session/default'), jhipIonicDir)
  //           })
  //           .withOptions({
  //             testmode: true,
  //             skipInstall: true,
  //             force: true,
  //             cordova: false
  //           })
  //           .withPrompts({
  //             message: 'simple message to say hello'
  //           })
  //           .withGenerators(deps)
  //           .on('end', done)
  //           .on('error', function (error) {
  //             console.log('Oh Noes!', error);
  //           });
  //       });
  //   });
  //
  //   it('should generate a JHipster project and a JHipster-Ionic project with social login and Session', function () {
  //     //check for the JHipster project
  //     assert.file([
  //       jhipDir + '/src/main/webapp/index.html'
  //     ]);
  //     //check for the JHipster-Ionic project
  //     assert.file([
  //       jhipIonicDir + '/app/app.js',
  //       jhipIonicDir + '/app/index.html',
  //       jhipIonicDir + '/app/main/main.js'
  //     ]);
  //   });
  // });

  describe('i18n session generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Running JHipster");
          directory = process.cwd();
          fse.mkdirsSync(process.cwd() + '/jhipster-client');
          jhipDir = process.cwd() + '/jhipster-client';
          process.chdir(jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/session/i18n'), jhipDir)
        })
        .withOptions({
          testmode: true
        })
        .withPrompts({
          message: 'simple message to say hello'
        })
        .withGenerators(deps)
        .on('end', function() {
          return helpers
            .run(path.join( __dirname, '../generators/app'))
            .inTmpDir(function (dir) {
              console.log("Running jhipster-ionic")
              fse.mkdirsSync(directory + '/jhipster-ionic-app');
              jhipIonicDir = directory + '/jhipster-ionic-app';
              process.chdir(jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/session/default'), jhipIonicDir)
            })
            .withOptions({
              testmode: true,
              skipInstall: true,
              force: true,
              cordova: false
            })
            .withPrompts({
              message: 'simple message to say hello'
            })
            .withGenerators(deps)
            .on('end', done)
            .on('error', function (error) {
              console.log('Oh Noes!', error);
            });
        });
    });

    it('should generate a JHipster project and a JHipster-Ionic project with i18n and Session', function () {
      //check for the JHipster project
      assert.file([
        jhipDir + '/src/main/webapp/index.html'
      ]);
      //check for the JHipster-Ionic project
      assert.file([
        jhipIonicDir + '/app/app.js',
        jhipIonicDir + '/app/index.html',
        jhipIonicDir + '/app/main/main.js'
      ]);
    });
  });

  describe('websocket session generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Running JHipster");
          directory = process.cwd();
          fse.mkdirsSync(process.cwd() + '/jhipster-client');
          jhipDir = process.cwd() + '/jhipster-client';
          process.chdir(jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/session/websocket'), jhipDir)
        })
        .withOptions({
          testmode: true,
          websocket: 'spring-websocket'
        })
        .withPrompts({
          message: 'simple message to say hello'
        })
        .withGenerators(deps)
        .on('end', function() {
          return helpers
            .run(path.join( __dirname, '../generators/app'))
            .inTmpDir(function (dir) {
              console.log("Running jhipster-ionic")
              fse.mkdirsSync(directory + '/jhipster-ionic-app');
              jhipIonicDir = directory + '/jhipster-ionic-app';
              process.chdir(jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/session/default'), jhipIonicDir)
            })
            .withOptions({
              testmode: true,
              skipInstall: true,
              force: true,
              cordova: false
            })
            .withPrompts({
              message: 'simple message to say hello'
            })
            .withGenerators(deps)
            .on('end', done)
            .on('error', function (error) {
              console.log('Oh Noes!', error);
            });
        });
    });

    it('should generate a JHipster project and a JHipster-Ionic project with Websockets and Session', function () {
      //check for the JHipster project
      assert.file([
        jhipDir + '/src/main/webapp/index.html'
      ]);
      //check for the JHipster-Ionic project
      assert.file([
        jhipIonicDir + '/app/app.js',
        jhipIonicDir + '/app/index.html',
        jhipIonicDir + '/app/main/main.js'
      ]);
    });
  });
});
