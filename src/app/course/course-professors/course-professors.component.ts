import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { Professor } from 'src/app/model/professor.model';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-course-professors',
  templateUrl: './course-professors.component.html',
  styleUrls: ['./course-professors.component.css']
})
export class CourseProfessorsComponent implements OnInit {

  professorsAll : Professor[];
  filteredProfessors : Professor[] = [];
  @Input() professors : Professor[];
  @Output() deleteProfessor = new EventEmitter<Professor[]>();
  @Output() addProfessor = new EventEmitter<Professor[]>();
  constructor(private professorService : ProfessorService,
              private route : ActivatedRoute,
              private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getAllProfessors();
  }

  removeProfessor(professor){
    this.professorService.removeCourseProfessor(professor.id, this.route.snapshot.paramMap.get('id'))
      .subscribe(data=>{
        console.log("remove course prof")
        this.deleteProfessor.emit(professor);
        this.toastr.success('Professor ' +professor.firstname+ ' was successfully removed!', 'Success!');
        this.filteredProfessors.push(professor)
      },error=>{
        console.log(error)
      })
  }

  signProfessor(professorId){
    console.log("professor za kurs jee" , professorId)
    this.professorService.get(professorId).subscribe(professor =>{
      this.professorService.updateCourse(professorId, this.route.snapshot.paramMap.get('id'),professor)
        .subscribe(data=>{
          this.addProfessor.emit(professor);
          this.filteredProfessors = this.arrayRemove(this.filteredProfessors, professorId);
        })
    })
  }
  getAllProfessors(){
    this.professorService.getAll()
      .subscribe(data=>{
        this.professorsAll=data;
        console.log(data);
        this.getFilteredProfessors();
      },error=>{
        console.log(error)
      })
  }

  getFilteredProfessors() {
    this.filteredProfessors = [];
    this.professorsAll.forEach( professor => {
      let counter = 0
      this.professors.forEach( p => {
        if (p.id === professor.id) {
          counter++
        }
      })
      if (counter === 0) {
        this.filteredProfessors.push(professor)
      }
    })
  }
  arrayRemove (array, id) { 
    return array.filter((ele) => { 
        return ele.id != id; 
    });
}
}
