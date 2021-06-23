import _ from 'lodash';

export const baseFetcher = async (url) => {
  console.log(`${url} fetcher call`);
  return fetch(url).then(res => res.json())
}

export const buildURLString = (baseUrl, query = {}) => {
  if (_.isEmpty(query)) {
    return baseUrl;
  }

  const paramStrings = _.map(query, (value, key) => {
    return `${key}=${value}`;
  });

  return `${baseUrl}?${_.join(paramStrings, '&')}`;
}
