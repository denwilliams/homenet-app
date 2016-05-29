const RED = require('node-red');
import core = require('homenet-core');

import { HuePluginLoader, NinjaBlockPluginLoader } from '../plugins';
import { join } from 'path';

const configFilename = join(process.cwd(), process.argv[process.argv.length - 1]);
console.log('Loading with config ==> ' + configFilename);
const config = require(configFilename);
// const plugin = getPluginLoader(core.plugin, core.service);

const runtime = core.init(RED, config);

console.log('HuePluginLoader');
runtime.loadPlugin(HuePluginLoader);
// runtime.loadPlugin(plugin);
console.log('NinjaBlockPluginLoader');
runtime.loadPlugin(NinjaBlockPluginLoader);


runtime.start();
