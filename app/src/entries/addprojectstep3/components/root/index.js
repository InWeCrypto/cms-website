import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Modal, Button, Pagination } from "antd";
import webUploader from "../../../../assets/js/webuploader.min.js";

import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import Backbtn from "../../../../components/backbtn/index.js";
import Editor from "../../../../components/editor/index.js";

import DropDown from "../../../../components/dropdown/index.js";

import icon from "../../../../assets/images/member_img.png";

import upload from "../../../../assets/images/shangchuan_ico.png";

import "./index.less";
import { toHref, getRouteQuery, getQuery } from "../../../../utils/util";
import { setTimeout } from "timers";
import { stringify } from "querystring";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			c_id: 47,
			type: 0,
			name: "",
			long_name: "",
			img: "",
			website: "",
			unit: "",
			step: 3,
			progressArr: [
				{
					name: "项目概述",
					iscomplete: true
				},
				{
					name: "项目参数",
					iscomplete: true
				},
				{
					name: "项目详情",
					iscomplete: false
				}
			],
			progressArrIco: [
				{
					name: "项目概述",
					iscomplete: true
				},
				{
					name: "项目参数",
					iscomplete: true
				},
				{
					name: "ICO详情",
					iscomplete: true
				},
				{
					name: "ICO结构",
					iscomplete: true
				},
				{
					name: "项目详情",
					iscomplete: false
				}
			],
			isNextLoading: false,
			typeList: [
				"筛选项目状态",
				"交易中",
				"正在进行",
				"即将开始",
				"已结束"
			],
			browserChild: [],
			walletChild: [],
			socialChild: [],
			browserParent: {
				name: "",
				url: ""
			},
			walletParent: {
				name: "",
				url: ""
			},
			socialParent: {
				name: "",
				url: "",
				img: "",
				qr_img: ""
			},
			mediaParentImg: upload,
			mediaParentQrImg: upload
		};
	}
	componentDidMount() {
		let query = getRouteQuery(this);

		//修改模式
		if (query.putMode == "yes") {
			this.setState(
				{
					isPutMode: true,
					c_id: query.c_id
				},
				function() {
					this.putMode();
				}
			);
		}
		//判断是否是ico
		if (query.model == "ico") {
			this.setState({
				isIco: true
			});
		}
		const that = this;
		let lng;
		if (query.lng == "en") {
			this.setState({
				lngText: "英文"
			});
			lng = "en";
		} else if (query.lng == "cn") {
			this.setState({
				lngText: "中文"
			});
			lng = "zh";
		}
		if (query.c_id) {
			this.setState({
				c_id: query.c_id
			});
		}

		//获取阿里云 key
		this.props.getUploadKey("img").then(res => {
			if (res.code === 4000) {
				this.setState({
					aliImgKey: res.data
				});
				console.log(this.state.aliImgKey);
				this.uploader(res.data);
				this.uploaderMedia("mediaImg", function(img) {
					let socialParent = that.state.socialParent;
					socialParent.img = img;
					that.setState({
						socialParent,
						mediaParentImg: img
					});
				});
				this.uploaderMedia("mediaQrImg", function(img) {
					let socialParent = that.state.socialParent;
					socialParent.qr_img = img;
					that.setState({
						socialParent,
						mediaParentQrImg: img
					});
				});
			}
		});
	}
	putMode() {
		const that = this;
		let query = getRouteQuery(this);
		let c_id = this.state.c_id;
		let lang;
		if (query.lng == "cn") {
			lang = "zh";
		} else {
			lang = "en";
		}
		let data = {
			c_id,
			params: {
				lang: lang
			}
		};
		this.props.getProRecommend(data).then(res => {
			let dataArr = res.data;
			if (dataArr.length) {
				let data = dataArr[0];
				this.setState({
					proDesTitle: data.title
				});
				window.editor.appendHtml(data.content);
			}
		});
	}

	firstEndAndNext() {
		let query = getRouteQuery(this);
		toHref("addprojectstep2", "lng=" + query.lng);
		return;
		const {
			type,
			name,
			long_name,
			img,
			website,
			unit,
			token_holder
		} = this.state;
		if (
			type &&
			name &&
			long_name &&
			img &&
			website &&
			unit &&
			token_holder
		) {
			let obj = {
				type,
				name,
				long_name,
				img,
				website,
				unit,
				token_holder
			};

			this.props.postProBaseMess(obj).then(res => {
				this.setState({
					step: 2,
					progressArr: [
						{
							name: "项目概述",
							iscomplete: true
						},
						{
							name: "项目参数",
							iscomplete: false
						},
						{
							name: "项目详情",
							iscomplete: false
						}
					],
					c_id: res.data.id
				});
			});
		} else {
			Modal.warning({
				title: "提示",
				content: "请将上面信息填写完整"
			});
		}
	}
	SecondPrevStep() {
		this.setState({
			step: 1,
			progressArr: [
				{
					name: "项目概述",
					iscomplete: false
				},
				{
					name: "项目参数",
					iscomplete: false
				},
				{
					name: "项目详情",
					iscomplete: false
				}
			]
		});
	}
	SecondNextStep() {
		const {
			icoPrice,
			walletParent,
			walletChild,
			browserParent,
			browserChild,
			socialParent,
			socialChild,
			c_id
		} = this.state;
		const that = this;

		//创建数据结构
		function createdObj(parent, child, isSocial) {
			let params = [];
			if (parent.name && parent.url) {
				let parentObj = {
					name: parent.name,
					url: parent.url
				};
				if (parent.img) {
					parentObj.img = parent.img;
				}
				if (parent.qr_img) {
					parentObj.qr_img = parent.qr_img;
				}
				params.push(parentObj);
			}
			child.map((val, idx) => {
				if (val.name && val.url) {
					let childObj;
					if (isSocial) {
						childObj = {
							name: val.name,
							url: val.url,
							img: val.img,
							qr_img: val.qr_img
						};
					} else {
						childObj = {
							name: val.name,
							url: val.url
						};
					}

					params.push(childObj);
				}
			});
			return params;
		}
		//浏览器
		let browserObj = {
			c_id,
			params: createdObj(browserParent, browserChild)
		};
		let browserFlag = false;

		//钱包
		let walletObj = {
			c_id,
			params: createdObj(walletParent, walletChild)
		};
		let walletFlag = false;

		//社交
		let socialObj = {
			c_id,
			params: createdObj(socialParent, socialChild, true)
		};
		let socialFlag = false;

		function isAllDone(isJump) {
			if (
				((browserFlag || browserObj.params.length == 0) &&
					(walletFlag || walletObj.params.length == 0) &&
					(socialFlag || socialObj.params.length == 0)) ||
				isJump
			) {
				that.setState({
					step: 3,
					progressArr: [
						{
							name: "项目概述",
							iscomplete: true
						},
						{
							name: "项目参数",
							iscomplete: true
						},
						{
							name: "项目详情",
							iscomplete: false
						}
					]
				});
			}
		}

		if (browserObj.params.length > 0) {
			this.props.postProBrowser(browserObj).then(res => {
				browserFlag = true;
				isAllDone();
			});
		}

		if (walletObj.params.length > 0) {
			this.props.postProWallet(walletObj).then(res => {
				walletFlag = true;
				isAllDone();
			});
		}
		if (socialObj.params.length > 0) {
			this.props.postProSocial(socialObj).then(res => {
				socialFlag = true;
				isAllDone();
			});
		}

		//都为空，直接跳转至下一步
		if (
			browserObj.params.length == 0 &&
			walletObj.params.length == 0 &&
			socialObj.params.length == 0
		) {
			isAllDone(true);
		}
	}
	public() {
		const that = this;
		let query = getRouteQuery(this);
		let obj = {
			title: this.state.proDesTitle ? this.state.proDesTitle : "",
			content: window.editor.fullHtml(),
			lang: "zh"
		};
		if (query.lng == "en") {
			obj.lang = "en";
		}
		let data = {
			c_id: this.state.c_id,
			params: obj
		};
		this.props.proRecommend(data).then(res => {
			let lng = query.lng;
			let c_id = that.state.c_id;
			//toHref("prodashboard", "type=1&lng=" + lng + "&c_id=" + c_id);
			if (res.code == 4000) {
				this.setState({
					step: 4,
					progressArr: [
						{
							name: "项目概述",
							iscomplete: true
						},
						{
							name: "项目参数",
							iscomplete: true
						},
						{
							name: "项目详情",
							iscomplete: true
						}
					]
				});
			}
		});

		//alert(window.editor.fullHtml());
		// this.getEditorHtml(function(val) {
		// 	console.log(val);
		// });
	}
	toDashboard() {
		toHref("prodashboard", "type=1");
	}
	toProList() {
		toHref("project");
	}
	getProLongName(val) {
		this.setState({
			long_name: val
		});
	}
	getProName(val) {
		this.setState({
			name: val
		});
	}

	getDropdownKey(key) {
		this.setState({
			type: key
		});
	}
	//上传图片
	uploader(data) {
		const option = data;

		if (!option) {
			return;
		}
		this.setState({
			uploaderOption: option
		});
		let uploader = webUploader.create({
			auto: true,
			pick: {
				id: "#ban_uploader",
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

			this.setState({
				img: imgAdd
			});
		});
	}

	getProWebSit(val) {
		this.setState({
			website: val
		});
	}
	getProUnit(val) {
		this.setState({
			unit: val
		});
	}
	getHolder(val) {
		this.setState({
			token_holder: val
		});
	}
	addBrowserChild() {
		let browserChild = this.state.browserChild;
		let arr = [
			...browserChild,
			{
				name: "",
				url: ""
			}
		];
		this.setState({
			browserChild: arr
		});
	}
	subBrowserChild(index) {
		let browserChild = this.state.browserChild;
		let arr = [...browserChild];
		arr.splice(index, 1);
		this.setState({
			browserChild: arr
		});
	}
	getValNameOrUrl(val, idx, isName) {
		let browserChild = this.state.browserChild;
		let arr = [...browserChild];

		if (isName) {
			let obj = new Object(arr[idx]);
			obj.name = val;
			arr[idx] = obj;
		} else {
			let obj = new Object(arr[idx]);
			obj.url = val;
			arr[idx] = obj;
		}
		this.setState({
			browserChild: arr
		});
	}
	getValNameOrUrlBrowserParent(val, idx, isName) {
		let browserParent = this.state.browserParent;
		if (isName) {
			browserParent.name = val;
		} else {
			browserParent.url = val;
		}
		this.setState({
			browserParent: browserParent
		});
	}
	addWalletChild() {
		let walletChild = this.state.walletChild;
		let arr = [
			...walletChild,
			{
				name: "",
				url: "",
				img: "",
				qr_img: ""
			}
		];
		this.setState({
			walletChild: arr
		});
	}
	subWalletChild(index) {
		let walletChild = this.state.walletChild;
		let arr = [...walletChild];
		arr.splice(index, 1);
		this.setState({
			walletChild: arr
		});
	}
	getValNameOrUrl2Wallet(val, idx, isName) {
		let walletChild = this.state.walletChild;
		let arr = [...walletChild];

		if (isName) {
			let obj = new Object(arr[idx]);
			obj.name = val;
			arr[idx] = obj;
		} else {
			let obj = new Object(arr[idx]);
			obj.url = val;
			arr[idx] = obj;
		}
		this.setState({
			walletChild: arr
		});
	}
	getValNameOrUrlWalletParent(val, idx, isName) {
		let walletParent = this.state.walletParent;
		if (isName) {
			walletParent.name = val;
		} else {
			walletParent.url = val;
		}
		this.setState({
			walletParent: walletParent
		});
	}
	addSocialChild() {
		let that = this;
		let socialChild = this.state.socialChild;
		let arr = [
			...socialChild,
			{
				name: "",
				url: "",
				img: "",
				qr_img: ""
			}
		];
		this.setState(
			{
				socialChild: arr
			},
			() => {
				//shangchuang
				let len = arr.length - 1;
				let idStr = "mediaImg" + len;
				let idQrStr = "mediaQrImg" + len;

				that.uploaderMedia(idStr, function(img) {
					let arr = that.state.socialChild;
					arr[len].img = img;
					that.setState(
						{
							socialChild: arr
						},
						function() {
							console.log(111, that.state);
						}
					);
				});

				that.uploaderMedia(idQrStr, function(img) {
					let arr = that.state.socialChild;
					let sObj = new Object(arr[len]);
					sObj.qr_img = img;
					arr[len] = sObj;
					that.setState(
						{
							socialChild: arr
						},
						function() {
							console.log(222, this.state.socialChild);
						}
					);
				});
			}
		);
	}
	subSocialChild(index) {
		let socialChild = this.state.socialChild;
		let arr = [...socialChild];
		arr.splice(index, 1);
		this.setState({
			socialChild: arr
		});
	}
	getValNameOrUrl2Social(val, idx, isName) {
		let socialChild = this.state.socialChild;
		let arr = [...socialChild];

		if (isName) {
			let obj = new Object(arr[idx]);
			obj.name = val;
			arr[idx] = obj;
		} else {
			let obj = new Object(arr[idx]);
			obj.url = val;
			arr[idx] = obj;
		}
		this.setState({
			socialChild: arr
		});
	}
	getValNameOrUrlSocialParent(val, idx, isName) {
		let socialParent = this.state.socialParent;
		if (isName) {
			socialParent.name = val;
		} else {
			socialParent.url = val;
		}
		this.setState({
			socialParent: socialParent
		});
	}
	getIcoPrice(val) {
		this.setState({
			icoPrice: val
		});
	}

	//上传媒体图片
	uploaderMedia(id, callback) {
		const option = this.state.uploaderOption;
		if (!option) {
			return;
		}
		let uploader = webUploader.create({
			auto: true,
			pick: {
				id: "#" + id,
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
			if (callback) {
				callback(imgAdd);
			}
		});
	}
	getProDesTitle(val) {
		this.setState({
			proDesTitle: val
		});
	}

	render() {
		const {
			isIco,
			isNextLoading,
			progressArr,
			step,
			lngText,
			typeList,
			type,
			name,
			long_name,
			img,
			website,
			unit,
			token_holder,
			browserChild,
			walletChild,
			socialChild,
			icoPrice,
			mediaParentImg,
			mediaParentQrImg,
			aliImgKey,
			progressArrIco,
			proDesTitle
		} = this.state;
		const { getUploadKey } = this.props;
		const logoContent = (
			<div className="content ui">
				<div className="imgBox">
					<img className="img" src={upload} alt="" />
				</div>
				<div className="updatelogo" id="ban_uploader" />
				{img && (
					<div className="logoBox">
						<img className="img" src={img} alt="" />
					</div>
				)}
				<div className="textmess">
					上传项目的logo，尺寸为：94*94,可提让UI提供
				</div>
			</div>
		);

		const typeContent = (
			<DropDown
				getkey={this.getDropdownKey.bind(this)}
				typeList={typeList}
			/>
		);

		return (
			<div className="mainBox addprojectstep3 ">
				<Backbtn />
				<div className="title">
					你正在编辑{lngText}版本，请全部使用{lngText}描述
				</div>
				<div className="progessbox">
					<Progress arr={isIco ? progressArrIco : progressArr} />
				</div>
				<div className={step == 3 ? "titleBox" : "titleBox Hide"}>
					<Input
						val={proDesTitle}
						getval={this.getProDesTitle.bind(this)}
						name="这里是标题"
						placeholder="（项目介绍无需但标题）"
						width="6.32rem"
					/>
				</div>
				<div className={step == 3 ? "step3" : "step3 Hide"}>
					<div className="editArea Xcenter">
						<Editor />
					</div>
					<button
						className="c-btn-big btn-next Xcenter"
						onClick={this.public.bind(this)}
					>
						提交发布
					</button>
				</div>
				<div
					className={
						step == 4 ? "stepEnd ui fd-c" : "stepEnd ui fd-c Hide"
					}
				>
					<h1>发布成功！</h1>
					<h3>请及时通知后端同学配置项目其他参数</h3>
					<button
						className="c-btn-big btn-next"
						style={{ width: "2.3rem" }}
						onClick={this.toProList.bind(this)}
					>
						返回项目页
					</button>
				</div>
			</div>
		);
	}
}
