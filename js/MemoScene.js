
phina.define("MemoScene", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.itemType = 9;
    ITEMSCENE = this;

    this.backgroundColor = 'black';

    var self = this;

    var text = '気が付くと私は走っていた。\n私が何者でここが何処なのか。\nなにも覚えていない。\n走らなければならないという\n強烈な衝動だけが私を動かしていた。\n変わらない風景のなかを私は走った。\n足が引き裂かれたように痛み\n心臓が破裂しそうになっても\n止まることが出来ず\n憑かれたように走り続けた。\n走り続けた。\n走り続けた。\n走り続けた。\n走り続けた。\n走り続けた。\n走り続けた走り続けた\n走り続けた走り続けた走り続けた走り続けた\nり続けた走り続けた走り続けた走り続けた走り続けた\n続けた走り続けた走り続けた走り続けた走り続けた';
    
    this.startlabel = Label(text).addChildTo(this);
    this.startlabel.setPosition(this.gridX.center(-7),this.gridY.center(0));
    this.startlabel.fill = 'white'; // 色を変更
    this.startlabel.strokeWidth = 8;
    this.startlabel.fontSize = 34; // フォントサイズを変更
    this.startlabel.align = 'left';
    this.startlabel.fontFamily = 'serif';



    this.startlabel.y = 1500;

    this.startlabel.tweener
      .clear()
      .to({y: 630}, 22000)
      .call(function() {
        this.exit('Stage2');    
      }, this)
      ;
  
  },

});


phina.define("MemoScene2", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.itemType = 9;
    ITEMSCENE = this;

    this.backgroundColor = 'blue';

    var self = this;

    var text = 'なにかが私を見ている\n\n奇妙なことに\n\nそのなにがが私を見ている間だけ\n\n私は存在している気がする';
    
    this.startlabel = Label(text).addChildTo(this);
    this.startlabel.setPosition(this.gridX.center(-3),this.gridY.center(-3));
    this.startlabel.fill = 'white'; // 色を変更
    this.startlabel.strokeWidth = 8;
    this.startlabel.fontSize = 24; // フォントサイズを変更
    this.startlabel.align = 'left';
    this.startlabel.fontFamily = 'serif';




    this.startlabel.tweener
      .clear()
      .wait(3000)
      .call(function() {
        this.exit();    
      }, this)
      ;
  
  },

});




phina.define("MemoScene3", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.itemType = 9;
    ITEMSCENE = this;

    this.backgroundColor = 'black';

    var self = this;

    var text = '入力がなされたとき世界は動き始める\n\nそして私は私でなくなる\n\nあるいはそれが私だったか';
    
    this.startlabel = Label(text).addChildTo(this);
    this.startlabel.setPosition(this.gridX.center(-6),this.gridY.center(1));
    this.startlabel.fill = 'white'; // 色を変更
    this.startlabel.strokeWidth = 8;
    this.startlabel.fontSize = 24; // フォントサイズを変更
    this.startlabel.align = 'left';
    this.startlabel.fontFamily = 'serif';




    this.startlabel.tweener
      .clear()
      .wait(3000)
      .call(function() {
        this.exit('Stage4');    
      }, this)
      ;
  
  },

});


phina.define("MemoScene4", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.itemType = 9;
    ITEMSCENE = this;

    this.backgroundColor = 'black';

    var self = this;

    var text = 'お前にも見せてやりたい';
    SoundManager.playMusic("radio");

    
    this.startlabel = Label(text).addChildTo(this);
    this.startlabel.setPosition(this.gridX.center(-4),this.gridY.center());
    this.startlabel.fill = 'red'; // 色を変更
    this.startlabel.strokeWidth = 8;
    this.startlabel.fontSize = 28; // フォントサイズを変更
    this.startlabel.align = 'left';
    this.startlabel.fontFamily = 'serif';

    this.startlabel.tweener
      .clear()
      .wait(400)
      .call(function() {
        SoundManager.stopMusic();
        this.exit();    
      }, this)
      ;
  
  },

});



phina.define("MemoScene5", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });


    this.fromJSON({
      children: {
        btnOK: {
          className: 'Button',
          x: this.gridX.center(),
          y: this.gridY.center(-1.5),
          width: this.gridX.span(4.5),
          height: this.gridY.span(1.5),
          fill: '#000000',
          text: 'LOG',
          fontFamily:'def',
          fontSize: 26,
        },
      }
    });


    this.btnOK.alpha = 0;

    this.itemType = 9;
    ITEMSCENE = this;

    this.backgroundColor = 'white';

    var self = this;

    var text = 'なぜ戻ってきた';
    
    this.startlabel = Label(text).addChildTo(this);
    this.startlabel.setPosition(this.gridX.center(-3),this.gridY.center(1));
    this.startlabel.fill = 'black'; // 色を変更
    this.startlabel.strokeWidth = 8;
    this.startlabel.fontSize = 34; // フォントサイズを変更
    this.startlabel.align = 'left';
    this.startlabel.fontFamily = 'serif';

    this.startlabel.tweener
      .clear()
      .wait(3000)
      .call(function() {

        this.startlabel.remove();
//        this.exit('Stage4');    
      }, this)
      ;

    this.btnOK.tweener
      .wait(4000)
      .to({alpha: 1,}, 550,'easeOutBack')
      .call(function() {
        this.btnOK.setInteractive(true);
        this.startlabel.remove();
//        this.exit('Stage4');    
      }, this)
      ;

      this.btnOK.setInteractive(false);

    this.btnOK.onpush = function() {
      //      alert("やめろ");
            window.open('./memo.html');
            this.exit('End');
          


          }.bind(this);


  
  },

});







