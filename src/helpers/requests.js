import axios from 'axios'
import store from '../store'

const baseApiUrl = 'https://staging.comedian.maddevs.co/v1'

const getFullUrl = url => `${baseApiUrl}/${url}`

const addToken = headers => {
  const token = store.state.user.token
  if (!token) {
    throw new Error('Unauthorized')
  }

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  }
}

export async function fetch(path, params, headers = {}, withAuth = true) {
  const url = getFullUrl(path)

  if (withAuth) {
    headers = addToken(headers)
  }

  return await axios.get(url, {
    params,
    headers,
  });
}

export async function post(path, data, headers = {}, withAuth = true) {
  const url = getFullUrl(path)

  if (withAuth) {
    headers = addToken(headers)
  }

  return await axios.post(url, data, {
    headers,
  });
}

export async function patch(path, data, headers = {}, withAuth = true) {
  const url = getFullUrl(path)

  if (withAuth) {
    headers = addToken(headers)
  }

  return await axios.patch(url, data, {
    headers,
  });
}

export async function remove(path, headers = {}, withAuth = true) {
  const url = getFullUrl(path)

  if (withAuth) {
    headers = addToken(headers)
  }

  return await axios.delete(url, {
    headers,
  });
}