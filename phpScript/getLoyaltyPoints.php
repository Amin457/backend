<?php
  $url = "http://197.13.7.115/Y2_DEMO/LoyaltyWcfService.svc?wsdl";

  $client = new SoapClient( $url,
	array(
	  "location" => $url,
	  "login" => "RETAIL_TS\CEGID",
	  "password" => "CEGID"
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
