import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/en_IN";

const db = new PrismaClient();

function generateCategory() {
  return {
    name: faker.commerce.product(),
  };
}

const generateCategories = async () => {
  const categories = Array.from({ length: 100 }, () => generateCategory());

  await db.category.createMany({
    data: categories,
  });

  return true;
};

async function main() {
  await generateCategories();
}

console.log("Seeding Job Profiles");

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
