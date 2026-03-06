export default {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: Rule => Rule.required().unique()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Apartment', value: 'apartment' },
          { title: 'Semi-Detached', value: 'semi-detached' },
          { title: 'Bungalow', value: 'bungalow' },
          { title: 'Studio', value: 'studio' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'For Rent', value: 'for-rent' },
          { title: 'For Sale', value: 'for-sale' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'UGX'
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: Rule => Rule.integer().min(0)
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: Rule => Rule.integer().min(0)
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'district', type: 'string', title: 'District' },
        { name: 'neighborhood', type: 'string', title: 'Neighborhood' },
        { name: 'lat', type: 'number', title: 'Latitude' },
        { name: 'lon', type: 'number', title: 'Longitude' }
      ]
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'premium',
      title: 'Premium',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true
    }
  ]
}
