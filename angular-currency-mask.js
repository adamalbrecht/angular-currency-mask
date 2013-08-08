angular.module('currencyMask', []).directive('currencyMask', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelController) {
      // Run formatting on keyup
      var numberWithCommas = function(value, addExtraZero) {
        if (addExtraZero == undefined)
          addExtraZero = false
        value = value.toString();
        value = value.replace(/[^0-9\.]/g, "");
        var parts = value.split('.');
        parts[0] = parts[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
        if (parts[1] && parts[1].length > 2) {
          parts[1] = parts[1].substring(0, 2);
        }
        if (addExtraZero && parts[1] && (parts[1].length === 1)) {
          parts[1] = parts[1] + "0" 
        }
        return parts.join(".");
      };
      var applyFormatting = function() {
        var value = element.val();
        var original = value;
        if (!value || value.length == 0) { return }
        value = numberWithCommas(value);
        if (value != original) {
          element.val(value);
          element.triggerHandler('input')
        }
      };
      element.bind('keyup', function(e) {
        var keycode = e.keyCode;
        var isTextInputKey = 
          (keycode > 47 && keycode < 58)   || // number keys
          keycode == 32 || keycode == 8    || // spacebar or backspace
          (keycode > 64 && keycode < 91)   || // letter keys
          (keycode > 95 && keycode < 112)  || // numpad keys
          (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
          (keycode > 218 && keycode < 223);   // [\]' (in order)
        if (isTextInputKey) {
          applyFormatting();
        }
      });
      ngModelController.$parsers.push(function(value) {
        if (!value || value.length == 0) {
          return value;
        }
        value = value.toString();
        value = value.replace(/[^0-9\.]/g, "");
        return value;
      });
      ngModelController.$formatters.push(function(value) {
        if (!value || value.length == 0) {
          return value;
        }
        value = numberWithCommas(value, true);
        return value;
      });
    }
  };
});
