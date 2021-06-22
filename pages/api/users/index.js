import { promises as fsp } from 'fs';
import _ from 'lodash';

const userFilePath = new URL('./users.json', import.meta.url);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, age } = req.body;
    const newUser = await createUser(name, age);

    return res.status(200).json(newUser);
  }

  let users = await loadUsers();

  const ageGtFilter = _.toNumber(req.query.age_gt);
  if (ageGtFilter) {
    users = _.filter(users, user => {
      return user.age > ageGtFilter;
    });
  }

  return res.status(200).json(users);
}

async function createUser(name, age) {
  const users = await loadUsers();
  const lastUser = _.maxBy(users, 'id');

  const newUser = {
    id: _.toNumber(lastUser.id) + 1,
    name: name,
    age: age
  }

  const newUsers = _.concat(users, newUser);
  await fsp.writeFile(userFilePath, JSON.stringify(newUsers));

  return newUser;
}

async function loadUsers() {
  let users = await fsp.readFile(userFilePath, 'utf-8');
  users = JSON.parse(users);

  return users;
}
