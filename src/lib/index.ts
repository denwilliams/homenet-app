const RED = require('node-red');
import core = require('@homenet/core');

import { HuePluginLoader, NinjaBlockPluginLoader, MilightPluginLoader, MqttPluginLoader, FlicPluginLoader, ZwayPluginLoader } from '../plugins';
import { join } from 'path';


@core.plugin()
class ConsoleStats implements core.IStatsTarget {
  constructor() {
  }

  gauge(id: string, value: number) : void {
    console.log('guage:', id, value);
  }

  counter(id: string, increment?: number) : void {
    console.log('counter:', id, increment);
  }
}

(<any> core).registerStats(ConsoleStats);

let configFilename = process.argv[process.argv.length - 1];
if (configFilename[0] !== '/') configFilename = join(process.cwd(), configFilename);
console.log('Loading with config ==> ' + configFilename);
const config = require(configFilename);

const runtime = core.init(RED, config);

runtime.loadPlugin(HuePluginLoader);
runtime.loadPlugin(MilightPluginLoader);
runtime.loadPlugin(NinjaBlockPluginLoader);
runtime.loadPlugin(FlicPluginLoader);
runtime.loadPlugin(ZwayPluginLoader);
runtime.loadPlugin(MqttPluginLoader);

runtime.start();
