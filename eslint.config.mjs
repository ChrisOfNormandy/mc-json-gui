// @ts-check

import { reactViteConfig, typescriptConfig } from '@chrisofnormandy/concauses/linter';

export default [
    ...typescriptConfig(),
    ...reactViteConfig()
];