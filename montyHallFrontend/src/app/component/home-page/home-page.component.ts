import { Component,OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MontyHallService } from '../../service/monty-hall.service';
import { interval, Subscription } from 'rxjs';
import { SimulationResult } from '../../models/simulation-result';
import { Result } from 'src/app/models/result';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent  {
  numberOfSimulations: number = 5;
  shouldSwitch: boolean = true;
  // simulationResult: any;
  simulations: Result[]=[];
  showTable: boolean = false;
  
  simulationResults !: SimulationResult ;
  private timerSubscription !: Subscription;
  
  constructor(private http: HttpClient,
    private montyHallServices: MontyHallService) { }



  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'numberOfSimulations',
    'correctDoor',
    'firstChosenDoor',
    'revealingDoor',
    'nextChosenDoor',
    'result'
  ];

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  simulateMontyHall() {

    // this.http.get<any>(`https://localhost:7195/api/montyHall/simulate?numberOfSimulations=${this.numberOfSimulations}&shouldSwitch=${this.shouldSwitch}`)
    //   .subscribe(result => {
    //     this.simulationResult = result;
    //   });
    this.montyHallServices.simulateMontyHall(this.numberOfSimulations,this.shouldSwitch)
    .subscribe(result => {
       this.simulationResults =result; 
       this.simulations =  this.simulationResults.results;
      console.log(result);
      console.log(this.simulationResults.results);

      this.simulations.forEach((result1, index) => {
        result1.numberOfSimulations = index + 1; 
        result1.result = result1.isWin ? 'Win' : 'Lost'; 
      });

      console.log(this.simulations);
      this.dataSource = new MatTableDataSource(this.simulations);
      this.dataSource.paginator = this.paginator;
      this.showTable = true;
      // this.updateDoorImages();
    });

    
  }

  


  // currentStep = 0; 
  // simulationImages: string[] = []; 



  // ngOnInit() {
  //   this.beforeEachSimulation();
  //   // this.updateDoorImages();

  // }

  // ngOnDestroy() {
  //   
  //   if (this.timerSubscription) {
  //     this.timerSubscription.unsubscribe();
  //   }
  // }

  // beforeEachSimulation(){
  //   this.simulationImages = [
  //     '../../assets/images/door.png','../../assets/images/door.png','../../assets/images/door.png'
  //   ]

  //   console.log(this.currentStep);
    

  //   if(this.currentStep !=0){
  //   this.timerSubscription = interval(2000).subscribe(() => {
  //     this.updateDoorImages();
  //   });
  // }
  // }

  // 
  // updateDoorImages() {
  //   const simulation = this.simulationResults.results[this.currentStep];

  //   this.simulationImages[simulation.revealingDoor-1]= '../../assets/images/goat.png';
  //   this.timerSubscription = interval(2000).subscribe(() => {
  //     this.nextDoorImages();
  //   });
  //   console.log("HEere");
  // }

  // nextDoorImages(){
  //   const simulation = this.simulationResults.results[this.currentStep]; 
    
  //   this.simulationImages = [
  //     simulation.correctDoor === 1 ? '../../assets/images/car.png' : '../../assets/images/goat.png',
  //     simulation.correctDoor === 2 ? '../../assets/images/car.png' : '../../assets/images/goat.png',
  //     simulation.correctDoor=== 3 ? '../../assets/images/car.png' : '../../assets/images/goat.png'
  //   ];

  //   console.log("HEere12");
  //   this.timerSubscription = interval(4000).subscribe(() => {
  //     this.nextStep();
  //   });
  // }

  // 
  // nextStep() {
  //   if (this.currentStep < this.simulations1.length - 1) {
  //     this.currentStep++;
  //     this.beforeEachSimulation();
  //     console.log("HEere12mb");
  //   }
  // }
}
