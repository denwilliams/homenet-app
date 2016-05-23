# homenet-app
Homenet: home automation for developers - Application

## Plugins

1. Place subfolder inside folder lib/plugins.
2. Export the plugin as a function that will be called on plugin load.
3. Attach `$name` and `$require` as properties on the function.

Example:

```js

function load(args) {
    var logger = args.logger;
    var sensors = args.sensors;
}

load.$name = 'myPluginName';
load.$require = ['logger', 'sensors'];

module.exports = load;

```



