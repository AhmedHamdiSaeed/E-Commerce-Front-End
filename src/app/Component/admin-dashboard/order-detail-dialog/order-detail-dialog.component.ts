import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../../Services/images/image.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.css'
})
export class OrderDetailDialogComponent implements OnInit {

  constructor(private dialog:MatDialog,
              private imageServices: ImageService,
              public dialogref:MatDialogRef<OrderDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){

  }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  getImageUrl(path:string){
    return this.imageServices.getImageUrl(path);
  }

  
  closeDialog(){
    this.dialogref.close();
  }
}
