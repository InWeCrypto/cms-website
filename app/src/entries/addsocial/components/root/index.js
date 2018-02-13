import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, DatePicker, Menu, Dropdown, Icon, Button } from "antd";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import BackBtn from "../../../../components/backbtn/index.js";
import { toHref, getRouteQuery } from "../../../../utils/util";

import icon from "../../../../assets/images/member_img.png";
import upload from "../../../../assets/images/shangchuan_ico.png";

import "./index.less";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	onChange() {}
	onSubmit() {
		toHref("social");
	}
	render() {
		const { progressArr } = this.state;
		const {} = this.props;
		const menu = (
			<Menu>
				<Menu.Item key="0">123</Menu.Item>
				<Menu.Item key="1">456</Menu.Item>
				<Menu.Item key="2">789</Menu.Item>
			</Menu>
		);
		return (
			<div className="mainBox addsocialBox ui fd-c ai-c jc-c">
				<BackBtn />
				<div className="title">添加社交途径</div>
				<div className="step1 ">
					<div className="formBox1 ui fd-c jc-c">
						<div className="box1 ui">
							<div className="text">平台名称</div>
							<input
								className="minput"
								type="text"
								placeholder="如Tele等"
							/>
						</div>

						<div className="box1 mgt-5 ui">
							<div className="text">项目logo</div>
							<div className="upload ui">
								<div className="imgbox">
									<img src={upload} alt="" />
								</div>
								<div className="mess">
									上传项目的logo，尺寸为：..*..,可提让UI提供*XX
								</div>
							</div>
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
