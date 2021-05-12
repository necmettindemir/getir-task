import mongoose  from 'mongoose';

var Schema = mongoose.Schema;

const recordSchema = new Schema({
  key: String,      
  createdAt: Date,  
  counts: [Number]
});

const Record = mongoose.model('records', recordSchema); 
export default Record;
