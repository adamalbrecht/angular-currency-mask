angular.module('currencyMask', []).directive('currencyMask', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, controller) {
      var formattedValue;
      var decimalValue;

      var numberWithCommas = function(x, addTrailingZero) {
        if (!x) { return "" };
        var parts = x.toString();
        parts = parts.replace(/[^0-9\.]/g, "");
        parts = parts.split(".");
        parts[0] = parts[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
        if (parts[1] && parts[1].length > 2) {
          parts[1] = parts[1].substring(0,2);
        }
        if ((addTrailingZero == true) && (parts.length === 2) && (parts[1].length === 1)) {
          parts[1] = parts[1] + "0";
        }
        return parts.join(".");
      }

      var toDecimal = function(x) {
        if (!x) { return null; }
        x = x.replace(/[^0-9\.]/g, "");
        parts = x.split(".");
        if (parts.length > 1) {
          parts[1] = parts[1].substring(0,2);
        }
        x = parts.join('.');
        return parseFloat(x);
      }

      controller.$render = function() {
        element.val(formattedValue);  
      }

      runUpdates = function(addTrailingZero) {
        scope.$apply(function(){
          decimalValue = toDecimal(element.val());
          formattedValue = numberWithCommas(element.val(), addTrailingZero);
          controller.$setViewValue(decimalValue);
          controller.$render();
        });
      };

      // Run formatting on keyup
      element.bind('keyup', function(e) {
        var keycode = e.keyCode;
        var isTextInputKey = 
          (keycode > 47 && keycode < 58)   || // number keys
          keycode == 32 || keycode == 8    || // spacebar or backspace
          (keycode > 64 && keycode < 91)   || // letter keys
          (keycode > 95 && keycode < 112)  || // numpad keys
          (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
          (keycode > 218 && keycode < 223);   // [\]' (in order)
        if (isTextInputKey) { runUpdates(false); }
      });
      // Add extra decimals if needed on blur
      element.bind('blur', function() {
        runUpdates(true);
      });

    }
  };
});
