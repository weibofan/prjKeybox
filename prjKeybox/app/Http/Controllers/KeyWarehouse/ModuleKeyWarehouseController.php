<?php

namespace App\Http\Controllers\KeyWarehouse;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ModuleController;
use Illuminate\Http\Request;

class ModuleKeyWarehouseController extends ModuleController
{
    public function __construct(int $operationid,string $operationname)
    {
        parent::__construct(4,'钥匙库');
        $this->operationid = $operationid;
        $this->operationname = $operationname;
    }
}
