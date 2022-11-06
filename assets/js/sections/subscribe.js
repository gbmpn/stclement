import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'

import Flickity from 'flickity'
import Swiper from './swiper'
import domselect from 'dom-select'

class Furniture extends Default {
	
	constructor(opt) {
		
		super(opt)

		this.slug = 'furniture'
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
			 
        	//bgHeight = ( container.scrollHeight - document.querySelector('.bottom-quote').offsetHeight ) - ( document.querySelector('.bottom-quote').offsetHeight + 375),
            lastScrollTop = 0;

			
        var isBlack = document.querySelector('.black-page');
		if(isBlack){
			classes.add(this.page, `is-black`);
			classes.add(document.body, `is-black`);

			classes.remove(document.body, `is-white`);
		}else{
			classes.remove(this.page, `is-black`);
			classes.remove(document.body, `is-black`);

			classes.add(document.body, `is-white`);
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

        
        function fadeIt(){

        	var f_trigger = domselect('.js-f-container'),
        		furnitures = domselect('._furnitures');

            furnitures.classList.remove('on');
			header.classList.remove('fur_on');
			allproducts.classList.remove('on')

            st = container.pageYOffset || container.scrollTop;

        	f_container.classList.add('on');
			allproducts.classList.add('on');
			header.classList.add('white');
        	
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
        }

        container.addEventListener('scroll', fadeIt, false)

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

module.exports = Furniture