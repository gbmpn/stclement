import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'

import Flickity from 'flickity'

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
			tofade = document.querySelectorAll('.tofade'), i,
			 
        	//bgHeight = ( container.scrollHeight - document.querySelector('.bottom-quote').offsetHeight ) - ( document.querySelector('.bottom-quote').offsetHeight + 375),
            lastScrollTop = 0;

			f_container.classList.add('on');
			allproducts.classList.add('on');
			header.classList.add('white');

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
			// 	header.classList.add('on');
			// 	f_holder.classList.add('on');
			// 	f_container.classList.add('on');
			// });

			// f_container.addEventListener('mouseleave', function(){
			// 	f_holder.classList.remove('on');
			// 	this.classList.remove('white');
			// 	header.classList.remove('on');
			// 	allproducts.classList.remove('on');
			// });

		//CAROUSEL
        
        // var swiper = new Swiper('._main', {
        //     pagination: '.swiper-pagination',
        //     direction: 'horizontal',
        //     slidesPerView: 1,
        //     keyboardControl: true,
        //     speed: 1000,
        //     mousewheelControl: false
            
        // });


		// //FADE ON SCROLL
		// var container = document.querySelector('.page'),
		// 	tofade = document.querySelectorAll('.tofade'), i;
  //       var lastScrollTop = 0;

        function fadeIt(){
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
        	
        	var st = container.pageYOffset || container.scrollTop;
        	if(st < 80){
        		f_container.classList.add('on');
        		allproducts.classList.add('on');

        		header.classList.remove('state_2');
        		header.classList.remove('_black');
    //      		f_container.addEventListener('mouseleave', function(){
				// 	this.classList.add('on');
				// });
        		
        	}else{
        		f_container.classList.remove('on');
        		allproducts.classList.remove('on');

        		header.classList.add('state_2');
        		header.classList.add('_black');
    //     		f_container.addEventListener('mouseleave', function(){
				// 	this.classList.remove('on');
				// });
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

        container.addEventListener('scroll', fadeIt, false)


        
        //var carousel = document.querySelector('.carousel');
		// if(carousel){
		// 	var flkty = new Flickity( carousel, {
		// 	  imagesLoaded: true,
		// 	  //autoPlay: 3000,
		// 	  percentPosition: false,
		// 	  prevNextButtons: false,
		// 	  pageDots: false,
		// 	  wrapAround: true,
		// 	  draggable: true,
		// 	  accessibility: true,
		// 	  cellAlign: 'left'
		// 	});
		// 	document.onkeydown = checkKey;

		// 	function checkKey(e) {

		// 	    e = e || window.event;

		// 	    if (e.keyCode == '38') {
		// 	       flkty.previous();
		// 	    }
		// 	    else if (e.keyCode == '40') {
		// 	       flkty.next();
		// 	    }
		// 	    else if (e.keyCode == '37') {
		// 	       flkty.previous();
		// 	    }
		// 	    else if (e.keyCode == '39') {
		// 	       flkty.next();
		// 	    }

		// 	}

		// 	var current = carousel.querySelector('.is-selected'),
		// 		nextElement = current.nextSibling;
		// 		console.log(nextElement)
		// 	carousel.addEventListener('mouseenter', function(){
		// 		//TweenLite.to(nextElement, 1, {left: -150});
		// 		console.log('entered');
		// 		nextElement.style.left = -150;
		// 	})
		// }


		// //FILTERING
		// var navbtn = document.querySelectorAll('.button'), i;
		// [].forEach.call(navbtn, function(al) {
  //       	al.addEventListener('click', function(){ 
    
  //           	document.querySelector('.is-checked').classList.remove('is-checked') 
  //           	this.classList.add('is-checked')
            	
  //           	var match = this.dataset.filter 
            	
  //           	var project = document.querySelectorAll('.item'); 
		// 		[].forEach.call(project, function(el) {
		//     		el.classList.add('fade')
		// 		  	setTimeout(function(){
		// 		  		el.classList.add('none')
		// 		  	},300) 
		// 		  	if( el.classList.contains(match)){ 
		// 		  		setTimeout(function(){
		// 		  			el.classList.remove('none')
		// 		  		},300)
		// 		  		setTimeout(function(){
		// 		  			el.classList.remove('fade')
		// 		  		},400)
		// 		  	}
		// 		  	if ( match === "*") { 
		// 		  		setTimeout(function(){
		// 		  			el.classList.remove('none')
		// 		  		},300)
		// 		  		setTimeout(function(){
		// 		  			el.classList.remove('fade')
		// 		  		},400)
		// 		  	}
		// 		})
		// 	})
		// })

		// //SCROLL TO
		// function scrollTo(element, to, duration) {
		//     if (duration <= 0) return;
		//     var difference = to - element.scrollTop,
		//     	perTick = difference / duration * 10;

		//     setTimeout(function() {
		//         element.scrollTop = element.scrollTop + perTick;
		//         if (element.scrollTop === to) return;
		//         scrollTo(element, to, duration - 10);
		//     }, 10);
		// }
		// var hero  = document.querySelector('.hero'), 
		// elmnt = document.querySelector('nav.filter');
		// container.addEventListener('click', function(){
		// 	scrollTo(container, elmnt.offsetTop, 300);
		// })
		
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

		TweenLite.to(this.page, 0.7, {
			y: 0,
			autoAlpha: 0,
			ease: Expo.easeInOut,
			onComplete: done
		})
	}

	destroy(req, done) {

		super.destroy()

		this.ui = null

		this.page.parentNode.removeChild(this.page)
		
		done()
	}
}

module.exports = Home