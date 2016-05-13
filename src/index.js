"use strict";

import "core-js/es6/promise";
import { diff, unpatch } from "jsondiffpatch";
import files from "../modfiles/index";

export function diffModFile(opts = {}) {
  if(!opts.content) {
    return Promise.reject("No array to diff");
  } else if(!files[opts.filetype]) {
    return Promise.reject(`Filetype: ${opts.filetype} invalid`);
  }
  return Promise.resolve(diff(opts.content, files[opts.filetype]));
}

export function patchModFile(opts = {}) {
  if(!opts.delta) {
    return Promise.reject("No delta object to restore from");
  } else if(!files[opts.filetype]) {
    return Promise.reject(`Filetype: ${opts.filetype} invalid`);
  }
  return Promise.resolve(unpatch(files[opts.filetype], opts.delta));
}
