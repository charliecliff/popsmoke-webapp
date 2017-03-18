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
   
   constructor() {

   }

  formatNameBlock(formData) {
    var firstName = formData[requestParams.firstName];
    var middleInitial = formData[requestParams.middleInitial];
    var lastName = formData[requestParams.middleInitial];
    return "${lastName}, ${firstName} ${middleInitial}.";
  }

  fillOutPdfForm(formData) { 
    var formData = {};
    // formData[name] = this.formatNameBlock(formData);
    // formData[rank] = formData[requestParams.rank];
    // formData[ssn] = formData[requestParams.ssn];
    formData[date] = "Testing Name";
    formData[address] = "Testing Name";
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