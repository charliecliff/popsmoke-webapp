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

module.exports.name = function () {
  return "Name";
};