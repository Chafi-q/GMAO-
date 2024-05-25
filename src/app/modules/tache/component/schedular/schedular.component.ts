import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';
import { schedulerConfig } from './app.config';
import { TacheShedulerService } from './tache-sheduler.service';
import { CrudManager, EventModel, Scheduler, Toast } from '@bryntum/scheduler';


@Component({
  selector: 'app-schedular',   
  templateUrl: './schedular.component.html',
})
export class SchedularComponent implements AfterViewInit {
  constructor(){}
  title = 'angular-tutorial';

 /* resources !: any[];
  events !: any[];*/



ngOnInit(): void {
  /*
  this. tacheservice.fetcheTache().subscribe(data => {
    console.log(data);
    this.resources = data;
  });

  this.tacheservice.fetchResponsable().subscribe(data => {
    console.log(data);
    this.events = data;

    // After fetching both resources and events, update the scheduler
  
  });*/
}


  @ViewChild('scheduler') schedulerComponent! : BryntumSchedulerComponent;
  private scheduler! : Scheduler;

  ngAfterViewInit(): void {
    this.scheduler = this.schedulerComponent.instance;
    this.scheduler.on({
      beforeEventEdit:this.beforeEventEditHandler
    });
  };

  beforeEventEditHandler({ eventRecord } : { eventRecord : EventModel }) : void {
    Toast.show(`Editing ${eventRecord.name}`);
  };

  changesHandler = ({ source } : { source : CrudManager }) => {
    const { changes } = source;

    // In a real app you would send the changes to the server here.
    console.log(changes);

    // Then you would call `source.acceptChanges()` to clear local changes
    source.acceptChanges();
  };

 

  crudManagerConfig = {
    loadUrl   : '/assets/db.json',
    autoLoad  : true,
    listeners : {
      hasChanges: this.changesHandler
    }
  };

  columnsConfig = [
    {
        field : 'name',
        text  : 'Name'
    },
    {
        field : 'role',
        text  : 'Role'
    }
  ];

  viewPresetConfig = {
    base : 'weekAndDayLetter',

    // Customize the header
    headers : [
       // Week 16 ... on the top level
       {
         unit       : 'week',
         dateFormat : 'Wp'
       },
       // M, T, W ... on the bottom level
       {
         unit       : 'day',
         dateFormat : 'd1'
       }
    ]
  };
  getCurrentDate() {
    return new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  }
  getEndDate(startDate: string) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(startDateObj);
    endDateObj.setMonth(endDateObj.getMonth() + 3); // Add 3 months to the start date
    return endDateObj.toISOString().split('T')[0]; // Get end date in YYYY-MM-DD format
  }
}















/* {
 

  constructor(private tachSheduler:TacheShedulerService){
    
  }
 

    

 
    schedulerConfig = schedulerConfig;

    @ViewChild('scheduler') schedulerComponent!: BryntumSchedulerComponent;
  
 



}*/
