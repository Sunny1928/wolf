class OverworldMap{
    constructor(config){
        this.gameObjects = config.gameObjects

        this.backgroundImage = new Image()
        this.backgroundImage.src = config.backgroundSrc

        this.logoImage = new Image()
        this.logoImage.src = config.logoSrc
    }

    drawBackgroundImage(ctx, camara){
        ctx.drawImage(
            this.backgroundImage,
            utils.withGrid(5) - camara.x,
            utils.withGrid(6) - camara.y
        )
    }

}
window.OverworldMap = {
    DemoRoom: {
        backgroundSrc: "/images/maps/Grass.png",
        gameObjects: {
            me: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npc2: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/people/npc2.png"
            })
        }
    },
    // Kitchen: {
    //     backgroundSrc: "/images/maps/KitchenLower.png",
    //   upperSrc: "/images/maps/KitchenUpper.png",
    //   gameObjects: {
    //     hero: new GameObject({
    //       x: 3,
    //       y: 5,
    //     }),
    //     npcA: new GameObject({
    //       x: 9,
    //       y: 6,
    //       src: "/images/characters/people/npc2.png"
    //     }),
    //     npcB: new GameObject({
    //       x: 10,
    //       y: 8,
    //       src: "/images/characters/people/npc3.png"
    //     })
    //   }
    // },
  }