import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const list = () => axios.get(baseUrl).then(response => response.data)

const create = data => axios.post(baseUrl, data).then(response => response.data)

export default { list, create }
