const baseURL = 'http://84.201.142.45/';

export async function refreshRequest() {
  const refresh = window.localStorage.getItem('REFRESH_TOKEN');

  const refreshResponse = await fetch(`${baseURL}api/token/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      refresh,
    }),
  });
  console.log('Refresh Response: ', refreshResponse);

  if (refreshResponse.ok) {
    const refreshData = await refreshResponse.json();
    console.log('Refresh data: ', refreshData);
    window.localStorage.setItem('ACCESS_TOKEN', refreshData.access);
    return true;
  }
  return false;
}

export async function apiRequest(url, options = {}) {
  const access = window.localStorage.getItem('ACCESS_TOKEN');
  options.headers = options.headers || {};

  if (access) {
    options.headers['Authorization'] = `Bearer ${access}`;
  }

  let response = await fetch(`${baseURL}${url}`, options);

  if (response.status === 401) {
    const isRefreshed = await refreshRequest();
    console.log('Api Request -> isRefreshed: ', isRefreshed);

    if (isRefreshed) {
      const newToken = window.localStorage.getItem('ACCESS_TOKEN');
      options.headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(`${baseURL}${url}`, options);
      return response.json();
    } else {
      return [];
    }
  }

  if (response.status !== 204) {
    const data = response.json();
    return data;
  }
  return null;
}

export async function getFeedPromise() {
  return apiRequest('api/posts/');
}

export async function getBookmarksPromise() {
  return apiRequest('api/bookmarked_posts/');
}

export const getNeotalkPromise = (post_id) => {
  return apiRequest(`api/posts/${post_id}`);
};

// neo talk creation:
//
// data: { category, text }
//

export const getConstructorPromise = (data) => {
  return apiRequest('api/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
};

export const updateNeoTalk = (id, data) => {
  fetch(baseURL + `api/replies/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
};

export const dropNeoTalk = (id) => {
  fetch(baseURL + `api/posts/${id}`, {
    method: 'DELETE',
  });
};

// reply

export const getReplyPromise = (data) => {
  return apiRequest('api/replies/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
};

// login

export const loginRequestPromise = async (creds) => {
  const response = await fetch(baseURL + `api/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(creds),
  });

  return response;
};

export const loginRequest = async ({ username, password }, navigator, errorSetter) => {
  if (!(username && password)) {
    errorSetter('Fields may not be blank');
    return;
  }

  try {
    const response = await loginRequestPromise({ username, password });
    const data = await response.json();

    if (!response.ok) {
      errorSetter(data.detail);
    } else {
      window.localStorage.setItem('ACCESS_TOKEN', data.access);
      window.localStorage.setItem('REFRESH_TOKEN', data.refresh);

      navigator('/home', { replace: true });
    }
  } catch (err) {}
};

export const isAuthorized = async () => {
  const accessToken = window.localStorage.getItem('ACCESS_TOKEN');

  if (!accessToken) {
    return false;
  }

  const response = await fetch(baseURL + `api/token/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: accessToken,
    }),
  });

  console.log('Verify response: ', response);

  if (!response.ok) {
    const isRefreshed = await refreshRequest();
    return isRefreshed;
  }

  return true;
};

// signup

export const signupRequestPromise = async (creds) => {
  const response = await fetch(baseURL + `api/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(creds),
  });

  return response;
};

export const requestUserID = async () => {
  return await apiRequest('api/get_user_id/');
};

// change bookmark

export const createBookmark = async (post_id) => {
  apiRequest('api/bookmarks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      post: { id: post_id },
    }),
  });
};

export const removeBookmark = async (post_id) => {
  apiRequest('api/remove_bookmark/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      post: { id: post_id },
    }),
  });
};

// change rate

export const updateCreateRate = async (reply_id, rate) => {
  apiRequest('api/rates/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      reply: { id: reply_id },
      type: rate,
    }),
  });
};

export const removeRate = async (reply_id) => {
  apiRequest('api/remove_rate/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      reply: { id: reply_id },
    }),
  });
};

// search

export const requestSearchResults = async (query) => {
  const results = await apiRequest(`api/search/?search_query=${query}`);
  return results;
};
