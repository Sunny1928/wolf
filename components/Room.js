
class RoomItem extends HTMLElement{
    
    constructor(room){
        super()
        this.innerHTML = `
        <div class="max-w-sm px-6 py-3 bg-white border border-gray-200 rounded-lg shadow text-left">
              <h6 class="text-xl font-bold tracking-tight text-gray-900">${room}</h6>
              <div class="block mt-2 mb-3">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded-full">People: 6</span>
                <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded-full">Villager: 2</span>
                <span class="bg-red-100 text-red-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded-full">Wolf: 2</span>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded-full">Predictor</span>
                <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded-full">Witch</span>
                <span class="bg-green-100 text-green-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded-full">Hunter</span>
              </div>

              <button id="joinBtn" class="inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Join 
                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </button>
            </div>`
    }
}
customElements.define("room-item", RoomItem)

export {RoomItem}
