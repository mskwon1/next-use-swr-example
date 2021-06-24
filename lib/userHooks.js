import useSWR, { cache } from 'swr';
import _ from 'lodash';
import { baseFetcher, buildURLString } from './requestHelpers';
import { mutate as globalMutate } from 'swr';

const INDEX_USERS_PREFIX = '/api/users'

export function useUsers(query, token) {
  const urlString = `userIndex@${buildURLString(INDEX_USERS_PREFIX, query)}`;
  const { data, error, isValidating, mutate } = useSWR(urlString, baseFetcher);

  const getCacheKeys = () => {
    return _.filter(cache.keys(), key => {
      return _.head(_.split(key, '@')) === 'userIndex';
    });
  }

  const mutateAll = () => {
    _.map(getCacheKeys(), key => globalMutate(key));
  }

  return {
    data,
    error,
    isValidating,
    mutate,
    mutateAll
  }
}

export function useUser(id) {
  const { data, error, isValidating, mutate } = useSWR(`/api/users/${id}`, baseFetcher);
  return {
    data,
    error,
    isValidating,
    mutate
  }
}
