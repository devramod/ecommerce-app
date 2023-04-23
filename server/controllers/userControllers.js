import orderModel from "../models/order.js";

export const getOrderDetails = async (req, res) => {
  const orders = await orderModel.aggregate([
    {
      $match: { userId: { $eq: req.params.userId } },
    },
  ]);

  res.send(JSON.stringify(orders));
};
