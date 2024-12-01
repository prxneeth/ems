import mongoose, { Schema } from "mongoose";

const leaveSchema = new mongoose.Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    leaveType: { type: String, enum: ["Sick Leave", "Casual Leave", "Annual Leave"] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    appliedAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }


})

const Leave = mongoose.model("Leave", leaveSchema)
export default Leave