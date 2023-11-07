import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import { randomUUID } from 'crypto'

export class Book {
  title: string
  author: string
  slug: string
  cover: string

  constructor(title: string, author: string, slug: string) {
    this.title = title
    this.author = author
    this.slug = slug
    this.cover = `/books/${slug}.jpg`
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

export class Document {
  id: string
  title: string
  slug: string
  section: string

  constructor(title: string, slug: string, section: string) {
    this.id = randomUUID()
    this.title = title
    this.slug = slug
    this.section = section
  }
}

export const generateSearchDocuments = async (books: Book[]) => {
  const outputPath = `${process.cwd()}/public/documents.json`

  const documents = (
    await Promise.all(
      books.map(async (book: Book) =>
        (await getContent(book.slug))
          .split('\n')
          .map(
            (section: string) => new Document(book.title, book.slug, section)
          )
      )
    )
  ).flat()

  await writeFile(outputPath, JSON.stringify(documents))
}
