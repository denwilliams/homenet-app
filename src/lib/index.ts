const RED = require('node-red');
import core = require('homenet-core');

import { HuePluginLoader, NinjaBlockPluginLoader, MilightPluginLoader } from '../plugins';
import { join } from 'path';

const configFilename = join(process.cwd(), process.argv[process.argv.length - 1]);
console.log('Loading with config ==> ' + configFilename);
const config = require(configFilename);

const runtime = core.init(RED, config);

runtime.loadPlugin(HuePluginLoader);
runtime.loadPlugin(MilightPluginLoader);
runtime.loadPlugin(NinjaBlockPluginLoader);


runtime.start();
