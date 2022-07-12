const { default: axios } = require('axios')

export const publicFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})
