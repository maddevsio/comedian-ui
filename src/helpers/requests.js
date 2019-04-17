import axios from 'axios'
import store from '../store'

const baseApiUrl = process.env.VUE_APP_COMEDIAN_API_BASE_URL // 'https://staging.comedian.maddevs.co'
const sprintReporterBaseUrl = process.env.VUE_APP_SPRINT_REPORTER_API_BASE_URL // 'https://staging-sprint-reporter.comedian.maddevs.co'
const onDutyBaseUrl = process.env.VUE_APP_ON_DUTY_BASE_URL // 'https://staging-onduty-service.comedian.maddevs.co'
const reporterBaseUrl = process.env.VUE_APP_TEST

const getFullUrl = (service, url) => {
  let baseUrl

  switch (service) {
    case 'sprintReporter':
      baseUrl = sprintReporterBaseUrl
      break;
    case 'onDuty':
      baseUrl = onDutyBaseUrl
      break;
    case 'reporter':
      baseUrl = reporterBaseUrl
      break;
    default:
      baseUrl = baseApiUrl
      break;
  }

  return `${baseUrl}/${url}`
}
const addToken = headers => {
  const token = store.state.user.token
  if (!token) {
    throw new Error('Access token is required.')
  }

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  }
}

export async function fetch(path, params, headers = {}, service = 'comedian', withAuth = true) {
  const url = getFullUrl(service, path)

  if (withAuth) {
    headers = addToken(headers)
  }

  return await axios.get(url, {
    params,
    headers,
  });
}

export async function post(path, data, headers = {}, service = 'comedian', withAuth = true) {
  const url = getFullUrl(service, path)

  if (withAuth) {
    headers = addToken(headers)
  }

  return await axios.post(url, data, {
    headers,
  });
}

export async function patch(path, data, headers = {}, service = 'comedian', withAuth = true) {
  const url = getFullUrl(service, path)

  if (withAuth) {
    headers = addToken(headers)
  }

  return await axios.patch(url, data, {
    headers,
  });
}

export async function remove(path, headers = {}, service = 'comedian', withAuth = true) {
  const url = getFullUrl(service, path)

  if (withAuth) {
    headers = addToken(headers)
  }

  return await axios.delete(url, {
    headers,
  });
}