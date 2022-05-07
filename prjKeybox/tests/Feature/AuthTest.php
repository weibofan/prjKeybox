<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    public function testLogin(){
        $response = $this->post('/auth/login',['realname'=>'10195102506','password'=>'112358']);
        $response->assertStatus(200);
    }
}
