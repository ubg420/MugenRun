
phina.globalize();

var QUERY           = QueryString.parse();
var SCREEN_WIDTH    = 640;
var SCREEN_HEIGHT   = 960;
var PIECE_SIZE      = 80;
var PIECE_SIZE_HALF = PIECE_SIZE/2;
var FLOOR_HEIGHT    = 125;
var FLOOR_Y         = SCREEN_HEIGHT-FLOOR_HEIGHT;
var SPEED           = 11;
var SCORE_BOX_HEIGHT= 250;
var TILE_WIDTH = 32;
var JUMPPOWER = 45;
var BLOCKSPEED  = 8;

var TYAKUTICOUNT = 0;

var GameMain;

var ResetCount = 0;

var ASSETS = {
  image: {
    'ground': './image/ground.png',
    'background': './image/background.png',
    'back2': './image/back2.png',
    'back3': './image/back3.png',
    'stage3back': './image/stage3.jpg',
    'stage4back': './image/stage4_2.PNG',


    'tube1': './image/tube1.png',
    'tube2': './image/tube2.png',
    'character': './image/player.png',
    'player3': './image/player3.png',
    'player4': './image/player4.png',


    'hit': './image/hit_1.png',
    'hitR': './image/hit_1r.png',
    'block': './image/block.png',
    'block2': './image/block2.png',
    'block3': './image/block3_5.png',
    'block4': './image/block4_2.png',


    'e1': './image/01.jpg',
    'e2': './image/02.jpg',

    'fire': './image/fire1.png',
    'hana': './image/hana.png',
    'coin': './image/coin.png',

    'utyo': './image/utyo.png',

  },
  spritesheet: {
    'character': './character.tmss',
    'character2': './character2.tmss',

    
    'hitSS': './hitSS.ss',
    'hitRSS': './hitRSS.ss',
    'hanaSS': './hana.ss',
    'coinSS': './coinSS.ss',

  },
  sound: {
    'bgm':'./sounds/BGM185-161031-komichiwokakenukete-wav.wav',
    'touch': './sounds/jump.wav',
    'damage': './sounds/damage.mp3',

    'fire': './sounds/fire2.wav',
    'hit': './sounds/hit.wav',
    'powerup': './sounds/powerup.wav',
    'coin': './sounds/coin.wav',
    'pii': './sounds/xxxharf.mp3',

    'jump2': './sounds/jump2.mp3',
    'jump4': './sounds/jump4.wav',

    'radio': './sounds/radio4.mp3'


  },
  font:{
    'def': './font/FAMania.woff',
  },

};




phina.main(function() {

    var app = GameApp({
      title: 'phinappy bird',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,

    });
  
  //  app.enableStats();
    app.replaceScene(SceneSequence());
    app.run();
    
  });


  // SceneSequenceクラス
phina.define("SceneSequence", {
  superClass: "phina.game.ManagerScene",

  // 初期化
  init: function() {
    this.superInit({
      scenes: [

        {
          label: "Loading", // ラベル。参照用
          className: "LoadingScene", // シーンAのクラス名
          nextLabel:'Title'
        },
        {
          label: "Title", // ラベル。参照用
          className: "Title", // シーンAのクラス名

        },
        {
          label: "Main",
          className: "MainScene",
        },
        {
          label: "Stage1",
          className: "Stage1",

        },
        {
          label: "Stage2",
          className: "Stage2",

        },
        {
          label: "Stage3",
          className: "Stage3",

        },
        {
          label: "Stage4",
          className: "Stage4",

        },
        {
          label: "Memo",
          className: "MemoScene",

        },
        {
          label: "Memo2",
          className: "MemoScene2",

        },
        {
          label: "Memo3",
          className: "MemoScene3",

        },
        {
          label: "Memo4",
          className: "MemoScene4",

        },
        {
          label: "Memo5",
          className: "MemoScene5",

        },
        {
          label: "Sentaku",
          className: "Sentaku",

        },
        {
          label: "Sentaku2",
          className: "Sentaku2",

        },
        {
          label: "Sentaku3",
          className: "Sentaku3",
        },
        {
          label: "Sentaku4",
          className: "Sentaku4",
        },
        {
          label: "End",
          className: "EndScene",
        },
        {
          label: "Fin",
          className: "Fin",
        },
      ]
    });
  }
});

phina.define("LoadingScene", {
  superClass: "phina.game.LoadingScene",

  init: function(params) {
    this.superInit({
      assets: ASSETS,
      exitType: "auto",

    });


  }

});