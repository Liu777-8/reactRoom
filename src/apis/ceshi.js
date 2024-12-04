import request from '@/services/newRequest';

export const getTestData = (data) => {
  return request({
    url: '/document/receive/page',
    method: 'post',
    data,
  });
};
