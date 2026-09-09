import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { blogPosts } from "@/lib/content";

type BlogPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: `${post.seoTitle} | TheDark8 Tech`,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.seoTitle, description: post.metaDescription, type: "article" },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "TheDark8 Tech" },
    mainEntityOfPage: `/blog/${post.slug}`,
    ...(post.date ? { datePublished: post.date } : {}),
  };

  return <InnerPage eyebrow={`Blog / ${post.category} / ${post.readingTime}`} title={<>{post.title}</>} intro={post.summary}>
    <article className="section shell legal-copy blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <p className="eyebrow">{new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(`${post.date}T00:00:00`))} / {post.author}</p>
      {post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
    </article>
  </InnerPage>;
}
