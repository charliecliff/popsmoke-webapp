var requestParams = require('./da31PdfRequestParamaters');

module.exports.constants = Object.freeze({
  control_number: "Control Number",
  name: "Name",
  rank: "Rank",
  ssn: "SSN",
  date: "Date",
  address: "Address",
  station: "ORGN",
  leave_ordinary: "Ordinary",
  leave_emergency: "Emergency",
  leave_permissive: "Permissive",
  leave_other: "Other",
  leave_other_explanation: "Other Explainations",
  accrued_leave: "Accrued",
  advanced_leave: "Advanced",
  excess_leave: "Excess",
  requested_leave: "Requested",
  date_to: "Date-To",
  date_from: "Date-From"
});

module.exports.Da31PdfFormat = function() {

  this.formatNameBlock = function(formData) {
    var firstName = formData[requestParams.firstName];
    var middleInitial = formData[requestParams.middleInitial];
    var lastName = formData[requestParams.middleInitial];
    return "${lastName}, ${firstName} ${middleInitial}.";
  };

  this.fillOutPdfForm = function(formData) { 
    var formData = {};
    formData[da31Pdf.constants.name] = this.formatNameBlock(formData);
    formData[da31Pdf.constants.rank] = formData[requestParams.rank];
    formData[da31Pdf.constants.ssn] = formData[requestParams.ssn];
    formData[da31Pdf.constants.date] = "Testing Name";
    formData[da31Pdf.constants.address] = "Testing Name";
    formData[da31Pdf.constants.station] = "Testing Name";
    formData[da31Pdf.constants.leave_ordinary] = "Testing Name";
    formData[da31Pdf.constants.leave_emergency] = "Testing Name";
    formData[da31Pdf.constants.leave_permissive] = "Testing Name";
    formData[da31Pdf.constants.leave_other] = "Testing Name";
    formData[da31Pdf.constants.leave_other_explanation] = "Testing Name";
    formData[da31Pdf.constants.accrued_leave] = "Testing Name";
    formData[da31Pdf.constants.advanced_leave] = "Testing Name";
    formData[da31Pdf.constants.excess_leave] = "Testing Name";
    formData[da31Pdf.constants.requested_leave] = "Testing Name";
    formData[da31Pdf.constants.date_to] = "Testing Name";
    formData[da31Pdf.constants.date_from] = "Testing Name";
    return formData;
  };
}