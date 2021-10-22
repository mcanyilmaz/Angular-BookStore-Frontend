import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Image } from 'src/app/service/image/image';
import { ImageService } from 'src/app/service/image/image.service';
import { Slider } from 'src/app/service/slider/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  sliderImageViewDataTrue:Boolean = true;
  sliderImageViewDataFalse:Boolean = false;
  //@ts-ignore
  selectedId:number ;
   //@ts-ignore
   selectedFile: File;
  images:Slider[] | undefined;
  //@ts-ignore
  form:FormGroup
  //@ts-ignore
  myForm:FormGroup;

  constructor(private imageService : ImageService,
    private httpClient:HttpClient,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllImages();
    this.sliderTrueAndFalseStatement();
    
  }

  sliderTrueAndFalseStatement(){
    this.myForm = this.formBuilder.group({
      id:[null],
      sliderTrueAndFalseStatement:['']
     
    })
  }

  //@ts-ignore
  onChange($event,id:number) {
  
    this.selectedId = id;
    let person = {
      state:this.myForm.controls["sliderTrueAndFalseStatement"].value
    };
  
    console.log(person);
    this.imageService.updateImageInSliderTrueOrFalse(this.selectedId,person).subscribe((data => {
      console.log(data);
      window.location.reload();

    }))
  

}


  sliderImageDeleteId(id:number){

    this.selectedId = id;
  }

  deleteSliderImage(){
    this.imageService.deleteSliderImage(this.selectedId).subscribe((data =>{
      console.log(data);
      this.getAllImages();
    }))
    
  }

  createSliderImageModalData(){
    this.form = this.formBuilder.group({
      id:[null],
      sliderState:['']
     
    })
  }

  createSliderImage(){
    
    const formData = new FormData();


    if(this.form?.valid){
            let payload = {
             
              state:this.form?.controls['sliderState'].value
    
            }

            const jsonStringPayload = JSON.stringify(payload);

            if(this.selectedFile){
              formData.append('imageFile',this.selectedFile)
              formData.append('payload',jsonStringPayload);
            }


            console.warn(payload);
            setTimeout(()=>{

       
              this.imageService.addSlider(formData).pipe(catchError(err => {
                console.warn(payload);
               
                throw  err;
              })).subscribe(food=>{
               
              });
            },1000)
           
    
          
    }


  }


  //@ts-ignore
 public onFileChanged( event) {
  //Select File
  this.selectedFile = event.target.files[0];
 
}


  
//Gets called when the user clicks on submit to upload the image
onUpload() {
  console.log(this.selectedFile);
  
  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  const uploadImageData = new FormData();
  uploadImageData.append('imageFile', this.selectedFile,this.selectedFile.name);

  //Make a call to the Spring Boot Application to save the image
  this.httpClient.post('http://localhost:8080/slider/upload', uploadImageData, { observe: 'response' })
    .subscribe((response) => {
     
    }
    );
}


  public getAllImages(){
    this.imageService.getImagesInSlider().subscribe((data =>{

      this.images = data;
    
      console.log(data);
      console.log(this.images);
    }))
  }




}
