import * as axios from 'axios'

export const airAPI = {
  getPassengers(page = 1, size = 250) {
    return axios.get(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`
    )
  },
}
