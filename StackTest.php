<?php


class StackTest extends PHPUnit\Framework\TestCase
{
    protected $client;

    protected function setUp(): void
    {
        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost:80/index.php']);// the port is 80
    }

    public function testGet_UserList()
    {
        $response = $this->client->request('GET', 'index.php/user/list');
        $this->assertEquals(200, $response->getStatusCode()); //responds with a 200 response code
    }

    public function testPost_CreateUser()
    {
        $response = $this->client->request('POST', 'index.php/user/create', [
            'json' => [
                'username' => 'newusername',
                'password' => 'newpassword123'
            ]
        ]);
        $this->assertEquals(201, $response->getStatusCode()); //responds with a 201 response code.
    }

    public function testPost_LoginUser()
    {
        $response = $this->client->request('POST', 'index.php/user/check', [
            'json' => [
                'username' => '123',
                'password' => '1234567890'
            ]
        ]);
        $this->assertEquals(201, $response->getStatusCode());
    }

    public function testPost_FailedLogin()
    {
        $response = $this->client->request('POST', 'index.php/user/check', [
            'json' => [
                'username' => 'wronguser',
                'password' => 'wrongpass'
            ]
        ]);
        $this->assertEquals(201, $response->getStatusCode());
    }

    public function testPost_NewSong()
    {
        $response = $this->client->request('POST', 'index.php/user/add', [
            'json' => [
                'username' => '123',
                'artist' => 'newartist',
                'song' => 'newsong',
                'rating' => 5
            ]
        ]);
        $this->assertEquals(201, $response->getStatusCode());
    }

    public function testPost_UpdateSong()
    {
        $response = $this->client->request('POST', 'index.php/user/update', [
            'json' => [
                'id' => 1,
                'artist' => 'updatedartist',
                'song' => 'updatedsong',
                'rating' => 4
            ]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function testPost_DeleteSong()
    {
        $response = $this->client->request('POST', 'index.php/user/delete', [
            'json' => [
                'id' => 1
            ]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
    }
}
?>
