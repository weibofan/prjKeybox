import { List as ListDHX,Sidebar, DataCollection, Layout as LayoutDHX, TreeCollection } from "dhx-suite-package";
import { Tabbar as TabbarDHX } from "dhx-suite-package";
import { Toolbar as ToolbarDHX } from "dhx-suite-package";
import { Grid as GridDHX } from "dhx-suite-package";
import { Tree as TreeDHX } from "dhx-suite-package";
import { Window as WindowDHX } from "dhx-suite-package";
import { Form as FormDHX } from "dhx-suite-package";
var LayoutStatisticsManager = ({
    //查看活动记录
    layoutStatisticsManager: null,
    tabbarhistory: null,
    layoutborrow: null,
    listborrow: null,
    layoutback: null,
    listback: null,
    layoutscore: null,
    listscore: null,
    layoutpay: null,
    listpay: null,
    init(){
        this.layoutStatisticsManager = this.layoutStatisticsManager_create();
        this.tabbarhistory = this.tabbarhistory_create();
        this.layoutStatisticsManager.getCell("tabbarhistory").attach(this.tabbarhistory);
        this.listborrow = this.listborrow_create();
        this.listback = this.listback_create();
        this.listscore = this.listscore_create();
        this.listpay = this.listpay_create();
        this.tabbarhistory.getCell("2").attach(this.listborrow);
        this.tabbarhistory.getCell("3").attach(this.listback);
        this.tabbarhistory.getCell("4").attach(this.listscore);
        return this.layoutStatisticsManager;
    },
    layoutStatisticsManager_create(){
        var mylayout = new LayoutDHX(null, {
          type: "none",
          cols: [
  
            {
              rows: [
                {
                  id: "tabbarhistory",
                  height: "content",
                },
  
              ],
            },
          ],
        });
        return mylayout;
      },
      tabbarhistory_create(){
        var mytabbar = new TabbarDHX(null, {
        mode: "top",
        css: "dhx_widget--bordered dhx_widget--bg_white addheight",
        views: [
          {
            id: "2",
            tab: "借出记录",
          },
          {
            id: "3",
            tab: "归还记录",
          },
          {
            id: "4",
            tab: "积分记录",
          },
          {
            id: "5",
            tab: "赔偿记录",
          },
  
        ],
      });
      return mytabbar;
      },
      listborrow_create(){
        var mylist = new ListDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          template: item => `<span>${item.key}@${item.classroom} 借出人：${item.person}  ${item.time}</span>`,
  
        });
        mylist.data.parse([
          {
          "key":"03",
          "classroom":"计科一号教室",
          "time":"2021-11-25 8:00",
          "person":"10195xxxxxx"
      },
       {
          "key":"02",
          "classroom":"软工二号教室",
          "time":"2021-11-26 8:00",
          "person":"10195xxxxxx"
      },
        ]);
        return mylist;
      },
      listback_create(){
        var mylist = new ListDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          template: item => `<span>${item.key}@${item.classroom} 归还人：${item.person}  ${item.time}</span>`,
  
        });
        mylist.data.parse([
          {
          "key":"08",
          "classroom":"计科一号教室",
          "time":"2021-11-29 8:00",
          "person":"10195xxxxxx"
      },
       {
          "key":"02",
          "classroom":"软工一号教室",
          "time":"2021-11-30 8:00",
          "person":"10195xxxxxx"
      },
        ]);
        return mylist;
      },
      listscore_create(){
        var mylist = new ListDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          template: item => `<span>${item.person}扣除${item.type} 积分余额:${item.score}</span> 原因:${item.how}`,
  
        });
        mylist.data.parse([
          {
          "type":"100",
          "score":"200",
          "person":"10195xxxxxx",
          "how":"逾期未归还钥匙"
      },
       {
          "type":"200",
          "score":"100",
          "person":"10195xxxxxx",
          "how":"钥匙损坏"
      },
        ]);
        return mylist;
      },
      listpay_create(){
  
      },

});
var layoutStatisticsManager = LayoutStatisticsManager.init();
export{
    layoutStatisticsManager
};