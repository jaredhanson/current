define({
  
  getHeader: function(name) {
    if (!this.headers) return;
    return this._headers[name];
  },
  
  setHeader: function(name, value) {
    this.headers = this.headers || {};
    this.headers[name] = value;
  }
  
});
