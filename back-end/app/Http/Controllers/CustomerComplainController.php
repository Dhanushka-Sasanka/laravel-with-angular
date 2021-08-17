<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CustomerComplainController extends Controller
{
    //

    public function createCustomerComplain(Request $request){

        CusotomerComplain::create([

            customerName => $request->customerName,
            customerAge => $request->customerAge,
            customerAddress => $request->customerAddress,
            problemDescription => $request->problemDescription,
            date => $request->date,
            problemStatus => $request->problemStatus,
            createdProblemCreatedBy => auth()->user()-id
        ]);
    }
}
