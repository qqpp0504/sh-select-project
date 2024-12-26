import fs from "node:fs/promises";

async function readData() {
  const data = await fs.readFile("./data/users.json", "utf8");
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile("./data/users.json", JSON.stringify(data));
}

export { readData, writeData };
