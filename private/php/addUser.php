<?php
require_once '../../vendor/campaignmonitor/createsend-php/csrest_subscribers.php';
include 'keys.php';

$wrap = new CS_REST_Subscribers(
    $LIST_ID,
    $API_KEY
);

$result = $wrap->add(array(
    'EmailAddress' => $_POST['email'],
    'Name' => $_POST['name'],
    'ConsentToTrack' => 'yes',
    'Resubscribe' => true
));

if($result->http_status_code == 201)
{
    echo "Added User Successfully";
}else{
    echo "Something went Wrong";
}
?>