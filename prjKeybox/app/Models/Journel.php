<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journel extends Model
{
    use HasFactory;
    protected $table='journals';
    public $timestamps = true;
    const CREATED_AT = 'createtime';
    const UPDATED_AT = null;
    protected $dateFormat = 'U';
    protected $casts = [
        'attr' => 'array',
        
        
    ];
}
