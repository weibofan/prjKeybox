<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    use HasFactory;
    protected $table = 'keys';
    public $timestamps = true;
    const CREATED_AT = 'createtime';
    const UPDATED_AT = 'modifytime';
    protected $dateFormat = 'U';
    protected $casts = [
        'attr' => 'array',
        
        
    ];
    
}
