'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var shelljs = require('shelljs');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'ionic'};

// Stores JHipster functions
var jhipsterFunc = {};

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
    },
    compose: function (args) {
      // this.composeWith('jhipster:modules',
      //   {
      //     options: {
      //       jhipsterVar: jhipsterVar,
      //       jhipsterFunc: jhipsterFunc
      //     }
      //   }
      //   this.options.testmode ? {local: require.resolve('generator-jhipster/modules')} : null
      // );
    }
  },

  prompting: {
    askForPath: function() {
      var done = this.async();

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

        //Removing microservice apps and registry from appsFolders
        for(var i = 0; i < this.appsFolders.length; i++) {
          var path = this.destinationPath(this.directoryPath + this.appsFolders[i]+'/.yo-rc.json');
          var fileData = this.fs.readJSON(path);
          var config = fileData['generator-jhipster'];
          if(config.applicationType === 'microservice' || this.appsFolders[i]==='jhipster-registry' || this.appsFolders[i] === 'registry') {
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
    writeTemplates : function () {
      this.baseName = this.appConfig.baseName;
      this.packageName = this.appConfig.packageName;
      this.angularAppName = this.appConfig.baseName;

      this.searchEngine = this.appConfig.searchEngine;
      this.authenticationType = this.appConfig.authenticationType;
      this.serverPort = this.appConfig.serverPort;
      this.enableSocialSignIn = this.appConfig.enableSocialSignIn;
      this.applicationType = this.appConfig.applicationType;

      var jhipsterHome = this.directoryPath + this.appsFolders[0];

      // this.log('appConfigs=' + JSON.stringify(this.appConfig));
      this.log('jhipsterHome=' + jhipsterHome);
      this.log('baseName=' + this.baseName);
      this.log('packageName=' + this.packageName);
      this.log('angularAppName=' + this.angularAppName);
      // this.log('searchEngine=' + this.searchEngine); todo deal with this
      // this.log('enableSocialSignIn=' + this.enableSocialSignIn); todo deal with this
      this.log('applicationType=' + this.applicationType);

      //set bower home
      this.template('.bowercc', '.bowercc', this, {});

      //set up ionic.project for CORS
      this.log('serverPort=' + this.serverPort);

      //set up authentication
      this.log('authenticationType=' + this.authenticationType);
      // copy interceptors, state handlers, and set up a login $ionicModal

      //  copy over other files (home, user management, audits, settings, password)

      //  generate entities from the entity JSON files
      //  if microservice, add the microservice name to the beginning of the API in the service

    }
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    this.log('End of ionic generator');
  }
});
