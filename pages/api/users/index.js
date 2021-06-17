import { users } from '../../../store/users';

export default async function handler(req, res) {
  return res.status(200).json(users);
}
