
phina.define('Stage1', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });

    GameMain = this;
    
    this.fromJSON({
      children: {
        bg: {
          className: 'Sprite',
          arguments: 'background',
          originX: 0,
          originY: 0,
        },
        backGroup: {
          className: 'DisplayElement',
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

    this.player = Player().addChildTo(this);
    this.player.setPosition(this.gridX.span(2), this.gridY.center());


    this.onpointstay = function() {
      this.player.tame();
    };
    this.onpointend = function() {
      this.player.jump();
    };


    this.onclick = function() {
      if (!this.isStart) {
        var context = phina.asset.Sound.getAudioContext();
        context.resume();
        SoundManager.play("coin");

        this.player.physical.gravity.set(0, 2);
        this.isStart = true;
      }

    };

    this.muzusa = 0;



    this.nextItemCount = 14;
    this.firstItemCount = 8;
    this.itemCount = this.firstItemCount;


    this.maxPower = JUMPPOWER;

    this.powerUI = DisplayElement().addChildTo(this);
    this.powerUI.setPosition(this.gridX.center(),this.gridY.center(-7));
    this.maxPowerWidth = 300;

    this.powerGauge = RectangleShape().addChildTo(this.powerUI);
    this.powerGauge.width = this.maxPowerWidth;
    this.powerGauge.height =  30;
    this.powerGauge.y = 11;
    this.powerGauge.x = -155;
    this.powerGauge.alpha = 1; //コリジョン可視化 = 1
    this.powerGauge.fill = "red";
    this.powerGauge.stroke = 'black';
    this.powerGauge.strokeWidth = 11;  
    this.powerGauge.cornerRadius = 1;  
    this.powerGauge.origin.set(0,0.5);

    this.powerValueGauge = RectangleShape().addChildTo(this.powerGauge);
    this.powerValueGauge.width = this.maxPowerWidth;
    this.powerValueGauge.height =  30;
    this.powerValueGauge.alpha = 1; //コリジョン可視化 = 1
    this.powerValueGauge.fill = "limegreen";
    this.powerValueGauge.stroke = 'black';
    this.powerValueGauge.strokeWidth =  0;  
    this.powerValueGauge.cornerRadius = 1;  
    this.powerValueGauge.origin.set(0,0.5);

    this.powerLabel = Label('power').addChildTo(this.powerUI);
    this.powerLabel.fill = 'black'; // 色を変更
    this.powerLabel.fontSize = 25; // フォントサイズを変更
    this.powerLabel.fontFamily = 'def';
    this.powerLabel.x = -75;
    this.powerLabel.y = -22;

    this.changePower(0);

    var block1 = Block(0,800).addChildTo(this.blockGroup);
    var bwidth = block1.width - 7;
    var block2 = Block(bwidth,800).addChildTo(this.blockGroup);
    var block3 = Block(bwidth*2,800).addChildTo(this.blockGroup);
    var block4 = Block(bwidth*3,800).addChildTo(this.blockGroup);
    var block5 = Block(bwidth*4,800).addChildTo(this.blockGroup);
    var block6 = Block(bwidth*5,800).addChildTo(this.blockGroup);
    var block7 = Block(bwidth*6,800).addChildTo(this.blockGroup);

    block1.hitFLG = true;
    block2.hitFLG = true;
    block3.hitFLG = true;
    block4.hitFLG = true;
    block5.hitFLG = true;
    block6.hitFLG = true;
    block7.hitFLG = true;


    this.gameoverFLG = false;

    SoundManager.playMusic("bgm");



  },

  update: function(app) {
    this.changePower(this.player.power);
    this.score++;


    if (app.frame % 40 === 0) {
      var x = SCREEN_WIDTH + this.width;
      var ry =  Math.floor((Math.random() * 650)) +150 ;

      var block = Block(x,ry).addChildTo(this.blockGroup);
    }

  },

  changePower:function(power){

    var hpWidth = power/this.maxPower * this.maxPowerWidth;
    this.powerValueGauge.width = hpWidth;
  },


  gameover: function() {
    this.gameoverFLG = true;

    var dialog = GameOverDialog1({
      score: this.score,
    });
    this.app.pushScene(dialog);

    dialog.onexit = function() {
      this.exit('Stage1');
    }.bind(this);

  },

  addTyakutiCount:function(){
    TYAKUTICOUNT++;
    console.log(TYAKUTICOUNT);
    this.checkTyakutiCount();

  },

  checkTyakutiCount:function(){

    var bagstart = 25;

    switch (TYAKUTICOUNT) {

/*
      case 33:
        //背景ズーム
        var waitTime =  Math.floor((Math.random() * 2000));

        this.bg.tweener
        .clear()
        .wait(waitTime)
        .by({scaleX: 12,scaleY:12}, 1444)
        ;



        break;
*/

      case bagstart:
      //背景バグる
      var waitTime =  Math.floor((Math.random() * 2000));
      this.bg.tweener
      .wait(waitTime)
      .call(function() {
        this.bg.setImage('back2');
        SoundManager.pauseMusic();
        SoundManager.play("pii");
      }, this)
      .by({x: -50,}, 110,'easeOutBack')
      .by({x: 50,}, 110,'easeOutBack')
      .call(function() {
        this.bg.setImage('background');
        SoundManager.resumeMusic();

      }, this);

      break;





      case bagstart+5:
      //前景バグ
      SoundManager.pauseMusic();
      var sprite = Sprite('back3').addChildTo(this);
      sprite.setPosition(this.gridX.center(),this.gridY.center());
      sprite.scaleX = 1.2;
      sprite.scaleY = 1.2;

      var waitTime =  Math.floor((Math.random() * 2000));
      sprite.tweener
      .by({y: -50,}, 10,'easeOutBack')
      .by({y: 50,}, 10,'easeOutBack')
      .by({x: -50,}, 10,'easeOutBack')
      .by({x: 30,}, 10,'easeOutBack')
      .call(function() {

        SoundManager.resumeMusic();
        sprite.remove();

      }, this);

      break;



/*
      case bagstart+20:
        //プレイヤー伸びる
        var waitTime =  Math.floor((Math.random() * 2000));
        this.player.tweener
        .wait(waitTime)
        .to({scaleX:100,scaleY:0.3}, 11000)
        .to({scaleX:1,scaleY:1}, 50)
        .call(function() {


        }, this);

        break;
*/

      case bagstart+11:
      //ゆらゆらpowerバー
      var waitTime =  Math.floor((Math.random() * 2000));
      this.powerUI.tweener
      .wait(waitTime)
      .to({x:200,y: 850,}, 110)
      .to({x:600,y: 450,}, 111,)
      .to({x:500,y: 550,rotation:320}, 42,)
      .to({x:500,y: 350,}, 55)
      .to({x:100,y: 250,}, 110,)
      .to({x:500,y: 450,scaleX:5}, 55,'easeOutBack')
      .to({x:400,y: 850,}, 55,)
      .to({x:300,y: 250,scaleX:1,rotation:240}, 55,)
      .to({x:500,y: 550,}, 42,'easeOutBack')
      .to({x:50,y: 350,scaleX:4}, 55,)
      .to({x:100,y: 250,}, 110,)
      .to({x:500,y: 450,scaleX:5}, 55,'easeOutBack')
      .to({x:400,y: 850,}, 55,)
      .to({x:500,y: 450,scaleX:5}, 55,'easeOutBack')
      .to({x:400,y: 850,}, 55,)
      .to({x:500,y: 450,scaleX:5}, 55,'easeOutBack')
      .to({x:400,y: 850,}, 55,)
      .to({x:300,y: 250,scaleX:1,rotation:1220}, 55,)
      .to({x:500,y: 550,}, 42,'easeOutBack')
      .to({x:50,y: 350,scaleX:4}, 55,)
      .to({x:450,y: 122,scaleX:1}, 55,)
      .to({x:500,y: 550,rotation:90}, 42,)
      .to({x:500,y: 350,}, 55)
      .to({x:100,y: 250,}, 110,)
      .to({x:300,y: 250,scaleX:1,rotation:200}, 55,)
      .to({x:500,y: 550,}, 42,'easeOutBack')
      .to({x:50,y: 350,scaleX:4}, 55,)
      .to({x:450,y: 122,scaleX:1}, 55,)

      .call(function() {


      }, this);

      break;






      case bagstart+13:
      //絵

      var waitTime =  Math.floor((Math.random() * 444));
      this.tweener
      .wait(waitTime)
      .call(function() {
        this.app.pushScene(WhiteScene());
      }, this)

      break;






      case bagstart + 17:
        //背景まわる
        var waitTime =  Math.floor((Math.random() * 2000));


        this.bg.tweener
        .clear()
        .wait(waitTime)
        .by({rotation: 1200}, 1444)
        .wait(500)
        .to({rotation: 0}, 444)
        ;



        break;


        
        case bagstart+21:
        //背景バグる
        var waitTime =  Math.floor((Math.random() * 2000));
        this.bg.tweener
        .wait(waitTime)
        .call(function() {
          this.bg.setImage('back2');
          SoundManager.pauseMusic();
          SoundManager.play("pii");
        }, this)
        .by({y: -50,}, 110,'easeOutBack')
        .by({x: 50,}, 110,'easeOutBack')
        .call(function() {
          this.bg.setImage('background');
          SoundManager.resumeMusic();
  
        }, this);
  
        break;
  

        case bagstart+26:

        //背景フェード
        var back = Sprite('e2').addChildTo(this.backGroup);
        back.alpha = 0;
        back.scaleX = 2;
        back.scaleY = 2;
        back.setPosition(this.gridX.center(2),this.gridY.center());

        var waitTime =  Math.floor((Math.random() * 2000));
        back.tweener
        .to({alpha:1},11000)
        .to({alpha:0},7000)
        .call(function() {
          back.remove();
        }, this)

        break;

        case bagstart+33:
          SoundManager.stopMusic();
           this.exit('Memo')
           TYAKUTICOUNT = 0;
        break;


    
      default:
        break;
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

phina.define('Floor', {
  superClass: 'PlainElement',

  init: function() {
    this.superInit();

    this.canvas.width = 300+64;
    this.canvas.height = FLOOR_HEIGHT;
    this.originX = 0;
    this.originY = 1;
    this.padding = 0;

    this.render();

    this.x = 0;
  },
  render: function() {
    var c = this.canvas;
    var ground = AssetManager.get('image', 'ground');
    var count = SCREEN_WIDTH/TILE_WIDTH+1;
    (count).times(function(i) {
      c.context.drawImage(ground.domElement, i*TILE_WIDTH, 0, TILE_WIDTH, FLOOR_HEIGHT);
    });
  },
  update: function() {
    this.x-=SPEED;

    if (this.x < -TILE_WIDTH) {
      this.x = 0;
    }
  }
});



phina.define('ScoreBox', {
  superClass: 'DisplayElement',

  init: function() {
    this.superInit({
      width: 40,
      height: SCORE_BOX_HEIGHT,
    });
  },
  update: function() {
    this.x-=SPEED;

    if (this.right < 0) {
      this.remove();
    }
  }
});


phina.define('GameOverDialog1', {
  superClass: 'DisplayScene',

  init: function(options) {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });

    options.score = Math.floor(options.score / 30);


    var utyo_icon = DisplayElement().addChildTo(this);
    utyo_icon.width = 230;
    utyo_icon.height = 80;
    utyo_icon.setPosition(this.gridX.center(4.8),this.gridY.center(7.2));
    utyo_icon.sprite = Sprite('utyo').addChildTo(utyo_icon);
    utyo_icon.sprite.width = 80;
    utyo_icon.sprite.height = 80;
    utyo_icon.sprite.x = -95;
    utyo_icon.name = Label('@utyo').addChildTo(utyo_icon);
    utyo_icon.name.fill = '#FFFFFF'; // 色を変更
    utyo_icon.name.fontSize = 34; // フォントサイズを変更
    utyo_icon.name.x = 34; // フォントサイズを変更
    utyo_icon.name.fontFamily = 'def'; // フォントサイズを変更


    // タッチ判定を有効に
    utyo_icon.setInteractive(true);
    // タッチ終了時に発火
    utyo_icon.onclick = function() {
        window.open("http://twitter.com/utyo");
    };

    utyo_icon.scaleY = 0; // フォントサイズを変更

    utyo_icon.tweener.clear()
    .to({scaleY:1}, 0,"easeOutQuart");

    this.backgroundColor = 'rgba(0, 0, 0, 0.2)';

    this.fromJSON({
      children: {
        frame: {
          className: 'RectangleShape',
          x: this.gridX.center(),
          y: this.gridY.center(-1.5),
          cornerRadius: 6,
          fill: 'hsl(50, 100%, 90%)',
          stroke: 'brown',
          width: 320,
          height: 220,
        },
        scoreText: {
          className: 'Label',
          fontSize: 32,
          x: this.gridX.center(),
          y: this.gridY.center(-2.5),
          fontFamily:'def',
          fill: '#CFA551',
          text: 'SCORE',
        },
        scoreLabel: {
          className: 'Label',
          fontSize: 62,
          x: this.gridX.center(),
          y: this.gridY.center(-1),
          fontSize: 48,
          fill: 'white',
          stroke: 'black',
          fontFamily:'def',
          strokeWidth: 8,
          text: '4321',
        },
        btnOK: {
          className: 'Button',
          x: this.gridX.center(-2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'orange',
          stroke: 'brown',
          text: 'RETRY',
          fontFamily:'def',
          fontSize: 26,
        },
        btnShare: {
          className: 'Button',
          x: this.gridX.center(2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'orange',
          stroke: 'brown',
          text: 'SHARE',
          fontFamily:'def',
          fontSize: 26,
        },
        btnTop: {
          className: 'Button',
          x: this.gridX.center(),
          y: this.gridY.center(4.3),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'orange',
          stroke: 'brown',
          text: 'TOP',
          fontFamily:'def',
          fontSize: 26,
        },
      }
    });

    this.btnTop.onclick = function() {
      window.open("https://cachacacha.com");
    };

    this.btnOK.onpush = function() {
//      alert("やめろ");
      ResetCount++;
      if(ResetCount == 3){
        SoundManager.stopMusic();
        alert("止めろ");      
      }
      this.exit('Stage1');


    }.bind(this);
    this.btnShare.onclick = function() {
      var url = Twitter.createURL({
        text: 'SCORE: {score}'.format(options),
        hashtags: 'mugenrun,かちゃコム',
        url: location.href,
      });
      window.open(url, 'share window', 'width=480, height=320');
    }.bind(this);

    this.score = 0;
    this.tweener
      .to({score: options.score})
      ;
  },




  update: function() {
    this.scoreLabel.text = this.score|0;
  },
});


phina.define("Block", {
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


      this.x += this.vx;
      this.y += this.vy;


      if(this.x < -1000){
          this.remove();

      }


  },
  

});



phina.define("WhiteScene", {
  // 継承
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.backgroundColor = 'white';

    SoundManager.playMusic("radio");

    this.sprite = Sprite('e1').addChildTo(this);
    this.sprite.setPosition(this.gridX.center(),this.gridY.center());
    this.sprite.setSize(SCREEN_HEIGHT *1.2,SCREEN_HEIGHT*1.2);

    // 背景を半透明化
   // this.backgroundColor = 'white';
    var self = this;


    this.tweener
      .clear()
      .wait(1000)
      .call(function() {
        SoundManager.stopMusic();

        this.exit();    
      }, this)
      ;



      
  },
});

