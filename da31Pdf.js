var requestParams = require('./da31PdfRequestParamaters');

let control_number = "Control Number";
let name = "Name";
let rank = "Rank";
let ssn = "SSN";
let date = "Date";
let address = "Address";
let station = "ORGN";
let leave_ordinary = "Ordinary";
let leave_emergency = "Emergency";
let leave_permissive = "Permissive";
let leave_other = "Other";
let leave_other_explanation = "Other Explainations";
let accrued_leave = "Accrued";
let advanced_leave = "Advanced";
let excess_leave = "Excess";
let requested_leave = "Requested";
let date_to = "Date-To";
let date_from = "Date-From";

module.exports.Da31PdfFormat = class Da31PdfFormat {
   
   constructor() {}

  formatNameBlock(requestBody) {
    var firstName = requestBody[requestParams.firstName];
    var middleInitial = requestBody[requestParams.middleInitial];
    var lastName = requestBody[requestParams.lastName];
    return lastName + ", "+ firstName + middleInitial + ".";
  }

  formatSocialSecurityNumber(requestBody) {
    var ssn = requestBody[requestParams.ssn];
    return "xxx-xx-" + ssn;
  }

  formatDestinationAddress(requestBody) {
    var destinationData = requestBody[requestParams.destination];
    var street = requestBody[requestParams.street];
    var city = requestBody[requestParams.city];
    var state = requestBody[requestParams.state];
    var zip = requestBody[requestParams.zip];
    return street + "\n"+ city + ", " + state + " " + zip + "\n";
  }

  fillOutPdfForm(requestBody) { 
    var formData = {};
    formData[name] = this.formatNameBlock(requestBody);
    formData[rank] = requestBody[requestParams.rank];
    formData[ssn] = this.formatSocialSecurityNumber(requestBody);
    formData[date] = "Testing Name";
    formData[address] = this.formatDestinationAddress(requestBody);
    formData[station] = "Testing Name";
    formData[leave_ordinary] = "Testing Name";
    formData[leave_emergency] = "Testing Name";
    formData[leave_permissive] = "Testing Name";
    formData[leave_other] = "Testing Name";
    formData[leave_other_explanation] = "Testing Name";
    formData[accrued_leave] = "Testing Name";
    formData[advanced_leave] = "Testing Name";
    formData[excess_leave] = "Testing Name";
    formData[requested_leave] = "Testing Name";
    formData[date_to] = "Testing Name";
    formData[date_from] = "Testing Name";
    return formData;
  }
}