# Steps to use medusa

This folder describes the basic workflow to use medusa from scripts using only ethers.js:

First, install dependencies with `npm install`

The steps are:

1. We encrypt our text/file by running `node encrypt.mjs`.
2. We start to decrypt using `node decrypt.mjs`. In this script we pay to view the file.
3. Step 2 triggered an event that the front end should listen, that event has the the encrypted key.
4. We copy the values from the event and update the `ciphertext` object, and finally run `decrypt2.mjs`
