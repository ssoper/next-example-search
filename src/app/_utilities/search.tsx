import { createHash } from 'crypto'

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

export const collateMatches = ({
  id,
  match,
  score,
  title,
  text,
  slug,
}: {
  id: string
  match: { [term: string]: string[] }
  score: number
  title?: string
  text?: string
  slug?: string
}):
  | {
      id: string
      title: string
      score: number
      slug: string
      matches: SearchMatch[]
    }
  | undefined => {
  if (!title || !slug) {
    return
  }

  const terms = Object.keys(match)
  const matches = terms.flatMap((term: string) => {
    return (
      match[term].flatMap((field: string) => {
        if (field === 'text' && text) {
          return getMatch(term, field, text) || []
        }

        if (field === 'title' && title) {
          return getMatch(term, field, title) || []
        }

        return []
      }) || []
    )
  })

  if (matches.length === 0) {
    return
  }

  return {
    id,
    title,
    score,
    slug,
    matches,
  }
}

const getMatch = (
  term: string,
  field: string,
  fieldValue: string
): SearchMatch | undefined => {
  const re = new RegExp(term, 'i')
  const start = fieldValue.search(re)

  if (start < 0) {
    return
  }

  const key = createHash('md5').update(`${field}-${fieldValue}`).digest('hex')

  return {
    field,
    term,
    key,
    blurb: fieldValue,
    match: {
      start,
      end: start + term.length,
    },
  }
}
