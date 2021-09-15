import Airtable from 'airtable-plus'

const table = new Airtable({
  baseID: process.env.MEMBERS_BASE_ID,
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'members'
})

export default async function handler(req, res) {
  const data = req.body

  try {
    await table.create(data)
    res.status(200).send('')
  } catch {
    res.status(500).send('Error creating entry')
  }
}
