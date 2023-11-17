// can see others' votes: wolf
export class VoteWolf extends HTMLElement{ 
  constructor(data){
      super()
      
      // front
      var html = `
      <div class="col-start-1 col-end-13 rounded-lg mx-1" >
        <div class="flex items-center justify-center m-1">
          <div class="relative text-center text-sm bg-gray-800 text-white py-2 px-4 shadow rounded-xl w-full">
            <p class="text-xl font-black mb-1">${data.information[0].description}</p>
            
            <div class="bg-white divide-y divide-gray-100 rounded-lg shadow w-full" >
              <ul id="vote-${data.stage}" class="p-3 space-y-1 text-sm text-gray-700 text-left">`

      // li
      for(let i of data.information[0].target){

        
        
        html += `
        <li>
          <label for="vote-${data.stage}-${i}" class="font-medium text-gray-900 ">
            <div class="flex p-2 rounded hover:bg-gray-100 ">
              <div class="flex items-center h-5">
                  <input id="vote-${data.stage}-${i}" name="vote-${data.stage}" type="radio" value=${i} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
              
              
              </div>
              <div class="ml-2 text-sm">
                    <div>${data.room_user[i]}</div>
                    <p id="vote-text-${data.stage}-${i}" class="text-xs font-normal text-gray-500 "></p>
              </div>
            </div>
          </label>
        </li>`
      }
        

      //back
      html += `
              <div class="flex justify-end">
                <div>
                  <button id="${data.stage}" type="button" class="voteBtn  bg-gray-800 text-white hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">確認</button>
                  <p id="error-${data.stage}" class="text-yellow-500 text-xs italic mt-2 text-right"></p>

                </div>
              </div>
            </ul>
          </div>

        </div>
      </div>
    </div>
      `

    this.innerHTML = html
  }
}

export class VoteData extends HTMLElement{ 
  constructor(data){
      super()

      // console.log(data)

      // front
      var html = `
      <div class="col-start-1 col-end-13 rounded-lg mx-1">
        <div class="flex items-center justify-center m-1">
          <div class="relative text-center text-sm bg-gray-800 text-white py-2 px-4 shadow rounded-xl w-full">
            <p class="text-xl font-black mb-1">投票結果</p>
            
            <div class="bg-white divide-y divide-gray-100 rounded-lg shadow w-full" >
              <ul id="vote-result-${data.stage}" class="p-3 space-y-1 text-sm text-gray-700 text-left">`

      // li
      for(let i of data.information[0].target){

        // console.log(i)
        
        html += `
        <li>
          <label  class="font-medium text-gray-900 ">
            <div class="flex p-2 rounded hover:bg-gray-100 ">
              
              <div class="w-full ml-2 text-sm">
              <div class="w-full flex justify-between">
                <div>${data.room_user[i]}</div>
                <div class="ml-2 relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-blue-400 rounded-full ">
                  <p id="vote-num-text-${data.stage}-${i}" class="font-medium text-white "></p>
                </div>
              </div>
                    <p id="vote-result-text-${data.stage}-${i}" class="text-xs font-normal text-gray-500 "></p>
              </div>
            </div>
          </label>
        </li>`
      }
        

      //back
      html += `
                <li>
                <label  class="font-medium text-gray-900 ">
                  <div class="flex p-2 rounded hover:bg-gray-100 ">
                    
                    <div class="w-full ml-2 text-sm">
                    <div class="w-full flex justify-between">
                      <div>棄票</div>
                      <div class="ml-2 relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-blue-400 rounded-full ">
                        <p id="vote-num-text-${data.stage}--1" class="font-medium text-white "></p>
                      </div>
                    </div>
                          <p id="vote-result-text-${data.stage}--1" class="text-xs font-normal text-gray-500 "></p>
                    </div>
                  </div>
                </label>
              </li>
              
            </ul>
          </div>

        </div>
      </div>
    </div>
      `

    this.innerHTML = html
  }
}

