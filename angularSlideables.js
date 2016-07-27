angular.module('angularSlideables', [])
.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

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
                if (!target) target = document.querySelectorAll(attrs.slideToggle);
                for(var i = 0; i < target.length; i++){
                    if (!content) content = target[i].querySelector('.slideable_content');

                    if(target[i].getAttribute("expanded") === "true" || target[i].getAttribute("expanded") === true){
                        target[i].style.height = '0px';
                        target[i].style.overflowY = "hidden";
                        target[i].style.display = 'block';
                        target[i].setAttribute("expanded",false);
                    }else{
                        content.style.border = '1px solid rgba(0,0,0,0)';
                        var y = content.clientHeight;
                        content.style.border = 0;
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
