<template>
  <div style="height: 100%; width: 100%" ref="reflayoutTopcontainercontainer"></div>
</template>

<script>
import {
  DataCollection, Layout as LayoutDHX, TreeCollection,
  Tabbar as TabbarDHX,
  Toolbar as ToolbarDHX,
  Grid as GridDHX,
  Tree as TreeDHX,
  Window as WindowDHX,
  Form as FormDHX,
  alert as AlertDHX,
  confirm as ConfirmDHX,
  message as MessageDHX,
  tooltip as TooltipDHX,
  ajax as AjaxDHX,
  awaitRedraw as AwaitRedrawDHX,
} from "dhx-suite-package";
import {layoutStatisticsManager} from "./StatisticsManager/layoutStatisticsManager.js";
import {layoutKeysManager} from "./KeysManager/layoutKeysManager.js";
import {layoutBorrowReturnManager} from "./BorrowReturnManager/layoutBorrowReturnManager.js";
import {layoutKeyboxesManager} from "./KeyboxesManager/layoutKeyboxesManager.js";
import {layoutJournalsManager} from "./JournalsManager/layoutJournalsManager.js";
import {layoutAboutUs} from "./AboutUs/layoutAboutUs.js";
export default {
  name: "TabbarBase",
  data: () => ({
    //0
    layoutTopcontainer: null,//顶层框架
    //1
    toolbarBrand:null,//顶层工具栏
    datatoolbarBrand:new TreeCollection(),
    toolbarauth:null,//显示身份
    datatoolbarauth:new TreeCollection(),
    //2
    tabbarContainer: null,//顶层tab
  }),
  mounted() {
    this.init();
  },
  methods: {
    init(){
      this.layoutTopcontainer = this.layoutTopcontainer_create(this.$refs.reflayoutTopcontainercontainer);
      this.layoutTopcontainer_event();
      this.layoutTopcontainer_reload();
      
      return this.layoutTopcontainer;
    },
    //0
    layoutTopcontainer_create(ref) {
      var mylayout = new LayoutDHX(ref, {
        type: "none",

        cols: [
          {

            rows: [
              {
                
                id: "toolbarBrand",
                width: "100%",
              },
              {
                
                id: "toolbarauth",
                width: "100%",
              },
              {
                id: "tabbarContainer",
                width: "100%",
              },
            ],
          },

        ],
      });
      return mylayout;
    },
    layoutTopcontainer_event() {},
    layoutTopcontainer_reload() {
      //1
      this.toolbarBrand = this.toolbarBrand_create();
      this.toolbarBrand_event();
      this.toolbarBrand_reload();
      this.layoutTopcontainer.getCell("toolbarBrand").attach(this.toolbarBrand);
      this.toolbarauth=this.toolbarauth_create();
      this.toolbarauth_event();
      this.toolbarauth_reload();
      this.layoutTopcontainer.getCell("toolbarauth").attach(this.toolbarauth);

      //2
      this.tabbarContainer = this.tabbarContainer_create();
      this.tabbarContainer_event();
      this.tabbarContainer_reload();
      this.layoutTopcontainer
        .getCell("tabbarContainer")
        .attach(this.tabbarContainer);
    },
    //1
    toolbarBrand_create(){
      var mytoolbar = new ToolbarDHX(null,{
        data:this.datatoolbarBrand
      });
      return mytoolbar;
    },
    toolbarBrand_event(){
      var that = this;
      var mevents = this.toolbarBrand.events;
      mevents.on("click",function(id,e){
        switch(id){
          case "xauth":
            if(that.datatoolbarBrand.getItem("realname").url){
              window.location.href = that.toolbarBrand.getItem("realname").url;
            }
            break;
        }
      });
    },
    toolbarBrand_reload(){
      var that = this;
      var toolbardata = [
        {
          value:"钥匙箱管理系统"
        },
        {
          type:"spacer",
        },
        {
          value:"xxx",
          icon:"iconfont icon-dotsvertical",
          id:"realname",
          items:[
            {
              value:"前往认证系统",
              id:"xauth"
            },
          ],
        },
      ];
      this.datatoolbarBrand.parse(toolbardata);
      AjaxDHX.get("/users/getinfo").then(function(res){
        console.log(res);
        switch(res.msgid){
          case 200:
            that.datatoolbarBrand.update("realname",{
              value:res.data.realname,
              url:res.data.url,
            });
            break;
          case 201:
            that.toolbarBrand.setState({
              realname:res.data.realname
            });
            MessageDHX(res.msg);
            break;
        }
      })
      .catch(function(err){
        console.log(err);
      });
    },
    toolbarauth_create(){
      var mytoolbar = new ToolbarDHX(null,{
        data:this.datatoolbarauth
      });
      return mytoolbar;
      },
    toolbarauth_event(){},
    toolbarauth_reload(){
      var that = this;
      var toolbardata = [
        {
          value:"你的身份:"
        },
        {
          value:"xxx",
          id:"auth",
          
        },
      ];
      this.datatoolbarauth.parse(toolbardata);
      AjaxDHX.get("/users/auth").then(function(res){
        var str=null;
        if(res.length==0){
          str="游客";
        }
        else str=res.join(",")
        // console.log(str);
        that.datatoolbarauth.update("auth",{
          value:str
        });
      })
    },
    //2
    tabbarContainer_create() {
      var mytabbar = new TabbarDHX(null, {
        mode: "top",
        tabAutoWidth: true,
        views: [
          {
            id: "user",
            tab: "借还钥匙",
          },
          {
            id: "keys",
            tab: "钥匙箱管理",
          },

          {
            id: "hook",
            tab: "挂钩管理",
          },
          {
            id: "manage",
            tab: "钥匙库",
          },
          // {
          //   id: "mine",
          //   tab: "统计信息与日志",
          // },
          {
            id: "about",
            tab: "关于我们",
          },
        ],
      });
      
      return mytabbar;
    },
    tabbarContainer_event(){},
    tabbarContainer_reload(){
      //借还钥匙
      this.tabbarContainer.getCell("user").attach(layoutBorrowReturnManager);
      //钥匙箱管理
      this.tabbarContainer.getCell("keys").attach(layoutKeyboxesManager);
      //挂钩管理
      this.tabbarContainer.getCell("hook").attach(layoutJournalsManager);
      //钥匙库
      this.tabbarContainer.getCell("manage").attach(layoutKeysManager);
      //历史记录管理
      // this.tabbarContainer.getCell("mine").attach(layoutStatisticsManager);
      //关于我们
      this.tabbarContainer.getCell("about").attach(layoutAboutUs);
    },
  },
};
</script>
<style>
@import "dhx-suite-package/codebase/suite.min.css";
@import "@mdi/font/css/materialdesignicons.min.css";
body {
        margin: 0;
    }

  	.dhx_dataview_template_a {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		height: 100%;
	}
  
	.dhx_dataview_template_a_box {
		background-color: transparent;
	}

	.dhx_dataview_template_a_box .dhx_dataview-item__inner-html {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		height: 100%;
	}

	.dhx_dataview_template_a_box .dhx_dataview-item {
		padding: 20px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		background-color: #fff;
        overflow: hidden;
	}

	.dhx_dataview_template_a__head {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}

	.dhx_dataview_template_a__type {
		color: #fff;
		text-align: center;
		text-transform: capitalize;
		width: 55px;
		height: 20px;
		border-radius: 2px;
	}

	.dhx_dataview_template_a__type--组长 {
		background-color: #ff5252;
	}

	.dhx_dataview_template_a__type--组员 {
		background-color: #0ab169;
	}

	.dhx_dataview_template_a__type--normal {
		background-color: #ff9f10;
	}

	.dhx_dataview_template_a__content {
		padding-left: 16px;
		width: 80%;
	}

	.dhx_dataview_template_a__title {
		font: 500 16px/20px Roboto, sans-serif;
		padding-bottom: 8px;
	}

	.dhx_dataview_template_a__comment {
		display: -webkit-box;
		max-height: 40px;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.dhx_dataview_template_a__body {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		margin-top: 20px;
	}

	.dhx_dataview_template_a__person {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}

	.dhx_dataview_template_a__avatar {
		width: 40px;
		height: 40px;
		margin-left: 15px;
		margin-right: 16px;
		border-radius: 20px;
		background: center center/cover no-repeat #f7f7f7;
	}

	.dhx_dataview_template_a__name {
		color: #909399;
	}

	.dhx_dataview_template_a__comments {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: end;
		-ms-flex-align: end;
		align-items: flex-end;
		line-height: 20px;
	}

	.dhx_dataview_template_a__comments .mdi:before {
		position: relative;
		top: 5px;
		color: #909399;
		font-size: 20px;
		margin-left: 6px;
	}
  
</style>
