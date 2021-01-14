<?php
require_once '../../vendor/campaignmonitor/createsend-php/csrest_lists.php';
include 'keys.php';

$wrap = new CS_REST_Lists(
    $LIST_ID,
    $API_KEY
);

$result = $wrap->get_active_subscribers();
if($result->http_status_code == 200)
{
    $users = [];
    foreach($result->response->Results as $result){
        $temp = '{ "name": "'.$result->Name.'", "email": "'.$result->EmailAddress.'"}';
        array_push($users, $temp);
    }

    print_r(json_encode($users));
}else{
    echo "User ID not found";
}
?>