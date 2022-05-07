<?php

namespace App\Http\Controllers\KeyboxManage;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ModuleController;
use Illuminate\Http\Request;

class ModuleKeyboxManageController extends ModuleController
{
    public function __construct(int $operationid,string $operationname)
    {
        parent::__construct(2,'钥匙箱管理');
        $this->operationid = $operationid;
        $this->operationname = $operationname;
    }
}
