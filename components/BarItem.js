
class BarItem extends HTMLElement{
    
    constructor(){
        super()
        this.innerHTML = `
        <div class="flex bg-white w-full px-3 py-3 ">
            <button id="backBtn" class="px-2">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <p class="font-semibold text-xl px-2" id="room">${this.innerText}</p>
        </div>`
    }
}
customElements.define("bar-item", BarItem)
