var Constants, Player, Sprite,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (module) {
  Sprite = require('./sprite');
  Constants = require('./constants');
}

Player = (function(_super) {

  __extends(Player, _super);

  function Player(x, y, isP2) {
    this.x = x;
    this.y = y;
    this.isP2 = isP2;
    this.score = 0;
    this.width = Globals.sizeRatio * 30 * .6;
    this.height = Globals.sizeRatio * 70 * .6;
    this.curDir = 'Up';
    this.offset = this.height / 2;
    /*
    		@bg = document.createElement( 'canvas' )
    		ctx = @bg.getContext('2d')
    		ctx.fillStyle = '#361B09'
    		ctx.fillRect( 1, @height / 2 + 1, @width - 1, @height / 2 - 1)
    		ctx.fillStyle = '#fff'
    		ctx.strokeRect( 0, @height / 2, @width, @height / 2 )
    		ctx.fillStyle = '#fff' # swort
    		ctx.fillRect( 0, 0, @width / 5, @height / 2 )
    */

    /*
    		canv = document.createElement( 'canvas' )
    		ctx = canv.getContext( '2d' )
    		ctx.drawImage Globals.Loader.getAsset( 'player' ), 0, 0, @width, @height # can't do this because of svg anim
    */

    Player.__super__.constructor.call(this, this.x, this.y, this.width, this.height, Globals.Loader.getAsset('playerUp'));
  }

  Player.prototype.handleInput = function(input) {
    var pNum;
    pNum = 0;
    if (input.left(pNum) && this.left > 0) {
      this.velocity.x = -3 * Globals.sizeRatio;
    } else if (input.right(pNum) && this.right < Globals.scene.width) {
      this.velocity.x = 3 * Globals.sizeRatio;
    } else {
      this.velocity.x = 0;
    }
    if (input.up(pNum) && this.top > 0) {
      return this.velocity.y = -3 * Globals.sizeRatio;
    } else if (input.down(pNum) && this.bottom < Globals.scene.height) {
      return this.velocity.y = 3 * Globals.sizeRatio;
    } else {
      return this.velocity.y = 0;
    }
  };

  Player.prototype.toggleDirection = function() {
    var dir;
    dir = this.curDir === 'Up' ? 'Down' : 'Up';
    this.bg = Globals.Loader.getAsset('player' + dir);
    this.curDir = dir;
    return this.offset *= -1;
  };

  Player.prototype.incrementPosition = function(numFrames) {
    Player.__super__.incrementPosition.call(this, numFrames);
    if (this.curDir === 'Up') {
      return this.top += this.offset;
    } else {
      return this.bottom += this.offset;
    }
  };

  Player.prototype.draw = function(ctx) {
    return Player.__super__.draw.call(this, ctx);
  };

  return Player;

})(Sprite);

if (module) {
  module.exports = Player;
}