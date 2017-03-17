var requestParams = require('./da31PdfRequestParamaters');

module.exports = Object.freeze({
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

class Da31PdfFormat {

  formatNameBlock(formData) {
    var firstName = formData[requestParams.firstName];
    var middleInitial = formData[requestParams.middleInitial];
    var lastName = formData[requestParams.middleInitial];
    return "${lastName}, ${firstName} ${middleInitial}.";
  }

  fillOutPdfForm(formData) { 
    let formatter = da31Pdf.Da31PdfFormat();
    var formData = {};
    formData[da31Pdf.name] = formatNameBlock(formData);
    formData[da31Pdf.rank] = formData[requestParams.rank];
    formData[da31Pdf.ssn] = formData[requestParams.ssn];
    formData[da31Pdf.date] = "Testing Name";
    formData[da31Pdf.address] = "Testing Name";
    formData[da31Pdf.station] = "Testing Name";
    formData[da31Pdf.leave_ordinary] = "Testing Name";
    formData[da31Pdf.leave_emergency] = "Testing Name";
    formData[da31Pdf.leave_permissive] = "Testing Name";
    formData[da31Pdf.leave_other] = "Testing Name";
    formData[da31Pdf.leave_other_explanation] = "Testing Name";
    formData[da31Pdf.accrued_leave] = "Testing Name";
    formData[da31Pdf.advanced_leave] = "Testing Name";
    formData[da31Pdf.excess_leave] = "Testing Name";
    formData[da31Pdf.requested_leave] = "Testing Name";
    formData[da31Pdf.date_to] = "Testing Name";
    formData[da31Pdf.date_from] = "Testing Name";
    return formData;
  }
}
module.exports.Da31PdfFormat;