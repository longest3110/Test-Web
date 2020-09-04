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

			//画像以外のファイル形式は処理終了
			if (!file.type.match('image.*')) {
				alert("画像ファイルを選択してください");
				return;
			}

			switch ($('input[name="trigger"]:checked').val()) {
				//画像表示
				case "0":
					$(".cropper-area").hide();
					self.displayImage(file, "outputImage");
					break;

				//トリミング画面表示
				case "1":
					$("#outputImage").hide();
					self.displayTrimming(file);
					break;
			}

		});
	},
	
	//cropper初期化
	initializeCropper: function () {
		//一旦今あるcropperを削除
		$("#cropper-img").cropper('destroy');

		//初期化		
		$("#cropper-img").cropper({
			viewMode: 2,
			dragMode: 'none',
			minContainerWidth: window.innerWidth,
			minContainerHeight: window.innerHeight * 0.9
		});

	},
	
	//選択されたファイルを表示
	displayImage: function (file, targetId) {
		var self = this;
		var reader = new FileReader();

		reader.readAsDataURL(file)
		reader.onload = function () {
			var image = $("#" + targetId);

			image.attr("src", reader.result);
			image.show();

			//トリミングモードの場合はcropper初期化
			if ($('input[name="trigger"]:checked').val() == "1") {
				self.initializeCropper();
			}
		}
	},

	//トリミング画面を表示
	displayTrimming: function (file) {
		var self = this;

		//トリミング画面表示
		$(".cropper-area").show();

		//ファイル表示
		self.displayImage(file, "cropper-img");
	}

}

var fileSelect = new FileSelect();

$(function () {
	//初期処理実行
	fileSelect.initialize();
});
