import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Pagination } from "antd";
import Menu from "../../../../components/menu/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";
import { toHref } from "../../../../utils/util";

import icon from "../../../../assets/images/jiaoseguanli_ico.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			per_page: 10,
			page: 1
		};
	}
	componentWillUpdate(nextProps, nextState) {
		if (nextState.page != this.state.page) {
			this.getData(nextState);
		}
	}
	componentDidMount() {
		this.getData(this.state);
	}
	getData(state) {
		let param = {
			per_page: state.per_page,
			page: state.page
		};
		this.props.getMenuGroup(param);
	}
	addPage() {
		toHref("permissionstep");
	}
	onChange(res) {
		this.setState({
			page: res
		});
	}
	deletePermission(item) {
		this.props.deleteMenuGroup({
			id: item.id
		});
	}
	editPermission(item) {
		toHref("permissionstep", `id=${item.id}`);
	}
	render() {
		const { per_page } = this.state;
		const { menuGroup } = this.props;
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
				<Menu curmenu="system" curchildmenu="permission" />
				<div className="home-box f1 permisBox">
					<Title namestr="权限管理" />
					<div className="bigbtnBox ui">
						<div onClick={this.addPage.bind(this)}>
							<Bigbtn namestr="添加角色" icon={icon} />
						</div>
					</div>
					<div className="listBox table">
						<div className="listBoxThead ui">
							<span style={{ width: "30px" }}>序号</span>
							<span style={{ width: "10%" }}>身份</span>
							<span style={{ width: "130px" }}>操作</span>
						</div>
						<div className="listBoxTbody">
							{menuGroup &&
								menuGroup.data &&
								menuGroup.data.length > 0 &&
								menuGroup.data.map((item, index) => {
									return (
										<div
											key={index}
											className="tr ui center"
										>
											<div
												className="td"
												style={{ width: "30px" }}
											>
												{index + 1}
											</div>
											<div className="td f1">
												{item.group_name}
											</div>
											<div
												className="td"
												style={{ width: "130px" }}
											>
												<button
													onClick={this.editPermission.bind(
														this,
														item
													)}
												>
													编辑
												</button>
												<button
													onClick={this.deletePermission.bind(
														this,
														item
													)}
												>
													删除
												</button>
											</div>
										</div>
									);
								})}
						</div>
						<div className="pagination-box">
							{menuGroup &&
								Math.ceil(menuGroup.total / per_page) > 1 && (
									<Pagination
										onChange={this.onChange.bind(this)}
										//defaultCurrent={menuGroup.current_page}
										total={menuGroup.total}
										defaultPageSize={per_page}
									/>
								)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
