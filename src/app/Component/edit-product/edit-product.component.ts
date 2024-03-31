import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/categoryModel';
import { Product } from '../../models/product';
import { AdminServices } from '../../Services/admin/admin-services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from '../../SharedComponent/confirm-message/confirm-message.component';
import { ViewCat } from '../../models/viewCat';
import { CategoryService } from '../../Services/category/category-services.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup;
  selectedImage!: File;
  color: string = '#008000';
  colors: string[] = [];
  chosenColors: string[] = [];
  allCategories: ViewCat[] = [];
  productId: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: AdminServices,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private getCategories: CategoryService
  ) {}

  ngOnInit(): void {
    this.editProductForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      quantity: ['', Validators.required],
      colors: [[]],
      category: ['', Validators.required],
      company: ['', Validators.required],
      sold: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductById(this.productId);
    });

    this.getAllCategories();
  }

  getProductById(id: string): void {
    this.productService.getProductById(id).subscribe(product => {
      this.editProductForm.patchValue(product);
      // this.chosenColors = product.colors || [];
    });
  }

  getAllCategories(): void {
    this.getCategories.getCategories().subscribe(
      (res: Category[]) => {
        res.forEach(element => {
          let tempCate = new ViewCat(element.name, element._id);
          this.allCategories.push(tempCate);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(): void {
    if (this.editProductForm.valid) {
      this.productService.updateProducts(this.productId, this.editProductForm.value).subscribe(() => {
        this.router.navigateByUrl(`/product-details/${this.productId}`);
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  addColor(): void {
    if (!this.chosenColors.includes(this.color)) {
      this.chosenColors.push(this.color);
      this.colors.push(this.color);
    }
    this.color = '#008000';
  }

  removeColor(chosenColor: string): void {
    const index = this.chosenColors.indexOf(chosenColor);
    if (index !== -1) {
      this.chosenColors.splice(index, 1);
    }
    const colorIndex = this.colors.indexOf(chosenColor);
    if (colorIndex !== -1) {
      this.colors.splice(colorIndex, 1);
    }
  }

  confirmRemoveColor(color: string): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to remove this color?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeColor(color);
      }
    });
  }

  hideRemoveIcon(chosenColor: string): void {}

  showRemoveIcon(chosenColor: string): void {}
}
