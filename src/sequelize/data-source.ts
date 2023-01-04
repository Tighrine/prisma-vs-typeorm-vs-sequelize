import { Sequelize } from "sequelize-typescript";
import UserAddress from "./user-address.model";
import User from "./user.model";

const sequelize: Sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 9124,
    database: "benchmark-api-db-sequilize",
    username: "benchmark-api-db-sequilize",
    password: "benchmark-api-db-sequilize",
    models: [User, UserAddress],
    logging: false
});

//sequelize.addModels();

sequelize.authenticate().then(() => console.log("connected..."))
                        .catch(err => console.error("connection error", err));
sequelize.sync();

export default sequelize;