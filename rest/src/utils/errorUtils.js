import mongoose from "mongoose";

export const getErrorMsg = (err) => {
  if(err instanceof mongoose.MongooseError) {
    return Object.values(err.errors[0].message[0]);
  }else if (err instanceof Error) {
    return err.message;
  };
};