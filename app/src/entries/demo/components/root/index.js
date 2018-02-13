import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal } from "antd";
import Menu from "../../../../components/menu/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";

import icon from "../../../../assets/images/member_img.png";

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
		let arr = [
			{
				name: "项目概况",
				iscomplete: true
			},
			{
				name: "项目参数",
				iscomplete: true
			},
			{
				name: "项目ICO",
				iscomplete: false
			},
			{
				name: "ico结构",
				iscomplete: false
			},
			{
				name: "项目详情",
				iscomplete: false
			}
		];
		return (
			<div className="mainBox ui">
				<Menu />
				<div className="home-box ui f1">
					<Title namestr="权限管理" />
					<div className="bigbtnBox ui">
						<Bigbtn namestr="添加角色" icon={icon} />
					</div>
					<Progress arr={arr} />
				</div>
			</div>
		);
	}
}
