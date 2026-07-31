import Link from 'next/link';
import { LegalPageLayout } from '@/components/LegalPageLayout';
import { routes } from '@/lib/routes';
import { siteConfig } from '@/lib/seo/metadata';

export function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="25 June 2025">
      <p>
        This Cookie Policy explains how {siteConfig.name} (&quot;Clair Lighting,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;) uses cookies and similar technologies when you visit our
        website at{' '}
        <a href={siteConfig.url} className="text-brand-orange hover:underline">
          {siteConfig.url.replace(/^https?:\/\//, '')}
        </a>{' '}
        (the &quot;Website&quot;).
      </p>
      <p>
        For information about how we handle personal data more broadly, please see our{' '}
        <Link href={routes.privacyPolicy} className="text-brand-orange hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files placed on your device when you visit a website. They help
        websites function properly, remember preferences, and understand how visitors use the site.
        Similar technologies include local storage, session storage, and pixels.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>
        Clair Lighting uses a limited number of cookies and similar technologies to operate the
        Website and improve your experience. We do not currently use third-party advertising or
        behavioural tracking cookies on this Website.
      </p>

      <h2>3. Types of Cookies We Use</h2>

      <h3>Strictly necessary cookies</h3>
      <p>
        These cookies are essential for the Website to function and cannot be switched off in our
        systems. They are usually set in response to actions you take, such as navigating between
        pages or submitting a form.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie / technology</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Next.js session cookies</td>
            <td>Maintain basic site functionality and routing during your visit.</td>
            <td>Session</td>
          </tr>
        </tbody>
      </table>

      <h3>Functional cookies</h3>
      <p>
        These cookies enable enhanced functionality and personalisation, such as remembering choices
        you make on the Website.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie / technology</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Browser local storage</td>
            <td>May store UI preferences or temporary state for site features.</td>
            <td>Until cleared by you</td>
          </tr>
        </tbody>
      </table>

      <h3>Third-party cookies</h3>
      <p>
        Some features on our Website rely on third-party services that may set their own cookies or
        collect technical data:
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Purpose</th>
            <th>More information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FormSubmit (formsubmit.co)</td>
            <td>Processes contact, quote, and franchise form submissions.</td>
            <td>
              <a
                href="https://formsubmit.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-orange hover:underline"
              >
                formsubmit.co
              </a>
            </td>
          </tr>
          <tr>
            <td>Sanity.io</td>
            <td>Delivers CMS content and media assets used on the Website.</td>
            <td>
              <a
                href="https://www.sanity.io/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-orange hover:underline"
              >
                Sanity Privacy Policy
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>4. Fonts and Content Delivery</h2>
      <p>
        Our Website uses the Barlow typeface loaded through Next.js font optimisation. Fonts are
        typically self-hosted as part of the Website build, which means your browser generally does
        not need to connect directly to Google Fonts when viewing pages. Content and images may be
        served from our hosting provider or Sanity&apos;s content delivery network.
      </p>

      <h2>5. Analytics</h2>
      <p>
        We do not currently deploy analytics or advertising cookies such as Google Analytics or
        Meta Pixel on this Website. If we introduce analytics tools in the future, we will update
        this Cookie Policy and, where required by law, obtain your consent before placing non-essential
        cookies.
      </p>

      <h2>6. Managing Cookies</h2>
      <p>You can control cookies in several ways:</p>
      <ul>
        <li>
          <strong>Browser settings:</strong> Most browsers allow you to block or delete cookies. Refer
          to your browser&apos;s help documentation for instructions.
        </li>
        <li>
          <strong>Device settings:</strong> Mobile devices may offer settings to limit tracking or
          reset advertising identifiers.
        </li>
        <li>
          <strong>Clear stored data:</strong> You can clear local storage and cached data through
          your browser settings.
        </li>
      </ul>
      <p>
        Please note that blocking strictly necessary cookies may affect Website functionality,
        including form submissions and page navigation.
      </p>

      <h2>7. Do Not Track</h2>
      <p>
        Some browsers include a &quot;Do Not Track&quot; (DNT) feature. Because there is no
        consistent industry standard for responding to DNT signals, the Website does not currently
        respond to DNT browser settings.
      </p>

      <h2>8. Changes to This Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in technology, legal
        requirements, or our practices. The &quot;Last updated&quot; date at the top of this page
        shows when the policy was last revised.
      </p>

      <h2>9. Contact Us</h2>
      <p>If you have questions about our use of cookies, please contact us:</p>
      <p>
        {siteConfig.name}
        <br />
        {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality},{' '}
        {siteConfig.address.postalCode}, {siteConfig.address.addressCountry}
        <br />
        Email:{' '}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-orange hover:underline">
          {siteConfig.email}
        </a>
        <br />
        Phone: {siteConfig.phone}
      </p>
    </LegalPageLayout>
  );
}
