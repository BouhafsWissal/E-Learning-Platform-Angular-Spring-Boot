import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Article} from '../m/article'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ServicearticleService {

    private baseUrl = '/api/articles';
    private baseUrl1 = '/api/saveUserServer';
    host :string = "http://localhost:8081";
  
    choixmenu : string  = 'A';
    // listData : Article[];
    public dataForm:  FormGroup; 
    constructor(private http: HttpClient) { }
   
    
  
    getData(id: number): Observable<Object> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
   
    createData(formData: FormData): Observable<any> {
      return this.http.post(`${this.baseUrl}`, formData);
    }
    
    updatedata(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}/${id}`, value);
    }
   
    deleteData(id: number): Observable<any> {
     
      return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
  
    getAll(): Observable<any> {
     
      return this.http.get(`${this.baseUrl}`);
    }
  
  
    uploadFile(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
      formdata.append('file', file);
      const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
          reportProgress: true,
          responseType: 'text'
      });
    
      return this.http.request(req);
     }
  }