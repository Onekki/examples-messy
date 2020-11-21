export class JcwExtra {
  static: JcwStatic;
  dynamic: JcwDynamic;
}


export class JcwStatic {
  realname: string;
  lUserId: number;
  arrLoginUrl: string[];
  cookie: string;
  lGradeId: string;
  lClassId: string;
  initTasks: JcwTask[]
}

export class JcwDynamic {
  active: number;
  tasks: JcwTask[];
}

export class JcwTask {
  id: number;
  title: string;
  classHour: number;
  credit: number;
  courseCount: number;
  courses: JcwCourse[];
  finished: boolean;
}

export class JcwCourse {
  id: string;
  title: string;
  videoDone: number;
  videoTotal: number;
  correctRate: string;
  afterAnswer: []
  finished: boolean;
}

