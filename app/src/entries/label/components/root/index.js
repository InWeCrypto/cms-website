import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Modal, Button, Pagination } from "antd";
import Menunav from "../../../../components/menu/index.js";
import Search from "../../../../components/search/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";

import icon1 from "../../../../assets/images/biaoqian_ico.png";
import icon2 from "../../../../assets/images/neo_project_icon.png";
import { toHref } from "../../../../utils/util";

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
		this.props.getLabelList(param);
	}
	addPage() {
		toHref("addlabel");
	}
	editPage(item) {
		toHref(`addlabel`, `id=${item.id}`);
	}
	onChange(res) {
		this.setState({
			page: res
		});
	}
	deleteLabel(item) {
		let param = {
			id: item.id
		};
		this.props.deleteLabel(param);
	}
	render() {
		const { per_page } = this.state;
		const { labelList } = this.props;
		const menu = (
			<Menu>
				<Menu.Item key="0">123</Menu.Item>
				<Menu.Item key="1">456</Menu.Item>
				<Menu.Item key="2">789</Menu.Item>
			</Menu>
		);
		return (
			<div className="mainBox ui">
				<Menunav curmenu="system" curchildmenu="label" />
				<div className="home-box f1 labelBox">
					<Title namestr="标签管理" />
					<div className="bigbtnBox ui">
						<div onClick={this.addPage.bind(this)}>
							<Bigbtn namestr="添加标签" icon={icon1} />
						</div>
					</div>
					<div className="listBox table">
						<div className="listBoxThead ui">
							<div className="f1">
								<span>序号</span>
							</div>
							<div className="f2">
								<span>标签全称</span>
							</div>
							<div className="f2">
								<span>语言</span>
							</div>
							<div className="f3">
								<span>操作</span>
							</div>
						</div>
						<div className="listBoxTbody">
							{labelList &&
								labelList.data &&
								labelList.data.length > 0 &&
								labelList.data.map((item, index) => {
									return (
										<div
											key={index}
											className="ui cell-content"
										>
											<div className="f1">
												<span>{index + 1}</span>
											</div>
											<div className="f2">
												<span>{item.name}</span>
											</div>
											<div className="f2">
												<span>{item.lang}</span>
											</div>
											<div className="f3 ui jc-c ai-c btn-box">
												<button
													onClick={this.editPage.bind(
														this,
														item
													)}
												>
													编辑
												</button>
												<button
													onClick={this.deleteLabel.bind(
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
							{labelList &&
								Math.ceil(labelList.total / per_page) > 1 && (
									<Pagination
										onChange={this.onChange.bind(this)}
										defaultCurrent={labelList.current_page}
										total={labelList.total}
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
