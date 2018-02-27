import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Modal, Button, Pagination } from "antd";
import Menunav from "../../../../components/menu/index.js";
import Title from "../../../../components/title/index.js";
import Search from "../../../../components/search/index.js";

import icon from "../../../../assets/images/member_img.png";

import { toHref } from "../../../../utils/util.js";
import "./index.less";

const confirm = Modal.confirm;

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			per_page: 20,
			page: 1,
			keyword: "",
			type: 0,
			typeList: [
				"筛选项目状态",
				"交易中",
				"众筹中",
				"即将众筹",
				"众筹结束"
			]
		};
	}
	componentWillUpdate(nextProps, nextState) {
		if (
			nextState.page != this.state.page ||
			nextState.keyword != this.state.keyword ||
			nextState.type != this.state.type
		) {
			this.getData(nextState);
		}
	}
	componentDidMount() {
		this.getData(this.state);
	}
	toAddProject() {
		toHref("addchooselng", "to=addprojectstep");
	}
	toAddIcoProject() {
		toHref("addchooselng", "to=addprojectstep&model=ico");
	}
	getData(state) {
		let param = {
			per_page: state.per_page,
			page: state.page
		};
		if (state.keyword.length > 0) {
			param.keyword = state.keyword;
		}
		if (state.type) {
			param.type = state.type;
		}
		this.props.getProjectList(param);
	}
	onChange(res) {
		this.setState({
			page: res
		});
	}
	onSearch(res) {
		this.setState({
			keyword: res,
			page: 1
		});
	}
	onSelectType(e) {
		const key = e.key;
		this.setState({
			type: key,
			page: 1
		});
	}
	toLookDash(id, type) {
		if (type == 1) {
			toHref("prodashboard", "c_id=" + id + "&type=" + type);
		} else {
			toHref("prodashboard", "c_id=" + id + "&type=2");
		}
	}
	//删除项目
	deltPro(id) {
		const that = this;
		confirm({
			title: "提示",
			content: "确定删除该项目",
			onOk() {
				that.props.deltProject(id).then(res => {
					that.getData(that.state);
				});
			},
			onCancel() {
				console.log("Cancel");
			}
		});
	}
	render() {
		const { per_page, typeList, type } = this.state;
		const { projectList } = this.props;
		const menu = (
			<Menu onClick={this.onSelectType.bind(this)}>
				{typeList &&
					typeList.map((item, index) => {
						return <Menu.Item key={index}>{item}</Menu.Item>;
					})}
			</Menu>
		);

		return (
			<div className="mainBox ui">
				<Menunav curmenu="project" />
				<div className="home-box ui f1">
					<Title namestr="项目管理" />
					<div className="pro-titleBox ui jc-sb ai-c">
						<div className="searchbox ui ai-c">
							<div className="searchinput">
								<Search
									search={this.onSearch.bind(this)}
									placeholder="查找项目"
								/>
							</div>
							<Dropdown overlay={menu} placement="bottomLeft">
								<Button>
									{typeList[type]}
									<Icon type="down" />
								</Button>
							</Dropdown>
						</div>
						<div className="btnbox ui ai-c">
							<button
								className="addtrading"
								onClick={this.toAddProject.bind(this)}
							>
								添加交易项目
							</button>
							<button
								className="addico"
								onClick={this.toAddIcoProject.bind(this)}
							>
								添加ICO项目
							</button>
						</div>
					</div>
					<div className="project-box">
						<div className="project-list">
							<ul className="projectListUl ui ">
								{projectList &&
									projectList.data.length > 0 &&
									projectList.data.map((item, index) => {
										return (
											<li key={index}>
												<div className="pro-mess1 ui">
													<div className="logobox">
														<img
															src={
																item.img
																	? item.img
																	: icon
															}
															alt=""
														/>
													</div>
													<div className="messbox2">
														<div className="name">
															<span>
																{item.unit}
															</span>
															<span>
																({
																	item.long_name
																})
															</span>
														</div>
														<div className="kinds">
															{item.type_name}
														</div>
													</div>
												</div>
												<div className="mess3">
													{item.desc}
												</div>
												<div className="iconbox ui">
													{item.is_top && (
														<div className="top" />
													)}
													{item.is_hot && (
														<div className="recommed" />
													)}
												</div>
												<div className="lihoverbox ui ">
													<div
														type={item.type}
														className="look icon"
														onClick={this.toLookDash.bind(
															this,
															item.id,
															item.type
														)}
													/>
													<div className="twobox ui ">
														<div
															className="delt icon"
															onClick={this.deltPro.bind(
																this,
																item.id
															)}
														/>
													</div>
												</div>
											</li>
										);
									})}
							</ul>
						</div>
						<div className="pagination-box">
							{projectList &&
								Math.ceil(projectList.total / per_page) > 1 && (
									<Pagination
										onChange={this.onChange.bind(this)}
										// defaultCurrent={
										// 	projectList.current_page
										// }
										total={projectList.total}
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
