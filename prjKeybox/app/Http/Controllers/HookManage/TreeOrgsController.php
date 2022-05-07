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
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class TreeOrgsController extends ModuleHookManageController
{
    public function __construct()
    {
        parent::__construct(301,'获取部门树');
    }
    public function action(Request $req)
    {
        

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

        //第二层:部门 我作为挂钩管理员管理的挂钩对应的部门
        $uids=Auth::id();
        // dd($uids);
        $keyboxids = Hook::where('adminuid',$uids)->pluck('keyboxid')->unique();
        $orgs = ModelsKeybox::whereIn('id',$keyboxids)->pluck('orgid')->unique();
        $orgs2=Organization::whereIn('id',$orgs)->select('*')->get();
        $nodes_org = new Collection();
        $orgs2->each(function ($org) use (&$nodes_org){
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
