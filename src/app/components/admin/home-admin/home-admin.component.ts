import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent, GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  // --------------------------------------
  data = [['Category', 'Number']];
  data2 = [['Category', 'Payment']];
  number: any;
  categorys: any;
  nbr_user: any;
  nbr_order: any;
  nbr_product: any;
  prices: any;
  latestArrivals: any;
  constructor(private categoryService: CategoryService,
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductService) { }

   pieChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [],
    options: {
      'pieHole': 1,
      'pieSliceTextStyle': {
        'color': 'white',

      },
      'fontSize': 14,
      'fontName': 'Roboto',
      'colors': ['#c96', '#a6c76c', '#bf8040', '#777', 'rgb(218, 208, 72)']
    },

  };
  lineChart:  GoogleChartInterface = {
    chartType: GoogleChartType.LineChart,
    dataTable: []
    ,
    options: {
      'pieHole': 1,
      'pieSliceTextStyle': {
        'color': 'white'
      },
      'fontSize': 14,
      'fontName': 'Roboto',
      'colors': ['#c96']

    },

  }
  @ViewChild('mychart', {static: false}) mychart: GoogleChartComponent | any;
  @ViewChild('mychart2', {static: false}) mychart2: GoogleChartComponent | any;
  ngOnInit(): void {
    this.GetCategory();
    console.log('4');
    this.GetNumberUser();
    this.GetNumberOrder();
    this.GetNumberProduct();
    this.GetTotalPrices();
    this.GetLatestProduct();

  }

  taritment(categ: any, nbre: any) {
    for (let i = 0; i < nbre; i++) {
      console.log('nuumber', i)
      var nbr = this.GetNumber(categ[i].name);
    }
  }

  GetNumberUser() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.nbr_user = data.nbr;
      }
    )
  }

  GetNumberProduct() {
    this.productService.getAllproducts().subscribe(
      (data) => {
        this.nbr_product = data.number;
      }
    )
  }

  GetNumberOrder() {
    this.orderService.AllOrder().subscribe(
      (data) => {
        this.nbr_order = data.number;
      }
    )
  }

  GetTotalPrices() {
    this.orderService.TotalPrices().subscribe(
      (data) => {
        this.prices = data.prices;
      }
    )
  }

  async GetCategory() {
    console.log('1');
    this.categoryService.allCategory().subscribe(
    (data)=>{
    this.categorys = data.category;
    this.number = data.nbr;
     this.taritment(data.category , data.nbr);
     this.trait(data.category , data.nbr);
     console.log('2');
     
    }
    )
    console.log('3');

    // let data = await this.categoryService.allCategory();
    // if (data) {
      // this.categorys = data.category;
      // this.number = data.nbr;
      // this.taritment(data.category, data.nbr);
      // this.trait(data.category, data.nbr);
      // console.log('2');
    // }
  }

  trait(categ: any, nbre: any) {
    for (let i = 0; i < nbre; i++) {
      var nbr = this.GetNumberPaymentt(categ[i].name);
    }
  }

  GetNumberPaymentt(category: any) {
    var nbr = 0;
    this.categoryService.GetPayment(category).subscribe(
      (result) => {
        nbr = result.number;
        this.data2.push([category, nbr]);
        this.lineChart.dataTable = this.data2 ;
        console.log(this.lineChart);
        this.mychart2.draw();
      }
    )
    return nbr;
  }

  GetNumber(category: any) {
    var nbr = 0;
    this.categoryService.GetNumberProduct(category).subscribe(
      (data) => {
        nbr = data.number;
        this.data.push([category, nbr]);
        this.pieChart.dataTable = this.data;
        console.log(this.pieChart.dataTable);
        this.mychart.draw();
      }
    )
    return nbr;
  }
test(){
  console.log('test');
  console.log(this.pieChart);
  
  return this.pieChart;
}
  GetLatestProduct() {
    this.productService.LatestArrivals().subscribe(
      (data) => {
        this.latestArrivals = data.produits;
        console.log('cccccc', data.produits);
      }
    )
  }
}
