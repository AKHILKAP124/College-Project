import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled',
  },
  content: {
    type: String,
    default: 'no text yet',

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});
  
const NoteModel = mongoose.model('Note', noteSchema);

export default NoteModel;