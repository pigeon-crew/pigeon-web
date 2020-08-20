/** @format */

import secureAxios from './apiClient';

const fetchMe = async (accessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/users/me',
      method: 'GET',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        const me = res.data.data;
        resolve(me);
      })
      .catch((err) => reject(err.response));
  });
};

const fetchMetadata = (link: string) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/links/preview',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        previewUrl: link,
      }),
    })
      .then((response) => {
        const meta = response.data.data;
        resolve(meta);
      })
      .catch((err) => reject(err.response));
  });
};

const fetchMyFeed = (
  accessToken: string,
  limit = '',
  archive = 'false',
  author = '',
  like = 'false'
) => {
  return new Promise((resolve, reject) => {
    let url = `/api/links/me?limit=${limit}&archive=${archive}&author=${author}&like=${like}`;

    secureAxios({
      url,
      method: 'GET',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        const links = res.data.links;
        resolve(links);
      })
      .catch((err) => reject(err.response));
  });
};

export { fetchMe, fetchMetadata, fetchMyFeed };
