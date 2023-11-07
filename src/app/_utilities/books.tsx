import path from 'path'
import { readFile } from 'fs/promises'

export class Book {
  title: string
  author: string
  slug: string

  constructor(title: string, author: string, slug: string) {
    this.title = title
    this.author = author
    this.slug = slug
  }
}

export const getBooks = async (): Promise<Array<Book>> => {
  const jsonFile = path.join(process.cwd(), 'books', 'books.json')
  const data = JSON.parse(await readFile(jsonFile, 'utf8'))
  const books = (data as Array<any>).map(
    (object: any) => new Book(object.title, object.author, object.slug)
  )

  return books
}

export const findBook = async (slug: string): Promise<Book | undefined> => {
  return (await getBooks()).find((book: Book) => book.slug === slug)
}

export const getContent = async (slug: string): Promise<string> => {
  const file = path.join(process.cwd(), 'books', `${slug}.txt`)
  return await readFile(file, 'utf8')
}
