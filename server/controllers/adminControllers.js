import { countryToAlpha2, countryToAlpha3 } from "country-to-iso";
import moment from "moment";
import productModel from "../models/product.js";
import userModel from "../models/user.js";
import orderModel from "../models/order.js";
import contactSchemaModel from "../models/contact.js";

// Save a product
export const saveProduct = async (req, res) => {
  const newProduct = await new productModel({
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    quantity: req.body.quantity,
  });
  const data = await newProduct.save();
  res.send({ message: "Upload successfully" });
};

// Get a product
export const getProduct = async (req, res) => {
  const productData = await productModel.findById(req.params.productId);
  res.send(JSON.stringify(productData));
};

// Delete a product
export const deleteProduct = async (req, res) => {
  await productModel.findByIdAndDelete(req.params.productId);
  res.send({
    message: "Product deleted successfully",
    id: req.params.productId,
  });
};

// Edit a product

export const editProduct = async (req, res) => {
  const preImage = req.body.previewImage;
  const updatedProduct = await productModel.findByIdAndUpdate(
    req.params.productId,
    {
      $set: {
        ...req.body,
        image: preImage,
      },
    },
    { new: true }
  );
  res.send(
    JSON.stringify({
      data: updatedProduct,
      message: "Product updated successfully",
    })
  );
};

// Get geo data

export const getGeoData = async (req, res) => {
  const users = await userModel.find();

  const locations = users.reduce((acc, { country }) => {
    const countryISO2 = countryToAlpha2(country);
    const countryISO3 = countryToAlpha3(countryISO2);

    if (!acc[countryISO3]) {
      acc[countryISO3] = 0;
    }
    acc[countryISO3]++;
    return acc;
  }, {});

  const formatedLoactions = Object.entries(locations).map(
    ([country, count]) => {
      return { id: country, value: count };
    }
  );
  res.send(JSON.stringify(formatedLoactions));
};

// Get customer data

export const getCustomers = async (req, res) => {
  const data = await userModel.find().select("-password -confirmPassword");
  const customers = data.filter(
    ({ email }) => email !== "ram5sasanga@gmail.com"
  );
  res.send(JSON.stringify(customers));
};

// Get transaction data

export const getTransactions = async (req, res) => {
  const data = await orderModel
    .find()
    .select("_id userId createdAt products total");
  res.send(JSON.stringify(data));
};

// Current month and previous month customers

export const getUserStatistics = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .format("YYYY-MM-DD HH:mm:ss");

  const users = await userModel.aggregate([
    {
      $match: { createdAt: { $gte: new Date(previousMonth) } },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);

  res.send(JSON.stringify(users));
};

// Current month and previous month orders

export const getOrderStatistics = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .format("YYYY-MM-DD HH:mm:ss");

  const orders = await orderModel.aggregate([
    {
      $match: { createdAt: { $gte: new Date(previousMonth) } },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);
  res.send(JSON.stringify(orders));
};

// Current month and previous month income

export const getIncomeStatistics = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .format("YYYY-MM-DD HH:mm:ss");

  const income = await orderModel.aggregate([
    {
      $match: { createdAt: { $gte: new Date(previousMonth) } },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$total",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  res.send(JSON.stringify(income));
};

// Last 7 days income

export const getIncomeLast7Days = async (req, res) => {
  const last7Days = moment()
    .day(moment().day() - 7)
    .format("YYYY-MM-DD HH:mm:ss");

  const incomeLast7Days = await orderModel.aggregate([
    {
      $match: { createdAt: { $gte: new Date(last7Days) } },
    },
    {
      $project: {
        day: { $dayOfWeek: "$createdAt" },
        sales: "$total",
        unit: {
          $reduce: {
            input: "$products",
            initialValue: 0,
            in: {
              $sum: ["$$value", "$$this.quantity"],
            },
          },
        },
      },
    },
    {
      $group: {
        _id: "$day",
        total: { $sum: "$sales" },
        units: { $sum: "$unit" },
      },
    },
  ]);

  res.send(JSON.stringify(incomeLast7Days));
};

// Total orders

export const getTotalOrders = async (req, res) => {
  const totalOrders = await orderModel.find({});
  res.send(JSON.stringify(totalOrders.length));
};

// Total earnings

export const getTotalEarnings = async (req, res) => {
  const totalEarnings = await orderModel.aggregate([
    {
      $project: {
        sales: "$total",
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$sales" },
      },
    },
  ]);

  res.send(totalEarnings);
};

// Last 30 days income

export const getIncomeLast30Days = async (req, res) => {
  const last30Days = moment()
    .day(moment().day() - 30)
    .format("YYYY-MM-DD HH:mm:ss");

  const incomeLast30Days = await orderModel.aggregate([
    {
      $match: { createdAt: { $gte: new Date(last30Days) } },
    },
    {
      $project: {
        day: { $dayOfMonth: "$createdAt" },
        sales: "$total",
      },
    },
    {
      $group: {
        _id: "$day",
        total: { $sum: "$sales" },
      },
    },
  ]);

  res.send(JSON.stringify(incomeLast30Days));
};

// Last 30 days customers

export const getCustomersLast30Days = async (req, res) => {
  const last30Days = moment()
    .day(moment().day() - 30)
    .format("YYYY-MM-DD HH:mm:ss");

  const customersLast30Days = await userModel.aggregate([
    {
      $match: { createdAt: { $gte: new Date(last30Days) } },
    },
    {
      $project: {
        day: { $dayOfMonth: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$day",
        total: { $sum: 1 }
      },
    },
  ]);

  res.send(JSON.stringify(customersLast30Days));
};

// Last 30 days orders

export const getOrdersLast30Days = async (req, res) => {
  const last30Days = moment()
    .day(moment().day() - 30)
    .format("YYYY-MM-DD HH:mm:ss");

  const ordersLast30Days = await orderModel.aggregate([
    {
      $match: { createdAt: { $gte: new Date(last30Days) } },
    },
    {
      $project: {
        day: { $dayOfMonth: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$day",
        total: { $sum: 1 }
      },
    },
  ]);

  res.send(JSON.stringify(ordersLast30Days));
};

// Get orders

export const getOrders = async (req, res) => {
  const data = await orderModel
    .find()
    .select("_id total shipping delivery_status createdAt");
    console.log(data);
  res.send(JSON.stringify(data));
};

// Update a order status

export const updateOrder = async (req, res) => {
  const order = await orderModel.findByIdAndUpdate(
    req.params.orderId,
    {
      $set: {
        ...req.body,
      },
    },
    { new: true }
  );
  res.send(
    JSON.stringify({
      data: order,
      message: "Status updated successfully",
    })
  );
};

// Get contacts
export const getContacts = async (req, res) => {
  const contacts = await contactSchemaModel.find()
  res.send(JSON.stringify(contacts));
}

// Delete a contact
export const deleteContact = async (req, res) => {
  await contactSchemaModel.findByIdAndDelete(req.params.emailId);
  res.send({
    message: "Email deleted successfully",
    id: req.params.emailId,
  });
};