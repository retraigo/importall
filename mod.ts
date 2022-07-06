export async function importAll(
  dir: string,
  extensions: (string | undefined)[] = ["ts", "js"],
) {
  const files = Array(...Deno.readDirSync(dir)).filter((x) =>
    x.isFile && (extensions.includes(x.name.split(".").at(-1)))
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

export async function importAllTextFiles(
  dir: string,
  extensions: (string | undefined)[] = ["ts", "js"],
): Promise<Record<string, string>> {
  const files = Array(...Deno.readDirSync(dir)).filter((x) =>
    x.isFile && (extensions.includes(x.name.split(".").at(-1)))
  );
  const promises = [];
  for (const file of files) {
    promises.push(Deno.readTextFile(`${dir}/${file.name}`));
  }
  const result = await Promise.all(promises);
  const res: Record<string, string> = {};
  for(const i in files) {
    res[files[i].name.split(".")[0]] = result[i];
  }
  return res;
}
