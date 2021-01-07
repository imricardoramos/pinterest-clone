import { useState, useEffect } from 'react'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import PinCard from '../components/PinCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import useInfiniteScroll from 'react-infinite-scroll-hook';

export default function Feed({includeFooter, filters}){
  let [pinsData, setPinsData] = useState([])
  let [loading, setLoading] = useState(false)
  let [nextPage, setNextPage] = useState(0)
  useEffect(() => {
    loadMore()
  }, [])

  async function loadMore(){
    setLoading(true)
    const response = await axios.get(`/pin/?${filters}&limit=20&offset=${20*nextPage}`)
    setPinsData([...pinsData, ...response.data.results])
    setNextPage(response.data.next ? nextPage + 1 : null)
    setLoading(false)
  }

  const infiniteRef = useInfiniteScroll({
    loading: loading,
    hasNextPage: (nextPage != null),
    onLoadMore: loadMore,
    threshold: 2000,
  });

  return (
      <div ref={infiniteRef}>
      <Masonry
        breakpointCols={{ default: 5, 1280: 4, 1024: 3, 768: 2, 640: 1 }}
        className="container mx-auto flex"
        columnClassName="mx-2"
      >
        { pinsData.map((pin, index) => 
          <PinCard className="my-10" key={index} pin={pin} includeFooter={includeFooter} />
        ) }
      </Masonry>
      </div>
  )
}
