import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Alex Cinisi Photography. Information about data collection, cookies, and your rights under GDPR.',
  robots: 'noindex, follow',
  alternates: { canonical: 'https://alexcinisiphotography.com/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <span>Privacy Policy</span>
      </div>

      <section className="legal-page">
        <div className="legal-max">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">Last updated: 15 May 2026 &middot; Policy version: 1.1</p>

          <div className="legal-body">

            <h2>1. Data Controller</h2>
            <p>
              Alex Cinisi Photography<br />
              Via Enrico Fermi, 45<br />
              90010 Ficarazzi (PA), Italy
            </p>
            <p>
              P.IVA: IT06799650822<br />
              Email: <a href="mailto:info@alexcinisiphotography.com">info@alexcinisiphotography.com</a><br />
              PEC: alexcinisi@pec.it<br />
              Website: alexcinisiphotography.com
            </p>
            <p>(Hereinafter referred to as &quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;the Data Controller&quot;)</p>

            <h2>2. What This Policy Covers</h2>
            <p>This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit our website, submit an enquiry through our contact form, or interact with our services. It is provided in accordance with Article 13 of the EU General Data Protection Regulation (Regulation 2016/679, &quot;GDPR&quot;) and Italian Legislative Decree 196/2003, as amended by Legislative Decree 101/2018.</p>

            <h2>3. Data We Collect</h2>

            <h3>3a. Data you provide directly</h3>
            <p>When you fill out our contact form, you may provide:</p>
            <ul>
              <li>Your name and your partner&apos;s name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Wedding date and venue</li>
              <li>Instagram handle (optional)</li>
              <li>A description of your wedding story and vision</li>
              <li>Service preferences (wedding photography, elopement, couple session)</li>
            </ul>

            <h3>3b. Data collected automatically</h3>
            <p>When you browse our website, the following data may be collected through cookies and similar technologies (only after you provide consent):</p>
            <ul>
              <li>IP address (anonymised by Google Analytics 4)</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Pages visited, time on page, and navigation path</li>
              <li>Referring URL</li>
              <li>Approximate geographic location (city-level, derived from IP)</li>
              <li>Click, scroll, and interaction patterns (via Microsoft Clarity session recordings)</li>
              <li>Advertising-related data: clicks on our Meta advertisements, browsing actions on our website following an ad click, and engagement events such as form submissions or contact actions (via Meta Pixel, only with marketing cookie consent)</li>
            </ul>

            <h3>3c. Data we do NOT collect</h3>
            <p>We do not collect sensitive personal data as defined by Article 9 GDPR (racial or ethnic origin, political opinions, religious beliefs, health data, sexual orientation, biometric data, etc.).</p>

            <h2>4. Purposes and Legal Bases</h2>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Purpose</th>
                    <th>Data involved</th>
                    <th>Legal basis (GDPR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Responding to your enquiry and providing a proposal</td>
                    <td>Name, email, phone, wedding details</td>
                    <td>Art. 6(1)(b) — Performance of a contract or pre-contractual measures</td>
                  </tr>
                  <tr>
                    <td>Website analytics (understanding traffic and behaviour)</td>
                    <td>Browsing data, cookies</td>
                    <td>Art. 6(1)(a) — Your explicit consent</td>
                  </tr>
                  <tr>
                    <td>Session recordings and heatmaps (improving user experience)</td>
                    <td>Interaction data, anonymised browsing</td>
                    <td>Art. 6(1)(a) — Your explicit consent</td>
                  </tr>
                  <tr>
                    <td>Website functionality (essential cookies)</td>
                    <td>Technical cookies</td>
                    <td>Art. 6(1)(f) — Legitimate interest</td>
                  </tr>
                  <tr>
                    <td>Measuring effectiveness of our advertising on Meta platforms (Facebook, Instagram)</td>
                    <td>Browsing data, advertising click data, form interaction events</td>
                    <td>Art. 6(1)(a) — Your explicit consent</td>
                  </tr>
                  <tr>
                    <td>Building remarketing audiences for Meta advertising campaigns</td>
                    <td>Browsing behaviour, advertising identifiers</td>
                    <td>Art. 6(1)(a) — Your explicit consent</td>
                  </tr>
                  <tr>
                    <td>Compliance with legal obligations</td>
                    <td>All data as needed</td>
                    <td>Art. 6(1)(c) — Legal obligation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>You may withdraw your consent at any time by adjusting your cookie preferences via the &quot;Cookie Preferences&quot; link in our website footer, or by contacting us at the email address above. Withdrawing consent does not affect the lawfulness of processing carried out prior to withdrawal.</p>

            <h2>5. How We Use Your Data</h2>
            <p>We use the data collected to:</p>
            <ul>
              <li>Respond to your enquiry and prepare a personalised proposal for your wedding photography</li>
              <li>Communicate with you regarding availability, planning, and logistics</li>
              <li>Analyse website traffic and user behaviour to improve our site and services</li>
              <li>Ensure the proper technical functioning of our website</li>
              <li>Comply with applicable legal and tax obligations</li>
            </ul>
            <p>We do not use automated decision-making or profiling that produces legal effects on you.</p>

            <h2>6. Data Recipients and Processors</h2>
            <p>Your data may be shared with the following categories of recipients, acting as data processors on our behalf:</p>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Safeguard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Google LLC (Google Analytics 4)</td>
                    <td>Website analytics</td>
                    <td>United States</td>
                    <td>EU-US Data Privacy Framework (adequacy decision 10 July 2023)</td>
                  </tr>
                  <tr>
                    <td>Google LLC (Google Tag Manager)</td>
                    <td>Tag management</td>
                    <td>United States</td>
                    <td>EU-US Data Privacy Framework</td>
                  </tr>
                  <tr>
                    <td>Microsoft Corporation (Clarity)</td>
                    <td>Heatmaps and session recordings</td>
                    <td>United States</td>
                    <td>EU-US Data Privacy Framework</td>
                  </tr>
                  <tr>
                    <td>Vercel Inc.</td>
                    <td>Website hosting</td>
                    <td>United States</td>
                    <td>EU-US Data Privacy Framework</td>
                  </tr>
                  <tr>
                    <td>Sanity AS</td>
                    <td>Content management system</td>
                    <td>Norway (EEA)</td>
                    <td>Adequate protection (EEA member)</td>
                  </tr>
                  <tr>
                    <td>Meta Platforms Ireland Ltd.</td>
                    <td>Advertising measurement, remarketing audiences, ad optimisation (Meta Pixel)</td>
                    <td>Ireland (EU); data may be transferred to United States</td>
                    <td>EU-US Data Privacy Framework</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>We do not sell, rent, or trade your personal data to third parties for their own marketing purposes.</p>

            <h2>7. International Data Transfers</h2>
            <p>Some of our service providers are based in the United States. These transfers are protected by the EU-US Data Privacy Framework, for which the European Commission adopted an adequacy decision on 10 July 2023 (Commission Implementing Decision C(2023) 4745). This framework ensures that personal data transferred to certified US organisations receives a level of protection essentially equivalent to that guaranteed within the European Union.</p>
            <p>Should the legal framework for international transfers change, we will take appropriate measures to ensure continued adequate protection of your data, such as adopting Standard Contractual Clauses (SCCs) approved by the European Commission.</p>

            <h2>8. Data Retention</h2>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Data type</th>
                    <th>Retention period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Contact form submissions</td>
                    <td>24 months from submission, unless a contract is established</td>
                  </tr>
                  <tr>
                    <td>Client data (contracted weddings)</td>
                    <td>10 years (Italian tax and civil law obligations)</td>
                  </tr>
                  <tr>
                    <td>Analytics data (GA4)</td>
                    <td>14 months (configured in GA4 settings)</td>
                  </tr>
                  <tr>
                    <td>Session recordings (Clarity)</td>
                    <td>13 months (Microsoft Clarity default)</td>
                  </tr>
                  <tr>
                    <td>Cookie consent preferences</td>
                    <td>180 days (6 months, per Italian Data Protection Authority guidelines)</td>
                  </tr>
                  <tr>
                    <td>Meta Pixel data (advertising measurement, remarketing)</td>
                    <td>180 days for browsing data; up to 2 years for aggregated advertising metrics (Meta default retention)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Your cookie consent choice is recorded as a first-party cookie on your device, containing a timestamp, the categories you selected, and the policy version in effect at the time. This serves as a documentable record of your consent in accordance with the Italian Data Protection Authority&apos;s guidelines of 10 June 2021.</p>
            <p>After the retention period expires, data is deleted or anonymised.</p>

            <h2>9. Your Rights</h2>
            <p>Under the GDPR (Articles 15–22), you have the following rights:</p>
            <ul>
              <li><strong>Right of access</strong> (Art. 15) — You may request confirmation of whether we process your personal data and obtain a copy of it.</li>
              <li><strong>Right to rectification</strong> (Art. 16) — You may request the correction of inaccurate data or the completion of incomplete data.</li>
              <li><strong>Right to erasure</strong> (Art. 17) — You may request the deletion of your personal data, subject to applicable legal retention obligations.</li>
              <li><strong>Right to restriction of processing</strong> (Art. 18) — You may request that we limit processing in certain circumstances.</li>
              <li><strong>Right to data portability</strong> (Art. 20) — You may request your data in a structured, commonly used, machine-readable format.</li>
              <li><strong>Right to object</strong> (Art. 21) — You may object to processing based on legitimate interest.</li>
              <li><strong>Right to withdraw consent</strong> — You may withdraw consent at any time for processing based on consent, without affecting the lawfulness of prior processing.</li>
            </ul>
            <p>To exercise any of these rights, please contact us at: <strong><a href="mailto:info@alexcinisiphotography.com">info@alexcinisiphotography.com</a></strong></p>
            <p>We will respond to your request within 30 days, as required by the GDPR.</p>
            <p>You also have the right to lodge a complaint with the Italian Data Protection Authority (Garante per la protezione dei dati personali):</p>
            <p>
              <strong>Garante per la protezione dei dati personali</strong><br />
              Piazza Venezia, 11 — 00187 Roma<br />
              Website: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a><br />
              Email: garante@gpdp.it<br />
              PEC: protocollo@pec.gpdp.it
            </p>

            <h2>10. Cookies</h2>
            <p>Our website uses cookies and similar technologies. For detailed information about the cookies we use, their purpose, and duration, please see our <Link href="/cookie-policy">Cookie Policy</Link>.</p>
            <p>You can manage your cookie preferences at any time by clicking the &quot;Cookie Preferences&quot; link in our website footer.</p>

            <h2>11. Intellectual Property and Copyright</h2>
            <p>All photographs, images, text, graphic elements, logos, and other content published on this website are the exclusive property of Alex Cinisi Photography and are protected by Italian law (Law 633/1941 on Copyright) and international intellectual property treaties.</p>
            <p>You may not copy, reproduce, distribute, republish, download, display, post, or transmit any of the content on this website in any form or by any means without the prior written consent of Alex Cinisi Photography.</p>
            <p>Photographs displayed on this website are shown with the consent of the clients depicted. Any unauthorised use of these images is strictly prohibited and may result in legal action.</p>

            <h2>12. Security Measures</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include:</p>
            <ul>
              <li>HTTPS encryption for all data in transit</li>
              <li>Secure hosting infrastructure with Vercel (SOC 2 Type II certified)</li>
              <li>Access to personal data limited to the Data Controller only</li>
              <li>Regular review of security measures</li>
            </ul>

            <h2>13. Children&apos;s Data</h2>
            <p>Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe that we have inadvertently collected data from a minor, please contact us and we will promptly delete it.</p>

            <h2>14. Changes to This Policy</h2>
            <p>We may update this Privacy Policy to reflect changes in our practices or applicable legislation. Any updates will be published on this page with a revised &quot;Last updated&quot; date. We encourage you to review this page periodically.</p>

            <h2>15. Contact</h2>
            <p>
              For any questions or concerns regarding this Privacy Policy or your personal data, please contact:
            </p>
            <p>
              Alex Cinisi Photography<br />
              Email: <a href="mailto:info@alexcinisiphotography.com">info@alexcinisiphotography.com</a><br />
              PEC: alexcinisi@pec.it<br />
              Address: Via Enrico Fermi, 45 — 90010 Ficarazzi (PA), Italy<br />
              P.IVA: IT06799650822
            </p>

          </div>
        </div>
      </section>
    </>
  )
}
