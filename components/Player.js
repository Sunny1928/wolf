class PlayerItem extends HTMLElement{
    constructor(){
        super()
        
        this.innerHTML = `
            <div class="">
                <div class="flex flex-row items-start justify-center ">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300  flex-shrink-0" >
                    S
                    </div>
                </div>
                <p class="tracking-wide text-gray-700 text-xs font-bold"> ${this.innerText} </p>
            </div>
        `
    }
}
customElements.define("player-item", PlayerItem)

