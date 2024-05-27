import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TacheService } from './tache.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';






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
  Events: any[] = [];

  displayedColumns: string[] = ['id', 'description', 'responsable', 'type', 'machine', 'dateDebut', 'dateFin', 'operation'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private fb: FormBuilder, private tacheService: TacheService, public snackBar: MatSnackBar, private http: HttpClient) {
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

    this.loadEvents();
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
    const idAdded=(this.myDataArray.data.length + 1).toString();
    if (this.tacheForm.valid) {
      this.sendEmail();
      const formValue = this.tacheForm.value;

     

      const newTache = {
        id: idAdded,
        description: formValue.maintenanceType.description,
        dateDebut: formValue.dateDebut,
        dateFin: formValue.dateFin,
        responsable: formValue.responsable.name,
        type: formValue.maintenanceType.type,
        machine: formValue.machine.name
      };

      this.tacheService.addTache(newTache).subscribe(response => {
        this.snackBar.open("tache affectée", "ok", { duration: 2000 });

        const newEvent = {
          id: idAdded,
          resourceId: formValue.responsable.id.toString(),
          startDate: this.formatToISO(formValue.dateDebut),
          endDate: this.formatToISO(formValue.dateFin),
          name: formValue.maintenanceType.description
        };

        this.Events.push(newEvent);
        this.updateEventsOnServer(this.Events);

        this.myDataArray.data = [...this.myDataArray.data, newTache];
        this.tacheForm.reset();
      });
    }
  }

  loadEvents() {
    this.http.get<any>("http://localhost:3050/events").subscribe(
      (response: any) => {
        this.Events = response.rows || [];
      },
      (error) => {
        console.error("Error fetching events:", error);
      }
    );
  }

  updateEventsOnServer(events: any[]) {
    const updatedEvents = { rows: events };
    this.http.put("http://localhost:3050/events", updatedEvents).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        console.error("Error updating events array:", error);
      }
    );
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

  loadTaches() {
    this.tacheService.fetcheTache().subscribe(data => {
      this.TACHES = data;
      this.myDataArray.data = this.TACHES;
    });
  }
 
  deleteTache(id: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      this.tacheService.deleteTache(id).subscribe(() => {
        this.loadTaches();
      });
    }
  }
 
  async sendEmail() {
    emailjs.init('4ltg4I8dW42uklyIN')
      const formValue = this.tacheForm.value;
    let response= await emailjs.send("service_qj79w8q","template_qqw2txf",{
      responsable: formValue.responsable.name,
      to: formValue.responsable.email,
      description: formValue.maintenanceType.description,
      type: formValue.maintenanceType.type,
      dateDebut: formValue.dateDebut,
      dateFin: formValue.dateFin,
      machine: formValue.machine.name,
      });
      this.snackBar.open("email envoyé", "ok", { duration: 2000 })
  };

}
