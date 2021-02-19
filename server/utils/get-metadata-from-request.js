import axios from 'axios';
import { buildApiUrl } from '@sttm/banidb';

import { API_URL } from '../../common/constants';

/**
 * @param {object} req - The request obj
 *
 */
export const getMetadataFromRequest = async (req) => {
  const { path, query } = req;
  switch (path) {
    case '/shabad': {
      const _url = buildApiUrl({ id: query.id, API_URL });
      const url = 'https:' + _url;
      return axios.get(url);
    }
    // We are returning a  falsy value to indicate we get empty data from api.
    default: return null;
  }
}