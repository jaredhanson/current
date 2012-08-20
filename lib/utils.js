define({
  
  merge: function(a, b) {
    if (a && b) {
      for (var key in b) {
        a[key] = b[key];
      }
    }
    return a;
  },
  
  escape: function(html) {
    return String(html)
      .replace(/&(?!\w+;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  
});
