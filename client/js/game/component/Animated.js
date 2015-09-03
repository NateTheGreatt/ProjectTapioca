define(['game','component/Component'],
function(game, Component) {
  function Animated(parent, opts) {
    Component.call(this, parent);
    this.name = 'Animated';

    this.lastPos = {x: parent.x, y: parent.y};

  }

  Animated.prototype = Object.create(Component.prototype);
  Animated.prototype.constructor = Animated;

  Animated.prototype.update = function() {

    if(this.parent.x > this.lastPos.x) {
      // right
    }

    if(this.parent.x < this.lastPos.x) {
      // left
    }

    if(this.parent.y < this.lastPos.y) {
      // up
    }

    if(this.parent.y > this.lastPos.y) {
      // down
    }

    this.lastPos.x = this.parent.x;
    this.lastPos.y = this.parent.y;
  }

  return Animated;
})
