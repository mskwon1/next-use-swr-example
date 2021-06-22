import _ from 'lodash';
import { useState } from 'react';
import { mutate } from 'swr';
import { useUsers, useUser } from '../lib/userHooks';

function DummyUsers({ query }) {
  const { data, error } = useUsers(query);

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
  const { data: user, error } = useUser(userId);

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

function UserInput() {
  const { getCacheKeys } = useUsers();

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  const onSubmit = async (event) => {
    event.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({name, age}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setName('');
    setAge(0);

    const mutateKeys = getCacheKeys();
    _.map(mutateKeys, key => mutate(key));
  }

  return (
    <form>
      <div>
        <label>이름</label>
        <input type="text" name="name" value={name} onChange={event => setName(event.target.value)}  />
      </div>
      <div>
        <label>나이</label>
        <input type="number" name="age" value={age} onChange={event => setAge(event.target.value)} />
      </div>
      <button type="button" onClick={onSubmit}>등록</button>
    </form>
  )
}

export default function SWR() {
  const { data: users } = useUsers();

  const userIds = _.range(1, _.size(users) + 1);
  const dummyUserList = _.map(userIds, userId => {
    return <DummyUser key={userId} userId={userId} />
  });

  const dummyUserList2 = _.map(userIds, userId => {
    return <DummyUser key={`${userId}-2`} userId={userId} />
  });

  const usersQueryParams = {
    age_gt: 26
  }

  return (
    <div>
      <DummyUsers query={usersQueryParams}/>
      <hr />
      <DummyUsers />
      <hr />
      <DummyUsers />
      <hr />
      {dummyUserList}
      <hr />
      {dummyUserList2}
      <hr />
      <UserInput />
    </div>
  )
}
