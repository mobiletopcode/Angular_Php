<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

$app = new \Slim\App;
$app->get('/feedback', function (Request $request, Response $response) {
    $offset = isset($_REQUEST['offset']) ? $_REQUEST['offset'] : 0;
    $limit = isset($_REQUEST['limit']) ? $_REQUEST['limit'] : 10;
    $newResp = $response
        ->withHeader('Content-type', 'application/json')
        ->withAddedHeader('Access-Control-Allow-Origin', '*');

    $str = file_get_contents("http://test.localfeedbackloop.com/api?apiKey=61067f81f8cf7e4a1f673cd230216112&noOfReviews={$limit}&internal=1&yelp=1&google=1&offset={$offset}&threshold=1");
    $data = json_decode($str);
    return $newResp->withJson($data ? $data : ['error' => 'cannot get the data']);
});
$app->run();