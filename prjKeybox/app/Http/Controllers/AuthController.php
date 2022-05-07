<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    protected $only = ['user'];
    public function user(){
        $user =  Auth::guard()->user();
        $data = new Collection();
        $data->put("user",$user);
        return $this->respond(200,"当前用户","success",$user);
    }
    public function login(Request $req){
        //获取账号密码
        $realname = $req->input('realname');
        $password = $req->input('password');

        //数据验证
        if(empty($realname)||empty($password)){
            return $this->respond(201,"账户或密码为空","error",[]);
        }
        //账号是否存在
        $user = User::where('name',$realname)->get();

        if($user->count()==0){
            return $this->respond(201,"用户不存在","error",[]);
        }
        $user = $user[0];
        
        //密码验证
        $isPass = Hash::check($password,$user['password']);
        if(!$isPass){
            return $this->respond(201,"账户密码不匹配","error",[]);
        }
        //获取token
        $token=Auth::guard()->login($user);
        //组装数据返回
        $data=new Collection();
        $data->put("token",$token);
        $data->put("user",$user);
        return $this->respond(200,"登录成功","success",$data);
    }
    public function logout()
    {
        Auth::guard()->logout();
        return $this->respond(200,"登出成功","success",[]);
    }
    private function respond(int $msgid,string $msg,string $msgtype,$data = false)
    {
        return response([
            'msgid' => $msgid,
            'msg' => $msg,
            'type' => $msgtype,
            'data' => $data,
        ]);
    }
}