phina.define("Sentaku", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.backgroundColor = 'black';

    this.fromJSON({
      children: {
        frame: {
          className: 'RectangleShape',
          x: this.gridX.center(),
          y: this.gridY.center(-3),
          cornerRadius: 6,
          fill: 'black',
          stroke: 'white',
          width: 520,
          height: 220,
        },
        scoreLabel: {
          className: 'Label',
          fontSize: 62,
          x: this.gridX.center(),
          y: this.gridY.center(-3),
          fontSize: 32,
          fill: 'white',
          strokeWidth: 8,
          text: '私はまともだ',
        },
        btnOK: {
          className: 'Button',
          x: this.gridX.center(-2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'black',
          stroke: 'white',
          text: 'はい',
          fontSize: 26,
        },
        btnShare: {
          className: 'Button',
          x: this.gridX.center(2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'black',
          stroke: 'white',
          text: 'いいえ',
          fontSize: 26,
        },
      }
    });

      this.btnOK.onpush = function() {
        SoundManager.play("jump4");

        //      alert("やめろ");
          this.btnOK.alpha=0;
          this.btnShare.alpha=0;
          this.scoreLabel.alpha=0;
          this.frame.alpha=0;

          this.tweener
          .clear()
          .wait(1000)
          .call(function() {
    
            this.exit('Sentaku2');
          }, this)
          ;
  
  



          }.bind(this);
        
      this.btnShare.onclick = function() {
        SoundManager.play("jump4");

        this.btnOK.alpha=0;
        this.btnShare.alpha=0;
        this.scoreLabel.alpha=0;
        this.frame.alpha=0;

        this.tweener
        .clear()
        .wait(1000)
        .call(function() {
  
          this.exit('Sentaku2');
        }, this)
        ;

      }.bind(this);
    

  },

});

phina.define("Sentaku2", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.backgroundColor = 'black';

    this.fromJSON({
      children: {
        frame: {
          className: 'RectangleShape',
          x: this.gridX.center(),
          y: this.gridY.center(-3),
          cornerRadius: 6,
          fill: 'black',
          stroke: 'white',
          width: 520,
          height: 220,
        },
        scoreLabel: {
          className: 'Label',
          fontSize: 62,
          x: this.gridX.center(),
          y: this.gridY.center(-3),
          fontSize: 32,
          fill: 'white',
          strokeWidth: 8,
          text: '私は正常だ',
        },
        btnOK: {
          className: 'Button',
          x: this.gridX.center(-2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'black',
          stroke: 'white',
          text: 'はい',
          fontSize: 26,
        },
        btnShare: {
          className: 'Button',
          x: this.gridX.center(2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'black',
          stroke: 'white',
          text: 'いいえ',
          fontSize: 26,
        },
      }
    });

      this.btnOK.onpush = function() {
        SoundManager.play("jump4");

        this.btnOK.alpha=0;
        this.btnShare.alpha=0;
        this.scoreLabel.alpha=0;
        this.frame.alpha=0;

        this.tweener
        .clear()
        .wait(1000)
        .call(function() {
  
          this.exit('Sentaku3');
        }, this)
        ;

      }.bind(this);
        
      this.btnShare.onclick = function() {
        SoundManager.play("jump4");

        this.btnOK.alpha=0;
        this.btnShare.alpha=0;
        this.scoreLabel.alpha=0;
        this.frame.alpha=0;

        this.tweener
        .clear()
        .wait(1000)
        .call(function() {
  
          this.exit('Sentaku3');
        }, this)
        ;        
      }.bind(this);
    

  },

});


phina.define("Sentaku3", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.backgroundColor = 'black';

    this.fromJSON({
      children: {
        frame: {
          className: 'RectangleShape',
          x: this.gridX.center(),
          y: this.gridY.center(-3),
          cornerRadius: 6,
          fill: 'black',
          stroke: 'white',
          width: 520,
          height: 220,
        },
        scoreLabel: {
          className: 'Label',
          fontSize: 62,
          x: this.gridX.center(),
          y: this.gridY.center(-3),
          fontSize: 32,
          fill: 'white',
          strokeWidth: 8,
          text: '私は正気だ',
        },
        btnOK: {
          className: 'Button',
          x: this.gridX.center(-2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'black',
          stroke: 'white',
          text: 'はい',
          fontSize: 26,
        },
        btnShare: {
          className: 'Button',
          x: this.gridX.center(2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'black',
          stroke: 'white',
          text: 'はい',
          fontSize: 26,
        },
      }
    });

      this.btnOK.onpush = function() {
        SoundManager.play("jump4");

        this.btnOK.alpha=0;
        this.btnShare.alpha=0;
        this.scoreLabel.alpha=0;
        this.frame.alpha=0;

        this.tweener
        .clear()
        .wait(3000)
        .call(function() {
  
          this.exit('Sentaku4');
        }, this)
        ;


          }.bind(this);
      
      this.btnShare.onclick = function() {
        SoundManager.play("jump4");

        this.btnOK.alpha=0;
        this.btnShare.alpha=0;
        this.scoreLabel.alpha=0;
        this.frame.alpha=0;

        this.tweener
        .clear()
        .wait(3000)
        .call(function() {
  
          this.exit('Sentaku4');
        }, this)
        ;
        
      }.bind(this);
    

  },

});

