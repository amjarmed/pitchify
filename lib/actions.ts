'use server';

import { auth } from '@/auth';
import { parseServerActionResponse } from '@/lib/utils';
import { writeClient } from '@/sanity/lib/write-client';
import slugify from 'slugify';
/**
 * Handles server side actions for creating a new pitch
 *
 * @param {state} - The current state of the form
 * @param {form} - The form data
 * @param {pitch} - The pitch text
 * @returns {object} - The response object
 */
export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: 'Not signed in.',
      status: 'ERROR',
    });
  }

  // extract data
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch')
  );
  const slug = slugify(title as string, {
    lower: true,
    strict: true,
  });
  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: session?.id,
      },
      pitch,
    };
    const result = await writeClient.create({
      _type: 'startup',
      ...startup,
    });
    return parseServerActionResponse({
      ...result,
      error: '',
      status: 'SUCCESS',
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({ error, status: 'ERROR' });
  }
};
export const deletePitch = async (id: string) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: 'Not signed in.',
      status: 'ERROR',
    });
  }

  try {
    const result = await writeClient.delete(id);
    return parseServerActionResponse({
      ...result,
      error: '',
      status: 'SUCCESS',
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({ error, status: 'ERROR' });
  }
};

type createPitchApiData = {
  title: string;
  description: string;
  category: string;
  link: string;
  pitch: string;
};
export const createPitchApi = async ({
  title,
  description,
  category,
  link,
  pitch,
}: createPitchApiData) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: 'Not signed in.',
      status: 'ERROR',
    });
  }

  const slug = slugify(title as string, {
    lower: true,
    strict: true,
  });
  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: session?.id,
      },
      pitch,
    };
    const result = await writeClient.create({
      _type: 'startup',
      ...startup,
    });
    return parseServerActionResponse({
      ...result,
      error: '',
      status: 'SUCCESS',
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({ error, status: 'ERROR' });
  }
};
