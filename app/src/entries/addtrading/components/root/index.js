import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, DatePicker, Menu, Dropdown, Icon, Button } from "antd";
import moment from "moment";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import BackBtn from "../../../../components/backbtn/index.js";
import Editor from "../../../../components/editor/index.js";
import DropDownList from "../../../../components/dropdown/index.js";
import { toHref, getRouteQuery } from "../../../../utils/util";

import icon from "../../../../assets/images/member_img.png";

import "./index.less";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isPublished: false,
			lngText: "",
			category_id: "",
			year: null,
			month: null,
			day: null,
			name: "",
			desc: "",
			content: "",
			lang: "zh",
			projectList: [],
			projectListKey: [],
			isEdit: false
		};
	}
	componentDidMount() {
		let query = getRouteQuery(this);
		if (query.lng == "en") {
			this.setState({
				lngText: "英文",
				lang: "en"
			});
		} else if (query.lng == "cn") {
			this.setState({
				lngText: "中文",
				lang: "zh"
			});
		}
		this.props
			.getProjectList()
			.then(res => {
				var arr = [];
				var arrKey = [];
				for (let item in this.props.projectList) {
					arr.push(this.props.projectList[item]);
					arrKey.push(item);
				}
				this.setState({
					projectList: arr,
					projectListKey: arrKey,
					category_id: arrKey[0]
				});
				return res;
			})
			.then(res => {
				if (query.id) {
					this.props
						.getTrading({
							id: query.id
						})
						.then(res => {
							let data = res.data;
							this.setState({
								category_id: data.category_id,
								year: data.year,
								month: data.month,
								day: data.day,
								name: data.name,
								desc: data.desc,
								content: data.content,
								lang: data.lang
							});
							if (data.content && data.content.length > 0) {
								window.editor.appendHtml(data.content);
							}
						});
					this.setState({
						isEdit: true
					});
				}
			});
	}
	getkey(key) {
		this.setState({
			category_id: this.state.projectListKey[key]
		});
	}
	onDateChange(res, dataString) {
		let dateArr = dataString.split("-");
		this.setState({
			year: dateArr[0],
			month: dateArr[1],
			day: dateArr[2]
		});
	}
	publish() {
		this.setState({
			isPublished: true
		});
	}
	addTrading() {
		this.setState({
			content: window.editor.fullHtml()
		});
		const {
			category_id,
			year,
			month,
			day,
			name,
			desc,
			content,
			lang,
			isEdit
		} = this.state;
		if (isEdit) {
			this.props
				.putTrading({
					category_id: category_id,
					year: year,
					month: month,
					day: day,
					name: name,
					desc: desc,
					content: window.editor.fullHtml(),
					lang: lang
				})
				.then(res => {
					if (res.code == 4000) {
						this.setState({
							isPublished: true
						});
					}
				});
		} else {
			this.props
				.addTrading({
					category_id: category_id,
					year: year,
					month: month,
					day: day,
					name: name,
					desc: desc,
					content: window.editor.fullHtml(),
					lang: lang
				})
				.then(res => {
					if (res.code == 4000) {
						this.setState({
							isPublished: true
						});
					}
				});
		}
	}
	toTrading() {
		toHref("trading");
	}
	render() {
		const {
			projectList,
			progressArr,
			isPublished,
			year,
			month,
			day,
			name,
			desc,
			category_id,
			content,
			lngText
		} = this.state;
		const {} = this.props;
		const menu = (
			<Menu>
				<Menu.Item key="0">123</Menu.Item>
				<Menu.Item key="1">456</Menu.Item>
				<Menu.Item key="2">789</Menu.Item>
			</Menu>
		);
		return (
			<div className="mainBox addTradingBox">
				<BackBtn />
				<div className="title">
					你正在编辑{lngText}版本，请全部使用{lngText}描述
				</div>
				{!isPublished ? (
					<div className="step1 ">
						<div className="formBox1 ui fd-c jc-sa">
							<div className="contentCell ui">
								<div className="text">空投时间</div>
								<div className="date">
									<DatePicker
										placeholder="请选择空投开始的时间"
										onChange={this.onDateChange.bind(this)}
										value={moment(
											year && month && day
												? `${year}-${month}-${day}`
												: "",
											"YYYY-MM-DD"
										)}
									/>
								</div>
							</div>
							<div className="contentCell ui">
								<div className="text">关联项目</div>
								<div className="pro">
									{/* <Dropdown
                                        overlay={menu}
										placement="bottomLeft"
									>
										<Button>
											请选择需要关联的项目
											<Icon type="down" />
										</Button>
                                    </Dropdown> */}
									<DropDownList
										typeList={projectList}
										category_id={category_id}
										getkey={this.getkey.bind(this)}
									/>
								</div>
							</div>
							<div className="contentCell ui">
								<div className="text">空投名称</div>
								<input
									className="minput"
									type="text"
									placeholder="输入名称"
									value={this.state.name}
									onChange={e => {
										this.setState({
											name: e.target.value
										});
									}}
								/>
							</div>
							<div className="contentCell ui desBox">
								<div className="text">空投描述</div>
								<div className="des">
									<textarea
										placeholder="请简述参与空投的方式，或者活动的描述"
										value={this.state.desc}
										onChange={e => {
											this.setState({
												desc: e.target.value
											});
										}}
									/>
								</div>
							</div>
						</div>
						<div className="editor mbox">
							<Editor />
						</div>
						<button
							className="c-btn-big btn-next"
							onClick={this.addTrading.bind(this)}
						>
							发布
						</button>
					</div>
				) : (
					<div className="stepEnd ui fd-c">
						<h1>发布成功！</h1>
						<h3>请及时通知后端同学配置项目其他参数</h3>
						<button
							className="c-btn-big btn-next"
							style={{ width: "2.3rem" }}
							onClick={this.toTrading.bind(this)}
						>
							返回列表页查看
						</button>
					</div>
				)}
			</div>
		);
	}
}
