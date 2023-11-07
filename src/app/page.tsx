import Link from '../../node_modules/next/link'
import Image from 'next/image'
import { Book, getBooks } from './_utilities/books'

export default async function Home() {
  const books = await getBooks()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl py-12">My ebooks</h1>
      <div className="flex flex-row min-w-full">
        <div className="flex basis-1/2">
          <ul className="mx-auto">
            {books.map((book: Book) => (
              <li key={book.slug} className="my-8">
                <div className="flex">
                  <Image
                    src={book.cover}
                    width={80}
                    height={80}
                    alt={book.title}
                  />
                  <Link
                    href={`/${book.slug}`}
                    className="underline my-auto ml-8"
                  >
                    {book.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex basis-1/2">
          <p className="mx-auto">Search</p>
        </div>
      </div>
    </main>
  )
}