// seer dayvote hunter
export class VoteDay extends HTMLElement{ 
  constructor(data){
    super()

    
    // front
    var html = `
    <div class="col-start-1 col-end-13 rounded-lg mx-1">
      <div class="flex items-center justify-center m-1">
        <div class="relative text-center text-sm bg-gray-800 text-white py-2 px-4 shadow rounded-xl w-full">
          <p class="text-xl font-black mb-1">${data.information[0].description}</p>
          
          <div class="bg-white divide-y divide-gray-100 rounded-lg shadow w-full" >

            <ul id="vote-${data.stage}" class="p-3 space-y-1 text-sm text-gray-700 text-left">`

    // li
    for(let i of data.information[0].target){
      
      
      html += `
      <li>
        <label for="vote-${data.stage}-${i}" class="font-medium text-gray-900 ">
          <div class="flex p-2 rounded hover:bg-gray-100 ">
            <div class="flex items-center h-5">
                <input id="vote-${data.stage}-${i}" name="vote-${data.stage}" type="radio" value="${i}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ">
            </div>
            <div class="ml-2 text-sm">
                  <div>${data.room_user[i]}</div>
            </div>
          </div>
        </label>
      </li>`
    }
      

    //back
    html += `
              <li class="${'seer' == data.stage.split('-')[2] ?'hidden':''}">
              <label for="vote-${data.stage}-quit" class="font-medium text-gray-900 ">
                <div class="flex p-2 rounded hover:bg-gray-100 ">
                  <div class="flex items-center h-5">
                      <input id="vote-${data.stage}-quit" name="vote-${data.stage}" type="radio" value="-1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ">
                  </div>
                  <div class="ml-2 text-sm">
                        <div>棄票</div>
                  </div>
                </div>
              </label>
            </li>

            <div class="flex justify-end">
            <div>
            <button id="${data.stage}" type="button" class="voteBtn bg-gray-800 text-white hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">確認</button>
            <p id="error-${data.stage}" class="text-yellow-500 text-xs italic mt-2 text-right"></p>
            </div>
            </div>
          </ul>
        </div>

      </div>
    </div>
  </div>
    `

  this.innerHTML = html
  }
}

export class VoteSave extends HTMLElement{ 
  constructor(data){
    super()

    
    // front
    var html = `
    <div class="col-start-1 col-end-13 rounded-lg mx-1">
      <div class="flex items-center justify-center m-1">
        <div class="relative text-center text-sm bg-gray-800 text-white py-2 px-4 shadow rounded-xl w-full">
          <p class="text-xl font-black mb-1">${data.information[0].description}</p>
          
          <div class="bg-white divide-y divide-gray-100 rounded-lg shadow w-full" >
            <ul id="vote-${data.stage}" class="p-3 space-y-1 text-sm text-gray-700 text-left">
            

            <li>
              <label for="save-vote-${data.stage}" class="font-medium text-gray-900 ">
                <div class="flex p-2 rounded hover:bg-gray-100 ">
                  <div class="flex items-center h-5">
                      <input id="save-vote-${data.stage}" name="save-vote-${data.stage}" type="radio" value="${data.information[0].user[0]}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  </div>
                  <div class="ml-2 text-sm">
                        <div>YES</div>
                  </div>
                </div>
              </label>
            </li>
            <li>
              <label for="poison-vote-${data.stage}" class="font-medium text-gray-900 ">
                <div class="flex p-2 rounded hover:bg-gray-100 ">
                  <div class="flex items-center h-5">
                      <input id="poison-vote-${data.stage}" name="save-vote-${data.stage}" type="radio" value="poison" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  </div>
                  <div class="ml-2 text-sm">
                        <div>NO</div>
                  </div>
                </div>
              </label>
            </li>

      
            <div class="flex justify-end">
              <div>
                <button id="${data.stage}" type="button" class="voteSaveBtn text-black bg-gray-800 text-white hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">確認</button>
                <p id="error-save-${data.stage}" class="text-yellow-500 text-xs italic mt-2 text-right"></p>
              </div>
            </div>
          </ul>
        </div>

      </div>
    </div>
  </div>
    `

    this.innerHTML = html
  }
}

