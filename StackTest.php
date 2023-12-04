<?php


class UserApiTest extends PHPUnit\Framework\TestCase
{
    protected $client;

    protected function setUp(): void
    {
        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost:3306/index.php']);
    }

    public function testGet_UserList()
    {
        $response = $this->client->request('GET', 'index.php/user/list');
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function testPost_CreateUser()
    {
        $response = $this->client->request('POST', 'index.php/user/create', [
            'json' => [
                'username' => 'newuser',
                'password' => 'newpass'
            ]
        ]);
        $this->assertEquals(201, $response->getStatusCode());
    }

    public function testPost_LoginUser()
    {
        $response = $this->client->request('POST', 'index.php/user/check', [
            'json' => [
                'username' => 'existinguser',
                'password' => 'correctpass'
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
                'username' => 'user',
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
