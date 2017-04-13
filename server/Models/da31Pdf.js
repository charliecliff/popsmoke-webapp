var REQ_PARAMS = require('./da31PdfRequestParamaters');

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
    var firstName = requestBody[REQ_PARAMS.FIRST_NAME];
    var middleInitial = requestBody[REQ_PARAMS.MIDDLE_INITIAL];
    var lastName = requestBody[REQ_PARAMS.LAST_NAME];
    return lastName + ", "+ firstName + middleInitial + ".";
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
    return street + "\n"+ city + ", " + state + " " + zip + "\n";
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
    let leaveType = requestBody[REQ_PARAMS.leaveType]
    if (leaveType == REQ_PARAMS.LEAVE_ORDINARY) {
      formData[leave_ordinary] = "Yes";
    }
    else if (leaveType == REQ_PARAMS.LEAVE_EMERGENCY) {
      formData[leave_emergency] = "Yes";
    }
    else if (leaveType == REQ_PARAMS.LEAVE_PERMISSIVE) {
      formData[leave_permissive] = "Yes";
    }
    else if (leaveType == REQ_PARAMS.LEAVE_TDY) {
    }
    else if (leaveType == REQ_PARAMS.LEAVE_OTHER) {
      formData[leave_other] = "Yes";
    }
    formData[leave_other_explanation] = requestBody[REQ_PARAMS.leaveTypeExplanation];
  }

  fillOutPdfForm(requestBody) { 
    var formData = {};
    formData[name] = this.formatNameBlock(requestBody);
    formData[rank] = requestBody[REQ_PARAMS.rank];
    formData[ssn] = this.formatSocialSecurityNumber(requestBody);
    formData[address] = this.formatDestinationAddress(requestBody);
    formData[station] = this.formatPost(requestBody);
    formData[accrued_leave] = requestBody[REQ_PARAMS.accruedLeave];
    formData[advanced_leave] = requestBody[REQ_PARAMS.advancedLeave];
    formData[excess_leave] = requestBody[REQ_PARAMS.excessLeave];
    formData[requested_leave] = requestBody[REQ_PARAMS.requestedLeave];
    
    // formData[date] = "Testing Name";
    // formData[date_to] = "Testing Name";
    // formData[date_from] = "Testing Name";
    
    // this.appendLeaveTypeSelection(requestBody, formData);

    return formData;
  }
}