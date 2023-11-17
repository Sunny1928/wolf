export class IntelligentAgentInfo extends HTMLElement{ 
  constructor(name, data, current_tab){
    super()


    let html = `<div class="">
      <div class="md:w-[400px] md:h-[750px] border border-gray-200 rounded-lg shadow">
          <div class="w-full p-4 pb-2 flex justify-between flex-wrap text-sm font-medium text-center  border-gray-200 rounded-t-lg bg-gray-50">
            <div class="text-2xl font-extrabold flex items-center justify-center">${name}</div>
            <div class="bg-white p-2 rounded-lg leading-tight text-gray-500 block text-left">
              <div class="flex"><span class="mr-1">Token Used:</span>${data.detail.token}</div>
              <div class="flex">
                <span class="mr-1">Role Accuracy: </span>
                <div class="flex items-center justify-center">
                  <div class="relative bg-gray-400 rounded-full p-0.2 md:w-[100px] ">
                    <div class="bg-blue-600 text-gray-200 p-0.2 leading-none rounded-full" style="width: ${data.detail.role_accuracy}%">&nbsp;</div>
                    <div class="absolute top-0 left-0 text-xs font-medium text-white text-left leading-none rounded-full" style="padding: 2px;">${data.detail.role_accuracy}%</div>
                  </div>
                </div>
              </div>
              </div>
          </div>
          <ul class="w-full flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50">`
      
      // add li
      html+=`<li class="mr-2">
                  <button data-tabs-target="memory-tab" type="button" aria-selected="false" class="${current_tab == 'memory-tab'? 'text-blue-600':''} tab inline-block p-4 py-2 rounded-tl-lg hover:bg-gray-100">Memory</button>
              </li>
              <li class="mr-2">
                  <button data-tabs-target="guess-roles-tab" type="button" aria-selected="false" class="${current_tab == 'guess-roles-tab'? 'text-blue-600':''} tab inline-block p-4 py-2 hover:bg-gray-100 ">Guess Roles</button>
              </li>`



      html+=`</ul>
            <div class="h-full w-full"  id="${name}-defaultTabContent">
              <div id="memory-tab" class="md:h-[600px] overflow-hidden overflow-y-auto bg-gray-500 p-6 bg-white rounded-lg ${current_tab == 'memory-tab'? '':'hidden'}" >`
              
              // add memory   
              for(const line of data.memory.split('\n'))
                html +=`
                  <p class="mb-1 text-gray-500">${line}</p>`

            html+=`
              </div>
              <div id="guess-roles-tab" class="md:h-[600px] overflow-hidden overflow-y-auto p-6 bg-white rounded-lg ${current_tab == 'guess-roles-tab'? '':'hidden'}" >
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" class="px-4 py-2">
                                  玩家
                              </th>
                              <th scope="col" class="px-4 py-2">
                                  信心程度
                              </th>
                              <th scope="col" class="px-4 py-2">
                                  猜測身份
                              </th>
                              <th scope="col" class="px-4 py-2">
                                  真實身份
                              </th>
                          </tr>
                      </thead>
                      <tbody>`


                      for (const [id, arr] of Object.entries(data.guess_roles)) {

                        html+=`
                              <tr class="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <th scope="row" class="flex items-center px-3 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                      <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                        <span class="font-medium text-gray-600 dark:text-gray-300">${id}</span>
                                      </div>
                                  </th>
                                  <td class="px-3 py-4">
                                      <div class="relative bg-gray-400 rounded-full p-0.2 md:w-[50px]">
                                        <div class="bg-blue-600 text-gray-200 p-0.2 leading-none rounded-full" style="width: ${arr[2]}%">&nbsp;</div>
                                        <div class="absolute top-0 left-0 text-xs font-medium text-white text-left leading-none rounded-full" style="padding: 2px;">${arr[2]}%</div>
                                      </div>
                                  </td>
                                  <td class="px-3 py-4">
                                      <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-${(arr[3]==1) ? 'green' : (arr[3]==0) ? 'red' :'yellow'}-500 mr-2"></div> ${arr[0]}
                                      </div>
                                  </td>
                                  <td class="px-3 py-4">
                                    <div class="flex items-center">
                                    ${arr[1]}
                                    </div>
                                </td>
                              </tr>`
                      }
                      
                          // add one role
                html+=`</tbody>
                  </table>
                </div>
              </div>`

              // add new data
              // html+=`<div class="md:h-[600px] overflow-hidden overflow-y-auto bg-gray-500 p-6 bg-white rounded-lg hidden" id="${name}-memory" role="tabpanel" aria-labelledby="${name}-memory-tab">`
              
              //   // add   
              //   for(const line of value.split('\n'))
              //     html +=`
              //       <p class="mb-1 text-gray-500">${line}</p>`

              // html+=`</div>`

          html+=`
          </div>
      </div>
    </div>`



    this.innerHTML = html
  }
}



