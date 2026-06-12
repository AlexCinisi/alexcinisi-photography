import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for Alex Cinisi Photography. Details about cookies used, their purpose, duration, and how to manage your preferences.',
  robots: 'noindex, follow',
}

export default function CookiePolicyPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <span>Cookie Policy</span>
      </div>

      <section className="legal-page">
        <div className="legal-max">
          <h1 className="legal-title">Cookie Policy</h1>
          <p className="legal-meta">Last updated: 15 May 2026 &middot; Policy version: 1.1</p>

          <div className="legal-body">

            <h2>1. What Are Cookies</h2>
            <p>Cookies are small text files that websites place on your device (computer, tablet, or smartphone) when you visit them. They are widely used to make websites work efficiently, provide information to website owners, and enhance the user experience.</p>
            <p>This Cookie Policy explains which cookies are used on <strong>alexcinisiphotography.com</strong>, their purpose, and how you can manage your preferences. This policy is provided in accordance with the EU General Data Protection Regulation (GDPR), the ePrivacy Directive (2002/58/EC), and the guidelines issued by the Italian Data Protection Authority (Garante per la protezione dei dati personali) on 10 June 2021.</p>

            <h2>2. Types of Cookies We Use</h2>

            <h3>2a. Essential Cookies (Strictly Necessary)</h3>
            <p>These cookies are required for the basic functionality of the website. They do not require your consent.</p>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr><th>Cookie name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  <tr><td>cookie_consent</td><td>alexcinisiphotography.com</td><td>Stores your cookie preference choice (accept, reject, or custom selection)</td><td>180 days</td></tr>
                </tbody>
              </table>
            </div>

            <h3>2b. Analytics Cookies</h3>
            <p>These cookies help us understand how visitors interact with our website by collecting anonymous usage data. They are set <strong>only after you provide consent</strong>.</p>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr><th>Cookie name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  <tr><td>_ga</td><td>Google (Analytics 4)</td><td>Assigns a unique client ID to distinguish individual users across sessions</td><td>Up to 2 years (effective ~13 months due to browser limits)</td></tr>
                  <tr><td>_ga_[container-id]</td><td>Google (Analytics 4)</td><td>Maintains session state and groups pageviews within a single visit</td><td>Up to 2 years (effective ~13 months)</td></tr>
                </tbody>
              </table>
            </div>

            <h3>2c. Analytics Cookies — Session Recordings and Heatmaps</h3>
            <p>These cookies enable Microsoft Clarity to record anonymised user sessions and generate heatmaps, helping us identify usability issues and improve the site experience. They are set <strong>only after you provide consent</strong>.</p>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr><th>Cookie name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  <tr><td>_clck</td><td>Microsoft (Clarity)</td><td>Stores a unique user ID to recognise returning visitors</td><td>1 year</td></tr>
                  <tr><td>_clsk</td><td>Microsoft (Clarity)</td><td>Groups multiple pageviews into a single session recording</td><td>1 day</td></tr>
                  <tr><td>CLID</td><td>Microsoft (Clarity)</td><td>Identifies the first time a user was seen across any site using Clarity</td><td>1 year</td></tr>
                  <tr><td>ANONCHK</td><td>Microsoft (Clarity)</td><td>Checks whether the browser ID (MUID) is transferred to a Microsoft advertising cookie. For Clarity, this is always set to 0.</td><td>10 minutes</td></tr>
                  <tr><td>MR</td><td>Microsoft (Clarity)</td><td>Indicates whether to refresh the MUID cookie</td><td>7 days</td></tr>
                  <tr><td>MUID</td><td>Microsoft (Clarity)</td><td>Microsoft user identifier used across Microsoft sites for analytics and operational purposes</td><td>1 year</td></tr>
                </tbody>
              </table>
            </div>

            <h3>2d. Marketing Cookies</h3>
            <p>These cookies enable us to measure the effectiveness of our advertising on Meta platforms (Facebook and Instagram), build remarketing audiences, and optimise our ad campaigns. They are set <strong>only after you provide consent</strong> through the Marketing category in our cookie banner.</p>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr><th>Cookie name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  <tr><td>_fbp</td><td>Meta Platforms Ireland Ltd. (Facebook)</td><td>Identifies the browser for advertising measurement and audience building</td><td>90 days</td></tr>
                  <tr><td>_fbc</td><td>Meta Platforms Ireland Ltd. (Facebook)</td><td>Stores the click ID of a Meta advertisement that brought you to the website</td><td>90 days</td></tr>
                  <tr><td>fr</td><td>Meta Platforms Ireland Ltd. (Facebook)</td><td>Encrypted user identifier used for ad personalisation (only set if you are logged into Facebook)</td><td>90 days</td></tr>
                </tbody>
              </table>
            </div>
            <p>Meta Pixel collects information about your browsing on our website (pages visited, actions taken, device information, IP address) and transmits it to Meta for advertising measurement, remarketing, and ad optimisation purposes. Data is processed by Meta Platforms Ireland Ltd. (data controller for EU users) and may be transferred to Meta Platforms Inc. in the United States under the EU-US Data Privacy Framework.</p>
            <p>For detailed information on how Meta uses this data, please refer to Meta&apos;s <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer">Cookie Policy</a>.</p>

            <h2>3. Third-Party Cookies</h2>
            <p>Some cookies listed above are set by third-party services (Google, Microsoft, and Meta). These services may also set additional cookies not listed here, governed by their own privacy policies:</p>
            <ul>
              <li><strong>Google Privacy Policy:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li>
              <li><strong>Microsoft Privacy Statement:</strong> <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer">privacy.microsoft.com</a></li>
              <li><strong>Microsoft Clarity Documentation:</strong> <a href="https://learn.microsoft.com/en-us/clarity/" target="_blank" rel="noopener noreferrer">learn.microsoft.com/clarity</a></li>
              <li><strong>Meta Privacy Policy:</strong> <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">facebook.com/privacy/policy</a></li>
              <li><strong>Meta Cookie Policy:</strong> <a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer">facebook.com/policies/cookies</a></li>
            </ul>

            <h2>4. How to Manage Your Cookie Preferences</h2>

            <h3>4a. Through our cookie banner</h3>
            <p>When you first visit our website, a cookie consent banner is displayed. You can:</p>
            <ul>
              <li><strong>Accept All</strong> — Enable all cookie categories (analytics and marketing)</li>
              <li><strong>Reject All</strong> — Block all non-essential cookies</li>
              <li><strong>Customise Preferences</strong> — Choose which categories to enable or disable</li>
            </ul>
            <p>Your choice is saved for <strong>180 days</strong> (6 months). After this period, you will be asked again.</p>
            <p>You can change your preferences at any time by clicking the <strong>&quot;Cookie Preferences&quot;</strong> link in the website footer.</p>

            <h3>4b. Through your browser settings</h3>
            <p>You can also manage cookies directly through your browser. Below are links to cookie management instructions for common browsers:</p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
            <p>Please note that blocking all cookies may affect the functionality of some website features.</p>

            <h2>5. Google Consent Mode v2</h2>
            <p>Our website uses Google Consent Mode v2 to ensure that Google Analytics and other Google services respect your cookie choices. This means:</p>
            <ul>
              <li><strong>Before you make a choice:</strong> All analytics and marketing cookies are blocked by default. No tracking data is collected.</li>
              <li><strong>If you accept analytics cookies:</strong> Google Analytics begins collecting anonymised usage data.</li>
              <li><strong>If you reject cookies:</strong> No analytics or marketing cookies are set. Your browsing remains completely private.</li>
            </ul>
            <p>This implementation ensures full compliance with the requirements of the Italian Data Protection Authority and the EU ePrivacy Directive.</p>

            <h2>6. Data Transfers</h2>
            <p>Cookies from Google and Microsoft may involve the transfer of data to servers located in the United States. These transfers are protected by the EU-US Data Privacy Framework (adequacy decision adopted by the European Commission on 10 July 2023). For more information, see Section 7 of our <Link href="/privacy">Privacy Policy</Link>.</p>

            <h2>7. Updates to This Policy</h2>
            <p>We may update this Cookie Policy when we add new services, change our cookie practices, or when required by law. Updates will be reflected in the &quot;Last updated&quot; date at the top of this page. If significant changes are made, the policy version number will be incremented, and returning visitors will be asked to review their cookie preferences.</p>

            <h2>8. Contact</h2>
            <p>For any questions about this Cookie Policy, please contact:</p>
            <p>
              Alex Cinisi Photography<br />
              Email: <a href="mailto:info@alexcinisiphotography.com">info@alexcinisiphotography.com</a><br />
              Address: Via Enrico Fermi, 45 — 90010 Ficarazzi (PA), Italy
            </p>

            <h2>9. Your Rights and the Supervisory Authority</h2>
            <p>You have the right to withdraw your consent at any time and to lodge a complaint with the Italian Data Protection Authority:</p>
            <p>
              <strong>Garante per la protezione dei dati personali</strong><br />
              Piazza Venezia, 11 — 00187 Roma<br />
              Website: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a><br />
              Email: garante@gpdp.it
            </p>

          </div>
        </div>
      </section>
    </>
  )
}
