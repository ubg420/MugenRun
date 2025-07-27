
phina.define('Title', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });


    this.endFLG = localStorage.getItem('endFLG'); 
    this.stage4FLG = localStorage.getItem('Stage4FLG'); 


    //localStorage.clear();  


    this.fromJSON({
      children: {
        bg: {
          className: 'Sprite',
          arguments: 'background',
          originX: 0,
          originY: 0,
        },
        blockGroup: {
          className: 'DisplayElement',
        },
        fireGroup: {
          className: 'DisplayElement',
        },
        scoreBoxGroup: {
          className: 'DisplayElement',
        },

      },
    });

    this.score = 0;
    this.isStart = false;

    this.effectGroup = DisplayElement().addChildTo(this);

    
    var block1 = BlockT(0,800).addChildTo(this.blockGroup);
    var bwidth = block1.width - 7;
    var block2 = BlockT(bwidth,800).addChildTo(this.blockGroup);
    var block3 = BlockT(bwidth*2,800).addChildTo(this.blockGroup);
    var block4 = BlockT(bwidth*3,800).addChildTo(this.blockGroup);
    var block5 = BlockT(bwidth*4,800).addChildTo(this.blockGroup);
    var block6 = BlockT(bwidth*5,800).addChildTo(this.blockGroup);
    var block7 = BlockT(bwidth*6,800).addChildTo(this.blockGroup);


    this.sprite = Sprite('character').addChildTo(this);
    this.sprite.anim = FrameAnimation('character').attachTo(this.sprite);
    this.sprite.anim.gotoAndPlay('fly');
    this.sprite.anim.fit = false;
    this.sprite.setSize(80,80);
    this.sprite.setPosition(this.gridX.center(),this.gridY.center(4.35));

    this.onclick = function() {
      if (!this.isStart) {
        var context = phina.asset.Sound.getAudioContext();
        context.resume();
        SoundManager.play("coin");

        this.exit('Stage1');


      }

    };

    this.muzusa = 0;

        // ラベルを表示
    this.startlabel = Label('Mugen Run').addChildTo(this);
    this.startlabel.setPosition(this.gridX.center(0),this.gridY.center());
    this.startlabel.fill = 'white'; // 色を変更
    this.startlabel.strokeWidth = 8;
    this.startlabel.fontSize = 64; // フォントサイズを変更
    this.startlabel.fontFamily = "def"; // フォントサイズを変更

    this.startlabel.tweener
      .clear()
      .to({alpha:1,scaleX:1,scaleY:1}, 700,"easeOutSine")
      .wait(400)
      .to({alpha:0,scaleX:0.8,scaleY:0.8}, 700,"easeInSine")
      .setLoop(true);


  
  },

  update: function(app) {



    if (this.endFLG){
      if(this.endFLG == 'yes'){
        this.exit('Main');
      }else{
        this.exit('Fin');
      }
    }else if (this.stage4FLG){
      this.exit('Memo5');
    } 




    
  },





  _accessor: {
    score: {
      get: function() { return this._score; },
      set: function(v) {
        this._score = v;
      }
    }
  }
});


phina.define("BlockT", {
  superClass: "DisplayElement",
  
  init: function(x,y) {
      this.superInit();

      this.x = x;
      this.y = y;
      
      this.width = 200;
      this.height = 40;

      this.sprite = Sprite('block').addChildTo(this);
      this.sprite.y = (this.sprite.height / 2) - 30;


      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      this.vx = -BLOCKSPEED;
      this.vy = 0;

      this.hitFLG = false;




  },
  
  update: function(app) {



  },
  

});


