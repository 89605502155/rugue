export enum Material{
    Air,
    StaticStone,
    ElasticStone,
    DinamicNotElasticStone,
    DinamicElasticStone,
    Medecine,
    Dangerous,
    Enemy,
    Player,
}
export class Block{
    material:Material;
    xCoord:number;
    yCoord:number;
    xSize:number;
    ySize:number;
    constructor(material:Material,xCoord:number,yCoord:number,xSize:number,ySize:number){
        this.material=material;
        this.xCoord=xCoord;
        this.yCoord=yCoord;
        this.xSize=xSize;
        this.ySize=ySize;
    }
}
export class MapField {
    mapFiels:Material[][];
    width:number;
    height:number;
    widthStep:number;
    heightStep:number;
    newWith:number;
    newHeight:number;
    secondSlice:Material[]
    constructor(width:number,height:number,widthStep:number,heightStep:number){
        this.width=width;
        this.height=height;
        this.widthStep=widthStep;
        this.heightStep=heightStep;
        this.newWith=width/widthStep;
        this.newHeight=height/heightStep;
        this.mapFiels=new Array(this.newWith);
        for(let i=0;i<this.newWith;i++){
            this.mapFiels[i]=new Array(this.newHeight);
            for(let j=0;j<this.newHeight;j++){
                this.mapFiels[i][j]=Material.Air;
            }
        }
        this.secondSlice=[Material.Medecine,Material.Dangerous,Material.Enemy,Material.Player];
    }
    #studyAreaForHumanOnBuild(RightUp:[number,number],LeftUp:[number,number],RightDown:[number,number],
        LeftDown:[number,number]):boolean{
            for (let i=RightUp[1];i<LeftDown[1];i++){
                for (let j=LeftUp[0];j<RightDown[0];j++){
                    if (this.mapFiels[i][j]!==Material.Air){
                        return false;
                    }
                }
            }
            return true;
    };
    convertFromPixel(x:number,y:number):[number,number,number,number,number,number]{
        let xCoord=Math.floor(x/this.widthStep);
        let yCoord=Math.floor(y/this.heightStep);
        let xDev = x%this.widthStep;
        let yDev = y%this.heightStep;
        return [xCoord,yCoord,xDev,yDev,this.widthStep,this.heightStep];
    };
    shortConvertFromPixel(x:number,y:number):[number,number]{
        let xCoord=Math.floor(x/this.widthStep);
        let yCoord=Math.floor(y/this.heightStep);
        console.log(x,y)
        console.log(this.widthStep,this.heightStep)
        console.log(xCoord,yCoord)
        console.log(x%this.widthStep,y%this.heightStep)
        console.log()
        return [xCoord,yCoord];
    };
    convertToPixel(xCoord:number,yCoord:number,xDev:number,yDev:number,
        widthStep:number,heightStep:number):[number,number]{
        let x=xCoord*widthStep+xDev;
        let y=yCoord*heightStep+yDev;
        return [x,y];
    };
    appendObjectBuild(object_:Block):boolean{
        let resoult:boolean=true;
        let RightUp=this.shortConvertFromPixel(object_.xCoord+object_.xSize,object_.yCoord);
        let LeftUp=this.shortConvertFromPixel(object_.xCoord,object_.yCoord);
        let RightDown=this.shortConvertFromPixel(object_.xCoord+object_.xSize,
            object_.yCoord+object_.ySize);
        let LeftDown=this.shortConvertFromPixel(object_.xCoord,
            object_.yCoord+object_.ySize);
        if (this.secondSlice.indexOf(object_.material) !== -1){
            resoult= this.#studyAreaForHumanOnBuild(RightUp,LeftUp,RightDown,LeftDown);
        };
        if  (resoult){
            for  (let i=RightUp[1];i<=LeftDown[1];i++){
                this.mapFiels[i].fill(object_.material,LeftUp[0],RightDown[0]+1)
            }
        };
        console.log();
        console.log();
        console.log(RightUp[1],LeftDown[1],"y",LeftUp[0],RightDown[0],"x");
        console.log(object_.yCoord,object_.yCoord+object_.ySize,"y",
            object_.xCoord,object_.xCoord+object_.xSize,"x");
        console.log(...this.convertToPixel(...LeftUp,10,20,this.widthStep,this.heightStep),
        "y",...this.convertToPixel(...RightDown,10,20,this.widthStep,this.heightStep),"x");
        return resoult;
    }
}