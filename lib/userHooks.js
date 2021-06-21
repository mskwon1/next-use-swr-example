import useSWR from 'swr';

export function useUsers() {
  const { data, error, isValidating, mutate } = useSWR('/api/users', fetcher);
  return {
    data,
    error,
    isValidating,
    mutate
  }
}

export function useUser(id) {
  const { data, error, isValidating, mutate } = useSWR(`/api/users/${id}`, fetcher);
  return {
    data,
    error,
    isValidating,
    mutate
  }
}

const fetcher = (url) => {
  console.log(`${url} fetcher call`);
  return fetch(url).then(res => res.json())
}
