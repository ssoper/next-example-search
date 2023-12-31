import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  Book,
  findBook,
  getBooks,
  getContent,
  generateSearchDocuments,
} from '../_utilities/books'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const books = await getBooks()

  await generateSearchDocuments(books)

  return books.map((book: Book) => ({
    slug: book.slug,
  }))
}

export default async function Page(props: PageProps) {
  const slug = props.params.slug
  const book = await findBook(slug)
  const body = await getContent(slug)

  if (!book || !body) {
    notFound()
  }

  return (
    <>
      <h1 className="my-10 text-center text-xl">{book.title}</h1>
      <Image
        src={book.cover}
        width={200}
        height={200}
        alt={book.title}
        className="mx-auto"
      />
      <h1 className="mt-8 text-center text-xl">By {book.author}</h1>
      {body.split('\n').map((text: string, index: number) => (
        <p key={index} className="mx-10 my-8">
          {text}
        </p>
      ))}
    </>
  )
}
