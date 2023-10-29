
class BarItem extends HTMLElement{
    
    constructor(){
        super()
        this.innerHTML = `
        <div class="flex bg-white w-full px-3 py-3 rounded-t-xl">
            <div class="flex w-full">
              <button id="backBtn" class="px-2">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <p class="font-semibold text-xl px-2" id="room">${this.innerText}</p>
              <a href="/intro.html" target="_blank" class="flex items-center justify-between font-medium text-center text-gray-500 ">
                <svg class="w-5 h-5  shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
              </a>
            </div>
            <button id="settingRoleBtn" class="px-2">
              <i class="fa-solid fa-gear"></i>
            </button>
        </div>`
    }
}

class TestBarItem extends HTMLElement{
    
  constructor(){
      super()
      this.innerHTML = `
      <div class="flex bg-white w-full px-3 py-3 rounded-t-xl">
          <div class="flex w-full">
            <button id="backBtn" class="px-2">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <p class="font-semibold text-xl px-2" id="room">${this.innerText}</p>
            <a href="/intro.html" target="_blank" class="flex items-center justify-between font-medium text-center text-gray-500 ">
              <svg class="w-5 h-5  shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
            </a>
          </div>
          <button id="resetGameBtn" class="px-2">
            <i class="fa-solid fa-refresh"></i>
          </button>
          <button id="settingRoleBtn" class="px-2">
            <i class="fa-solid fa-gear"></i>
          </button>
      </div>`
  }
}
customElements.define("bar-item", BarItem)
customElements.define("test-bar-item", TestBarItem)
