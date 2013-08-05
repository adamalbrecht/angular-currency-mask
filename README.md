## Usage:

* Reference the script in your HTML
* Add `currencyMask` as a dependency in your app.
```
var app = angular.module('demo', ['currencyMask']);
```
* Add the `currency-mask` attribute to your text input.
```
<input type='text' ng-model='amount' currency-mask />
```

**Note:** Currently this only works if the input also uses ngModel.
