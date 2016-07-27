angular.module('angularSlideables', [])
.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            var cssObj = {
                'transitionProperty': 'height'
            };

            if(attr.expanded === "true" || attr.expanded === true){
                cssObj.overflowY = "scroll";
                cssObj.height = "100%";
                cssObj.display = "inline";
            }else{
                cssObj.overflowY = "hidden";
                cssObj.height = "0px";
                cssObj.display = "block";
            }

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                cssObj.transitionDuration = attrs.duration;
                cssObj.transitionTimingFunction = attrs.easing;
                element.css(cssObj);
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target, content;

            element.bind('click', function() {
                target = document.querySelectorAll(attrs.slideToggle);
                for(var i = 0; i < target.length; i++){
                    if(target[i].getAttribute("expanded") === "true" || target[i].getAttribute("expanded") === true){
                        target[i].style.height = '0px';
                        target[i].style.overflowY = "hidden";
                        target[i].style.display = 'block';
                        target[i].setAttribute("expanded",false);
                    }else{
                        target[i].style.display = "inline";
                        target[i].style.overflowY = "scroll";
                        target[i].style.height = '100%';
                        target[i].setAttribute("expanded",true);
                    }
                }
            });
        }
    }
});
