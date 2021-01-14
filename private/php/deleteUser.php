<?php
require_once '../../vendor/campaignmonitor/createsend-php/csrest_subscribers.php';
include 'keys.php';

$wrap = new CS_REST_Subscribers(
    $LIST_ID,
    $API_KEY
);

$result = $wrap->unsubscribe($_POST['email']);
if($result->http_status_code == 200)
{
    echo "Deleted User Successfully";
}else{
    echo "Something went Wrong";
}
?>