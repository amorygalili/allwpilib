# WPILib TypeScript Implementation (wpilibts)

This package provides a TypeScript implementation of the WPILib robot programming framework, designed for use with FRC robots.

## Overview

The wpilibts package provides the core classes needed to create robot programs using TypeScript. It follows the same structure and patterns as the Java implementation (wpilibj) but is adapted for TypeScript and Node.js.

## Key Classes

- **RobotBase**: The base class for all robot programs.
- **IterativeRobotBase**: Implements a specific type of robot program framework with periodic methods.
- **TimedRobot**: Extends IterativeRobotBase to provide a timed robot program framework.
- **Watchdog**: A utility class for monitoring loop timing and detecting overruns.

## Getting Started

To create a new robot program:

1. Install the package:
   ```bash
   npm install @wpilibjs/wpilibts
   ```

2. Create a new robot class that extends TimedRobot:
   ```typescript
   import { TimedRobot, RobotBase } from '@wpilibjs/wpilibts';

   class MyRobot extends TimedRobot {
     public override robotInit(): void {
       console.log('Robot initialized!');
     }
     
     public override autonomousInit(): void {
       console.log('Autonomous mode started!');
     }
     
     public override autonomousPeriodic(): void {
       // Autonomous code here
     }
     
     public override teleopInit(): void {
       console.log('Teleop mode started!');
     }
     
     public override teleopPeriodic(): void {
       // Teleop code here
     }
   }

   // Start the robot program
   if (require.main === module) {
     RobotBase.main(MyRobot);
   }
   ```

3. Run your robot program:
   ```bash
   npx ts-node MyRobot.ts
   ```

## Robot Lifecycle

The robot program follows a specific lifecycle:

1. **robotInit()**: Called once when the robot is first started up.
2. **simulationInit()**: Called once in simulation mode after robotInit().
3. **disabledInit()**: Called once when the robot enters disabled mode.
4. **autonomousInit()**: Called once when the robot enters autonomous mode.
5. **teleopInit()**: Called once when the robot enters teleop mode.
6. **testInit()**: Called once when the robot enters test mode.

Periodic methods are called repeatedly while in the corresponding mode:

- **robotPeriodic()**: Called periodically in all modes.
- **disabledPeriodic()**: Called periodically in disabled mode.
- **autonomousPeriodic()**: Called periodically in autonomous mode.
- **teleopPeriodic()**: Called periodically in teleop mode.
- **testPeriodic()**: Called periodically in test mode.
- **simulationPeriodic()**: Called periodically in simulation mode.

Exit methods are called when leaving a mode:

- **disabledExit()**: Called when exiting disabled mode.
- **autonomousExit()**: Called when exiting autonomous mode.
- **teleopExit()**: Called when exiting teleop mode.
- **testExit()**: Called when exiting test mode.

## Examples

See the `examples` directory for sample robot programs.

## License

This project is licensed under the BSD 3-Clause License.
