import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendanceRecord {
  studentId: mongoose.Types.ObjectId;
  present: boolean;
  note?: string;
}

export interface IAttendance extends Document {
  courseId: mongoose.Types.ObjectId;
  coachId: mongoose.Types.ObjectId;
  sessionDate: Date;
  sessionTopic?: string;
  records: IAttendanceRecord[];
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceRecordSchema = new Schema<IAttendanceRecord>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    present: { type: Boolean, required: true },
    note: { type: String },
  },
  { _id: false }
);

const AttendanceSchema = new Schema<IAttendance>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    coachId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sessionDate: { type: Date, required: true },
    sessionTopic: { type: String },
    records: [AttendanceRecordSchema],
  },
  { timestamps: true }
);

AttendanceSchema.index({ courseId: 1, sessionDate: -1 });
AttendanceSchema.index({ 'records.studentId': 1, sessionDate: -1 });

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
