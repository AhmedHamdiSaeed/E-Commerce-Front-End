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
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  selectedImage!: File;
  color: string = '';
  Allcolors: string[] = [];
  chosenColors: string[] = [];
  allCategories: ViewCat[] = [];
  productId: string = '';
  product!:Product;
  editProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: AdminServices,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private getCategories: CategoryService
  ) {
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
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductById(this.productId);
    });

    this.getAllCategories();
  }

  getProductById(id: string): void {
    this.productService.getProductById(id).subscribe(
      (product: Product) => {
        this.product = product;
        this.editProductForm.patchValue({
          title: this.product.title,
          description: this.product.description,
          price: this.product.price,
          image: this.product.image,
          quantity: this.product.quantity,
          colors: this.product.colors,
          category: this.product.category,
          company: this.product.company,
          sold: this.product.sold

        });
        this.chosenColors = [...this.product.colors];
        this.color = this.product.colors[this.product.colors.length - 1];
      },
      (error) => {
        console.error("Error fetching product:", error);
      }
    );
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
  confirmEditProduct(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to Edit this product?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.EditProduct();
        this.router.navigateByUrl('/Admin');
      }
    });
  }

  EditProduct(): void {
    if (this.editProductForm.valid) {
      this.editProductForm.patchValue({ colors: this.chosenColors });
      this.productService.updateProducts(this.productId, this.editProductForm.value).subscribe(() => {
        this.router.navigateByUrl(`/product-details/${this.productId}`);
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  addColor(): void {
    const colorInput = document.getElementById('colorInput') as HTMLInputElement;
    this.color = colorInput.value;
    if (!this.chosenColors.includes(this.color)) {
       this.chosenColors.push(this.color);
       this.Allcolors.push(this.color);
    }
    colorInput.value = '#008000';
  }
  removeColor(chosenColor: string): void {
    const index = this.chosenColors.indexOf(chosenColor);
    if (index !== -1) {
      this.chosenColors.splice(index, 1);
    }
    const colorIndex = this.product.colors.indexOf(chosenColor);
    if (colorIndex !== -1) {
      this.product.colors.splice(colorIndex, 1);
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
