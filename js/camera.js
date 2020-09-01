var Camera = function() {};

Camera.prototype = {
	//初期化処理
	initialize: function () {
		//コントロール初期化
		this.initializeComponent();
		//イベント初期化
		this.initializeEvents();
	},

	//コントロール初期化
    initializeComponent: function () {
    },

    //イベント初期化
    initializeEvents: function () {
    }

}

var camera = new Camera();

$(function () {
    //初期処理実行
    camera.initialize();
});
