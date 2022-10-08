import Link from 'next/link'
import { Client } from '@notionhq/client'

export default function Home({ page }) {
  return <>
    <Link href={page.link}>
      <a target="_blank">
        <div className='w-screen h-screen px-6 flex items-center flex-wrap justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 text-lg text-white'>
          {page.title}
        </div>
      </a>
    </Link>
  </>
}

export async function getServerSideProps() {
  const notion = new Client({ auth: process.env.NOTION_API_TOKEN })
  const pages = (await notion.databases.query({
    database_id: process.env.NOTION_DATABASE
  }))?.results

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
