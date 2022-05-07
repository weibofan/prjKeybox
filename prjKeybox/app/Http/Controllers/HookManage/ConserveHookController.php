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

class ConserveHookController extends ModuleHookManageController
{
    public function __construct()
    {
        parent::__construct(321,'维护挂钩-修改挂钩信息');
    }
    public function action(Request $req)
    {
        $hook=Hook::find($req['hookid']);
        $hook->x=$req->x;
        $hook->y=$req->y;
        $hook->shape=$req->shape;
        $hook->modifieruuid=Auth::id();
        $hook->remark=$req->remark;
        $suc=$hook->save();
        return parent::respond_process(200,'维护挂钩信息成功!','success',[],[]);
    }
}
