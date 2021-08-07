import mongoose from 'mongoose';
import app from './app';
import { PORT, MONGO_DB_URL } from './common/config';

const mongoUrl = 'mongodb+srv://danik:danik@chess-db.zlsbk.mongodb.net/chess-db?retryWrites=true&w=majority';

mongoose
  .connect(
    <string>MONGO_DB_URL || mongoUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('connect to Mongo database');
    app.listen(PORT || 80, () => console.log(`Server started on port ${PORT || 80}`));
  })
  .catch((err) => console.log(err));
