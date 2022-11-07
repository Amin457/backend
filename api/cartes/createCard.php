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
  $request->customerReference = $params[0];
  $request->storeId = $params[1];
  $request->clientContext = new StdClass();
  $request->clientContext->DatabaseId = $params[2];

  $resu = $client->CreateLoyaltyCard($request);
  print_r( json_encode($resu) );
?>