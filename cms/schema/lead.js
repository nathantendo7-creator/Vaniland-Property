export default {
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'propertyCode',
      title: 'Property Code',
      type: 'string'
    },
    {
      name: 'goal',
      title: 'Goal',
      type: 'string'
    },
    {
      name: 'budget',
      title: 'Budget',
      type: 'string'
    },
    {
      name: 'utm',
      title: 'UTM Source',
      type: 'string'
    },
    {
      name: 'consent',
      title: 'Consent',
      type: 'boolean',
      initialValue: true
    }
  ]
}
