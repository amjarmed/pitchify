import { z } from 'zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Too short' })
    .max(100, { message: 'Too long' }),
  description: z
    .string()
    .min(20, { message: 'Too short ' })
    .max(500, { message: 'Too long' }),
  category: z
    .string()
    .min(3, { message: 'Too short' })
    .max(20, { message: 'Too long' }),
  link: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          const contentType = res.headers.get('content-type');
          return contentType?.startsWith('image/');
        } catch {
          return false;
        }
      },
      { message: ' URL must be a valid image link' }
    ),
  pitch: z.string().min(10),
});
