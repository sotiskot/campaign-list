<?php
require_once '../../vendor/campaignmonitor/createsend-php/csrest_subscribers.php';
include 'keys.php';

// Access the wrapper responsible for handling Subscribers
$wrap = new CS_REST_Subscribers(
    $LIST_ID,
    $API_KEY
);

// Delete Subscriber using only the mail which should be unique
$result = $wrap->unsubscribe($_POST['email']);
if($result->http_status_code == 200)
{
    // If the wrapper code is success
    echo "Deleted User Successfully";
}else{
    // If the code is not a a success one
    echo "Something went Wrong";
}
?>