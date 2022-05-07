<?php

namespace App\Http\Controllers\HookManage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\ModuleController;

class ModuleHookManageController extends ModuleController
{
    public function __construct(int $operationid,string $operationname)
    {
        parent::__construct(3,'挂钩及日志管理');
        $this->operationid = $operationid;
        $this->operationname = $operationname;
    }
}
