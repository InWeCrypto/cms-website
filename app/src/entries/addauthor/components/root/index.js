import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, DatePicker, Menu, Dropdown, Icon, Button } from "antd";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import BackBtn from "../../../../components/backbtn/index.js";
import { getQuery } from "../../../../utils/util";

import icon from "../../../../assets/images/member_img.png";
import addicon from "../../../../assets/images/add_ico.png";

import "./index.less";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			url: "",
			name: "",
			id: null
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		if (q.id) {
			this.props
				.getAuthor({
					id: q.id
				})
				.then(res => {
					if (res.code === 4000) {
						let data = res.data;
						this.setState({
							id: data.id,
							url: data.url,
							name: data.name
						});
					}
				});
		}
	}
	inputChange(type, e) {
		this.setState({
			[type]: e.target.value
		});
	}
	onSubmit() {
		const { id, url, name } = this.state;
		if (!id) {
			let param = {
				url: url,
				name: name
			};
			this.props.addAuthor(param).then(res => {
				if (res.code === 4000) {
					Msg.prompt("添加成功");
					setTimeout(() => {
						toHref("authority");
					}, 2000);
				}
			});
		} else {
			let param = {
				url: url,
				name: name,
				id: id
			};
			this.props.editAuthor(param).then(res => {
				if (res.code === 4000) {
					Msg.prompt("修改成功");
					setTimeout(() => {
						toHref("authority");
					}, 2000);
				}
			});
		}
	}
	render() {
		const { name, url } = this.state;
		const {} = this.props;
		return (
			<div className="mainBox addAuthorBox ui fd-c ai-c jc-c">
				<BackBtn />
				<div className="title">添加菜单</div>
				<div className="step1 ">
					<div className="formBox1 ui fd-c jc-sa">
						<div className="box1 ui">
							<div className="text">菜单名称</div>
							<input
								className="minput"
								type="text"
								placeholder="菜单名称"
								value={name}
								onChange={this.inputChange.bind(this, "name")}
							/>
						</div>
						<div className="box1 ui">
							<div className="text">链接</div>
							<input
								className="minput"
								type="text"
								placeholder="菜单名称"
								value={url}
								onChange={this.inputChange.bind(this, "url")}
							/>
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
