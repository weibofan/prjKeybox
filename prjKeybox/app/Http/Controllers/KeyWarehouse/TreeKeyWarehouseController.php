<?php

namespace App\Http\Controllers\KeyWarehouse;

use App\Http\Controllers\KeyWarehouse\ModuleKeyWarehouseController;
use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Groupuser;
use App\Models\Key;
use App\Models\Keybox as ModelsKeybox;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class TreeKeyWarehouseController extends ModuleKeyWarehouseController
{
    public function __construct()
    {
        parent::__construct(401,'获取部门树');
    }
    public function action(Request $req)
    {
        $users = Auth::user()->users();

        //第一层：顶层点
        $nodes_tags = new Collection();
        $tags = Organization::select('*')->whereNull('fid')->get();
        $tags->each(function ($tag) use (&$nodes_tags){
            if(!$nodes_tags->has($tag->tagid)){
                $nodes_tags->put($tag->tagid,[
                    'id' => 'tag_'.$tag->tagid,
                    'value' => $tag->name,
                    'items' => new Collection(),
                ]);
            }
        });

        //第二层：部门 1.我作为钥匙助手所在群体的部门 2.我作为钥匙管理员管理的钥匙对应的部门
        $uids=Auth::id();
        //1.
        $orgs1=Groupuser::with(['group.org'])->select('*')->where('uid',$uids)
        ->get();
        $orgs_asKeyHelper=new Collection();
        $orgs1->each(function($org1) use ($orgs_asKeyHelper){
            if($org1['group']['category']==="keybox_general_key"){
                $orgs_asKeyHelper->push($org1['group']['org']);
            }

        });
        // return $orgs_asKeyHelper;
        //2.
        $orgs2=Key::where('adminuid',$uids)->pluck('orgid')->unique();
        $orgs_asKeyManager=Organization::whereIn('id',$orgs2)->select('*')->get();
        $orgs=$orgs_asKeyHelper->merge($orgs_asKeyManager);
        $nodes_org = new Collection();
        $orgs->each(function ($org) use (&$nodes_org){
            $nodes_org->put($org->id,[
                'id'=>'org_'.$org->id,
                'tagid'=>$org->tagid,
                'istop'=>is_null($org->fid),
                'value'=>$org->name,
            ]);
        });

        //二层加入一层
        $nodes_org->each(function ($node_org,$orgid) use (&$nodes_tags){
            $node_tag = $nodes_tags->get($node_org['tagid']);
            if($node_org['istop']){
                $node_tag['items'] = $node_tag['items']->merge($node_org['items']);
            }
            else{
                $node_tag['items']->put($orgid,$node_org);
            }
            $nodes_tags->put($node_org['tagid'],$node_tag);
        });

        //重设子节点下标
        $nodes_tags=$nodes_tags->values()->map(function ($node_tag){
            $node_tag['items']=$node_tag['items']->values();
            return $node_tag;
        });
        return parent::respond_process(200,'获取部门树成功!','success',$nodes_tags,[]);
    }
}
