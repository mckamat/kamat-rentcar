import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const createErrorResult = (error) => {
  const status = error?.response?.status || null
  const message =
    error?.response?.data?.message || error?.message || 'Beklenmeyen bir hata oluştu.'

  console.error('API request failed:', {
    status,
    message,
    detail: error,
  })

  return {
    success: false,
    data: null,
    error: {
      status,
      message,
    },
  }
}

const buildPath = (controllerName, methodName) => {
  const controller = String(controllerName || '').trim()
  const method = String(methodName || '').trim()

  if (!controller || !method) {
    throw new Error('controllerName ve methodName zorunludur.')
  }

  return `/${encodeURIComponent(controller)}/${encodeURIComponent(method)}`
}

export const getData = async (controllerName, methodName, parameters = {}) => {
  try {
    const endpoint = buildPath(controllerName, methodName)
    const response = await apiClient.get(endpoint, { params: parameters })

    return {
      success: true,
      data: response.data,
      error: null,
    }
  } catch (error) {
    return createErrorResult(error)
  }
}

export const postData = async (controllerName, methodName, parameters = {}) => {
  try {
    const endpoint = buildPath(controllerName, methodName)
    const response = await apiClient.post(endpoint, parameters)

    return {
      success: true,
      data: response.data,
      error: null,
    }
  } catch (error) {
    return createErrorResult(error)
  }
}

export default {
  getData,
  postData,
}
