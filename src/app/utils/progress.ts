
export class Progress {
  max: number;
  progress: number;
  total_diff: number;
  type: string = 'primary';
  goal: number;
  total_grand: number;

  getProgress(total_grand: number, goal: number, total_diff: any) {
    this.goal = goal;
    if (this.goal <= total_grand) {
      this.type = 'success';
      this.max = total_grand;
      this.progress = this.goal;
    } else {
      this.type = 'danger';
      this.max = this.goal;
      this.progress = total_grand;
    }
    this.total_diff = Math.abs(total_diff);
  }
}
