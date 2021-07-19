"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./common/config");
mongoose_1.default
    .connect(config_1.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    console.log('connect to Mongo database');
    app_1.default.listen(config_1.PORT, () => console.log(`Server started on port ${config_1.PORT}`));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=server.js.map