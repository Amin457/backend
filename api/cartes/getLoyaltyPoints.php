<?php
  $url = "http://192.168.168.200/Y2_TEST/LoyaltyWcfService.svc?wsdl";

  $client = new SoapClient( $url,
	array(
	  "location" => $url,
    "login" => "DEMO20\STOCK",
	  "password" => "STOCK1"
	)
  );
  $params = explode(",", $argv[1]);

  $request = new StdClass();
  $request->loyaltyCardId = $params[0];
  $request->clientContext = new StdClass();
  $request->clientContext->DatabaseId = $params[1];

  $resu = $client->GetAvailableLoyaltyPoints($request);
  print_r( json_encode($resu) );
?>
