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

   constructor(name: string, owner: string, estimates: Estimate[] = []){
      this.table = estimates
      this.name = name;
      this.owner = owner
   }

   addEstimate(estimate: Estimate) {
      if(this.table.find(it => estimate.user === it.user) ){
         console.log(this.table)
         throw new Error("User has already provided estimates.")
      }
      this.table.push(estimate);
   }

   static fromJSON(data: any): Table {

      const estimates = data.estimates?.map((est: any) => new Estimate(est.userName, est.points));
      return new Table(data.name, estimates);
  }

}
