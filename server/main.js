import '../imports/api/tasks.js';
import '../imports/api/server/publications.js';
import '../imports/api/server/rest.js';

import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

// https://github.com/meteorhacks/npm
// https://atmospherejs.com/meteorhacks/npm
var express = Meteor.npmRequire('express');
Express = function() {
  var app = express();
  // https://atmospherejs.com/meteor/webapp
  WebApp.connectHandlers.use(Meteor.bindEnvironment(app));
  return app;
};

Meteor.startup(() => {
  const app = Express();
  // https://www.npmjs.com/package/express-nunjucks
  const nunjucks = Meteor.npmRequire('express-nunjucks');

  app.set('view engine', 'njk');
  app.set('views', process.env.PWD + '/server/templates');

  nunjucks.setup({
    // (default: true) controls if output with dangerous characters are escaped automatically.
    autoescape: true,
    // (default: false) if true, the system will automatically update
    // templates when they are changed on the filesystem.
    watch: true,
    // (default: false) if true, the system will avoid using a cache
    // and templates will be recompiled every single time.
    noCache: true,
    // (default: see nunjucks syntax) defines the syntax for nunjucks tags.
    tags: {}
  }, app);

  // serves the site, seo friendly
  app.get('/', (req, res) => {
    res.render('index.njk');
  });

  app.get('/about', (req, res) => {
    res.render('about.njk');
  });
});
