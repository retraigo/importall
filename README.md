# importall
Small Deno module to import all files in a directory.

```ts
import { importAll } from "https://deno.land/x/importall@v2.0.0/mod.ts";

console.log(await importAll(`${import.meta.dirname}/testfiles`));
```
