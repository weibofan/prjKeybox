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
} from "dhx-suite-package";

var LayoutKeyboxesManager = ({
    layoutKeyboxesManager: null,
    toolbarKeybox: null,
    datatoolbarKeybox: new TreeCollection(),
    gridKeybox: null,
    datagridKeybox: new DataCollection(),
    tabbarKeybox: null,
    layouthook: null,
    toolbarhook: null,
    datatoolbarhook: new TreeCollection(),
    gridhook: null,
    datagridhook: new DataCollection(),
    layoutCheckKeyboxs: null,
    toolbarCheckKeyboxs: null,
    datatoolbarCheckKeyboxs: new TreeCollection(),
    gridCheckKeyboxs: null,
    datagridCheckKeyboxs: new DataCollection(),
    
    windowKeyboxesInsert:null,
    formKeyboxesInsert:null,

    windowKeyboxesModify:null,
    formKeyboxesModify:null,

    windowKeyboxesConserve:null,
    formKeyboxesConserve:null,
    orgs:null,
    borrowable:null,

    tmp_hook:null,

    windowHookInsert:null,
    formHookInsert:null,

    windowHookModify:null,
    formHookModify:null,

    init(){
        this.layoutKeyboxesManager = this.layoutKeyboxesManager_create();
        
        //工具栏
        this.toolbarKeybox = this.toolbarKeybox_create();
        this.toolbarKeybox_event();
        this.toolbarKeybox_reload();
        //grid
        this.gridKeybox = this.gridKeybox_create();
        this.gridKeybox_event();
        this.gridKeybox_reload(0);
        //tabbar
        this.tabbarKeybox = this.tabbarKeybox_create();
        this.layoutKeyboxesManager.getCell("tabbarKeyboxs").attach(this.tabbarKeybox);
        //hook
        this.layouthook = this.layouthook_create();
        this.toolbarhook = this.toolbarhook_create();
        this.toolbarhook_event();
        this.toolbarhook_reload();
        this.gridhook = this.gridhook_create();
        this.gridhook_event();
        // this.gridhook_reload();
        //预览
        this.layoutCheckKeyboxs = this.layoutCheckKeyboxs_create();
        this.toolbarCheckKeyboxs = this.toolbarCheckKeyboxs_create();
        this.toolbarCheckKeyboxs_event();
        this.toolbarCheckKeyboxs_reload();
        this.gridCheckKeyboxs = this.gridCheckKeyboxs_create();
        this.gridCheckKeyboxs_event();
        // this.gridCheckKeyboxs_reload();
        //挂载
        this.layoutKeyboxesManager.getCell("toolbarKeybox").attach(this.toolbarKeybox);
        this.layoutKeyboxesManager.getCell("gridKeybox").attach(this.gridKeybox);
        this.tabbarKeybox.getCell("hook").attach(this.layouthook);
        this.layouthook.getCell("toolbarhook").attach(this.toolbarhook);
        this.layouthook.getCell("gridhook").attach(this.gridhook);
        this.tabbarKeybox.getCell("check").attach(this.layoutCheckKeyboxs);
        this.layoutCheckKeyboxs.getCell("toolbarCheckKeyboxs").attach(this.toolbarCheckKeyboxs);
        this.layoutCheckKeyboxs.getCell("gridCheckKeyboxs").attach(this.gridCheckKeyboxs);
        return this.layoutKeyboxesManager;
    },
    layoutKeyboxesManager_create() {
        var mylayout = new LayoutDHX(null, {
          type: "none",
          cols: [
            {
              
              rows: [
                {
                  id: "toolbarKeybox",
                  height: "content",

                },
                {
                  id: "gridKeybox",
                },
              ],
              width:"60%",
              resizable:true
            },
            {
              id: "tabbarKeyboxs",
              resizable:true,
              width:"40%"
            },
          ],
        });
        return mylayout;
      },
      toolbarKeybox_create() {
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarKeybox,
        });
        return mytoolbar;
      },
      toolbarKeybox_event() {
        var myevents = this.toolbarKeybox.events;
        var that = this;
        myevents.on("click",function(id,e){
          switch(id){
            case "refresh":
              that.gridKeybox_reload();
              MessageDHX({
                text: "刷新成功!",
                css: "expire",
                expire: 1000,
              });
              break;
            case "insert":
              that.tryinsertgridKeybox();
              
              break;
            case "modify":
              that.trymodifygridKeybox();
              break;
            case "delete":
              that.trydeletegridKeybox();
              break;
            case "update":
              // that.tryconservegridKeybox();
              var content = that.gridKeybox.selection.getCell();
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "未选中要维护的钥匙箱！",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                content=content.row;
                that.tryconservegridKeybox(content);
              }
              break;
            case "enable":
              console.log('enable');
              var content=that.gridKeybox.selection.getCell();
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "未选中要启/禁用的钥匙箱！",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                content=content.row;
                that.gridKeybox.selection.removeCell();
                AjaxDHX.get("/KeyboxManage/enableKeybox",{keyboxid:content.keyboxid})
                .then(function (res){
                  switch(res.type){
                    case "success":
                      that.gridKeybox_reload();
                      MessageDHX({
                        text: res.msg,
                        css: "expire",
                        expire: 1000,
                      });
                      break;
                    case "error":
                      AlertDHX({
                        header: "错误",
                        text: res.msg,
                        buttons: ["关闭"],
                      });
                      break;
                  }
                });
              }
              break;
          }
        })
      },
      toolbarKeybox_reload() {
        var mydata = [
          {
            id: "insert",
            value: "创建",
          },
          {
            id: "modify",
            value: "修改",
          },
          {
            id: "delete",
            value: "删除",
          },
          {
            type: "separator",
          },
          {
            id: "enable",
            value: "启/禁用",
          },
          
          {
            id: "update",
            value: "管理员维护",
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
        this.datatoolbarKeybox.parse(mydata);
      },
      tabbarKeybox_create() {
        var views = [
          { tab: "挂钩列表", id: "hook" },
          { tab: "钥匙列表", id: "check" },
  
        ];
        var mytabbar = new TabbarDHX(null, {
          mode: "top",
          views: views,
        });
        return mytabbar;
      },
      layouthook_create() {
        var mylayout = new LayoutDHX(null, {
          type: "none",
          rows: [
            {
              id: "toolbarhook",
              height: "content",
            },
            {
              id: "gridhook",
            },
          ],
        });
        return mylayout;
      },
      toolbarhook_create() {
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarhook,
        });
        return mytoolbar;
      },
      toolbarhook_event() {
        var myevents= this.toolbarhook.events;
        var that=this;
        myevents.on("click",function(id,e){
          switch(id){
            case "refresh":
              that.gridhook_reload();
              MessageDHX({
                text: "刷新成功!",
                css: "expire",
                expire: 1000,
              });
              break;
            case "delete":
              if(that.tmp_hook==undefined){
                AlertDHX({
                  header: "错误",
                  text: "未选中要删除挂钩的钥匙箱！",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                that.trydeletegridhook();
              }
              break;
            case "add":
              if(that.tmp_hook==undefined){
                AlertDHX({
                  header: "错误",
                  text: "未选中要添加挂钩的钥匙箱！",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                that.tryinsertgridhook();
              }
              break;
            case "update":
              if(that.tmp_hook==undefined){
                AlertDHX({
                  header: "错误",
                  text: "未选中要修改挂钩的钥匙箱！",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                that.trymodifygridHook();
              }
              break;
          }
        })
      },
      toolbarhook_reload() {
        var mydata = [
          {
            id: "add",
            value: "添加",
          },
          {
            id: "update",
            value: "修改",
          },
          {
            id: "delete",
            value: "删除",
          },
          {
            type: "separator",
          },
          {
            id: "refresh",
            value: "刷新",
          },
          
          
        ];
        this.datatoolbarhook.parse(mydata);
      },
      gridhook_create() {
        var that = this;
        var mygrid = new GridDHX(null, {
          selection: "row",
          keyNavigation: true,
          multiselection: true,
          // editable: true,
          data: this.datagridhook,
          columns: [
            {
              width: 80,
              id: "cntr",
              header: [{ text: "序号", align: "center" }],
              align: "center",
              template: function (text, row, col) {
                //表格序号的自动生成
                var mydata = that.datagridhook;
                return mydata.getIndex(row.id) + 1;
              },
            },
            
            {
              minWidth: 100,
              id: "name",
              header: [{ text: "名称", align: "center" }],
              align: "center",
            },
  
            {
              minWidth: 100,
              id: "shape",
              header: [{ text: "型号", align: "center" }],
              align: "center",
              hidden:true
            },
            {
              minWidth: 100,
              id: "state",
              header: [{ text: "状态", align: "center" }],
              align: "center",
            },
            {
              minWidth: 80,
              id: "x",
              header: [{ text: "位置x", align: "center" }],
              align: "center",
            },
            {
              minWidth: 80,
              id: "y",
              header: [{ text: "位置y", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "admin",
              header: [{ text: "管理员", align: "center" }],
              align: "center",
              
            },
            {
              minWidth: 150,
              id: "ctime",
              header: [{ text: "创建时间", align: "center" }],
              align: "center",
              hidden:true,
            },
            {
              minWidth: 100,
              id: "creator",
              header: [{ text: "创建者", align: "center" }],
              align: "center",
              hidden:true,
            },
            {
              minWidth: 150,
              id: "mtime",
              header: [{ text: "修改时间", align: "center" }],
              align: "center",
              hidden:true,
            },
            {
              minWidth: 100,
              id: "modifier",
              header: [{ text: "修改者", align: "center" }],
              align: "center",
              hidden:true,
            },
            {
              autoWidth: true,
              id: "remark",
              header: [{ text: "备注", align: "center" }],
              align: "center",
              hidden:true,
            },
          ],
        });
        return mygrid;
      },
      gridhook_event() { },
      gridhook_reload() {
        var that = this;
        var content = that.gridKeybox.selection.getCell().row;
        var keyboxid = content['keyboxid'];
        that.tmp_hook=keyboxid;
        AjaxDHX.get("/KeyboxManage/GridHooks",{keyboxid:keyboxid})
        .then(function (res){
          switch(res.type){
            case 'success':
              console.log(res.data)
              that.datagridhook.parse(res.data);
              break;
            case 'error':
              that.datagridhook.parse([]);
              MessageDHX({
                text:res.msg,
                expire:1000,
              });
              break;
          }
        });
        
      },
      gridKeybox_create() {
        var that = this;
        var mygrid = new GridDHX(null, {
          selection: "row",
          keyNavigation: true,
          multiselection: false,
         
          data: that.datagridKeybox,
          columns: [
            {
              width:70,
              id:"cntr",
              header:[{text:"序号",align:"center"}],
              align:"center",
              template:function(text,row,col){
                var mydata = that.datagridKeybox;
                return mydata.getIndex(row.id)+1;
              }
            },
            {
              width: 70,
              id: "isenable",
              header: [{ text: "启用", align: "center" }],
              align: "center",
              type: "boolean",
              editable: true,
            },
            {
              minWidth: 130,
              id: "name",
              header: [{ text: "名称", align: "center" }],
              align: "center",
            },
            {
              minWidth: 130,
              id: "orgid",
              header: [{ text: "院系", align: "center" }],
              align: "center",
            },
  
            {
              minWidth: 100,
              id: "position",
              header: [{ text: "位置", align: "center" }],
              align: "center",
            },
            {
              minWidth: 80,
              id: "shape",
              header: [{ text: "形状", align: "center" }],
              align: "center",
            },
            {
              minWidth: 80,
              id: "state",
              header: [{ text: "状态", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "adminuid",
              header: [{ text: "管理员", align: "center" }],
              align: "center",
            },
            {
              minWidth: 160,
              id: "groupid",
              header: [{ text: "可借群体", align: "center" }],
              align: "center",
            },
            {
              minWidth: 160,
              id: "remark",
              header: [{ text: "备注" ,align: "center" }],
              align: "center",
            },
            {
              minWidth: 200,
              id: "createtime",
              header: [{ text: "创建时间", align: "center" }],
              align: "center",
              hidden:true,
            },
            {
              minWidth: 100,
              id: "creator",
              header: [{ text: "创建者", align: "center" }],
              align: "center",
              hidden:true,
            },
            {
              minWidth: 200,
              id: "modifytime",
              header: [{ text: "修改时间", align: "center" }],
              align: "center",
              hidden:true,
            },
            {
              minWidth: 100,
              id: "modifier",
              header: [{ text: "修改者", align: "center" }],
              align: "center",
              hidden:true
            }
          ],
        });
        return mygrid;
      },
      gridKeybox_event() { 
        var that = this;
        this.gridKeybox.events.on("afterSelect",function(e){
          // console.log(that.gridKeybox.selection.getCell().row)
          that.gridhook_reload();
          that.gridCheckKeyboxs_reload();
        })
      },
      gridKeybox_reload() {
        var that = this;
        AjaxDHX.get("/KeyboxManage/GridKeyboxes")
        .then(function(res){
          switch(res.type){
            case "success":
              that.datagridKeybox.parse(res.data);
              break;
            case "error":
              MessageDHX({
                text:res.msg,
                expire:1000,
              });
              that.datagridKeybox.parse([]);
              break
          }
        })
        .catch(function(err){
          console.log(err);
        })
      },
  
      layoutCheckKeyboxs_create() {
        var mylayout = new LayoutDHX(null, {
          type: "line",
          rows: [
            {
              id: "toolbarCheckKeyboxs",
              height: "content",
            },
            {
              id: "gridCheckKeyboxs",
            },
          ],
        });
        return mylayout;
      },
      toolbarCheckKeyboxs_create() {
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarCheckKeyboxs
        });
        return mytoolbar;
      },
      toolbarCheckKeyboxs_event() {
        var myevents=this.toolbarCheckKeyboxs.events;
        var that=this;
        myevents.on("click",function(id,e){
          switch(id){
            case "refresh":
              that.gridCheckKeyboxs_reload();
              MessageDHX({
                text: "刷新成功!",
                css: "expire",
                expire: 1000,
              });
              break;
          }
        });
      },
      toolbarCheckKeyboxs_reload() {
        var mydata = [
          
          {
            id: "refresh",
            value: "刷新",
          },
          {
            type: "spacer",
          },
          {
            id: "keywords",
            type: "input",
            placeholder: "请输入查找关键字",
            tooltip:
              "可输入姓名或身份名的部分关键字，同时必须包含的多个关键字以空格分隔。不超过32个字符。",
            icon: "dxi dxi-magnify",
          },
        ];
        this.datatoolbarCheckKeyboxs.parse(mydata);
      },
      gridCheckKeyboxs_create(){
        var that = this;
        var mygrid = new GridDHX(null, {
          selection: "row",
          keyNavigation: true,
          multiselection: false,
         
          data: that.datagridCheckKeyboxs,
          columns: [
            {
              width:70,
              id:"cntr",
              header:[{text:"序号",align:"center"}],
              align:"center",
              template:function(text,row,col){
                var mydata = that.datagridCheckKeyboxs;
                return mydata.getIndex(row.id)+1;
              }
            },
            {
              width: 70,
              id: "isenable",
              header: [{ text: "启用", align: "center" }],
              align: "center",
              type: "boolean",
              editable: true,
            },
            {
              minWidth: 100,
              id: "name",
              header: [{ text: "名称", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "state",
              header: [{ text: "状态", align: "center" }],
              align: "center",
            },
            {
              minWidth: 120,
              id: "hook",
              header: [{ text: "对应挂钩", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "admin",
              header: [{ text: "管理员", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "user",
              header: [{ text: "借走人", align: "center" }],
              align: "center",
              hidden:true
            },
            
            
            {
              minWidth: 200,
              id: "remark",
              header: [{ text: "备注" ,align: "center" }],
              align: "center",
              hidden:true
            },
            {
              minWidth: 200,
              id: "ctime",
              header: [{ text: "创建时间", align: "center" }],
              align: "center",
              hidden:true
            },
            {
              minWidth: 100,
              id: "creator",
              header: [{ text: "创建者", align: "center" }],
              align: "center",
              hidden:true
            },
            {
              minWidth: 200,
              id: "mtime",
              header: [{ text: "修改时间", align: "center" }],
              align: "center",
              hidden:true
            },
            {
              minWidth: 100,
              id: "modifier",
              header: [{ text: "修改者", align: "center" }],
              align: "center",
              hidden:true
            }
          ],
        });
        return mygrid;
      },
      gridCheckKeyboxs_event(){

      },
      gridCheckKeyboxs_reload(){
        var that = this;
        var content = that.gridKeybox.selection.getCell().row;
        var keyboxid = content['keyboxid'];
        AjaxDHX.get("/KeyboxManage/GridKeys",{keyboxid:keyboxid})
        .then(function (res){
          switch(res.type){
            case 'success':
              console.log('kk')
              console.log(res.data)
              that.datagridCheckKeyboxs.parse(res.data);
              break;
            case 'error':
              that.datagridCheckKeyboxs.parse([]);
              MessageDHX({
                text:res.msg,
                expire:1000,
              });
              break;
          }
        });
      },

      //window form
      windowKeyboxesInsert_create(){
        var mywindow = new WindowDHX({
          width: 500,
          height: 500,
          title: "添加钥匙箱",
          modal: true,
        });
        return mywindow;
      },
      windowKeyboxesInsert_event(){},
      windowKeyboxesInsert_reload(){
        var that = this;
        //加载院系
        AjaxDHX.get("/KeyboxManage/formKeyboxInsert")
        .then(function(res){
          that.orgs = res;
          console.log(that.orgs);
          that.formKeyboxesInsert=that.formKeyboxesInsert_create();
          that.formKeyboxesInsert_event();
          that.formKeyboxesInsert_reload();
          that.windowKeyboxesInsert.attach(that.formKeyboxesInsert);
          that.windowKeyboxesInsert.show();
        });

      },
      formKeyboxesInsert_create(){
        var that = this;
        var myform = {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          rows: [
            {
              type: "input",
              id: "name",
              label: "名称",
              placeholder: "输入钥匙箱名称",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "combo",
              id: "orgid",
              label: "院系",
              labelPosition:"left",
              multiselection:false,
              selectAllButton:false,
              data: that.orgs
            },
            {
              type: "input",
              id: "position",
              label: "位置",
              placeholder: "输入钥匙箱位置",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "input",
              id: "admin",
              label: "指定管理员",
              placeholder: "输入管理员姓名",
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
              text: "确认添加",
              size: "medium",
              view: "flat",
              full: true,
              color: "primary",
            },
            {
              id: "_token",
              name: "_token",
              type: "input",
              hidden: true,
            },
          ],
        };
        var myform = new FormDHX(null,myform);
        return myform;
      },
      formKeyboxesInsert_event(){
        var myform = this.formKeyboxesInsert;
        var that = this;
        myform.getItem("ok").events.on("click",function(ev){
          myform.getItem("_token").setValue(that.getCSRF());
          myform.send("/KeyboxManage/insertformCreateKeybox","POST")
          .then(function (res){
            res=JSON.parse(res);
            console.log(res);
            console.log(res.type);
            switch(res.type){
              case "success":
               
                that.gridKeybox_reload();
                MessageDHX({
                  text: res.msg,
                  css: "expire",
                  expire: 1000,
                });
                that.windowKeyboxesInsert.destructor();
                break;
              case 'error':
                AlertDHX({
                  header: "错误",
                  text: res.msg,
                  buttons: ["关闭"],
                });
            }
          })
        })
      },
      formKeyboxesInsert_reload(){},
      tryinsertgridKeybox(){
        var that=this;
        AjaxDHX.get("/KeyboxManage/formKeyboxTryInsert")
        .then(function(res){
          switch(res.type){
            case "error":
              AlertDHX({
                header: "错误",
                text: res.msg,
                buttons: ["关闭"],
              });
              return false;
            case "success":
              that.windowKeyboxesInsert = that.windowKeyboxesInsert_create();
              that.windowKeyboxesInsert_event();
              that.windowKeyboxesInsert_reload();
          }
        })
        return true;
      },
      trymodifygridKeybox(){
        var that=this;
        
        AjaxDHX.get("/KeyboxManage/formKeyboxTryInsert")
        .then(function(res){
          switch(res.type){
            case "error":
              AlertDHX({
                header: "错误",
                text: res.msg,
                buttons: ["关闭"],
              });
              return false;
            case "success":
              var content=that.gridKeybox.selection.getCell();
              // console.log(content)
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "请选中要修改的钥匙箱",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
              content = content.row;
              that.gridKeybox.selection.removeCell();
              // console.log(content['keyboxid']);
              that.windowKeyboxesModify = that.windowKeyboxesModify_create();
              that.windowKeyboxesModify_event();
              that.windowKeyboxesModify_reload(content);
              }
          }
        })
      },
      windowKeyboxesModify_create(){
        var mywindow = new WindowDHX({
          width: 500,
          height: 500,
          title: "修改钥匙箱",
          modal: true,
        });
        return mywindow;
      },
      windowKeyboxesModify_event(){},
      windowKeyboxesModify_reload(obj){
        console.log(obj);
        var that= this;
        AjaxDHX.get("/KeyboxManage/formKeyboxInsert").then(function(res){
          that.orgs=res;
          that.formKeyboxesModify=that.formKeyboxesModify_create();
          that.formKeyboxesModify_event();
          that.formKeyboxesModify_reload(obj);
          that.windowKeyboxesModify.attach(that.formKeyboxesModify);
          that.windowKeyboxesModify.show();
        })
        
      },
      formKeyboxesModify_create(){
        var that = this;
        var myform = {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          rows: [
            {
              type: "input",
              id: "name",
              label: "名称",
              placeholder: "输入钥匙箱名称",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "combo",
              id: "orgid",
              label: "院系",
              labelPosition:"left",
              multiselection:false,
              selectAllButton:false,
              data: that.orgs
            },
            {
              type: "input",
              id: "position",
              label: "位置",
              placeholder: "输入钥匙箱位置",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "input",
              id: "admin",
              label: "指定管理员",
              placeholder: "输入管理员姓名",
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
              id: "_token",
              name: "_token",
              type: "input",
              hidden: true,
            },
            {
              id: "keyboxid",
              name: "keyboxid",
              type: "input",
              hidden: true,
            },
          ],
        };
        
        var myform = new FormDHX(null,myform);
        return myform;
      },
      formKeyboxesModify_event(){
        var myform = this.formKeyboxesModify;
        var that = this;
        myform.getItem("ok").events.on("click",function(ev){
          console.log('click')
          myform.send("/KeyboxManage/modifyformCreateKeybox","POST")
          .then(function (res){
            res=JSON.parse(res);
            // console.log(res);
            // console.log(res.type);
            switch(res.type){
              case "success":
               
                that.gridKeybox_reload();
                MessageDHX({
                  text: res.msg,
                  css: "expire",
                  expire: 1000,
                });
                that.windowKeyboxesModify.destructor();
                break;
              case 'error':
                AlertDHX({
                  header: "错误",
                  text: res.msg,
                  buttons: ["关闭"],
                });
            }
          })
        })
      },
      formKeyboxesModify_reload(obj){
        // console.log(obj)
        var that=this;
        var idx=null;
        // console.log(that.orgs)
        for(var i=0;i<this.orgs.length;i++){
          if(this.orgs[i].value==obj.orgid) idx=this.orgs[i].id;
        }
        var myform=this.formKeyboxesModify;
        myform.getItem("name").setValue(obj.name);
        myform.getItem("orgid").setValue(idx);
        myform.getItem("position").setValue(obj.position);
        myform.getItem("admin").setValue(obj.adminuid);
        myform.getItem("remark").setValue(obj.remark);
        myform.getItem("keyboxid").setValue(obj.keyboxid);
      },
      trydeletegridKeybox(){
        var that=this;
        
        AjaxDHX.get("/KeyboxManage/formKeyboxTryInsert")
        .then(function(res){
          switch(res.type){
            case "error":
              AlertDHX({
                header: "错误",
                text: res.msg,
                buttons: ["关闭"],
              });
              return false;
            case "success":
              var content=that.gridKeybox.selection.getCell();
              // console.log(content)
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "请选中要删除的钥匙箱",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
              content = content.row;
              that.gridKeybox.selection.removeCell();
              AjaxDHX.get("/KeyboxManage/deleteCreateKeybox",{keyboxid:content['keyboxid']}).then(function(res){
                switch(res.type){
                  case "error":
                    AlertDHX({
                      header: "错误",
                      text: res.msg,
                      buttons: ["关闭"],
                    });
                    return false;
                  case "success":
                    that.gridKeybox_reload();
                    MessageDHX({
                      text: res.msg,
                      css: "expire",
                      expire: 1000,
                    });
                    break;
                }
              })
              }
          }
        })
      },
      tryconservegridKeybox(obj){
        var that= this;
        // console.log(obj);
        AjaxDHX.get("/KeyboxManage/tryConserveKeybox",{keyboxid:obj.keyboxid})
        .then(function (res){
          switch(res.type){
            case "error":
              AlertDHX({
                header: "错误",
                text: res.msg,
                buttons: ["关闭"],
              });
              return false;
            case "success":
              that.windowKeyboxesConserve=that.windowKeyboxesConserve_create();
              that.windowKeyboxesConserve_event();
              that.windowKeyboxesConserve_reload(obj);
          }
        })
      },
      windowKeyboxesConserve_create(){
        var mywindow = new WindowDHX({
          width: 500,
          height: 500,
          title: "维护钥匙箱",
          modal: true,
        });
        return mywindow;
      },
      windowKeyboxesConserve_event(){},
      windowKeyboxesConserve_reload(obj){
        var that= this;
        AjaxDHX.get("/KeyboxManage/groupsConserveKeybox").then(function(res){
          that.borrowable=res;
          that.formKeyboxesConserve=that.formKeyboxesConserve_create();
          that.formKeyboxesConserve_event();
          that.formKeyboxesConserve_reload(obj);
          that.windowKeyboxesConserve.attach(that.formKeyboxesConserve);
          that.windowKeyboxesConserve.show();
        })
      },
      formKeyboxesConserve_create(){
        var that = this;
        var myform = {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          rows: [
            {
              type: "input",
              id: "shape",
              label: "形状",
              placeholder: "输入钥匙箱形状",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "combo",
              id: "state",
              label: "状态",
              labelPosition:"left",
              multiselection:false,
              selectAllButton:false,
              data: [
                {value:"on",id:"on"},
                {value:"off",id:"off"},
              ]
            },
            {
              type: "combo",
              id: "groupid",
              label: "选择可借人群",
              labelPosition:"left",
              multiselection:false,
              selectAllButton:false,
              data: that.borrowable
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
              id: "keyboxid",
              name: "keyboxid",
              type: "input",
              hidden: true,
            },
          ],
        };
        
        var myform = new FormDHX(null,myform);
        return myform;
      },
      formKeyboxesConserve_event(){
        var myform = this.formKeyboxesConserve;
        var that = this;
        myform.getItem("ok").events.on("click",function(ev){
          console.log('click')
          myform.send("/KeyboxManage/conserveKeybox","POST")
          .then(function (res){
            res=JSON.parse(res);
            switch(res.type){
              case "success":
                that.gridKeybox_reload();
                MessageDHX({
                  text: res.msg,
                  css: "expire",
                  expire: 1000,
                });
                that.windowKeyboxesConserve.destructor();
                break;
              case 'error':
                AlertDHX({
                  header: "错误",
                  text: res.msg,
                  buttons: ["关闭"],
                });
            }
          })
        })
      },
      formKeyboxesConserve_reload(obj){
        var idx1=null,idx2=null;
        for(var i = 0;i<this.borrowable.length;i++){
          if(this.borrowable[i].value==obj.groupid) idx1=this.borrowable[i].id;
        }
        // console.log(idx1)
        // console.log(obj);
        // console.log(this.borrowable)
        var myform=this.formKeyboxesConserve;
        myform.getItem("remark").setValue(obj.remark);
        myform.getItem("shape").setValue(obj.shape);
        myform.getItem("keyboxid").setValue(obj.keyboxid);
        myform.getItem("groupid").setValue(idx1);
        myform.getItem("state").setValue(obj.state=='unused'?'':obj.state);
      },
      tryinsertgridhook(){
        var that=this;
        AjaxDHX.get("/KeyboxManage/formHookTryInsert",{keyboxid:that.tmp_hook})
        .then(function (res){
          switch(res.type){
            case "error":
              AlertDHX({
                header: "错误",
                text: res.msg,
                buttons: ["关闭"],
              });
              return false;
            case "success":
              that.windowHookInsert=that.windowHookInsert_create();
              that.windowHookInsert_event();
              that.windowHookInsert_reload();
              break;
          }
        });
        return;
      },
      windowHookInsert_create(){
        var mywindow = new WindowDHX({
          width: 500,
          height: 500,
          title: "添加挂钩",
          modal: true,
        });
        return mywindow;
      },
      windowHookInsert_event(){},
      windowHookInsert_reload(){
        this.formHookInsert=this.formHookInsert_create();
        this.formHookInsert_event();
        this.formHookInsert_reload();
        this.windowHookInsert.attach(this.formHookInsert);
        this.windowHookInsert.show();
      },
      formHookInsert_create(){
        var that = this;
        var myform = {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          rows: [
            {
              type: "input",
              id: "name",
              label: "名称",
              placeholder: "输入挂钩名称",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "input",
              id: "x",
              label: "位置x",
              placeholder: "",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "input",
              id: "y",
              label: "位置y",
              placeholder: "",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            
            {
              type: "input",
              id: "admin",
              label: "指定管理员",
              placeholder: "输入管理员姓名",
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
              text: "确认添加",
              size: "medium",
              view: "flat",
              full: true,
              color: "primary",
            },
            {
              id: "keyboxid",
              name: "keyboxid",
              type: "input",
              hidden: true,
            },
          ],
        };
        var myform = new FormDHX(null,myform);
        return myform;
      },
      formHookInsert_event(){
        var myform=this.formHookInsert;
        var that= this;
        myform.getItem("ok").events.on("click",function(ev){
          myform.getItem("keyboxid").setValue(that.tmp_hook);
          myform.send("/KeyboxManage/insertformCreateHook","POST")
          .then(function (res){
            res=JSON.parse(res);
            switch(res.type){
              case "success":
               
                that.gridhook_reload();
                MessageDHX({
                  text: res.msg,
                  css: "expire",
                  expire: 1000,
                });
                that.windowHookInsert.destructor();
                break;
              case 'error':
                AlertDHX({
                  header: "错误",
                  text: res.msg,
                  buttons: ["关闭"],
                });
            }
          })
        })
      },
      formHookInsert_reload(){},
      trymodifygridHook(){
        var that=this;
        AjaxDHX.get("/KeyboxManage/formHookTryInsert",{keyboxid:that.tmp_hook})
        .then(function (res){
          switch(res.type){
            case "error":
              AlertDHX({
                header: "错误",
                text: res.msg,
                buttons: ["关闭"],
              });
              return false;
            case "success":
              var content=that.gridhook.selection.getCell();
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "请选中要修改的挂钩",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                content=content.row;
                that.gridhook.selection.removeCell();
                that.windowHookModify=that.windowHookModify_create();
                that.windowHookModify_event();
                that.windowHookModify_reload(content);
              }
              break;
          }
        });
        return;
      },
      windowHookModify_create(){
        var mywindow = new WindowDHX({
          width: 500,
          height: 500,
          title: "修改挂钩",
          modal: true,
        });
        return mywindow;
      },
      windowHookModify_event(){},
      windowHookModify_reload(obj){
        this.formHookModify=this.formHookModify_create();
        this.formHookModify_event();
        this.formHookModify_reload(obj);
        this.windowHookModify.attach(this.formHookModify);
        this.windowHookModify.show();
      },
      formHookModify_create(){
        var that = this;
        var myform = {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          rows: [
            {
              type: "input",
              id: "name",
              label: "名称",
              placeholder: "输入挂钩名称",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "input",
              id: "x",
              label: "位置x",
              placeholder: "",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            {
              type: "input",
              id: "y",
              label: "位置y",
              placeholder: "",
              required: true,
              helpMessage: "",
              errorMessage: "此项必填！",
            },
            
            {
              type: "input",
              id: "admin",
              label: "指定管理员",
              placeholder: "输入管理员姓名",
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
              id: "keyboxid",
              name: "keyboxid",
              type: "input",
              hidden: true,
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
      formHookModify_event(){
        var myform=this.formHookModify;
        var that=this;
        myform.getItem("ok").events.on("click",function(ev){
          myform.send("/KeyboxManage/modifyformCreateHook","POST")
          .then(function (res){
            res=JSON.parse(res);
            switch(res.type){
              case "success":
                that.gridhook_reload();
                MessageDHX({
                  text:res.msg,
                  css:"expire",
                  expire:1000,
                });
                that.windowHookModify.destructor();
                break;
              case "error":
                AlertDHX({
                  header: "错误",
                  text: res.msg,
                  buttons: ["关闭"],
                });
            }
          })
        })
      },
      formHookModify_reload(obj){
        
        var myform=this.formHookModify;
        myform.getItem("name").setValue(obj.name);
        myform.getItem("x").setValue(obj.x);
        myform.getItem("y").setValue(obj.y);
        myform.getItem("remark").setValue(obj.remark);
        myform.getItem("admin").setValue(obj.admin);
        myform.getItem("keyboxid").setValue(obj.keyboxid);
        myform.getItem("hookid").setValue(obj.id);
      },
      trydeletegridhook(){
        var that=this;
        AjaxDHX.get("/KeyboxManage/formHookTryInsert",{keyboxid:that.tmp_hook})
        .then(function (res){
          switch(res.type){
            case "error":
              AlertDHX({
                header: "错误",
                text: res.msg,
                buttons: ["关闭"],
              });
              return false;
            case "success":
              var content=that.gridhook.selection.getCell();
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "请选中要删除的挂钩",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                content=content.row;
                that.gridhook.selection.removeCell();
                console.log(content);
                AjaxDHX.get("/KeyboxManage/deleteCreateHook",{hookid:content['id']})
                .then(function(res){
                  switch(res.type){
                    case "error":
                    AlertDHX({
                      header: "错误",
                      text: res.msg,
                      buttons: ["关闭"],
                    });
                    return false;
                  case "success":
                    that.gridhook_reload();
                    MessageDHX({
                      text: res.msg,
                      css: "expire",
                      expire: 1000,
                    });
                    break;
                  }
                })
              }
              break;
          }
        });
        return;
      },
      getCSRF() {
        return document.head.querySelector('meta[name="X-CSRF-TOKEN"]').content;
      },
});

var layoutKeyboxesManager = LayoutKeyboxesManager.init();
export{
    layoutKeyboxesManager
};