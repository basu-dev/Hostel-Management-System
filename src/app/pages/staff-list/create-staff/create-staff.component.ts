import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from './../../../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/_services/staff.service';
import { Staff } from 'src/app/_models/staff.model';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {
  showLoader = false;
  staffForm: FormGroup;
  mode = 'new';
  editedStaffIndex;
  editedStaff: Staff;
  constructor(private staffService: StaffService, private router: Router,
              private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.staffService.getStaffList();
    this.initStaffForm();
    this.route.paramMap.subscribe(
      ((item) => {
        this.editedStaffIndex = item.get('id');
        if (this.editedStaffIndex) {
          this.mode = 'edit';
          this.editStaff(this.editedStaffIndex);
        } else {
          this.mode = 'new';
        }
      })
    );
  }

  initStaffForm() {
    this.staffForm = new FormGroup({
      name: new FormControl('', Validators.required),
      contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.showLoader = true;
    if (this.mode === 'new') {
      const formValue = this.staffForm.value;
      this.staffService.insertStaff(formValue).then(() => {
      this.showLoader = false;
      this.alertify.success('Staff creation successful');
      this.router.navigate(['/staffList']);
    }).catch((err) => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Oops some error occured');
    });
    } else if (this.mode === 'edit') {
      const formValue = this.staffForm.value;
      this.staffService.editStaff(this.editedStaffIndex, formValue).then(() => {
        this.showLoader = false;
        this.alertify.success('Edit Success');
        this.router.navigate(['/staffList']);
      }).catch((err) => {
        console.log(err);
        this.alertify.error('Oops some error occured');
        this.showLoader = false;
      }).finally(() => {
        this.showLoader = false;
      });
    }
  }

  onCancel() {
    this.router.navigate(['/staffList']);
  }

  editStaff(id) {
    this.staffService.getStaff(id).subscribe(
      ((item: Staff) => {
        this.editedStaff = item;
        this.patchEdit(this.editedStaff);
      }),
      ((err) => {
        console.log(err);
      })
    );
  }

  patchEdit(staff: Staff) {
    this.staffForm.patchValue({
      name: staff.name,
      contact: staff.contact,
      address: staff.address,
      department: staff.department
    });
  }

}
