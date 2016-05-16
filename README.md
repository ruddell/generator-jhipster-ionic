# generator-jhipster-ionic
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module, Generates an ionic frontend from an existing JHipster project

# Introduction

The goal of this module is to generate an entire Ionic frontend from an existing JHipster project and its entities.  

Currently under development.
# Prerequisites
- JHipster ([Installing JHipster](https://jhipster.github.io/installation.html))
- Ionic and Cordova ([Installing Ionic](http://ionicframework.com/getting-started/))

To install everything needed, run:
```bash
 npm install -g cordova ionic generator-jhipster yo bower gulp
```
This module also requires an existing JHipster project to generate the corresponding frontend and entities.

__Currently JHipster v3.3.0 is the only completely supported version.__

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
From a new directory: 
```bash
yo jhipster-ionic
```
Follow the promts and enter the path to your JHipster's root directory (where the .yo-rc.json 
can be found).  Entity pages will also be generated from JSON files found in the `.jhipster ` folder.

# License

Apache-2.0 © [Jon Ruddell]

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-ionic.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-ionic
[travis-image]: https://travis-ci.org/ruddell/generator-jhipster-ionic.svg?branch=master
[travis-url]: https://travis-ci.org/ruddell/generator-jhipster-ionic
[daviddm-image]: https://david-dm.org/ruddell/generator-jhipster-ionic.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ruddell/generator-jhipster-module
