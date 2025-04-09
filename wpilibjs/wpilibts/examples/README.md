# wpilibts Examples

This directory contains example robot programs that demonstrate how to use the wpilibts library.

## Examples

### BasicRobot.ts

A simple robot example that demonstrates the basic structure of a robot program using the TimedRobot class. It shows:

- How to override the various lifecycle methods (init, periodic, exit)
- How to handle different robot modes (disabled, autonomous, teleop, test)
- How to use the robot's periodic timing

To run this example:

```bash
npx ts-node examples/BasicRobot.ts
```

### DrivetrainRobot.ts

A more advanced example that demonstrates a simple differential drivetrain. It shows:

- How to create and use motor controllers
- How to implement a differential drive system
- How to handle joystick input
- How to create a simple autonomous routine
- How to implement test mode functionality

To run this example:

```bash
npx ts-node examples/DrivetrainRobot.ts
```

## Creating Your Own Robot Program

To create your own robot program:

1. Create a new TypeScript file
2. Import the necessary classes from wpilibts
3. Create a class that extends TimedRobot
4. Override the necessary methods for your robot's functionality
5. Call RobotBase.main() with your robot class

Example:

```typescript
import { TimedRobot, RobotBase } from '@wpilibjs/wpilibts';

class MyRobot extends TimedRobot {
  public override robotInit(): void {
    console.log('Robot initialized!');
  }
  
  public override teleopPeriodic(): void {
    // Your teleop code here
  }
}

// Start the robot program
if (require.main === module) {
  RobotBase.main(MyRobot);
}
```
