import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from 'src/app/model/document.model';
import { DocumentService } from 'src/app/services/document.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-student-documents',
  templateUrl: './student-documents.component.html',
  styleUrls: ['./student-documents.component.css']
})
export class StudentDocumentsComponent implements OnInit {

  @Input() documents : Document[];
  @Output() deleteDocument = new EventEmitter<Document[]>();

  constructor(private documentService: DocumentService,
              private uploadService : UploadFileService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // removeDocument(doc){
  //   this.documentService.delete(doc.id)
  //     .subscribe(data=>{
  //       this.deleteDocument.emit(doc);
  //       this.toastr.success("Document " + doc.name + " was successfully deleted", "Success")
  //     },
  //     error=>{
  //       console.log(error)
  //     }
  //     )
  // }
  removeDocument(doc){
    this.uploadService.delete(doc.id)
      .subscribe( data=>{
        this.deleteDocument.emit(doc);
        this.toastr.success("Document " + doc.name + " was successfully deleted", "Success")
      })
  }
uploadDocument(doc){
  this.documents = [...this.documents, doc]
}
}
