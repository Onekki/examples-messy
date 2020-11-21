
export class JcwExtra {
  realname: string;
  lUserId: number;
  arrLoginUrl: string[];
  cookie: string;
  lGradeId: string;
  lClassId: string;
  studyTasks: StdudyTask[]
}

export class StdudyTask {
  taskId: number;
  classHour: number;
  credit: number;
  courseCount: number;
  courses: Course[]
}

export class Course {
  courseId: string;
  title: string;
  videoDone: number;
  videoTotal: number;
  correctRate: string;
}

export class Evaluation {

}

export class Exam {
  
}
