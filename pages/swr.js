import _ from 'lodash';
import { useUsers, useUser } from '../lib/userHooks';

function DummyUsers() {
  const { data, error, isValidating } = useUsers();

  if (error) {
    return <div>ERROR : { error.toString() }</div>
  }

  if (!data) {
    return <div>Loading</div>
  }

  const users = _.map(data, user => {
    return <li key={user.id}>{ user.id } / {user.name} / {user.age}</li>
  });

  return (
    <ul>
      {users}
    </ul>
  )
}

function DummyUser({ userId }) {
  const { data: user, error, isValidating } = useUser(userId);

  if (error) {
    return <div>Error: { error.toString() }</div>
  }

  if (!user) {
    return <div>Loading</div>
  }

  return (
    <p>
      {user.id} / {user.name} / {user.age}
    </p>
  )
}

export default function SWR() {
  const userIds = [1,2,3,4];
  const dummyUserList = _.map(userIds, userId => {
    return <DummyUser key={userId} userId={userId} />
  });

  const dummyUserList2 = _.map(userIds, userId => {
    return <DummyUser key={`${userId}-2`} userId={userId} />
  });

  return (
    <div>
      <DummyUsers />
      <DummyUsers />
      <DummyUsers />
      {dummyUserList}
      {dummyUserList2}
    </div>
  )
}
