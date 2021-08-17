<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerComplainsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_complains', function (Blueprint $table) {
            $table->id();
            $table->integer('customerAge');
            $table->string('customerAddress');
            $table->text('problemDescription');
            $table->string('problemStatus');
            $table->timestamp('date');
            $table->integer('createdProblemCreatedBy');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_complains');
    }
}
