'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createPitch } from '@/lib/actions';
import { formSchema } from '@/lib/validation';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import { z } from 'zod';

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState<string>('');
  const { toast } = useToast();
  const router = useRouter();
  const initData = {
    title: '',
    description: '',
    category: '',
    link: '',
    pitch: '',
  };
  const [prevData, setPrevData] = useState(initData);

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    setErrors({});
    setPrevData(initData);
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      };

      setPrevData(formValues);
      await formSchema.parseAsync(formValues);
      setPrevData(initData);
      const result = await createPitch(prevState, formData, pitch);
      if (result?.status == 'SUCCESS') {
        toast({
          title: 'Success',
          description: 'Your startup pitch has been created successfully',
        });
        console.log(result);

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        console.log(fieldErrors);

        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: 'Error',
          description: 'Please check your inputs and try again.',
          variant: 'destructive',
        });

        return { ...prevState, error: 'validation failed', status: 'ERROR' };
      }

      toast({
        title: 'Error',
        description: 'An unexpected error has occurred.',
        variant: 'destructive',
      });
      return {
        ...prevState,
        error: 'An unexpected error has occurred',
        status: 'ERROR',
      };
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL',
  });

  return (
    <form action={formAction} className='startup-form'>
      <div>
        <label htmlFor='title' className='startup-form_label'>
          Title
        </label>
        <Input
          id='title'
          name='title'
          className='startup-form_input'
          placeholder='Startup Title'
          defaultValue={prevData?.title || ''}
          required
        />
        {errors.title && <p className='startup-form_error'>{errors.title}</p>}
      </div>
      <div>
        <label htmlFor='description' className='startup-form_label'>
          description
        </label>
        <Textarea
          id='description'
          name='description'
          className='startup-form_textarea'
          defaultValue={prevData?.description || ''}
          placeholder='Short description of your startup idea'
          required
        />
        {errors.description && (
          <p className='startup-form_error'>{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor='category' className='startup-form_label'>
          category
        </label>
        <Input
          id='category'
          name='category'
          className='startup-form_input'
          placeholder='Choose a category (e.g., Tech, Health, Education, etc.)'
          defaultValue={prevData?.category || ''}
          required
        />
        {errors.category && (
          <p className='startup-form_error'>{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor='link' className='startup-form_label'>
          image/video link
        </label>
        <Input
          id='link'
          name='link'
          className='startup-form_input'
          placeholder='Paste a link to your demo or promotional link'
          defaultValue={prevData?.link}
          required
        />
        {errors.link && <p className='startup-form_error'>{errors.link}</p>}
      </div>
      <div data-color-mode='light'>
        <label htmlFor='pitch' className='startup-form_label'>
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(v) => setPitch(v as string)}
          preview='edit'
          height={300}
          style={{ overflow: 'hidden', borderRadius: 20 }}
          textareaProps={{
            placeholder:
              'Briefly describe your idea and what problems is solves  ',
          }}
          previewOptions={{
            disallowedElements: ['style'],
            rehypePlugins: [[rehypeSanitize]],
          }}
          defaultValue={prevData?.pitch || ''}
        />
        {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
      </div>
      <Button
        type='submit'
        className='startup-form_btn text-white'
        disabled={isPending}
      >
        {isPending ? 'Submitting...' : 'Submit Your pitch'}
        <Send className='size-6 ml-2' />
      </Button>
    </form>
  );
};

export default StartupForm;
