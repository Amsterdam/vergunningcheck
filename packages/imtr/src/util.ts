import { createHash } from "./deps.ts";

export const strFmt = (str: string) => str.trim();
export const format = (el: string | undefined) =>
  typeof el === "string" ? strFmt(el) : el;

// This function is to prevent bugs in the API. The API somehow returned "not(null)" instead of the expected "-"
export const validateDmnText = (str?: any) =>
  typeof str === "string" ? str.replace("not(null)", "-") : str;

/**
 * Consistent hashing for id's
 */
export const getId = (input: any): string => {
  const hash = createHash("md5");
  hash.update(JSON.stringify(input));
  return hash.toString();
};

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Replacer = (key: string, value: any) => any;

export interface WriteJsonOptions extends Deno.WriteFileOptions {
  replacer?: Array<number | string> | Replacer;
  spaces?: number | string;
}

const serialize = (
  filePath: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any,
  options: WriteJsonOptions
): string => {
  try {
    const jsonString = JSON.stringify(
      object,
      options.replacer as string[],
      options.spaces
    );
    return `${jsonString}\n`;
  } catch (err) {
    err.message = `${filePath}: ${err.message}`;
    throw err;
  }
};

/* Writes an object to a JSON file. */
export async function writeJson(
  filePath: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any,
  options: WriteJsonOptions = {
    spaces: 2,
  }
): Promise<void> {
  const jsonString = serialize(filePath, object, options);
  await Deno.writeTextFile(filePath, jsonString, {
    append: options.append,
    create: options.create,
    mode: options.mode,
  });
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** Reads a JSON file and then parses it into an object */
export async function readJson(filePath: string): Promise<unknown> {
  const decoder = new TextDecoder("utf-8");

  const content = decoder.decode(await Deno.readFile(filePath));

  try {
    return JSON.parse(content);
  } catch (err) {
    err.message = `${filePath}: ${err.message}`;
    throw err;
  }
}
