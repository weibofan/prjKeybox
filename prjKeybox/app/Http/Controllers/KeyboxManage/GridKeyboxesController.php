<?php

namespace App\Http\Controllers\KeyboxManage;

use App\Http\Controllers\Controller;
use App\Http\Controllers\KeyboxManage\ModuleKeyboxManageController;
use App\Models\Group;
use App\Models\Groupuser;
use App\Models\Keybox;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class GridKeyboxesController extends ModuleKeyboxManageController
{
    public function __construct()
    {
        parent::__construct(201,"查看钥匙箱列表");
    }
    private function common_validate(Request $req)
    {
        return false;
    }
    private function action_validate(Request $req)
    {
        $res = $this->common_validate($req);
        if($res) return $res;
        
        return false;
    }
    public function action(Request $req){
        $res=$this->action_validate($req);
        if($res) return $res;
        
        $uids = Auth::id();
        //1.我管理的所有钥匙箱
        //2.我所在钥匙箱助手群体 可以查看整个院系下钥匙箱
        $keyboxs_asAdmin = Keybox::select('*')->where('adminuid',$uids)->get();//我管理的所有钥匙箱
        $groups_asMember = Groupuser::with(['group'])->select('*')->where('uid',$uids)->get();
        $groups_asMember = $groups_asMember->map(function ($group_asMember){
            return $group_asMember['group'];
        })->where('category','keybox_general_keybox')->unique();//我所在的所有钥匙箱助手组
        $org_ids=$groups_asMember->pluck('orgid')->unique();//对应的orgid
        $keyboxs_asMember = Keybox::select('*')->whereIn('orgid',$org_ids)->get();
        $keyboxs = $keyboxs_asMember->merge($keyboxs_asAdmin);
        $node_keybox = new Collection();
        $keyboxs->each(function ($keybox)use($node_keybox){
            
            $node_keybox->put($keybox->id,[
                'keyboxid'=>$keybox->id,
                'orgid'=>Organization::find($keybox->orgid)['name'],
                'name'=>$keybox->name,
                'shape'=>$keybox->shape,
                'position'=>$keybox->position,
                'state'=>$keybox->state,
                'adminuid'=>User::find($keybox->adminuid)['realname'],
                'groupid'=>Group::find($keybox->groupid)['name'],
                'isenable'=>$keybox->isenable=='y',
                'remark'=>$keybox->remark,
                'createtime'=>date('Y-m-d H:i:s',strtotime($keybox->createtime)),
                'creator'=>User::find($keybox->creatoruuid)['realname'],
                'modifytime'=>date('Y-m-d H:i:s',strtotime($keybox->modifytime)),
                'modifier'=>User::find($keybox->modifieruuid)['realname'],
            ]);
        });
        $len = $node_keybox->count();
        if($len==0) return parent::respond_process(201,"没有您可管理的钥匙箱!",'error',[],[]);
        else return parent::respond_process(200,'获取数据成功!','success',$node_keybox->values(),[]);
    }
}
