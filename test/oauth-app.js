'use strict';
var path = require('path');
var fse = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var deps = [
  [helpers.createDummyGenerator(), 'jhipster:modules']
];

describe('JHipster Ionic Oauth generator test', function () {
  describe('default oauth generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Runniong jhipster")
          directory = dir;
          fse.mkdirsSync(dir + '/jhipster-client');
          jhipDir = dir + '/jhipster-client';
          process.chdir('/private' + jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/oauth/default'), dir + '/jhipster-client')
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
              console.log("Runniong jhipster-ionic")
              fse.mkdirsSync(directory + '/jhipster-ionic-app');
              jhipIonicDir = directory + '/jhipster-ionic-app';
              process.chdir('/private' + jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/oauth/default'), directory + '/jhipster-ionic-app')
            })
            .withOptions({
              testmode: true,
              skipInstall: true,
              force: true
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

    it('should generate a JHipster project and a JHipster-Ionic project', function () {
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

  describe('all oauth generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Runniong jhipster")
          directory = dir;
          fse.mkdirsSync(dir + '/jhipster-client');
          jhipDir = dir + '/jhipster-client';
          process.chdir('/private' + jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/oauth/all'), dir + '/jhipster-client')
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
              console.log("Runniong jhipster-ionic")
              fse.mkdirsSync(directory + '/jhipster-ionic-app');
              jhipIonicDir = directory + '/jhipster-ionic-app';
              process.chdir('/private' + jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/oauth/all'), directory + '/jhipster-ionic-app')
            })
            .withOptions({
              testmode: true,
              skipInstall: true,
              force: true
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

    it('should generate a JHipster project and a JHipster-Ionic project', function () {
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
  describe('social oauth generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Runniong jhipster")
          directory = dir;
          fse.mkdirsSync(dir + '/jhipster-client');
          jhipDir = dir + '/jhipster-client';
          process.chdir('/private' + jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/oauth/social'), dir + '/jhipster-client')
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
              console.log("Runniong jhipster-ionic")
              fse.mkdirsSync(directory + '/jhipster-ionic-app');
              jhipIonicDir = directory + '/jhipster-ionic-app';
              process.chdir('/private' + jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/oauth/social'), directory + '/jhipster-ionic-app')
            })
            .withOptions({
              testmode: true,
              skipInstall: true,
              force: true
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

    it('should generate a JHipster project and a JHipster-Ionic project', function () {
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

  describe('i18n oauth generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Runniong jhipster")
          directory = dir;
          fse.mkdirsSync(dir + '/jhipster-client');
          jhipDir = dir + '/jhipster-client';
          process.chdir('/private' + jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/oauth/i18n'), dir + '/jhipster-client')
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
              console.log("Runniong jhipster-ionic")
              fse.mkdirsSync(directory + '/jhipster-ionic-app');
              jhipIonicDir = directory + '/jhipster-ionic-app';
              process.chdir('/private' + jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/oauth/i18n'), directory + '/jhipster-ionic-app')
            })
            .withOptions({
              testmode: true,
              skipInstall: true,
              force: true
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

    it('should generate a JHipster project and a JHipster-Ionic project', function () {
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

  describe('websocket oauth generator test', function () {
    var directory;
    var jhipDir;
    var jhipIonicDir;
    this.timeout(60000);
    before(function (done) {
      helpers
        .run(path.join( __dirname, '../node_modules/generator-jhipster/generators/client'))
        .inTmpDir(function (dir) {
          console.log("Runniong jhipster")
          directory = dir;
          fse.mkdirsSync(dir + '/jhipster-client');
          jhipDir = dir + '/jhipster-client';
          process.chdir('/private' + jhipDir);
          fse.copySync(path.join(__dirname, '../test/templates/oauth/websocket'), dir + '/jhipster-client')
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
              console.log("Runniong jhipster-ionic")
              fse.mkdirsSync(directory + '/jhipster-ionic-app');
              jhipIonicDir = directory + '/jhipster-ionic-app';
              process.chdir('/private' + jhipIonicDir);
              fse.copySync(path.join(__dirname, '../test/templates/oauth/websocket'), directory + '/jhipster-ionic-app')
            })
            .withOptions({
              testmode: true,
              skipInstall: true,
              force: true
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

    it('should generate a JHipster project and a JHipster-Ionic project', function () {
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
