import mongoose, { Types } from "mongoose";

type UserProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  savedBooks: [Types.ObjectId];
};

const userSchema = new mongoose.Schema<UserProps>({
  firstName: {
    type: "string",
    required: true,
    minlength: 3,
  },
  lastName: {
    type: "string",
    required: true,
    minlength: 3,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: "string",
    required: true,
    minlength: 6,
  },
  savedBooks: {
    type: [Types.ObjectId],
  },
});

const User = mongoose.model<UserProps>("users", userSchema);
export default User;
