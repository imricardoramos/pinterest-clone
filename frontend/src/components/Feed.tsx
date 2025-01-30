"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import PinCard from "./PinCard";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Paginated, Pin } from "@/types";

type FeedProps = {
  includeFooter?: boolean;
  filters?: string;
  pins?: Pin[];
};
export default function Feed({
  includeFooter = false,
  filters,
  pins = [],
}: FeedProps) {
  const [pinsData, setPinsData] = useState<Pin[]>(pins);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState<number | null>(0);

  const loadMore = useCallback(async () => {
    if (nextPage == null) return;
    setLoading(true);
    const response = await axios.get<Paginated<Pin[]>>(
      `/pin/?${filters}&limit=20&offset=${20 * nextPage}`,
    );
    setPinsData([...pinsData, ...response.data.results]);
    setNextPage(response.data.next ? nextPage + 1 : null);
    setLoading(false);
  }, [filters, nextPage, pinsData]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: loading,
    hasNextPage: nextPage != null,
    onLoadMore: loadMore,
  });

  return (
    <div ref={rootRef}>
      <Masonry
        breakpointCols={{ default: 5, 1280: 4, 1024: 3, 768: 2, 640: 1 }}
        className="container mx-auto flex"
        columnClassName="mx-2"
      >
        {pinsData.map((pin, index) => (
          <PinCard
            className="my-10"
            key={index}
            pin={pin}
            includeFooter={includeFooter}
          />
        ))}
        {(loading || nextPage != null) && <div ref={sentryRef}>Loading</div>}
      </Masonry>
    </div>
  );
}
