import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, DatePicker } from "antd";
import moment from "moment";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import Backbtn from "../../../../components/backbtn/index.js";
import Editor from "../../../../components/editor/index.js";

import icon from "../../../../assets/images/member_img.png";
import upload from "../../../../assets/images/shangchuan_ico.png";
import { toHref, getRouteQuery } from "../../../../utils/util";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
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
			startValue: null,
			endValue: null,
			endOpen: false
		};
	}
	componentDidMount() {
		let query = getRouteQuery(this);
		let lng;
		if (query.lng == "en") {
			this.setState({
				lngText: "英文"
			});
			lng = "en";
		} else if (query.lng == "cn" || query.lng == "zh") {
			this.setState({
				lngText: "中文"
			});
			lng = "zh";
		}
		//拉数据判断
		this.getIcoIntrunduce(lng, query.c_id);
	}
	getIcoIntrunduce(lng, id) {
		let data = {
			c_id: id,
			params: {
				lang: lng
			}
		};
		this.props.getIcoRate(data).then(res => {
			let dataArr = res.data;
			//启用修改
			if (dataArr.length > 0) {
				let data = dataArr[0];
				this.setState({
					proId: data.id,
					isPutMode: true,
					endTime: data.end_at,
					startTime: data.start_at,
					content: data.content
				});
				window.editor.appendHtml(data.content);
			}
		});
	}
	disabledStartDate = startValue => {
		const endValue = this.state.endValue;
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	};

	disabledEndDate = endValue => {
		const startValue = this.state.startValue;
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	};

	onChange = (field, value) => {
		this.setState({
			[field]: value
		});
	};

	onStartChange = (value, str) => {
		this.onChange("startValue", value);
		this.setState({
			startTime: str
		});
	};

	onEndChange = (value, str) => {
		this.onChange("endValue", value);
		this.setState({
			endTime: str
		});
	};

	handleStartOpenChange = open => {
		if (!open) {
			this.setState({ endOpen: true });
		}
	};

	handleEndOpenChange = open => {
		this.setState({ endOpen: open });
	};
	nextStep1() {
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
			]
		});
	}
	prevStep2() {
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
			]
		});
	}
	nextStep2() {
		this.setState({
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
			]
		});
	}
	prevStep3() {
		history.go(-1);
		// this.setState({
		// 	step: 2,
		// 	progressArr: [
		// 		{
		// 			name: "项目概述",
		// 			iscomplete: true
		// 		},
		// 		{
		// 			name: "项目参数",
		// 			iscomplete: false
		// 		},
		// 		{
		// 			name: "ICO详情",
		// 			iscomplete: false
		// 		},
		// 		{
		// 			name: "ICO结构",
		// 			iscomplete: false
		// 		},
		// 		{
		// 			name: "项目详情",
		// 			iscomplete: false
		// 		}
		// 	]
		// });
	}
	nextStep3() {
		let query = getRouteQuery(this);
		let lng = query.lng;
		if (lng == "cn" || query.lng == "zh") {
			lng = "zh";
		}
		//是否是修改模式
		let putMode = query.putMode;
		let c_id = query.c_id;
		let content = window.editor.fullHtml();
		let startTime = this.state.startTime;
		let endTime = this.state.endTime;
		let proId = this.state.proId;

		let data = {
			c_id,
			proId,
			params: {
				start_at: startTime, // ICO开始时间
				end_at: endTime, // ICO介绍时间
				content: content, // ICO介绍内容
				lang: lng // ICO介绍语言
			}
		};

		if (this.state.isPutMode) {
			//修改项目
			this.props.putProIco(data).then(res => {
				if (res.code == 4000) {
					console.log(res);
					let queryStr =
						"lng=" +
						query.lng +
						"&c_id=" +
						query.c_id +
						"&putMode=yes";
					toHref("addprojectstepico4", queryStr);
				}
			});
		} else {
			//添加项目
			this.props.postProIco(data).then(res => {
				if (res.code == 4000) {
					let queryStr = "lng=" + query.lng + "&c_id=" + query.c_id;
					toHref("addprojectstepico4", queryStr);
				}
			});
		}

		// this.setState({
		// 	step: 4,
		// 	progressArr: [
		// 		{
		// 			name: "项目概述",
		// 			iscomplete: true
		// 		},
		// 		{
		// 			name: "项目参数",
		// 			iscomplete: true
		// 		},
		// 		{
		// 			name: "ICO详情",
		// 			iscomplete: true
		// 		},
		// 		{
		// 			name: "ICO结构",
		// 			iscomplete: false
		// 		},
		// 		{
		// 			name: "项目详情",
		// 			iscomplete: false
		// 		}
		// 	]
		// });
	}
	prevStep4() {
		this.setState({
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
			]
		});
	}
	nextStep4() {
		this.setState({
			step: 5,
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
			]
		});
	}
	prevStep5() {
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
					name: "ICO详情",
					iscomplete: true
				},
				{
					name: "ICO结构",
					iscomplete: false
				},
				{
					name: "项目详情",
					iscomplete: false
				}
			]
		});
	}
	nextStep5() {
		this.setState({
			step: 6,
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
					name: "ICO详情",
					iscomplete: true
				},
				{
					name: "ICO结构",
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
		toHref("prodashboard", "type=2");
	}
	render() {
		const {
			progressArr,
			startValue,
			endValue,
			endOpen,
			step,
			lngText,
			endTime,
			startTime
		} = this.state;
		const {} = this.props;
		const logoContent = (
			<div className="content ui">
				<div className="updatelogo">
					<img className="img" src={upload} alt="" />
				</div>
				<div className="textmess">
					上传项目的logo，尺寸为：94*94,可提让UI提供
				</div>
			</div>
		);
		return (
			<div className="mainBox addprojectstepico3">
				<Backbtn />
				<div className="title">
					你正在编辑{lngText}版本，请全部使用{lngText}描述
				</div>
				<div className="progessbox">
					<Progress arr={progressArr} />
				</div>
				<div className={step == 1 ? "step1" : "step1 Hide"}>
					<div className="formBox1 ui fd-c jc-sa">
						<Input
							name="项目全称"
							placeholder="填写需要添加的项目中文名，若没有可填写英文"
							width="6.32rem"
						/>
						<Input
							name="项目简称"
							placeholder="如BTC/ETH等的简称"
							width="6.32rem"
						/>
						<Input
							name="项目类型"
							placeholder="简要描述项目到底是做什么的，不宜过长"
							width="6.32rem"
						/>
						<Formtext name="项目Logo" content={logoContent} />
						<Input
							name="项目官网"
							placeholder="官方网站"
							width="6.32rem"
						/>
					</div>
					<button
						className="c-btn-big btn-next"
						onClick={this.nextStep1.bind(this)}
					>
						保存，下一步
					</button>
				</div>
				<div className={step == 2 ? "step2" : "step2 Hide"}>
					<div className="formBox1 heiauto">
						<div className="inputBox net">
							<div className="in-parent">
								<div className="netbox-c1 ui">
									<Input2
										name="浏览器"
										mess="非必填项"
										placeholder="支持的区块浏览器名字"
										placeholder2="对应的链接"
										width="1.7rem"
									/>
									<div className="addIcon Ycenter" />
								</div>
							</div>
							<div className="in-child">
								<div className="netbox-c1">
									<Input2
										placeholder="支持的区块浏览器名字"
										placeholder2="对应的链接"
										width="1.7rem"
									/>
									<div className="subIcon Ycenter" />
								</div>
							</div>
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
									/>
									<div className="addIcon Ycenter" />
								</div>
							</div>
							<div className="in-child">
								<div className="netbox-c1">
									<Input2
										placeholder="支持的钱包名称"
										placeholder2="对应的下载链接"
										width="1.7rem"
									/>
									<div className="subIcon Ycenter" />
								</div>
							</div>
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
									/>
									<div className="addIcon Ycenter" />
								</div>
							</div>
							<div className="in-child">
								<div className="netbox-c1">
									<Input2
										placeholder="选择对应的社交途径"
										placeholder2="对应的链接"
										width="2rem"
									/>
									<div className="subIcon Ycenter" />
								</div>
							</div>
						</div>
					</div>
					<div className="ui btnbox jc-sb ">
						<button
							className="c-btn-big btn-prev"
							onClick={this.prevStep2.bind(this)}
						>
							上一步
						</button>
						<button
							className="c-btn-big btn-next mgr0"
							onClick={this.nextStep2.bind(this)}
						>
							保存，下一步
						</button>
					</div>
				</div>
				<div
					className={
						step == 3 ? "step3 containBox" : "step3 containBox Hide"
					}
				>
					<div className="icoContent Xcenter contentBlack">
						<div className="time">
							<div className="mess">ICO时间</div>
							<div className="timerpicker">
								<DatePicker
									disabledDate={this.disabledStartDate}
									showTime
									format="YYYY-MM-DD HH:mm:ss"
									value={startValue}
									placeholder={
										startTime ? startTime : "ICO开始时间"
									}
									onChange={this.onStartChange}
									onOpenChange={this.handleStartOpenChange}
								/>
								<span className="timeline" />
								<DatePicker
									disabledDate={this.disabledEndDate}
									showTime
									format="YYYY-MM-DD HH:mm:ss"
									value={endValue}
									placeholder={
										endTime ? endTime : "ICO结束时间"
									}
									onChange={this.onEndChange}
									open={endOpen}
									onOpenChange={this.handleEndOpenChange}
								/>
							</div>
						</div>
						<div className="icotitle">
							<div>ICO详情</div>
						</div>
						<div className="editorContainer">
							<Editor />
						</div>

						{/* <div className="icodetails ui jc-sb">
							<input
								placeholder="填写如“接受代币”等的ICO参数内容"
								className="content"
								type="text"
							/>
							<input
								placeholder="ETH/BTC"
								className="content"
								type="text"
							/>
							<div className="addIcon Ycenter" />
						</div>
						<div className="icodetails ui jc-sb">
							<input
								placeholder="填写如“接受代币”等的ICO参数内容"
								className="content"
								type="text"
							/>
							<input
								placeholder="ETH/BTC"
								className="content"
								type="text"
							/>
							<div className="subIcon Ycenter" />
						</div> */}
					</div>
					<div className="ui btnbox jc-sb Xcenter">
						<button
							className="c-btn-big btn-prev"
							onClick={this.prevStep3.bind(this)}
						>
							上一步
						</button>
						<button
							className="c-btn-big btn-next mgr0"
							onClick={this.nextStep3.bind(this)}
						>
							保存，下一步
						</button>
					</div>
				</div>
				<div className={step == 4 ? "step4" : "step4 Hide"}>
					<div className="icoContent">
						<div className="icodetails ui jc-sb">
							<input
								placeholder="%比例填写"
								className="content1"
								type="text"
							/>
							<input
								placeholder="比例说明"
								className="content2"
								type="text"
							/>
							<div className="addIcon Ycenter" />
						</div>
						<div className="icodetails ui jc-sb">
							<input
								placeholder="%比例填写"
								className="content1"
								type="text"
							/>
							<input
								placeholder="比例说明"
								className="content2"
								type="text"
							/>
							<div className="subIcon Ycenter" />
						</div>

						<div className="tip">TIP：比例总和需要达到100%</div>
					</div>
					<div className="ui btnbox jc-sb ">
						<button
							className="c-btn-big btn-prev"
							onClick={this.prevStep4.bind(this)}
						>
							上一步
						</button>
						<button
							className="c-btn-big btn-next mgr0"
							onClick={this.nextStep4.bind(this)}
						>
							保存，下一步
						</button>
					</div>
				</div>
				<div className={step == 5 ? "step5" : "step5 Hide"}>
					<div className="editArea" />
					<button
						className="c-btn-big btn-next"
						onClick={this.nextStep5.bind(this)}
					>
						提交发布
					</button>
				</div>
				<div
					className={
						step == 6 ? "stepEnd ui fd-c" : "stepEnd ui fd-c Hide"
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
