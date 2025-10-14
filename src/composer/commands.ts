import { Composer } from "../deps.ts";
import MyContext from "../helpers/context.ts";

import onStart from "../handlers/ch_start.ts";
import onSet from "../handlers/ch_set.ts";

const composer = new Composer<MyContext>();

composer.command("start", onStart);
composer.command("set", onSet);

export default composer;
