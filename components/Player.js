var max_name_length = 8

export class PlayerItem extends HTMLElement{
    constructor(me, id, user_name, delte_btn=0){
        super()
        var html = `
            <div id="player-${id}" class=" ">
                <div class="flex flex-row items-start justify-center ">
                    <div class="relative">
                        <div class="${me == user_name ?'border-dotted border-2 border-black ':''} relative shadow-xl font-medium flex items-center justify-center h-10 w-10 rounded bg-gray-300 flex-shrink-0 bg-color-${id}" >
                            <div>
                                <p>${id}</p>
                            </div>
                        </div>`
        if(delte_btn){
            html+= `<div id="${user_name}" class="deletePlayer flex text-white items-center justify-center absolute top-0 left-8 transform -translate-y-1/2 w-3.5 h-3.5 bg-gray-900 border-2 border-white dark:border-gray-800 rounded-full">
                <p class="ml-[1px] mb-[2px]">×</p>
            </div>`
        }
                
            html+= `</div>
                </div>
                <p class="tracking-wide text-gray-600 text-xs font-semibold"> ${user_name.length > max_name_length ? user_name.substring(0,max_name_length)+'...' : user_name} </p>
            </div>`

        
        this.innerHTML = html
    }
}
customElements.define("player-item", PlayerItem)


/* <div id="teammate-${id}" class=" top-0 left-7 absolute  w-4 h-4 bg-gray-600 border-2 border-white dark:border-gray-800 rounded-full text-[2px] text-white flex items-center justify-center">
    <p>T</p>
</div>  */

/* <p id="player-state-${id}" class="-mt-2" style="font-size: 4px;">${state}</p> */
