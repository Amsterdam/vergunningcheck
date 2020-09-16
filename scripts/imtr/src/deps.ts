export { emptyDir, exists } from "https://deno.land/std@0.69.0/fs/mod.ts";
export { join } from "https://deno.land/std@0.69.0/path/mod.ts";
export { assert } from "https://deno.land/std@0.69.0/testing/asserts.ts";



export { makeRunWithLimit } from "https://denopkg.com/alextes/run-with-limit/mod.ts";
// import parse from "https://denopkg.com/nekobato/deno-xml-parser/index.ts";
// export { parse };
// export { default as Parser } from "https://rawcdn.githack.com/tbjgolden/deno-htmlparser2/5522f6286a17cc3857c5f1aa30e59e82968de822/htmlparser2/index.ts";

// export { DomHandler } from "https://deno.land/x/domhandler/mod.ts";

export { DomHandler } from "https://deno.land/x/htmlparser@v4.1.1/domhandler/index.ts";
export { Parser } from "https://deno.land/x/htmlparser@v4.1.1/htmlparser2/Parser.ts";
