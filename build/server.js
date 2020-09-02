"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//llamar a express
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
//llamar rutas
const producto_1 = __importDefault(require("./routes/producto"));
const categoria_1 = __importDefault(require("./routes/categoria"));
//clase
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(helmet_1.default());
        //conexion a bdd
        const MONGO_URI = 'mongodb+srv://joss:12345@cluster0.j6xzm.mongodb.net/deber?retryWrites=true&w=majority';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
            console.log("BDD Ok");
        });
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/producto', producto_1.default);
        this.app.use('/api/categoria', categoria_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO");
        });
    }
}
const server = new Server();
server.start();
