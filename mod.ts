export async function importAll(dir: string, extensions: (string|undefined)[] = ["ts", "js"]) {
  const files = Array(...Deno.readDirSync(dir)).filter((x) =>
    x.isFile && (extensions.includes(x.name.split(".").at(-1)))
  );
  const promises = [];
  for (const file of files) {
    promises.push(import(`${dir}/${file.name}`));
  }
  const result = await Promise.all(promises);
  return result;
}
