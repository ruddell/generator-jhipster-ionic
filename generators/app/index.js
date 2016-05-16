'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var shelljs = require('shelljs');
var packagejs = require(__dirname + '/../../package.json');
var fse = require('fs-extra');
var jhipsterUtils = require(__dirname+ '/../../node_modules/generator-jhipster/generators/util.js');
// Stores JHipster variables
var jhipsterVar = {moduleName: 'ionic'};

// Stores JHipster functions

module.exports = yeoman.Base.extend({

  initializing: {
    printJHipsterLogo: function() {
      this.log(' \n' +
        chalk.green('        ██  ██    ██  ████████  ███████  ') +  chalk.red('████████   ██████   ███  ███  ████████   █████\n') +
        chalk.green('        ██  ██    ██     ██     ██    ██ ') +  chalk.red('   ██     ██    ██  ████ ███     ██     ██    █\n') +
        chalk.green('        ██  ████████     ██     ███████  ') +  chalk.red('   ██     ██    ██  ████████     ██     ██   \n') +
        chalk.green('  ██    ██  ██    ██     ██     ██       ') +  chalk.red('   ██     ██    ██  ██  ████     ██     ██    █\n') +
        chalk.green('   ██████   ██    ██  ████████  ██       ') +  chalk.red('████████   ██████   ██   ███  ████████   █████\n'));
      this.log(chalk.white.bold('                            http://jhipster.github.io\n'));
      this.log(chalk.white('Welcome to the JHipster Ionic Generator '));
      this.log(chalk.white('Files will be generated in folder: ' + chalk.yellow(this.destinationRoot())));

      this.configAnswers = this.fs.readJSON('.yo-rc.json');
    }
  },

  prompting: {
    askForPath: function() {
      var done = this.async();
      //the project exists
      if(this.configAnswers !== undefined && this.configAnswers['generator-jhipster'] && this.configAnswers['generator-m-ionic']){
        done();
        return;
      }


      var prompts = [{
        type: 'input',
        name: 'directoryPath',
        message: 'Where is the JHipster monolith/gateway located ?',
        default: '../',
        validate: function (input) {
          var path = this.destinationPath(input);
          if(shelljs.test('-d', path)) {
            var files = shelljs.ls('-l',this.destinationPath(input));
            this.appsFolders = [];

            files.forEach(function(file) {
              if(file.isDirectory()) {
                if(shelljs.test('-f', file.name + '/.yo-rc.json')) {
                  var fileData = this.fs.readJSON(file.name + '/.yo-rc.json');
                  if(fileData['generator-jhipster'] !== undefined) {
                    this.appsFolders.push(file.name.match(/([^\/]*)\/*$/)[1]);
                  }
                }
              }
            }, this);

            if(this.appsFolders.length === 0) {
              return 'No monolith or gateway apps found in ' + this.destinationPath(input);
            } else {
              return true;
            }
          } else {
            return path + ' is not a directory or doesn\'t exist';
          }

        }.bind(this)
      }];

      this.prompt(prompts, function (props) {
        this.directoryPath = props.directoryPath;

        //Removing ionic apps, microservice apps and registry from appsFolders
        for(var i = 0; i < this.appsFolders.length; i++) {
          var path = this.destinationPath(this.directoryPath + this.appsFolders[i]+'/.yo-rc.json');
          var fileData = this.fs.readJSON(path);
          var config = fileData['generator-jhipster'];
          if(fileData['generator-m-ionic'] || config.applicationType === 'microservice' || this.appsFolders[i]==='jhipster-registry' || this.appsFolders[i] === 'registry') {
            this.appsFolders.splice(i,1);
            i--;
          }
        }

        this.log(chalk.green(this.appsFolders.length + ' applications found at ' + this.destinationPath(this.directoryPath) + '\n'));

        done();
      }.bind(this));
    }
  },
  askForApps: function() {
    if(this.abort) return;
    var done = this.async();

    //this means that data was loaded from .yo-rc.json
    if(this.appsFolders === undefined) {
      this.appConfig = this.configAnswers['generator-jhipster'];
      this.jhipsterHome = this.configAnswers['generator-jhipster'].jhipsterHome;
      done();
      return;
    }

    var prompts = [{
      type: 'checkbox',
      name: 'chosenApps',
      message: 'Which application do you want to generate from?',
      choices: this.appsFolders,
      default: this.defaultAppsFolders,
      validate: function (input) {
        if(input.length === 0 || input.length > 1) {
          return 'Please choose only one application';
        } else return true;
      }
    }];

    this.prompt(prompts, function (props) {
      this.appsFolders = props.chosenApps;

      var path = this.destinationPath(this.directoryPath + this.appsFolders[0]+'/.yo-rc.json');
      var fileData = this.fs.readJSON(path);
      this.appConfig = fileData['generator-jhipster'];
      this.jhipsterHome = this.directoryPath + this.appsFolders[0];
      done();
    }.bind(this));
  },

  // prompting: function () {
  //   var done = this.async();
  //
  //   var prompts = [{
  //     type: 'input',
  //     name: 'message',
  //     message: 'Please put something',
  //     default: 'hello world!'
  //   }];
  //
  //   this.prompt(prompts, function (props) {
  //     this.props = props;
  //     // To access props later use this.props.someOption;
  //
  //     done();
  //   }.bind(this));
  // },

  writing: {
    initCordova: function () {
      var done = this.async();
      this.spawnCommand('cordova', ['create', '.'])
        .on('close', function () {
          done();
        });
    },

    writeTemplates : function () {
      var done = this.async();
      this.baseName = this.appConfig.baseName;
      this.packageName = this.appConfig.packageName;
      this.angularAppName = snakeToCamel(this.appConfig.baseName) + 'App';

      this.searchEngine = this.appConfig.searchEngine;
      this.authenticationType = this.appConfig.authenticationType;
      this.serverPort = this.appConfig.serverPort;
      this.enableSocialSignIn = this.appConfig.enableSocialSignIn;
      this.applicationType = this.appConfig.applicationType;

      this.log('jhipsterHome=' + this.jhipsterHome);
      this.appConfig.jhipsterHome = this.jhipsterHome;
      this.log('baseName=' + this.baseName);
      this.log('packageName=' + this.packageName);
      this.log('angularAppName=' + this.angularAppName);
      // this.log('searchEngine=' + this.searchEngine); todo deal with this
      // this.log('enableSocialSignIn=' + this.enableSocialSignIn); todo deal with this
      this.log('applicationType=' + this.applicationType);

      // create m-ionic's .yo-rc.json based on the JHipster project
      this.template('m-ionic.yo-rc', '.yo-rc.json', this, {});
      var fileData = this.fs.readJSON('.yo-rc.json');
      var config = fileData['generator-m-ionic'];
      config.answers.appName = this.baseName;
      config.answers.appModule = this.baseName;
      config.answers.appId = this.packageName;

      var finalConfig = {'generator-m-ionic': config, 'generator-jhipster': this.appConfig};
      fse.writeJson('.yo-rc.json', finalConfig, function(){
        //once the .yo-rc.json is written, call 'yo m ionic'
        done();
      });
    },
    generateIonic: function () {
      var done = this.async();
      this.spawnCommandSync('yo', ['m-ionic', '--skip-welcome-message','--skip-sdk']);
      done();
    },
    copyJhipsterFiles: function () {
      // copy interceptors, state handlers, and set up a login $ionicModal
      //set up authentication
      this.log('authenticationType=' + this.authenticationType);

      // copy over other files (home, user management, audits, settings, password)


    },
    generateEntityFiles: function () {
      //  generate entities from the entity JSON files
      //  if microservice, add the microservice name to the beginning of the API in the service

    },
    finishCordova: function () {
      // todo add the mobile platforms to cordova

    }
  },

  install: function () {

    // this.installDependencies();
  },

  end: function () {
    var done = this.async();
    var fileData = this.fs.readJSON('.yo-rc.json');
    var config = fileData['generator-m-ionic'];
    var finalConfig = {'generator-m-ionic': config, 'generator-jhipster': this.appConfig};
    fse.writeJson('.yo-rc.json', finalConfig, function(){
      //once the .yo-rc.json is written, call 'yo m ionic'
      done();
    });
    // this.log('You\'re all set!  Run \'gulp watch\'');
  }
});

function snakeToCamel(s){
  return s.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
}
var walk = function(dir) {
  var results = []
  var list = fse.readdirSync(dir)
  list.forEach(function(file) {
    file = dir + '/' + file
    var stat = fse.statSync(file)
    if (stat && stat.isDirectory()) results = results.concat(walk(file))
    else results.push(file)
  })
  return results
}

