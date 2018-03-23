import React, {PureComponent} from "react";
import {NavLink, Link} from "react-router-dom";
import {
    Menu,
    Dropdown,
    Icon,
    Modal,
    Button,
    Pagination
} from "antd";
import {getLocalTime} from "../../../../utils/util";
import Menunav from "../../../../components/menu/index.js";
import Search from "../../../../components/search/index.js";
import Title from "../../../../components/title/index.js";
import Bigbtn from "../../../../components/bigbtn/index.js";
import Progress from "../../../../components/progress/index.js";

import icon1 from "../../../../assets/images/video_ico.png";
import icon2 from "../../../../assets/images/pic_ico.png";
import icon3 from "../../../../assets/images/text_ico.png";
import icon4 from "../../../../assets/images/file_ico.png";
import icon5 from "../../../../assets/images/trading_ico2.jpg";
import {toHref} from "../../../../utils/util";

import "./index.less";

export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ca_id: 0,
            per_page: 10,
            page: 1,
            type: 0,
            lang: "zh",
            keyword: "",
            is_scroll: "",
            is_sole: "",
            newsType: [
                "所有类型", "文本", "图文", "视频", "文件"
            ],
            caidlist: ["所有项目"],
            caidlistname: "所有项目",
            caid: [0]
        };
    }
    componentDidMount() {
        this.getData(this.state);
        this
            .props
            .getProjectList()
            .then(res => {
                if (res.code == 4000) {
                    var list = res.data.data;
                    var nameList = ["所有项目"];
                    var idList = [0];
                    list.forEach((val, idx) => {
                        nameList.push(val.name);
                        idList.push(val.id);
                    });
                    this.setState({caidlist: nameList, caid: idList});
                }
            });
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.page != this.state.page || nextState.ca_id != this.state.ca_id || nextState.type != this.state.type || nextState.lang != this.state.lang || nextState.keyword != this.state.keyword || nextState.is_scroll != this.state.is_scroll || nextState.is_sole != this.state.is_sole) {
            this.getData(nextState);
        }
    }
    getData(state) {
        //hack
        if (state.type == 4) {
            var typeTemp = 6;
        } else {
            var typeTemp = state.type;
        }
        var category_id = state.ca_id;
        let param = {
            per_page: state.per_page,
            page: state.page,
            type: "[8,9,10,11]",
            category_id: 0
        };
        if (state.keyword.length > 0) {
            param.keyword = state.keyword;
        }
        if (state.is_scroll.length > 0) {
            param.is_scroll = state.is_scroll;
        }
        if (state.is_sole.length > 0) {
            param.is_sole = state.is_sole;
        }
        this
            .props
            .getNewsList(param);
    }
    addVideoNews() {
        toHref("addchooselng", "to=addnewsstep&type=10");
    }
    addImgNews() {
        toHref("addchooselng", "to=addnewsstep&type=9");
    }
    addTextNews() {
        toHref("addchooselng", "to=addnewsstep&type=8");
    }
    addFinder() {
        toHref("addchooselng", "to=addnewsstep&type=11");
    }
    addTradingNews() {
        toHref("addchooselng", "to=addnewsstep&type=5");
    }
    getType(type) {
        var res = "";
        switch (type) {
            case 1:
                res = "文本";
                break;
            case 2:
                res = "图文";
                break;
            case 3:
                res = "视频";
                break;
            case 4:
                res = "Trading view";
                break;
            case 6:
                res = "文件";
                break;
        }
        return res;
    }
    onChange(res) {
        this.setState({page: res});
    }
    searchClick(res) {
        this.setState({keyword: res, page: 1});
    }
    typeChoose(res) {
        let type = parseInt(res.key);
        if(type > 0){
            type = type + 7;
        }
        this.setState({type, page: 1});
    }
    caidChoose(res) {
        let key = res.key;
        let caidlist = this.state.caidlist;
        let caid = this.state.caid;

        this.setState({ca_id: caid[key], caidlistname: caidlist[key], page: 1});
    }
    deleteNews(item) {
        const that = this;
        Modal.confirm({
            title: "提示",
            content: "确认删除",
            onOk: function(){
                that
                .props
                .deleteNews({id: item.id});
            },
            onCancel: function(){

            }
        });
    }
    //编辑资讯
    editNews(item) {
        let lng = item.lang;
        if (lng == "zh") {
            lng = "cn";
        }
        let id = item.id;
        let type = item.type;
        if (type == 6) 
            type = 4;
        else if (type == 1) 
            type = 3;
        else if (type == 2) 
            type = 2;
        else if (type == 3) 
            type = 1;
        else if (type == 4) 
            type = 5;
        toHref("addnewsstep", "lng=" + lng + "&id=" + id + "&type=" + type);
    }
    render() {
        const {
            per_page,
            searchClick,
            newsType,
            type,
            caidlist,
            caidlistname,
            ca_id
        } = this.state;
        const {newsList} = this.props;
        const menu = (
            <Menu onClick={this
                .typeChoose
                .bind(this)}>
                {newsType && newsType.map((item, index) => {
                    return <Menu.Item key={index}>{item}</Menu.Item>;
                })}
            </Menu>
        );
        const menu2 = (
            <Menu onClick={this
                .caidChoose
                .bind(this)}>
                {caidlist && caidlist.map((item, index) => {
                    return <Menu.Item key={index}>{item}</Menu.Item>;
                })}
            </Menu>
        );

        return (
            <div className="mainBox ui">
                <Menunav curmenu="news" curchildmenu="helpcenter"/>
                <div className="home-box f1 newsBox">
                    <Title namestr="资讯管理"/>
                    <div className="searchbox ui ai-c">
                        <div className="searchinput">
                            <Search
                                search={this
                                .searchClick
                                .bind(this)}
                                placeholder="查找文章ID或标题关键字"/>
                        </div>
                        {/* <Dropdown overlay={menu} placement="bottomLeft">
                            <Button>
                                {newsType[type]}
                                <Icon type="down"/>
                            </Button>
                        </Dropdown> */}
                        <div
                            style={{
                            width: "0.05rem"
                        }}/>
                        {/* <Dropdown overlay={menu2} placement="bottomLeft">
                            <Button>
                                {caidlistname}
                                <Icon type="down"/>
                            </Button>
                        </Dropdown> */}
                    </div>
                    <div className="bigbtnBox ui">
                        <div
                            onClick={this
                            .addVideoNews
                            .bind(this)}>
                            <Bigbtn namestr="添加视频资讯" icon={icon1}/>
                        </div>
                        <div
                            onClick={this
                            .addImgNews
                            .bind(this)}>
                            <Bigbtn namestr="添加图文资讯" icon={icon2}/>
                        </div>
                        {/* <div onClick={this.addTradingNews.bind(this)}>
							<Bigbtn namestr="添加Trading view" icon={icon5} />
						</div> */}
                        <div
                            onClick={this
                            .addTextNews
                            .bind(this)}>
                            <Bigbtn namestr="添加纯文本资讯" icon={icon3}/>
                        </div>
                        <div
                            onClick={this
                            .addFinder
                            .bind(this)}>
                            <Bigbtn namestr="添加文件直接上传" icon={icon4}/>
                        </div>
                    </div>
                    <div className="listBox table">
                        <div className="listBoxThead ui">
                            <div className="f1">
                                <span>序号</span>
                            </div>
                            <div className="f1">
                                <span>文章ID</span>
                            </div>
                            <div className="f1">
                                <span>类别</span>
                            </div>
                            <div className="f1">
                                <span>关联项目</span>
                            </div>
                            <div className="f2">
                                <span>标题</span>
                            </div>
                            <div className="f2">
                                <span>修改时间</span>
                            </div>
                            <div className="f3">
                                <span>操作</span>
                            </div>
                        </div>
                        <div className="listBoxTbody">
                            {newsList && newsList.data && newsList.data.length > 0 && newsList
                                .data
                                .map((item, index) => {
                                    return (
                                        <div key={index} className="ui cell-content">
                                            <div className="f1">
                                                <span>{index + 1}</span>
                                            </div>
                                            <div className="f1">
                                                <span>{item.id}</span>
                                            </div>
                                            <div className="f1">
                                                <span>
                                                    {this.getType(item.type)}
                                                </span>
                                            </div>
                                            <div className="f1">
                                                <span>
                                                    {(item.category && item.category.name) || "无"}
                                                </span>
                                            </div>
                                            <div className="f2">
                                                <span>{item.title}</span>
                                            </div>
                                            <div className="f2">
                                                <span>
                                                    {getLocalTime(item.updated_at)}
                                                </span>
                                            </div>
                                            <div className="f3 ui jc-c ai-c btn-box">
                                                <button
                                                    onClick={this
                                                    .editNews
                                                    .bind(this, item)}>
                                                    编辑
                                                </button>
                                                <button
                                                    onClick={this
                                                    .deleteNews
                                                    .bind(this, item)}>
                                                    删除
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="listBoxTable Hide">
                            <table>
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                            width: "30px"
                                        }}>序号</th>
                                        <th style={{}}>员工名字</th>
                                        <th style={{}}>手机号</th>
                                        <th style={{}}>权限</th>
                                        <th
                                            style={{
                                            width: "130px"
                                        }}>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        <td>01</td>
                                        <td>张三</td>
                                        <td>13800138000</td>
                                        <td>管理员</td>
                                        <td>
                                            <button>编辑</button>
                                            <button>删除</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination-box">
                            {newsList && Math.ceil(newsList.total / per_page) > 1 && (<Pagination
                                onChange={this
                                .onChange
                                .bind(this)}
                                total={newsList.total}
                                defaultPageSize={per_page}/>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
