<?php
  /*
  ** Download PHP from http://windows.php.net/download/
  ** Copy in C:\php
  **
  ** Copy c:\php\php.ini-production into c:\php\php.ini and uncomment these lines (remove the semicolon) :
  ** ;extension_dir = "ext"
  ** ;extension=php_openssl.dll
  ** ;extension=php_soap.dll
  */

  // client proxy
  $url = "http://197.13.7.115/Y2_DEMO/CustomerWcfService.svc?wsdl";
  $client = new SoapClient( $url,
	array(
	  "location" => $url,
	  "login" => "RETAIL_TS\CEGID",
	  "password" => "CEGID"
	)
  );

  $params = explode(",", $argv[1]);

  // request complex type
  $request = new StdClass();

  $request->customerData = new StdClass();

  //$request->customerData->AddressData = new StdClass();
  //$request->customerData->AddressData->AddressLine1 = "23 rue foobar";
  //$request->customerData->AddressData->City = "Paris";
  //$request->customerData->AddressData->CountryId = "FRA";
  //$request->customerData->AddressData->CountryIdType = "Internal";
  //$request->customerData->AddressData->Nata = false;
 // $request->customerData->AddressData->ZipCode = "42000";

  $request->customerData->EmailData = new StdClass();
 // $request->customerData->EmailData->EmailingAccepted = false;

  $request->customerData->FirstName = $params[0];
 // $request->customerData->IsCompany = false;
  $request->customerData->LastName = $params[1];
 // $request->customerData->TitleId = "MR";

  // Create some UserDefinedBoolean...
  //$UserDefinedBoolean1 = new StdClass();
  //$UserDefinedBoolean1->Id = 1;
  //$UserDefinedBoolean1->Value = true;
  //$UserDefinedBoolean2 = new StdClass();
  //$UserDefinedBoolean2->Id = 2;
  //$UserDefinedBoolean2->Value = false;
  //$UserDefinedBoolean3 = new StdClass();
  //$UserDefinedBoolean3->Id = 3;
  //$UserDefinedBoolean3->Value = true;

  // ...And create the UserDefinedBooleans array with UserDefinedBoolean objects
 // $request->customerData->UserDefinedBooleans = array($UserDefinedBoolean1, $UserDefinedBoolean2, $UserDefinedBoolean3);

  //$UserDefinedDate1 = new StdClass();
  //$UserDefinedDate1->Id = 1;
  
  // Create the Datetime object
 // $date = new Datetime(null, new DateTimeZone("UTC"));
  //$date->SetDate(1970, 01, 01); // SetDate(Year, Month, Day)
  //$date->SetTime(18, 00, 00); // SetTime(Hour, Minute, Second)
  // Convert the object to a string in order to assigned it to Value
  //$UserDefinedDate1->Value = $date->format("Y-m-d\TH:i:s");

  //$request->customerData->UserDefinedDates = array($UserDefinedDate1);

  //$UserDefinedText1 = new StdClass();
  //$UserDefinedText1->Id = 1;
  //$UserDefinedText1->Value = "some text...";
  //$UserDefinedText2 = new StdClass();
  //$UserDefinedText2->Id = 2;
  //$UserDefinedText2->Value = "漢字"; // non ascii characters works perfectly
  //$request->customerData->UserDefinedTexts = array($UserDefinedText1, $UserDefinedText2);

 // $UserDefinedValue1 = new StdClass();
 // $UserDefinedValue1->Id = 1;
 // $UserDefinedValue1->Value = 0;
  //$request->customerData->UserDefinedValues = array($UserDefinedValue1);

 // $request->customerData->UsualStoreId = "302";

  //$request->customerData->BirthDateData = new StdClass();
  //$request->customerData->BirthDateData->BirthDateDay = 1;
  //$request->customerData->BirthDateData->BirthDateMonth = 1;
  //$request->customerData->BirthDateData->BirthDateYear = 1970;

  //$request->customerData->CurrencyId = "EUR";
  //$request->customerData->LanguageId = "FRA";
  //$request->customerData->NationalityId = "FRA";

  //$request->customerData->OptinAlternativeEmail = "AskCustomer";
  //$request->customerData->OptinEmail = "AskCustomer";
  //$request->customerData->OptinMobile = "AskCustomer";
  //$request->customerData->OptinOfficePhone = "AskCustomer";
  //$request->customerData->OptinPostal = "AskCustomer";

  //$request->customerData->Sex = "M";
  //$request->customerData->ShortName = "DOE";
  //$request->customerData->VATSystem = "FRA";
  //$request->customerData->ValidAlternativeEmail = true;
  //$request->customerData->ValidEmail = true;
  //$request->customerData->ValidMobile = true;
  //$request->customerData->ValidOfficePhone = true;

  $request->clientContext = new StdClass();
  $request->clientContext->DatabaseId = $params[2];
  
  // call
  $resu = $client->AddNewCustomer($request);
  print_r(json_encode($resu) );
?>