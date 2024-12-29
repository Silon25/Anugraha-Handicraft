import mongoose from 'mongoose';

const salesReportSchema = new mongoose.Schema({
  reportDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  totalRevenue: {
    type: Number,
    required: true,
  },
  totalOrders: {
    type: Number,
    required: true,
  },
  averageOrderValue: {
    type: Number,
    required: true,
  },
  topSellingProducts: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product', // Reference to the Product model
      required: true,
    },
    productName: { type: String },
    quantitySold: { type: Number, required: true },
    totalSales: { type: Number, required: true },
  }],
  salesByCategory: [{
    category: { type: String },
    totalSales: { type: Number },
  }],
  salesBySubCategory: [{
    subCategory: { type: String },
    totalSales: { type: Number },
  }],
  salesByRegion: [{
    region: { type: String },
    totalSales: { type: Number },
  }],
  reportType: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    required: true,
  },
});

const SalesReport = mongoose.models.salesReport || mongoose.model('salesReport', salesReportSchema);

export default SalesReport;
    