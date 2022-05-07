<?php

namespace App\Http\Controllers\BorrowReturn;
use App\Http\Controllers\BorrowReturn\ModuleBorrowReturnController;
use App\Models\Group;
use App\Models\Groupuser;
use App\Models\Hook;
use App\Models\Keybox as ModelsKeybox;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class TreeKeyboxesBorrowReturnController extends ModuleBorrowReturnController
{
    public function __construct()
    {
        parent::__construct(101,'获取部门树及钥匙箱');
    }
    private function common_validate(Request $req)
    {

        return false;//通过验证
    }
    public function action(Request $req)
    {

        $res = $this->action_validate($req);
        if($res) return $res;

        

        //第一层：顶层点-单位(都列出) tagid value 二层节点
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

        //第二层：部门 1.我作为可借人成员所在群体的部门 2.我作为挂钩管理员所在的部门
         $uids = Auth::id();
        //1.
        $orgids = Groupuser::from('groupusers as gu')
        ->leftJoin('groups as g','gu.groupid','=','g.id')
        ->where('gu.uid',$uids)
        ->where('g.category','keybox_general_borrowable')
        ->get()
        ->pluck(['orgid'])
        ->unique();
        //2.
        $orgids2=Hook::from('hooks as h')
        ->leftJoin('keyboxes as k','h.keyboxid','=','k.id')
        ->where('h.adminuid',$uids)
        ->get()
        ->pluck(['orgid'])
        ->unique();

        $orgids=$orgids->merge($orgids2);
        $orgs=Organization::whereIn('id',$orgids)->get();
        $nodes_org = new Collection();
        $orgs->each(function ($org) use (&$nodes_org){
            $nodes_org->put($org->id,[
                'id'=>'org_'.$org->id,
                'tagid'=>$org->tagid,
                'istop'=>is_null($org->fid),
                'value'=>$org->name,
                'items'=>new Collection(),
            ]);
        });

        //第三层：钥匙箱 1.挂钩管理员管理的挂钩所在钥匙箱 2.钥匙可借人群体 我所在群体类别是‘钥匙可借人’可查看的钥匙箱
        //1
        $boxids=Hook::where('adminuid',$uids)->get()->pluck('keyboxid')->unique();
        $keyboxes_asHookManage = ModelsKeybox::whereIn('id',$boxids)->get();
        //2
        $groups_asMember = Groupuser::with(['group'])->select('*')->where('uid',$uids)
        ->get();//我所在群体
        $groups_asMember = $groups_asMember->map(function ($group_asMember){
            return $group_asMember['group'];
        })->where('category','keybox_general_borrowable')->unique();
        $groups_ids = $groups_asMember->pluck('id');
        $keyboxs_asMember = ModelsKeybox::select('*')->whereIn('groupid',$groups_ids)->get();//我所在群体可查看的钥匙箱
        $keyboxs = $keyboxes_asHookManage->merge($keyboxs_asMember);
        //return $keyboxs;
        $nodes_keybox = new Collection();
        $keyboxs->each(function ($keybox) use (&$nodes_keybox){
            $nodes_keybox->put($keybox->id,[
                'id' => 'keybox_'.$keybox->id,
                'orgid'=>$keybox->orgid,
                'value'=>$keybox->name
            ]);
        });
        // dd($keyboxs);
        //将三层加入二层
        $nodes_keybox->each(function ($node_keybox,$keyboxid) use (&$nodes_org){
            $node_org = $nodes_org->get($node_keybox['orgid']);
            $node_org['items']->put($keyboxid,$node_keybox);
            $nodes_org->put($node_keybox['orgid'],$node_org);
            // dd($nodes_org);
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
        $nodes_tags = $nodes_tags ->values()->map(function ($node_tag) {
            $node_tag['items']=$node_tag['items']->values()
            ->map(function ($node_org){
                if(array_key_exists('items',$node_org))
                    $node_org['items'] = $node_org['items']->values();
                return $node_org;
            });
            return $node_tag;
        });

        return parent::respond_process(200,'获取钥匙箱树成功!','success',$nodes_tags,[]);
    }
    private function action_validate(Request $req)
    {
        $res = $this->common_validate($req);
        if($res) return $res;
        //参数处理
        return false;
    }
}
