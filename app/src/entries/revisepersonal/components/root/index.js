import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal } from "antd";
import Input from "../../../../components/input/index.js";
import Formtext from "../../../../components/formtext/index.js";

import logo from "../../../../assets/images/touxiang_icon.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		const {} = this.state;
		const {} = this.props;

		return (
			<div className="mainBox ui resveBox">
				<div className="title">修改个人信息</div>
				<img className="logo" src={logo} alt="" />
				<div className="messBox ui jc-sa fd-c">
					<Formtext name="手机号" content="123123123123" />
					<Input name="用户名" placeholder="请填写用户名" />
					<Formtext name="权限" content="运营编辑" />
				</div>
				<button className="c-btn-normal mgt-4">修改</button>
			</div>
		);
	}
}
