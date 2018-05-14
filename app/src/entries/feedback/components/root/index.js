import React, {PureComponent} from "react";
import { message, Menu, Button, InputNumber, Dropdown, Icon, Pagination } from "antd";
import {getLocalTime, getRouteQuery} from "../../../../utils/util";
import Menunav from "../../../../components/menu/index.js";
import Title from "../../../../components/title/index.js";
import "./index.less";

export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lang: "zh",
            curType: "全部类型",
            typeInfo: ["全部类型","功能建议","内容建议","其他"],
            popStatus: false,
            curDetail: {},
            listData: {data:[]},
        };
    }
    componentDidMount() {
    	this.props.getdata({type: "0", page: 1}).then(this.viewlist.bind(this));
    }
    typeChange({key}){
    	this.setState({curType: this.state.typeInfo[key]});
    	this.props.getdata({type: key, page: 1}).then(this.viewlist.bind(this));
    }
    viewlist({ data }){
  		this.setState({listData: {...data}});
  	}
    detail(data){
    	const {listData} = this.state;
    	this.setState({
    		popStatus: true,
    		curDetail: data
    	});
    	this.props.getdetail({id:data.id}).then(() => {
    		this.setState({listData: {
    			...listData,
    			data: listData.data.map( item => {
		    		if(item.id==data.id){
		    			item.status = "1";
		    		}
		    		return item;
		  		})
  			}})
    	});
    	
    }
    closeDetail(){
    	this.setState({
    		popStatus: false,
    		curDetail: {}
    	});
    }
    onChange(page) {
    	const { typeInfo, curType } = this.state;
			this.props.getdata({
				page,
				type: typeInfo.indexOf(curType),
			}).then(this.viewlist.bind(this));
		}
    
    render() {
        const { curType, typeInfo, listData, popStatus, curDetail } = this.state;
        const typeList = (
					<Menu onClick={this.typeChange.bind(this)}>
						{typeInfo.map((item, index) => {
								return <Menu.Item key={index}>{item}</Menu.Item>;
							})}
					</Menu>
				);
        return (
            <div className="mainBox ui ">
                <Menunav curmenu="feedback" />
                <div className="home-box f1 editReadNum">
                    <Title namestr="意见反馈"/>
                    {popStatus && <div className="ct feedBackCt">
											<ul>
												<li>
													<label>
														<button className="linkBtn" onClick={this.closeDetail.bind(this)} >返回 </button>
													</label>
												</li>
												<li>
													<label>用户账户：</label>
													<p>{curDetail.user && curDetail.user.email}</p>
												</li>
												<li>
													<label>反馈类型：</label>
													<p>{typeInfo[curDetail.type]}</p>
												</li>
												<li>
													<label>反馈时间：</label>
													<p>{getLocalTime(curDetail.created_at)}</p>
												</li>
											</ul>
											<div className="area">{curDetail.content}</div>
											{/*<span className="closeBtn" onClick={this.closeDetail.bind(this)}></span>*/}
										</div>}
										<div className="searchbox ui ai-c">
											<Dropdown overlay={typeList} placement="bottomLeft">
												<Button>
													{curType}
													<Icon type="down" />
												</Button>
											</Dropdown>
										</div>
										<div className="listBox table">
                        <div className="listBoxThead ui">
                            <div className="f1">
                                <span>序号</span>
                            </div>
                            <div className="f3">
                                <span>用户账户</span>
                            </div>
                            <div className="f1">
                                <span>反馈类型</span>
                            </div>
                            <div className="f2">
                                <span>反馈时间</span>
                            </div>
                            <div className="f1">
                                <span>状态</span>
                            </div>
                            <div className="f2">
                                <span>反馈内容</span>
                            </div>
                            <div className="f3">
                                <span>操作</span>
                            </div>
                        </div>
                        <div className="listBoxTbody">
                            {listData.data.map((item, index) => {
                                    return (
                                        <div key={index} className="ui cell-content">
                                            <div className="f1">
                                                <span>{index + 1}</span>
                                            </div>
                                            <div className="f3">
                                                <span>{item.user && item.user.email}</span>
                                            </div>
                                            <div className="f1">
                                                <span> {typeInfo[item.type]} </span>
                                            </div>
                                            <div className="f2">
                                                <span>{getLocalTime(item.created_at)}</span>
                                            </div>
                                            <div className="f1">
                                                <span>{["未查看","已查看"][item.status]}</span>
                                            </div>
                                            <div className="f2">
                                                <span>{item.content}</span>
                                            </div>
                                            <div className="f3 ui jc-c ai-c btn-box">
                                                <button onClick={this.detail.bind(this,item)}>
                                                   	 查看反馈
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="pagination-box">
													{listData.data &&
														Math.ceil(listData.total / 10) > 1 && (
															<Pagination
																onChange={this.onChange.bind(this)}
																// defaultCurrent={listData.current_page}
																total={listData.total}
																defaultPageSize={10}
															/>
														)}
												</div>
                    </div>
                </div>
            </div>
        );
    }
}
