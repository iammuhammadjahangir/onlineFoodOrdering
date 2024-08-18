import { IncrementIDs } from "../models/orderInvoiceNumberModel.js";

// Convert startTime and endTime to Date objects representing time on an arbitrary date
export const parseTimeString = (timeString: string) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date(0); // January 1, 1970
  date.setUTCHours(hours, minutes, 0, 0);
  return date;
};

// Combine date and time
export const combineDateTime = (dateString: Date, timeString: string) => {
  const date = new Date(dateString);
  const [hours, minutes] = timeString.split(":").map(Number);
  // Ensure the date object is in UTC to avoid timezone issues
  date.setUTCHours(hours, minutes, 0, 0);
  return date;
};

export const IncrementValuesFunction = async (
  id: string,
  preValue: string,
  startingFrom?: string
) => {
  //Generating an order Id
  let sequenceNumber = null;
  sequenceNumber = await IncrementIDs.findOneAndUpdate(
    { id: id },
    { $inc: { seq: 1 } },
    { new: true }
  );
  let seqId;
  if (sequenceNumber == null) {
    const newval = new IncrementIDs({
      id: id,
      seq: Number(
        startingFrom?.length === 1
          ? startingFrom.padStart(3, "0")
          : startingFrom
      ),
    });
    newval.save();
    seqId =
      preValue +
      Number(
        startingFrom?.length === 1
          ? startingFrom.padStart(3, "0")
          : startingFrom
      );
  } else {
    seqId = preValue + sequenceNumber.seq;
  }

  return seqId;
};
