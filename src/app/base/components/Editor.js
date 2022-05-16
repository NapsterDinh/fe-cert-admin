import React from 'react'

import * as Yup from "yup"

import { Jodit } from "jodit"

const schema = Yup.object().shape({
    id: Yup.number(),
    authorId: Yup.number(),
    categoryId: Yup.number(),
    title: Yup.string()
                .required('Title is required')
                .min(8, 'Title must be at least 8 characters')
                .max(256, `Please shorten the text so it's no longer than 256 characters`),
    metaTitle: Yup.string()
                .required('Meta title is required for SEO')
                .max(70, `Please shorten the text so it's no longer than 70 characters`),
    slug: Yup.string()
                .required('Slug is required')
                .min(5, 'Slug must be at least 5 characters')
                .max(12, `Please shorten the text so it's no longer than 12 characters`),
    description: Yup.string()
                .max(124, `Please shorten the text so it's no longer than 124 characters`),
    metaDescription: Yup.string()
                .required('Meta description is required for SEO')
                .max(290, `Please shorten the text so it's no longer than 290 characters`),
    metaKeyWord: Yup.array()
                .of(Yup.string()),
    metaLink: Yup.array.of(Yup.string()),
    body: Yup.string()
                .required('Body is required')
                .max(50000, `Please shorten the text so it's no longer than 12 characters`),
    status: Yup.string()
                .default('DRAFT'),
    tag: Yup.array.of(Yup.object()),
    comment: Yup.array.of(Yup.object()),
    dateCreated: Yup.string(),
    dateUpdated: Yup.string(),
    allowComment: Yup.boolean.default(false),
    totalViews: Yup.number().default(0)
  })

const Editor = () => {
  
  return(
      <textarea id="editor"></textarea>
    )
}
 
export default Editor;