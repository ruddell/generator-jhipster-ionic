'use strict';
var path = require('path');
var fse = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var deps = [
  [helpers.createDummyGenerator(), 'jhipster:modules']
];

describe('JHipster Ionic JWT generator test', function () {
  describe('default jwt generator test', function () {
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
          fse.copySync(path.join(__dirname, '../test/templates/jwt/default'), dir + '/jhipster-client')
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
              fse.copySync(path.join(__dirname, '../test/templates/jwt/default'), directory + '/jhipster-ionic-app')
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

  describe('all jwt generator test', function () {
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
          fse.copySync(path.join(__dirname, '../test/templates/jwt/all'), dir + '/jhipster-client')
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
              fse.copySync(path.join(__dirname, '../test/templates/jwt/all'), directory + '/jhipster-ionic-app')
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
  describe('social jwt generator test', function () {
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
          fse.copySync(path.join(__dirname, '../test/templates/jwt/social'), dir + '/jhipster-client')
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
              fse.copySync(path.join(__dirname, '../test/templates/jwt/social'), directory + '/jhipster-ionic-app')
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

  describe('i18n jwt generator test', function () {
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
          fse.copySync(path.join(__dirname, '../test/templates/jwt/i18n'), dir + '/jhipster-client')
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
              fse.copySync(path.join(__dirname, '../test/templates/jwt/i18n'), directory + '/jhipster-ionic-app')
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

  describe('websocket jwt generator test', function () {
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
          fse.copySync(path.join(__dirname, '../test/templates/jwt/websocket'), dir + '/jhipster-client')
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
              fse.copySync(path.join(__dirname, '../test/templates/jwt/websocket'), directory + '/jhipster-ionic-app')
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