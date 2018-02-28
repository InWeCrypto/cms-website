import React, { PureComponent } from "react";
import http from "../../utils/ajax.js";
import webUploader from "../../assets/js/webuploader.min.js";
import "../../assets/js/kindeditor-all-min.js";
import "../../assets/js/lang/zh-CN.js";
import "../../assets/js/themes/default/default.css";
import "./index.less";
import { setTimeout } from "timers";

class Demo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			go: "",
			aliImgKey: ""
		};
	}
	componentDidMount() {
		const that = this;
		this.getAliKey();

		function createEditer(selector) {
			// KindEditor.ready(function(K) {
			let K = KindEditor;
			window.K = KindEditor;
			window.editor = K.create(selector, {
				resizeType: 1,
				pasteType: 1,
				allowPreviewEmoticons: false,
				allowImageUpload: false,
				fillDescAfterUploadImage: true,
				items: [
					"fontsize",
					"|",
					"forecolor",
					"hilitecolor",
					"bold",
					"italic",
					"underline",
					"|",
					"justifyleft",
					"justifycenter",
					"justifyright",
					"insertorderedlist",
					"insertunorderedlist",
					"|",
					"image",
					"imageupload",
					"link"
				]
			});

			// K.plugin("imageupload", function(K) {
			// 	var editor = this,
			// 		name = "hello";
			// 	//data-name="imageupload"
			// 	var imageupload = K.query(".ke-icon-imageupload");
			// 	console.log(4444);
			// 	if (imageupload) {
			// 		imageupload.setAttribute("id", "imageupload");
			// 		that.uploader();
			// 	}

			// 	// 点击图标时执行
			// 	// editor.clickToolbar(name, function() {
			// 	// 	editor.insertHtml("你好");
			// 	// });
			// });

			K("#aa").click(function(e) {
				alert(editor.fullHtml());
			});
			K("#bb").click(function(e) {
				var cmd = K.cmd(document);
				cmd.inserthtml(123123);
				var img =
					"http://inwecrypto-china.oss-cn-shanghai.aliyuncs.com/ueditor/e3c09ae28a9c6aa4aab7d0cf89d26a06.png";
				editor.appendHtml(
					'<img src="' + img + '" style="width:400px" />'
				);
				//cmd.insertimage(img)
			});
			// });
			K("#aa").click(function(e) {
				alert(editor.fullHtml());
			});
			K("#bb").click(function(e) {
				var cmd = K.cmd(document);
				cmd.inserthtml(123123);
				var img =
					"http://inwecrypto-china.oss-cn-shanghai.aliyuncs.com/ueditor/e3c09ae28a9c6aa4aab7d0cf89d26a06.png";
				editor.appendHtml(
					'<img src="' + img + '" style="width:400px" />'
				);
				//cmd.insertimage(img)
			});
			// });
		}
		this.setState(
			{
				go: "go"
			},
			function() {
				createEditer('textarea[name="content"]');
			}
		);
	}
	getAliKey() {
		const that = this;
		//获取阿里云 key
		http
			.get({
				url: `upload/img?get_oss_policy`
			})
			.then(res => {
				if (res.code === 4000) {
					this.setState({
						aliImgKey: res.data
					});

					var imageupload = K.query(".ke-icon-imageupload");

					if (imageupload) {
						imageupload.setAttribute("id", "imageupload");
						that.uploader();
					}
				}
			});

		window.editorTimer = setInterval(() => {
			http
				.get({
					url: `upload/img?get_oss_policy`
				})
				.then(res => {
					if (res.code === 4000) {
						this.setState({
							aliImgKey: res.data
						});
						var imageupload = K.query(".ke-icon-imageupload");

						if (imageupload) {
							imageupload.setAttribute("id", "imageupload");
							that.uploader();
						}
					}
				});
		}, 800000);
	}

	uploader() {
		const option = this.state.aliImgKey;
		if (!option) {
			return;
		}
		this.setState({
			uploaderOption: option
		});
		let uploader = webUploader.create({
			auto: true,
			pick: {
				id: "#imageupload",
				multiple: false
			},
			formData: {
				key: option.dir + option.expire + "${filename}",
				host: option.host,
				policy: option.policy,
				Signature: option.signature,
				callback: "",
				OSSAccessKeyId: option.accessid
			},
			server: option.host,
			method: "POST",
			accept: {
				extensions: "jpg,jpeg,bmp,png",
				mimeTypes: "image/jpg,image/jpeg,image/png,image/bmp"
			}
		});
		uploader.on("fileQueued", file => {
			option.filename = file.name;
		});
		uploader.on("uploadSuccess", res => {
			var imgAdd =
				option.host +
				"/" +
				option.dir +
				option.expire +
				option.filename;

			window.editor.insertHtml('<img src="' + imgAdd + '"  />');
		});
	}

	render() {
		const {} = this.props;
		return (
			<div className="c-editor ui fd-c ">
				<textarea id="mul_input" name="content" />
				{/* <button id="aa">aaa</button>
				<button id="bb">bbb</button> */}
			</div>
		);
	}
}
export default Demo;
