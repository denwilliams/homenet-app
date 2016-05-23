const RED = require('node-red');
import core = require('homenet-core');

import { HuePluginLoader } from '../plugins';

const runtime = core.init(RED);
runtime.loadPlugin(HuePluginLoader);
runtime.start();
