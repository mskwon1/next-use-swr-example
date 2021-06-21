import _ from 'lodash';
import { promises as fsp } from 'fs';

const userFilePath = new URL('./users.json', import.meta.url);

export default async function handler(req, res) {
  const users = await loadUsers();
  const user = _.find(users, { id: _.toNumber(req.query.id) });

  return res.status(200).json(user);
}

async function loadUsers() {
  let users = await fsp.readFile(userFilePath, 'utf-8');
  users = JSON.parse(users);

  return users;
}
