/**
 * Created by InspireUI on 13/06/2017.
 *
 * @format
 */

import WPAPI from "wpapi";
import { Config } from "@common";

const wpAPI = new WPAPI({
  endpoint: `${Config.Wordpress.url}/wp-json`,
});

export default wpAPI;
