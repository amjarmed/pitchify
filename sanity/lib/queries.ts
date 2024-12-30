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

export const authorQuery = defineQuery(`
  *[_type=="author" && id==$id ][0]{
  _id,
  id,
    name,
    username,
    image,
    bio,
    email
}
  `);

export const authorQuery_by_id = defineQuery(`
  *[_type=="author" && _id==$id ][0]{
  _id,
  id,
    name,
    username,
    image,
    bio,
    email
}
  `);

export const startups_By_Author_Query = defineQuery(`
  *[_type=="startup" && author._ref==$id] |
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
export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
