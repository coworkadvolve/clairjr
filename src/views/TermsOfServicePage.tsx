import Link from 'next/link';
import { LegalPageLayout } from '@/components/LegalPageLayout';
import { routes } from '@/lib/routes';
import { siteConfig } from '@/lib/seo/metadata';

export function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="25 June 2025">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website
        operated by {siteConfig.name} (&quot;Clair Lighting,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) at{' '}
        <a href={siteConfig.url} className="text-brand-orange hover:underline">
          {siteConfig.url.replace(/^https?:\/\//, '')}
        </a>{' '}
        (the &quot;Website&quot;). By accessing or using the Website, you agree to these Terms. If
        you do not agree, please do not use the Website.
      </p>

      <h2>1. About Clair Lighting</h2>
      <p>
        {siteConfig.name} designs, manufactures, and supplies LED lighting products and related
        solutions for commercial, industrial, office, and architectural applications. The Website
        provides product information, catalogues, company details, and ways to contact our team for
        quotes, support, and partnership inquiries.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        The Website is intended for business and professional users. By using the Website, you
        represent that you are at least 18 years of age and have the legal capacity to enter into
        these Terms. If you use the Website on behalf of a company or organisation, you represent
        that you have authority to bind that entity to these Terms.
      </p>

      <h2>3. Use of the Website</h2>
      <p>You agree to use the Website only for lawful purposes and in accordance with these Terms. You must not:</p>
      <ul>
        <li>Use the Website in any way that violates applicable local, national, or international law.</li>
        <li>
          Attempt to gain unauthorised access to any part of the Website, our systems, or connected
          networks.
        </li>
        <li>
          Introduce viruses, malware, or other harmful code, or interfere with the proper working of
          the Website.
        </li>
        <li>
          Scrape, harvest, or collect data from the Website by automated means without our prior
          written consent.
        </li>
        <li>
          Misrepresent your identity or affiliation when submitting forms or communicating with us.
        </li>
        <li>
          Use product specifications, images, catalogues, or other content for commercial
          reproduction or resale without our permission.
        </li>
      </ul>

      <h2>4. Product Information</h2>
      <p>
        Product descriptions, specifications, images, datasheets, and catalogues on the Website are
        provided for general information purposes. While we strive for accuracy, product details may
        change without notice due to improvements, regulatory updates, or regional variations.
      </p>
      <p>
        Nothing on the Website constitutes a binding offer to sell. Pricing, availability, delivery
        terms, warranties, and technical suitability are confirmed separately through our sales team
        or authorised representatives. Always verify specifications before specifying products for a
        project.
      </p>

      <h2>5. Forms and Inquiries</h2>
      <p>
        When you submit a contact form, quote request, or franchise application, you agree that the
        information you provide is accurate and complete to the best of your knowledge. Submitting a
        form does not create a contract, partnership, franchise agreement, or employment relationship
        with Clair Lighting.
      </p>
      <p>
        We will use information submitted through forms in accordance with our{' '}
        <Link href={routes.privacyPolicy} className="text-brand-orange hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content on the Website — including text, graphics, logos, product names, images,
        catalogues, design elements, and software — is owned by or licensed to {siteConfig.name}{' '}
        and is protected by copyright, trademark, and other intellectual property laws.
      </p>
      <p>
        You may view, download, and print catalogues or product information for your own internal
        business evaluation and project specification purposes. You may not modify, reproduce,
        distribute, publicly display, or create derivative works from Website content without our
        prior written consent, except as permitted by applicable law.
      </p>
      <p>
        &quot;Clair,&quot; &quot;Clair Lighting,&quot; and related logos are trademarks of{' '}
        {siteConfig.name}. Unauthorised use is prohibited.
      </p>

      <h2>7. Catalogue and File Downloads</h2>
      <p>
        Catalogues, brochures, and datasheets made available for download are provided &quot;as
        is&quot; for reference. We do not guarantee that downloaded files are free from errors or
        suitable for every application. You are responsible for ensuring files are used in compliance
        with these Terms and applicable law.
      </p>

      <h2>8. Third-Party Links and Services</h2>
      <p>
        The Website may contain links to third-party websites or services, including social media
        platforms and content delivery networks. We do not control and are not responsible for
        third-party content, policies, or practices. Your use of third-party services is at your own
        risk.
      </p>

      <h2>9. Disclaimer of Warranties</h2>
      <p>
        THE WEBSITE AND ALL CONTENT ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
        BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
        TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
        NON-INFRINGEMENT.
      </p>
      <p>
        We do not warrant that the Website will be uninterrupted, error-free, secure, or free of
        viruses or other harmful components.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {siteConfig.name.toUpperCase()}, ITS
        DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE,
        DATA, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE
        THE WEBSITE.
      </p>
      <p>
        Our total liability for any claim arising from your use of the Website shall not exceed the
        amount you paid to us, if any, for access to the Website in the twelve (12) months preceding
        the claim, or INR 5,000, whichever is greater.
      </p>
      <p>
        Some jurisdictions do not allow certain limitations of liability. In such cases, our
        liability will be limited to the fullest extent permitted by law.
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {siteConfig.name} and its officers, directors,
        employees, and agents from any claims, damages, losses, liabilities, and expenses (including
        reasonable legal fees) arising out of your violation of these Terms or misuse of the Website.
      </p>

      <h2>12. Governing Law and Dispute Resolution</h2>
      <p>
        These Terms are governed by the laws of India, without regard to conflict of law principles.
        Subject to applicable law, the courts at Noida, Uttar Pradesh, India shall have exclusive
        jurisdiction over disputes arising from or relating to these Terms or your use of the
        Website.
      </p>
      <p>
        Before initiating formal proceedings, we encourage you to contact us at{' '}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-orange hover:underline">
          {siteConfig.email}
        </a>{' '}
        to attempt to resolve the matter amicably.
      </p>

      <h2>13. Changes to These Terms</h2>
      <p>
        We may revise these Terms at any time by posting an updated version on this page. The
        &quot;Last updated&quot; date indicates when changes were last made. Your continued use of
        the Website after changes are posted constitutes acceptance of the revised Terms.
      </p>

      <h2>14. Severability</h2>
      <p>
        If any provision of these Terms is found to be invalid or unenforceable, the remaining
        provisions will remain in full force and effect.
      </p>

      <h2>15. Contact Us</h2>
      <p>For questions about these Terms, please contact:</p>
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
