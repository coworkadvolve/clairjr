import Link from 'next/link';
import { LegalPageLayout } from '@/components/LegalPageLayout';
import { routes } from '@/lib/routes';
import { siteConfig } from '@/lib/seo/metadata';

export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="25 June 2025">
      <p>
        This Privacy Policy describes how {siteConfig.name} (&quot;Clair Lighting,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects personal information when you
        visit our website at{' '}
        <a href={siteConfig.url} className="text-brand-orange hover:underline">
          {siteConfig.url.replace(/^https?:\/\//, '')}
        </a>{' '}
        (the &quot;Website&quot;) or interact with our services.
      </p>

      <h2>1. Who We Are</h2>
      <p>
        {siteConfig.name} is an ISO 9001 certified LED lighting manufacturer headquartered in India.
        We provide commercial, industrial, and architectural lighting solutions to businesses,
        contractors, and partners worldwide.
      </p>
      <p>
        <strong>Registered address:</strong> {siteConfig.address.streetAddress},{' '}
        {siteConfig.address.addressLocality}, {siteConfig.address.postalCode},{' '}
        {siteConfig.address.addressCountry}
        <br />
        <strong>Email:</strong>{' '}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-orange hover:underline">
          {siteConfig.email}
        </a>
        <br />
        <strong>Phone:</strong> {siteConfig.phone}
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect the following types of information:</p>

      <h3>Information you provide directly</h3>
      <ul>
        <li>
          <strong>Contact form:</strong> name, email address, phone number (optional), company name
          (optional), inquiry type, and message content.
        </li>
        <li>
          <strong>Quote request form:</strong> name, email address, phone number, company name
          (optional), product of interest, and additional details you choose to share.
        </li>
        <li>
          <strong>Franchise application form:</strong> name, email address, phone number, city,
          business experience (optional), investment capacity (optional), and message content.
        </li>
        <li>
          <strong>Communications:</strong> information you provide when you email us or otherwise
          contact our sales or support teams.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Technical data:</strong> browser type, device type, operating system, IP address,
          referring URLs, pages viewed, and approximate location derived from IP address.
        </li>
        <li>
          <strong>Usage data:</strong> how you navigate the Website, including products or catalogues
          you view and files you download.
        </li>
      </ul>
      <p>
        For details on cookies and similar technologies, please see our{' '}
        <Link href={routes.cookiePolicy} className="text-brand-orange hover:underline">
          Cookie Policy
        </Link>
        .
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>We use personal information to:</p>
      <ul>
        <li>Respond to inquiries, quote requests, and franchise applications.</li>
        <li>Provide product information, technical support, and sales assistance.</li>
        <li>Send confirmation or follow-up communications related to your request.</li>
        <li>Improve our Website, products, and customer experience.</li>
        <li>Maintain the security and integrity of our Website.</li>
        <li>Comply with applicable legal obligations.</li>
      </ul>
      <p>
        We do not sell your personal information. We do not use your information for unrelated
        marketing without your consent.
      </p>

      <h2>4. Legal Basis for Processing</h2>
      <p>Depending on your location and the nature of the processing, we rely on:</p>
      <ul>
        <li>
          <strong>Consent:</strong> when you submit a form or otherwise provide information to us.
        </li>
        <li>
          <strong>Legitimate interests:</strong> to operate and improve our business, respond to
          inquiries, and protect our Website.
        </li>
        <li>
          <strong>Legal obligation:</strong> where required by applicable law.
        </li>
      </ul>
      <p>
        If you are located in India, we process personal data in accordance with the Digital
        Personal Data Protection Act, 2023 (DPDP Act), and other applicable Indian laws.
      </p>

      <h2>5. Third-Party Service Providers</h2>
      <p>
        We use trusted third parties to help operate the Website. These providers may process
        personal information on our behalf:
      </p>
      <ul>
        <li>
          <strong>FormSubmit (formsubmit.co):</strong> processes contact, quote, and franchise form
          submissions and delivers them to our team by email.
        </li>
        <li>
          <strong>Sanity.io:</strong> hosts product and website content served through our content
          management system.
        </li>
        <li>
          <strong>Hosting and infrastructure providers:</strong> store and deliver the Website.
        </li>
      </ul>
      <p>
        These providers are permitted to use your information only as necessary to perform services
        for us and are expected to maintain appropriate security measures.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain personal information only for as long as necessary to fulfil the purposes described
        in this policy, including responding to your inquiry, maintaining business records, and
        meeting legal or regulatory requirements. When information is no longer needed, we take
        reasonable steps to delete or anonymise it.
      </p>

      <h2>7. Data Security</h2>
      <p>
        We implement reasonable administrative, technical, and organisational safeguards to protect
        personal information against unauthorised access, alteration, disclosure, or destruction.
        However, no method of transmission over the Internet or electronic storage is completely
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>8. International Transfers</h2>
      <p>
        Clair Lighting operates from India and serves clients internationally. Your information may
        be processed in India or in other countries where our service providers operate. Where
        required, we take steps to ensure appropriate safeguards are in place for cross-border data
        transfers.
      </p>

      <h2>9. Your Rights</h2>
      <p>
        Depending on applicable law, you may have the right to access, correct, update, or delete
        your personal information, withdraw consent, or object to certain processing. Under the DPDP
        Act, you may also have the right to nominate another person to exercise your rights in the
        event of death or incapacity.
      </p>
      <p>
        To exercise your rights, contact us at{' '}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-orange hover:underline">
          {siteConfig.email}
        </a>
        . We may need to verify your identity before responding to your request.
      </p>

      <h2>10. Children&apos;s Privacy</h2>
      <p>
        Our Website is intended for business and professional use and is not directed at children
        under 18 years of age. We do not knowingly collect personal information from children. If
        you believe we have collected information from a child, please contact us so we can delete
        it promptly.
      </p>

      <h2>11. Links to Other Websites</h2>
      <p>
        Our Website may contain links to third-party websites, including social media platforms and
        product resources. We are not responsible for the privacy practices of those websites. We
        encourage you to review their privacy policies before providing personal information.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the
        top of this page indicates when the policy was last revised. Material changes will be posted
        on this page.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or our data practices, please contact us:
      </p>
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
