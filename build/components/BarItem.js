
class BarItem extends HTMLElement{
    
    constructor(){
        super()
        this.innerHTML = `
        <div class="flex bg-white w-full px-3 py-3 ">
            <div class="flex w-full">
              <button id="backBtn" class="px-2">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <p class="font-semibold text-xl px-2" id="room">${this.innerText}</p>
            </div>
            <button id="settingRoleBtn" class="px-2">
                <i class="fa-solid fa-gear"></i>
              </button>
        </div>`
    }
}
customElements.define("bar-item", BarItem)
