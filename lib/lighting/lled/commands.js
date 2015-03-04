exports.colorCommand = function(val) {
  return [
    {method:'sendRGBWGroupCommand', value:'on'},
    {method:'delay', value:100},
    {method:'sendRGBColorCommand', value:val},
    {method:'sendDirectBrightnessCommand', value:1}
  ];
};
