import { InnerPage } from "@/components/inner-page";

const plans: Array<[string, string, string, string[]]> = [
  ["Foundation", "Starting from Rs 20,000/month", "For businesses building their digital foundation.", ["Digital strategy", "Competitor analysis", "Google Business optimization", "Social media", "12 posts", "4 Reels", "Basic local SEO", "Analytics", "Monthly reporting"]],
  ["Growth", "Starting from Rs 40,000/month", "For businesses connecting acquisition to conversion.", ["Strategy", "Social media", "SEO", "Google Ads management", "Meta Ads management", "Landing page", "Lead-generation funnel", "WhatsApp integration", "CRM setup", "Lead tracking", "Remarketing", "Conversion tracking", "Monthly strategy review"]],
  ["Scale", "Starting from Rs 75,000/month", "For larger clients building operational leverage.", ["Full-funnel strategy", "Advanced SEO", "Paid acquisition", "Social", "CRM", "WhatsApp automation", "Email automation", "Lead qualification", "Remarketing", "CRO", "Analytics", "Weekly optimization", "Strategic reporting"]],
];

export default function PricingPage() {
  return (
    <InnerPage
      eyebrow="Pricing / Indicative scope"
      title={
        <>
          Choose the level of <em>momentum.</em>
        </>
      }
      intro="Pricing is shaped around goals, scope, channels and technology requirements. These starting points make the conversation easier."
    >
      <section className="section shell">
        <div className="pricing-grid">
          {plans.map(([name, price, copy, items], index) => (
            <article className={`price-card${index === 1 ? " price-card-featured" : ""}`} key={name}>
              {index === 1 && <span className="featured-label">Most chosen</span>}
              <p className="eyebrow">{name}</p>
              <h2>{price}</h2>
              <p>{copy}</p>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="button" href="/contact">
                Discuss scope <i>-&gt;</i>
              </a>
            </article>
          ))}
        </div>
        <p className="fine-print">
          Pricing is indicative. Final pricing depends on business goals, scope, channels, advertising requirements and technology requirements. Advertising spend is separate.
        </p>
      </section>
    </InnerPage>
  );
}
