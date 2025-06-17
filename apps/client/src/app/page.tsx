import Hero from "@/components/Hero";
import Posts from "@/components/post/Posts";
import { fetchPosts } from "@/lib/actions/post.action";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  const { totalPosts, posts } = await fetchPosts({
    page: page ? +page : undefined,
  });

  return (
    <main>
      <Hero />

      <Posts
        posts={posts}
        currentPage={page ? +page : 1}
        totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
      />
    </main>
  );
}