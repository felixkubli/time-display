
export class SvgCalculator {
  hoursToAngles(value: number, max: number) {
    return _.round(value * 360 / max);
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  describeArc(x, y, radius, startAngle, endAngle) {
    let start = this.polarToCartesian(x, y, radius, endAngle);
    let end = this.polarToCartesian(x, y, radius, startAngle);

    let largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    let d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');

    return d;
  }
}