phina.define("Sentaku4", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.backgroundColor = 'black';

    this.fromJSON({
      children: {
        frame: {
          className: 'RectangleShape',
          x: this.gridX.center(),
          y: this.gridY.center(-3),
          cornerRadius: 6,
          fill: 'black',
          stroke: 'white',
          width: 520,
          height: 220,
        },
        scoreLabel: {
          className: 'Label',
          fontSize: 62,
          x: this.gridX.center(),
          y: this.gridY.center(-3),
          fontSize: 32,
          fill: 'white',
          strokeWidth: 8,
          text: '本当に？',
        },
        btnOK: {
          className: 'Button',
          x: this.gridX.center(-2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'black',
          stroke: 'white',
          text: 'はい',
          fontSize: 26,
        },
        btnShare: {
          className: 'Button',
          x: this.gridX.center(2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'black',
          stroke: 'white',
          text: 'はい',
          fontSize: 26,
        },
      }
    });

      this.btnOK.onpush = function() {
        SoundManager.play("jump4");

        this.btnOK.alpha=0;
        this.btnShare.alpha=0;
        this.scoreLabel.alpha=0;
        this.frame.alpha=0;

        this.tweener
        .clear()
        .call(function() {
          this.exit('Stage3');
        }, this)
        ;


      }.bind(this);
      
      this.btnShare.onclick = function() {
        SoundManager.play("jump4");

        this.btnOK.alpha=0;
        this.btnShare.alpha=0;
        this.scoreLabel.alpha=0;
        this.frame.alpha=0;

        this.tweener
        .clear()
        .call(function() {

          this.exit('Stage3');
        }, this)
        
      }.bind(this);
    

  },

});


phina.define("EndScene", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.itemType = 9;
    ITEMSCENE = this;

    this.backgroundColor = 'white';

    var self = this;

    this.fromJSON({
      children: {
        scoreLabel: {
          className: 'Label',
          fontSize: 62,
          x: this.gridX.center(),
          y: this.gridY.center(-3),
          fontSize: 42,

          text: 'continue?',
          fontFamily: 'def'
        },
        btnOK: {
          className: 'Button',
          x: this.gridX.center(-2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'black',
          stroke: 'white',
          text: 'YES',
          fontSize: 26,
          fontFamily: 'def'

        },
        btnShare: {
          className: 'Button',
          x: this.gridX.center(2.1),
          y: this.gridY.center(1.5),
          width: this.gridX.span(3.5),
          height: this.gridY.span(1.5),
          fill: 'black',
          stroke: 'white',
          text: 'NO',
          fontSize: 26,
          fontFamily: 'def'

        },
      }
    });


    this.sprite = Sprite('character').addChildTo(this);
    this.sprite.anim = FrameAnimation('character').attachTo(this.sprite);
    this.sprite.anim.gotoAndPlay('stop');
    this.sprite.anim.fit = false;
    this.sprite.setSize(80,80);
    this.sprite.setPosition(this.gridX.center(),this.gridY.center(-1));


    this.btnOK.onpush = function() {
      localStorage.setItem('endFLG','yes')
      this.exit("Main");

    }.bind(this);
    

    
    this.btnShare.onpush = function() {
        localStorage.setItem('endFLG','no')
        this.btnOK.alpha=0;
        this.btnShare.remove();
        this.scoreLabel.remove();

        this.sprite.tweener
        .wait(1500)
        .to({alpha:0}, 1200)
        .wait(500)
        .call(function() {
          this.exit("Fin");

        }, this);

        
    }.bind(this);


    
  },

});



phina.define("Fin", {
  superClass: 'DisplayScene',
  init: function(x,y,rotation) {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,  
    });

    this.itemType = 9;
    ITEMSCENE = this;

    this.backgroundColor = 'white';

    var self = this;

    this.fromJSON({
      children: {
        scoreLabel: {
          className: 'Label',
          fontSize: 62,
          x: this.gridX.center(),
          y: this.gridY.center(),
          fontSize: 42,
          text: 'THE END',
          alpha: 0,
          fontFamily: 'def'
        },

      }
    });

    
    this.scoreLabel.tweener
    .to({alpha:1}, 1500)

    
  },

});
