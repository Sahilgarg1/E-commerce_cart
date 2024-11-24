const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');
app.use(cors());

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let currentCartTotal = parseFloat(req.query.cartTotal);
  let finalCartTotal = newItemPrice + currentCartTotal;
  res.send(finalCartTotal.toString());
})

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let finalCartValue;
  if (isMember) {
    //give 10% discount
    finalCartValue = cartTotal - (cartTotal / 10);
  } else {
    finalCartValue = cartTotal;
  }
  res.send(finalCartValue.toString());
})

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  //assuming 5% tax on all cart items
  let totalTax = (cartTotal * 5) / 100;
  res.send(totalTax.toString());
})

app.get('/estimate-delivery', (req, res) => {
  let deliveryMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let estimatedDaysForDelivery;
  if ((deliveryMethod = 'Standard')) {
    estimatedDaysForDelivery = distance / 50;
  } else if ((deliveryMethod = 'Express')) {
    estimatedDaysForDelivery = distance / 100;
  } else {
    res.send('Invalid input');
  }
  res.send(estimatedDaysForDelivery.toString());
})

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
})

app.get('/loyality-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyalityPoints = purchaseAmount * 2;
  res.send(loyalityPoints.toString());
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
