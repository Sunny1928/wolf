
class RoomItem extends HTMLElement{
    
    constructor(room){
        super()
        this.innerHTML = `
        <div class="px-6 py-4 bg-white border border-gray-200 rounded-lg shadow text-left">
          <div class="flex justify-between items-center">
            <h6 class="flex items-center justify-center uppercase text-base font-bold tracking-tight text-gray-900">
              <span>${room.room_name}</span> : ${room.room_state}

              <div class="relative mr-2  inline-flex shadow items-center justify-center w-4 h-4 overflow-hidden bg-yellow-500 rounded-full">
                <span class="font-medium text-white text-[3px]">${room.room_user.length}</span>
              </div>

            </h6>
            <button id="joinBtn" class="inline-flex items-center px-2 py-2 text-xs font-medium text-blue-600 hover:text-blue-800 ${room.room_state == 'started' ? 'hidden':''}">
                加入
                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
          </div>      
              <div class="block ">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">人數:${room.game_setting.player_num}</span>
                <span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">村民:${room.game_setting.village}</span>
                <span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">狼人:${room.game_setting.werewolf}</span>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full ${'seer' in room.game_setting ?'':'hidden'}">預言家</span>
                <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full ${'witch' in room.game_setting ?'':'hidden'}">女巫</span>
                <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full ${'hunter' in room.game_setting ?'':'hidden'}">獵人</span>
              </div>

              
            </div>`
    }
}
customElements.define("room-item", RoomItem)

export {RoomItem}
