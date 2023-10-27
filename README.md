# wolf

### Steps
1. run werewolf_kill, werewolf_kill_server, agent_server(generative_agent_with_werewolf_kill)
2. search http://localhost:8001/test.html
3. You can see the TESTROOM page

### Note
1. 如果有角色死掉，還是會有操作顯示，但不能操作
2. 若要更改玩家角色順序，去werewolf_kill/enviroement.py:16 self.role_list = [4,3,1,2,2,0,3] (0: seer, 1:witch, 2:village, 3:wolf, 4:hunter)
