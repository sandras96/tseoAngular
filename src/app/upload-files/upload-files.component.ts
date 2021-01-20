import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../model/document.model';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  studentId : any;

  fileInfos: Observable<FileList>;

  @Output() uploadDocument = new EventEmitter<FileList>();
  constructor(private uploadService: UploadFileService,
              private route : ActivatedRoute,
              private toastr : ToastrService) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    console.log(this.studentId)
    this.fileInfos = this.uploadService.getFiles(this.studentId);
    console.log("Fajlovi su ", this.fileInfos)
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.uploadDocument.emit(this.selectedFiles);
  }

// The progress will be calculated basing on event.loaded and event.total.
// If the transmission is done, the event will be a HttpResponse object.
// At this time, we call uploadService.getFiles() to get the files’ information
// and assign the result to fileInfos variable.

  upload(): void {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile, this.studentId).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles(this.studentId);
          
          console.log("Date upload " , this.currentFile.lastModified, "File infos su", this.fileInfos)
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }

  removeDocument(doc){
    this.uploadService.delete(doc.id)
      .subscribe( data=>{
          console.log("remove file")
        this.fileInfos = this.uploadService.getFiles(this.studentId);
        this.toastr.success("File " + doc.name + " was successfully deleted", "Success")
      })
  }
}
