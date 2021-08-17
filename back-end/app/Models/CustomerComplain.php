<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerComplain extends Model
{
    use HasFactory;



     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'customerName',
        'customerAge',
        'customerAddress',
        'problemDescription',
        'date',
        'problemStatus',
    ];
}
