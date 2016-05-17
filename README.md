# generator-jhipster-ionic
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generates an Ionic frontend from an existing JHipster project

# Introduction

The goal of this module is to generate an  M-Ionic frontend from an existing JHipster project.  

v1.0.0 generates and wires all of the required files for accounts (login, register, settings, password change/reset).   It also sets up a CORS proxy through gulp to allow your app to connect to a running JHipster project on a different port. 
 
Session, OAuth, and JWT authentication are fully functional, Social Login is not implemented yet.  Translation is untested.

# Prerequisites
- JHipster ([Installing JHipster](https://jhipster.github.io/installation.html))
- M-Ionic ([Installing M-Ionic](https://github.com/mwaylabs/generator-m-ionic/blob/master/docs/start/installation_prerequisites.md))
- Cordova

To install everything needed, run:
```bash
 npm install -g generator-jhipster generator-m-ionic cordova ionic yo bower gulp
```
This module also requires an existing JHipster project to copy the authentication files from.

# Installation

To install this module:

```bash
npm install -g generator-jhipster-ionic
```

To update this module:
```bash
npm update -g generator-jhipster-ionic
```

# Usage
From a completely empty directory: 
```bash
yo jhipster-ionic
```
Follow the prompts and enter the path to your JHipster project's root directory (where the .yo-rc.json 
can be found).  In the future, entity pages will be generated from JSON files found in the `.jhipster ` folder.

Currently all jhipster files are copied to the 'app/main/jhipster' folder.  The rest of the app follows [M-Ionic's project structure](https://github.com/mwaylabs/generator-m-ionic/blob/master/docs/start/file_structure.md).

To run your app with live-reload and a CORS proxy, run:
```bash
gulp watch
```
CORS settings can be found in gulp/watching.js.  Endpoints are set up for /oauth and /api. If you are running microservices, 
you will need to add proxy paths for each of the microservice routes.

M-Ionic provides a massive tool set for an ionic app.  For example, cordova commands have a wrapper through gulp.  Check out [M-Ionic's Dev Intro](https://github.com/mwaylabs/generator-m-ionic/blob/master/docs/start/development_intro.md) to see how to use them.


# On Device

To run the app on a device/emulator:
- Set up config.xml
- Add the platforms you need
  - iOS: Ensure you have the proper provisioning profile
- Run the cordova command (use the wrapper to build the project before deploying it)
```bash
gulp --cordova 'run ios --device'
```

__In v1.0.0 you will need to change the URLs to point at a running JHipster project when deploying to a device or emulator__

# To Do
- Entity CRUD Pages
- Admin Pages
- Re-enable ESLint
- Simplify testing on a device

# Thanks To

- [JHipster](https://github.com/jhipster/generator-jhipster)
- [M-Ionic](https://github.com/mwaylabs/generator-m-ionic)
- [Jhipster-Ionic](https://github.com/gmarziou/jhipster-ionic)
- [JHipster Module Generator](https://github.com/jhipster/generator-jhipster-module)
- [Original JHipster Docker-Compose Module](https://github.com/jhipster/generator-jhipster-docker-compose)

# License

Apache-2.0 © [Jon Ruddell]

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-ionic.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-ionic
[travis-image]: https://travis-ci.org/ruddell/generator-jhipster-ionic.svg?branch=master
[travis-url]: https://travis-ci.org/ruddell/generator-jhipster-ionic
[daviddm-image]: https://david-dm.org/ruddell/generator-jhipster-ionic.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ruddell/generator-jhipster-module
