import type { AboutPageContent, AboutPageIcon, Catalogue, SiteSettings, Testimonial } from '@/lib/content-types';
import { defaultAboutPage, defaultSiteSettings } from '@/lib/content-types';
import { urlForImage } from './image';

type SanitySiteSettingsRow = {
  companyName?: string;
  headerTagline?: string;
  primaryEmail?: string;
  secondaryEmail?: string | null;
  phones?: Array<{ label?: string; number?: string; tel?: string }>;
  formRecipientEmail?: string;
  address?: {
    line1?: string;
    line2?: string | null;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  businessHours?: string[];
  locations?: string[];
};

type SanityTestimonialRow = {
  _id: string;
  name?: string;
  title?: string;
  company?: string;
  content?: string;
  rating?: number;
  displayOrder?: number;
};

type SanityCatalogueRow = {
  _id: string;
  title?: string;
  slug?: string;
  description?: string;
  fileName?: string;
  viewUrl?: string;
  displayOrder?: number;
  coverImage?: unknown;
  externalCoverUrl?: string;
  fileUrl?: string;
  externalFileUrl?: string;
};

type SanityAboutPageRow = {
  pageTitle?: string;
  heroSubtitle?: string;
  storyTitle?: string;
  storyParagraphs?: string[];
  storyImage?: unknown;
  externalStoryImageUrl?: string;
  missionVisionTitle?: string;
  missionVisionSubtitle?: string;
  missionTitle?: string;
  missionText?: string;
  visionTitle?: string;
  visionText?: string;
  valuesTitle?: string;
  valuesSubtitle?: string;
  values?: Array<{ icon?: string; title?: string; description?: string }>;
  certificationsTitle?: string;
  certificationsSubtitle?: string;
  certifications?: string[];
  ctaTitle?: string;
  ctaText?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
};

const aboutPageIcons = new Set<AboutPageIcon>(['zap', 'award', 'heart', 'target', 'eye', 'globe']);

function resolveStoryImage(storyImage: unknown, externalStoryImageUrl?: string): string {
  if (storyImage && typeof storyImage === 'object') {
    try {
      return urlForImage(storyImage as never).width(1200).quality(85).url();
    } catch {
      // fall through
    }
  }

  return externalStoryImageUrl?.trim() || '';
}

function parseAboutPageIcon(icon?: string): AboutPageIcon {
  if (icon && aboutPageIcons.has(icon as AboutPageIcon)) {
    return icon as AboutPageIcon;
  }
  return 'award';
}

function resolveCoverImage(coverImage: unknown, externalCoverUrl?: string): string {
  if (coverImage && typeof coverImage === 'object') {
    try {
      return urlForImage(coverImage as never).width(800).quality(85).url();
    } catch {
      // fall through
    }
  }

  const external = externalCoverUrl?.trim();
  if (external) return external;

  return '/catalogue/product-catalogue thumb.png';
}

function resolveFilePath(fileUrl?: string, externalFileUrl?: string): string {
  const external = externalFileUrl?.trim();
  if (external) return external;

  const file = fileUrl?.trim();
  if (file) return file;

  return '#';
}

export function mapSiteSettingsRow(row: SanitySiteSettingsRow | null): SiteSettings {
  if (!row) return defaultSiteSettings;

  return {
    companyName: row.companyName || defaultSiteSettings.companyName,
    headerTagline: row.headerTagline || defaultSiteSettings.headerTagline,
    primaryEmail: row.primaryEmail || defaultSiteSettings.primaryEmail,
    secondaryEmail: row.secondaryEmail ?? defaultSiteSettings.secondaryEmail,
    phones:
      row.phones && row.phones.length > 0
        ? row.phones
            .filter((phone) => phone.number && phone.tel)
            .map((phone) => ({
              label: phone.label,
              number: phone.number!,
              tel: phone.tel!,
            }))
        : defaultSiteSettings.phones,
    formRecipientEmail: row.formRecipientEmail || defaultSiteSettings.formRecipientEmail,
    address: {
      line1: row.address?.line1 || defaultSiteSettings.address.line1,
      line2: row.address?.line2 ?? defaultSiteSettings.address.line2,
      city: row.address?.city || defaultSiteSettings.address.city,
      postalCode: row.address?.postalCode || defaultSiteSettings.address.postalCode,
      country: row.address?.country || defaultSiteSettings.address.country,
    },
    businessHours:
      row.businessHours && row.businessHours.length > 0
        ? row.businessHours
        : defaultSiteSettings.businessHours,
    locations:
      row.locations && row.locations.length > 0
        ? row.locations
        : defaultSiteSettings.locations,
  };
}

export function mapTestimonialRow(row: SanityTestimonialRow): Testimonial {
  return {
    id: row._id,
    name: row.name || '',
    title: row.title || '',
    company: row.company || '',
    content: row.content || '',
    rating: Math.min(5, Math.max(1, row.rating ?? 5)),
    display_order: row.displayOrder ?? 0,
  };
}

export function mapCatalogueRow(row: SanityCatalogueRow): Catalogue {
  const slug = row.slug || row._id;

  return {
    id: slug,
    title: row.title || '',
    description: row.description || '',
    filePath: resolveFilePath(row.fileUrl, row.externalFileUrl),
    fileName: row.fileName || `${row.title || 'catalogue'}.pdf`,
    coverImage: resolveCoverImage(row.coverImage, row.externalCoverUrl),
    viewUrl: row.viewUrl || undefined,
    display_order: row.displayOrder ?? 0,
  };
}

export function mapAboutPageRow(row: SanityAboutPageRow | null): AboutPageContent {
  if (!row) return defaultAboutPage;

  return {
    pageTitle: row.pageTitle || defaultAboutPage.pageTitle,
    heroSubtitle: row.heroSubtitle || defaultAboutPage.heroSubtitle,
    storyTitle: row.storyTitle || defaultAboutPage.storyTitle,
    storyParagraphs:
      row.storyParagraphs && row.storyParagraphs.length > 0
        ? row.storyParagraphs
        : defaultAboutPage.storyParagraphs,
    storyImage: resolveStoryImage(row.storyImage, row.externalStoryImageUrl),
    missionVisionTitle: row.missionVisionTitle || defaultAboutPage.missionVisionTitle,
    missionVisionSubtitle:
      row.missionVisionSubtitle || defaultAboutPage.missionVisionSubtitle,
    missionTitle: row.missionTitle || defaultAboutPage.missionTitle,
    missionText: row.missionText || defaultAboutPage.missionText,
    visionTitle: row.visionTitle || defaultAboutPage.visionTitle,
    visionText: row.visionText || defaultAboutPage.visionText,
    valuesTitle: row.valuesTitle || defaultAboutPage.valuesTitle,
    valuesSubtitle: row.valuesSubtitle || defaultAboutPage.valuesSubtitle,
    values:
      row.values && row.values.length > 0
        ? row.values.map((value) => ({
            icon: parseAboutPageIcon(value.icon),
            title: value.title || '',
            description: value.description || '',
          }))
        : defaultAboutPage.values,
    certificationsTitle: row.certificationsTitle || defaultAboutPage.certificationsTitle,
    certificationsSubtitle:
      row.certificationsSubtitle || defaultAboutPage.certificationsSubtitle,
    certifications:
      row.certifications && row.certifications.length > 0
        ? row.certifications
        : defaultAboutPage.certifications,
    ctaTitle: row.ctaTitle || defaultAboutPage.ctaTitle,
    ctaText: row.ctaText || defaultAboutPage.ctaText,
    ctaPrimaryLabel: row.ctaPrimaryLabel || defaultAboutPage.ctaPrimaryLabel,
    ctaSecondaryLabel: row.ctaSecondaryLabel || defaultAboutPage.ctaSecondaryLabel,
  };
}
