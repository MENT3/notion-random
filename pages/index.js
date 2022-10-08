import Link from 'next/link'
import { Client } from '@notionhq/client'

export default function Home({ page }) {
  return (
    <Link href={page.link}>
      <a target="_blank">
        {page.title}
      </a>
    </Link>
  )
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_TOKEN })
  const databaseId = process.env.NOTION_DATABASE

  const pages = (await notion.databases.query({ database_id: databaseId }))?.results
  const p = pages[Math.floor(Math.random() * pages.length)]

  return {
    props: {
      page: {
        title: p?.properties?.Name?.title?.map((r) => r.plain_text).join(''),
        link: p?.url
      }
    }
  }
}
