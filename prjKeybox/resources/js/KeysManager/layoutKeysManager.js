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

var LayoutKeysManager = ({
    //钥匙库
    layoutKeysManager:null,
    toolbarwarehouse:null,
    datatoolbarwarehouse:new TreeCollection(),
    treewarehouse:null,
    datatreewarehouse:new TreeCollection(),
    toolbarmanagewarehouse:null,
    datatoolbarmanagewarehouse:new TreeCollection(),
    gridwarehouse:null,
    datagridwarehouse:new DataCollection(),

    windowgridinsert:null,
    formgridinsert:null,
    dataformgridinsert:null,
    windowgridmodify:null,
    formgridmodify:null,
    dataformgridmodify:null,

    windowhook:null,
    formhook:null,

    hooks:null,
    orgid:null,
    init(){
        this.layoutKeysManager = this.layoutKeysManager_create();
        //tree
        this.toolbarwarehouse = this.toolbarwarehouse_create();
        this.toolbarwarehouse_event();
        this.toolbarwarehouse_reload();

        this.treewarehouse = this.treewarehouse_create();
        this.treewarehouse_event();
        this.treewarehouse_reload();

        //grid
        this.toolbarmanagewarehouse = this.toolbarmanagewarehouse_create();
        this.toolbarmanagewarehouse_event();
        this.toolbarmanagewarehouse_reload();

        this.gridwarehouse = this.gridwarehouse_create();
        this.gridwarehouse_event();
        this.gridwarehouse_reload();
        //挂载
        this.layoutKeysManager.getCell("toolbarwarehouse").attach(this.toolbarwarehouse);
        this.layoutKeysManager.getCell("treewarehouse").attach(this.treewarehouse);
        this.layoutKeysManager.getCell("toolbarmanagewarehouse").attach(this.toolbarmanagewarehouse);
        this.layoutKeysManager.getCell("gridwarehouse").attach(this.gridwarehouse);
        return this.layoutKeysManager;
    },
    layoutKeysManager_create() {
        var mylayout = new LayoutDHX(null, {
          type: "none",
          cols: [
            {
              width: "25%",
              collapsable:true,
              header:"院系",
              rows: [
                {
                  id: "toolbarwarehouse",
                  height: "content",
                },
                {
                  id: "treewarehouse",
                },
              ],
            },
            {
              
              rows: [
                {
                  id: "toolbarmanagewarehouse",
                  height: "content",
                },
                {
                  id: "gridwarehouse",
                },
              ],
            },
          ],
        });
        return mylayout;
      },
      toolbarwarehouse_create() {
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarwarehouse,
        });
        return mytoolbar;
      },
      toolbarwarehouse_event() { 
        var myevents=this.toolbarwarehouse.events;
        var that= this;
        myevents.on("click",function(id,e){
          switch(id){
            case "refresh":
              that.treewarehouse_reload();
              MessageDHX({
                text: "刷新成功!",
                css: "expire",
                expire: 1000,
              });
              break;
          }
        })
      },
      toolbarwarehouse_reload() {
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
        this.datatoolbarwarehouse.parse(mydata);
      },
      treewarehouse_create() {
        var mytree = new TreeDHX(null, {
          data:this.datatreewarehouse,
        });
        return mytree;
      },
      treewarehouse_event() {
        var that=this;
        var mytree = this.treewarehouse;
        var myevents = mytree.selection.events;
        myevents.on("afterSelect",function(id,e){
          that.gridwarehouse.selection.removeCell();
          var n = id.toString().split('_');
          that.orgid=id;
          if(n[0] == "org"){
            mytree.selection.add(id);
            console.log(id);
            that.gridwarehouse_reload();
          }
          else{
            mytree.expand(id);
          }
        });
  
      },
      treewarehouse_reload(orgid) {
        // 1. 若groupid参数有效，则focus该节点，并展开其父节点
        var mytree = this.treewarehouse;
        var data = mytree.data;
        var that=this;
        AjaxDHX.get("/KeyWarehouse/getree",{token:localStorage.getItem("token")})
        .then(function (res){
          that.datatreewarehouse.parse(res.data);
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
      toolbarmanagewarehouse_create() {
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarmanagewarehouse,
        });
        return mytoolbar;
      },
      toolbarmanagewarehouse_event() {
        var myevents=this.toolbarmanagewarehouse.events;
        var that=this;
        myevents.on("click",function(id,e){
          switch(id){
            case "refresh":
              that.gridwarehouse_reload();
              MessageDHX({
                text: "刷新成功!",
                css: "expire",
                expire: 1000,
              });
              break;
            case "hook":
              var content= that.gridwarehouse.selection.getCell();
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "未选中要启/禁用的钥匙！",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                content=content.row;
                that.gridwarehouse.selection.removeCell();
                that.tryhook(content);
              }
              break;
            case "enable":
              var content=that.gridwarehouse.selection.getCell();
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "未选中要启/禁用的钥匙！",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                content=content.row;
                that.gridwarehouse.selection.removeCell();
                AjaxDHX.get("/KeyWarehouse/enableKey",{keyid:content.id,adminuid:content.adminuid,token:localStorage.getItem("token")})
                .then(function (res){
                  switch(res.type){
                    case "success":
                      that.gridwarehouse_reload();
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
            case "insert":
              var tmp = that.orgid.toString().split('_')[0];
              var id = that.orgid.toString().split('_')[1];
              if(tmp==='org'){
                that.tryinsert();
              }
              else{
                AlertDHX({
                  header: "错误",
                  text: "未选中要添加钥匙的部门！",
                  buttons: ["关闭"],
                });
                return;
              }
              break;
            case "modify":
              var tmp = that.orgid.toString().split('_')[0];
              var id = that.orgid.toString().split('_')[1];
              if(tmp==='org'){
                that.trymodify();
              }
              else{
                AlertDHX({
                  header: "错误",
                  text: "未选中要修改钥匙的部门！",
                  buttons: ["关闭"],
                });
                return;
              }
              break;
            case "delete":
              var tmp = that.orgid.toString().split('_')[0];
              var id = that.orgid.toString().split('_')[1];
              if(tmp==='org'){
                that.trydelete();
              }
              else{
                AlertDHX({
                  header: "错误",
                  text: "未选中要删除钥匙的部门！",
                  buttons: ["关闭"],
                });
                return;
              }
              break;
          }
        })
      },
      toolbarmanagewarehouse_reload() {
        var mydata = [
          {
            id: "insert",
            value: "添加",
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
            id: "hook",
            value: "匹配挂钩",
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
          {
            id: "keywords",
            type: "input",
            placeholder: "请输入查找关键字",
            tooltip:
              "可输入姓名或身份名的部分关键字，同时必须包含的多个关键字以空格分隔。不超过32个字符。",
            icon: "dxi dxi-magnify",
          },
        ];
        this.datatoolbarmanagewarehouse.parse(mydata);
      },
      gridwarehouse_create() {
        var that = this;
        var mygrid = new GridDHX(null, {
          selection: "row",
          keyNavigation: true,
          multiselection: false,
        // editable: true,
          data: this.datagridwarehouse,
          columns: [
            {
              width: 80,
              id: "cntr",
              header: [{ text: "序号", align: "center" }],
              align: "center",
              template: function (text, row, col) {
                //表格序号的自动生成
                var mydata = that.datagridwarehouse;
                return mydata.getIndex(row.id) + 1;
              },
            },
            {
              width: 80,
              id: "isenable",
              header: [{ text: "启用", align: "center" }],
              align: "center",
              type: "boolean",
              editable: true,
            },
            
            {
              width: 120,
              id: "name",
              header: [{ text: "钥匙名称", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "state",
              header: [{ text: "钥匙状态", align: "center" }],
              align: "center",
            },
            {
              minWidth: 120,
              id: "hook",
              header: [{ text: "匹配挂钩", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "admin",
              header: [{ text: "钥匙管理员", align: "center" }],
              align: "center",
            },
            
            {
              minWidth: 100,
              id: "user",
              header: [{ text: "借走人员",align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "creator",
              header: [{ text: "创建者",align: "center" }],
              align: "center",
              hidden:true,
            },
            {
              minWidth: 200,
              id: "ctime",
              header: [{ text: "创建时间",align: "center" }],
              align: "center",
              hidden:true
            },
            {
              minWidth: 100,
              id: "modifier",
              header: [{ text: "修改者",align: "center" }],
              align: "center",
              hidden:true
            },
            {
              minWidth: 200,
              id: "mtime",
              header: [{ text: "修改时间",align: "center" }],
              align: "center",
              hidden:true
            },
            {
              minWidth: 200,
              id: "remark",
              header: [{ text: "备注", align: "center" }],
              align: "center",
            },
            
          ],
        });
        return mygrid;
      },
      gridwarehouse_event() {
        var that=this;
        this.gridwarehouse.events.on("afterSelect",function(ev){
          console.log(that.gridwarehouse.selection.getCell().row);
        })
       },
      gridwarehouse_reload() {
        var that=this;
        if(this.treewarehouse.selection['_selected'])
        {
          var orgid=this.treewarehouse.selection['_selected'].split("_")[1];
          AjaxDHX.get("/KeyWarehouse/getgrid",{
            orgid:orgid,
            token:localStorage.getItem("token")
          })
          .then(function(res){
            switch(res.type){
              case "success":
                that.datagridwarehouse.parse(res.data);
                break;
              case "error":
                MessageDHX({
                  text: res.msg,
                  expire: 1000,
                });
                that.datagridwarehouse.parse([]);
                break;
            }
          });
        }
      },
      tryinsert(){
        var that=this;
        AjaxDHX.get("/KeyWarehouse/tryinsertkey",{orgid:that.orgid.toString().split('_')[1],token:localStorage.getItem("token")})
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
              that.windowgridinsert=that.windowgridinsert_create();
              that.windowgridinsert_event();
              that.windowgridinsert_reload();
          }
        });
        
      },
      windowgridinsert_create(){
        var mywindow = new WindowDHX({
          width: 500,
          height: 500,
          title: "添加钥匙",
          modal: true,
        });
        return mywindow;
      },
      windowgridinsert_event(){},
      windowgridinsert_reload(){
        this.formgridinsert=this.formgridinsert_create();
        this.formgridinsert_event();
        this.formgridinsert_reload();
        this.windowgridinsert.attach(this.formgridinsert);
        this.windowgridinsert.show();
      },
      formgridinsert_create(){
        var that = this;
        var myform = {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          rows: [
            {
              type: "input",
              id: "name",
              label: "名称",
              placeholder: "输入钥匙名称",
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
              id: "orgid",
              name: "orgid",
              type: "input",
              hidden: true,
            },
            {
              id: "token",
              name: "token",
              type: "input",
              hidden: true,
            },
          ],
        };
        
        var myform = new FormDHX(null,myform);
        return myform;
      },
      formgridinsert_event(){
        var myform=this.formgridinsert;
        var that=this;
        myform.getItem("ok").events.on("click",function(ev){
          myform.getItem("orgid").setValue(that.orgid.toString().split('_')[1]);
          myform.getItem("token").setValue(localStorage.getItem("token"));
          myform.send("/KeyWarehouse/addkey","POST")
          .then(function (res){
            res=JSON.parse(res);
            switch(res.type){
              case "success":
                that.gridwarehouse_reload();
                MessageDHX({
                  text: res.msg,
                  css: "expire",
                  expire: 1000,
                });
                that.windowgridinsert.destructor();
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
      formgridinsert_reload(){},
      trymodify(){
        var that=this;
        AjaxDHX.get("/KeyWarehouse/tryinsertkey",{token:localStorage.getItem("token"),orgid:that.orgid.toString().split('_')[1]})
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
              var content=that.gridwarehouse.selection.getCell();
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "请选中要修改的钥匙",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                content=content.row;
                that.gridwarehouse.selection.removeCell();
                that.windowgridmodify=that.windowgridmodify_create();
                that.windowgridmodify_event();
                that.windowgridmodify_reload(content);
              }
          }
        });
      },
      windowgridmodify_create(){
        var mywindow = new WindowDHX({
          width: 500,
          height: 500,
          title: "修改钥匙",
          modal: true,
        });
        return mywindow;
      },
      windowgridmodify_event(){},
      windowgridmodify_reload(obj){
        this.formgridmodify=this.formgridmodify_create();
        this.formgridmodify_event();
        this.formgridmodify_reload(obj);
        this.windowgridmodify.attach(this.formgridmodify);
        this.windowgridmodify.show();
      },
      formgridmodify_create(){
        var that = this;
        var myform = {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          rows: [
            {
              type: "input",
              id: "name",
              label: "名称",
              placeholder: "输入钥匙名称",
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
              id: "keyid",
              name: "keyid",
              type: "input",
              hidden: true,
            },
            {
              id: "orgid",
              name: "orgid",
              type: "input",
              hidden: true,
            },
            {
              id: "token",
              name: "token",
              type: "input",
              hidden: true,
            },
          ],
        };
        
        var myform = new FormDHX(null,myform);
        return myform;
      },
      formgridmodify_event(){
        var myform=this.formgridmodify;
        var that=this;
        myform.getItem("ok").events.on("click",function(ev){
          myform.getItem("token").setValue(localStorage.getItem("token"));
          myform.send("/KeyWarehouse/modifykey","POST")
          .then(function (res){
            res=JSON.parse(res);
            switch(res.type){
              case "success":
               
                that.gridwarehouse_reload();
                MessageDHX({
                  text: res.msg,
                  css: "expire",
                  expire: 1000,
                });
                that.windowgridmodify.destructor();
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
      formgridmodify_reload(obj){
        // console.log(obj);
        var myform=this.formgridmodify;
        myform.getItem("name").setValue(obj.name);
        myform.getItem("orgid").setValue(obj.orgid);
        myform.getItem("admin").setValue(obj.admin);
        myform.getItem("remark").setValue(obj.remark);
        myform.getItem("keyid").setValue(obj.id);
      },
      trydelete(){
        var that=this;
        AjaxDHX.get("/KeyWarehouse/tryinsertkey",{token:localStorage.getItem("token"),orgid:that.orgid.toString().split('_')[1]})
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
              var content=that.gridwarehouse.selection.getCell();
              if(content==undefined){
                AlertDHX({
                  header: "错误",
                  text: "请选中要删除的钥匙",
                  buttons: ["关闭"],
                });
                return;
              }
              else{
                content=content.row;
                that.gridwarehouse.selection.removeCell();
                AjaxDHX.get("/KeyWarehouse/deletekey",{token:localStorage.getItem("token"),keyid:content.id})
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
                      that.gridwarehouse_reload();
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
        });
      },
      tryhook(obj)
      {
        var that=this;
        // console.log(obj);
        AjaxDHX.get("/KeyWarehouse/tryhook",{adminuid:obj.adminuid,keyid:obj.id,token:localStorage.getItem("token")})
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
              that.windowhook=that.windowhook_create();
              that.windowhook_event();
              that.windowhook_reload(obj);
          }
        })
      },
      windowhook_create(){
        var mywindow = new WindowDHX({
          width: 500,
          height: 500,
          title: "匹配挂钩",
          modal: true,
        });
        return mywindow;
      },
      windowhook_event(){},
      windowhook_reload(org){
        var that=this;
        AjaxDHX.get("/KeyWarehouse/formgethooks",{orgid:org.orgid,token:localStorage.getItem("token")}).then(function(res){
          that.hooks=res;
          console.log(that.hooks);
          that.formhook=that.formhook_create();
          that.formhook_event();
          that.formhook_reload(org);
          that.windowhook.attach(that.formhook);
          that.windowhook.show();
        })
      },
      formhook_create(){
        var that = this;
        var myform = {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          rows: [
            {
              type: "combo",
              id: "hook",
              label: "挂钩",
              labelPosition:"left",
              multiselection:false,
              selectAllButton:false,
              data: that.hooks
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
              id: "keyid",
              name: "keyid",
              type: "input",
              hidden: true,
            },
            {
              id: "token",
              name: "token",
              type: "input",
              hidden: true,
            },
          ],
        };
        
        var myform = new FormDHX(null,myform);
        return myform;
      },
      formhook_event(){
        var myform=this.formhook;
        var that=this;
        myform.getItem("ok").events.on("click",function(ev){
          myform.getItem("token").setValue(localStorage.getItem("token"));
          myform.send("/KeyWarehouse/addhook","POST")
          .then(function (res){
            res=JSON.parse(res);
            switch(res.type){
              case "success":
                that.gridwarehouse_reload();
                MessageDHX({
                  text: res.msg,
                  css: "expire",
                  expire: 1000,
                });
                that.windowhook.destructor();
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
      formhook_reload(obj){
        
        console.log(obj);
        var myform=this.formhook;
        myform.getItem("keyid").setValue(obj.id);
        myform.getItem("remark").setValue(obj.remark);
        myform.getItem("hook").setValue(obj.hookid);
      },
});

var layoutKeysManager = LayoutKeysManager.init();
export {
    layoutKeysManager
};