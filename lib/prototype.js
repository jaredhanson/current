define(['exports'],
function(exports) {
  
  exports.use = function(route, fn) {
    // default route to '/'
    if ('string' != typeof route) {
      fn = route;
      route = '/';
    }
    
    // wrap sub-apps
    if ('function' == typeof fn.handle) {
      var server = fn;
      fn.route = route;
      fn = function(req, res, next) {
        server.handle(req, res, next);
      };
    }
    
    // strip trailing slash
    if ('/' == route[route.length - 1]) {
      route = route.slice(0, -1);
    }

    // add the middleware
    this.stack.push({ route: route, handle: fn });
    
    return this;
  }
  
  exports.handle = function(req, res, out) {
    var stack = this.stack
      , index = 0
      , removed = '';
    
    function next(err) {
      var layer, path, status, c;
      
      req.url = removed + req.url;
      req.originalUrl = req.originalUrl || req.url;
      removed = '';
      
      // next callback
      layer = stack[index++];
      
      // TODO: Implement this.
      if (!layer) {
        console.log('all done!')
        return;
      }
      
      try {
        // TODO: Implement URL parsing in Anchor.
        //path = utils.parseUrl(req).pathname;
        path = req.url;
        if (undefined == path) path = '/';
        
        // skip this layer if the route doesn't match.
        if (0 != path.indexOf(layer.route)) return next(err);
        
        // TODO: What is this checking for?
        c = path[layer.route.length];
        if (c && '/' != c && '.' != c) return next(err);
        
        // trim off the part of the url that matches the route
        removed = layer.route;
        req.url = req.url.substr(removed.length);
        
        // call the layer handler
        var arity = layer.handle.length;
        if (err) {
          if (arity === 4) {
            layer.handle(err, req, res, next);
          } else {
            next(err);
          }
        } else if (arity < 4) {
          layer.handle(req, res, next);
        } else {
          next();
        }
      } catch (e) {
        next(e);
      }
    }
    next();
  }
  
});
