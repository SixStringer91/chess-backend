import mongoose from 'mongoose';
import app from './app';
import { PORT, MONGO_DB_URL } from './common/config';

mongoose
  .connect(
    <string>MONGO_DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('connect to Mongo database');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));
