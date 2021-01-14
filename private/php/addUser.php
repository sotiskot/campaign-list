<?php
require_once '../../vendor/campaignmonitor/createsend-php/csrest_subscribers.php';
include 'keys.php';

// Access the wrapper responsible for handling Subscribers
$wrap = new CS_REST_Subscribers(
    $LIST_ID,
    $API_KEY
);

// Add a new Subscriber with Email and Name
$result = $wrap->add(array(
    'EmailAddress' => $_POST['email'],
    'Name' => $_POST['name'],
    'ConsentToTrack' => 'yes',
    'Resubscribe' => true
));

if($result->http_status_code == 201)
{
    // If the code from the wrapper is a success one
    echo "Added User Successfully";
}else{
    // If the code is not a a success one
    echo "Make sure the email is correct";
}
?>