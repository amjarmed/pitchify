import { createClient } from 'next-sanity';
import 'server-only';

import { apiVersion, dataset, projectId, token } from '../env';
// This client is used for writing data to Sanity
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
});

// Sanity write client requires a token to be set, or it will default to `preview` mode which will throw an error if it's not set in the environment
if (!writeClient.config().token) {
  throw new Error('Write Token not found');
}
