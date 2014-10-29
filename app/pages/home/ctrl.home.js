var app = angular.module('fa02');

app.controller('TestController', function($scope, $famous) {

	var Transitionable = $famous['famous/transitions/Transitionable'];
	var SnapTransition = $famous['famous/transitions/SnapTransition'];
	var Easing = $famous['famous/transitions/Easing'];

	var DURATION = 15000;

	$scope.msg = 'abc';

	$scope.items = [
		{
			content: '1',
			bgColor: "#b58900",
			rotate: new Transitionable(Math.PI / 4),
			translate: new Transitionable(0)
		},
		{
			content: '2',
			bgColor: "#cb4b16",
			rotate: new Transitionable(Math.PI / 4),
			translate: new Transitionable(50)
		},
		{
			content: '3',
			bgColor: "#dc322f",
			rotate: new Transitionable(Math.PI / 4),
			translate: new Transitionable(100)
		},
		{
			content: '4',
			bgColor: "#6c71c4",
			rotate: new Transitionable(Math.PI / 4),
			translate: new Transitionable(150)
		}
	];



	$scope.transitionable = new Transitionable(Math.PI / 4);

	$scope.enter = function(item, done) {

		console.log('entering', item);
		item.rotate.set(
			0,
			{
				//method: SnapTransition,
				curve: Easing.inOutElastic,
				duration: 800 * +item.content
			},
			done
		);

		// Declare the animation duration by returning it as a number
		//return 3000;
	};

// Fold items up to the left when they leave.
	$scope.leave = function(item, done) {
		console.log('leaving', item);
		item.rotate.set(
			Math.PI/2,
			{
				//method: SnapTransition,
				curve: Easing.inOutElastic,
				duration: 800 * +item.content
			},
			done
		);

		item.translate.set(
			300,
			{
//				method: SnapTransition,
				curve: Easing.inOutElastic,
				duration: 1000
			},
			// Execute the done callback after the transition is fully applied
			done
		);
	};

	$scope.halt = function(item) {
		// Halt any active animations
		item.rotate.halt();
	};
});