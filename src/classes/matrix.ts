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
    secondSlice:Material[]
    constructor(width:number,height:number){
        this.width=width;
        this.height=height;
        this.mapFiels=new Array(this.width);
        for(let i=0;i<this.width;i++){
            this.mapFiels[i]=new Array(this.height);
            for(let j=0;j<this.height;j++){
                this.mapFiels[i][j]=Material.Air;
            }
        }
        this.secondSlice=[Material.Medecine,Material.Dangerous,Material.Enemy,Material.Player];
    }
    #studyArea(object:Block){
        for (let i=object.yCoord;i<object.yCoord+object.xSize &&i<this.width;i++ ){
            for (let j=object.xCoord;j<object.xCoord+object.ySize &&j<this.height;j++){
                if(this.mapFiels[i][j]!==Material.Air){
                    
                }
            }
        }
    }
    appendObject(object:Block){
        if (this.secondSlice.indexOf(object.material) !== -1){
            this.#studyArea(object);
        }
        for (let i=object.yCoord;i<object.yCoord+object.xSize &&i<this.width;i++ ){
            for (let j=object.xCoord;j<object.xCoord+object.ySize &&j<this.height;j++){
                this.mapFiels[i][j]=object.material;
            }
        }
    }
}