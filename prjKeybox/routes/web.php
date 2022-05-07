<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ClientAuth\LoginController as ClientAuthLoginController;
use App\Http\Controllers\ClientAuth\LogoutController as ClientAuthLogoutController;
use App\Models\Groupuser;
use App\Models\Hook;
use App\Models\Key;
use App\Models\Keybox;
use Illuminate\Database\Eloquent\Collection;
use Firebase\JWT\JWT;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
});


//借还钥匙模块
Route::get('/borrowreturntreefirst','BorrowReturn\TreeKeyboxesBorrowReturnController@action');//钥匙箱树
Route::get('/borrowreturngrid','BorrowReturn\GridViewHookKeysBorrowReturnController@action');//根据钥匙箱id加载挂钩钥匙表
Route::post('/borrowreturninsertkey','BorrowReturn\InsertGridViewHookKeysController@action');//更改借用钥匙信息
Route::get('/borrowreturnforminsertkey','BorrowReturn\InsertGridViewHookKeysController@form');//插入借用钥匙的表格信息
Route::post('/giveback','BorrowReturn\GivebackByManagerController@action');//更改归还钥匙信息

//钥匙箱管理模块
Route::get('/KeyboxManage/GridKeyboxes','KeyboxManage\GridKeyboxesController@action');//钥匙箱表格
Route::get('/KeyboxManage/GridHooks','KeyboxManage\GridHooksController@action');//挂钩表格
Route::get('/KeyboxManage/GridKeys','KeyboxManage\GridKeysController@action');//钥匙表格
Route::get('/KeyboxManage/formKeyboxInsert','KeyboxManage\CreateKeyboxController@form');//插入钥匙箱form：获取院系
Route::get('/KeyboxManage/formKeyboxTryInsert','KeyboxManage\CreateKeyboxController@can');//插入钥匙箱form：验证权限
Route::post('/KeyboxManage/insertformCreateKeybox','KeyboxManage\CreateKeyboxController@action');//上传添加钥匙箱表格
Route::post('/KeyboxManage/modifyformCreateKeybox','KeyboxManage\CreateKeyboxController@modify');//上传修改钥匙箱表格
Route::get('/KeyboxManage/deleteCreateKeybox','KeyboxManage\CreateKeyboxController@delete');//删除钥匙箱
Route::get('/KeyboxManage/enableKeybox','KeyboxManage\EnableKeyboxController@action');//启用/禁用钥匙箱
Route::get('/KeyboxManage/groupsConserveKeybox','KeyboxManage\ConserveKeyboxController@form');//加载维护表单:可选择的可借群体
Route::get('/KeyboxManage/tryConserveKeybox','KeyboxManage\ConserveKeyboxController@can');//加载维护表单:权限验证
Route::post('/KeyboxManage/conserveKeybox','KeyboxManage\ConserveKeyboxController@action');//维护:更改钥匙箱信息

Route::get('/KeyboxManage/formHookTryInsert','KeyboxManage\CreateHookController@can');//插入hook：验证权限
Route::post('/KeyboxManage/insertformCreateHook','KeyboxManage\CreateHookController@action');//上传添加hook表格
Route::post('/KeyboxManage/modifyformCreateHook','KeyboxManage\CreateHookController@modify');//上传修改hook表格
Route::get('/KeyboxManage/deleteCreateHook','KeyboxManage\CreateHookController@delete');//删除hook

//挂钩及日志管理
Route::get('/HookManage/gettree','HookManage\TreeOrgsController@action');//加载部门树
Route::get('/HookManage/treegrid','HookManage\TreeGridKeyboxController@action');//加载部门树
Route::get('/HookManage/gridjournel','HookManage\GridJournelController@action');//加载日志表
Route::post('/HookManage/conservehook','HookManage\ConserveHookController@action');//上传挂钩信息
Route::get('/HookManage/matchkey','HookManage\CheckMatchController@action');//匹配钥匙

//钥匙库
Route::get('/KeyWarehouse/getree','KeyWarehouse\TreeKeyWarehouseController@action');//加载钥匙库的部门树
Route::get('/KeyWarehouse/getgrid','KeyWarehouse\GridKeyWarehouseController@action');//加载钥匙库的grid
Route::post('/KeyWarehouse/addkey','KeyWarehouse\AddKeyController@action');//添加钥匙
Route::post('/KeyWarehouse/modifykey','KeyWarehouse\AddKeyController@modify');//修改钥匙
Route::get('/KeyWarehouse/deletekey','KeyWarehouse\AddKeyController@delete');//删除钥匙
Route::get('/KeyWarehouse/tryinsertkey','KeyWarehouse\AddKeyController@can');//验证权限:钥匙助手
Route::get('/KeyWarehouse/enableKey','KeyWarehouse\EnableKeyController@action');//启用/禁用钥匙
Route::get('/KeyWarehouse/formgethooks','KeyWarehouse\ConserveKeyController@form');//加载unused的挂钩
Route::get('/KeyWarehouse/tryhook','KeyWarehouse\ConserveKeyController@can');//验证权限:钥匙管理员
Route::post('/KeyWarehouse/addhook','KeyWarehouse\ConserveKeyController@action');//匹配挂钩
// 返回认证系统主⻚
/*Route::get('/xauth', function () {
    if (!env('APP_DEBUG')) {
        return redirect(env('MIX_SERVER_URL') );
    }
    return redirect('/');
 });

Route::get('/users/getinfo',function(){

    return response([
        'msgid'=>Auth::check()?200:201,
        'msg'=>Auth::check()?'获取用户信息成功!':'获取用户信息失败!',
        'err'=>[],
        'data'=>[
            'realname'=>Auth::check()?Auth::user()->realname:'未登录',
            'name'=>Auth::check()?Auth::user()->name:'xxx',
            'tagzhname'=>Auth::check()?Auth::user()->tagzhname:'',
            'url'=>('APP_DEBUG')?'':env('MIX_SERVER_URL'),
        ]
    ]);
});*/

Route::get('/users/auth',function(){
    $id=Auth::id();
    $arr=Groupuser::from('groupusers as gu')
    ->leftJoin('groups as g','gu.groupid','=','g.id')
    ->where('uid',$id)
    ->pluck('category')
    ->unique();
    $res=new Collection();
    if($arr->contains('keybox_general_keybox')) $res->push('钥匙箱助手');
    if($arr->contains('keybox_general_key')) $res->push('钥匙助手');
    if($arr->contains('keybox_general_borrowable')) $res->push('可借人');
    $keybox=Keybox::where('adminuid',$id)->count();
    if($keybox>0) $res->push('钥匙箱管理员');
    $hook=Hook::where('adminuid',$id)->count();
    if($hook>0) $res->push('挂钩管理员');
    $keys=Key::where('adminuid',$id)->count();
    if($keys>0) $res->push('钥匙管理员');
    return $res;
});

//硬件
Route::get('/hardware/action1','Hardware\HardwareController@action1');
Route::get('/hardware/action2','Hardware\HardwareController@action2');

//登录
Route::post("/auth/login",'AuthController@login');
Route::get("/auth/user",'AuthController@user');
Route::post("/auth/logout",'AuthController@logout');