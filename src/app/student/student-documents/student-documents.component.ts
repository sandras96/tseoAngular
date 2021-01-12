import { Component, OnInit, Input } from '@angular/core';
import { Document } from 'src/app/model/document.model';

@Component({
  selector: 'app-student-documents',
  templateUrl: './student-documents.component.html',
  styleUrls: ['./student-documents.component.css']
})
export class StudentDocumentsComponent implements OnInit {

  @Input() documents : Document[];
  constructor() { }

  ngOnInit(): void {
  }

}
