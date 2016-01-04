
  'use strict';
  function Play() {
    this.graphics = null;
    this.points = {"x": [], "y": []};
    this.registered = false;
  }

  Play.prototype = {

    init: function () {
      this.game.renderer.renderSession.roundPixels = true;
    },
    create: function() {
      this.graphics = this.game.add.graphics(this.game.width, this.game.height);

      // this.game.physics.startSystem(Phaser.Physics.ARCADE);
      // this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
      // this.sprite.inputEnabled = true;
      
      // this.game.physics.arcade.enable(this.sprite);
      // this.sprite.body.collideWorldBounds = true;
      // this.sprite.body.bounce.setTo(1,1);
      // this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
      // this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

      // this.sprite.events.onInputDown.add(this.clickListener, this);

    },
    plot: function() {
      console.log("plot()");
      this.graphics.clear();
      this.graphics.lineStyle(3, 0xcccccc, 0.5);
      this.graphics.moveTo(this.points.x[0], this.points.y[0]);
      var x = 1 / (this.game.width); // * this.points.x.length
      for (var i = 0; i <= 1; i += x) {
        var px = this.math.catmullRomInterpolation(this.points.x, i);
        var py = this.math.catmullRomInterpolation(this.points.y, i);

        this.graphics.lineTo(px, py);
        // for (var p = 0; p < this.points.x.length; p++) {
        //   this.graphics.rect(this.points.x[p], this.points.y[p], 1, 1, 'rgba(255, 0, 0, 1');
        // }
      }
    },
    update: function() {
      if (!this.registered && this.game.input.activePointer.isDown) {
        this.registered = true;
        console.log("pointer clicking on update");
        console.log("click @ " + this.game.input.x + " " + this.game.input.y);
        this.points.x.push(this.game.input.x);
        this.points.y.push(this.game.input.y);
        console.log("x points: " + this.points.x);
        this.plot();
      } else if (this.game.input.activePointer.isUp) {
        this.registered = false;
      }
    },
    clickListener: function() {
      console.log("clickListener()");
      console.log("click @ " + this.game.input.x + " " + this.game.input.y);
      // this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;