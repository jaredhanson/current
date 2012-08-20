define(['exports', 'module',
        '../response',
        'class'],
function(exports, module, Response, clazz) {
  
  module.exports = function(options) {
    options = options || {};
    options.overwrite = options.overwrite !== undefined ? options.overwrite : false;
    
    return function patch(req, res, next) {
      clazz.augment(res.constructor, Response, options);
      next();
    }
  }
});
