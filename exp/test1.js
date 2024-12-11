//paypal-experiment
"use strict";
$type = "Switch";
$three_d_secure_version = "0.9.5";
path = '/var/aes-nonce';
async function main(id) {
  // Function-level strict mode syntax
  "use strict";
  console.log('outer function called');
  function second() {
    console.log('inner function called');
    const trust = "teststring";
    return trust;
  }
  return `usual return ${second()}`;
}
const var0 = true;
console.log('start_of_code');
main(var0);
//this is completely nonsense, I just try to pass a var
const $var = "init";
console.log($var);
