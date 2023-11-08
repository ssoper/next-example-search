'use client'

import { useEffect, useState, useMemo } from 'react'
import MiniSearch from 'minisearch'
import { createRoot } from 'react-dom/client'
import { SearchMatch, collateMatches } from '../app/_utilities/search'
import { SearchResultTitle, SearchResultMatch } from './search-result'

const MaxSearchResults = 50

const parseSearchMatch = (
  keys: string[],
  match: SearchMatch,
  slug: string
): JSX.Element | undefined => {
  if (keys.includes(match.key)) {
    return
  }

  if (match.field === 'title') {
    return
  }

  keys.unshift(match.key)
  return <SearchResultMatch key={match.key} match={match} slug={slug} />
}

export const Search = ({
  placeholder = 'Search books…',
  className,
}: {
  placeholder?: string
  className?: string
}) => {
  const fields = ['title', 'text']
  const search = useMemo(
    () =>
      new MiniSearch({
        fields,
        storeFields: [...fields, 'score', 'slug'],
      }),
    fields // eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(() => {
    fetch('/documents.json')
      .then((response) => response.json())
      .then((data) => {
        if (search.documentCount > 0) {
          return
        }

        search.addAll(data)
      })
  }, [search])

  const [searchResultNode, setSearchResultNode] = useState<
    HTMLElement | undefined
  >(undefined)
  useEffect(() => {
    setSearchResultNode(document.getElementById('search-results')!)
  }, [])

  const [hideSearchResults, setHideSearchResults] = useState(true)
  useEffect(() => {
    document.body.addEventListener('click', () => {
      setHideSearchResults(true)
    })
  }, [])

  const searchDocuments = (query: string) => {
    if (!searchResultNode) {
      return
    }

    if (query.length < 3) {
      setHideSearchResults(true)
      return
    }

    const results = search
      .search(query)
      ?.slice(0, MaxSearchResults)
      .map(collateMatches)

    if (results.length < 1) {
      setHideSearchResults(true)
      return
    }

    setHideSearchResults(false)
    const node = document.createElement('div')
    const root = createRoot(node)

    let currentTitle = ''
    const keys: string[] = []

    root.render(
      <>
        {results.map((result) => {
          if (!result) {
            return
          }

          if (currentTitle === result.title) {
            return result.matches.flatMap(
              (match) => parseSearchMatch(keys, match, result.slug) || []
            )
          }

          currentTitle = result.title
          let content = result.matches.flatMap(
            (match) => parseSearchMatch(keys, match, result.slug) || []
          )

          content.unshift(<SearchResultTitle key={result.id} {...result} />)

          return content
        })}
      </>
    )

    searchResultNode.replaceChildren(node)
  }

  return (
    <div className={className ?? ''}>
      <div className="flex flex-col">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full pl-10 py-[7px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            autoComplete="off"
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              searchDocuments(event.target.value)
            }
          />
        </div>
        <div className="z-10 relative">
          <div
            id="search-results"
            className={`${
              hideSearchResults ? 'hidden' : ''
            } max-h-[80vh] overflow-auto w-full absolute top-0 left-0 flex flex-col py-2 px-2 rounded-lg border bg-gray-100 dark:text-white dark:bg-gray-900 dark:border-gray-400`}
          ></div>
        </div>
      </div>
    </div>
  )
}
