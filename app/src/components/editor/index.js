import React, { PureComponent } from "react";
import http from "../../utils/ajax.js";
import webUploader from "../../assets/js/webuploader.min.js";
import "../../assets/js/kindeditor-all-min.js";
import "../../assets/js/lang/zh-CN.js";
import "../../assets/js/themes/default/default.css";
import "./index.less";
import { setTimeout } from "timers";
import { constants } from "os";

class Demo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			go: "",
			aliImgKey: ""
		};
	}
	componentWillUnmount(){
		if(window.editorTimer){
			clearInterval(window.editorTimer)
		}
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
                    "mediaupload",
					"link"
                ],
                htmlTags: 
                    {
                        font : ['color', 'size', 'face', '.background-color'],
                        span : [
                                '.color', '.background-color', '.font-size', '.font-family', '.background',
                                '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.line-height'
                        ],
                        div : [
                                'align', '.border', '.margin', '.padding', '.text-align', '.color',
                                '.background-color', '.font-size', '.font-family', '.font-weight', '.background',
                                '.font-style', '.text-decoration', '.vertical-align', '.margin-left'
                        ],
                        table: [
                                'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor',
                                '.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color',
                                '.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background',
                                '.width', '.height', '.border-collapse'
                        ],
                        'td,th': [
                                'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor',
                                '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight',
                                '.font-style', '.text-decoration', '.vertical-align', '.background', '.border'
                        ],
                        a : ['style', 'href', 'target', 'name'],
                        embed : ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
                        img : ['style', 'src', 'width', 'height', 'border', 'alt', 'title', 'align', '.width', '.height', '.border'],
                        'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : [
                                'align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background',
                                '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
                        ],
                        b:['style'],
                        pre : ['class'],
                        hr : ['class', '.page-break-after'],
                        'br,tbody,tr,strong,sub,sup,em,i,u,strike,s,del' : []
                }
                
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

            //媒体上传
            var mediaupload = document.getElementsByClassName("ke-icon-mediaupload")[0];
            if (mediaupload) {
                mediaupload.setAttribute("id", "mediaupload");
                mediaupload.addEventListener("click", function(){
                    that.setState({
                        isShowMediaBox: true
                    })
                })
                //that.mediauploader();
            }
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
                        that.mediauploader();
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
						that.setState({
							aliImgKey: res.data
						});
						var imageupload = K.query(".ke-icon-imageupload");
                        
						if (imageupload) {
							imageupload.setAttribute("id", "imageupload");
							that.uploader();
                        }
                        
					}
				});
		}, 500000);
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
				key: option.dir + option.expire + "${filename}" ,
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
        uploader.on("beforeFileQueued", function(res) {
            var r = res;
            var name =
             parseInt(Math.random() * 10000000) + new Date().getTime();
            var ruid = r.source.ruid;
            
            r.name = name + "_ruid_" + ruid + "_name_" + r.name;
            uploader.reset();
           
            return r;
        });
        
		uploader.on("fileQueued", file => {
            option.filename = file.name;
            option.__hash = file.__hash;
            
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
        uploader.on("uploadError", res => {
			console.log(222, res)
        });
	}
    
    mediauploader() {
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
				id: "#uploadMedia",
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
        uploader.on("beforeFileQueued", function(res) {
            var r = res;
            var name =
             parseInt(Math.random() * 10000000) + new Date().getTime();
            var ruid = r.source.ruid;
            r.name = name + "_ruid_" + ruid + "_name_" + r.name;
            uploader.reset();
            return r;
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
            window.K("#mediaImg").val(imgAdd);
		});
    }
    sureMediaCutIn(){
        var imgLink = window.K("#mediaImg").val();
        var videoLink = window.K("#mediaLink").val();
        let domStr = `<a href="${videoLink}" style="display: inline-block;position: relative;"  target="_blank">
                        <b style="position:absolute;left:50%;top:50%;z-index:10;transform:translate(-50%, -50%);width:32px;height:32px;background:url(http://inwecrypto-china.oss-cn-shanghai.aliyuncs.com/imgs/1521185444zixun_play.png) no-repeat center center / cover;"></b>
                        <img src="${imgLink}">
                     </a>`;
        window.editor.insertHtml(domStr);
        window.K("#mediaImg").val("");
        window.K("#mediaLink").val("");
        this.setState({
            isShowMediaBox: false
        });
    }
    cancelMediaCover(){
        this.setState({
            isShowMediaBox: false
        })
    }
	render() {
        const {} = this.props;
		const {isShowMediaBox} = this.state;
        
		return (
			<div className="c-editor ui fd-c " >
                <div className={isShowMediaBox ? "mediaUpBox showOut" : "mediaUpBox"} id="mediaUpBox">
                    <div className="uploaderImg">
                        <span>视频封面：</span>
                        <input type="text" id="mediaImg" />
                        <button className="uploadMedia" id="uploadMedia">上传</button>
                    </div>
                    <div className="uploaderLink">
                        <span>视频链接：</span>
                        <input type="text" id="mediaLink" />
                    </div>
                    <div className="btnBox">
                        <button onClick={this.sureMediaCutIn.bind(this)}>确认</button>
                        <button onClick={this.cancelMediaCover.bind(this)}>取消</button>
                    </div>
                </div>
				<textarea id="mul_input" name="content" />
				{/* <button id="aa">aaa</button>
				<button id="bb">bbb</button> */}
			</div>
		);
	}
}
export default Demo;
