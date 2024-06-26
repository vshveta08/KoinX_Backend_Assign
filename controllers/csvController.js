const csv = require("csvtojson");
const Data = require("../Models/Data");

const importCsv = async (req, res) => {
  try {
    var csvData = [];

    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        console.log(response);

        for (var i = 0; i < response.length; i++) {
          csvData.push({
            User_ID: response[i].User_ID,
            UTC_Time: response[i].UTC_Time,
            Operation: response[i].Operation,
            Market: response[i].Market,
            Buy_Sell_Amount: response[i].Buy_Sell_Amount,
            Price: response[i].Price
          })
        }
        await Data.insertMany(csvData);
      });
    res.send({ status: 200, success: true, msg: "csv imported..." });
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
};

module.exports = {
  importCsv
};