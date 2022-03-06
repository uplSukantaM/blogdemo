import client from "../../lib/sanity"
export default async function getUser (req: Request, res: Response) {
  try {
    let query = `*[_type == "user"]`
    let res = await client.fetch(query)
    res.json(res)
  } catch (error) {
    console.error(error)
  }
}