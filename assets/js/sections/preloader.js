import config from 'config'
import classes from 'dom-classes'
import create from 'dom-create-element'
import gsap from 'gsap'
import domselect from 'dom-select'

TweenLite.defaultEase = Expo.easeOut

class Preloader {
	
	constructor(onComplete) {
		
		this.preloaded = onComplete
		this.view = config.$view
		this.el = null

		this.isMobile = config.isMobile = config.width <= 1024 ? true : false
	}
	
	init(req, done) {

		classes.add(config.$body, 'is-loading')
        	
		this.createDOM()

		done()
	}
	
	createDOM() {
		
		const page = this.view.firstChild

		this.el = create({
			selector: 'div',
			styles: 'preloader',
		})

		this.view.insertBefore(this.el, page)

		

		//MOBILE-MENU-HAMBURGER
		var menuTrigger = document.querySelector('.js-menu-toggle'),
		    menuContainer = document.querySelector('.mobile-menu'),
		    header = document.querySelector('header'),
		    logo = document.querySelector('.logo'),
		    menuItem = document.querySelectorAll('.menu-nav .nav-item'),
		    i;

		menuTrigger.addEventListener('click', openMenu);
		logo.addEventListener('click', closeMenu);

		[].forEach.call(menuItem, function(item){
			item.addEventListener('click', closeMenu);
		});
		// Array.from(menuItem).forEach(function (item) {
		// 	return item.addEventListener('click', closeMenu);
		// });

		function openMenu() {
			this.classList.toggle('close');
			// if (header.classList.contains('white')) {
			// 	//header.classList.add('white')
			// } else {
			// 	//
			// }
			header.classList.toggle('white');
			menuContainer.classList.toggle('is-on');
			//document.body.classList.toggle('menu-on')
		}
		function closeMenu() {
			menu.classList.remove('is-on');
			header.classList.remove('white');
			menuTrigger.classList.remove('close');
		}

  		var f_container = document.querySelector('.js-furniture'),
			f_holder = document.querySelector('.modal_holder'),
			header = document.querySelector('header'),
			allproducts = document.querySelector('.allproducts'),
			fnav_trigger = document.querySelector('.js-f-container'),
			searchContainer = document.querySelector('.searchContainer'),
			tofade = document.querySelectorAll('.tofade'),

			header = document.querySelector('header'),
			searchTrigger = document.querySelector('.search'),
			st = 0, i;


  		function fadeIt(){

  			var f_trigger = domselect('.js-f-container'),
        		furnitures = domselect('._furnitures');

            st = searchContainer.pageYOffset || searchContainer.scrollTop;

        	f_container.classList.remove('on');
			allproducts.classList.remove('on');
			header.classList.remove('white');
        	
        	if(st < 80){
        		f_container.classList.add('on');
        		allproducts.classList.add('on');

        		header.classList.remove('state_2');
        		header.classList.remove('_white');
        		header.classList.remove('_black');

        		
        	}else{
        		f_container.classList.remove('on');
        		allproducts.classList.remove('on');

        		header.classList.add('state_2');

        		header.classList.add('_black');
        		header.classList.remove('_white');

        	}
        }
        searchContainer.addEventListener('scroll', fadeIt, false)


        // ENQUIRE ACTION
        var enquireTrigger = domselect.all('.js-enquire'),
        	enquireClose = domselect('.js-close-enquire'),
        	enquireCont = domselect('.enquireContainer');

        //EVENT Handler
        enquireClose.addEventListener('click', closeEnquire);
        [].forEach.call(enquireTrigger, function(els){
        	els.addEventListener('click', openEnquire);
        })
        
        function openEnquire(){
        	enquireCont.classList.add('on')
        }
        function closeEnquire(){
        	enquireCont.classList.remove('on')
        }


        //NAV TOGGLE
        function toggleClass(el, _class) {
			if (el && el.className && el.className.indexOf(_class) >= 0) {
				var pattern = new RegExp('\\s*' + _class + '\\s*');
				el.className = el.className.replace(pattern, ' ');
			}
			else if (el){
				el.className = el.className + ' ' + _class;
			}
			else {
				console.log("Element not found");
			}
		}
		
        var f_trigger = domselect('.js-f-container'),
        		furnitures = domselect('._furnitures');
        f_trigger.addEventListener('click', function(){
					
			toggleClass(header, 'fur_on');
			toggleClass(furnitures, 'on');
				toggleClass(allproducts, 'on');
			setTimeout(function(){
				
				// furnitures.classList.toggle('on')
				// allproducts.classList.toggle('on')
			}, 100)

		})
		
		
		 
	}

	resize(width, height) {

		config.width = width
		config.height = height
	}

	animateIn(req, done) {

		const tl = new TimelineMax({ paused: true, onComplete: () => {
			done()
			// call this.preloaded to bring the first route
			this.preloaded()
		}});
		tl.to(this.el, 0.01, {autoAlpha: 1})
		tl.restart()
	}
	
	animateOut(req, done) {

		const tl = new TimelineMax({ paused: true, onComplete: done })
		tl.to(this.el, 0.01, {autoAlpha: 0})
		tl.restart()
	}

	destroy(req, done) {

		classes.add(config.$body, 'is-loaded')
		classes.remove(config.$body, 'is-loading')

		this.view.removeChild(this.el)

		done()
	}
}

module.exports = Preloader