export class MemoryAgentInfo extends HTMLElement{ 
  constructor(name, data, current_tab){
    super()


    let html = `<div class="">
      <div class="md:w-[400px] md:h-[750px] border border-gray-200 rounded-lg shadow">
          <div class="w-full p-4 pb-2 flex justify-between flex-wrap text-sm font-medium text-center  border-gray-200 rounded-t-lg bg-gray-50">
            <div class="text-2xl font-extrabold flex items-center justify-center">${name}</div>
            <div class="bg-white p-2 rounded-lg leading-tight text-gray-500 block text-left">
              <div class="flex"><span class="mr-1">Token Used:</span>${data.detail.token}</div>
              <div class="flex">
                <span class="mr-1">Role Accuracy: </span>
                <div class="flex items-center justify-center">
                  <div class="relative bg-gray-400 rounded-full p-0.2 md:w-[100px] ">
                    <div class="bg-blue-600 text-gray-200 p-0.2 leading-none rounded-full" style="width: ${data.detail.role_accuracy}%">&nbsp;</div>
                    <div class="absolute top-0 left-0 text-xs font-medium text-white text-left leading-none rounded-full" style="padding: 2px;">${data.detail.role_accuracy}%</div>
                  </div>
                </div>
              </div>
              </div>
          </div>
          <ul class="w-full flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50">`
      
      html+=`<li class="mr-2">
                  <button data-tabs-target="memory-tab" type="button" aria-selected="false" class="${current_tab == 'memory-tab'? 'text-blue-600':''} tab inline-block p-4 py-2 rounded-tl-lg hover:bg-gray-100">Memory</button>
              </li>
              <li class="mr-2">
                  <button data-tabs-target="guess-roles-tab" type="button" aria-selected="false" class="${current_tab == 'guess-roles-tab'? 'text-blue-600':''} tab inline-block p-4 py-2 hover:bg-gray-100 ">Guess Roles</button>
              </li>`



      html+=`</ul>
            <div class="h-full w-full"  id="${name}-defaultTabContent">
              <div id="memory-tab" class="md:h-[600px] overflow-hidden overflow-y-auto bg-gray-500 p-6 bg-white rounded-lg ${current_tab == 'memory-tab'? '':'hidden'}" >`
              
              // add memory   
              for(const line of data.memory.split('\n'))
                html +=`
                  <p class="mb-1 text-gray-500">${line}</p>`

            html+=`
              </div>
              <div id="guess-roles-tab" class="md:h-[600px] overflow-hidden overflow-y-auto p-6 bg-white rounded-lg ${current_tab == 'guess-roles-tab'? '':'hidden'}" >
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" class="px-4 py-2">
                                  玩家
                              </th>
                              <th scope="col" class="px-4 py-2">
                                  猜測身份
                              </th>
                              <th scope="col" class="px-4 py-2">
                                  真實身份
                              </th>
                          </tr>
                      </thead>
                      <tbody>`


                      for (const [id, arr] of Object.entries(data.guess_roles)) {

                        html+=`
                              <tr class="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <th scope="row" class="flex items-center px-3 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                      <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                        <span class="font-medium text-gray-600 dark:text-gray-300">${id}</span>
                                      </div>
                                  </th>`
                                    
                            html+=`
                                  <td class="px-3 py-4">
                                      <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-${(arr[3]==1) ? 'green' : (arr[3]==0) ? 'red' :'yellow'}-500 mr-2"></div> ${arr[0]}
                                      </div>
                                  </td>
                                  <td class="px-3 py-4">
                                    <div class="flex items-center">
                                    ${arr[1]}
                                    </div>
                                </td>
                              </tr>`
                      }
                      
                html+=`</tbody>
                  </table>
                </div>
              </div>`


          html+=`
          </div>
      </div>
    </div>`



    this.innerHTML = html
  }
}



customElements.define("intelligent-agent-info", IntelligentAgentInfo)
customElements.define("memory-agent-info", MemoryAgentInfo)

