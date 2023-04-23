import Stripe from "stripe";

import userModel from "../models/user.js";
import productModel from "../models/product.js";
import orderModel from "../models/order.js";
import contactSchemaModel from "../models/contact.js";

// Register user
export const saveUser = async (req, res) => {
  const { email } = req.body;

  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        res.send({ message: "Email already registered", alert: false });
      } else {
        const newUser = new userModel({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          phone: req.body.phone,
          occupation: req.body.occupation,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
          image: req.body.image,
        });
        const save = newUser.save();
        res.send({ message: "Suceessfully registered", alert: true });
      }
    })
    .catch((err) => console.log("Error: ", err));
};

// Login user
export const logUser = async (req, res) => {
  const { email, password } = req.body;

  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        if (result.password === password) {
          const dataSend = {
            _id: result._id,
            fname: result.fname,
            lname: result.lname,
            email: result.email,
            city: result.city,
            state: result.state,
            country: result.country,
            phone: result.phone,
            occupation: result.occupation,
            image: result.image,
          };
          res.send({
            message: "Logged in successfully",
            alert: true,
            data: dataSend,
          });
        } else {
          res.send({ message: "Wrong password", alert: false });
        }
      } else {
        res.send({ message: "Wrong email", alert: false });
      }
    })
    .catch((err) => console.log("Error: ", err));
};

// Update user
export const updateUser = async (req, res) => {
  const update = await userModel.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        ...req.body,
      },
    },
    { new: true }
  );

  res.send(
    JSON.stringify({
      data: update,
      message: "Profile updated successfully",
    })
  );
};

// Update password
export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const update = await userModel.updateOne({ _id: req.params.userId }, [
    { $set: { password: newPassword, confirmPassword: newPassword } },
  ]);
  res.send(
    JSON.stringify({
      message: "Password updated successfully",
    })
  );
};

// Delete user
export const deleteUser = async (req, res) => {
  await userModel.findByIdAndDelete(req.params.userId);
  res.send({
    message: "Account deleted successfully",
  });
}

// Get product
export const getProduct = async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
};

// Contact
export const contact = async (req, res) => {
  const newContact = new contactSchemaModel({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  const save = newContact.save();
  res.send({ message: "Suceessfully send the message" });
};

// Stripe
const stripe = new Stripe(
  "sk_test_51MtplaGhcHbzWbPl4oSZrUE5mJGTCPA4IlZqqtGJ24MSYCIaJQEiuqqbWuyJnpX8XnHWFcV4Vh8RgBHAHd99WwPR00E7UximML"
);

export const createCheckoutSession = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.products),
    },
  });

  const line_items = req.body.products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.description,
          metadata: {
            id: product._id,
          },
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    shipping_address_collection: { allowed_countries: ["US", "CA", "AU", "LK"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 1500, currency: "usd" },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 1 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.send({ url: session.url });
};

// Order
const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);
  const newOrder = await new orderModel({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: Items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });
  const saveData = await newOrder.save();
  // email to customer
  // console.log(saveData);
};

// Stripe webhook
let endpointSecret;

// const endpointSecret = "whsec_a2247dd1a622797f77ba38fdf70258cf279276f9fd1c54bde779b5a72bea1b10";

export const order = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        createOrder(customer, data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};
