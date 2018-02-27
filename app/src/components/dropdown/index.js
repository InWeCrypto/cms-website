import React, { PureComponent } from "react";
import { Menu, Dropdown, Icon, Modal, Button, Pagination } from "antd";

import "./index.less";
class Demo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 0,
			flagtype: true
		};
	}
	componentDidMount() {}
	componentWillUpdate(nextProps, nextState) {
		// if (nextProps.category_id) {
		// 	this.setState({
		// 		type: nextProps.category_id
		// 	});
		// }
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.type && this.state.flagtype) {
			this.setState({
				type: nextProps.type,
				flagtype: false
			});
		}
		//	console.log(this.props.type, this.props.typeList);
	}
	onSelectType(e) {
		const key = e.key;
		this.setState({
			type: key
		});
		this.props.getkey(key);
		const { typeList } = this.props;
	}
	render() {
		const { type } = this.state;
		const { typeList } = this.props;
		const menu = (
			<Menu onClick={this.onSelectType.bind(this)}>
				{typeList &&
					typeList.map((item, index) => {
						return <Menu.Item key={index}>{item}</Menu.Item>;
					})}
			</Menu>
		);
		return (
			<div className="c-dropdown ui">
				<Dropdown overlay={menu} placement="bottomLeft">
					<Button>
						{!type ? typeList[0] : typeList[type]}
						<Icon type="down" />
					</Button>
				</Dropdown>
			</div>
		);
	}
}
export default Demo;
