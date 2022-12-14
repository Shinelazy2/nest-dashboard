"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const whitelist = ['http://localhost:9000'];
    app.enableCors({
        origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        allowedHeaders: '*',
        methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
        credentials: true,
    });
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map