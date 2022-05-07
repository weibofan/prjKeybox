<?php

namespace App\Http\Controllers\KeyboxManage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\KeyboxManage\ModuleKeyboxManageController;
use App\Models\Groupuser;
use App\Models\Keybox;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class CreateKeyboxController extends ModuleKeyboxManageController
{
    public function __construct()
    {
        parent::__construct(211,"添加修改删除钥匙箱");
    }
    private function common_validate(Request $req)
    {
        return false;
    }
    private function action_validate(Request $req)
    {
        $res = $this->common_validate($req);
        if($res) return $res;
        //参数处理
        return false;
    }
    public function can(Request $req)
    {
        //必须是钥匙箱助手才可以执行
        $uid = Auth::id();
        $groups = Groupuser::from('groupusers as gu')//我所在的所有钥匙箱助手群
        ->leftJoin('groups as g','gu.groupid','=','g.id')
        ->where('gu.uid','=',$uid)
        ->where('g.category','keybox_general_keybox')
        ->get();
        $cnt=$groups->count();
        if($cnt==0){
            return parent::respond_process(59,'您不是钥匙箱助手，无法执行此操作','error',[],[]);
        }
        else return parent::respond_process(200,'验证权限成功!','success',[],[]);
    }
    public function form(Request $req)
    {
        //加载院系(我有权限管理的)
        $uid = Auth::id();
        $groups = Groupuser::from('groupusers as gu')//我所在的所有钥匙箱助手群的对应院系
        ->leftJoin('groups as g','gu.groupid','=','g.id')
        ->where('gu.uid','=',$uid)
        ->where('g.category','keybox_general_keybox')
        ->get()
        ->pluck('orgid')->unique();

        $orgs = Organization::whereIn('id',$groups)->whereNotNull('fid')->select(['id','name as value'])->get();
        return $orgs;
    }
    public function action(Request $req)
    {
        //权限
        
        $keybox = new Keybox();
        $keybox->name=$req->name;
        $keybox->position=$req->position;
        $keybox->orgid=$req->orgid;
        $keybox->state='unused';
        // dd($keybox);
        $admin=$req->admin;
        $adminuid=User::where('realname',$admin)->get();
        // dd($adminuid);
        if($adminuid->count()==0) return parent::respond_process(60,'您填的管理员无效！','error',[],[]);
        // dd($adminuid[0]['id']);
        // dd($keybox);
        $keybox->adminuid=$adminuid[0]['id'];
        // dd($keybox);
        $keybox->isenable='n';
        // dd($keybox);
        $keybox->remark=$req->remark;
        $keybox->creatoruuid=Auth::id();
        $keybox->modifieruuid=Auth::id();
        // dd($keybox);
        $suc = $keybox->save();
        return parent::respond_process(200,'添加钥匙箱成功!','success',[],[]);
    }
    public function modify(Request $req)
    {
        $keybox =Keybox::find($req['keyboxid']);
        $keybox->name=$req->name;
        $keybox->position=$req->position;
        $keybox->orgid=$req->orgid;
        // $keybox->state='unused';
        // dd($keybox);
        $admin=$req->admin;
        $adminuid=User::where('realname',$admin)->get();
        // dd($adminuid);
        if($adminuid->count()==0) return parent::respond_process(60,'您填的管理员无效！','error',[],[]);
        // dd($adminuid[0]['id']);
        // dd($keybox);
        $keybox->adminuid=$adminuid[0]['id'];
        // dd($keybox);
        // $keybox->isenable='n';
        // dd($keybox);
        $keybox->remark=$req->remark;
        // $keybox->creatoruuid=Auth::id();
        $keybox->modifieruuid=Auth::id();
        // dd($keybox);
        $suc = $keybox->save();
        return parent::respond_process(200,'修改钥匙箱成功!','success',[],[]);
    }
    public function delete(Request $req)
    {
        $keybox=Keybox::find($req['keyboxid']);
        $flag = $keybox['isenable']=='y';
        if($flag===true){
            return parent::respond_process(61,'该钥匙箱已经启用，请让钥匙箱管理员禁用后再删除！','error',[],[]);
        }
        else{
            $keybox->delete();
            return parent::respond_process(200,'删除钥匙箱成功!','success',[],[]);
        }

    }
}
