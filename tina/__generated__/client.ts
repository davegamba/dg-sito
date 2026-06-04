import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'https://content.tinajs.io/2.4/content/00b54f91-a68f-4dd5-a45b-511c499a40d6/github/main', token: process.env.TINA_TOKEN || '76bb488aa79760310f95918d2600f7dd1add480b', queries,  });
export default client;
  