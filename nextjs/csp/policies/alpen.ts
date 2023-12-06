import type CspDev from 'csp-dev';

import { getEnvValue } from 'configs/app/utils';

export function alpen(): CspDev.DirectiveDescriptor {
  return {
    'connect-src': [ getEnvValue('NEXT_PUBLIC_ALP_RPC_URL') || '' ],
  };
}
