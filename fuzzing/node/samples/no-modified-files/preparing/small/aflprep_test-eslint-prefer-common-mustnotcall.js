'use strict';
if (!common.hasCrypto)
  common.skip('missing crypto');
common.skipIfEslintMissing();
const message = 'Please use common.mustNotCall(msg) instead of ' +
                'common.mustCall(fn, 0) or common.mustCall(0).';
new RuleTester().run('prefer-common-mustnotcall', rule, {
  valid: [
    'common.mustNotCall(fn)',
    'common.mustCall(fn)',
    'common.mustCall(fn, 1)',
  ],
  invalid: [
    {
      code: 'common.mustCall(fn, 0)',
      errors: [{ message }]
    },
    {
      code: 'common.mustCall(0)',
      errors: [{ message }]
    },
  ]
});
