import framework from 'framework'
import config from 'config'
import utils from 'utils'
import $ from 'dom-select'
import event from 'dom-event'
import classes from 'dom-classes'
import create from 'dom-create-element'
import query from 'query-dom-components'
import domselect from 'dom-select'
import Flickity from 'flickity'

class Default {
    
    constructor(opt = {}) {
        
        this.isMobile = config.isMobile
        
        this.view = config.$view
        this.page = null
        this.a = null
    }
    
    init(req, done, options) {

        const opts = options || { cache: true, sub: false }
        
        const view = this.view
        const ready = this.dataAdded.bind(this, done)
        const page = this.page = utils.biggie.loadPage(req, view, opts, ready)
    }

    dataAdded() {

        this.ui = query({ el: this.page })
        
        this.a = $.all('a', this.page)
        
        utils.biggie.addRoutingEL(this.a)

        //custom routing
        var arrayOfElements = document.querySelectorAll('.nav-item');
        utils.biggie.addRoutingEL(arrayOfElements);

        //Dynamic Title
        var tile = document.querySelectorAll('.meta-tile');
        [].forEach.call(tile, function(el){
            var t = el.dataset.title
            var titleTag = document.querySelector('title')
            titleTag.innerHTML = t
        })

        ///FULLSCREEN
        var openFls = document.querySelectorAll('.js-open-fullscreen'),
            closeFls = document.querySelector('.js-close-fullscreen'),
            parent = document.querySelector('.parentContainer'),
            kid = document.createElement("div"),
            elements = document.getElementsByTagName("*"),
            fullContainer = document.querySelector('.fullscreen');
        for (var i = 0; i < openFls.length; i++) { 
            openFls[i].addEventListener('click', openFull)
        }
        closeFls.addEventListener('click', closeFull)
        function openFull(){
            fullContainer.classList.add('on')
            var rel = this.dataset.related;
            //console.log(rel);
            [].forEach.call(elements, function(el) {
                if (el.classList.contains(rel)) {
                   
                    kid.innerHTML = el.innerHTML
                    parent.insertBefore(kid, parent.firstChild);

                }
            })

        }
        function closeFull(){
            fullContainer.classList.remove('on')
            kid.innerHTML = "";
            //parent.removeChild(kid, parent.firstChild);
        }

        ////
        //lightbox + carousel
        // var carousel = document.getElementById('carousel')
        // var gallery = document.getElementById('gallery-image')
        // var galleryImages = document.querySelectorAll('.gallery-image'), i;

        // var toCur = document.querySelector('.current')
        // var total = document.querySelector('.total')

        // for (i = 0; i < galleryImages.length; ++i) {

        //     (function(index){
        //         galleryImages[i].addEventListener('click', function(){

        //             gallery.classList.add('on')
        //             for (i = 0; i < galleryImages.length; ++i) {
        //                 //var imgs = document.createElement("img");
        //                 // imgs.src = galleryImages[i].dataset.src
        //                 var imgs = create({
        //                     selector: 'div',
        //                     styles: 'cell',
        //                     html: `
        //                             <img src=`+ galleryImages[i].dataset.src +`>
                               
        //                     `
        //                 })
        //                 carousel.appendChild(imgs)
        //             }

        //             var flkty = new Flickity( carousel, {
        //                 imagesLoaded: true,
        //                 prevNextButtons: true,
        //                 pageDots: false,
        //                 draggable: true,
        //                 wrapAround: true,
        //                 initialIndex: index
        //             });
                    
        //             flkty.select( index );
        //             flkty.on( 'select', function() {
        //                 var current =  flkty.selectedIndex + 1;
        //             })
                   
        //             gallery.querySelector('.js-close-fullscreen').addEventListener('click', function(){
        //                 gallery.classList.remove('on');
        //                 flkty.destroy();
        //                 carousel.innerHTML = "";
        //             })
        //         })
        //     })(i);
        // }

        //SEARCH
        var searchTrigger = document.querySelector('.searchTrigger'),
            search = document.querySelector('.search'),
            searchSubmit = document.querySelector('.submit');
            searchTrigger.addEventListener('click', function(){
                this.classList.add('hidden');
                search.classList.add('on');
                search.focus();

            });
            searchSubmit.addEventListener('click', function(){
                searchTrigger.classList.remove('hidden');
                search.classList.remove('on');
                //eval(search.value);

                return false;
                search.value = "";
            });



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


            
        
        
    }
    
    resize(width, height) {
        
        config.height = height
        config.width = width
    }
    
    destroy() {

        var searchContainer = document.querySelector('.searchContainer');
        searchContainer.classList.remove('is-on');
        document.body.classList.remove('is-black');
        document.body.classList.remove('is-search');

        utils.biggie.removeRoutingEL(this.a)

        this.a = null
    }
}

module.exports = Default