import sanityClient, { ClientConfig } from '@sanity/client';
import { AstroIntegration } from 'astro';

export { createImageBuilder } from './createImageBuilder';

export { portableTextToHtml } from './portableTextToHtml';

function initSanityClient(config: ClientConfig) {
  const client = sanityClient(config);

  globalThis.sanityClient = client;
}

export function useSanityClient() {
  if (!globalThis.sanityClient) {
    console.error('Sanity client has not been initialized correctly');
  }

  return globalThis.sanityClient;
}

export default function astroSanityIntegration(options: ClientConfig): AstroIntegration {
  return {
    name: 'astro-sanity',
    hooks: {
      'astro:config:setup': () => {
        initSanityClient(options);
      },
    },
  };
}
