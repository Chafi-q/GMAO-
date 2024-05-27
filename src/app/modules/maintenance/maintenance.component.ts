import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MaintenanceService } from './maintenance.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
})
export class MaintenanceComponent implements OnInit {
  maintenanceForm!: FormGroup;
  maintenanceDataArray = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['title', 'description', 'type', 'operation'];


  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    public snackBar: MatSnackBar
  ) {
    this.maintenanceForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.maintenanceService.fetchMaintenances().subscribe(data => {
      this.maintenanceDataArray.data = data;
    });
  }

  onSubmit() {
    if (this.maintenanceForm.valid) {
      const formValue = this.maintenanceForm.value;

      const newMaintenance = {
        title: formValue.title,
        description: formValue.description,
        type: formValue.type
      };

      this.maintenanceService.addMaintenance(newMaintenance).subscribe(response => {
        this.snackBar.open("Maintenance ajoutée avec succès", "OK", { duration: 2000 });

        this.maintenanceDataArray.data = [...this.maintenanceDataArray.data, response];
        this.maintenanceForm.reset(); 
      });
    }
  }

  deleteMaintenance(id: string) {
    this.maintenanceService.deleteMaintenance(id).subscribe(() => {
      this.maintenanceDataArray.data = this.maintenanceDataArray.data.filter(maintenance => maintenance.id !== id);
      this.snackBar.open("Maintenance supprimée avec succès", "OK", { duration: 2000 });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.maintenanceDataArray.filter = filterValue.trim().toLowerCase();
  }
}

