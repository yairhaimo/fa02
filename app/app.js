(function() {
    'use strict';

    angular.module('fa02', ['ngTouch', 'ui.router', 'famous.angular'])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    	$locationProvider.html5Mode(false);
  		$urlRouterProvider.otherwise('/home');
	  
	  	$stateProvider
		    .state('home', {
		      url: '/home',
		      controller: 'HomeController',
		      templateUrl: 'app/pages/home/home.html'
		    })
		    .state('details', {
		      url: '/details',
		      controller: 'DetailsController',
		      templateUrl: 'app/pages/details/details.html'
		    })
	})


    .factory('Page', function($famous) {
    	var Transitionable = $famous['famous/transitions/Transitionable'];
		var SnapTransition = $famous['famous/transitions/SnapTransition'];
		var Easing = $famous['famous/transitions/Easing'];

    	var _pages = {
    		home: {
    			x: new Transitionable(0)
    		},
    		details: {
    			x: new Transitionable(320)
    		}
    	};


    	

		var _slideRightLeftStack = [];

		
		var _states = {
			from: undefined,
			to: undefined
		};
		var _canAnimate = function() {
    		return !!_states.from.name;			
    	};

    	return {
    		pages: _pages,
    		states: _states,
    		canAnimate: _canAnimate,
    		pageLeave: function(done) {
				if (_canAnimate()) {
					console.log('animating leave for '+ _states.from.name);
					_pages[_states.from.name].x.set(
						-320,
						{
							//method: SnapTransition,
							curve: 'easeInOut',// Easing.inOutElastic,
							duration: 250
						},
						done
					);
	    		}
    		},
    		pageEnter: function(done) {
    			if (_canAnimate()) {
					console.log('animating enter for '+ _states.to.name);
	    			_pages[_states.to.name].x.set(
						0,
						{
							//method: SnapTransition,
							curve: 'easeInOut',// Easing.inOutElastic,
							duration: 250
						},
						done
					);
	    		}
    		}
    	};
    })

    .run(function(Page, $rootScope) {
    	$rootScope.Page = Page;

    	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    		console.log('changing from ' + fromState.name + ' to ' + toState.name);
    		Page.states.to = toState;
    		Page.states.from = fromState;
    	});
    })

})();