import { devtools } from "zustand/middleware";

const isDevEnv = true;

const devOnlyDevtoolsImpl =
  (fn, devtoolsOptions = {}) =>
  (set, get, api) => {
    if (isDevEnv) {
      return devtools(fn, devtoolsOptions)(set, get, api);
    }
    return fn(set, get, api);
  };

export const devOnlyDevtools = devOnlyDevtoolsImpl;