import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, DatePicker, Menu, Dropdown, Icon, Button } from "antd";
import { getQuery, toHref } from "../../../../utils/util";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import BackBtn from "../../../../components/backbtn/index.js";

import icon from "../../../../assets/images/member_img.png";

import "./index.less";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			user: "",
			id: ""
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		if (q.username && q.id) {
			this.setState({
				user: q.username,
				id: q.id
			});
		}
	}
	textChange(e) {
		this.setState({
			message: e.target.value
		});
	}
	sendMessage() {
		let param = {
			id: this.state.id,
			msg: this.state.message
		};
		this.props.sendMessage(param).then(res => {
			if (res.code === 4000) {
				Msg.prompt("发送成功");
				setTimeout(() => {
					toHref("user");
				}, 3000);
			}
		});
	}
	render() {
		const { message, user } = this.state;
		const {} = this.props;
		const menu = (
			<Menu>
				<Menu.Item key="0">123</Menu.Item>
				<Menu.Item key="1">456</Menu.Item>
				<Menu.Item key="2">789</Menu.Item>
			</Menu>
		);
		return (
			<div className="mainBox userSendMessBox ui fd-c ai-c jc-c">
				<BackBtn />
				<div className="title">发送站内信息</div>
				<div className="step1 ">
					<div className="formBox1 ui fd-c jc-sa">
						<div className="contentCell ui">
							<div className="text">账户名</div>
							<div className="mess">{user}</div>
						</div>

						<div className="contentCell ui desBox">
							<div className="text">信息内容</div>
							<div className="des">
								<textarea
									value={message}
									onChange={this.textChange.bind(this)}
									placeholder="填入需要发送给用户的信息内容"
								/>
							</div>
						</div>
					</div>
					<button
						onClick={this.sendMessage.bind(this)}
						className="c-btn-big btn-next"
					>
						发送
					</button>
				</div>
			</div>
		);
	}
}
