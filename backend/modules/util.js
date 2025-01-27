import fs from "node:fs/promises";

async function readData() {
  const data = await fs.readFile("./data/users.json", "utf8");
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile("./data/users.json", JSON.stringify(data));
}

async function readOrdersData() {
  const data = await fs.readFile("./data/orders.json", "utf8");
  return JSON.parse(data);
}

async function writeOrdersData(data) {
  await fs.writeFile("./data/orders.json", JSON.stringify(data));
}

export { readData, writeData, readOrdersData, writeOrdersData };
