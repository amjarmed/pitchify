import { pitchArray } from '@/data/pitchs';
import { createPitchApi } from '@/lib/actions';
for (let index = 0; index < pitchArray.length; index++) {
  const element = pitchArray[index];
  try {
    const res = await createPitchApi(element);

    console.log('res', res._id);
  } catch (error) {
    console.log('error', error);
  }
}
