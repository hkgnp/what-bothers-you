import wretch from 'wretch'

import { Item } from '../types'

//@ts-expect-error env does not exist on importmeta
const URL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : '/api'

export const api = wretch(`${URL}`, {
  mode: 'cors',
})
  .errorType('json')
  .resolve((r) => r.json() as Promise<Item[]>)
