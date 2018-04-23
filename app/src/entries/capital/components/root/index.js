import React, { PureComponent } from "react";
import CSSModules from "react-css-modules";
import { NavLink, Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Modal, Button, Pagination } from "antd";
import Menunav from "../../../../components/menu/index.js";
import Search from "../../../../components/search/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";

import icon1 from "../../../../assets/images/eth_project_icon.png";
import icon2 from "../../../../assets/images/neo_project_icon.png";
import { toHref } from "../../../../utils/util";

import "./index.less";

class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			per_page: 10,
			page: 1,
			name: ''
		};
	}
	componentWillUpdate(nextProps, nextState) {
		if (nextState.page != this.state.page || nextState.name !== this.state.name) {
			this.getData(nextState);
		}
	}
	componentDidMount() {
		this.getData(this.state);
		this.props.getWalletList();
	}
	searchClick(value) {
		this.setState({ name: value, page: 1 });
	}
	getData(state) {
		const { name } = state;
		//let param = { name };
		let param = {
			per_page: state.per_page,
			page: state.page,
			name: name
		};
		this.props.getCapitalList(param);
	}
	addPage(item) {
		toHref("addcapital", `tokenname=${item.name}&tokenid=${item.id}`);
	}
	editPage(item) {
		toHref(
			"addcapital",
			`tokenname=${item.wallet_category.name}&tokenid=${
			item.category_id
			}&id=${item.id}`
		);
	}
	onChange(res) {
		this.setState({
			page: res
		});
	}
	deleteCapital(item) {
		let param = {
			id: item.id
		};
		const that = this;
		Modal.confirm({
			title: "提示",
			content: "确认删除",
			onOk: function () {
				that
					.props
					.deleteCapital(param);
			},
			onCancel: function () {

			}
		});
	}
	render() {
		const { per_page } = this.state;
		const { capitalList, walletList } = this.props;
		const menu = (
			<Menu>
				<Menu.Item key="0">123</Menu.Item>
				<Menu.Item key="1">456</Menu.Item>
				<Menu.Item key="2">789</Menu.Item>
			</Menu>
		);
		return (
			<div className="ui mainBox">
				<Menunav curmenu="capital" />
				<div className="home-box capitalBox f1">
					<Title namestr="资产管理" />
					<div className="searchbox ui ai-c">
						<div className="searchinput">
							<Search search={(val) => this.searchClick(val)} placeholder="查找文章ID或标题关键字" />
						</div>
						<div style={{ width: "0.05rem" }}></div>
					</div>
					<div className="bigbtnBox ui">
						{walletList &&
							walletList &&
							walletList.length > 0 &&
							walletList.map((item, index) => {
								return (
									<div
										key={index}
										onClick={this.addPage.bind(this, item)}
									>
										<Bigbtn
											namestr={`添加 ${item.name} Token`}
											icon={item.img}
										/>
									</div>
								);
							})}
					</div>
					<div className="listBox table">
						<div className="listBoxThead ui">
							<div className="f1">
								<span>序号</span>
							</div>
							<div style={{ width: "400px" }}>
								<span>合约地址</span>
							</div>
							<div className="f2">
								<span>项目全称</span>
							</div>
							<div className="f2">
								<span>资产类型</span>
							</div>
							<div className="f3">
								<span>操作</span>
							</div>
						</div>
						<div className="listBoxTbody">
							{capitalList &&
								capitalList.data &&
								capitalList.data.length > 0 &&
								capitalList.data.map((item, index) => {
									return (
										<div
											key={index}
											className="ui cell-content"
										>
											<div className="f1">
												<span>{index + 1}</span>
											</div>
											<div style={{ width: "400px" }}>
												<span>{item.address}</span>
											</div>
											<div className="f2">
												<span>{item.name}</span>
											</div>
											<div className="f2">
												<span>
													{item.wallet_category.name}
												</span>
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
													onClick={this.deleteCapital.bind(
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
							{capitalList &&
								Math.ceil(capitalList.total / per_page) > 1 && (
									<Pagination
										onChange={this.onChange.bind(this)}
										// defaultCurrent={
										// 	capitalList.current_page
										// }
										total={capitalList.total}
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
export default Root;
// export default CSSModules(Root, capitalCss, {
// 	allowMultiple: true,
// 	handleNotFoundStyleName: "ignore"
// });
