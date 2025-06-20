"use client";

import Hero from "@/components/Hero";
import Posts from "@/components/post/Posts";
import { usePostStore } from "@/stores/usePostStore";
import { DEFAULT_PAGE_SIZE } from "@/utils/services/constants";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const [dataLoaded, setDataLoaded] = useState(false);

  const { getAllPosts, posts, totalPosts, isLoading } = usePostStore();

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  useEffect(() => {
    const fetchData = async () => {
      await getAllPosts(0, 12);
      setDataLoaded(true);
    };

    fetchData();
  }, [getAllPosts, searchParams]);

  return (
    <main>
      <Hero />

      {dataLoaded && (
        <Posts
          posts={posts}
          currentPage={currentPage}
          totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
          isLoading={isLoading}
        />
      )}
    </main>
  );
}