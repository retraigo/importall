
export async function importAll(
  dir: string,
  extensions: (string | undefined)[] = ["ts", "js"],
) {
  const files = Array(...Deno.readDirSync(dir)).filter((x) =>
    x.isFile && (extensions.includes(x.name.split(".").at(-1)))
  );
  const promises = [];
  for (const file of files) {
    if (["ts", "js", "tsx", "jsx"].includes(x.name.split(".").at(-1))) {
      promises.push(import(`${dir}/${file.name}`));
    } else promises.push(Deno.readTextFile(`${dir}/${file.name}`));
  }
  const result = await Promise.all(promises);
  return result;
}
