import { faker } from "@faker-js/faker";
import { userGroups } from "../userGroups";
import sequelize from "./data-source";
import User from "./user.model";

const userRepository = sequelize.getRepository(User);

const createManyUsers = async (count: number) => {
  const fCount = count.toLocaleString("en-US");

  const fakeUsers = Array.from({ length: count }, (item, idx) => ({
    id: idx,
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    group: userGroups[Math.floor(Math.random() * userGroups.length)],
  }));

  console.time(`Create(many) ${fCount} users - sequelize`);
  try {
    await userRepository.bulkCreate(fakeUsers)
  } catch (error) {
    //console.log('error: ', error);
  }
  console.timeEnd(`Create(many) ${fCount} users - sequelize`);
};

const findUsers = async () => {
  console.time("Find users - sequelize");
  await userRepository.findAll();
  console.timeEnd("Find users - sequelize");
};

const findByGroup = async () => {
  console.time("Find users by group - sequelize");
  await userRepository.findAll({
    where: {
      group: "guest",
    },
  });
  console.timeEnd("Find users by group - sequelize");
};

const createUsersIntensive = async (count: number) => {
  const fakeUserAddresses = Array.from({ length: count }, (_, id) => ({
    id,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
  }));

  const fakeUsers = Array.from({ length: count }, (_, id) => ({
    id,
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    group: userGroups[Math.floor(Math.random() * userGroups.length)],
    userAddresses: fakeUserAddresses,
  }));

  console.time(`Create users intensive - sequelize`);
  for (const user of fakeUsers) {
    try {
      await userRepository.create({
        ...user,
        userAddresses: user.userAddresses,
      });
    } catch (error) {
      //console.log('error: ', error);
    }
  }
  console.timeEnd(`Create users intensive - sequelize`);
};

async function main() {
  // sequelize.drop();
  await createManyUsers(Number(process.argv[2]) || 100);
  await createUsersIntensive(Number(process.argv[2]) || 100);
  await findUsers();
  await findByGroup();
}

main();
