module.exports = exports = {
  'full': [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBWGroupCommand', value:'toWhite'},
    {method:'sendDirectBrightnessCommand', value:1}
  ],
  'high': [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBWGroupCommand', value:'toWhite'},
    {method:'sendDirectBrightnessCommand', value:0.8}
  ],
  'medium': [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBWGroupCommand', value:'toWhite'},
    {method:'sendDirectBrightnessCommand', value:0.6}
  ],
  'low': [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBWGroupCommand', value:'toWhite'},
    {method:'sendDirectBrightnessCommand', value:0.4}
  ],
  'minimum': [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBWGroupCommand', value:'toWhite'},
    {method:'sendDirectBrightnessCommand', value:0.2}
  ],
  'off': [
    {method:'sendRGBWGroupCommand', value:'off'}
  ],
  'fadeoff': [
    {method:'sendDirectBrightnessCommand', value:0.1},
    {method:'delay', value:2000},
    {method:'sendRGBWGroupCommand', value:'off'}
  ],
  'orange': [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBColorCommand', value:150},
    {method:'sendDirectBrightnessCommand', value:1}
  ],
  'bluegreen': [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBColorCommand', value:80},
    {method:'sendDirectBrightnessCommand', value:1}
  ],
  'aqua': [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBColorCommand', value:70},
    {method:'sendDirectBrightnessCommand', value:1}
  ],
  'cyan': [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBColorCommand', value:60},
    {method:'sendDirectBrightnessCommand', value:1}
  ],
  'lightblue': [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBColorCommand', value:50},
    {method:'sendDirectBrightnessCommand', value:1}
  ],
  'blue': colorCommand(30),
  'deepblue': colorCommand(10),
  'green': colorCommand(90),
  'limeGreen': colorCommand(110),
  'limeGreen': colorCommand(130),
  'yellow': colorCommand(140),
  'orangeRed': colorCommand(160),
  'red': colorCommand(170),
  'pinkRed': colorCommand(180),
  'pink': colorCommand(192),
  'lavendar': colorCommand(215),
  'lightPurple': colorCommand(230),
  'purple': colorCommand(240),
  'violet': colorCommand(250),
  'indigo': colorCommand(270),
  'brightBlue': colorCommand(0),
  'movie': colorCommand(170),
};
