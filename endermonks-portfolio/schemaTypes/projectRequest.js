import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'projectRequest',
  title: 'Project Request',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', readOnly: true}),
    defineField({name: 'email', type: 'string', readOnly: true}),
    defineField({name: 'phone', type: 'string', readOnly: true}),
    defineField({name: 'service', type: 'string', readOnly: true}),
    defineField({name: 'message', type: 'text', readOnly: true}),
    defineField({name: 'submittedAt', type: 'datetime', readOnly: true}),
    defineField({
      name: 'status',
      type: 'string',
      options: {list: ['new', 'contacted', 'won', 'lost']},
      initialValue: 'new',
    }),
  ],
  orderings: [
    {title: 'Newest', name: 'newest', by: [{field: 'submittedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'service'},
  },
})
