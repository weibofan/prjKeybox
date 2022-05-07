<?php

namespace App\Http\Controllers;

use App\Models\borrowinfo;
use App\Models\key;
use App\Models\keyusers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function MongoDB\BSON\toJSON;

class HomeController extends Controller
{
    public function dbTest(){
        $users = DB::select('select * from users');
        dd($users);
    }
    public function testCollection()
    {
        //$collect = collect([1,2,3]);
        //dd($collect->toArray());
        //all返回collection对象
        $users = keyusers::all();
        $users->pluck('name')->dump();
    }
    public function keystates(){
        $keys = key::get();
        return json_encode($keys);
    }
    public function updatekeys(){
        $now = $_REQUEST['keystates'];
        $keys = key::get()->pluck('state');
        $keys = json_encode($keys);

        for($i=0;$i<9;$i++){
            $ch = $now[$i];
            if($ch != $keys[$i*2+1]){
                $state = intval($ch);
                $idx = $i+1;
            }
        }

        $info = borrowinfo::orderBy('time','desc')->first();
        $info->keyid = $idx;
        $info->save();
        $keys = key::where('id',$idx)->update(['state'=>$state]);
        return 'sucess';
    }
    public function procdata1(){
        $boxid = intval($_REQUEST['keyboxid']);
        $user = intval($_REQUEST['userid']);

        $info = borrowinfo::query()->create([
            'boxid' => $boxid,
            'user' => $user,
        ]);
        return "open";
    }
}
