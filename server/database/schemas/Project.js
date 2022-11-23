const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'untitled' },
    input: { type: String },
    resList: [
      {
        type: String,
      },
    ],
    favorite: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now, immutable: true },
    updated_at: { type: Date },
  },
  { versionKey: false }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
