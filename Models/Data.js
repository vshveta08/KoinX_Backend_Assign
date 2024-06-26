const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    User_ID: {
      type: Number
    },
    UTC_Time: {
      type: Date
    },
    Operation: {
      type: String
    },
    Market: {
      type: String
    },
    Buy_Sell_Amount: {
      type: Number
    },
    Price: {
      type: Number
    }
});

module.exports = mongoose.model("Data", DataSchema, "tradeData");
