import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'

import Flickity from 'flickity'
import domselect from 'dom-select'
//import Swiper from './swiper'


class Home extends Default {
	
	constructor(opt) {
		
		super(opt)

		this.slug = 'search'
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

		var isBlack = document.querySelector('.black-page');
		if(isBlack){
			classes.add(this.page, `is-black`);
		}

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
			 
        	//bgHeight = ( container.scrollHeight - document.querySelector('.bottom-quote').offsetHeight ) - ( document.querySelector('.bottom-quote').offsetHeight + 375),
            lastScrollTop = 0;

			f_container.classList.add('on');
			allproducts.classList.add('on');
			header.classList.add('white');


		// //FADE ON SCROLL
		// var container = document.querySelector('.page'),
		// 	tofade = document.querySelectorAll('.tofade'), i;
  //       var lastScrollTop = 0;

        function fadeIt(){
        	var f_trigger = domselect('.js-f-container'),
        		furnitures = domselect('._furnitures');

            furnitures.classList.remove('on');
			header.classList.remove('fur_on');
			allproducts.classList.remove('on')

        	st = container.pageYOffset || container.scrollTop;
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
        	
        	
        	if(st < 80){
        		f_container.classList.add('on');
        		allproducts.classList.add('on');

        		header.classList.remove('state_2');
        		header.classList.remove('_black');
        		
        	}else{
        		f_container.classList.remove('on');
        		allproducts.classList.remove('on');

        		header.classList.add('state_2');
        		header.classList.add('_black');

        	}

        	

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

        // container.addEventListener('scroll', function(event){
        //     event.preventDefault();
        //     st = container.pageYOffset || container.scrollTop;
            
        // });

        container.addEventListener('scroll', fadeIt, false)
        // container.addEventListener('scroll', function(event){
        //     event.preventDefault();
        //     st = container.pageYOffset || container.scrollTop;
        //     //console.log(st);
        // });

        // function update(){
        //     fadeIt();
        //     window.requestAnimFrame(update);
        // }

        // update();

		//FINISHES
		var pictures = document.querySelectorAll('.search-block ul li a'),
			c_search = document.querySelector('.featured .image');
			
		[].forEach.call(pictures, function(el){
			el.addEventListener('mouseenter', function(){
				//console.log(c_search)

				c_search.style.backgroundImage = 'url('+el.getAttribute('data-img')+')';
				c_search.style.backgroundSize = 'cover';
				c_search.style.backgroundRepeat = 'no-repeat';
			});
			el.addEventListener('mouseleave', function(){
				c_search.style.backgroundImage = '';
				c_search.style.backgroundColor = '';
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

module.exports = Home