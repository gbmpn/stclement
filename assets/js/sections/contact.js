import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'

import Flickity from 'flickity'
import Swiper from './swiper'
import domselect from 'dom-select'

class Contact extends Default {
	
	constructor(opt) {
		
		super(opt)

		this.slug = 'contact'
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

		// //FADE ON SCROLL
		// var container = document.querySelector('.page'),
		// 	tofade = document.querySelectorAll('.tofade'), i;
  //       var lastScrollTop = 0;
  	
       
		var el1 = domselect('.showroom p'), 
			scrollTarget = 0,
            scrollPos = 0,
            scrollEase = 0.1,
            scrollEaseLimit = 0.1;

		//FADE ON SCROLL
		

        function fadeIt(){
        	var f_trigger = domselect('.js-f-container'),
        		furnitures = domselect('._furnitures');

            furnitures.classList.remove('on');
			header.classList.remove('fur_on');
			allproducts.classList.remove('on')
			
        	scrollTarget = container.pageXOffset  || container.scrollTop;
            st = container.pageYOffset || container.scrollTop;

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
			}

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

        		var f_trigger = domselect('.js-f-container'),
        			furnitures = domselect('._furnitures');
        	}
        }

        container.addEventListener('scroll', fadeIt, false)
      


        //MAP
        init();
        function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
           var mapOptions = {};
           if(! config.isMobile){
           		mapOptions = {
	                zoom: 15,
	                scrollwheel:  false,
	                center: new google.maps.LatLng(-36.8612301, 174.7558541),
	                draggable: true,
	                styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	            };
           }else{
	           	mapOptions = {
	                zoom: 15,
	                scrollwheel:  false,
	                center: new google.maps.LatLng(-36.8612301, 174.7558541),
	                draggable: false,
	                disableDoubleClickZoom: false,
	                styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	            };
           }

            // Get the HTML DOM element that will contain your map 
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('map');

            // Create the Google Map using our element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);
            var customMarker = '../images/marker.png';
            // Let's also add a marker while we're at it
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(-36.8612301, 174.7558541),
                icon: customMarker,
                map: map,
                title: 'DesignDairy'
            });
        }
   


      

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

module.exports = Contact