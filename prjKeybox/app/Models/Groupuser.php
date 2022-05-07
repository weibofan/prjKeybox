<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupuser extends Model
{
    use HasFactory;
    protected $table = 'groupusers';
    public $timestamps = true;
    const CREATED_AT = 'createtime';
    const UPDATED_AT = 'modifytime';
    protected $casts = [
        'attr' => 'array'
    ];
    public function group()
    {
        return $this->hasOne('App\Models\Group','id','groupid');
    }
}
