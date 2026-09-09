import { InnerPage } from "@/components/inner-page";
import { blogPosts } from "@/lib/content";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <InnerPage
      eyebrow="Resources / Useful thinking"
      title={
        <>
          Ideas for building a <em>better growth system.</em>
        </>
      }
      intro="A practical, CMS-ready library of notes for strategy, marketing, automation, website design and operational clarity."
    >
      <section className="section shell">
        <div className="industry-grid">
          {blogPosts.map((resource, index) => (
            <Link className="industry-card resource-card" href={`/blog/${resource.slug}`} key={resource.title}>
              <span>0{index + 1}</span>
              <h2>{resource.title}</h2>
              <p>{resource.category} / {resource.readingTime}</p>
              <p>{resource.summary}</p>
              <i>-&gt;</i>
            </Link>
          ))}
        </div>
      </section>
    </InnerPage>
  );
}
