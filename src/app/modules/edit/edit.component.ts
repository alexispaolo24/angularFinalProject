// edit.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'] // Change 'styleUrl' to 'styleUrls'
})
export class EditComponent {
  updatedUser: User;

  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    // Create a copy of the user to prevent modifying the original data directly
    this.updatedUser = { ...user };
  }

  saveChanges() {
    console.log('Updates', this.updatedUser);
    // Emit the updated user data back to the parent component
    this.dialogRef.close(this.updatedUser);
  }

  cancel() {
    // Close the dialog without making any changes
    this.dialogRef.close();
  }
}
