exports.adminLogin = (req, res) => {
  console.log(req.body);
  res.send("Admin");
};
exports.ngoLogin = (req, res) => {
  console.log(req.body);
  res.send("Ngo");
};
exports.restLogin = (req, res) => {
  console.log(req.body);
  res.send("Restaurent");
};
exports.guestReg = (req, res) => {
  console.log(req.body);
  res.send("Donor");
};
