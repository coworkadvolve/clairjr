import { defineField, defineType } from 'sanity';

export const catalogue = defineType({
  name: 'catalogue',
  title: 'Catalogue',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'catalogFile',
      title: 'Catalogue file (PDF)',
      type: 'file',
      options: { accept: '.pdf,.zip' },
    }),
    defineField({
      name: 'externalFileUrl',
      title: 'Or external file URL',
      type: 'url',
      description: 'Use for files hosted outside Sanity (e.g. existing /catalogue/ paths or cloud links)',
    }),
    defineField({
      name: 'fileName',
      title: 'Download file name',
      type: 'string',
      description: 'Suggested filename when downloading',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'externalCoverUrl',
      title: 'Or external cover image URL',
      type: 'url',
    }),
    defineField({
      name: 'viewUrl',
      title: 'View online URL',
      type: 'url',
      description: 'Optional link for "View Online" button',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', media: 'coverImage' },
  },
});
