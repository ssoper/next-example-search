import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { SearchMatch } from '@/app/_utilities/search'
import { IconDocument, IconText } from './icons'

const font = Inter({ weight: '700', subsets: ['latin'] })

export const SearchResultTitle = ({
  title,
  slug,
}: {
  title: string
  slug: string
}) => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        setDarkMode(event.matches)
      })
  }, [])

  return (
    <div className="flex flex-row py-2 pl-2 hover:bg-gray-300 hover:dark:bg-gray-700 hover:rounded-lg">
      <div className="pt-0.5">
        <IconDocument color={darkMode ? 'white' : 'black'} />
      </div>
      <div className="ml-2">
        <Link href={slug} className={font.className}>
          {title}
        </Link>
      </div>
    </div>
  )
}

export const SearchResultMatch = ({
  match,
  slug,
}: {
  match: SearchMatch
  slug: string
}) => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        setDarkMode(event.matches)
      })
  }, [])

  return (
    <div className="flex flex-row pl-2 hover:bg-gray-300 hover:dark:bg-gray-700 hover:rounded-lg">
      <div className="border-l ml-2 pt-0.5 border-black dark:border-white">
        <IconText
          className="mt-2.5 ml-4"
          color={darkMode ? 'white' : 'black'}
        />
      </div>
      <div className="w-full ml-2 pr-20 py-2">
        <p className="truncate">
          <Link href={slug}>{match.blurb}</Link>
        </p>
      </div>
    </div>
  )
}
