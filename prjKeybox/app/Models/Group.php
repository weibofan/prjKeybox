<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;
    protected $table = 'groups';
    public $timestamps = true;
    const CREATED_AT = 'createtime';
    const UPDATED_AT = 'modifytime';
    protected $casts = [
        'attr' => 'array'
    ];
    public function org()
    {
        return $this->hasOne('App\Models\Organization','id','orgid');
    }
    
}
