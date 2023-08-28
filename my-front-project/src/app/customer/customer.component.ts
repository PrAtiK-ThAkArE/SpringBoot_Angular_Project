import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
    EmployeeArray : any[] = [];
    
    employeename: string ="";
    employeeaddress: string ="";
    mobile: Number =0;

    currentEmployeeID = "";

    constructor (private http: HttpClient)
    {
      this.getAllEmployee();
    }

    getAllEmployee()
    {
      this.http.get("http://localhost:8080/api/v1/employee/getAllEmployee")
      
      .subscribe((resultData: any)=>
      {
        
        console.log(resultData);
        this.EmployeeArray = resultData;
      });
    }

    register()
    {
      
      let bodyData = {
        "employeename": this.employeename,
        "employeeaddress": this.employeeaddress,
        "mobile": this.mobile
      };

      this.http.post("http://localhost:8080/api/v1/employee/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
        console.log(resultData);
        alert("Employee Register Successfully");
        this.getAllEmployee();

        this.employeename = '';
        this.employeeaddress = '';
        this.mobile =0;
      });
    }

    cleardata()
    {
        this.employeename = '';
        this.employeeaddress = '';
        this.mobile =0;
      }

      setUpdate(data: any)
      {
        this.employeename = data.employeename;
        this.employeeaddress = data.employeeaddress;
        this.mobile = data.mobile;
        this.currentEmployeeID = data.employeeid;
      }

  UpdateRecords()
  {
    let bodyData = {
      "employeeid" : this.currentEmployeeID,
      "employeename" : this.employeename,
      "employeeaddress" : this.employeeaddress,
      "mobile" : this.mobile
    };

    this.http.put("http://localhost:8080/api/v1/employee/update",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("Employee Registered Updated")
      this.getAllEmployee();
      this.employeename = '';
      this.employeeaddress = '';
      this.mobile = 0;
    });
  }

  save()
  {
    if(this.currentEmployeeID == '')
    {
      this.register();
    }
    else
    {
      this.UpdateRecords();
    }
  }

  setDelete(data: any)
  {
    this.http.delete("http://localhost:8080/api/v1/employee/delete"+"/"+ data.employeeid,{responseType: 'text'}).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("Employee Deleted......!!!")
      this.getAllEmployee();
      this.employeename = '';
      this.employeeaddress = '';
      this.mobile = 0;

    });
  }

}
