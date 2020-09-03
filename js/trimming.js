var Trimming = function() {};

Trimming.prototype = {
	//初期化処理
	initialize: function () {
		//コントロール初期化
		this.initializeComponent();
		//イベント初期化
		this.initializeEvents();
	},

	//コントロール初期化
    initializeComponent: function () {
		var cropperImg = document.getElementById('cropper-img');
		var cropper = new Cropper(cropperImg);
    },

    //イベント初期化
    initializeEvents: function () {
    }

}

var trimming = new Trimming();

$(function () {
    //初期処理実行
    trimming.initialize();
});