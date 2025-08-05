// services/purchaseService.js

const Purchase = require("../models/Purchase");
const SupplierPayment = require("../models/SupplierPayment");
const Stock = require("../models/Stock");
const StockBatch = require("../models/StockBatch");

async function createPurchase(data) {
  const purchase = await Purchase.create(data);
  const totalCost = parseFloat(purchase.quantity) * parseFloat(purchase.rate);

  await SupplierPayment.create({
    supplier: purchase.supplier,
    purchase: purchase._id,
    invoice_id: purchase.invoice_id,
    amount: totalCost,
  });

  const existingStock = await Stock.findOne({
    product: purchase.product,
    supplier: purchase.supplier,
  });

  if (existingStock) {
    existingStock.quantity += purchase.quantity;
    existingStock.rate = purchase.rate;
    await existingStock.save();
  } else {
    await Stock.create({
      product: purchase.product,
      supplier: purchase.supplier,
      quantity: purchase.quantity,
      rate: purchase.rate,
    });
  }

  await StockBatch.create({
    supplier: purchase.supplier,
    product: purchase.product,
    quantity: purchase.quantity,
    rate: purchase.rate,
    total_amount: totalCost,
    invoice_id: purchase.invoice_id
  });

  return purchase;
}

module.exports = { createPurchase };
