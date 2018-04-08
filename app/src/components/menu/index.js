import React, {PureComponent} from "react";
import {NavLink} from "react-router-dom";
import {Modal} from "antd";
import {toHref} from "../../utils/util.js";
import memberImg from "../../assets/images/touxiang_icon.png";
import logoutImg from "../../assets/images/min_icon_hover.png";

const confirm = Modal.confirm;
import "./index.less";
class Menu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false,
            user: null
        };
    }
    componentDidMount() {
        let user = localStorage.getItem("userInfo");
        this.setState({
            user: JSON.parse(JSON.parse(user).data)
        });
    }
    logout() {
        confirm({
            title: "请确认",
            content: "确定要推出当前用户吗？",
            onOk() {
                localStorage.removeItem("userInfo");
                toHref("/");
            },
            onCancel() {}
        });
    }
    showNewsChildMenu(){
        this.setState({
            newsMenuOnChoosed: !this.state.newsMenuOnChoosed
        })
    }
    render() {
        const {user, newsMenuOnChoosed} = this.state;
        const {curmenu, curchildmenu} = this.props;
        return (
            <div className="menu-left">
                <div className="userBoxc">
                    <img
                        className="userlogout"
                        src={logoutImg}
                        onClick={this
                        .logout
                        .bind(this)}
                        alt=""/>
                    <img className="user-logo" src={memberImg} alt=""/>
                </div>
                <div className="user-name">{user && user["name"]}</div>
                <div className="user-position">
                    {user && user.menu_group && user.menu_group.group_name}
                </div>
                <ul className="menuList">
                    <li
                        className={curmenu == "project"
                        ? "cur"
                        : ""}>
                        <div className="menu-project menuicon"/>
                        <div className="menu-name">
                            <NavLink
                                to={{
                                pathname: "/project"
                            }}>
                                项目库
                            </NavLink>
                        </div>
                    </li>
                    <li
                        className={(newsMenuOnChoosed || (curmenu == "news" &&  curchildmenu))
                        ? "cur newsShowChildMenu"
                        : "newsShowChildMenu"}>
                        <div className="menu-news menuicon"/>
                        <div className="menu-name" onClick={this.showNewsChildMenu.bind(this)}>
                            {/* <NavLink
                                to={{
                                pathname: "/news"
                            }}> */}
                                资讯管理
                            {/* </NavLink> */}
                        </div>
                        <div className="childNewsMenu" >
                            <span
                                className={curchildmenu == "newsproject"
                                ? "cur"
                                : ""}>
                                <NavLink
                                    to={{
                                    pathname: "/newsproject"
                                }}>
                                    项目资讯
                                </NavLink>
                            </span>
                            <span
                                className={
                                    curchildmenu == "newsdynamic" ? "cur" : ""
                                }
                            >
                                <NavLink
                                    to={{
                                        pathname: "/newsdynamic"
                                    }}
                                >
                                    动态资讯
                                </NavLink>
                            </span>
                            <span
                                className={curchildmenu == "newsopinion"
                                ? "cur"
                                : ""}>
                                <NavLink
                                    to={{
                                    pathname: "/newsopinion"
                                }}>
                                    观点资讯
                                </NavLink>
                            </span>
                            <span
                                className={curchildmenu == "tradingnews"
                                ? "cur"
                                : ""}>
                                <NavLink
                                    to={{
                                    pathname: "/tradingnews"
                                }}>
                                    期望资讯
                                </NavLink>
                            </span>
                            <span
                                className={curchildmenu == "transactionbulletin"
                                ? "cur"
                                : ""}>
                                <NavLink
                                    to={{
                                    pathname: "/transactionbulletin"
                                }}>
                                    交易所公告
                                </NavLink>
                            </span>
                            <span
                                className={curchildmenu == "helpcenter"
                                ? "cur"
                                : ""}>
                                <NavLink
                                    to={{
                                    pathname: "/helpcenter"
                                }}>
                                    帮助中心
                                </NavLink>
                            </span>
                        </div>
                    </li>
                    {/* <li
                        className={curmenu == "tradingnews"
                        ? "cur"
                        : ""}>
                        <div className="menu-trading menuicon"/>
                        <div className="menu-name">
                            <NavLink
                                to={{
                                pathname: "/tradingnews"
                            }}>
                                Trading View
                            </NavLink>
                        </div>
                    </li> */}
                    {/* <li
                        className={curmenu == "transactionbulletin"
                        ? "cur"
                        : ""}>
                        <div className="menu-transactionbulletin menuicon"/>
                        <div className="menu-name">
                            <NavLink
                                to={{
                                pathname: "/transactionbulletin"
                            }}>
                                交易所公告
                            </NavLink>
                        </div>
                    </li> */}
                    {/* <li className={curmenu == "trading" ? "cur" : ""}>
						<div className="menu-trading menuicon" />
						<div className="menu-name">
							<NavLink
								to={{
									pathname: "/trading"
								}}
							>
								空投设置
							</NavLink>
						</div>
					</li> */}
                    <li
                        className={curmenu == "advertisement"
                        ? "cur"
                        : ""}>
                        <div className="menu-swiper menuicon"/>
                        <div className="menu-name">
                            <NavLink
                                to={{
                                pathname: "/advertisement"
                            }}>
                                广告管理
                            </NavLink>
                        </div>
                    </li>
                    {/* <li className={curmenu == "comment" ? "cur" : ""}>
						<div className="menu-comment menuicon" />
						<div className="menu-name">
							<NavLink
								to={{
									pathname: "/comment"
								}}
							>
								评论管理
							</NavLink>
						</div>
					</li> */}
                    <li
                        className={curmenu == "useroptions"
                        ? "cur"
                        : ""}>
                        <div className="menu-user menuicon"/>
                        <div className="menu-name">
                            <NavLink
                                to={{
                                pathname: "/useroptions"
                            }}>
                                评论管理
                            </NavLink>
                        </div>
                    </li>
                    <li
                        className={curmenu == "user"
                        ? "cur"
                        : ""}>
                        <div className="menu-user menuicon"/>
                        <div className="menu-name">
                            <NavLink
                                to={{
                                pathname: "/user"
                            }}>
                                用户管理
                            </NavLink>
                        </div>
                    </li>
                    <li
                        className={curmenu == "capital"
                        ? "cur"
                        : ""}>
                        <div className="menu-wallet menuicon"/>
                        <div className="menu-name">
                            <NavLink
                                to={{
                                pathname: "/capital"
                            }}>
                                资产管理
                            </NavLink>
                        </div>
                    </li>
                    <li
                        className={curmenu == "feedback"
                        ? "cur"
                        : ""}>
                        <div className="menu-wallet menuicon"/>
                        <div className="menu-name">
                            <NavLink
                                to={{
                                pathname: "/feedback"
                            }}>
                                意见反馈
                            </NavLink>
                        </div>
                    </li>
                    <li
                        className={curmenu == "system"
                        ? "cur"
                        : ""}>
                        <div className="menu-system menuicon"/>
                        <div className="menu-name">系统设置</div>

                        <div className="childMenu">
                            <span
                                className={curchildmenu == "label"
                                ? "cur"
                                : ""}>
                                <NavLink
                                    to={{
                                    pathname: "/label"
                                }}>
                                    资讯标签
                                </NavLink>
                            </span>
                            {/* <span
								className={
									curchildmenu == "social" ? "cur" : ""
								}
							>
								<NavLink
									to={{
										pathname: "/social"
									}}
								>
									社交管理
								</NavLink>
							</span> */}
                            <span
                                className={curchildmenu == "authority"
                                ? "cur"
                                : ""}>
                                <NavLink
                                    to={{
                                    pathname: "/authority"
                                }}>
                                    菜单管理
                                </NavLink>
                            </span>
                            <span
                                className={curchildmenu == "permission"
                                ? "cur"
                                : ""}>
                                <NavLink
                                    to={{
                                    pathname: "/permission"
                                }}>
                                    权限管理
                                </NavLink>
                            </span>
                            <span
                                className={curchildmenu == "employee"
                                ? "cur"
                                : ""}>
                                <NavLink
                                    to={{
                                    pathname: "/employee"
                                }}>
                                    员工管理
                                </NavLink>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Menu;
