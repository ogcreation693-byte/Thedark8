import { InnerPage } from "@/components/inner-page";

const industries = [
  ["Real estate", "real-estate", "Property marketing systems, lead qualification and sales follow-up."],
  ["Manufacturing", "manufacturing", "B2B acquisition built around technical products, RFQs and distributors."],
  ["Healthcare", "healthcare", "Local visibility, patient acquisition and useful digital engagement."],
  ["Education", "education", "Admission funnels designed to help the right enquiries move forward."],
  ["Retail", "retail", "E-commerce, local acquisition and customer retention."],
  ["Hospitality", "hospitality", "Direct booking, local discovery and customer acquisition."],
];

export default function IndustriesPage() {
  return (
    <InnerPage
      eyebrow="Industries / Context matters"
      title={
        <>
          Growth systems shaped for <em>your market.</em>
        </>
      }
      intro="The right funnel depends on how your customers decide, compare and buy. Start with an industry lens, then make it specific to your business."
    >
      <section className="section shell">
        <div className="industry-grid">
          {industries.map(([name, slug, copy], index) => (
            <a className="industry-card" href={`/industries/${slug}`} key={name}>
              <span>0{index + 1}</span>
              <div className="industry-card-title"><h2>{name}</h2><span>Explore market system</span></div>
              <p>{copy}</p>
              <i>-&gt;</i>
            </a>
          ))}
        </div>
      </section>
    </InnerPage>
  );
}
