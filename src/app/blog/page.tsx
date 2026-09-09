import { InnerPage } from "@/components/inner-page";
import Link from "next/link";
import { blogPosts } from "@/lib/content";

export default function BlogPage() {
  return (
    <InnerPage
      eyebrow="Blog / Resources"
      title={
        <>
          Useful ideas for <em>better growth systems.</em>
        </>
      }
      intro="Practical thinking for digital marketing, SEO, automation, AI and the operational systems behind sustainable growth."
    >
      <section className="section shell">
        <div className="industry-grid">
          {blogPosts.map((post, index) => (
            <Link className="industry-card blog-card" href={`/blog/${post.slug}`} key={post.title}>
              <span>0{index + 1}</span>
              <h2>{post.title}</h2>
              <p>{post.category} / {post.readingTime}</p>
              <p>{post.summary}</p>
              <i>-&gt;</i>
            </Link>
          ))}
        </div>
      </section>
    </InnerPage>
  );
}
