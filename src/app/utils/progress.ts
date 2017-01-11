
export class Progress {
  max: number;
  progress: number;
  total_diff: number;
  type: string = 'primary';
  goal: number;
  total_grand: number;

  getProgress(total_grand: number, goal: number, total_diff: any) {
    this.goal = goal;
    this.total_grand = total_grand;
    this.total_diff = total_diff;

    if (this.goal <= this.total_grand) {
      this.type = 'success';
    } else if (this.goal > this.total_grand) {
      this.type = 'primary';
    }
    this.total_diff = Math.abs(this.total_diff);
  }
}
