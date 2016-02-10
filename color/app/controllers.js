app
.controller('colorCtrl', ['$scope', function($scope) {
	//Regular expressions for the colors
	var hexRegex = new RegExp('#[A-F0-9]{0,6}');
	var rgbRegex = new RegExp('^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$');

	/* INIT */
	$scope.sampleMessage ='';
	$scope.hexColor = '#000000';
	$scope.rgbColor = {'r':'000','g':'000','b':'000'};
	$scope.lastRgb = {'r':'000','g':'000','b':'000'};

	$scope.randomColor = function() {
		//Lets make an array with hexadecimal symbols
		var letters = '0123456789ABCDEF'.split('');

		//Define the color string
		var color = '#';

		//Add 6 random hexadecimal symbols to the color string
		for (var i = 1; i <= 6; i++) {
			color += letters[Math.round(Math.random()*15)];
		}

		$scope.hexColor = color;
		hexToRgb();
		return color;
	}

	/* HEX */
	$scope.checkHexadecimal = function() {
		if ($scope.hexColor.length >= 1 && !hexRegex.test($scope.hexColor)) {
			$scope.hexColor = '#' + $scope.hexColor;
		}
		hexToRgb();
	}

	hexToRgb = function() {
		if (hexRegex.test( $scope.hexColor) && ($scope.hexColor.length == 4 || $scope.hexColor.length == 7)) {
			$scope.sampleMessage = '';

			var str = ($scope.hexColor.substr(1)).toString(16);

			$scope.rgbColor.r = $scope.lastRgb.r = parseInt(str.substring(0, 2), 16);
			$scope.rgbColor.g = $scope.lastRgb.g = parseInt(str.substring(2, 4), 16);
			$scope.rgbColor.b = $scope.lastRgb.b = parseInt(str.substring(4, 6), 16);

			if($scope.hexColor.length == 4 ) {
				 $scope.rgbColor.r = $scope.lastRgb.r = parseInt( str.substring( 0 , 1 ) + str.substring( 0 , 1 ) , 16 );
				 $scope.rgbColor.g = $scope.lastRgb.g = parseInt( str.substring( 1 , 2 ) + str.substring( 1 , 2 ) , 16 );
				 $scope.rgbColor.b = $scope.lastRgb.b = parseInt( str.substring( 2 , 3 ) + str.substring( 2 , 3 ) , 16 );
			}
		} else {
			$scope.rgbColor.r = $scope.rgbColor.g = $scope.rgbColor.b = '';
			$scope.sampleMessage = 'No Color';
		}
	}

	/* RGB */
	$scope.checkCh = function(channel) {
		switch (channel) {
			case 'r':
    			$scope.rgbColor.r = rgbRegex.test( $scope.rgbColor.r ) ? $scope.rgbColor.r : $scope.lastRgb.r;
    			$scope.lastRgb.r = $scope.rgbColor.r;
    			break;
			case 'g':
    			$scope.rgbColor.g = rgbRegex.test( $scope.rgbColor.g ) ? $scope.rgbColor.g : $scope.lastRgb.g;
    			$scope.lastRgb.g = $scope.rgbColor.g;
    			break;
			case 'b':
    			$scope.rgbColor.b = rgbRegex.test( $scope.rgbColor.b ) ? $scope.rgbColor.b : $scope.lastRgb.b;
    			$scope.lastRgb.b = $scope.rgbColor.b;
    			break;
		}
		rgbToHex();
	}
	rgbToHex = function() {
		$scope.hexColor = '#' + chToHex('r') + chToHex('g') + chToHex('b');
	}
	chToHex = function(channel) {
		switch (channel) {
			case 'r':
			        return rgbRegex.test( $scope.rgbColor.r ) ?
						parseInt( $scope.rgbColor.r ).toString( 16 ).length == 2 ?
							parseInt( $scope.rgbColor.r ).toString( 16 ) :
							'0' + parseInt( $scope.rgbColor.r ).toString( 16 ) :
						'00';
			        break;
			case 'g':
			        return rgbRegex.test( $scope.rgbColor.g ) ?
						parseInt( $scope.rgbColor.g ).toString( 16 ).length == 2 ?
							parseInt( $scope.rgbColor.g ).toString( 16 ) :
							'0' + parseInt( $scope.rgbColor.g ).toString( 16 ) :
						'00';
			        break;
			case 'b':
			        return rgbRegex.test( $scope.rgbColor.b ) ?
						parseInt( $scope.rgbColor.b ).toString( 16 ).length == 2 ?
							parseInt( $scope.rgbColor.b ).toString( 16 ) :
							'0' + parseInt( $scope.rgbColor.b ).toString( 16 ) :
						'00';
			        break;
		}
	}

	$scope.randomColor();
}]);
