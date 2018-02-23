import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, DatePicker, Menu, Dropdown, Icon, Button } from "antd";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Input2 from "../../../../components/input2/index.js";
import Formtext from "../../../../components/formtext/index.js";
import BackBtn from "../../../../components/backbtn/index.js";
import { toHref, getRouteQuery, getQuery } from "../../../../utils/util";

import icon from "../../../../assets/images/member_img.png";
import upload from "../../../../assets/images/shangchuan_ico.png";

import "./index.less";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 0,
			name: "",
			iphone: "",
			id: null
		};
	}
	componentDidMount() {
		this.props.getMenuGroup().then(res1 => {
			if (q.id) {
				this.props
					.getEmployee({
						id: q.id
					})
					.then(res => {
						if (res.code === 4000) {
							let data = res.data;
							let idx;
							res1.data.data.map((item, index) => {
								if (data.menu_group.group_id === item.id) {
									idx = index;
								}
							});
							this.setState({
								name: data.name,
								phone: data.phone,
								type: idx,
								id: q.id
							});
						}
					});
			}
		});
		let q = getQuery(window.location.href);
	}
	onChange() {}
	onSubmit() {
		const { id, name, phone, type } = this.state;
		if (!id) {
			let param = {
				name: name,
				phone: phone,
				group_id: type == 0 ? "" : this.props.menuList.data[type].id
			};
			this.props.saveEmployee(param).then(res => {
				if (res.code === 4000) {
					Msg.prompt("保存成功");
					setTimeout(() => {
						toHref("employee");
					}, 2000);
				}
			});
		} else {
			let param = {
				id: id,
				name: name,
				phone: phone,
				group_id: type == 0 ? "" : this.props.menuList.data[type].id
			};
			this.props.editEmployee(param).then(res => {
				if (res.code === 4000) {
					Msg.prompt("保存成功");
					setTimeout(() => {
						toHref("employee");
					}, 2000);
				}
			});
		}
		//toHref("employee");
	}
	menuClick(res) {
		this.setState({
			type: res.key
		});
	}
	inputChange(type, res) {
		this.setState({
			[type]: res
		});
	}

	render() {
		let { progressArr, type, name, phone } = this.state;
		let { menuList } = this.props;
		if (
			menuList &&
			menuList.data &&
			menuList.data.length > 0 &&
			!menuList.data[0].isOwn
		) {
			menuList.data.unshift({
				name: "选择权限组",
				isOwn: true
			});
		}
		let menu = (
			<Menu onClick={this.menuClick.bind(this)}>
				{menuList &&
					menuList.data &&
					menuList.data.map((item, index) => {
						return (
							<Menu.Item key={index}>{item.group_name}</Menu.Item>
						);
					})}
			</Menu>
		);
		return (
			<div className="mainBox addEmployeeBox ui fd-c ai-c jc-c">
				<BackBtn />
				<div className="title">添加员工</div>
				<div className="step1 ">
					<div className="formBox1 ui fd-c jc-c">
						<div className="pr-3 ui">
							<Input
								name="员工名字"
								placeholder="员工名字"
								width="2.06rem"
								val={name}
								getval={this.inputChange.bind(this, "name")}
							/>
							<Input
								name="手机号"
								placeholder="手机号"
								width="2.6rem"
								val={phone}
								getval={this.inputChange.bind(this, "phone")}
							/>
						</div>
						<div className="box1 ui">
							<div className="text">权限</div>
							<Dropdown overlay={menu} placement="bottomLeft">
								<Button>
									{(menuList &&
										type &&
										menuList.data &&
										menuList.data[type].group_name) ||
										"请选择权限"}
									<Icon type="down" />
								</Button>
							</Dropdown>
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
