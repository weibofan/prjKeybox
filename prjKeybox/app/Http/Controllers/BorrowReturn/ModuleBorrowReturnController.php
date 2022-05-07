<?php

namespace App\Http\Controllers\BorrowReturn;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ModuleController;
use Illuminate\Http\Request;

abstract class ModuleBorrowReturnController extends ModuleController
{
    public function __construct(int $operationid,string $operationname)
    {
        parent::__construct(1,'借还钥匙');
        $this->operationid = $operationid;
        $this->operationname = $operationname;
    }
    //验证参数 添加 修改
    
}
