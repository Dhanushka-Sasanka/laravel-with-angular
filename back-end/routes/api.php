<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerComplainController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });



Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

       // create routes for Shop owener
 
    Route::post('login', [AuthController::class , 'login' ])->name('login');
    Route::post('register', [AuthController::class , 'register' ])->name('register');
    // Route::post('logout', 'AuthController@logout');
    // Route::post('refresh', 'AuthController@refresh');
    // Route::post('me', 'AuthController@me');

    // create routes for customer complain

    Route::post('cuscomplain', [CustomerComplainController::class , 'createCustomerComplain' ])->name('cuscomplain');



});