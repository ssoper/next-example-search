import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const font = Inter({ weight: '700', subsets: ['latin'] })

const IconDocument = (props: any) => {
  const { width = 16 } = props
  const { height = 16 } = props
  const { color = 'white' } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      strokeLinejoin="round"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 13.5V6.5V5.41421C14.5 5.149 14.3946 4.89464 14.2071 4.70711L9.79289 0.292893C9.60536 0.105357 9.351 0 9.08579 0H8H3H1.5V1.5V13.5C1.5 14.8807 2.61929 16 4 16H12C13.3807 16 14.5 14.8807 14.5 13.5ZM13 13.5V6.5H9.5H8V5V1.5H3V13.5C3 14.0523 3.44772 14.5 4 14.5H12C12.5523 14.5 13 14.0523 13 13.5ZM9.5 5V2.12132L12.3787 5H9.5ZM5.13 5.00062H4.505V6.25062H5.13H6H6.625V5.00062H6H5.13ZM4.505 8H5.13H11H11.625V9.25H11H5.13H4.505V8ZM5.13 11H4.505V12.25H5.13H11H11.625V11H11H5.13Z"
        fill={color}
      ></path>
    </svg>
  )
}

const IconText = (props: any) => {
  const { width = 16 } = props
  const { height = 16 } = props
  const { color = 'white' } = props
  const { className = '' } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      strokeLinejoin="round"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM1 7H1.75H9.25H10V8.5H9.25H1.75H1V7ZM1 12H1.75H11.25H12V13.5H11.25H1.75H1V12Z"
        fill={color}
      ></path>
    </svg>
  )
}

export interface SearchMatch {
  field: string
  term: string
  key: string
  blurb: string
  match: {
    start: number
    end: number
  }
}

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
