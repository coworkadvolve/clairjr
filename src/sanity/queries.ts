export const categoriesQuery = `*[_type == "category"] | order(displayOrder asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  displayOrder,
  categoryImage,
  externalImageUrl
}`;

export const productsQuery = `*[_type == "product"] | order(displayOrder asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  shortDescription,
  specifications,
  features,
  applications,
  productImage,
  externalImageUrl,
  galleryImageUrls,
  datasheetUrl,
  isFeatured,
  displayOrder,
  "categoryId": category._ref,
  category->{
    _id,
    name,
    "slug": slug.current
  }
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  shortDescription,
  specifications,
  features,
  applications,
  productImage,
  externalImageUrl,
  galleryImageUrls,
  datasheetUrl,
  isFeatured,
  displayOrder,
  "categoryId": category._ref,
  category->{
    _id,
    name,
    "slug": slug.current
  }
}`;

export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  companyName,
  headerTagline,
  primaryEmail,
  secondaryEmail,
  phones,
  formRecipientEmail,
  address,
  businessHours,
  locations
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(displayOrder asc, name asc) {
  _id,
  name,
  title,
  company,
  content,
  rating,
  displayOrder
}`;

export const cataloguesQuery = `*[_type == "catalogue"] | order(displayOrder asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  fileName,
  viewUrl,
  displayOrder,
  coverImage,
  externalCoverUrl,
  catalogFile,
  "fileUrl": catalogFile.asset->url,
  externalFileUrl
}`;

export const aboutPageQuery = `*[_type == "aboutPage" && _id == "aboutPage"][0] {
  pageTitle,
  heroSubtitle,
  storyTitle,
  storyParagraphs,
  storyImage,
  externalStoryImageUrl,
  missionVisionTitle,
  missionVisionSubtitle,
  missionTitle,
  missionText,
  visionTitle,
  visionText,
  valuesTitle,
  valuesSubtitle,
  values,
  certificationsTitle,
  certificationsSubtitle,
  certifications,
  ctaTitle,
  ctaText,
  ctaPrimaryLabel,
  ctaSecondaryLabel
}`;

const blogPostProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImageUrl": coalesce(coverImage.asset->url, externalCoverImageUrl),
  "coverImageAlt": coverImage.alt,
  author,
  publishedAt,
  category,
  tags,
  featured,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url
    }
  },
  seoTitle,
  seoDescription
}`;

export const blogPostsQuery = `*[
  _type == "blogPost" &&
  defined(slug.current) &&
  publishedAt <= now()
] | order(publishedAt desc) ${blogPostProjection}`;

export const blogPostBySlugQuery = `*[
  _type == "blogPost" &&
  slug.current == $slug &&
  publishedAt <= now()
][0] ${blogPostProjection}`;

export const blogPostSlugsQuery = `*[
  _type == "blogPost" &&
  defined(slug.current) &&
  publishedAt <= now()
].slug.current`;
