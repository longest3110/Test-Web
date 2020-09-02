var FileSelect = function() {};

FileSelect.prototype = {
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
		var self = this;

		//ファイル選択ボタンクリック
		$("#fileSelectButton").click(function () {
			//ファイル選択ダイアログのクリックイベントを実行
			$("#fileSelecter").click();
			return false;
		});

		//ファイル選択イベント
		$('#fileSelecter').change(function () {
			// ファイル要素から、選択されたファイルを取得する
			const files = $("#fileSelecter")[0].files;

			// ファイルが選択されていなかったら終了
			if (files.length === 0) {
				alert("ファイルが選択されていません");
				return false;
			}

			// 1つ目のファイルを取得する
			const file = files[0];

			self.displayImage(file);
		});
	},
	
	//選択されたファイルを表示
	displayImage: function (file) {
		var reader = new FileReader();

		reader.readAsDataURL(file)
		reader.onload = function () {
			var image = $("#outputImage");

			image.attr("src", reader.result);
			image.show();
		}
	}

}

var fileSelect = new FileSelect();

$(function () {
	//初期処理実行
	fileSelect.initialize();
});
