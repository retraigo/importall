export async function importAll(
  dir: string,
  filter: (fileName: string) => boolean = (x) => x === "ts" || x === "js"
) {
  const files = Array(...Deno.readDirSync(dir)).filter(
    (x) => x.isFile && filter(x.name)
  );
  const promises = [];
  for (const file of files) {
    if (
      ["ts", "js", "tsx", "jsx"].includes(String(file.name.split(".").at(-1)))
    ) {
      promises.push(import(`${dir}/${file.name}`));
    } else promises.push(Deno.readTextFile(`${dir}/${file.name}`));
  }
  const result = await Promise.all(promises);
  return result;
}

export async function readAllTextFiles(
  dir: string,
  filter: (fileName: string) => boolean = (_) => true
): Promise<Record<string, string>> {
  const files = Array(...Deno.readDirSync(dir)).filter(
    (x) => x.isFile && filter(x.name)
  );
  const promises = [];
  for (const file of files) {
    promises.push(Deno.readTextFile(`${dir}/${file.name}`));
  }
  const result = await Promise.all(promises);
  const res: Record<string, string> = {};
  for (const i in files) {
    res[files[i].name.split(".")[0]] = result[i];
  }
  return res;
}

export async function readAllFiles(
  dir: string,
  filter: (fileName: string) => boolean = (_) => true
): Promise<Record<string, Uint8Array>> {
  const files = Array(...Deno.readDirSync(dir)).filter(
    (x) => x.isFile && filter(x.name)
  );
  const promises = [];
  for (const file of files) {
    promises.push(Deno.readFile(`${dir}/${file.name}`));
  }
  const result = await Promise.all(promises);
  const res: Record<string, Uint8Array> = {};
  for (const i in files) {
    res[files[i].name.split(".")[0]] = result[i];
  }
  return res;
}
