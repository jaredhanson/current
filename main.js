define(['exports', 'module',
        './lib/prototype',
        './lib/middleware/patch',
        './lib/utils'],
function(exports, module, proto, patch, utils) {
  
  function create() {
    function app(req, res) { app.handle(req, res); }
    utils.merge(app, proto);
    app.route = '/';
    app.stack = [];
    app.use(patch());
    for (var i = 0; i < arguments.length; ++i) {
      app.use(arguments[i]);
    }
    return app;
  }
  
  exports = module.exports = create;
});
