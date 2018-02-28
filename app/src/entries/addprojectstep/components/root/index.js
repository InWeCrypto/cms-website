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
import { toHref, getRouteQuery } from "../../../../utils/util";
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
			],
			progressArrIco: [
				{
					name: "项目概述",
					iscomplete: false
				},
				{
					name: "项目参数",
					iscomplete: false
				},
				{
					name: "ICO详情",
					iscomplete: false
				},
				{
					name: "ICO结构",
					iscomplete: false
				},
				{
					name: "项目详情",
					iscomplete: false
				}
			],
			isNextLoading: false,
			typeList: ["筛选项目状态", "正在进行", "即将开始", "已结束"],
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
		//url存在c_id，进入修改模式
		if (query.c_id) {
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
		} else {
			this.setState({
				type: 1,
				onlyType: true
			});
		}
		const that = this;
		if (query.lng == "en") {
			this.setState({
				lngText: "英文"
			});
		} else if (query.lng == "cn" || query.lng == "zh") {
			this.setState({
				lngText: "中文"
			});
		}
		//获取阿里云 key
		this.props.getUploadKey("img").then(res => {
			if (res.code === 4000) {
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
		let c_id = this.state.c_id;
		this.props.getProDetail(c_id).then(res => {
			let data = res.data;
			let type = 0;
			if (data.type) {
				type = data.type - 1;
			}
			that.setState({
				long_name: data.long_name,
				name: data.name,
				type,
				chargeType: data.type,
				img: data.img,
				website: data.website,
				unit: data.unit,
				token_holder: data.token_holder,
				ico_price: data.ico_price,
				desc: data.desc
			});
		});
	}

	firstEndAndNext() {
		const {
			c_id,
			type,

			name,
			long_name,
			img,
			website,
			unit,
			token_holder,
			ico_price,
			desc
		} = this.state;
		if (
			type &&
			name &&
			long_name &&
			img &&
			website &&
			unit &&
			token_holder &&
			desc
		) {
			let obj = {
				type,
				name,
				long_name,
				img,
				website,
				unit,
				token_holder,
				ico_price,
				desc
			};
			let isPutMode = this.state.isPutMode;
			//修改或添加模式
			if (isPutMode) {
				let data = {
					id: c_id,
					params: obj
				};
				//修改
				this.props.putProBaseMess(data).then(res => {
					let query = getRouteQuery(this);
					let queryStr =
						"lng=" + query.lng + "&c_id=" + c_id + "&putMode=yes";
					if (query.model == "ico") {
						queryStr += "&model=ico";
					}
					toHref("addprojectstep2", queryStr);
				});
			} else {
				//添加
				this.props.postProBaseMess(obj).then(res => {
					let query = getRouteQuery(this);
					let queryStr = "lng=" + query.lng + "&c_id=" + res.data.id;
					if (query.model == "ico") {
						queryStr += "&model=ico";
					}
					toHref("addprojectstep2", queryStr);
				});
			}
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
	toDashboard() {
		toHref("prodashboard", "type=1");
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
		var type = parseInt(key) + 1;
		this.setState({
			type
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
			ico_price: val
		});
	}
	getIcoDesc(val) {
		this.setState({
			desc: val
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

	render() {
		const {
			isIco,
			isNextLoading,
			progressArr,
			progressArrIco,
			step,
			lngText,
			typeList,
			type,
			onlyType,
			chargeType,
			name,
			long_name,
			img,
			website,
			unit,
			token_holder,
			browserChild,
			walletChild,
			socialChild,
			ico_price,
			desc,
			mediaParentImg,
			mediaParentQrImg
		} = this.state;
		const { getUploadKey } = this.props;
		const logoContent = (
			<div className="content ui">
				<div className="imgBox">
					<img className="img" src={img ? img : upload} alt="" />
				</div>
				<div className="updatelogo" id="ban_uploader" />
				<div className="textmess">
					上传项目的logo，尺寸为：94*94,可提让UI提供
				</div>
			</div>
		);
		const typeContent = (
			<DropDown
				type={type}
				getkey={this.getDropdownKey.bind(this)}
				typeList={typeList}
			/>
		);

		return (
			<div className="mainBox addprojectstep ">
				<Backbtn />
				<div className="title">
					你正在编辑{lngText}版本，请全部使用{lngText}描述
				</div>
				<div className="progessbox">
					<Progress arr={isIco ? progressArrIco : progressArr} />
				</div>
				<div className={step == 1 ? "step1" : "step1 Hide"}>
					<div className="formBox1 eleScroll ">
						<div className="scrollBox holdBottom-3">
							<div className="inputBox mgt-3">
								<Input
									val={long_name}
									getval={this.getProLongName.bind(this)}
									name="项目全称"
									placeholder="填写需要添加的项目中文名，若没有可填写英文"
									width="6.32rem"
								/>
							</div>
							<div className="inputBox mgt-3">
								<Input
									val={name}
									getval={this.getProName.bind(this)}
									name="项目简称"
									placeholder="如BTC/ETH等的简称"
									width="6.32rem"
								/>
							</div>
							{!onlyType && (
								<div className="logo mgt-3">
									<Formtext
										name="项目类型"
										content={typeContent}
									/>
								</div>
							)}

							<div className="logo mgt-3">
								<Formtext
									name="项目Logo"
									content={logoContent}
								/>
							</div>
							<div className="mgt-3" />
							<Input
								val={website}
								getval={this.getProWebSit.bind(this)}
								name="项目官网"
								placeholder="官方网站"
								width="6.32rem"
							/>
							<div className="mgt-3">
								<Input
									val={unit}
									getval={this.getProUnit.bind(this)}
									name="项目符号"
									placeholder="项目符号如：TNC"
									width="6.32rem"
								/>
							</div>

							<div className="mgt-3">
								<Input
									val={token_holder}
									getval={this.getHolder.bind(this)}
									name="代币持有者"
									placeholder="代币持有者"
									width="6.32rem"
								/>
							</div>
							{type == 1 && (
								<div className="mgt-3">
									<Input
										val={ico_price}
										getval={this.getIcoPrice.bind(this)}
										name="ICO价格"
										placeholder="必填项"
										width="6.32rem"
									/>
								</div>
							)}

							<div className="mgt-3">
								<Input
									val={desc}
									getval={this.getIcoDesc.bind(this)}
									name="项目描述"
									placeholder="必填项"
									width="6.32rem"
								/>
							</div>
						</div>
					</div>
					<button
						className="c-btn-big firstBtnSave Xcenter"
						onClick={this.firstEndAndNext.bind(this)}
					>
						保存，下一步
						{/* {isNextLoading ? (
							<div className="loadingBox">
								<Spin />
							</div>
						) : (
							"保存，下一步"
						)} */}
					</button>
				</div>
				<div className={step == 2 ? "step2" : "step2 Hide"}>
					<div className="formBox1 eleScroll">
						<div className="scrollBox holdBottom-3">
							<div className="inputBox net">
								<div className="in-parent">
									<div className="netbox-c1 ui">
										<Input2
											name="浏览器"
											mess="非必填项"
											placeholder="支持的区块浏览器名字"
											placeholder2="对应的链接"
											width="1.7rem"
											getvalname={this.getValNameOrUrlBrowserParent.bind(
												this
											)}
											getvalurl={this.getValNameOrUrlBrowserParent.bind(
												this
											)}
										/>
										<div
											className="addIcon Ycenter"
											onClick={this.addBrowserChild.bind(
												this
											)}
										/>
									</div>
								</div>
								{browserChild && (
									<div className="in-child">
										{browserChild &&
											browserChild.map((val, idx) => {
												return (
													<div
														className={
															val.isHide
																? "netbox-c1 Hide"
																: "netbox-c1"
														}
														key={idx}
													>
														<Input2
															idx={idx}
															getvalname={this.getValNameOrUrl.bind(
																this
															)}
															getvalurl={this.getValNameOrUrl.bind(
																this
															)}
															placeholder="支持的区块浏览器名字"
															placeholder2="对应的链接"
															width="1.7rem"
														/>
														<div
															className="subIcon Ycenter"
															onClick={this.subBrowserChild.bind(
																this,
																idx
															)}
														/>
													</div>
												);
											})}
									</div>
								)}
							</div>
							<div className="inputBox wallet">
								<div className="in-parent">
									<div className="netbox-c1 ui">
										<Input2
											name="钱包"
											mess="非必填项"
											placeholder="支持的钱包名称"
											placeholder2="对应的下载链接"
											width="1.7rem"
											getvalname={this.getValNameOrUrlWalletParent.bind(
												this
											)}
											getvalurl={this.getValNameOrUrlWalletParent.bind(
												this
											)}
										/>
										<div
											className="addIcon Ycenter"
											onClick={this.addWalletChild.bind(
												this
											)}
										/>
									</div>
								</div>
								{walletChild && (
									<div className="in-child">
										{walletChild &&
											walletChild.map((val, idx) => {
												return (
													<div
														className={
															val.isHide
																? "netbox-c1 Hide"
																: "netbox-c1"
														}
														key={idx}
													>
														<Input2
															idx={idx}
															getvalname={this.getValNameOrUrl2Wallet.bind(
																this
															)}
															getvalurl={this.getValNameOrUrl2Wallet.bind(
																this
															)}
															placeholder="支持的钱包名称"
															placeholder2="对应的下载链接"
															width="1.7rem"
														/>
														<div
															className="subIcon Ycenter"
															onClick={this.subWalletChild.bind(
																this,
																idx
															)}
														/>
													</div>
												);
											})}
									</div>
								)}
							</div>
							<div className="inputBox noafter social">
								<div className="in-parent">
									<div className="netbox-c1 ui">
										<Input2
											name="社交链接"
											mess="非必填项"
											placeholder="选择对应的社交途径"
											placeholder2="对应的链接"
											width="2rem"
											getvalname={this.getValNameOrUrlSocialParent.bind(
												this
											)}
											getvalurl={this.getValNameOrUrlSocialParent.bind(
												this
											)}
										/>

										<div
											className="addIcon Ycenter"
											onClick={this.addSocialChild.bind(
												this
											)}
										/>
									</div>
									<div className="mediaUploadimg ui">
										媒体图标上传
										<div className="iconUpload">
											<div
												className="icon"
												id="mediaImg"
											/>
											<img
												className="img"
												src={mediaParentImg}
												alt=""
											/>
										</div>
										媒体二维码上传,如微信二维码
										<div className="iconUpload">
											<div
												className="icon"
												id="mediaQrImg"
											/>
											<img
												className="img"
												src={mediaParentQrImg}
												alt=""
											/>
										</div>
									</div>
								</div>
								{socialChild && (
									<div className="in-child">
										{socialChild &&
											socialChild.map((val, idx) => {
												console.log(val);
												return (
													<div
														className="socialMar"
														key={idx}
													>
														<div
															className={
																val.isHide
																	? "netbox-c1 Hide"
																	: "netbox-c1"
															}
															key={idx}
														>
															<Input2
																idx={idx}
																getvalname={this.getValNameOrUrl2Social.bind(
																	this
																)}
																getvalurl={this.getValNameOrUrl2Social.bind(
																	this
																)}
																placeholder="选择对应的社交途径"
																placeholder2="对应的链接"
																width="1.7rem"
															/>
															<div
																className="subIcon Ycenter"
																onClick={this.subSocialChild.bind(
																	this,
																	idx
																)}
															/>
														</div>
														<div className="mediaUploadimg ui">
															媒体图标上传
															<div className="iconUpload">
																<div
																	className="icon"
																	id={
																		"mediaImg" +
																		idx
																	}
																/>
																<img
																	className="img"
																	src={
																		val.img
																			? val.img
																			: upload
																	}
																	keyy={stringify(
																		val.img
																	)}
																	alt=""
																/>
															</div>
															媒体二维码上传,如微信二维码
															<div className="iconUpload">
																<div
																	className="icon"
																	id={
																		"mediaQrImg" +
																		idx
																	}
																/>
																<img
																	className="img"
																	src={
																		val.qr_img
																			? val.qr_img
																			: upload
																	}
																	keyy={val}
																	alt=""
																/>
															</div>
														</div>
													</div>
												);
											})}
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="ui btnbox firstBtnSave Xcenter jc-sb ">
						<button
							className="c-btn-big btn-prev"
							onClick={this.SecondPrevStep.bind(this)}
						>
							上一步
						</button>
						<button
							className="c-btn-big btn-next mgr0"
							onClick={this.SecondNextStep.bind(this)}
						>
							保存，下一步
						</button>
					</div>
				</div>
				<div className={step == 3 ? "step3" : "step3 Hide"}>
					<div className="editArea">
						<Editor />
					</div>
					<button
						className="c-btn-big btn-next"
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
						onClick={this.toDashboard.bind(this)}
					>
						返回项目页查看详情
					</button>
				</div>
			</div>
		);
	}
}
