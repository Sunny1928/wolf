class Sprite{
    constructor(config){
        
        // set up image
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.isLoaded = true
        }

        // shadow
        this.shadow = new Image()
        this.useShadow = true // config.useShadow || false
        if(this.useShadow){
            this.shadow.src = "/images/shadow.png"
        }
        this.shadow.onload = () => {
            this.isLoaded = true
        }

        // animation and initial state
        this.animations = config.animations || {
            "idle-down" : [[0,0]],
            "idle-right": [[0,1]],
            "idle-up"   : [[0,2]],
            "idle-left" : [[0,3]],
            "walk-down" : [[1,0],[0,0],[3,0],[0,0]],
            "walk-right": [[1,1],[0,1],[3,1],[0,1]],
            "walk-up"   : [[1,2],[0,2],[3,2],[0,2]],
            "walk-left" : [[1,3],[0,3],[3,3],[0,3]],
        }
        this.currentAnimation = 'idle-right' // config.currentAnimation || 'idle-right'
        this.currentAnimationFrame = 0

        this.animationFrameLimit = config.animationFrameLimit || 8
        this.animationFrameProgress = this.animationFrameLimit

        // game object
        this.gameObject = config.gameObject
    }

    get frame(){

        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key){

        if(this.currentAnimation !== key){
            this.currentAnimation = key
            this.currentAnimationFrame = 0
            this.animationFrameProgress = this.animationFrameLimit
        }
    }

    updateAnimationProgress(){

        // down tick frame progress 
        if(this.animationFrameProgress > 0){
            this.animationFrameProgress -= 1
            return
        } 

        // reset counter
        this.animationFrameProgress = this.animationFrameLimit
        this.currentAnimationFrame += 1
        if(this.frame == undefined) this.currentAnimationFrame = 0
    }

    draw(ctx, camara){
        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - camara.x
        const y = this.gameObject.y - 18 + utils.withGrid(6) - camara.y

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

        const [framex, framey] = this.frame

        this.isLoaded && ctx.drawImage(
            this.image,
            framex * 32, framey * 32,
            32, 32,
            x, y,
            32, 32
        )

        this.updateAnimationProgress()
    }
}