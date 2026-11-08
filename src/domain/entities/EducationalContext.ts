export class EducationalContext {
  public studentId: string;
  public studentProfile?: any;
  public progress?: any;
  public competencies?: any[];
  public objectives?: any[];
  public strategies?: any;
  public personalization?: any;
  public predictions?: any;
  public recommendations?: any;
  public planning?: any;
  public metrics?: any;
  public optimization?: any;
  public historyUsed?: any[];
  public modelConfidenceLevel?: number;

  constructor(studentId: string) {
    this.studentId = studentId;
  }
}
