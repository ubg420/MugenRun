phina.define('Player', {
  superClass: 'DisplayElement',

  init: function(index) {
    this.superInit({
      width: 32,
      height: 22,
    });

    this.sprite = Sprite('character').addChildTo(this);
    this.sprite.anim = FrameAnimation('character').attachTo(this.sprite);
    this.sprite.anim.gotoAndPlay('fly');
    this.sprite.anim.fit = false;
    this.sprite.setSize(80,80);
    this.sprite.y = - this.sprite.height /2 + this.height;

    this.Colision = RectangleShape().addChildTo(this);
    this.Colision.width = this.width;
    this.Colision.height = this.height;
    this.Colision.alpha = 0;

    this.power = 0;
    this.vy = 0;
    this.jumpFLG = false;
  },

  update: function() {

    this.rotation = this.physical.velocity.y*0.5;

    if(this.hitCheck()){
      this.hit();
    }else{
      this.rakka();
    }

    if(this.y > SCREEN_HEIGHT + 100 && !GameMain.gameoverFLG){
      GameMain.gameover();
    }

  },


  jump: function(){
    if (this.jumpFLG){
      this.power = 0;
      return;
    }
    this.jumpFLG = true;
    SoundManager.play("touch");

    var jumppower = this.power + 10;
    this.physical.force(0, -jumppower);
    this.power = 0;
    var hiteffect = HitEffect('hit','hitSS').addChildTo(GameMain.effectGroup);
    hiteffect.x = this.x + 10;
    hiteffect.y = this.y + 30;
    hiteffect.setSize(60, 60);

  },

  tame:function(){
    this.power+= 1.3;
    if(GameMain.maxPower < this.power){
      this.power = GameMain.maxPower;
    }
  },

  hitCheck: function() {

    // チューブとの衝突判定
    var tyakutiFLG = false;
    GameMain.blockGroup.children.each(function(child) {

        if (this.hitTestElement(child)) {

          if(this.physical.velocity.y >= 0){

            if(!child.hitFLG){
              GameMain.addTyakutiCount();
            }

            this.y = child.y - child.height + 8;
            child.hitFLG = true;
            tyakutiFLG = true;
          }
        }

    }, this);

    return tyakutiFLG;
  },

  hit: function () {
    this.physical.force(0, 0);
    this.physical.gravity.set(0, 0);
    this.jumpFLG = false;

  },

  rakka:function(){
    this.physical.gravity.set(0, 2);


  },

  toFire: function() {
    this.fireFLG =true;
    this.sprite.anim.gotoAndPlay('tofire');
    this.fireTimer = 0;
    SoundManager.play('powerup');


  },

  toFly:function(){
    this.fireFLG =false;
    this.sprite.anim.gotoAndPlay('tofly');
    this.fireTimer = 0;

  },

  fall: function() {
    this.lock = true;
    this.physical.force(0, -5);

  },
});
