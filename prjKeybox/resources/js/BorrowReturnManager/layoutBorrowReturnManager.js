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

//借还钥匙
var LayoutBorrowReturnManager = ({
    layoutBorrowReturnManager: null,
    //1 部门及钥匙箱导航树
    //1.1
    toolbarKeyboxes: null,
    datatoolbarKeyboxes: new TreeCollection(),
    //1.2
    treeKeyboxes: null,
    datatreeKeyboxes: new TreeCollection(),
    //2 选中钥匙箱下的挂住和钥匙
    tabbarHookKeys: null,
    //2.1 
    layoutGridViewHookKeys: null,
    //2.1.1
    toolbarGridViewHookKeys: null,
    datatoolbarGridViewHookKeys: new TreeCollection(),
    //2.1.2
    gridHookKeys: null,
    datagridHookKeys: new DataCollection(),
    //2.2
    layoutFormViewHookKeys: null,
    //2.2.1
    toolbarFormViewHookKeys: null,
    datatoolbarFormViewHookKeys: new TreeCollection(),
    //2.2.2
    formHookKeys:null,
    dataformHookKeys:null,
    
    windowGridViewHookKeysInsert: null,
    formGridViewHookKeysInsert: null,
    dataformGridViewHookKeysInsert: null,
    windowGridViewHookKeysModify: null,
    formGridViewHookKeysModify: null,
    dataformGridViewHookKeysModify: null,

    windowFormViewHookKeysInsert: null,
    formFormViewHookKeysInsert: null,
    dataformFormViewHookKeysInsert: null,
    windowFormViewHookKeysModify: null,
    formFormViewHookKeysModify: null,
    dataformFormViewHookKeysModify: null,
    hooks:null,
    hookkey:null,
    windowlogin:null,
    formlogin:null,
    init(){
        this.layoutBorrowReturnManager = this.layoutBorrowReturnManager_create();
        
        //1.1
        this.toolbarKeyboxes = this.toolbarKeyboxes_create();
        this.toolbarKeyboxes_event();
        this.toolbarKeyboxes_reload();
        //1.2
        this.treeKeyboxes = this.treeKeyboxes_create();
        this.treeKeyboxes_event();
        this.treeKeyboxes_reload(0);
        //2
        this.tabbarHookKeys = this.tabbarHookKeys_create();
        this.layoutBorrowReturnManager.getCell("tabbarHookKeys").attach(this.tabbarHookKeys);
        //2.1 
        this.layoutGridViewHookKeys = this.layoutGridViewHookKeys_create();
        //2.1.1
        this.toolbarGridViewHookKeys = this.toolbarGridViewHookKeys_create();
        this.toolbarGridViewHookKeys_event();
        this.toolbarGridViewHookKeys_reload();
        //2.1.2
        this.gridHookKeys = this.gridHookKeys_create();
        this.gridHookKeys_event();
        this.gridHookKeys_reload(0);
        //2.2
        this.layoutFormViewHookKeys = this.layoutFormViewHookKeys_create();
        //2.2.1
        this.toolbarFormViewHookKeys = this.toolbarFormViewHookKeys_create();
        this.toolbarFormViewHookKeys_event();
        this.toolbarFormViewHookKeys_reload();
        //2.2.2
        
        //挂载
        this.layoutBorrowReturnManager.getCell("toolbarKeyboxes").attach(this.toolbarKeyboxes);
        this.layoutBorrowReturnManager.getCell("treeKeyboxes").attach(this.treeKeyboxes);
        this.tabbarHookKeys.getCell("gridform").attach(this.layoutGridViewHookKeys);
        this.layoutGridViewHookKeys.getCell("toolbarGridViewHookKeys").attach(this.toolbarGridViewHookKeys);
        this.layoutGridViewHookKeys.getCell("gridHookKeys").attach(this.gridHookKeys);
        // this.tabbarHookKeys.getCell("imgform").attach(this.layoutFormViewHookKeys);
        this.layoutFormViewHookKeys.getCell("toolbarFormViewHookKeys").attach(this.toolbarFormViewHookKeys);
        return this.layoutBorrowReturnManager;
    },
    //0
    layoutBorrowReturnManager_create() {
        var mylayout = new LayoutDHX(null, {
          type: "none",
          cols: [
            {
              header: "各个院系下钥匙箱",
              width: "25%",
              collapsable: true,
              rows: [
                {
                  id: "toolbarKeyboxes",
                  height: "content",
                },
                {
                  id: "treeKeyboxes",
                },
              ],
            },
            {
              id: "tabbarHookKeys",
            },
          ],
        });
        return mylayout;
      },
      //1
      //1.1
      toolbarKeyboxes_create() {
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarKeyboxes,
        });
        return mytoolbar;
      },
      toolbarKeyboxes_event() { 
        var myevents = this.toolbarKeyboxes.events;
        var that = this;
        myevents.on("click",function(id,e){
          switch(id){
            case "refresh":
              that.treeKeyboxes_reload();
              MessageDHX({
                text: "刷新成功!",
                css: "expire",
                expire: 1000,
              });
              break;
          }
        })
      },
      toolbarKeyboxes_reload() {
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
        this.datatoolbarKeyboxes.parse(mydata);
      },
      //1.2
      treeKeyboxes_create() {
        var mytree = new TreeDHX(null, {
          data:this.datatreeKeyboxes,
        });
        return mytree;
      },
      treeKeyboxes_event() {
        var that = this;
        var mytree = this.treeKeyboxes;
        var myevents = mytree.selection.events;
        myevents.on("afterSelect", function (id, e) {
          //console.log(id);
          var n = id.toString().split('_');
          if(n[0] == "keybox"){
            mytree.selection.add(id);
            //grid
            that.gridHookKeys_reload();
          }
          else{
            mytree.expand(id);
          }
        });
      },
      treeKeyboxes_reload(keyboxid) {
        var mytree = this.treeKeyboxes;
        var data = mytree.data;
        var that = this;
        AjaxDHX.get("/borrowreturntreefirst",{token:localStorage.getItem("token")})
          .then(function (res) {
            // console.log('tree');
            // console.log(res);
            that.datatreeKeyboxes.parse(res.data);
            var keyboxnodeid = false;
            var orgnodeid = false;
            var tagnodeid = false;
            //找到第一个keyboxid节点
            var arr = res.data;
            for(var i=0;i<arr.length;i++){
              var tag = arr[i];//tag
              tagnodeid = arr[i].id;
              var flag = true;
              for(var j=0;j<tag.items.length;j++){
                var org = tag.items[i];
                orgnodeid = org.id;
                //console.log(orgnodeid);
                if(org.items.length){
                  flag = true;
                  keyboxnodeid = org.items[0].id;
                  break;
                }
              }
              if(flag) break;
              
            }
            if(tagnodeid){
              mytree.selection.add(tagnodeid);
              mytree.expand(tagnodeid);
            }
            if(orgnodeid){
              mytree.selection.add(orgnodeid);
              mytree.expand(orgnodeid);
            }
            if(keyboxnodeid){
              mytree.focusItem(keyboxnodeid);
              mytree.selection.add(keyboxnodeid);
            }
            
          });
      },
      //2
      tabbarHookKeys_create() {
        var views = [
          { tab: "表格形式", id: "gridform" },
          // { tab: "图表形式", id: "imgform" },
  
        ];
        var mytabbar = new TabbarDHX(null, {
          mode: "top",
          views: views,
        });
        return mytabbar;
      },
      //2.1
      layoutGridViewHookKeys_create() {
        var mylayout = new LayoutDHX(null, {
          type: "none",
          rows: [
            {
              id: "toolbarGridViewHookKeys",
              height: "content",
            },
            {
              id: "gridHookKeys",
            },
          ],
        });
        return mylayout;
      },
      //2.1.1
      toolbarGridViewHookKeys_create() {
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarGridViewHookKeys,
        });
        return mytoolbar;
      },
      toolbarGridViewHookKeys_event() {
        var myevents = this.toolbarGridViewHookKeys.events;
        var mytree = this.treeKeyboxes;
        var that = this;
        myevents.on("click", function (id, e) {
        switch (id) {
          case "insert":
            var keyboxid = mytree.selection.getId();
            console.log(keyboxid);
            if (keyboxid.toString().split('_')[0]!="keybox") {
              
              AlertDHX({
                header: "错误",
                text: "未选中要添加信息的钥匙箱！",
                buttons: ["关闭"],
              });
              return;
            }
            that.windowGridViewHookKeysInsert = that.windowGridViewHookKeysInsert_create();
            that.windowGridViewHookKeysInsert_event();
            that.windowGridViewHookKeysInsert_reload();
            break;
          case "toggle":
            
            break;
          case "giveback":
            var content = that.gridHookKeys.selection.getCell();
            // console.log('selection')
            // console.log(content)
            if(content==undefined){
              AlertDHX({
                header: "错误",
                text: "未选中要归还的钥匙！",
                buttons: ["关闭"],
              });
              return;
            }
            else{
              content = content.row;
              that.gridHookKeys.selection.removeCell();
              console.log(content)
              AjaxDHX.post("/giveback",{
                hookid:content.hookid,
                state:content.state,
                keystate:content.keystate,
                keyid:content.keyid,
                keyuid:content.keyuid,
                keyisenable:content.keyisenable,
                token:localStorage.getItem("token")
              })
              .then(function (response){
                
                switch(response.type){
                  case 'login':
                    that.windowlogin=this.windowlogin_create();
                     that.windowlogin_event();
                    that.windowlogin_reload();
                    break;
                  case 'success':
                    that.gridHookKeys_reload();
                    MessageDHX({
                      text: response.msg,
                      css: "expire",
                      expire: 1000,
                    });
                    break;
                  case 'error':
                    AlertDHX({
                      header: "错误",
                      text: response.msg,
                      buttons: ["关闭"],
                    });
                    break;
                }

              });
            }
            break;
          case "refresh":
            that.gridHookKeys_reload();
            MessageDHX({
              text: "刷新成功!",
              css: "expire",
              expire: 1000,
            });
            break;
          }
        });
        myevents.on("inputChange", function (id, newValue) {
          switch (id) {
            case "keywords":
              console.log('inputchange')
              that.gridHookKeys_reload();
              break;
          }
        });
      },
      toolbarGridViewHookKeys_reload() {
        var mydata = [
          {
            id: "insert",
            value: "借用",
          },
          
          {
            id: "giveback",
            value: "归还",
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
        this.datatoolbarGridViewHookKeys.parse(mydata);
      },
      //2.1.2
      gridHookKeys_create() {
        var that = this;
        var mygrid = new GridDHX(null, {
          selection: "row",
          keyNavigation: true,
          multiselection: false,
        // editable: true,
          data: this.datagridHookKeys,
          columns: [
            {
              width: 80,
              id: "cntr",
              header: [{ text: "序号", align: "center" }],
              align: "center",
              template: function (text, row, col) {
                //表格序号的自动生成
                var mydata = that.datagridHookKeys;
                return mydata.getIndex(row.id) + 1;
              },
            },
            {
              width: 80,
              id: "keyisenable",
              header: [{ text: "启用", align: "center" }],
              align: "center",
              type: "boolean",
              editable: true,
            },
            {
              width: 100,
              id: "name",
              header: [{ text: "挂钩名称", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "state",
              header: [{ text: "挂钩状态", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "adminuid",
              header: [{ text: "挂钩管理员", align: "center" }],
              align: "center",
              
            },
            {
              width: 100,
              id: "keyname",
              header: [{ text: "钥匙名称", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "keystate",
              header: [{ text: "钥匙状态", align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "keyadminuid",
              header: [{ text: "钥匙管理员", align: "center" }],
              align: "center",
              hidden: true,
            },
            {
              minWidth: 100,
              id: "keyuid",
              header: [{ text: "借走人员",align: "center" }],
              align: "center",
            },
            {
              minWidth: 100,
              id: "keyremark",
              header: [{ text: "备注", align: "center" }],
              align: "center",
              hidden: true,
            },
            
          ],
        });
        return mygrid;
      },
      gridHookKeys_event() {
        var that = this;
        this.gridHookKeys.events.on("afterSelect",function(ev){
          console.log(that.gridHookKeys.selection.getCell().row)
          
        })
        
      },
      gridHookKeys_reload() {
        var that = this;
        if(this.treeKeyboxes.selection['_selected'])
        {
          var keyboxid = this.treeKeyboxes.selection['_selected'].split("_")[1];
          
          AjaxDHX.get("/borrowreturngrid",{
            keyboxid:keyboxid,
            token:localStorage.getItem("token")
          })
          .then(function(res){
            switch(res.type){
              case 'login':
                that.windowlogin=this.windowlogin_create();
                that.windowlogin_event();
                that.windowlogin_reload();
                break;
              case "success":
                // console.log('suc')
                // console.log(res.data)
                that.datagridHookKeys.parse(res.data);
                break;
              case "error":
                MessageDHX({
                  text: res.msg,
                  expire: 1000,
                });
                that.datagridHookKeys.parse([]);
                return;
            }
          });
        }
      },
      //2.1.3 
      tryinsertGridViewHookKeys(){},
      windowGridViewHookKeysInsert_create() {
        var mywindow = new WindowDHX({
          width: 500,
          height: 500,
          title: "选择借用的钥匙信息",
          modal: true,
        });
        return mywindow;
      },
      windowGridViewHookKeysInsert_event() {},
      
      windowGridViewHookKeysInsert_reload() {
        var that = this;
        //某个钥匙箱下可借的钥匙
        AjaxDHX.get("/borrowreturnforminsertkey",{token:localStorage.getItem("token"),keyboxid:this.treeKeyboxes.selection['_selected'].split("_")[1]})
        .then(function(res){
          switch(res.type){
            case 'login':
                that.windowlogin=this.windowlogin_create();
                that.windowlogin_event();
                that.windowlogin_reload();
                break;
            case "success":
              that.hooks = res.data.hooks;
              that.hookkey = res.data.hookkey;
              that.formGridViewHookKeysInsert = that.formGridViewHookKeysInsert_create(that.hooks);
              
              that.formGridViewHookKeysInsert_event();
              that.formGridViewHookKeysInsert_reload();
              that.windowGridViewHookKeysInsert.attach(that.formGridViewHookKeysInsert);
              that.windowGridViewHookKeysInsert.show();
              break;
            case "error":
              that.windowGridViewHookKeysInsert.destructor();
              MessageDHX({
                text: res.msg,
                expire: 1000,
              });
              break;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
        
        
      },
      formGridViewHookKeysInsert_create(hooks) {
        //console.log('lll')
        //console.log(hooks)
        if(hooks.length>0){
          // console.log(hooks);
          var myform = {
            css: "dhx_widget--bordered dhx_widget--bg_white",
            rows: [
              
              {
                type: "combo",
                id: "hookid",
                label: "挂钩",
                labelPosition:"left",
                multiselection:false,
                selectAllButton:false,
                data: hooks
              },
              {
                type: "input",
                id: "keyid",
                label: "钥匙",
                placeholder: "",
                required: true,
                helpMessage: "",
                errorMessage: "此项必填！",
              },
              {
                id: "kid",
                type: "input",
                hidden: true,
              },
              {
                id: "token",
                name: "token",
                type: "input",
                hidden: true,
              },
              {
                type: "button",
                id: "ok",
                text: "确定借用",
                size: "medium",
                view: "flat",
                full: true,
                color: "primary",
              },
            ],
          };
          var myform = new FormDHX(null,myform);
          return myform;
        }
        
        
      },
      formGridViewHookKeysInsert_event(){
        var myform = this.formGridViewHookKeysInsert;
        var that = this;
        myform.events.on("change",function(){
          myform.getItem("keyid").setValue(that.hookkey[myform.getItem("hookid").getValue()]['keyname']);
          myform.getItem("kid").setValue(that.hookkey[myform.getItem("hookid").getValue()]['keyid']);
          myform.getItem("token").setValue(localStorage.getItem("token"));

        });
        myform.getItem("ok").events.on("click", function (ev) {
          myform.getItem("token").setValue(localStorage.getItem("token"));
          myform
            .send("/borrowreturninsertkey", "POST")
            .then(function (response) {
              var res = JSON.parse(response);
              // console.log(res)
              switch(res.msgid){
                case 501:
                  that.windowlogin=this.windowlogin_create();
                  that.windowlogin_event();
                  that.windowlogin_reload();
                  break;
                case 200:
                  that.gridHookKeys_reload();
                  MessageDHX({
                    text: res.msg,
                    css: "expire",
                    expire: 1000,
                  });
                  // 清空表单信息
                  
                  that.windowGridViewHookKeysInsert_reload();
                  break;
              }
            });
        });
        
      },
      formGridViewHookKeysInsert_reload(){
        var myform = this.formGridViewHookKeysInsert;
        
      },
      insertGridViewHookKeys(){},
      //2.2
      layoutFormViewHookKeys_create() {
        var mylayout = new LayoutDHX(null, {
          type: "none",
          rows: [
            {
              id: "toolbarFormViewHookKeys",
              height: "content",
            },
            {
              id: "Img",
            },
          ],
        });
        return mylayout;
      },
      //2.2.1
      toolbarFormViewHookKeys_create() {
        var mytoolbar = new ToolbarDHX(null, {
          css: "dhx_widget--bordered dhx_widget--bg_white",
          navigationType: "pointer",
          data: this.datatoolbarFormViewHookKeys,
        });
        return mytoolbar;
      },
      toolbarFormViewHookKeys_event() {
  
      },
      toolbarFormViewHookKeys_reload() {
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
        this.datatoolbarFormViewHookKeys.parse(mydata);
      },

      getCSRF() {
        return document.head.querySelector('meta[name="X-CSRF-TOKEN"]').content;
      },
      windowlogin_create(){
        var mywindow = new WindowDHX({
            width: 500,
            height: 500,
            title: "登录",
            modal: true,
        });
        return mywindow;
    },
    windowlogin_event(){},
    windowlogin_reload(){
      this.formlogin=this.formlogin_create();
      this.formlogin_event();
      this.formlogin_reload();
      this.windowlogin.attach(this.formlogin);
      this.windowlogin.show();
    },
    formlogin_create(){
        var that = this;
        var myform = {
            css: "dhx_widget--bordered dhx_widget--bg_white",
            rows: [
                {
                    type: "input",
                    id: "realname",
                    label: "账号",
                    placeholder: "输入校园卡号或员工卡号",
                    required: true,
                    helpMessage: "",
                    errorMessage: "此项必填！",
                },

                {
                    type: "input",
                    inputType: "password",
                    id: "password",
                    label: "密码",
                    required: true,
                    helpMessage: "",
                    errorMessage: "此项必填！",
                },

                {
                    type: "button",
                    id: "ok",
                    text: "登录",
                    size: "medium",
                    view: "flat",
                    full: true,
                    color: "primary",
                },

            ],
        };

        var myform = new FormDHX(null,myform);
        return myform;
    },
    formlogin_event(){
      var myform = this.formlogin;
      var that = this;
      myform.getItem("ok").events.on("click",function(ev){
        
        myform.send("/auth/login","POST")
        .then(function (res){
          res=JSON.parse(res);
          // console.log(res);
          switch(res.type){
            case "error":
              AlertDHX({
                header: "错误",
                text: res.msg,
                buttons: ["关闭"],
              });
              break;
            case "success":
              //放入本地缓存
              
              localStorage.setItem('token',res.data.token);
              that.windowlogin.destructor();
              break;
          }
        })
      })
    },
    formlogin_reload(){},
      
});
var layoutBorrowReturnManager = LayoutBorrowReturnManager.init();
export{
    layoutBorrowReturnManager
}