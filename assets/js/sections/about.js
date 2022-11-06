import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'

import Flickity from 'flickity'
import Swiper from './swiper'
import domselect from 'dom-select'

class About extends Default {
	
	constructor(opt) {
		
		super(opt)

		this.slug = 'about'
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
		TweenLite.to('.loader', 1, {className:"-=on", delay: 0.5});
		TweenLite.to(this.page, 1, {
			y: 0,
			autoAlpha: 1,
			ease: Expo.easeInOut,
			onComplete: done
		})

		

		var f_container = document.querySelector('.js-furniture'),
			f_holder = document.querySelector('.modal_holder'),
			f_links = document.querySelectorAll('.js-furniture li a'), 
			header = document.querySelector('header'),
			allproducts = document.querySelector('.allproducts'),
			f_h_nav = document.querySelectorAll('ul._furnitures'),
			fnav_trigger = document.querySelector('.js-f-container'),
			container = document.querySelector('.scrollContainer'),
			tofade = document.querySelectorAll('.tofade'),
			st = 0, i,
			 
        	bgHeight = ( container.scrollHeight - domselect('.bottom-quote').offsetHeight ) - ( domselect('.bottom-quote').offsetHeight + 375),
            lastScrollTop = 0;

            header.classList.remove('white');
            header.classList.remove('_black');
			
  //       var isBlack = document.querySelector('.black-page');
		// if(isBlack){
		// 	classes.add(this.page, `is-black`);
		// 	classes.add(document.body, `is-black`);

		// 	classes.remove(document.body, `is-white`);
		// }else{
		// 	classes.remove(this.page, `is-black`);
		// 	classes.remove(document.body, `is-black`);

		// 	classes.add(document.body, `is-white`);
		// }

		// //FADE ON SCROLL
		// var container = document.querySelector('.page'),
		// 	tofade = document.querySelectorAll('.tofade'), i;
  //       var lastScrollTop = 0;
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

        
        function fadeIt(){

        	var f_trigger = domselect('.js-f-container'),
        		furnitures = domselect('._furnitures');

            furnitures.classList.remove('on');
			header.classList.remove('fur_on');
			allproducts.classList.remove('on')

            st = container.pageYOffset || container.scrollTop;

        	f_container.classList.add('on');
			allproducts.classList.add('on');
			//header.classList.add('white');

			var desc = domselect('.description'),
				d_rect = desc.getBoundingClientRect(),
				d_top = d_rect.top;
				console.log(d_top, st);

			// if(desc){
			// 	if(d_top < 450){
			// 		desc.classList.add('_fixed');
			// 	}
			// 	if(st > 600){
			// 		//alert('good job bro');
			// 		desc.classList.remove('_fixed');
			// 		desc.classList.add('_afterfix')
			// 	}else{
			// 		desc.classList.remove('_afterfix')
			// 	}
			// }
			


        	// [].forEach.call(tofade, function(el) {
         //        var rect =  el.getBoundingClientRect();
         //        var bottom_of_object = rect.top;
         //        var bottom_of_window = window.innerHeight;

         //        if( bottom_of_window > bottom_of_object ){
         //        	if(! config.isMobile){
         //            	el.classList.add('visible')
         //            }
         //        }
         //        if( bottom_of_window < bottom_of_object ){
         //        	if(! config.isMobile){
	        //             el.classList.remove('visible')
	        //         }
	        //     }
         //    })
        	
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
        }

        container.addEventListener('scroll', fadeIt, false)

			

		//CAROUSEL

		var swiper = document.querySelector('.swiper-container._detail'),
			swiperLenght = swiper.querySelectorAll('.swiper-slide').length,
			arrBack = document.querySelector('._detail .swiper-button-back');

		// var swiper2 = document.querySelector('.swiper-container._detail2'),
		// 	swiperLenght2 = swiper2.querySelectorAll('.swiper-slide').length,
		// 	arrBack2 = document.querySelector('._detail2 .swiper-button-back');

		

		if(swiper && swiperLenght){
			var swiper = new Swiper(swiper, {	
	            direction: 'horizontal',
				slidesPerView: 1,
				keyboardControl: true,
				speed: 1000,
				loop: false,
				simulateTouch: false,
				spaceBetween: window.innerWidth / 2,
				nextButton: '.swiper-button-next',
	        	prevButton: '.swiper-button-prev',
				mousewheelControl: false

	        });

	        swiper.on('onSlideChangeStart', function () {

		        if( swiper.activeIndex === swiperLenght - 1){
					arrBack.classList.remove('hidden');
					arrBack.addEventListener('click', function(){
						swiper.slideTo(0, 900);
						this.classList.add('hidden');
					})
		        }
		    });

		}
		// if(swiper2){
		// 	var swiper2 = new Swiper(swiper2, {	
	 //            direction: 'horizontal',
		// 		slidesPerView: 1,
		// 		keyboardControl: true,
		// 		speed: 1000,
		// 		loop: false,
		// 		simulateTouch: false,
		// 		spaceBetween: window.innerWidth / 2,
		// 		nextButton: '.swiper-button-next',
	 //        	prevButton: '.swiper-button-prev',
		// 		mousewheelControl: false

	 //        });

	 //        swiper2.on('onSlideChangeStart', function () {

		//         if( swiper2.activeIndex === swiperLenght2 - 1){
		// 			arrBack2.classList.remove('hidden');
		// 			arrBack2.addEventListener('click', function(){
		// 				swiper2.slideTo(0, 900);
		// 				this.classList.add('hidden');
		// 			})
		//         }
		//     });

		
		// }
		

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
		// var hero  = document.querySelector('.hero'), 
		// elmnt = document.querySelector('nav.filter');
		//container.addEventListener('click', function(){
			scrollTo(container, 1, 300);
		//})
	

		//FINISHES
		var colors = document.querySelectorAll('._specs li span'),
			c_finishes = document.querySelector('.enquire .finishes');
			
		[].forEach.call(colors, function(el){
			el.addEventListener('mouseenter', function(){
				//console.log(c_finishes)
				c_finishes.style.backgroundImage = 'url('+el.getAttribute('data-color')+')';
			});
			el.addEventListener('mouseleave', function(){
				c_finishes.style.backgroundImage = '';
				c_finishes.style.backgroundColor = '';
			});
		});


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

module.exports = About