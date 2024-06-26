const Data = require("../Models/Data");

const showBalance = async (req, res) => {
  const { UTC_Time } = req.body;
  console.log(UTC_Time);

  if (!UTC_Time) {
    return res.status(400).send('Timestamp is required');
  }

  try {
    const transactions = await Data.find({
      UTC_Time: { $lte: new Date(UTC_Time) }
    });

    const balances = transactions.reduce((acc, transaction) => {
      const [asset] = transaction.Market.split('/');
      if (!acc[asset]) {
        acc[asset] = 0;
      }
      if (transaction.Operation === 'Buy') {
        acc[asset] += transaction.Buy_Sell_Amount;
      } else if (transaction.Operation === 'Sell') {
        acc[asset] -= transaction.Buy_Sell_Amount;
      }
      return acc;
    }, {});

    res.json(balances);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  showBalance
};
