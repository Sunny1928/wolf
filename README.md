# wolf

### Steps
1. run werewolf_kill, werewolf_kill_server, agent_server(generative_agent_with_werewolf_kill)
2. search http://localhost:8001/test.html
3. You can see the TESTROOM page

### Note
1. 如果改該角色死掉，當輪到角色操作時，還是會有操作顯示，但不能操作
2. 若要更改玩家角色順序，去werewolf_kill/enviroement.py:16 self.role_list = [4,3,1,2,2,0,3] (0: seer, 1:witch, 2:village, 3:wolf, 4:hunter)


![alt text](https://github.com/Sunny1928/wolf/blob/main/img/prepare_1.png)

1. 右上角，設定左邊的按鈕是 reset game
2. 玩家右上角的叉叉可以移除玩家
3. Add Agent可以新增你想要加入的Player
    player -> add normal player
    intelligent agent -> add intelligent agent
    memory agent -> add memory agent


### New
![alt text](https://github.com/Sunny1928/wolf/blob/main/img/agentinfo_1.png)
1. 上面的選項是選擇操作者，但我其實每次換stage都會幫你們填入操作的人(但沒有在選單上幫你們切換)，但有些情況會沒填到，如果沒送出成功，你們可以再切換一下角色
2. 狼人發言第二個人不會跳ok
3. Agent Info 如圖，可以正常使用，切換tab會同時切換其他角色的
4. 現在只能傳入一般的，像是memory, guess roles (開會討論看有沒有其他需求)
5. 右上角的按鈕可以改變是否存取 agent info state


![alt text](https://github.com/Sunny1928/wolf/blob/main/img/stageinfo.png)
1. 現在每次更換stage會跳出圖示及通知，時間為0.5s
2. 挑出通知時無法做操作
3. 在script-test.js中，第13行有一個變數show_notification_about_changing_stage，設為0可以把它關掉
