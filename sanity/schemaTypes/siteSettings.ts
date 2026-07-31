import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerTagline',
      title: 'Header tagline',
      type: 'string',
      description: 'Shown in the top bar, e.g. "Since 2006 | Trusted Lighting Solutions"',
    }),
    defineField({
      name: 'primaryEmail',
      title: 'Primary email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'secondaryEmail',
      title: 'Secondary email',
      type: 'string',
    }),
    defineField({
      name: 'phones',
      title: 'Phone numbers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({
              name: 'number',
              title: 'Display number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'tel',
              title: 'Tel link (digits only, e.g. +911149843647)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'formRecipientEmail',
      title: 'Form submission email',
      type: 'string',
      description: 'Receives contact, franchise, and quote form submissions via FormSubmit.co',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Head office address',
      type: 'object',
      fields: [
        defineField({ name: 'line1', title: 'Address line 1', type: 'string' }),
        defineField({ name: 'line2', title: 'Address line 2', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'postalCode', title: 'Postal code', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string' }),
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business hours',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'locations',
      title: 'Office locations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Shown in the footer',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
