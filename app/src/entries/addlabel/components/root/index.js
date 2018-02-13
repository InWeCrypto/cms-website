import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, DatePicker, Menu, Dropdown, Icon, Button } from "antd";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import BackBtn from "../../../../components/backbtn/index.js";
import { getRouteQuery, getQuery } from "../../../../utils/util";

import icon from "../../../../assets/images/member_img.png";
import addicon from "../../../../assets/images/add_ico.png";

import "./index.less";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			languageType: ["中文", "英文"],
			type: 0,
			name: "",
			langList: ["zh", "en"],
			id: null
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		if (q.id) {
			this.props
				.getLabel({
					id: q.id
				})
				.then(res => {
					if (res.code === 4000) {
						this.setState({
							id: res.data.id,
							name: res.data.name,
							type: this.state.langList.indexOf(res.data.lang)
						});
					}
				});
		}
	}
	nameChange(e) {
		this.setState({
			name: e.target.value
		});
	}
	onSubmit() {
		const { id, name, langList, type } = this.state;
		if (!id) {
			let param = {
				name: name,
				lang: langList[type]
			};
			this.props.addLabel(param).then(res => {
				if (res.code === 4000) {
					Msg.prompt("提交成功");
					setTimeout(() => {
						toHref("label");
					}, 3000);
				}
			});
		} else {
			let param = {
				name: name,
				lang: langList[type],
				id: id
			};
			this.props.editLabel(param).then(res => {
				if (res.code === 4000) {
					Msg.prompt("提交成功");
					setTimeout(() => {
						toHref("label");
					}, 3000);
				}
			});
		}
		//toHref("label");
	}
	typeClick(e) {
		this.setState({
			type: e.key
		});
	}
	render() {
		const { type, languageType, name } = this.state;
		const {} = this.props;
		const menu = (
			<Menu onClick={this.typeClick.bind(this)}>
				{languageType &&
					languageType.map((item, index) => {
						return <Menu.Item key={index}>{item}</Menu.Item>;
					})}
			</Menu>
		);
		return (
			<div className="mainBox addLabelBox ui fd-c ai-c jc-c">
				<BackBtn />
				<div className="title">添加标签</div>
				<div className="step1 ">
					<div className="formBox1 ui fd-c jc-sa">
						<div className="box1 ui">
							<div className="text">
								<Dropdown overlay={menu} placement="bottomLeft">
									<Button>
										{languageType[type]}
										<Icon type="down" />
									</Button>
								</Dropdown>
							</div>
							<input
								className="minput"
								type="text"
								placeholder="标签名称，请按照选择的语言进行填写"
								value={name}
								onChange={this.nameChange.bind(this)}
							/>
							{/* <div className="addicon Ycenter">
								<img src={addicon} alt="" />
							</div> */}
						</div>
					</div>
					<button
						className="c-btn-big btn-next"
						onClick={this.onSubmit.bind(this)}
					>
						提交
					</button>
				</div>
			</div>
		);
	}
}
