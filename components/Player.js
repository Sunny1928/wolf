class PlayerItem extends HTMLElement{
    constructor(id, state, user_name){
        super()
        
        this.innerHTML = `
            <div id="player-${id}" class=" ">
                <div class="flex flex-row items-start justify-center ">
                    <div class="relative shadow-xl font-medium flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 flex-shrink-0 bg-color-${id}" >
                        <div>
                            <p>${id}</p>
                            <p id="player-state-${id}" class="-mt-2" style="font-size: 4px;">${state}</p>
                        </div>
                        
                    </div>
                </div>
                <p class="tracking-wide text-gray-600 text-xs font-semibold"> ${user_name} </p>
            </div>`
    }
}
customElements.define("player-item", PlayerItem)

export {PlayerItem}

/* <div id="teammate-${id}" class=" top-0 left-7 absolute  w-4 h-4 bg-gray-600 border-2 border-white dark:border-gray-800 rounded-full text-[2px] text-white flex items-center justify-center">
    <p>T</p>
</div>  */