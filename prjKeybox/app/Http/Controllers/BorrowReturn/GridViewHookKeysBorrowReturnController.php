<?php

namespace App\Http\Controllers\BorrowReturn;
use App\Http\Controllers\BorrowReturn\ModuleBorrowReturnController;
use App\Http\Controllers\Controller;
use App\Models\Hook;
use App\Models\Key;
use App\Models\Keybox;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use PhpParser\ErrorHandler\Collecting;

class GridViewHookKeysBorrowReturnController extends ModuleBorrowReturnController
{
    public function __construct()
    {
        parent::__construct(102,'表格形式查看选中钥匙箱');
    }
    private function common_validate(Request $req)
    {

        return false;//通过验证
    }
    private function action_validate(Request $req)
    {
        $res = $this->common_validate($req);
        if($res) return $res;
        //参数处理
        //keyboxid keywords
        $rules = [
            'keyboxid' => [
                'required',//1.必须传入参数
                'integer',//2.必须是整数
                function ($attribute, $keyboxid,$fail){
                    $keybox = Keybox::find($keyboxid);
                    if($keybox->isenable=='n'){
                        $fail('53|该钥匙箱未启用!');
                        return;
                    }
                }
            ],

        ];
        $messages = [
            'keyboxid.required' => '51|未传入参数钥匙箱id!',
            'keyboxid.integer'=>'52|钥匙箱id必须是整数!',
        ];
        $attributes = [
            'keyboxid'=>'钥匙箱编号',
        ];
        $validator = Validator::make($req->all(),$rules,$messages,$attributes);
        $flag = $validator->fails();
        //return $validator->errors();
        if($flag) return parent::respond_validate($validator->errors());
        else return false;//验证通过

    }

    public function action(Request $req){
        $res = $this->action_validate($req);
        if($res) return $res;
        //查询钥匙箱id对应的hookid再找到keyid
        $keyboxid = $req -> keyboxid;
        $records = Key::from('keys as k')->leftJoin('hooks as h','k.hookid','=','h.id')->where('h.keyboxid',$keyboxid)
        ->where('h.state','!=','unused')->where('k.isenable','y');
        // //keywords
        // $keyword_flag = $req->keywords == null;
        // if($keyword_flag){
        //     $keywords = strlen($req->keywords) > 32 ? substr($req->keywords, 0, 32) : $req->keywords;
        //     $keywords = explode(" ", $keywords);

        //     //关键字筛选
        //     foreach ($keywords as $keyword) {
        //         $keyword = trim($keyword);
        //         if ($keyword) {
        //             $records = $records->where(function ($record) use ($keyword) {
        //                 $record->where('h.name', 'LIKE', '%' . $keyword . '%')
        //                     ->orWhere('k.name', 'LIKE', '%' . $keyword . '%');
        //             });
        //         }
        //     }
        // }
        $records = $records
        ->select([
            'h.id as hookid',
            'h.name',
            'h.state',
            'h.adminuid',
            'k.id as keyid',
            'k.name as keyname',
            'k.state as keystate',
            'k.remark as keyremark',
            'k.adminuid as keyadminuid',
            'k.uid as keyuid',
            'k.isenable as keyisenable'
        ])->get()->map(function($record){
            //dd($record);
            $record['keyisenable'] = $record['keyisenable'] == "y";
            $record['adminuid'] = User::find($record['adminuid'])['realname'];
            $record['keyadminuid'] = User::find($record['keyadminuid'])['realname'];
            if($record['keyuid']) $record['keyuid'] = User::find($record['keyuid'])['realname'];
            return $record;
        });
       // dd($records);
        $cnt = $records->count();
        if($cnt==0) return parent::respond_process(201,'没有匹配钥匙记录','error',[],[]);
        else return parent::respond_process(200,'获取数据成功!','success',$records,[]);
    }
}
