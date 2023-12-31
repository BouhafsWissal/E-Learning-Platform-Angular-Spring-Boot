import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageserviceService } from 'src/app/imageservice.service';

@Component({
  selector: 'app-payer',
  templateUrl: './payer.component.html',
  styleUrls: ['./payer.component.css']
})
export class PayerComponent implements OnInit {
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  
  constructor(private httpClient: HttpClient ,private serviceimage : ImageserviceService) { }

  ngOnInit(): void { 
   
  }


  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    // this.httpClient.post('http://localhost:8081/image/upload', uploadImageData, { observe: 'response' })
    this.httpClient.post('http://localhost:8081/image/upload', uploadImageData)
      .subscribe((response) => {
        console.log("response ", response);

        console.log(this.selectedFile.name);
        // if (response.status === 200) {
        //   this.message = 'Image uploaded successfully';
        // } else {
        //   this.message = 'Image not uploaded successfully';
        // }
      }
      );
  }
    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8081/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }





}


