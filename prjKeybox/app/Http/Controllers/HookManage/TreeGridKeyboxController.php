<?php

namespace App\Http\Controllers\HookManage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HookManage\ModuleHookManageController;
use App\Models\Group;
use App\Models\Groupuser;
use App\Models\Hook;
use App\Models\Key;
use App\Models\Keybox as ModelsKeybox;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class TreeGridKeyboxController extends ModuleHookManageController
{
    public function __construct()
    {
        parent::__construct(302,'获取钥匙箱挂钩treegrid');
    }
    public function action(Request $req)
    {
        $uid=Auth::id();
        //一层:钥匙箱 我作为挂钩管理员管理的挂钩所在钥匙箱
        //二层:挂钩 我管理的
        $keyboxs=ModelsKeybox::where('orgid',$req['orgid'])->get()->pluck(['id'])->unique();
        $res=Hook::where('adminuid',$uid)
        ->whereIn('keyboxid',$keyboxs)->get();
        $nodes_hook=new Collection();
        $nodes=new Collection();
        $res->each(function($hook) use (&$nodes_hook,$nodes){
            $nodes_hook->put($hook->id,[
                'id'=>'hook_'.$hook->id,
                'name'=>$hook->name,
                'x'=>$hook->x,
                'y'=>$hook->y,
                'shape'=>$hook->shape,
                'state'=>$hook->state,
                'adminuid'=>$hook->adminuid,
                'remark'=>$hook->remark,
                'creatoruuid'=>$hook->creatoruuid,
                'modifieruuid'=>$hook->modifieruuid,
                'createtime'=>$hook->createtime,
                'modifytime'=>$hook->modifytime,
                'ctime'=>date('Y-m-d H:i:s',strtotime($hook->createtime)),
                'mtime'=>date('Y-m-d H:i:s',strtotime($hook->modifytime)),
                'creator'=>User::find($hook->creatoruuid)['realname'],
                'modifier'=>User::find($hook->modifieruuid)['realname'],
                'admin'=>User::find($hook->adminuid)['realname'],
                'items'=>Key::where('hookid',$hook->id)->where('state','instock')->select([
                    'id',
                    'name'
                ])->get()
            ]);
            $nodes->put($hook->keyboxid,[
                'id'=>'keybox_'.$hook->keyboxid,
                'name'=>ModelsKeybox::find($hook->keyboxid)['name'],
                // 'x'=>'',
                // 'y'=>'',
                // 'shape'=>'',
                // 'state'=>'',
                // 'adminuid'=>'',
                // 'remark'=>'',
                // 'creatoruuid'=>'',
                // 'modifieruuid'=>'',
                // 'createtime'=>'',
                // 'modifytime'=>'',
                // 'ctime'=>'',
                // 'mtime'=>'',
                // 'creator'=>'',
                // 'modifier'=>'',
                // 'admin'=>'',
                'items'=>new Collection(),
            ]);
        });

        $res->each(function($hook) use (&$nodes,$nodes_hook){
            $node_hook=$nodes_hook->get($hook['id']);
            $keybox = $nodes->get($hook['keyboxid']);
            $keybox['items']->push($node_hook);
            $nodes->put($hook['keyboxid'],$keybox);
        });
        
        $len=$nodes->count();
        if($len===0) return parent::respond_process(201,'该部门下没有你管理的挂钩!','error',[],[]);
        else return parent::respond_process(200,'获取钥匙箱-挂钩成功!','success',$nodes->values(),[]);
    }
}
