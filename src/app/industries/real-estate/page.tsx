import { InnerPage } from "@/components/inner-page";

const funnel = ["Google / Meta / SEO", "Property content", "Landing page", "WhatsApp / lead form", "CRM", "Lead qualification", "Sales follow-up", "Site visit", "Conversion"];
const capabilities = ["Meta Ads for property discovery and demand capture", "Google Ads for high-intent property searches", "Property landing pages with clear enquiry paths", "WhatsApp and lead forms for fast contact", "CRM setup and lead qualification", "Remarketing for considered purchase journeys", "Analytics across enquiry, visit and conversion"];

export default function RealEstatePage() {
	return <InnerPage eyebrow="Industry / Real estate" title={<>Build a digital acquisition engine for your <em>real estate business.</em></>} intro="Connect property content, paid acquisition, landing pages, WhatsApp and CRM follow-up into one clearer path to a site visit.">
		<section className="section shell">
			<div className="industry-signal"><div><p className="eyebrow">Property growth system</p><h2>From discovery to <em>site visit.</em></h2></div><div className="industry-signal-stat"><strong>09</strong><span>connected stages</span></div></div>
			<div className="detail-shell">
				<div className="detail-panel"><p className="eyebrow">Recommended funnel</p><div className="flow-list">{funnel.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div></div>
				<div className="detail-panel accent-panel"><p className="eyebrow">What the system connects</p><ul className="detail-list"><li>Demand capture</li><li>Property intent</li><li>Fast response</li><li>Sales visibility</li><li>Site-visit momentum</li></ul></div>
			</div>
			<div className="detail-grid"><div className="detail-card"><p className="eyebrow">Capabilities</p><ul className="detail-list">{capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul></div><div className="detail-card"><p className="eyebrow">Why it matters</p><p>Real-estate decisions involve comparison, trust and timing. A connected system gives each property a clearer path from discovery to enquiry, helps teams qualify intent and makes follow-up easier to measure.</p></div></div>
		</section>
	</InnerPage>;
}
