import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServices } from '../../Services/admin/admin-services.service';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../models/product';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Correct property name
})
export class ProductComponent implements  AfterViewInit, OnInit {
  products = [];
  id: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private product: AdminServices) {}
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.product.getProducts().subscribe((res: any) => {
        this.products = res.data;
        this.dataSource = new MatTableDataSource<any>(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
    });
}
  filterValue = '';
  displayedColumns: string[] = ['title', 'img', 'desc', 'price', 'action'];

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // update() {
  //   const d = this.dialog.open(UpdateItemComponent, {
  //     data: {
  //       id: this.id,
  //     },
  //     height: '65%',
  //     width: '45%',
  //     panelClass: 'full-screen-modal',
  //   });
  //   d.afterClosed().subscribe((res) => {
  //     this.getProducts();
  //     // console.log("Hello");
  //   });
  // }
  // Add() {
  //   const d = this.dialog.open(AddItemComponent, {
  //     data: {
  //       id: this.id,
  //     },
  //     height: '65%',
  //     width: '45%',
  //     panelClass: 'full-screen-modal',
  //   });
  //   d.afterClosed().subscribe((res) => {
  //     this.getProducts();
  //     // console.log("Hello");
  //   });
  // }
  delete(id: any) {
    Swal.fire({
      title: 'Do you Want to Delete this Item?',
      text: 'Are you Sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes,Delete Item.',
      cancelButtonText: "No, Don't",
    }).then((res) => {
      if (res.value) {
        Swal.fire('Deleted', 'Your Data is Deleted', 'success');
        this.product.deleteProduct(id).subscribe({
          next: () => {
            this.getProducts();
          },
        });
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Failed to Delete item', 'error');

      }
    });

  }
}