export class DialogueWolf extends HTMLElement{
  constructor(player, roles, data){
    super()
    // console.log("data")
    // console.log(player)

    let players_without_wolf = player

    // delete players
    for(let i of data.information[0].target){
      let player_index = players_without_wolf.indexOf(i)
      if (player_index > -1) { 
        players_without_wolf.splice(player_index, 1);
      }
    }
    

    var html = `
    <div class="col-start-1 col-end-13 rounded-lg mx-1">
      <div class="flex items-center justify-center m-1">
        <div class="relative text-center text-sm bg-gray-800 text-white py-2 px-4 shadow rounded-xl w-full">
          <p class="text-xl font-black mb-1">狼人玩家發言</p>
          
          <div class="bg-white divide-y divide-gray-100 rounded-lg shadow w-full" >

            <ul id="vote-${data.stage}-${players_without_wolf}" class="p-3 space-y-1 text-sm text-gray-700 text-left">

      <li>
        <label for="${data.stage}-0" class="font-medium text-gray-900 ">
          <div class="flex p-2 rounded hover:bg-gray-100 items-center">
            <div class="flex items-center h-5">
                <input id="${data.stage}-0" name="${data.stage}" type="radio" value="0" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ">
            </div>
            <div class="ml-2 text-sm flex items-center ">
                  <div>我同意</div>
                  <select name="player1-${data.stage}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 ml-1">`

                  for(let i of data.information[0].target){
                    html+=`<option value="${data.room_user[i]}(${i})">${data.room_user[i]}(${i}) </option>`
                  }

                html+=  `</select>
            </div>
          </div>
        </label>
      </li>

      <li>
        <label for="${data.stage}-1" class="font-medium text-gray-900 ">
          <div class="flex p-2 rounded hover:bg-gray-100 items-center">
            <div class="flex items-center h-5">
                <input id="${data.stage}-1" name="${data.stage}" type="radio" value="1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ">
            </div>
            <div class="ml-2 text-sm  flex items-center">
                <div class="">

                  <div>我想刀</div>
                  <select name="player2-${data.stage}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 ml-1">`
                    
                  for(let i of players_without_wolf){
                    html+=`<option value="${data.room_user[i]}(${i})">${data.room_user[i]}(${i}) </option>`
                  }

            html+= `</select>
                </div>
                <div class="">
                  <div>覺得他是什麼</div>
                  <select name="role-${data.stage}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 ml-1">`
                    
                  for(let i of roles){
                    html+=`<option value="${i}">${i}</option>`
                  }
                    
            html+=  `</select>
                </div>
            </div>
          </div>
        </label>
      </li>

            <li>
              <label for="${data.stage}-3" class="font-medium text-gray-900 ">
                <div class="flex p-2 rounded hover:bg-gray-100 ">
                  <div class="flex items-center h-5">
                      <input id="${data.stage}-3" name="${data.stage}" type="radio" value="3" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ">
                  </div>
                  <div class="ml-2 text-sm">
                        <div>我想自刀</div>
                  </div>
                </div>
              </label>
            </li>

            <li>
              <label for="${data.stage}-2" class="font-medium text-gray-900 ">
                <div class="flex p-2 rounded hover:bg-gray-100 ">
                  <div class="flex items-center h-5">
                      <input id="${data.stage}-2" name="${data.stage}" type="radio" value="2" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ">
                  </div>
                  <div class="ml-2 text-sm">
                        <div>無發言</div>
                  </div>
                </div>
              </label>
            </li>

            <div class="flex justify-end">
            <div>
            <button id="${data.stage}" type="button" class="dialogueWolfBtn text-black bg-gray-800 text-white hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">確認</button>
            <p id="error-${data.stage}" class="text-yellow-500 text-xs italic mt-2 text-right"></p>
            </div>
            </div>
          </ul>
        </div>

      </div>
    </div>
  </div>
    `
    this.innerHTML = html

  }
}

// witch



customElements.define("vote-day", VoteDay)
customElements.define("vote-wolf", VoteWolf)
customElements.define("dialogue-wolf", DialogueWolf)
customElements.define("vote-save", VoteSave)
customElements.define("vote-data", VoteData)
// customElements.define("message-others", MessageOthers)

