<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hook extends Model
{
    use HasFactory;
    protected $table = 'hooks';
    public $timestamps = true;
    const CREATED_AT = 'createtime';
    const UPDATED_AT = 'modifytime';
    protected $dateFormat = 'U';
    protected $casts = [
        'attr' => 'array'
    ];
    public function key(){
        return $this->hasOne('App\Models\Key','hookid','id');
    }
}
