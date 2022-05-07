<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    protected $only;
    protected $except;
    public function __construct(){
        $option = [];
        if(!is_null($this->only)){
            $option['only']=$this->only;
        }
        if(!is_null($this->except)){
            $option['except']=$this->except;
        }
        $this->middleware('auth:web',$option);
    }
}
