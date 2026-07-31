import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'categoryImage',
      title: 'Category image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'Or external image URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
  },
});
