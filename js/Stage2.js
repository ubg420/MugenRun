
phina.define('Stage2', {
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
          arguments: 'back2',
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

    this.player = Player2().addChildTo(this);
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

    var block1 = Block2(0,800).addChildTo(this.blockGroup);
    var bwidth = block1.width - 7;
    var block2 = Block2(bwidth,800).addChildTo(this.blockGroup);
    var block3 = Block2(bwidth*2,800).addChildTo(this.blockGroup);
    var block4 = Block2(bwidth*3,800).addChildTo(this.blockGroup);
    var block5 = Block2(bwidth*4,800).addChildTo(this.blockGroup);
    var block6 = Block2(bwidth*5,800).addChildTo(this.blockGroup);
    var block7 = Block2(bwidth*6,800).addChildTo(this.blockGroup);

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

      var block = Block2(x,ry).addChildTo(this.blockGroup);
    }

  },

  changePower:function(power){

    var hpWidth = power/this.maxPower * this.maxPowerWidth;
    this.powerValueGauge.width = hpWidth;
  },


  gameover: function() {
    this.gameoverFLG = true;

    var dialog = GameOverDialog2({
      score: this.score,
    });
    this.app.pushScene(dialog);

    dialog.onexit = function() {
      this.exit('Stage2');
    }.bind(this);

  },

  addTyakutiCount:function(){
    TYAKUTICOUNT++;
    console.log(TYAKUTICOUNT);
    this.checkTyakutiCount();

  },

  checkTyakutiCount:function(){
    switch (TYAKUTICOUNT) {

      case 10:

      
      break;


      case 3:
        //プレイヤー伸びる
        var waitTime =  Math.floor((Math.random() * 2000));
        this.player.tweener
        .wait(waitTime)
        .to({scaleX:100,scaleY:0.3}, 11000)
        .to({scaleX:1,scaleY:1}, 50)
        .call(function() {


        }, this);

      break;

      
      case 7:
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

      case 10:
        var rand 
        var ry =  Math.floor((Math.random() * 650)) +150 ;

        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+200,ry,'豁｢縺ｾ繧翫◆縺').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

        

        break;


       case 11:
        var ry =  Math.floor((Math.random() * 650)) +150 ;

          var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
          var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
          var c = CommentLabel(SCREEN_WIDTH+200,ry,'豁｢縺ｾ繧翫◆縺').addChildTo(this);
          var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

        //絵

        break;

        
      case 12: 
        var ry =  Math.floor((Math.random() * 650)) +150 ;
        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+200,ry,'豁｢縺ｾ繧翫◆縺').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

        break;

      case 13: 
        var c = CommentLabel(SCREEN_WIDTH+100,300,'私はまだ繧ｳ繧ｫ繝').addChildTo(this);

        break;

              
      case 14: 
        var ry =  Math.floor((Math.random() * 650)) +150 ;
        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+200,ry,'豁｢縺ｾ繧翫◆縺').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

        break;

      case 15: 
        var ry =  Math.floor((Math.random() * 650)) +150 ;
        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,300,'走り続けている').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

        break;

      case 16: 
        var ry =  Math.floor((Math.random() * 650)) +150 ;
        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+200,ry,'豁｢縺ｾ繧翫◆縺').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

        break;

      case 17: 
         var c = CommentLabel(SCREEN_WIDTH+100,300,'ここには').addChildTo(this);

        break;

      case 18: 
        var ry =  Math.floor((Math.random() * 650)) +150 ;
        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+200,ry,'豁｢縺ｾ繧翫◆縺').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

        break;

      case 19: 
        var ry =  Math.floor((Math.random() * 650)) +150 ;
        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+200,ry,'豁｢縺ｾ繧翫◆縺').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

        break;

      case 20: 
        var ry =  Math.floor((Math.random() * 650)) +150 ;
        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+200,ry,'豁｢縺ｾ繧翫◆縺').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

        break;


      case 21: 
        var c = CommentLabel(SCREEN_WIDTH+100,550,'誰もいない').addChildTo(this);

       break;

      case 22: 
        var ry =  Math.floor((Math.random() * 650)) +150 ;
        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+200,ry,'豁｢縺ｾ繧翫◆縺').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

      break;

      case 23: 
        var ry =  Math.floor((Math.random() * 650)) +150 ;
        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+200,ry,'豁｢縺ｾ繧翫◆縺').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

      break;

      case 24: 
        var ry =  Math.floor((Math.random() * 650)) +150 ;
        var c = CommentLabel(SCREEN_WIDTH+300,ry+200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+400,ry-200,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,ry+300,'隕九ｋ縺ｪ隕九ｋ縺ｪ隕九ｋ縺ｪ').addChildTo(this);

      break;

      case 25: 
        var c = CommentLabel(SCREEN_WIDTH+100,100,'だが').addChildTo(this);

      break;


      case 26: 
      var ry =  Math.floor((Math.random() * 650)) +150 ;
      var c = CommentLabel(SCREEN_WIDTH+300,200,'繧ｳ繧ｳ繧ｫ繝ｩ繝?繧ｻ').addChildTo(this);
      var c = CommentLabel(SCREEN_WIDTH+100,800,'豁｢縺ｾ繧翫◆縺?ｋ豁｢縺ｾ繧翫◆縺豁｢縺ｾ繧翫◆縺').addChildTo(this);



      break;

      case 27: 
        var c = CommentLabel(SCREEN_WIDTH+100,300,'なにかが').addChildTo(this);

        break;

      case 28: 
        var c = CommentLabel(SCREEN_WIDTH+400,500,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);


      break;


      case 29: 
        var c = CommentLabel(SCREEN_WIDTH+100,300,'わたしを').addChildTo(this);
        var c = CommentLabel(SCREEN_WIDTH+100,400,'雁燕縺ｫ繧りｦ九○縺ｦ繧?ｋ').addChildTo(this);

        break;

      case 30: 
        var c = CommentLabel(SCREEN_WIDTH+300,600,'みている').addChildTo(this);

        break;


      case 36: 
        SoundManager.stopMusic();
        this.app.pushScene(MemoScene2());


        break;

      case 40: 
        SoundManager.stopMusic();
        this.exit('Sentaku')
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


phina.define("CommentLabel", {
  superClass: "Label",
  
  init: function(x,y,text) {
      this.superInit(text);

      this.x = x;
      this.y = y;
      
      this.align = 'left';

      this.fill = 'white'; // 色を変更
      this.strokeWidth = 18;
      this.fontSize = 64; // フォントサイズを変更
      this.fontFamily = "serif"; // フォントサイズを変更
      this.stroke = 'black';
      this.strokeWidth = 4;
//      this.fontFamily = "def"; // フォントサイズを変更


      this.vx = -12;
      this.vy = 0;

  },
  
  update: function(app) {
      this.x += this.vx;

      if(this.x < -1000){
          this.remove();
      }

  },
  
});


phina.define('GameOverDialog2', {
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
      this.exit('Stage2');
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



phina.define("Block2", {
  superClass: "DisplayElement",
  
  init: function(x,y) {
      this.superInit();

      this.x = x;
      this.y = y;
      
      this.width = 200;
      this.height = 40;

      this.sprite = Sprite('block2').addChildTo(this);
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

