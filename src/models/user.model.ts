import { Schema, model } from "mongoose";
import { USER_ROLES } from "../constants/user.constants";
import { IUser } from "../modules/user/user.interface";
import bcrypt from "bcryptjs";
import { IUserDocument } from "../modules/user/user.interface";


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z ]+$/, "Name can only contain letters and spaces"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please provide a valid email address"
        ]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be at least eight characters"],
        select: false
    },
    avatar: {
        type: {
            url: String,
            public_id: String
        },
        default: null
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.USER
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    contactNumber: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^\+923\d{9}$/.test(v);
            },
            message: "Contact number must start with +923 and contain 9 digits after it"
        }
    },
    address: [
        {
            city: { type: String, required: true, trim: true , lowercase: true},
            country: { type: String, required: true, trim: true , lowercase: true},
            zip: { type: Number, required: true}

        }
    ]

}, { timestamps: true });

userSchema.pre("save", async function (this: IUserDocument) {
    if (!this.isModified("password")) return;
    if (this.password) {
        const hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
    }
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    if (!this.password) return false;
    const comparePassword = await bcrypt.compare(password, this.password);
    return comparePassword;
}


export const User = model<IUser>("User", userSchema);