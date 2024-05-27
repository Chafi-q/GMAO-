import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipementService } from './equipement.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
})
export class EquipementComponent implements OnInit {
  MachineForm!: FormGroup;
  myDataArray = new MatTableDataSource<any>([]);

  displayedColumns: string[] = ['serialnum', 'name', 'machineModel', 'location','operation'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private service: EquipementService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize the form group with default values and validators
    this.MachineForm = this.fb.group({
      serialNumber: ['', Validators.required],
      name: ['', Validators.required],
      machineModel: ['', Validators.required],
      location: ['', Validators.required],
      power: [''],
     
    });

    // Fetch existing machines and populate the table
    this.service.fetchMachines().subscribe(data => {
      this.myDataArray.data = data;
    });
  }

  onSubmit(): void {
    if (this.MachineForm.valid) {
      const formValue = this.MachineForm.value;

      const newMachine = {
        id: (this.myDataArray.data.length + 1).toString(),
        serialNumber:formValue.serialNumber,
        name: formValue.name,
        machineModel: formValue.machineModel,
        location: formValue.loation,
        puissance:formValue.power
      };

      this.service.addMachine(newMachine).subscribe(response => {
        this.snackBar.open("Tâche affectée", "OK", { duration: 2000 });

        // Update the table data
        this.myDataArray.data = [...this.myDataArray.data, newMachine];
      });

      // Reset the form
      this.MachineForm.reset();
    }
  }
  loadMachines() {
    this.service.fetchMachines().subscribe(machines => {
      this.myDataArray .data = machines;
      this.myDataArray.paginator = this.paginator;
    });
  }

  deleteMachine(id: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      this.service.deleteMachine(id).subscribe(() => {
        this.loadMachines(); // Reload the taches after deletion
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myDataArray.filter = filterValue.trim().toLowerCase();
  }

}


