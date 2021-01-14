<?php
require_once '../../vendor/campaignmonitor/createsend-php/csrest_lists.php';
include 'keys.php';

// Access the wrapper responsible for handling lists
$wrap = new CS_REST_Lists(
    $LIST_ID,
    $API_KEY
);

// get active subscribers from list using the wrapper
$result = $wrap->get_active_subscribers();

if($result->http_status_code == 200)
{
    /**
     * if the wrapper gives me a success code then create a JSON string
     */
    $users = [];
    foreach($result->response->Results as $result){
        $temp = '{ "name": "'.$result->Name.'", "email": "'.$result->EmailAddress.'"}';
        array_push($users, $temp);
    }

    // return a json string containing the Subscribers e.g. {{"name"="1", "mail"="1"},{"name"="2", "mail"="2"}}
    print_r(json_encode($users));
}else{
    // in case the code isn't a success one, return a message.
    echo "Subscribers ID not found";
}
?>