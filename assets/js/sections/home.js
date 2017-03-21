import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'

import Flickity from 'flickity'
import Swiper from './swiper'
import domselect from 'dom-select'

class Home extends Default {
	
	constructor(opt) {
		
		super(opt)

		this.slug = 'home'
		this.ui = null
	}
	
	init(req, done) {

		super.init(req, done)
	}

	dataAdded(done) {

		super.dataAdded()

		done()
	}

	animateIn(req, done) {
		
		classes.add(config.$body, `is-${this.slug}`)
		classes.remove(config.$body, `is-black`)
		TweenLite.to('.loader', 1, {className:"-=on", delay: 0.5});
		TweenLite.to(this.page, 1, {
			y: 0,
			autoAlpha: 1,
			ease: Expo.easeInOut,
			onComplete: done
		})

		//CAROUSEL
		var swiper = domselect('._main');
		if(swiper){
			var swiper = new Swiper('._main', {
	            pagination: '.swiper-pagination',
				direction: 'horizontal',
				slidesPerView: 1,
				keyboardControl: true,
				speed: 1000,
				loop: false,
				nextButton: '.swiper-button-next',
				mousewheelControl: false
	            
	        });
		}
        
        

        ///SCROLLLLLLLLLLLL
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame   ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
                };
        })();

		var f_container = domselect('.js-furniture'),
			f_holder = domselect('.modal_holder'),
			f_links = domselect.all('.js-furniture li a'), 
			header = domselect('header'),
			allproducts = domselect('.allproducts'),
			//f_h_nav = domselect.all('ul._furnitures'),
			fnav_trigger = domselect('.js-f-container'),
			container = domselect('.scrollContainer'),
			tofade = domselect.all('.tofade'), i,

			scrollTarget = 0,
            scrollPos = 0,
            scrollEase = 0.1,
            scrollEaseLimit = 0.1,
			 
			st = 0,
        	bgHeight = ( container.scrollHeight - domselect('.bottom-quote').offsetHeight ) - ( domselect('.bottom-quote').offsetHeight + 375),
            lastScrollTop = 0;


            if(window.innerWidth <= 640){
            	var bgHeight = ( container.scrollHeight - domselect('.bottom-quote').offsetHeight ) - ( domselect('.bottom-quote').offsetHeight + 750);
            }
			f_container.classList.add('on');
			allproducts.classList.add('on');
			header.classList.remove('white');
			header.classList.remove('state_2');
        	header.classList.remove('_black');
			// [].forEach.call(f_links, function(el){
			// 	el.addEventListener('mouseenter', function(){
			// 		header.classList.add('white');
			// 		header.classList.add('on');
			// 		f_holder.classList.add('on');
			// 		[].forEach.call(f_container, function(el){
			// 			el.classList.add('white');
			// 		});
			// 	})
			// });
			

			// fnav_trigger.addEventListener('mouseenter', function(){
			// 	f_container.classList.add('on');
			// });

			// f_container.addEventListener('mouseleave', function(){
			// 	f_holder.classList.remove('on');
			// 	// this.classList.remove('on');
			// 	// this.classList.remove('white');
			// 	header.classList.remove('white');
			// 	header.classList.remove('on');
			// 	// allproducts.classList.remove('on');
			// });

	
		var el1 = domselect('.logowrapper'),
			el2 = domselect('.bigText'),
			els = domselect.all('._text span');

		//FADE ON SCROLL

			console.log(el2)

        function fadeIt(){
        	scrollTarget = container.pageXOffset  || container.scrollTop;
            st = container.pageYOffset || container.scrollTop;

            var f_trigger = domselect('.js-f-container'),
        		furnitures = domselect('._furnitures');

            furnitures.classList.remove('on');
			header.classList.remove('fur_on');
			allproducts.classList.remove('on')

        	if (scrollTarget !== scrollPos){

                if (Math.abs(scrollPos - scrollTarget) < scrollEaseLimit){
                    scrollPos = scrollTarget;
                }
                //scrollPos += ( scrollTarget - scrollPos ) / 2;
                scrollPos += (scrollTarget - scrollPos);
            	//console.log(scrollPos)

            	var transform1 = 'translate3d(0px, ' + -(scrollPos/2) + 'px, 0px)';
   
		    	el1.style.webkitTransform = transform1;
				el1.style.MozTransform = transform1;
				el1.style.msTransform = transform1;
				el1.style.OTransform = transform1;
				el1.style.transform = transform1;


				el2.style.webkitTransform = transform1;
				el2.style.MozTransform = transform1;
				el2.style.msTransform = transform1;
				el2.style.OTransform = transform1;
				el2.style.transform = transform1;

				[].forEach.call(els, function(items){
					
					items.style.webkitTransform = transform1;
					items.style.MozTransform = transform1;
					items.style.msTransform = transform1;
					items.style.OTransform = transform1;
					items.style.transform = transform1;
				})
              
            }

        	[].forEach.call(tofade, function(el) {
                var rect =  el.getBoundingClientRect();
                var bottom_of_object = rect.top;
                var bottom_of_window = window.innerHeight;

                if( bottom_of_window > bottom_of_object ){
                	if(! config.isMobile){
                    	el.classList.add('visible')
                    }
                }
                if( bottom_of_window < bottom_of_object ){
                	if(! config.isMobile){
	                    el.classList.remove('visible')
	                }
	            }
            })
        	
        	//var st = container.pageYOffset || container.scrollTop;
        	if(st < 80){
         		f_container.classList.add('on');
         		allproducts.classList.add('on');

         		header.classList.remove('state_2');
        		header.classList.remove('_white');
        		
        	}else{
         		f_container.classList.remove('on');
         		allproducts.classList.remove('on');

         		header.classList.add('state_2');
        		header.classList.add('_white');

        	}
        	if( st > bgHeight){
		   		header.classList.add('white');
				header.classList.remove('_white');
		   		header.classList.add('_black');
			
		   	}else{
		  		header.classList.remove('white');
		   		header.classList.remove('_black');
		   		header.classList.add('_white');
			}

			
        	//console.log(st, bgHeight);

			//SCROLL UP AND DOWN
		   // if (st > lastScrollTop && st > window.innerHeight ){
		   //    header.classList.add('white');
		   // } else {
		   //    header.classList.remove('white');
		   // }
		   // lastScrollTop = st;
		   // if ((window.innerHeight + container.pageYOffset) >= container.offsetHeight) {
		   //      alert("you're at the bottom of the page");
		   //  }

		   
        }

        container.addEventListener('scroll', fadeIt, false)


		// //SCROLL TO
		function scrollTo(element, to, duration) {
		    if (duration <= 0) return;
		    var difference = to - element.scrollTop,
		    	perTick = difference / duration * 10;

		    setTimeout(function() {
		        element.scrollTop = element.scrollTop + perTick;
		        if (element.scrollTop === to) return;
		        scrollTo(element, to, duration - 10);
		    }, 10);
		}
		// var hero  = domselect('.hero'), 
		// elmnt = domselect('nav.filter');
		//container.addEventListener('click', function(){
			//scrollTo(container, 1, 300);
		//})
		
		// container.style.overflow = "hidden";
		// var isScrollable = true ;

		// container.addEventListener('wheel', function(evt){
		// 	evt.preventDefault();
		// 	var delta = event.deltaY
		// 	if(delta > 0){
		// 		scrollTo(container, elmnt.offsetTop, 800);
		// 	}
		// })
		// Hamster(container).wheel(function(event, delta, deltaX, deltaY){
		  
		//   if(isScrollable){
		//   	if(deltaY < -5){
		// 	  	
		// 	  	setTimeout(function(){
		// 	  		container.style.overflow = "scroll";
			  		
		// 	  	}, 400);
		// 	  	isScrollable = false ;
		// 	 }
		//   }
		  
		// });

		// var logo = document.getElementById('logo');
		// logo.addEventListener('mouseenter', function(){
		// 	TweenLite.to('.loader', 1, {autoAlpha: 1})
		// })
		// logo.addEventListener('mouseleave', function(){
		// 	TweenLite.to('.loader', 1, {autoAlpha: 0})
		// })
		
		




	}

	animateOut(req, done) {
		classes.remove(config.$body, `is-${this.slug}`)
		TweenLite.to('.loader', 0.5, {className:"+=on", onComplete: removeClasses});
		function removeClasses(){
			TweenLite.to(this.page, 0.01, {
				//y: 0,
				autoAlpha: 0,
				ease: Expo.easeInOut,
				onComplete: done
			})
		}
	}

	destroy(req, done) {

		super.destroy()

		this.ui = null

		this.page.parentNode.removeChild(this.page)
		
		done()
	}
}

module.exports = Home