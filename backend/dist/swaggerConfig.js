"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupSwagger;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
function setupSwagger(app) {
    const specPath = path_1.default.join(process.cwd(), "openapi.yaml");
    const swaggerDocument = yamljs_1.default.load(specPath);
    app.use("/doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
}
