import useSWR, { cache } from 'swr';
import _ from 'lodash';

export function useUsers(query) {
  const urlString = getUrlString('/api/users', query);
  const { data, error, isValidating, mutate } = useSWR(urlString, fetcher);

  const getCacheKeys = () => {
    return _.filter(cache.keys(), key => {
      return _.startsWith(key, '/api/users') && _.size(_.split(key, '/')) < 4;
    });
  }

  return {
    data,
    error,
    isValidating,
    mutate,
    getCacheKeys
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

const fetcher = async (url) => {
  console.log(`${url} fetcher call`);
  return fetch(url).then(res => res.json())
}

function getUrlString(baseUrl, query) {
  if (!query) {
    return baseUrl; 
  }

  const paramStrings = _.map(query, (value, key) => {
    return `${key}=${value}`;
  });

  return `${baseUrl}?${_.join(paramStrings, '&')}`;
}
