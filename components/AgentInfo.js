export class AgentInfo extends HTMLElement{ 
  constructor(name, data){
    super()

    
    
    // name = "2"

    // data = {
    //   "detail": {
    //       "token": 0,
    //       "role_accuracy": 41.67
    //   },
    //   "guess_roles": {
    //       "0": [
    //           "好人",
    //           "獵人",
    //           null
    //       ],
    //       "1": [
    //           "好人",
    //           "狼人",
    //           null
    //       ],
    //       "2": [
    //           "好人",
    //           "女巫",
    //           null
    //       ],
    //       "3": [
    //           "好人",
    //           "村民",
    //           null
    //       ],
    //       "4": [
    //           "好人",
    //           "村民",
    //           null
    //       ],
    //       "5": [
    //           "好人",
    //           "預言家",
    //           null
    //       ],
    //       "6": [
    //           "好人",
    //           "狼人",
    //           null
    //       ]
    //   },
    //   "memory": "無資訊\n"
    // }

    let html = `<div class="">
      <div class="md:w-[440px] h-full border border-gray-200 rounded-lg shadow">
          <div class="w-full p-4 pb-2 flex justify-between flex-wrap text-sm font-medium text-center  border-gray-200 rounded-t-lg bg-gray-50" id="${name}-defaultTab" data-tabs-toggle="#${name}-defaultTabContent" role="tablist">
            <div class="text-3xl font-extrabold flex items-center justify-center">${name}</div>
            <div class="bg-white p-2 rounded-lg leading-tight text-gray-500 block text-left">
              <div class="flex"><span class="mr-1">Token Used:</span>${data.detail.token}</div>
              <div class="flex">
                <span class="mr-1">Role Accuracy: </span>
                <div class="flex items-center justify-center">
                  <div class="bg-gray-200 rounded-full  p-0.2 md:w-[80px] ">
                    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.2 leading-none rounded-full" style="width: ${data.detail.role_accuracy}%"> ${data.detail.role_accuracy}%</div>
                  </div>
                </div>
              </div>
              </div>
          </div>
          <ul class="w-full flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50" id="${name}-defaultTab" data-tabs-toggle="#${name}-defaultTabContent" role="tablist">`
      
      // add li
      html+=`<li class="mr-2">
                  <button id="${name}-memory-tab" data-tabs-target="#${name}-memory" type="button" role="tab" aria-controls="${name}-memory" aria-selected="false" class="inline-block p-4 py-2 rounded-tl-lg hover:bg-gray-100">Memory</button>
              </li>
              <li class="mr-2">
                  <button id="${name}-guess-roles-tab" data-tabs-target="#${name}-guess-roles" type="button" role="tab" aria-controls="${name}-guess-roles" aria-selected="true" class="inline-block p-4 py-2 hover:bg-gray-100 text-blue-600 hover:text-blue-600">Guess Roles</button>
              </li>`


      html+=`</ul>
            <div class="h-full w-full"  id="${name}-defaultTabContent">
              <div class="md:h-[600px] overflow-hidden overflow-y-auto bg-gray-500 p-6 bg-white rounded-lg hidden" id="${name}-memory" role="tabpanel" aria-labelledby="${name}-memory-tab">`
              
              // add memory   
              for(const line of data.memory.split('\n'))
                html +=`
                  <p class="mb-1 text-gray-500">${line}</p>`

            html+=`
              </div>
              <div class="md:h-[600px] overflow-hidden overflow-y-auto p-6 bg-white rounded-lg dark:bg-gray-800" id="${name}-guess-roles" role="tabpanel" aria-labelledby="${name}-guess-roles-tab">
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
                                  <td class="px-3 py-4">`
                                  if(arr[2]!=-1){

                                    html+=`
                                      <div class="bg-gray-200 rounded-full w-full  md:w-[50px]">
                                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style="width: ${arr[2]}%"> ${arr[2]}%</div>
                                      </div>`
                                  }
                                    
                            html+=`
                                  </td>
                                  <td class="px-3 py-4">
                                      <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-${(arr[0]==arr[1]) ? 'green' : 'red'}-500 mr-2"></div> ${arr[0]}
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




customElements.define("agent-info", AgentInfo)

