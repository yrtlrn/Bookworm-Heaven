import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";

type UserProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  savedBooks: [Types.ObjectId];
  checkPassword: (givenPassword: string) => void;
  cart: [{}];
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
    default: [],
  },
  cart: {
    type: [
      {
        bookId: Types.ObjectId,
        quantity: Number,
        price: Number,
      },
    ],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(
      this.password,
      10
    );
    if (hashedPassword) {
      this.password = hashedPassword;
    } else {
      throw new Error("Something went wrong");
    }
  }
  next();
});

userSchema.method(
  "checkPassword",
  async function (givenPassword: string) {
    console.log(givenPassword);
    const comparePassword: boolean = await bcrypt.compare(
      givenPassword,
      this.password
    );
    console.log(this.password);
    return comparePassword;
  }
);

userSchema.pre("findOneAndUpdate", async function (next) {
  const updateData = JSON.parse(
    JSON.stringify(this.getUpdate())
  );
  if (updateData.password) {
    const hashedPassword = await bcrypt.hash(
      updateData.password,
      10
    );
    this.set({ password: hashedPassword });
  }
  next();
});

const User = mongoose.model<UserProps>("users", userSchema);
export default User;
