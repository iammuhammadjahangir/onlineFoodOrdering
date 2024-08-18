import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IAddress extends Document {
  addressDetail: string;
  city: string;
  area: string;
}

interface ICustomer extends Document {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  phoneNo?: string;
  gender?: string;
  password: string;
  dob?: Date;
  address?: IAddress[];
  paymentOptions?: string;
  wishList?: mongoose.Schema.Types.ObjectId[];
  age?: number;
}

const customerSchema = new mongoose.Schema<ICustomer>(
  {
    _id: {
      type: String,
      required: [true, "Please Enter ID"],
    },
    name: {
      type: String,
      required: [true, "Please provide your Name"],
    },
    avatar: {
      type: String,
      // required: [true, "Please provide your photo"],
    },
    email: {
      type: String,

      required: [true, "Please provide your email"],
      validate: [validator.default.isEmail, "Please enter valid email"],
      // unique: true,
    },
    phoneNo: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", ""],
      default: "",
    },
    dob: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      //   required: [true, "Please provide users password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    address: [
      {
        addressDetail: {
          type: String,
          required: [true, "Please provide address"],
        },
        city: {
          type: String,
          required: [true, "Please provide city"],
        },
        area: {
          type: String,
          required: [true, "Please provide state"],
        },
      },
    ],
    paymentOptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

customerSchema.path("address").validate(function (value: IAddress[]) {
  // If address field exists, ensure all required fields are provided
  if (value && value.length > 0) {
    return value.every((address) => {
      return address.addressDetail && address.city && address.area;
    });
  }
  // If address field doesn't exist, validation passes automatically
  return true;
}, "Please provide all required address fields if address is provided");

customerSchema.virtual("age").get(function () {
  const today = new Date();
  const dob: any = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//Comapre Password
customerSchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  // console.log(enteredPassword, this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Customer = mongoose.model("customer", customerSchema);
