export const actionRefreshArticles = payload => ({
    type: 'REFRESH_ARTICLES',
    payload
  });
  
  export const actionStopRefreshArticles = payload => ({
    type: 'STOP_REFRESH_ARTICLES',
    payload,
  });