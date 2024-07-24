const mongoose = require("mongoose");

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://ankith:8340953756@cluster0.ik4tmxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )
    .then(() => {
      console.log("DB Connected");
    });
};
