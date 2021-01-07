import { useState } from 'react'
import { useRouter } from 'next/router'

function SearchBar(props) {
  const router = useRouter()
  const searchQuery = router.query.q || ""
  const [searchValue, setSearchValue] = useState(searchQuery)
  const handleSubmit = e => {
    e.preventDefault()
    router.push(`/search/pins/?q=${searchValue}`)
  }
  return (
    <form className="flex-grow mx-2" onSubmit={handleSubmit}>
      <input className="rounded-3xl w-full px-4 py-2 bg-gray-200" placeholder="Search" onChange={e => setSearchValue(e.target.value)} value={searchValue} />
    </form>
  )
}
export default SearchBar
