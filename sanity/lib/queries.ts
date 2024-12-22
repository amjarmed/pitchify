import { defineQuery } from 'next-sanity';

export const startupQuery = defineQuery(`
  *[_type=="startup" && defined(slug.current) &&
  !defined($search) ||
  title match $search ||
  category match $search ||
  author->name match $search] |
   order(_createdAt desc) {
  _id,
    title,
    description,
    category,
    image,
    slug,
    _createdAt,
    views,
    author -> {
      _id, name, image, bio
    },
}`);

export const startup_By_id_Query = defineQuery(`
  *[_type=="startup" && _id==$id][0]{
  _id,
    title,
    author -> {
      _id, image, bio, username, name
    },
    slug,
    image,
    views,
    _createdAt,
    category,
    description,
    pitch
}
  `);
export const startup_Views_Query = defineQuery(`
  *[_type=="startup" && _id==$id][0]{
  _id,
    views,
}
  `);
