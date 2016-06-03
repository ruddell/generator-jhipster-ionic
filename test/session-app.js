'use strict';
var path = require('path');
var fse = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var process = require('process');

var deps = [
  [helpers.createDummyGenerator(), 'jhipster:modules']
];

describe('JHipster Ionic session generator test', function () {
  describe('default session generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Running jhipster")
          directory = dir;
          fse.mkdirsSync(dir + '/jhipster-client');
          jhipDir = dir + '/jhipster-client';
          process.chdir('/private' + jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/session/default'), dir + '/jhipster-client')
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
              process.chdir('/private' + jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/session/default'), directory + '/jhipster-ionic-app')
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

    it('should generate a JHipster project and a JHipster-Ionic project with default session settings', function () {
      console.log(process.cwd());
      //check for the JHipster project
      assert.file([
        '../jhipster-client/src/main/webapp/index.html'
      ]);
      //check for the JHipster-Ionic project
      assert.file([
        'app/app.js',
        'app/index.html',
        'app/main/main.js'
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
          console.log("Running jhipster")
          directory = dir;
          fse.mkdirsSync(dir + '/jhipster-client');
          jhipDir = dir + '/jhipster-client';
          process.chdir('/private' + jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/session/all'), dir + '/jhipster-client')
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
              process.chdir('/private' + jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/session/all'), directory + '/jhipster-ionic-app')
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

    it('should generate a JHipster project and a JHipster-Ionic project with all options and session', function () {
      console.log(process.cwd());
      //check for the JHipster project
      assert.file([
        '../jhipster-client/src/main/webapp/index.html'
      ]);
      //check for the JHipster-Ionic project
      assert.file([
        'app/app.js',
        'app/index.html',
        'app/main/main.js'
      ]);
    });
  });
  describe('social session generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Running jhipster")
          directory = dir;
          fse.mkdirsSync(dir + '/jhipster-client');
          jhipDir = dir + '/jhipster-client';
          process.chdir('/private' + jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/session/social'), dir + '/jhipster-client')
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
              process.chdir('/private' + jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/session/social'), directory + '/jhipster-ionic-app')
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

    it('should generate a JHipster project and a JHipster-Ionic project with social login and session', function () {
      console.log(process.cwd());
      //check for the JHipster project
      assert.file([
        '../jhipster-client/src/main/webapp/index.html'
      ]);
      //check for the JHipster-Ionic project
      assert.file([
        'app/app.js',
        'app/index.html',
        'app/main/main.js'
      ]);
    });
  });

  describe('i18n session generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Running jhipster")
          directory = dir;
          fse.mkdirsSync(dir + '/jhipster-client');
          jhipDir = dir + '/jhipster-client';
          process.chdir('/private' + jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/session/i18n'), dir + '/jhipster-client')
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
              process.chdir('/private' + jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/session/i18n'), directory + '/jhipster-ionic-app')
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

    it('should generate a JHipster project and a JHipster-Ionic project with i18n and session', function () {
      console.log(process.cwd());
      //check for the JHipster project
      assert.file([
        '../jhipster-client/src/main/webapp/index.html'
      ]);
      //check for the JHipster-Ionic project
      assert.file([
        'app/app.js',
        'app/index.html',
        'app/main/main.js'
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
          console.log("Running jhipster")
          directory = dir;
          fse.mkdirsSync(dir + '/jhipster-client');
          jhipDir = dir + '/jhipster-client';
          process.chdir('/private' + jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/session/websocket'), dir + '/jhipster-client')
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
              process.chdir('/private' + jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/session/websocket'), directory + '/jhipster-ionic-app')
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

    it('should generate a JHipster project and a JHipster-Ionic project with Websockets and session', function () {
      console.log(process.cwd());
      //check for the JHipster project
      assert.file([
        '../jhipster-client/src/main/webapp/index.html'
      ]);
      //check for the JHipster-Ionic project
      assert.file([
        'app/app.js',
        'app/index.html',
        'app/main/main.js'
      ]);
    });
  });
});
