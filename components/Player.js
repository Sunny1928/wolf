class PlayerItem extends HTMLElement{
    constructor(id, state, user_name){
        super()
        
        this.innerHTML = `
            <div class=" ">
                <div class="flex flex-row items-start justify-center ">
                    <div class="shadow-xl font-medium flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 flex-shrink-0 bg-color-${id}" >
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
