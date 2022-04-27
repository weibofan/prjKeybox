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
  ContextMenu,
  TreeGrid,
} from "dhx-suite-package";

var LayoutJournalsManager = ({
    //挂钩管理
    layoutJournalsManager: null,
    //部门树
    toolbarorgtree:null,
    datatoolbarorgtree:new TreeCollection(),
    treeorgs:null,
    datatreeorgs:new TreeCollection(),
    //treegrid钥匙箱-挂钩
    toolbarhookmanage:null,
    datatoolbarhookmanage:new TreeCollection(),
    treegridhookmanage:null,
    datatreegridhookmanage:new TreeCollection(),
    //日志grid
    toolbarjournal:null,
    datatoolbarjournal:new TreeCollection(),
    gridjournal:null,
    datagridjournal:new DataCollection(),

    windowHook:null,
    formHook:null,

    treeid:null,
    treegrid:null,
    treegrid1:null,
    init(){
        this.layoutJournalsManager = this.layoutJournalsManager_create();
        //部门树
        this.toolbarorgtree=this.toolbarorgtree_create();
        this.toolbarorgtree_event();
        this.toolbarorgtree_reload();

        this.treeorgs=this.treeorgs_create();
        this.treeorgs_event();
        this.treeorgs_reload();

        //treegrid
        this.toolbarhookmanage = this.toolbarhookmanage_create();
        this.toolbarhookmanage_event();
        this.toolbarhookmanage_reload();

        this.treegridhookmanage=this.treegridhookmanage_create();
        this.treegridhookmanage_event();
        this.treegridhookmanage_reload();

        //journal
        this.toolbarjournal = this.toolbarjournal_create();
        this.toolbarjournal_event();
        this.toolbarjournal_reload();
        this.gridjournal = this.gridjournal_create();
        this.gridjournal_event();
        this.gridjournal_reload();

        //挂载
        this.layoutJournalsManager.getCell("toolbarhookmanage").attach(this.toolbarhookmanage);
        this.layoutJournalsManager.getCell("toolbarjournal").attach(this.toolbarjournal);
        this.layoutJournalsManager.getCell("treegridhookmanage").attach(this.treegridhookmanage);
        this.layoutJournalsManager.getCell("gridjournal").attach(this.gridjournal);
        this.layoutJournalsManager.getCell("toolbarorgtree").attach(this.toolbarorgtree);
        this.layoutJournalsManager.getCell("treeorgs").attach(this.treeorgs);
        return this.layoutJournalsManager;
    },
    layoutJournalsManager_create() {
        var mylayout = new LayoutDHX(null, {
          type: "none",
          cols: [
            {
              width: "20%",
              header:"院系",
              collapsable:true,
              rows: [
                {
                  id: "toolbarorgtree",
                  height: "content",
                },
                {
                  id: "treeorgs",
                },
              ],
            },
            {
            
              rows: [
                {
                  id: "toolbarhookmanage",
                  height: "content",
                },
                {
                  id: "treegridhookmanage",
                },
              ],
            },
            {
              width: "52%",
              collapsable:true,
              header:"日志",
              rows: [
                {
                  id: "toolbarjournal",
                  height: "content",
                },
                {
                  id: "gridjournal",
                },
              ],
            },
          ],
        });
        return mylayout;
      },
      toolbarorgtree_create(){
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarorgtree,
        });
        return mytoolbar;
      },
      toolbarorgtree_event(){
        var myevents=this.toolbarorgtree.events;
        var that=this;
        myevents.on("click",function(id,e){
          switch(id){
            case "refresh":
              that.treegridhookmanage_reload();
              MessageDHX({
                text: "刷新成功!",
                css: "expire",
                expire: 1000,
              });
              break;
          }
        })
      },
      toolbarorgtree_reload(){
        var mydata = [
          {
            id: "refresh",
            value: "刷新",
          },
          {
            type: "spacer",
          },
          
        ];
        this.datatoolbarorgtree.parse(mydata);
      },
      treeorgs_create(){
        var mytree = new TreeDHX(null, {
          data:this.datatreeorgs,
        });
        return mytree;
      },
      treeorgs_event(){
        var that=this;
        var mytree = this.treeorgs;
        var myevents = mytree.selection.events;
        myevents.on("afterSelect",function(id,e){
          
          var n = id.toString().split('_');
          if(n[0] == "org"){
            mytree.selection.add(id);
            // console.log(id);
            that.treeid=n[1];
            that.treegridhookmanage_reload();
          }
          else{
            mytree.expand(id);
          }
        });
      },
      treeorgs_reload(){
        var mytree=this.treeorgs;
        var that=this;
        AjaxDHX.get("/HookManage/gettree")
        .then(function (res){
          that.datatreeorgs.parse(res.data);
          var tagid=false;
          var orgid=false;
          var arr=res.data;
          //找到第一个org节点 并打开
          if(arr.length>0){
            tagid=arr[0].id;
            if(arr[0].items.length>0) orgid=arr[0].items[0].id;
          }
          if(tagid){
            mytree.selection.add(tagid);
            mytree.expand(tagid);
          }
          if(orgid){
            mytree.focusItem(orgid);
            mytree.selection.add(orgid);
          }
        })
      },
      toolbarhookmanage_create() {
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarhookmanage,
        });
        return mytoolbar;
      },
      toolbarhookmanage_event() {
        var myevents=this.toolbarhookmanage.events;
        var that=this;
        myevents.on("click",function(id,e){
          switch(id){
            case "refresh":
              that.treegridhookmanage_reload();
              MessageDHX({
                text: "刷新成功!",
                css: "expire",
                expire: 1000,
              });
              break;
            case "match":
              var content=that.treegridhookmanage.selection.getCell();
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "未选中要匹配的钥匙！",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                var id=content.row.id;
                // console.log(id);
                var arr=id.toString().split('_');
                if(arr.length>1){
                  AlertDHX({
                    header: "错误",
                    text: "未选中要匹配的钥匙！",
                    buttons: ["关闭"],
                  });
                  return;
                }
                else{
                  var parent=content.row.parent.toString().split('_')[1];
                  AjaxDHX.get("/HookManage/matchkey",{keyid:arr[0],hookid:parent})
                  .then(function (res){
                    switch(res.type){
                      case "success":
                        that.treegridhookmanage_reload();
                        MessageDHX({
                          text: res.msg,
                          css: "expire",
                          expire: 1000,
                        });
                        break;
                      case 'error':
                        AlertDHX({
                          header: "错误",
                          text: res.msg,
                          buttons: ["关闭"],
                        });
                    }
                  })
                }
              }
              break;
            case "conserve":
              var content=that.treegridhookmanage.selection.getCell();
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "未选中要维护的挂钩！",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                var id=content.row.id;
                var arr=id.toString().split('_');
                if(arr[0]!="hook"){
                  AlertDHX({
                    header: "错误",
                    text: "未选中要维护的挂钩！",
                    buttons: ["关闭"],
                  });
                  return;
                }
                else{
                  var obj=content.row;
                  that.windowHook = that.windowHook_create();
                  that.windowHook_event();
                  that.windowHook_reload(obj);
                }
              }
              break;
          }
        })
      },
      toolbarhookmanage_reload() {
        var mydata = [
          {
            id: "conserve",
            value: "维护",
          },
          {
            id: "match",
            value: "确认匹配",
          },
          {
            type: "separator",
          },
          {
            id: "refresh",
            value: "刷新",
          },
          {
            type: "spacer",
          },
          
        ];
        this.datatoolbarhookmanage.parse(mydata);
      },
      windowHook_create(){
        var mywindow = new WindowDHX({
          width: 500,
          height: 500,
          title: "维护挂钩",
          modal: true,
        });
        return mywindow;
      },
      windowHook_event(){},
      windowHook_reload(obj){
        this.formHook=this.formHook_create();
        this.formHook_event();
        this.formHook_reload(obj);
        this.windowHook.attach(this.formHook);
        this.windowHook.show();
      },
      formHook_create(){
        var that = this;
        var myform = {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          rows: [
            {
              type: "input",
              id: "x",
              label: "位置x",
              placeholder: "输入位置x",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "input",
              id: "y",
              label: "位置y",
              placeholder: "输入位置y",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "input",
              id: "shape",
              label: "形状",
              placeholder: "输入挂钩形状",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            
            {
              type: "textarea",
              id: "remark",
              label: "备注",
              placeholder: "",
              height: 120,
              required: false,
              helpMessage: "",
              errorMessage: "",
            },
            {
              type: "button",
              id: "ok",
              text: "确认修改",
              size: "medium",
              view: "flat",
              full: true,
              color: "primary",
            },
            
            {
              id: "hookid",
              name: "hookid",
              type: "input",
              hidden: true,
            },
          ],
        };
        
        var myform = new FormDHX(null,myform);
        return myform;
      },
      formHook_event(){
        var myform = this.formHook;
        var that = this;
        myform.getItem("ok").events.on("click",function(ev){
          myform.send("/HookManage/conservehook","POST")
          .then(function(res){
            res=JSON.parse(res);
            switch(res.type){
              case "success":
                that.treegridhookmanage_reload();
                MessageDHX({
                  text: res.msg,
                  css: "expire",
                  expire: 1000,
                });
                that.windowHook.destructor();
                break;
            }
          })
        })
      },
      formHook_reload(obj){
        console.log(obj);
        var id=obj.id.toString().split('_')[1];
        var myform=this.formHook;
        myform.getItem("x").setValue(obj.x);
        myform.getItem("y").setValue(obj.y);
        myform.getItem("shape").setValue(obj.shape);
        myform.getItem("hookid").setValue(id);
        myform.getItem("remark").setValue(obj.remark);
      },
      treegridhookmanage_create() {
        var that=this;
        var mytreegrid= new TreeGrid(null,{
          selection: "row",
          keyNavigation: true,
          multiselection: false,
          columns:[
            {
              width: 90,
              id: "cntr",
              header: [{ text: "序号", align: "center" }],
              align: "center",
              template: function (text, row, col) {
                //表格序号的自动生成
                var mydata = that.treegridhookmanage.data;
                return mydata.getIndex(row.id) + 1;
              },
            },
            {
              width: 150,
              id: "name",
              header: [{ text: "挂钩名称", align: "center" }],
              align: "center",
            },
            {
              width: 80,
              id: "x",
              header: [{ text: "位置x", align: "center" }],
              align: "center",
            },
            {
              width: 80,
              id: "y",
              header: [{ text: "位置y", align: "center" }],
              align: "center",
            },
            {
              width: 100,
              id: "shape",
              header: [{ text: "形状", align: "center" }],
              align: "center",
            },
            {
              width: 100,
              id: "state",
              header: [{ text: "状态", align: "center" }],
              align: "center",
            },
            {
              width: 100,
              id: "admin",
              header: [{ text: "管理员", align: "center" }],
              align: "center",
            },
            {
              width: 100,
              id: "creator",
              header: [{ text: "创建者", align: "center" }],
              align: "center",
              hidden:true
            },
            {
              width: 150,
              id: "ctime",
              header: [{ text: "创建时间", align: "center" }],
              align: "center",
              hidden:true
            },
            {
              width: 100,
              id: "modifier",
              header: [{ text: "修改者", align: "center" }],
              align: "center",
              hidden:true
            },
            {
              width: 150,
              id: "mtime",
              header: [{ text: "修改时间", align: "center" }],
              align: "center",
              hidden:true
            },
            {
              minWidth: 200,
              id: "remark",
              header: [{ text: "备注", align: "center" }],
              align: "center",
            },
          ]
        });
        return mytreegrid;
      },
      treegridhookmanage_event() {
        var that=this;
        this.treegridhookmanage.events.on("afterSelect",function(ev){
          console.log(that.treegridhookmanage.selection.getCell().row);
          var id=that.treegridhookmanage.selection.getCell().row.id;
          var arr = id.toString().split('_');
          if(arr.length>1){
            var idx = arr[1];
            // console.log(idx);
            if(arr[0]=='keybox'){
              that.treegrid=idx;
              that.treegrid1=null;
              that.gridjournal_reload();
            }
            else{
              that.treegrid=null;
              that.treegrid1=idx;
              that.gridjournal_reload();
            }
          }
        })
      },
      treegridhookmanage_reload() {
        var that=this;
        if(this.treeid!=null){
          var orgid=this.treeid;
          AjaxDHX.get("/HookManage/treegrid",{orgid:orgid})
          .then(function(res){
            switch(res.type){
              case "success":
                console.log('tg')
                that.treegridhookmanage.data.parse(res.data);
                break;
              case "error":
                MessageDHX({
                  text: res.msg,
                  expire: 1000,
                });
                that.treegridhookmanage.data.parse([]);
                break;
            }
          })
        }
      },
      toolbarjournal_create() {
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarjournal,
        });
        return mytoolbar;
      },
      toolbarjournal_event() {
        var myevents=this.toolbarjournal.events;
        var that=this;
        myevents.on("click",function(id,e){
          switch(id){
            case "refresh":
              that.gridjournal_reload();
              MessageDHX({
                text: "刷新成功!",
                css: "expire",
                expire: 1000,
              });
              break;
          }
        })
      },
      toolbarjournal_reload() {
        var mydata = [
          {
            id: "refresh",
            value: "刷新",
          },
          
        ];
        this.datatoolbarjournal.parse(mydata);
      },
      gridjournal_create() {
        var that=this;
        var mygrid = new GridDHX(null, {
          selection: "row",
          keyNavigation: true,
          multiselection: true,
          editable: true,
          data: this.datagridjournal,
          columns: [
            {
              width: 60,
              id: "cntr",
              header: [{ text: "序号", align: "center" }],
              align: "center",
              template: function (text, row, col) {
                //表格序号的自动生成
                var mydata = that.datagridjournal;
                return mydata.getIndex(row.id) + 1;
              },
            },
            {
              minWidth: 120,
              id: "box",
              header: [{ text: "钥匙箱", align: "center" }],
              align: "center",
            },
  
            {
              minWidth: 100,
              id: "hook",
              header: [{ text: "挂钩", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "user",
              header: [{ text: "用户", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "optype",
              header: [{ text: "操作类型", align: "center" }],
              align: "center",
            },
            {
              minWidth: 200,
              id: "ctime",
              header: [{ text: "操作时间", align: "center" }],
              align: "center",
            },
            {
              autoWidth: true,
              id: "remark",
              header: [{ text: "备注", align: "center" }],
              align: "center",
              hidden:true
            },
          ],
        });
        return mygrid;
      },
      gridjournal_event() { },
      gridjournal_reload() {
        var that=this;
        if(this.treegrid!=null || this.treegrid1!=null){
          var keyboxid=this.treegrid;
          var hookid=this.treegrid1;
          console.log(keyboxid);
          console.log(hookid);
          AjaxDHX.get("/HookManage/gridjournel",{
            keyboxid:keyboxid,hookid:hookid
          }).then(function(res){
            switch(res.type){
              case "success":
                that.datagridjournal.parse(res.data);
                break;
              case "error":
                MessageDHX({
                  text: res.msg,
                  expire: 1000,
                });
                that.datagridjournal.parse([]);
                break;
            }
          })
        }
        
      },
});
var layoutJournalsManager = LayoutJournalsManager.init();
export{
    layoutJournalsManager
}