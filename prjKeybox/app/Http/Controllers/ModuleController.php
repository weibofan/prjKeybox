<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\MessageBag;
abstract class ModuleController extends Controller
{

    protected $moduleid;//模块编号
    protected $modulename;//模块名
    protected $operationid;//操作编号
    protected $operationname;//操作名

    public function __construct(int $moduleid,string $modulename)
    {
        $this->moduleid = $moduleid;
        $this->modulename = $modulename;
    }
    private function respond(int $msgid,string $msg,string $msgtype = 'error',$data = false,$paras=[])
    {
        return response([
            'msgid' => $msgid,
            'msg' => $msg,
            'type' => $msgtype,
            'data' => $data,
            'paras' => $paras,
            'moduleid' => $this->moduleid,
            'modulename' => $this->modulename,
            'operationid' => $this->operationid,
            'operationname' => $this->operationname,
            'fullmsgid' => sprintf(
                '%02d%03d%03d',
                $this->moduleid, // 2位模块编号
                $this->operationid, // 3位操作编号
                $msgid // 3位
            ),
            'fullmsg' => sprintf(
                '%s>%s>%s',
                $this->modulename,
                $this->operationname,
                $msg
            ),
        ]);
    }
    //参数是否传入
    protected function respond_arghas(int $msgid,string $argname){
        return $this->respond(
            1,
            sprintf('未传入参数(%s)!',$argname),
        );
    }
    //参数 id是否整数 部门是否存在 权限
    protected function respond_validate(MessageBag $errs)
    {
        foreach ($errs->getMessages() as $para => $str) {
            list($msgid, $msg) = explode('|', $str[0]);
            return $this->respond($msgid, $msg, 'error', false, [$para]);
        }
    }
    //联合检测
    protected function respond_x($msgid, $msg, $paras, $msgtype = 'error')
    {
        return $this->respond($msgid, $msg, $msgtype, false, $paras);
    }
    //控制器真的做的事情 获取表格
    protected function respond_process($msgid, $msg, $msgtype, $data, $paras = [])
    {
        return $this->respond($msgid, $msg, $msgtype, $data, $paras);
    }
}
