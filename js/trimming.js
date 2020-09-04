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
		$("#cropper-img").cropper({
			viewMode: 2,
			dragMode: 'none',
			maxContainerWidth: window.innerWidth,
			minContainerWidth: window.innerWidth,
			minContainerHeight: window.innerHeight * 0.9,
			maxContainerHeight: window.innerHeight * 0.9
		});
    },

    //イベント初期化
    initializeEvents: function () {
		var self = this;

		//保存ボタン押下
		$("#saveButton").click(function () {
			self.save();
		});
	},
	
	//保存ボタン
	save: function () {
		var base64 = $("#cropper-img").cropper('getCroppedCanvas').toDataURL('image/jpeg', 1.0);

		//アンカータグを作成
		var a = document.createElement('a');
		//canvasをJPEG変換し、そのBase64文字列をhrefへセット
		a.href = base64;
		//ダウンロード時のファイル名を指定
		a.download = 'result.jpg';
		//クリックイベントを発生させる
		a.click();
	}

}

var trimming = new Trimming();

$(function () {
    //初期処理実行
    trimming.initialize();
});