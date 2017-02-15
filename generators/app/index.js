'use strict';
var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    shelljs = require('shelljs'),
    _ = require('lodash'),
    packagejs = require(__dirname + '/../../package.json'),
    fse = require('fs-extra'),
    jhipsterUtils = require(__dirname+ '/../../node_modules/generator-jhipster/generators/util.js'),
    // Stores JHipster variables
    jhipsterVar = {moduleName: 'ionic'};

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
      if(this.configAnswers !== undefined && this.configAnswers['generator-jhipster'] && this.configAnswers['generator-jhipster']['jhipsterHome']){
        done();
        return;
      }


      var prompts = [{
        type: 'input',
        name: 'directoryPath',
        message: 'Where is the parent directory of the JHipster monolith/gateway located ?',
        default: '../',
        validate: function (input) {
          var path = this.destinationPath(input).trim();
          path= path.replace(/\/?$/,'/');
          if(shelljs.test('-d', path)) {
            var files = shelljs.ls('-l',this.destinationPath(input).trim());
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
        this.directoryPath = props.directoryPath.trim().replace(/\/?$/,'/');

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

  writing: {
    validateAuthType: function () {
      if (this.appConfig.authenticationType === 'session') {
        this.env.error("Session authentication is not supported by the jhipster-ionic generator.")
      }
      if (this.appConfig.clientFramework === 'angular2') {
        this.env.error("Angular 2 is not supported by the jhipster-ionic generator.")
      }
    },

    //sets up a cordova project if the directory is empty
    initCordova: function () {
      if (this.options['cordova'] != false) {
        var done = this.async();
        this.spawnCommand('cordova', ['create', '.'])
          .on('close', function () {
            done();
          });
      }
    },

    //combines the config of the generator-m-ionic and generator-jhipster projects
    writeConfig : function () {
      var done = this.async();
      this.baseName = this.appConfig.baseName;
      this.packageName = this.appConfig.packageName;
      this.packageFolder = this.appConfig.packageFolder;
      this.angularAppBaseName  = snakeToCamel(this.appConfig.baseName);
      this.angularAppName = getAngularAppName(this.angularAppBaseName)
      this.searchEngine = this.appConfig.searchEngine;
      this.authenticationType = this.appConfig.authenticationType;
      this.serverPort = this.appConfig.serverPort;
      this.enableSocialSignIn = this.appConfig.enableSocialSignIn;
      this.applicationType = this.appConfig.applicationType;
      this.enableTranslation = this.appConfig.enableTranslation;
      this.enableWebsocket = this.appConfig.websocket;
      if (this.enableWebsocket === 'no') this.enableWebsocket = false;
      this.appConfig.jhipsterHome = this.jhipsterHome;

      this.jhiPrefix = this.appConfig.jhiPrefix || this.config.get('jhiPrefix') || this.options['jhi-prefix'] || 'jhi';
      this.jhiPrefixCapitalized = this.jhiPrefix.charAt(0).toUpperCase() + this.jhiPrefix.slice(1);

      // this.log('jhipsterHome=' + this.jhipsterHome);
      // this.log('baseName=' + this.baseName);
      // this.log('packageName=' + this.packageName);
      // this.log('angularAppName=' + this.angularAppName);
      // this.log('searchEngine=' + this.searchEngine); todo deal with this
      // this.log('enableSocialSignIn=' + this.enableSocialSignIn); todo deal with this
      // this.log('applicationType=' + this.applicationType);

      // create m-ionic's .yo-rc.json based on the JHipster project
      this.template('m-ionic/m-ionic.yo-rc', '.yo-rc.json', this, {});
      var fileData = this.fs.readJSON('.yo-rc.json');
      var config = fileData['generator-m-ionic'];
      config.answers.appName = this.baseName;
      config.answers.appModule = this.baseName;
      config.answers.appId = this.packageName;
      if (this.options['cordova'] == false){
        config.answers.cordova = false;
      }
      var finalConfig = {'generator-m-ionic': config, 'generator-jhipster': this.appConfig};
      fse.writeJson('.yo-rc.json', finalConfig, function(){
        //once the .yo-rc.json is written, call 'yo m ionic'
        done();
      });
    },
    //generates the m-ionic frontend based off of the choices above
    generateIonic: function () {
      var done = this.async();
      this.spawnCommandSync('yo', ['m-ionic', '--force', '--skip-install', '--skip-prompts']);
      jhipsterUtils.replaceContent({
        file: 'app/index.html',
        pattern: 'myProject',
        content: this.angularAppBaseName,
        regex: false
      }, this);
      done();
    },
    //copy over jhipster files into the m-ionic frontend
    copyJhipsterFiles: function () {
      var done = this.async();
      //copy interceptors, state handlers, and set up a login $ionicModal
      fse.copySync(this.jhipsterHome + '/src/main/webapp/app/app.constants.js', './app/main/jhipster/app.constants.js');
      fse.copySync(this.jhipsterHome + '/src/main/webapp/app/blocks', './app/main/jhipster/blocks');
      fse.copySync(this.jhipsterHome + '/src/main/webapp/app/services', './app/main/jhipster/services');
      fse.copySync(this.jhipsterHome + '/src/main/webapp/app/account', './app/main/jhipster/account');
      fse.copySync(this.jhipsterHome + '/src/main/webapp/app/components', './app/main/jhipster/components',
        //don't copy over login files since we write those ourselves
        {filter: function (name) {
          return (name.indexOf('login') == -1);
        }});
      fse.copySync(this.jhipsterHome+ '/src/main/webapp/app/admin/admin.state.js','./app/main/jhipster/admin/admin.state.js');
      if (this.enableWebsocket) {
        fse.copySync(this.jhipsterHome+ '/src/main/webapp/app/admin/tracker','./app/main/jhipster/admin/tracker');
      }
      //copy over JHipster images
      fse.copy(this.jhipsterHome + '/src/main/webapp/content/images/hipster.png', './app/main/assets/images/hipster.png', {});
      fse.copy(this.jhipsterHome + '/src/main/webapp/content/images/hipster2x.png', './app/main/assets/images/hipster2x.png', {});
      fse.copy(this.jhipsterHome + '/src/main/webapp/content/images/logo-jhipster.png', './app/main/assets/images/logo-jhipster.png', {});

      //remove list, list-detail, and debug controllers/templates from the default m-ionic project
      fse.remove('app/main/controllers/debug-ctrl.js');
      fse.remove('app/main/services/main-serv.js');
      fse.remove('app/main/templates/debug.html');
      fse.remove('app/main/templates/list.html');
      fse.remove('app/main/templates/list-detail.html');

      done();

    },

    //copy over custom Ionic/JHipster files such as the frontent.
    cleanupJhipsterCopy: function () {
      //  add bower items to app.js, run stateHandler in app.js, remove default URL from httpConfig
      this.template('m-ionic/_app.js', 'app/app.js', this, {});

      //custom statehandler with pagetitle removed.
      this.template('jhipster/_state.handler.js', 'app/main/jhipster/blocks/handlers/state.handler.js');

      //adding login and home state, authorities, authenticate for side-menu
      copyTemplate('m-ionic/_main.js', 'app/main/main.js', 'stripJs', this, {}, true);
      this.template('custom/_login-service.js', 'app/main/services/login-service.js');
      this.template('custom/_login-ctrl.js', 'app/main/controllers/login-ctrl.js');
      copyTemplate('custom/_login.html', 'app/main/templates/login.html', 'stripHtml', this, {}, true);
      this.template('custom/_menu-ctrl.js', 'app/main/controllers/menu-ctrl.js');
      copyTemplate('custom/_menu.html', 'app/main/templates/menu.html', 'stripHtml', this, {}, true);
      this.template('custom/_home-ctrl.js', 'app/main/controllers/home-ctrl.js');
      copyTemplate('custom/_home.html', 'app/main/templates/home.html', 'stripHtml', this, {}, true);

      copyTemplate('custom/account/_register.html', 'app/main/jhipster/account/register/register.html', 'stripHtml', this, {}, true);
      copyTemplate('custom/account/_activate.html', 'app/main/jhipster/account/activate/activate.html', 'stripHtml', this, {}, true);
      copyTemplate('custom/account/_password.html', 'app/main/jhipster/account/password/password.html', 'stripHtml', this, {}, true);
      copyTemplate('custom/account/_settings.html', 'app/main/jhipster/account/settings/settings.html', 'stripHtml', this, {}, true);
      copyTemplate('custom/account/_reset.request.html', 'app/main/jhipster/account/reset/request/reset.request.html', 'stripHtml', this, {}, true);
      copyTemplate('custom/account/_reset.finish.html', 'app/main/jhipster/account/reset/finish/reset.finish.html', 'stripHtml', this, {}, true);

      //websocket files
      if (this.enableWebsocket) {
        copyTemplate('custom/admin/_tracker.html', 'app/main/jhipster/admin/tracker/tracker.html', 'stripHtml', this, {}, true);
        this.template('jhipster/_tracker.service.js', 'app/main/jhipster/admin/tracker/tracker.service.js');
      }
      //add the $ionicHistory.clearCache() when changing languages to refresh view titles
      if (this.enableTranslation) {
        copyTemplate('custom/account/_settings.controller.js', 'app/main/jhipster/account/settings/settings.controller.js', 'stripJs', this, {}, true);
        this.template('m-ionic/gulp/building.js', 'gulp/building.js');
      }

      //add other folders to templates dir so html can be loaded from a JHipster structure
      jhipsterUtils.replaceContent({
        file: 'gulpfile.js',
        pattern: 'templates: [\'app/*/templates/**/*\'],',
        content: 'templates: [\'app/**/*.html\', \'!app/index.html\', \'!app/bower_components/**/*.html\'],',
        regex: false
      }, this);

    // setup CORS proxies to JHipster default ports
      this.template('m-ionic/gulp/watching.js', 'gulp/watching.js');
    //  setup config constants server urls so that testing on a device is simple
      this.template('m-ionic/constants/_env-dev.json', 'app/main/constants/env-dev.json');
      this.template('m-ionic/constants/_env-prod.json', 'app/main/constants/env-prod.json');
    // fix the two files that use $http instead of resource
      if (this.authenticationType === 'jwt') {
        this.template('jhipster/_auth.jwt.service.js', 'app/main/jhipster/services/auth/auth.jwt.service.js');
      } else if (this.authenticationType === 'oauth2') {
        this.template('jhipster/_auth.oauth2.service.js', 'app/main/jhipster/services/auth/auth.oauth2.service.js');
      }
      this.template('jhipster/_profile.service.js', 'app/main/jhipster/services/profiles/profile.service.js');
      copyTemplate('jhipster/_http.config.js', 'app/main/jhipster/blocks/config/http.config.js', 'stripJs', this, {}, true);

      //social login fix
      // if (this.enableSocialSignIn) {
        // copyTemplate('jhipster/_social.directive.js', 'app/main/jhipster/account/social/directive/social.directive.js', 'stripJs', this, {}, true);
        // copyTemplate('jhipster/_social.service.js', 'app/main/jhipster/account/social/social.service.js', 'stripJs', this, {}, true);
      // }
      //  copy styles into main.scss
      fse.readFile(this.templatePath('jhipster/_styles.scss'), 'utf8', function (err, data) {
        // console.log(data) // => css!
        fse.appendFile('app/main/styles/main.scss', data, function (err) {
          // console.log(err) // => no error!
        })
      })

    //  remove the ion-nav-bar from index because we are using the side-menu option (prevents random color every time from m-ionic)
      try {
        jhipsterUtils.replaceContent({
          file: 'app/index.html',
          pattern: '<!-- the[\\s\\S]*bar>',
          content: '',
          regex: true
        }, this);
      } catch (e) {
        this.log(chalk.yellow('\nUnable to find ') + filePath + chalk.yellow(' or missing required pattern. File rewrite failed.\n') + e);
      }
    },
    //fixes and wiring for the JHipster code to work correctly in the Ionic project
    jhipsterToIonic: function () {
      var done = this.async();
      //go through all of the items in the jhipster folder
      var items = walk('app/main/jhipster');
      for(var i = 0; i < items.length; i++) {

        //replace the angular module name with main
        try {
          jhipsterUtils.replaceContent({
            file: items[i],
            pattern: '\''+this.angularAppName+'\'',
            content: '\'main\'',
            regex: false
          }, this);
        } catch (e) {
          this.log(chalk.yellow('\nUnable to find ') + filePath + chalk.yellow(' or missing required pattern. File rewrite failed.\n') + e);
        }
        //rewrite file paths to match current directory structure
        try {
          jhipsterUtils.replaceContent({
            file: items[i],
            pattern: '\'app/account',
            content: '\'main/jhipster/account',
            regex: false
          }, this);
        } catch (e) {
          this.log(chalk.yellow('\nUnable to find ') + filePath + chalk.yellow(' or missing required pattern. File rewrite failed.\n') + e);
        }
        //admin path
        try {
          jhipsterUtils.replaceContent({
            file: items[i],
            pattern: '\'app/admin',
            content: '\'main/jhipster/admin',
            regex: false
          }, this);
        } catch (e) {
          this.log(chalk.yellow('\nUnable to find ') + filePath + chalk.yellow(' or missing required pattern. File rewrite failed.\n') + e);
        }
        //set parent states to app so that the menu bar is always visible
        try {
          jhipsterUtils.replaceContent({
            file: items[i],
            pattern: 'parent: \'account\'',
            content: 'parent: \'app\'',
            regex: false
          }, this);
        } catch (e) {
          this.log(chalk.yellow('\nUnable to find ') + filePath + chalk.yellow(' or missing required pattern. File rewrite failed.\n') + e);
        }

        try {
          jhipsterUtils.replaceContent({
            file: items[i],
            pattern: 'parent: \'admin\'',
            content: 'parent: \'app\'',
            regex: false
          }, this);
        } catch (e) {
          this.log(chalk.yellow('\nUnable to find ') + filePath + chalk.yellow(' or missing required pattern. File rewrite failed.\n') + e);
        }

        //replace content@ with pageContent to match m-ionic's view model
        try {
          jhipsterUtils.replaceContent({
            file: items[i],
            pattern: 'content@\':',
            content: 'pageContent\':',
            regex: false
          }, this);
        } catch (e) {
          this.log(chalk.yellow('\nUnable to find ') + filePath + chalk.yellow(' or missing required pattern. File rewrite failed.\n') + e);
        }
        //add the config consts to anything interacting with the API
        try {
          jhipsterUtils.replaceContent({
            file: items[i],
            pattern: '$inject = [\'$resource\'',
            content: '$inject = [\'$resource\', \'Config\'',
            regex: false
          }, this);
          jhipsterUtils.replaceContent({
            file: items[i],
            pattern: '($resource',
            content: '($resource, Config',
            regex: false
          }, this);
          jhipsterUtils.replaceContent({
            file: items[i],
            pattern: '$resource(\'api',
            content: '$resource(Config.ENV.SERVER_URL + \'api',
            regex: false
          }, this);
        } catch (e) {
          this.log(chalk.yellow('\nUnable to find ') + filePath + chalk.yellow(' or missing required pattern. File rewrite failed.\n') + e);
        }

      }
      done();

    },
    copyTranslationFiles: function () {
      var done = this.async();
      if (!this.enableTranslation) {
        done();
      } else {
        fse.copySync(this.jhipsterHome + '/src/main/webapp/i18n', './app/i18n');
      }
        done();
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

    this.template('m-ionic/gulp/_eslintignore', '.eslintignore');

  //replace with bower that has JQuery (and angular-translate if translation is enabled)
    this.template('jhipster/_bower.json', 'bower.json', this, {});

    this.installDependencies();
  },

  end: function () {
    var done = this.async();
    var fileData = this.fs.readJSON('.yo-rc.json');
    var config = fileData['generator-m-ionic'];
    var finalConfig = {'generator-m-ionic': config, 'generator-jhipster': this.appConfig};
    fse.writeJson('.yo-rc.json', finalConfig, function(){
      done();
    });
    // this.log('You\'re all set!  Run \'gulp watch\'');
  }
});


//JHipster code from utils.js and generator-base.js
//todo figure out the proper way to import generator-base rather than copying over
//yo composing with jhipster requires a .yo-rc.json to already exist which doesn't work here
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
function copyTemplate (source, dest, action, generator, opt, template) {

  var _this = generator || this;
  var _opt = opt || {};
  var regex;
  switch (action) {
    case 'stripHtml' :
      regex = /( translate\="([a-zA-Z0-9](\.)?)+")|( translate-values\="\{([a-zA-Z]|\d|\:|\{|\}|\[|\]|\-|\'|\s|\.)*?\}")|( translate-compile)|( translate-value-max\="[0-9\{\}\(\)\|]*")/g;
      //looks for something like translate="foo.bar.message" and translate-values="{foo: '{{ foo.bar }}'}"
      jhipsterUtils.copyWebResource(source, dest, regex, 'html', _this, _opt, template);
      break;
    case 'stripJs' :
      regex = /\,[\s\n ]*(resolve)\:[\s ]*[\{][\s\n ]*[a-zA-Z]+\:(\s)*\[[ \'a-zA-Z0-9\$\,\(\)\{\}\n\.\<\%\=\-\>\;\s]*\}\][\s\n ]*\}/g;
      //looks for something like mainTranslatePartialLoader: [*]
      jhipsterUtils.copyWebResource(source, dest, regex, 'js', _this, _opt, template);
      break;
    case 'copy' :
      _this.copy(source, dest);
      break;
    default:
      _this.template(source, dest, _this, _opt);
  }
};

/**
 * get the angular app name for the app.
 */
function getAngularAppName (baseName) {
    return _.camelCase(baseName, true) + (baseName.endsWith('App') ? '' : 'App');
};

