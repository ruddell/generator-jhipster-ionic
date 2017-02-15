# generator-jhipster-ionic
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generates an Ionic frontend from an existing JHipster project, supports all authentication types and translation.

# Introduction

The goal of this module is to generate an M-Ionic frontend from an existing JHipster project.  

An example from start to finish can be seen:
 
[![Youtube Demo](https://cloud.githubusercontent.com/assets/4294623/22621563/641a78c8-eadb-11e6-878b-b2299dd19e78.jpeg)](https://www.youtube.com/watch?v=XZIKsBdxuOg)

###Key Features
Login, Registration, Settings, Password Change, and Password Reset all function the same as in a regular JHipster 
application, except with an Ionic frontend.

CORS proxy is set up in gulp/watching.js to forward gulp's live-reload to a running JHipster server.  If the JHipster 
application is running on port 8080, you should be able to log in from gulp's live-reload.  Default proxies are below.

Gulp Path | Proxies To JHipster
------------- | -------------
http://localhost:3000/api  | http://localhost:8080/api
http://localhost:3000/oauth  | http://localhost:8080/oauth
**Please note:** If you are running microservices, you will need to add proxy paths for each of the microservice routes.

 
##### Supports:
- Auth
  - OAuth2
  - JWT
- App Types
  - Monolith
  - Gateway/Microservices
- Translation
- Websockets (see Websocket section for setup)

##### Unsupported
- Session Auth
- Social Login

# Prerequisites
- JHipster ([Installing JHipster](https://jhipster.github.io/installation.html))
- M-Ionic ([Installing M-Ionic](https://github.com/mwaylabs/generator-m-ionic/blob/master/docs/start/installation_prerequisites.md))

To install everything needed, run:
```bash
 npm install -g ionic yo bower gulp generator-m-ionic cordova
```
This module also requires an existing AngularJS JHipster project to copy the authentication files from.  It will not 
work with Angular 2.

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
yo jhipster-ionic --force
```
Follow the prompts and enter the path to your JHipster project's parent directory.  Choose the JHipster project from 
which to generate the Ionic project.  A Cordova project and an M-Ionic front-end are generated in the current directory.
  JHipster files are then be copied and formatted into the Ionic project.

Currently all JHipster files are copied to the 'app/main/jhipster' folder (except translations, see below).  The rest of 
the app follows [M-Ionic's project structure](https://github.com/mwaylabs/generator-m-ionic/blob/master/docs/start/file_structure.md).

To run your app with live-reload and a CORS proxy, run:
```bash
gulp watch
```
CORS settings can be found in gulp/watching.js.  Endpoints are set up for /oauth and /api to http://localhost:8080. 
If you are running microservices, you will need to add proxy paths for each of the microservice routes.  If you need 
CORS on your server backend, uncomment the CORS section in `src/main/resources/config/application.yml` of your JHipster
 project.

M-Ionic provides a massive tool set for an Ionic app.  For example, cordova commands have a wrapper through gulp. Check 
out [M-Ionic's Dev Intro](https://github.com/mwaylabs/generator-m-ionic/blob/master/docs/start/development_intro.md) to 
see how to use them.


# Translation

Translations are copied over from the JHipster project into the app/i18n/ folder.  If you update your translations, 
either manually copy them over or re-run the generator.

# Websocket
If your ionic client shows 403 forbidden or "Origin header value 'http://localhost:3000' not allowed." in JHipster
 application, then you must configure
   WebsocketConfiguration.java as follows:
```java
public void registerStompEndpoints(StompEndpointRegistry registry) {
         registry.addEndpoint("/websocket/tracker")
         /*add the line below */
        .setAllowedOrigins("*")
        .withSockJS().setInterceptors(httpSessionHandshakeInterceptor());
}
```
# On Device

To run the app on a device/emulator:
- Set up config.xml
- Add the platforms you need
  - iOS: Ensure you have the proper provisioning profile
- Make sure to specify the API url in *constants/env-prod.json* and build with --env=prod to inject the URL into all 
files contacting the API.
- Run the cordova command (use the wrapper to build the project before deploying it)
```bash
gulp --cordova 'run ios --device'
```

# To Do
- Entity CRUD Pages
- Admin Pages
- Re-enable ESLint - app folder is ignored in .eslintignore
- Rewrite files as they are copied instead of prompting the user to overwrite them (reason --force is in the initial 
command).

# Thanks To

- [JHipster](https://github.com/jhipster/generator-jhipster)
- [M-Ionic](https://github.com/mwaylabs/generator-m-ionic)
- [Jhipster-Ionic](https://github.com/gmarziou/jhipster-ionic)
- [JHipster Module Generator](https://github.com/jhipster/generator-jhipster-module)
- [Original JHipster Docker-Compose Module](https://github.com/jhipster/generator-jhipster-docker-compose)

# Release Notes
- v2.2.1 - Fix angular apps with capitalized base names
- v2.2.0 - Prevent generation JHipster apps with Session or NG2 selected
- v2.1 - Add Websocket support
- v2 - Add Translation support
- v1.1 - Set up a CORS proxy for developing locally.
- v1 - Basic Ionic application with JHipster authentication features.
# License

Apache-2.0 © [Jon Ruddell]

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-ionic.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-ionic
[travis-image]: https://travis-ci.org/ruddell/generator-jhipster-ionic.svg?branch=master
[travis-url]: https://travis-ci.org/ruddell/generator-jhipster-ionic
[daviddm-image]: https://david-dm.org/ruddell/generator-jhipster-ionic.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ruddell/generator-jhipster-module
