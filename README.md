# importall
Small Deno module to import all files in a directory.

```ts
const __dirname = new URL(".", import.meta.url).pathname;

import {importAll} from "https://deno.land/x/importall@v1.0.0/import-deno.ts"

console.log(await importAll(`${__dirname}/testfiles`))
```