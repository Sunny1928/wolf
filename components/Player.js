var max_name_length = 7

export class PlayerItem extends HTMLElement{
    constructor(me, id, user_name, delte_btn=0){
        super()
        var html = `
            <div id="player-${id}" class=" ">
                <div class="flex flex-row items-start justify-center ">
                    <div class="relative">
                    
                        <div class="${me == user_name ?'border-dotted border-2 border-black ':''} relative shadow-xl font-medium flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 flex-shrink-0 bg-color-${id}" >
                            <img class="absolute w-6 h-6" src="/images/wolf.png" alt="Medium avatar">
                            <div class="font-extrabold z-10">${id}</div>

                        </div>`
        if(delte_btn){
            html+= `<div id="${user_name}" class="deletePlayer flex text-white items-center justify-center absolute top-0 left-8 transform -translate-y-1/2 w-3.5 h-3.5 bg-gray-900 border-2 border-white rounded-full">
                <p class="ml-[1px] mb-[2px]">×</p>
            </div>`
        }
                
            html+= `</div>
                </div>
                <p class="tracking-wide text-gray-600 text-xs font-semibold">${user_name.length > max_name_length ? user_name.substring(0,max_name_length)+'...' : user_name} </p>
            </div>`

        
        this.innerHTML = html
    }
}
customElements.define("player-item", PlayerItem)


