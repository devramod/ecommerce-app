import mongoose from "mongoose";

// Contact schema
const contactSchema = mongoose.Schema(
    {
      name: String,
      email: {
        type: String,
        unique: true,
      },
      message: String,
    },
    { timestamps: true }
  );
  
  // Model
  const contactSchemaModel = mongoose.model("Contact", contactSchema);
  
  export default contactSchemaModel;