<?php
  // client proxy
  $url = "http://192.168.168.200/Y2_TEST/CustomerWcfService.svc?wsdl";
  $client = new SoapClient( $url,
	array(
	  "location" => $url,
    "login" => "DEMO20\STOCK",
	  "password" => "STOCK1"
	)
  );

  $params = explode(",", $argv[1]);

  $request = new StdClass();
  $request->customerData = new StdClass();

   $request->customerData->AddressData = new StdClass();
   $request->customerData->AddressData->AddressLine1 = "TUNIS";
   $request->customerData->AddressData->City = "TUNIS";
   $request->customerData->AddressData->CountryId = "TUN";
   $request->customerData->AddressData->CountryIdType = "Internal";
   $request->customerData->AddressData->ZipCode = "3018";



  $request->customerData->FirstName = $params[0];
  $request->customerData->IsCompany = false;
  $request->customerData->LastName = $params[1];


  $request->customerData->EmailData = new StdClass();
  $request->customerData->EmailData->EmailingAccepted = true;
  
  $request->customerData->EmailData->Email = $params[2];
  $request->customerData->UsualStoreId = $params[3];

  $request->customerData->BirthDateData = new StdClass();
  
  $request->customerData->BirthDateData->BirthDateDay =(int)$params[4];
  $request->customerData->BirthDateData->BirthDateMonth =(int)$params[5];
  $request->customerData->BirthDateData->BirthDateYear =(int)$params[6];
  

  $request->customerData->CurrencyId = "TND";
  $request->customerData->NationalityId = "TUN";


  $request->customerData->ValidEmail = true;
  $request->customerData->ValidMobile = true;
  $request->customerData->ValidOfficePhone = true;

  $request->customerData->CustomerId = $params[7];

  $request->clientContext = new StdClass();
  $request->clientContext->DatabaseId = $params[8];
  
  // call
  $resu = $client->AddNewCustomer($request);
  print_r(json_encode($resu) );
?>