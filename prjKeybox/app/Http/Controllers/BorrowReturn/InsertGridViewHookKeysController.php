<?php

namespace App\Http\Controllers\BorrowReturn;
use App\Http\Controllers\BorrowReturn\ModuleBorrowReturnController;
use App\Http\Controllers\Controller;
use App\Models\Hook;
use App\Models\Key;
use App\Models\User;
use Dotenv\Validator as DotenvValidator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Tymon\JWTAuth\Contracts\Providers\Auth as ProvidersAuth;

class InsertGridViewHookKeysController extends ModuleBorrowReturnController
{
    public function __construct()
    {
        parent::__construct(121,'更改钥匙信息-添加借用人');
    }
    private function common_validate(Request $req)
    {
        return false;//通过验证
    }
    private function action_validate(Request $req)
    {
        $res = $this->common_validate($req);
        if($res) return $res;
        //参数处理 hookid keyid 
        $rules = [
            'hookid'=>[
                'required',
            ],
            'kid'=>[
                'required',

            ]
        ];
        $messages = [
            'hookid.required'=>'54|未填写挂钩',
            'kid.required'=>'55|未填写钥匙'
        ];
        $attributes = [
            'hookid'=>'挂钩',
            'kid'=>'钥匙'
        ];
        $validator = Validator::make($req->all(),$rules,$messages,$attributes);
        $flag = $validator->fails();
        //return $validator->errors();
        if($flag) return parent::respond_validate($validator->errors());
        else return false;//验证通过
    }
    
    public function action(Request $req){
        
        $res = $this->action_validate($req);
        if($res) return $res;
        //修改keys信息 onhook->offhook  modufyeruuid uid 
        $key = Key::find($req['kid']);
        $key->uid = Auth::id();
        //dd(Auth::id());
        $key->state = 'offhook';
        $key->modifieruuid=Auth::id();
        // $key->modifytime = time();
        //dd($key);
        $success = $key->save();
        $hook=Hook::find($req['hookid']);
        $hook->state='off';
        $hook->save();
        return parent::respond_process(200,'借用成功','success',[],[]);

    }

    private function can(Request $req){
        //权限验证
    }

    public function form(Request $req){
        //某钥匙箱下 挂钩on 钥匙onhook
        $keyboxid = $req->keyboxid;
        $res = Hook::from('hooks AS h')
        ->leftJoin('keys AS k','h.id','=','k.hookid') ->where('h.keyboxid','=',$keyboxid)
        ->where('h.state','on')
        ->where('k.isenable','y')
        ->where('k.state','onhook')
        ->select([
            'h.id as hookid',
            'h.name as hookname',
            'k.id as keyid',
            'k.name as keyname'
        ])
        ->get();
        //组装数据
        $hooks=new Collection();
        $hookkey = new Collection();
        $res->each(function ($record) use ($hooks,$hookkey){
            $hookkey->put($record['hookid'],[
                'keyid'=>$record['keyid'],
                'keyname'=>$record['keyname']
            ]);
            $hooks->push([
                'id'=>$record['hookid'],
                'value'=>$record['hookname']
            ]);
        });
        $data = new Collection();
        $data->put('hooks',$hooks);
        $data->put('hookkey',$hookkey);
        if($res->count()==0) return parent::respond_process(201,'该钥匙箱下没有可借出的挂钩钥匙','error',[],[]);
        else return parent::respond_process(200,'获取数据成功!','success',$data,[]);
    }
}
