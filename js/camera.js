var Camera = function() {};

var video;
var canvas;
var se;

// --- prefix -----
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia || navigator.msGetUserMedia;

const frontOption = {
	audio: false,
	video: true
};

const rearOption = {
	audio: false,
	video: {
		facingMode: {
			exact: "environment"
		}
	}
};

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
		video = document.getElementById('camera');
		canvas = document.querySelector("#picture");
		se = document.querySelector('#se');
	},

	//イベント初期化
	initializeEvents: function () {
		var self = this;

		//カメラをvideoと同期
		self.getDeviceStream(rearOption)
		.then(function (stream) { // success
			self.playVideo(video, stream);
		}).catch(function (error) { // error
			//リアカメラの初期化に失敗したら、フロントカメラの初期化を試みる
			self.getDeviceStream(frontOption)
			.then(function (stream) { // success
				self.playVideo(video, stream);
			}).catch(function (error) { // error
				console.error('getUserMedia error:', error);
				alert('getUserMedia error:', error);
				return;
			});
		});

		//シャッターボタン押下
		$("#shutterButton").click(function () {
			self.shutter();
		});
	},

	//ストリーム取得
	getDeviceStream: function (option) {
		if ('getUserMedia' in navigator.mediaDevices) {
			console.log('navigator.mediaDevices.getUserMedia');
			return navigator.mediaDevices.getUserMedia(option);
		} else {
			console.log('wrap navigator.getUserMedia with Promise');
			return new Promise(function(resolve, reject){    
				navigator.getUserMedia(option,
				resolve,
				reject
				);
			});      
		}
	},

	//カメラ開始
	playVideo: function (element, stream) {
		if ('srcObject' in element) {
			element.srcObject = stream;
		} else {
			element.src = window.URL.createObjectURL(stream);
		}
		element.play();
		element.volume = 0;
	},

	//写真撮影
	shutter: function () {
		const ctx = canvas.getContext("2d");

		// 演出的な目的で一度映像を止めてSEを再生する
		video.pause();  // 映像を停止
		se.play();      // シャッター音
		setTimeout(() => {
			video.play();    // 0.5秒後にカメラ再開
		}, 500);

		//キャンバスサイズ変更
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		// canvasに画像を貼り付ける
		ctx.drawImage(video, 0, 0);

		//アンカータグを作成
		var a = document.createElement('a');
		//canvasをJPEG変換し、そのBase64文字列をhrefへセット
		a.href = canvas.toDataURL('image/jpeg', 1.0);
		//ダウンロード時のファイル名を指定
		a.download = 'download.jpg';
		//クリックイベントを発生させる
		a.click();
	}

}

var camera = new Camera();

$(function () {
	//初期処理実行
	camera.initialize();
});
