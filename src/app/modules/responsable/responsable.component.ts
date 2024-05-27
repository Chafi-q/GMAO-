import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponsableService } from './reponsable.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html'
})
export class ResponsableComponent implements OnInit {
  responsableForm!: FormGroup;
  myDataArray = new MatTableDataSource<any>([]);

  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'role', 'departement', 'operation'];
  Responsables:any[]=[];

  constructor(
    private fb: FormBuilder,
    private service: ResponsableService,
    public snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Initialize the form group with default values and validators
    this.responsableForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: ['', Validators.required],
      departement: ['', Validators.required]
    });

    // Fetch existing responsables and populate the table
    this.service.fetchResponsables().subscribe(data => {
      this.myDataArray.data = data;
    });
  }

  onSubmit(): void {
    if (this.responsableForm.valid) {
      const formValue = this.responsableForm.value;

      const newResponsable = {
        ...formValue,
        id: (this.myDataArray.data.length + 1).toString()
      };

      this.service.addResponsable(newResponsable).subscribe(response => {
        this.snackBar.open("Responsable ajouté", "OK", { duration: 2000 });
        const newResource= {
          id: (this.myDataArray.data.length+1).toString(),
          name: formValue.name,
          role: formValue.role
        };

        this.Responsables.push(newResource);
        this.updateResponsablesOnServer(this.Responsables);

       
        // Update the table data
        this.myDataArray.data = [...this.myDataArray.data, newResponsable];
      });

   


      // Reset the form
      this.responsableForm.reset();
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myDataArray.filter = filterValue.trim().toLowerCase();
  }

  deleteResponsable(id: string): void {
    this.service.deleteResponsable(id).subscribe(() => {
      this.myDataArray.data = this.myDataArray.data.filter(item => item.id !== id);
      this.snackBar.open("Responsable supprimé", "OK", { duration: 2000 });
    });
  }
 
  updateResponsablesOnServer(events: any[]) {
    const updatedEvents = { rows: events };
    this.http.put("http://localhost:3050/resources", updatedEvents).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        console.error("Error updating events array:", error);
      }
    );
  }
  
  loadEvents() {
    this.http.get<any>("http://localhost:3050/resources").subscribe(
      (response: any) => {
        this.Responsables = response.rows || [];
      },
      (error) => {
        console.error("Error fetching events:", error);
      }
    );
  }

  
}
