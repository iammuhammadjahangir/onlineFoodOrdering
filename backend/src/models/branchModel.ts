import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    branchCode: {
      type: String,
      unique: [true, "Branch code should be unique"],
      required: [true, "Please provide branch code"],
    },
    branchDescription: {
      type: String,
      required: [true, "Please provide branch description"],
    },
    branchAddress: {
      latitude: {
        type: Number,
        required: [true, "Please provide latitude"],
      },
      longitude: {
        type: Number,
        required: [true, "Please provide longitude"],
      },
      houseNo: {
        type: String,
        required: [true, "Please provide house/shop number"],
      },
      street: {
        type: String,
        required: [true, "Please provide street address"],
      },
      area: {
        type: String,
        required: [true, "Please provide area"],
      },
      city: {
        type: String,
        required: [true, "Please provide city"],
      },
      state: {
        type: String,
        required: [true, "Please provide state"],
      },
      country: {
        type: String,
        required: [true, "Please provide country"],
      },
      postalCode: {
        type: String,
        required: [true, "Please provide postal/zip code"],
      },
    },

    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "warehouse",
      alias: "warehouse",
      default: null, // Allows warehouseId to be empty
    },
    branchType: {
      type: String,
      enum: ["branch", "store"],
      default: "branch",
    },
    branchTiming: {
      days: {
        type: [String], // Array of days
        enum: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: [true, "Please provide open days"],
      },
      firstHalfOpenTime: {
        type: String, // Format: HH:MM
        required: [true, "Please provide first half open time"],
      },
      firstHalfCloseTime: {
        type: String, // Format: HH:MM
        required: [true, "Please provide first half close time"],
      },
      secondHalfOpenTime: {
        type: String, // Format: HH:MM
      },
      secondHalfCloseTime: {
        type: String, // Format: HH:MM
      },
    },
    branchSettings: {
      asapOnly: {
        type: Boolean,
        default: false,
      },
      preOrderOnly: {
        type: Boolean,
        default: false,
      },
      sameDayPreOrder: {
        type: Boolean,
        default: false,
      },
      minPreOrderTime: {
        type: Number, // In hours
      },
      maxPreOrderTime: {
        type: Number, // In hours
      },
      otherSettings: {
        swsDeliveryModule: {
          type: Boolean,
          default: false,
        },
        taxPercentage: {
          type: Number,
          min: [0, "Tax percentage cannot be negative"],
          max: [100, "Tax percentage cannot exceed 100"],
        },
      },
    },
    customerSupport: {
      contactEmail: {
        type: String,
        match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
      },
      contactNumber: {
        type: String,
        match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid contact number"], // Example regex for international phone numbers
      },
    },
    activityStatus: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

export const Branch = mongoose.model("branch", branchSchema);
