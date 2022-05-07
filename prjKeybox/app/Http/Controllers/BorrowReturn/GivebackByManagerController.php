<?php

namespace App\Http\Controllers\BorrowReturn;
use App\Http\Controllers\BorrowReturn\ModuleBorrowReturnController;
use App\Http\Controllers\Controller;
use App\Models\Groupuser;
use App\Models\Hook;
use App\Models\Key;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class GivebackByManagerController extends ModuleBorrowReturnController
{
    public function __construct()
    {
        parent::__construct(122,'更改钥匙信息-删除借用人');
    }
    private function common_validate(Request $req)
    {
        return false;
    }
    private function action_validate(Request $req)
    {
        $res = $this->common_validate($req);
        if($res) return $res;
        $rules = [
            'state'=>[
                
                function($attribute,$state,$fail){
                    if($state!="off"){
                        $fail('54|挂钩状态不可用，不能执行此操作!');
                        return;
                    }
                }
            ],
            'keystate'=>[
                
                function($attribute,$state,$fail){
                    if($state!="offhook"){
                        $fail('55|钥匙非未归还状态，不能执行此操作!');
                        return;
                    }
                }
            ],
            'keyisenable'=>[
                function ($attribute, $keyisenable,$fail){
                   
                    if($keyisenable==false){
                        $fail('56|该钥匙未启用!');
                        return;
                    }
                }
            ],
            'keyuid'=>[
                'required'
            ]
        ];
        $messages=[
            'keyuid.required'=>'57|无借走人信息，不用执行此操作!'
        ];
        $attributes = [
            'keyuid'=>'借走人',
            'state'=>'挂钩状态',
            'keystate'=>'钥匙状态',
            'keyisenable'=>'钥匙启用状态'
        ];
        $validator = Validator::make($req->all(),$rules,$messages,$attributes);
        $flag = $validator->fails();
        //return $validator->errors();
        if($flag) return parent::respond_validate($validator->errors());
        else return false;//验证通过
        return false;
    }
    private function can(Request $req){
        //权限验证：必须是该挂钩管理员才可以帮助归还
        $uid = Auth::id();
        // dd($uid);
        //验证是否是挂钩管理员
        $flag = $uid==Hook::find($req['hookid'])['adminuid'];

        // $groups = Groupuser::from('groupusers as gu')
        // ->leftJoin('groups as g','gu.groupid','=','g.id')
        // ->where('gu.uid','=',$uid)
        // ->where('g.category','keybox_general_borrowable')
        // ->select([
        //     'g.adminuid as adminuid'
        // ])
        // ->get();
        
        // $groups->each(function ($group) use (&$flag,$uid) {
        //     if($uid==$group['adminuid']){
        //         $flag = true;
        //     }
        // });
       
        if(!$flag){
            return parent::respond_process(58,'您不是挂钩管理员，无权限执行此操作','error',[],[]);
        }
        else return false;
    }
    public function action(Request $req){
        // dd($req);
        $res = $this->action_validate($req);
        if($res) return $res;
        $res = $this->can($req);
        if($res) return $res;
        //onhook modifyer uid-null
        $key = Key::find($req['keyid']);
        $key -> uid = null;
        $key -> state = 'onhook';
        $key -> modifieruuid = Auth::id();
        $success = $key->save();
        $hook=Hook::find($req['hookid']);
        $hook->state='on';
        $hook->save();
        return parent::respond_process(200,'归还成功','success',[],[]);
    }
}
