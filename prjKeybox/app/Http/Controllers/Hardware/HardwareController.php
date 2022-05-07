<?php

namespace App\Http\Controllers\Hardware;

use App\Http\Controllers\Controller;
use App\Models\Hook;
use App\Models\Journel;
use App\Models\Key;
use App\Models\Keybox;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class HardwareController extends Controller
{
    public function action1(Request $req){
        //boxid uid states
        $keyboxid=$req['boxid'];
        $user=User::where('name',$req['uid'])->get();
        $uid=$user[0]['id'];
        //写入journal boxid uid optype=open
        $journal = new Journel();
        $journal->boxid=$keyboxid;
        $journal->uid=$uid;
        $journal->optype='open';
        $journal->save();
        return '11';
    }
    public function action2(Request $req)
    {
        $keyboxid=$req['boxid'];
        $user=User::where('name',$req['uid'])->get();
        $uid=$user[0]['id'];
        $states=$req['states'];
        $hardware=new Collection();
        $ids=Hook::where('keyboxid',$keyboxid)->get()->pluck(['id']);
        // dd($ids);
        for($i=0;$i<strlen($states);$i++){
            if($states[$i]==0) $hardware->put($ids[$i],[
                'state'=>"off"//没有钥匙
            ]);
            else $hardware->put($ids[$i],[
                'state'=>"on"//有钥匙
            ]);
        }
        // dd($hardware);
        $hooks=Hook::where('keyboxid',$keyboxid)->get();
        $hooks->each(function ($hook) use (&$hardware,$keyboxid,$uid){
            $state=$hardware->get($hook['id'])['state'];//现在
            $hardware_state=$hook['state'];//原来
            if($hardware_state!==$state){
                //1->0 借走
                if($state==="off"){
                    $journal=new Journel();
                    $journal->boxid=$keyboxid;
                    $journal->uid=$uid;
                    $journal->hookid=$hook['id'];
                    $journal->optype='off';
                    $journal->save();
                    $key=Key::where('hookid',$hook['id'])->get();
                    $key=$key[0];
                    $key->uid=$uid;
                    $key->state='offhook';
                    $key->modifieruuid=$uid;
                    $key->save();
                    $hook_update=Hook::find($hook['id']);
                    $hook_update->state="off";
                    $hook_update->modifieruuid=$uid;
                    $hook_update->save();
                }
                else if($state==="on"){
                    //
                    $journal=new Journel();
                    $journal->boxid=$keyboxid;
                    $journal->uid=$uid;
                    $journal->hookid=$hook['id'];
                    $journal->optype='on';
                    $journal->save();
                    $key=Key::where('hookid',$hook['id'])->get();
                    $key=$key[0];
                    $key->uid=null;
                    $key->state='onhook';
                    $key->modifieruuid=$uid;
                    $key->save();
                    $hook_update=Hook::find($hook['id']);
                    $hook_update->state="on";
                    $hook_update->modifieruuid=$uid;
                    $hook_update->save();
                }
            }
            
        });
        //关箱子
        sleep(2);
        $journal=new Journel();
        $journal->boxid=$keyboxid;
        $journal->uid=$uid;
        $journal->optype='close';
        $journal->save();
        return '22';

    }
}
