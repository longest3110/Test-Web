var Camera = function() {};

var video;
var canvas;
var se;

// --- prefix -----
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia || navigator.msGetUserMedia;

const constraints = {
	audio: false,
	video: true
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
		self.getDeviceStream(constraints)
		.then(function (stream) { // success
			self.playVideo(video, stream);
		}).catch(function (error) { // error
			console.error('getUserMedia error:', error);
			alert('getUserMedia error:', error);
			return;
		});

		//シャッターボタン押下
		$("#shutterButton").click(function () {
			self.shutter();
		});
	},

	//ストリーム取得
	getDeviceStream: function (option) {
		if ('getUserMedia' in navigator.mediaDevices) {
			console.log('navigator.mediaDevices.getUserMadia');
			return navigator.mediaDevices.getUserMedia(option);
		} else {
			console.log('wrap navigator.getUserMadia with Promise');
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

		// canvasに画像を貼り付ける
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	}

}

var camera = new Camera();

$(function () {
	//初期処理実行
	camera.initialize();
});
