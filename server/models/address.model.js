import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "userdatas",
    },
    username: {
      type: String,
      required: true,
    },
    addresses: [
      {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        locality: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postalCode: {
          type: Number,
          required: true,
        },
        phone: {
          type: Number,
          required: true,
        },
        defaultAddress: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

addressSchema.methods.pushAddress = function (address) {
  try {
    if (address.defaultAddress) {
      console.log("changing defaultAddress");
      const defaultAddress = this.addresses.find(
        (addr) => addr.defaultAddress == true
      );
      defaultAddress.defaultAddress = false;
    }
    console.log("Pushing new address.....");
    this.addresses.push(address);
  } catch (err) {
    console.log("Address error : ", err);
  }
};

const userAddress = mongoose.model("userAddresses", addressSchema);
addressSchema.methods.pushAddress.bind(userAddress);

export default userAddress;
