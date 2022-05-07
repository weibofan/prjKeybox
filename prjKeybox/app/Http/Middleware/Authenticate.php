<?php

namespace App\Http\Middleware;

use App\Exceptions\DetailException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Collection;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {//登录失败 跳转到login
            return route('login');
        }
    }
    protected function unauthenticated($request, array $guards)
    {
        if($request->expectsJson() || in_array('web',$guards)){
            throw new DetailException("请登录",501);
        }
        parent::unauthenticated($request,$guards);
    }
}
