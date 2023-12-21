import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-store';
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService
  ){
  }

  createUser(){
    this.usersService.create({
      name: 'alejo',
      email: 'alejo@gmail.com',
      password: '121212'
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }

  downloadPDF(){
    this.filesService.getFile('myPDF', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe();
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
        console.log(rta)
      });
    }
  }
}
