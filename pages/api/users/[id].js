import { users } from '../../../store/users';
import _ from 'lodash';

export default function handler(req, res) {
  const user = _.find(users, { id: _.toNumber(req.query.id) });

  return res.status(200).json(user);
}
