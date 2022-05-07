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

class CheckMatchController extends ModuleHookManageController
{
    public function __construct()
    {
        parent::__construct(322,'确认匹配的钥匙');
    }
    public function action(Request $req)
    {
        $hook=Hook::find($req['hookid']);
        $hook->state='on';
        $hook->save();
        $key=Key::find($req['keyid']);
        $key->state='onhook';
        $key->save();
        $keys=Key::where('hookid',$req['hookid'])->where('state','instock')->get();
        $keys->each(function($obj){
            $key=Key::find($obj['id']);
            $key->hookid=null;
            $key->save();
        });
        return parent::respond_process(200,'匹配钥匙成功!','success',[],[]);
    }
}
