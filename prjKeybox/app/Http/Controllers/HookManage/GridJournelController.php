<?php

namespace App\Http\Controllers\HookManage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HookManage\ModuleHookManageController;
use App\Models\Group;
use App\Models\Groupuser;
use App\Models\Hook;
use App\Models\Journel;
use App\Models\Key;
use App\Models\Keybox as ModelsKeybox;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class GridJournelController extends ModuleHookManageController
{
    public function __construct()
    {
        parent::__construct(303,'获取日志');
    }
    public function action(Request $req)
    {
        if(($req['hookid'])=="null"){
            //查看钥匙箱日志
            $res=Journel::where('boxid',$req['keyboxid'])
            ->orderBy('createtime','desc')
            ->get()
            ->map(function ($journel){
                $journel['box']=ModelsKeybox::find($journel->boxid)['name'];
                if($journel->hookid) $journel['hook']=Hook::find($journel->hookid)['name'];
                $journel['ctime']=date('Y-m-d H:i:s',strtotime($journel['createtime']));
                $journel['user']=User::find($journel['uid'])['realname'];
                return $journel;
            });
            $len=$res->count();
            if($len==0){
                return parent::respond_process(201,"该钥匙箱下没有日志",'error',[],[]);
            }
            else return parent::respond_process(200,'获取数据成功!','success',$res,[]);
        }
        else{
            //查看挂钩日志
            $res=Journel::where('hookid',$req['hookid'])
            ->orderBy('createtime','desc')
            ->get()
            ->map(function ($journel){
                $boxid=Hook::find($journel->hookid)['keyboxid'];
                $journel['box']=ModelsKeybox::find($boxid)['name'];
                $journel['hook']=Hook::find($journel->hookid)['name'];
                $journel['ctime']=date('Y-m-d H:i:s',strtotime($journel['createtime']));
                $journel['user']=User::find($journel['uid'])['realname'];
                return $journel;
            });
            $len=$res->count();
            if($len==0){
                return parent::respond_process(201,"该挂钩下没有日志",'error',[],[]);
            }
            else return parent::respond_process(200,'获取数据成功!','success',$res,[]);
        }
    }
}
