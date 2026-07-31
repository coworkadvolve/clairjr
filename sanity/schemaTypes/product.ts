import { defineArrayMember, defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'string',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        defineField({
          name: 'entries',
          title: 'Specification entries',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'key', title: 'Key', type: 'string' }),
                defineField({ name: 'value', title: 'Value', type: 'string' }),
              ],
              preview: {
                select: { title: 'key', subtitle: 'value' },
              },
            }),
          ],
        }),
        defineField({
          name: 'models',
          title: 'Product models / variants',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'code', title: 'Code', type: 'string' }),
                defineField({ name: 'wattage', title: 'Wattage', type: 'string' }),
                defineField({ name: 'dimensions', title: 'Dimensions', type: 'string' }),
                defineField({ name: 'outerDimensions', title: 'Outer dimensions', type: 'string' }),
                defineField({ name: 'cutout', title: 'Cutout', type: 'string' }),
                defineField({ name: 'packing', title: 'Packing', type: 'string' }),
                defineField({ name: 'price', title: 'Price', type: 'string' }),
              ],
              preview: {
                select: { title: 'code', subtitle: 'wattage' },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'applications',
      title: 'Applications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'productImage',
      title: 'Product image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'Or external image URL',
      type: 'url',
      description: 'HTTPS URL if you do not upload an image here. Sanity image wins when both exist.',
    }),
    defineField({
      name: 'galleryImageUrls',
      title: 'Gallery image URLs',
      type: 'array',
      of: [{ type: 'url' }],
    }),
    defineField({
      name: 'datasheetUrl',
      title: 'Datasheet URL',
      type: 'url',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category.name' },
  },
});
