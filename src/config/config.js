'use strict';

/**
 * Module Dependencies
 */

var pkg               = require('../../package.json');

var config            = {};

// From package.json
config.name           = pkg.name;
config.version        = pkg.version;
config.description    = pkg.description;
config.company        = pkg.company;
config.author         = pkg.author;
config.keywords       = pkg.keywords;
config.engine         = pkg.engines.node || pkg.engines.iojs;

config.port           = process.env.PORT || 3000;
config.ga             = process.env.GA   || 'google analytics key';

/*
// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// MariaDB DATABASE_URL = mariadb://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var Name     = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
*/
config.db            = {};

config.db.name     = 'museo';
config.db.user     = 'umuseo';
config.db.pwd      = '123456';
config.db.dialect  = 'mysql';
config.db.protocol = 'mysql';
config.db.port     = '3306';
config.db.host     = 'localhost';
config.db.storage  = process.env.DATABASE_STORAGE || 'museo.sqlite';


/**
 * Logging Configuration
 */

config.logging        = process.env.LOGGING || false;

module.exports = config;
