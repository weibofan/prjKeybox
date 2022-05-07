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
    DataView
  } from "dhx-suite-package";

  var LayoutAboutUs=({
      layoutAboutUs:null,
      dataviewAboutUs:null,
      init(){
          this.layoutAboutUs=this.layoutAboutUs_create();
          this.dataviewAboutUs=this.dataviewAboutUs_create();
          this.layoutAboutUs.getCell("dataviews").attach(this.dataviewAboutUs);
          return this.layoutAboutUs;
      },
      layoutAboutUs_create(){
          var mylayout=new LayoutDHX("aboutus",{
              type:"line",

              rows:[
                  {
                      id:"content",
                      html:"<p>&nbsp;&nbsp;&nbsp;&nbsp;我们的系统综合传统钥匙箱和智能钥匙箱的优点，平衡价格与功能，针对学校内钥匙借还的特征来设计一款产品，将钥匙箱硬件与钥匙借还监控软件相结合，支持无人值守情况下的钥匙借还。钥匙管理：将钥匙依据所有方分设不同的钥匙箱，并放置在对应的挂钩上，是钥匙组织收纳有序。每一把钥匙对应一个开关，通过记录开关状态改变的情况，来确定该钥匙的借、还情况。钥匙状态查询：用户通过访问钥匙管理网页，可以查询需借钥匙的所在位置、是否借出等相关信息。身份认证：钥匙箱的开启依靠身份认证和权限授予，用户在获取权限后需使用校园卡等含有身份信息的卡片开启箱门，同时软件中更新相应的记录。</p>",
                      height:"100px",
                      width:"100%"
                  },
                  {
                    padding:"10px",
                    id:"roles",
                    header:"角色和功能",
                    height:"200px",
                    width:"100%",
                    html:"<div>钥匙箱助手：增删改查钥匙箱，指定钥匙箱管理员<br>钥匙箱管理员：维护钥匙箱信息指定可借人群，启用钥匙箱，添加钥匙箱下挂钩并指定挂钩管理员<br>挂钩管理员：查看本人管理的挂钩以及挂钩上的钥匙情况，可以帮助用户归还钥匙，确认钥匙管理员的匹配请求<br>钥匙助手：可以在钥匙库中添加某个系下的钥匙，并指定钥匙管理员<br>钥匙管理员：维护钥匙信息，启用钥匙，匹配钥匙给空闲的挂钩<br>钥匙箱可借人群：可以查看钥匙箱的钥匙借出情况，借用钥匙</div>"
                  },
                  {
                      id:"dataviews",
                      header:"我们的开发小组",
                      width:"100%",
                      height:"500px"
                  }
              ]
              
          });
          return mylayout;
      },
      dataviewAboutUs_create(){
        const template = ({ title, text, type, avatar }) => {
            return `
                <div class="dhx_dataview_template_a">
                    <div class="dhx_dataview_template_a__head">
                        <div class="dhx_dataview_template_a__type dhx_dataview_template_a__type--${type}">${type}</div>
                        <div class="dhx_dataview_template_a__content">
                            <div class="dhx_dataview_template_a__title">${title}</div>
                            <div class="dhx_dataview_template_a__comment">${text}</div>
                        </div>
                    </div>
                    <div class="dhx_dataview_template_a__body">
                        <div class="dhx_dataview_template_a__person">
                            <div class="dhx_dataview_template_a__avatar" style="background-image: url(${avatar})"></div>
                            
                        </div>
                        
                    </div>
                </div>
              `;
            };
            var data=[
                {
                    title:"徐珑珊",
                    text:"项目硬件搭建",
                    type:"组长",
                    avatar:"https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_14.jpg"
                },
                {
                    title:"张楠",
                    text:"商业计划书编制",
                    type:"组员",
                    avatar:"https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_11.jpg"
                },
                {
                    title:"魏博帆",
                    text:"项目软件开发",
                    type:"组员",
                    avatar:"https://snippet.dhtmlx.com/codebase/data/common/img/02/avatar_13.jpg"
                },
            ];
          var dataview=new DataView("dataview",{
              template,
              data,
              itemsInRow:3,
              gap:8,
              css:"dhx_dataview_template_a_box"
          });
          return dataview;
      },
      
  });
  var layoutAboutUs=LayoutAboutUs.init();
  export{
      layoutAboutUs
  };