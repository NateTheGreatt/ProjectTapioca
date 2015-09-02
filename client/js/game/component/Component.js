define([],
function(){
  function Component(parent) {
    this.parent = parent;
  }

  Component.prototype.update = function() {};

  return Component;
});
