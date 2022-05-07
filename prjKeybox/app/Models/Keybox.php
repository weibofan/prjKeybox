<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Hook;
class Keybox extends Model
{
    use HasFactory;
    protected $table = 'keyboxes';
    public $timestamps = true;
    const CREATED_AT = 'createtime';
    const UPDATED_AT = 'modifytime';
    protected $dateFormat = 'U';
    protected $casts = [
        'attr' => 'array'
    ];
    public function hooks(){
        return $this->hasMany('App\Models\Hook','keyboxid','id');
    }

}
