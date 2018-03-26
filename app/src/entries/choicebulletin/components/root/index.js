import React, {PureComponent} from "react";
import {
		message,
    Menu,
    Dropdown,
    Icon,
    Button,
} from "antd";
import {getLocalTime, getRouteQuery} from "../../../../utils/util";
import Menunav from "../../../../components/menu/index.js";
import Title from "../../../../components/title/index.js";
import "./index.less";

export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lang: "zh",
            keyList: [],
            keyNameList:[],
            keyName: "",
            key: "",
            page:""
        };
    }
    componentDidMount() {
        this.setState({lang: getRouteQuery(this).lng});
        this.props.getExchangeList().then(({code, data}) => {
        	if (code != 4000) return;
        	let keyList = [];
        	let keyNameList = [];
        	Object.keys(data).forEach(key => {
        		keyList.push(key);
        		keyNameList.push(data[key]);
        	})
        	this.getData({ key: keyList[0] });
        	this.setState({
        		keyName: keyNameList[0], 
        		key: keyList[0], 
        		keyList, 
        		keyNameList
        	});
        })
    }
    
    getData(params={}) {
    		const { key, lang, page} = this.state;
        this.props.getBulletinList({
        	key, lang, page,
        	...params
        })
    }
    
    release(item){
        let data = {
            id: item.id,
            isSendHei: false
        }
    	this.props.release(data).then(res => {
    		const {code, msg} = res;
      	if (code != 4000) return;
      	message.success(msg);
      	this.getData();
    	});
    }
    releaseHei(item){
        let data = {
            id: item.id,
            isSendHei: true
        }
    	this.props.release(data).then(res => {
    		const {code, msg} = res;
      	if (code != 4000) return;
      	message.success(msg);
      	this.getData();
    	});
    }
    prevPage(){
    	const { prev_page } = this.props.bulletinList;
    	this.getData({ page: prev_page });
    }
    nextPage(){
    	const { next_page } = this.props.bulletinList;
    	this.getData({ page: next_page });
    }
    choiceExchange(e){
    	const { keyNameList, keyList } = this.state
    	var key = keyList[e.key];
    	this.setState({ key, keyName: keyNameList[e.key] });
    }
    
    render() {
        const {
            keyName,
            keyNameList,
        } = this.state;
        const {bulletinList: { list, next_page, prev_page }} = this.props;
        
        const menu2 = (
            <Menu onClick={this.choiceExchange.bind(this)}>
                {keyNameList && keyNameList.map((item, index) => {
                    return <Menu.Item key={index}>{item}</Menu.Item>;
                })}
            </Menu>
        );
				
        return (
            <div className="mainBox ui ">
                <Menunav curmenu="news" curchildmenu="helpcenter"/>
                <div className="home-box f1 bulletinBox">
                    <Title namestr="选择交易所公告"/>
                    
                    <div className="bigbtnBox ui exchangeBox">
                        <Dropdown overlay={menu2} placement="bottomLeft">
                            <Button>
                                {keyName}
                                <Icon type="down"/>
                            </Button>
                        </Dropdown>
                        <button className="search" onClick={this.getData.bind(this,null)}> 确定 </button>
                    </div>
                    <div className="listBox table">
                        <div className="listBoxThead ui">
                            <div className="f1">
                                <span>序号</span>
                            </div>
                            <div className="f1">
                                <span>交易锁</span>
                            </div>
                            <div className="f3">
                                <span>标题</span>
                            </div>
                            <div className="f2">
                                <span>链接</span>
                            </div>
                            <div className="f1">
                                <span>时间</span>
                            </div>
                            <div className="f2">
                                <span>操作</span>
                            </div>
                        </div>
                        
                        <div className="listBoxTbody">
                            {list && list.map((item, index) => {
                                    return (
                                        <div key={index} className="ui cell-content">
                                            <div className="f1">
                                                <span>{index + 1}</span>
                                            </div>
                                            <div className="f1">
                                                <span>{item.source}</span>
                                            </div>
                                            <div className="f3">
                                                <span> {item.article_title} </span>
                                            </div>
                                            <div className="f2">
                                                <span title={item.uri}> {item.uri} </span>
                                            </div>
                                            <div className="f1">
                                                <span>{getLocalTime(item.article_date)}</span>
                                            </div>
                                            <div className="f2 ui jc-c ai-c btn-box">
                                                { 
                                                       item.article_id == "0" && 
                                                       <button onClick={this.release.bind(this,item)} 
                                                        > 低推送 </button> 
                                                }
                                                { 
                                                       item.article_id == "0" && 
                                                       <button onClick={this.releaseHei.bind(this,item)} 
                                                        > 高推送 </button>
                                               	}
                                                {
                                                	item.article_id != "0" && <button 
                                                		className="ban"
                                              		> 已发布 </button>
                                                }
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        
                        <div className="pagination-box">
                        	<button onClick={this.nextPage.bind(this)}>下一页</button>
                        	<button onClick={this.prevPage.bind(this)}>上一页</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
