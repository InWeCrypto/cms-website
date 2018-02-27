import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, DatePicker } from "antd";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import Backbtn from "../../../../components/backbtn/index.js";

import icon from "../../../../assets/images/member_img.png";
import upload from "../../../../assets/images/shangchuan_ico.png";
import { toHref, getRouteQuery } from "../../../../utils/util";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
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
			],
			startValue: null,
			endValue: null,
			endOpen: false,
			rateChild: [
				{
					percentage: "", // 结构比例
					color_name: "", // 结构名称
					color_value: "", // 结构颜色
					desc: "", // 结构描述
					lang: this.setLng()
				}
			],
			rateParent: {
				name: "",
				num: ""
			}
		};
	}
	setLng() {
		let query = getRouteQuery(this);
		if (query.lng == "cn" || query.lng == "zh") {
			return "zh";
		} else {
			return "en";
		}
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
		//获取列表
		let c_id = query.c_id;
		let data = {
			c_id,
			params: {
				lang: lng
			}
		};

		this.props.getIcoStructure(data).then(res => {
			let data = res.data;
			//修改模式
			if (data.length > 0) {
				this.setState({
					isPutMode: true,
					rateChild: data
				});
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

	onStartChange = value => {
		this.onChange("startValue", value);
	};

	onEndChange = value => {
		this.onChange("endValue", value);
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
	nextStep3() {
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
	prevStep4() {
		history.go(-1);
	}
	nextStep4() {
		let query = getRouteQuery(this);
		let lng = query.lng;
		let c_id = query.c_id;
		let putMode = query.putMode;
		let data = {
			c_id,
			params: this.state.rateChild
		};
		if (this.state.isPutMode) {
			//修改项目
			this.props.postProIcoRate(data).then(res => {
				if (res.code == 4000) {
					let queryStr =
						"lng=" +
						query.lng +
						"&c_id=" +
						query.c_id +
						"&putMode=yes&model=ico";
					toHref("addprojectstep3", queryStr);
				}
			});
		} else {
			//添加项目
			this.props.postProIcoRate(data).then(res => {
				if (res.code == 4000) {
					let queryStr =
						"lng=" +
						query.lng +
						"&c_id=" +
						query.c_id +
						"&model=ico";
					toHref("addprojectstep3", queryStr);
				}
			});
		}
		// this.setState({
		// 	step: 5,
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
		// 			iscomplete: true
		// 		},
		// 		{
		// 			name: "项目详情",
		// 			iscomplete: false
		// 		}
		// 	]
		// });
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

	addRateChild() {
		let rateChild = this.state.rateChild;
		let arr = [
			...rateChild,
			{
				percentage: "", // 结构比例
				color_name: "", // 结构名称
				color_value: "", // 结构颜色
				desc: "", // 结构描述
				lang: this.setLng()
			}
		];
		this.setState({
			rateChild: arr
		});
	}
	subRateChild(index) {
		let rateChild = this.state.rateChild;
		let arr = [...rateChild];
		arr.splice(index, 1);
		this.setState({
			rateChild: arr
		});
	}
	setRateCell(idx, type, event) {
		let val = event.target.value;
		let rateChild = this.state.rateChild;
		let arr = [...rateChild];
		let obj = new Object(arr[idx]);
		obj[type] = val;
		arr[idx] = obj;

		this.setState({
			rateChild: arr
		});
	}
	render() {
		const {
			progressArr,
			startValue,
			endValue,
			endOpen,
			step,
			lngText,
			rateParent,
			rateChild
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
			<div className="mainBox addprojectstepico4">
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
				<div className={step == 3 ? "step3" : "step3 Hide"}>
					<div className="icoContent">
						<div className="time">
							<div className="mess">ICO时间</div>
							<div className="timerpicker">
								<DatePicker
									disabledDate={this.disabledStartDate}
									showTime
									format="YYYY-MM-DD "
									value={startValue}
									placeholder="ICO开始时间"
									onChange={this.onStartChange}
									onOpenChange={this.handleStartOpenChange}
								/>
								<span className="timeline" />
								<DatePicker
									disabledDate={this.disabledEndDate}
									showTime
									format="YYYY-MM-DD"
									value={endValue}
									placeholder="ICO结束时间"
									onChange={this.onEndChange}
									open={endOpen}
									onOpenChange={this.handleEndOpenChange}
								/>
							</div>
						</div>
						<div className="icotitle">
							<div>ICO详情</div>
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
						</div>
					</div>
					<div className="ui btnbox jc-sb ">
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
				<div
					className={
						step == 4 ? "step4 containBox" : "step4 containBox Hide"
					}
				>
					<div className="icoContent Xcenter contentBlack">
						{rateChild && (
							<div className="in-child">
								{rateChild &&
									rateChild.map((val, idx) => {
										return (
											<div
												className={
													val.isHide
														? "netbox-c1 Hide"
														: "netbox-c1"
												}
												key={idx}
											>
												<div className="icodetails ui jc-sb">
													<input
														value={val.percentage}
														placeholder="%比例填写"
														className="content1"
														type="text"
														onChange={this.setRateCell.bind(
															this,
															idx,
															"percentage"
														)}
													/>
													<input
														value={val.color_name}
														placeholder="比例名称"
														className="content2"
														type="text"
														onChange={this.setRateCell.bind(
															this,
															idx,
															"color_name"
														)}
													/>
													<input
														value={val.color_value}
														placeholder="比例颜色"
														className="content1"
														type="text"
														onChange={this.setRateCell.bind(
															this,
															idx,
															"color_value"
														)}
													/>
													<input
														value={val.desc}
														placeholder="比例描述"
														className="content2"
														type="text"
														onChange={this.setRateCell.bind(
															this,
															idx,
															"desc"
														)}
													/>
													{idx == 0 ? (
														<div
															className="addIcon Ycenter"
															onClick={this.addRateChild.bind(
																this,
																idx
															)}
														/>
													) : (
														<div
															className="subIcon Ycenter"
															onClick={this.subRateChild.bind(
																this,
																idx
															)}
														/>
													)}
												</div>
											</div>
										);
									})}
							</div>
						)}
					</div>
					<div className="tip">TIP：比例总和需要达到100%</div>
					<div className="ui btnbox jc-sb Xcenter">
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
