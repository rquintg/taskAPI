import mongoose from "mongoose";
import config from "./config";
import colors from "colors";

// configuracion y conección de la BD usando mongoose dependencia para conectarnos a una bd en mongoDB

(async () => {
    try {
        const db = await mongoose.connect(config.mongodbURL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(colors.yellow('La base de datos esta conectada en: '), db.connection.name)
    }catch(err) {
        console.error(err);
    }
})();