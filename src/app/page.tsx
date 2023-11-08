import Link from 'next/link'
import Image from 'next/image'
import { Book, getBooks } from './_utilities/books'
import { Search } from '@/components/search'
import { Suspense } from 'react'

export default async function Home() {
  const books = await getBooks()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense>
        <Search className="w-full md:w-1/2" />
      </Suspense>

      <h1 className="text-xl py-12">My ebooks</h1>
      <ul className="mx-auto">
        {books.map((book: Book) => (
          <li key={book.slug} className="my-8">
            <div className="flex">
              <Image src={book.cover} width={80} height={80} alt={book.title} />
              <Link href={`/${book.slug}`} className="underline my-auto ml-8">
                {book.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
