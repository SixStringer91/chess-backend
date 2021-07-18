import app from './app';
import { PORT } from './common/config';

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
