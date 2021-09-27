import Airtable from 'airtable-plus'
import { NextApiHandler, NextApiRequest } from 'next'

const table = new Airtable({
  baseID: process.env.MEMBERS_BASE_ID,
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'members'
})

export default async function handler(req: NextApiRequest, res) {
  if (process.env.API_PASS !== req.query.pass) return res.send('access denied')

  res.send((await table.read()).map(r => r.fields.email).join(','))
}
