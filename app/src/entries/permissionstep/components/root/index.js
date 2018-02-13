import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal } from "antd";
import Progress from "../../../../components/progress/index.js";
import Input from "../../../../components/input/index.js";
import Formtext from "../../../../components/formtext/index.js";
import BackBtn from "../../../../components/backbtn/index.js";
import { toHref, getRouteQuery, getQuery } from "../../../../utils/util";
import icon from "../../../../assets/images/member_img.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			progressArr: [
				{
					name: "角色名称",
					iscomplete: false
				},
				{
					name: "配置权限",
					iscomplete: false
				}
			],
			name: "",
			id: ""
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		if (q.id) {
			this.setState({
				id: q.id
			});
			this.props.getMenuGroup({
				id: q.id
			});
			this.props
				.getPermissionName({
					id: q.id
				})
				.then(res => {
					if (res.code === 4000) {
						this.setState({
							name: res.data.group_name
						});
					}
				});
		}
		this.props.getMenuList();
	}
	nextStep() {
		const { id, name } = this.state;
		if (!id) {
			this.props
				.sendPermissonName({
					group_name: name
				})
				.then(res => {
					if (res.code === 4000) {
						this.setState({
							step: 2,
							progressArr: [
								{
									name: "角色名称",
									iscomplete: true
								},
								{
									name: "配置权限",
									iscomplete: false
								}
							]
						});
					}
				});
		} else {
			this.props
				.editPermissionName({
					group_name: name,
					id: id
				})
				.then(res => {
					if (res.code === 4000) {
						this.setState({
							step: 2,
							progressArr: [
								{
									name: "角色名称",
									iscomplete: true
								},
								{
									name: "配置权限",
									iscomplete: false
								}
							]
						});
					}
				});
		}
	}
	nameChange(e) {
		this.setState({
			name: e
		});
	}
	step2Click() {
		if (
			!this.props.menuList ||
			!this.props.menuList.data ||
			this.props.menuList.length <= 0
		) {
			Msg.prompt("权限列表不存在");
			rerurn;
		}
		let arr = [];
		this.props.menuList.data.filter((item, index) => {
			if (item.isCheck) {
				arr.push(item.id);
			}
		});
		this.props
			.saveMenuGroup({
				id: this.props.permessonName.id
					? this.props.permessonName.id
					: this.state.id,
				menu_ids: arr
			})
			.then(res => {
				if (res.code === 4000) {
					Msg.prompt("成功");
					setTimeout(() => {
						toHref("permission");
					}, 2000);
				}
			});
	}
	itemClick(item) {
		this.props.changeItemCheck(item);
	}
	done() {
		toHref("permission");
	}
	render() {
		const { progressArr, step, name } = this.state;
		const { menuList, menuGroup } = this.props;
		if (menuList && menuList.data && menuGroup && menuGroup.data) {
			menuList.data.map((item, index) => {
				menuGroup.data.map((k, i) => {
					if (item.id === k.menu_id) {
						item.isCheck = true;
					}
				});
			});
		}

		return (
			<div className="mainBox addprojectstep">
				<BackBtn />
				<div className="progessbox">
					<Progress arr={progressArr} />
				</div>
				<div className={step == 1 ? "step1" : "step1 Hide"}>
					<div className="formBox1 ui fd-c jc-sa">
						<Input
							name="角色名称"
							placeholder="请填写角色名称，如“运营编辑”"
							width="6.32rem"
							val={name}
							getval={this.nameChange.bind(this)}
						/>
					</div>
					<button
						className="c-btn-big btn-next"
						onClick={this.nextStep.bind(this)}
					>
						保存，下一步
					</button>
				</div>
				<div className={step == 2 ? "step2" : "step2 Hide"}>
					<div className="formBox1">
						<ul className="ui">
							{menuList &&
								menuList.data &&
								menuList.data.length > 0 &&
								menuList.data.map((item, index) => {
									return (
										<li
											key={index}
											className={
												item.isCheck
													? "ui center jcenter checked"
													: "ui center jcenter"
											}
											onClick={this.itemClick.bind(
												this,
												item
											)}
										>
											<b />
											<span>{item.name}</span>
										</li>
									);
								})}
						</ul>
					</div>
					<button
						className="c-btn-big btn-next"
						onClick={this.step2Click.bind(this)}
					>
						创建完成
					</button>
				</div>
			</div>
		);
	}
}
