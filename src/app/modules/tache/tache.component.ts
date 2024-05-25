import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TacheService } from './tache.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';











@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html'
})
export class TacheComponent implements AfterViewInit, OnInit {
  tacheForm!: FormGroup;
  maintenanceTypes: any[] = [];
  machines: any[] = [];
  responsables: any[] = [];
  TACHES: any[] = [];
  myDataArray = new MatTableDataSource<any>([]);
  Events:any[]=[];

  displayedColumns: string[] = ['id', 'description', 'responsable', 'type', 'machine', 'dateDebut', 'dateFin', 'operation'];

  
	 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private tacheService: TacheService,public snackBar: MatSnackBar,private http: HttpClient) {
    this.tacheForm = this.fb.group({
      maintenanceType: [''],
      machine: [''],
      responsable: [''],
      dateDebut: [''],
      dateFin: ['']
    });
  }

  ngOnInit(): void {
    this.tacheService.fetchMaintenanceTypes().subscribe(data => {
      this.maintenanceTypes = data;
    });

    this.tacheService.fetchMachines().subscribe(data => {
      this.machines = data;
    });

    this.tacheService.fetchResponsables().subscribe(data => {
      this.responsables = data;
    });

    this.tacheService.fetcheTache().subscribe(data => {
      this.TACHES = data;
      this.myDataArray.data = this.TACHES; 
    });
  }

  ngAfterViewInit() {
    this.myDataArray.paginator = this.paginator;
    this.myDataArray.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myDataArray.filter = filterValue.trim().toLowerCase();
  }

  onSubmit() {
    if (this.tacheForm.valid) {
      const formValue = this.tacheForm.value;

      const newTache = {
        id: this.myDataArray.data.length + 1,
        description: formValue.maintenanceType.description,
        dateDebut: formValue.dateDebut,
        dateFin: formValue.dateFin,
        responsable: formValue.responsable.name,
        type: formValue.maintenanceType.type,
        machine: formValue.machine.name
      };

      this.tacheService.addTache(newTache).subscribe(response => {

          this.snackBar.open("tache affectée", "ok", {
            duration: 2000,
          });


      
          this.http.get<any>("http://localhost:3000/events").subscribe(
  (response: any) => {
    const event = response.rows || []; // Get the rows array from the response or create an empty array if it doesn't exist


    // Create the new event
    const newEvent = {
      id: this.generateRandomId(8),
      resourceId: (formValue.responsable.id).toString(),
      startDate: this.formatToISO(formValue.dateDebut),
      endDate:  this.formatToISO(formValue.dateFin),
      name: formValue.maintenanceType.description
    };

    // Push the new event to the rows array
    this.Events.push(newEvent);
    this.Events.concat(event)

    console.log(this.Events);

    // Update the events object
    const updatedEvents = { rows: this.Events };

    // Update the events object in the server
    this.http.put("http://localhost:3050/events", updatedEvents).subscribe(
      () => {
        console.log("Event added and array updated successfully");
        console.log(this.Events);
      },
      (error) => {
        console.error("Error updating array:", error);

      }
    );
  },
  (error) => {
    console.error("Error fetching array:", error);
  }

 
);




        
        this.myDataArray.data = [...this.myDataArray.data, newTache]; 
        this.tacheForm.reset();
      });
    }
  }
  generateRandomId(length: number = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
  }
  formatToISO(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }
  
}