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
import {getLocalTime, toHref, getRouteQuery} from "../../../../utils/util";
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
import back_default from "../../../../assets/images/back_default.png";

import "./index.less";

export default class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ca_id: 0,
            per_page: 10,
            page: 1,
            type: 0,
            optionScord: 0,
            lang: "zh",
            keyword: "",
            is_scroll: "",
            is_sole: "",
            newsType: [
                "筛选分数", "4-5分", " 3-3.5分", "0-2.5分", 
            ],
            caidlist: ["所有项目"],
            caidlistname: "所有项目",
            caid: [0]
        };
    }
    componentDidMount() {
        this.getData(this.state);
        
    }
    //组件更新
    componentWillUpdate(nextProps, nextState) {
        if (nextState.page != this.state.page || nextState.ca_id != this.state.ca_id || nextState.optionScord != this.state.optionScord || nextState.lang != this.state.lang || nextState.keyword != this.state.keyword || nextState.is_scroll != this.state.is_scroll || nextState.is_sole != this.state.is_sole) {
            this.getData(nextState);
        }
    }
    getData(state) {
        //
        var hash = getRouteQuery(this);
        let param = {
            per_page: state.per_page,
            page: state.page
        };
        param.id = hash.id
        this
            .props
            .getNewsList(param);
    }
    onChange(res) {
        this.setState({page: res});
    }
    searchClick(res) {
        this.setState({keyword: res, page: 1});
    }
    typeChoose(res) {
        let optionScord = res.key;
        this.setState({optionScord, page: 1});
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
    //查看评论内容
    showOption(item){
        Modal.info({
            title: '评论内容',
            content: (
              <div>
                <p>{item.content}</p>
              </div>
            ),
            onOk() {},
          });
    }
    //查看回复列表
    feedback(item) {
        toHref("addnewsstep", "id=" + item.id );
    }
    //冻结评论
    frozenOption(item){
        let hashid = getRouteQuery(this).id;
        if(item.enable == 1){
            var frozenChange = 0
        }else {
            var frozenChange = 1
        }
        let params = {
            replyId: item.id,
            id: hashid,
            enable: frozenChange
        }
        this.props.frozenThisOptions(params).then(res => {
            if(res.code == 4000){
                this.getData(this.state);
            }
        })
    }
    backTopre() {
        window.history.go(-1)
    }
    render() {
        const {
            per_page,
            newsType,
            type,
            caidlist,
            caidlistname,
            ca_id,
            optionScord,
            optionPopupShow
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
        return (
            <div className="mainBox ui">
                <Menunav curmenu="useroptions" />
                <div className="home-box f1 useroptionsBox">
                    <Title namestr="评论管理回复列表"/>
                    <div className="closeBackImg" onClick={this.backTopre.bind(this)}>
                        <img src={back_default} alt=""/>
                    </div>
                    <div className="listBox table">
                        <div className="listBoxThead ui">
                            <div className="f1">
                                <span>序号</span>
                            </div>
                            <div className="f2">
                                <span>用户账户</span>
                            </div>
                            <div className="f1">
                                <span>回复时间</span>
                            </div>
                            <div className="f1">
                                <span>状态</span>
                            </div>
                            <div className="f3">
                                <span>内容</span>
                            </div>
                            <div className="f2">
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
                                                <span>{index}</span>
                                            </div>
                                            <div className="f2">
                                                <span>{item.user.email}</span>
                                            </div>
                                            <div className="f1">
                                                <span>
                                                    {item.created_at}
                                                </span>
                                            </div>
                                            <div className="f1">
                                                <span>
                                                    {item.enable == 1 ? "正常" : "冻结"}
                                                </span>
                                            </div>
                                            <div className="f3" onClick={
                                                this.showOption.bind(this, item)
                                            }>
                                                <span className="optionsContent">
                                                    {item.content}
                                                </span>
                                            </div>
                                            <div className="f2 ui jc-c ai-c btn-box">
                                                {
                                                    item.enable == 1 ? (
                                                        <button
                                                            onClick={this
                                                            .frozenOption
                                                            .bind(this, item)}>
                                                            冻结评论
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="frozened"
                                                            onClick={this
                                                            .frozenOption
                                                            .bind(this, item)}>
                                                            解冻评论
                                                        </button>
                                                    )
                                                }
                                                
                                            </div>
                                        </div>
                                    );
                                })}
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
