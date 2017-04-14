var REQ_PARAMS = require('./da31PdfRequestParamaters');

// PDF Template Field Names
let control_number    = "Control Number";
let name              = "Name";
let rank              = "Rank";
let ssn               = "SSN";
let date              = "Date";
let address           = "Address";
let station           = "ORGN";
let leave_ordinary    = "Ordinary";
let leave_emergency   = "Emergency";
let leave_permissive  = "Permissive";
let leave_other       = "Other";
let leave_explanation = "Other Explainations";
let accrued_leave     = "Accrued";
let advanced_leave    = "Advanced";
let excess_leave      = "Excess";
let requested_leave   = "Requested";
let date_to           = "Date-To";
let date_from         = "Date-From";

module.exports.Da31PdfFormat = class Da31PdfFormat {
   
  constructor() { }

  formatNameBlock(requestBody) {
    var firstName = requestBody[REQ_PARAMS.FIRST_NAME];
    var middleInitial = requestBody[REQ_PARAMS.MIDDLE_INITIAL];
    var lastName = requestBody[REQ_PARAMS.LAST_NAME];
    return lastName + ", "+ firstName + " " + middleInitial + ".";
  }

  formatSocialSecurityNumber(requestBody) {
    var ssn = requestBody[REQ_PARAMS.SSN];
    return "xxx-xx-" + ssn;
  }

  formatDestinationAddress(requestBody) {
    var street = requestBody[REQ_PARAMS.STREET];
    var city = requestBody[REQ_PARAMS.CITY];
    var state = requestBody[REQ_PARAMS.STATE];
    var zip = requestBody[REQ_PARAMS.ZIP];
    var phone = requestBody[REQ_PARAMS.PHONE];
    return street + "\n"+ city + ", " + state + " " + zip + "\n" + phone;
  }

  formatPost(requestBody) {
    var platoon = requestBody[REQ_PARAMS.PLATOON]
    var company = requestBody[REQ_PARAMS.COMPANY]
    var battalion = requestBody[REQ_PARAMS.BATTALION]
    var brigade = requestBody[REQ_PARAMS.BRIGADE]
    var division = requestBody[REQ_PARAMS.DIVISION]
    var post = requestBody[REQ_PARAMS.POST]
    var zip = requestBody[REQ_PARAMS.STATION_ZIP]
    var phone = requestBody[REQ_PARAMS.STATION_PHONE]
    return platoon + ", " + company + ", " + battalion + "\n" + brigade + ", " + 
      division + "\n" + post + " " + zip + ", " + phone;
  }

  appendLeaveTypeSelection(requestBody, formData) {    
    let leaveType = requestBody[REQ_PARAMS.TYPE_OF_LEAVE]
    if (leaveType == REQ_PARAMS.LEAVE_ORDINARY) {
      formData[leave_ordinary] = "Yes";
    }
    else if (leaveType == REQ_PARAMS.LEAVE_EMERGENCY) {
      formData[leave_emergency] = "Yes";
    }
    else if (leaveType == REQ_PARAMS.LEAVE_PERMISSIVE) {
      formData[leave_permissive] = "Yes";
    }
    else if (leaveType == REQ_PARAMS.LEAVE_OTHER) {
      formData[leave_other] = "Yes";
    }
    formData[leave_explanation] = "N/A";
    let explanation = requestBody[REQ_PARAMS.LEAVE_EXPLANATION]
    if (explanation != undefined) {
      formData[leave_explanation] = explanation;
    }
  }

  fillOutPdfForm(requestBody) { 
    var formData = {};
    formData[name]    = this.formatNameBlock(requestBody);
    formData[ssn]     = this.formatSocialSecurityNumber(requestBody);
    formData[address] = this.formatDestinationAddress(requestBody);
    formData[station] = this.formatPost(requestBody);
    formData[rank]    = requestBody[REQ_PARAMS.RANK];
    formData[accrued_leave]   = requestBody[REQ_PARAMS.ACCRUED_LEAVE];
    formData[advanced_leave]  = requestBody[REQ_PARAMS.ADVANCED_LEAVE];
    formData[excess_leave]    = requestBody[REQ_PARAMS.EXCESS_LEAVE];
    formData[requested_leave] = requestBody[REQ_PARAMS.REQUESTED_LEAVE];
    // formData[date_to]         = requestBody[REQ_PARAMS.START_DATE];
    // formData[date_from]       = requestBody[REQ_PARAMS.END_DATE];
    this.appendLeaveTypeSelection(requestBody, formData);
    return formData;
  }
}