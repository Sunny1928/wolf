// can see others' votes: wolf
export class VoteWolf extends HTMLElement{ 
  constructor(data){
      super()
      
      // front
      var html = `
      <div class="col-start-1 col-end-13 rounded-lg">
        <div class="flex items-center justify-center m-1">
          <div class="relative text-center text-sm bg-blue-100 py-2 px-4 shadow rounded-xl w-full">
            <p class="text-xl font-black text-gray-900 mb-1">${data.information[0].description}</p>
            
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
                <button id="${data.stage}" type="button" class="voteBtn text-black bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">確認</button>
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

      console.log(data)

      // front
      var html = `
      <div class="col-start-1 col-end-13 rounded-lg">
        <div class="flex items-center justify-center m-1">
          <div class="relative text-center text-sm bg-blue-100 py-2 px-4 shadow rounded-xl w-full">
            <p class="text-xl font-black text-gray-900 mb-1">投票結果</p>
            
            <div class="bg-white divide-y divide-gray-100 rounded-lg shadow w-full" >
              <ul id="vote-result-${data.stage}" class="p-3 space-y-1 text-sm text-gray-700 text-left">`

      // li
      for(let i of data.information[0].target){

        console.log(i)
        
        html += `
        <li>
          <label  class="font-medium text-gray-900 ">
            <div class="flex p-2 rounded hover:bg-gray-100 ">
              
              <div class="ml-2 text-sm">
                    <div>${data.room_user[i]}</div>
                    <p id="vote-result-text-${data.stage}-${i}" class="text-xs font-normal text-gray-500 "></p>
              </div>
            </div>
          </label>
        </li>`
      }
        

      //back
      html += `
              
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
    <div class="col-start-1 col-end-13 rounded-lg">
      <div class="flex items-center justify-center m-1">
        <div class="relative text-center text-sm bg-blue-100 py-2 px-4 shadow rounded-xl w-full">
          <p class="text-xl font-black text-gray-900 mb-1">${data.information[0].description}</p>
          
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
              <button id="${data.stage}" type="button" class="voteBtn text-black bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">確認</button>
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
    <div class="col-start-1 col-end-13 rounded-lg">
      <div class="flex items-center justify-center m-1">
        <div class="relative text-center text-sm bg-blue-100 py-2 px-4 shadow rounded-xl w-full">
          <p class="text-xl font-black text-gray-900 mb-1">${data.information[0].description}</p>
          
          <div class="bg-white divide-y divide-gray-100 rounded-lg shadow w-full" >
            <ul id="vote-${data.stage}" class="p-3 space-y-1 text-sm text-gray-700 text-left">
            

            <li>
              <label for="save-vote-${data.stage}" class="font-medium text-gray-900 ">
                <div class="flex p-2 rounded hover:bg-gray-100 ">
                  <div class="flex items-center h-5">
                      <input id="save-vote-1" name="save-vote-${data.stage}" type="radio" value="${data.information[0].user[0]}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  </div>
                  <div class="ml-2 text-sm">
                        <div>YES</div>
                  </div>
                </div>
              </label>
            </li>
            <li>
              <label for="posion-vote-${data.stage}" class="font-medium text-gray-900 ">
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
              <button id="${data.stage}" type="button" class="voteSaveBtn text-black bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">確認</button>
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
customElements.define("vote-save", VoteSave)
customElements.define("vote-data", VoteData)
// customElements.define("message-others", MessageOthers)

