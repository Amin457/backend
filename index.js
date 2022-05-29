"use strict";

var soap = require('soap');

var url = 'http://197.13.7.115/Y2_DEMO/CustomerWcfService.svc?wsdl';
var headers= { 'Accept-Encoding': 'gzip,deflate' };
const args = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cegid.fr/Retail/1.0"><soapenv:Header/><soapenv:Body>   <ns:HelloWorld>      <!--Optional:-->      <ns:text>?</ns:text>      <!--Optional:-->      <ns:clientContext>         <!--Optional:-->         <ns:DatabaseId>RETAIL_TS</ns:DatabaseId>      </ns:clientContext>   </ns:HelloWorld></soapenv:Body></soapenv:Envelope>'

  soap.createClient(url,headers, function(err, client) {
    client.setSecurity(new soap.BasicAuthSecurity('RETAIL_TS\CEGID', 'CEGID'));
    console.log(client.describe());
      client.HelloWorld(args,function(err, result) {
          console.log(result);
         
      });
  });