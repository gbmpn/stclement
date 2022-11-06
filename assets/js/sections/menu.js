class Menu{

    constructor(trigger, container, items) {
        this.trigger = trigger;
        this.container = container;
        this.items = items;
        this.trigger.addEventListener('click', openMenu)

        menuTrigger.addEventListener('click', openMenu)
        Array.from(this.items).forEach(item => item.addEventListener('click', closeMenu))
    }

    openMenu(){
        this.trigger.classList.toggle('close')
        this.container.classList.toggle('is-on')
        //document.body.classList.toggle('menu-on')
    }
    closeMenu(){
        
        this.trigger.classList.remove('close')
        this.container.classList.remove('is-on')
    }

    
}