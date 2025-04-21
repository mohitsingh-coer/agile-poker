export enum StoryPoints {
   ONE,
   TWO,
   THREE,
   FIVE,
   EIGHT,
   THIRTEEN,
   TWENTY_ONE
  }

export class Estimate{

   user: string;
   storyPoint: StoryPoints;
   
   constructor(user: string, storyPoint: StoryPoints){
      this.user = user;
      this.storyPoint = storyPoint;
   }
}

export class Table{
   
   table: Estimate[]
   name: string
   owner: string

   constructor(name: string, owner: string){
      this.table = []
      this.name = name;
      this.owner = owner
   }

   addEstimate(estimate: Estimate) {
      if(!this.table.find(it => estimate.user === it.user) ){
         throw new Error("User has already provided estimates.")
      }
      this.table.push(estimate);
   }

}

