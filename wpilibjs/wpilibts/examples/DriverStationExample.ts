import { TimedRobot, RobotBase, DriverStation, JoystickAxisType } from '../src';

/**
 * A simple example that demonstrates how to use the DriverStation.
 */
class DriverStationExample extends TimedRobot {
  private counter: number = 0;
  
  /**
   * This function is run when the robot is first started up.
   */
  public override robotInit(): void {
    console.log('Robot initialized!');
    
    // Set up the driver station for simulation
    const ds = DriverStation.getInstance();
    
    // Connect the driver station
    ds.setDSAttached(true);
    
    // Set up a joystick
    ds.setJoystickAxis(0, JoystickAxisType.kX, 0);
    ds.setJoystickAxis(0, JoystickAxisType.kY, 0);
    
    // Start in disabled mode
    ds.setEnabled(false);
  }
  
  /**
   * This function is called periodically in all robot modes.
   */
  public override robotPeriodic(): void {
    this.counter++;
    
    // Every 2 seconds, toggle between enabled and disabled
    if (this.counter % 100 === 0) {
      const ds = DriverStation.getInstance();
      ds.setEnabled(!ds.isEnabled());
      console.log(`Robot ${ds.isEnabled() ? 'enabled' : 'disabled'}`);
    }
    
    // Every 5 seconds, toggle between autonomous and teleop
    if (this.counter % 250 === 0) {
      const ds = DriverStation.getInstance();
      ds.setAutonomous(!ds.isAutonomous());
      console.log(`Robot in ${ds.isAutonomous() ? 'autonomous' : 'teleop'} mode`);
    }
    
    // Simulate joystick movement
    if (this.counter % 10 === 0) {
      const ds = DriverStation.getInstance();
      const time = this.counter * this.getPeriod();
      ds.setJoystickAxis(0, JoystickAxisType.kX, Math.sin(time));
      ds.setJoystickAxis(0, JoystickAxisType.kY, Math.cos(time));
    }
  }
  
  /**
   * This function is called once when the robot enters disabled mode.
   */
  public override disabledInit(): void {
    console.log('Robot disabled!');
  }
  
  /**
   * This function is called once when the robot enters autonomous mode.
   */
  public override autonomousInit(): void {
    console.log('Autonomous mode started!');
  }
  
  /**
   * This function is called periodically when the robot is in autonomous mode.
   */
  public override autonomousPeriodic(): void {
    if (this.counter % 50 === 0) {
      const ds = DriverStation.getInstance();
      const x = ds.getStickAxis(0, JoystickAxisType.kX);
      const y = ds.getStickAxis(0, JoystickAxisType.kY);
      console.log(`Autonomous: Joystick at (${x.toFixed(2)}, ${y.toFixed(2)})`);
    }
  }
  
  /**
   * This function is called once when the robot enters teleop mode.
   */
  public override teleopInit(): void {
    console.log('Teleop mode started!');
  }
  
  /**
   * This function is called periodically when the robot is in teleop mode.
   */
  public override teleopPeriodic(): void {
    if (this.counter % 50 === 0) {
      const ds = DriverStation.getInstance();
      const x = ds.getStickAxis(0, JoystickAxisType.kX);
      const y = ds.getStickAxis(0, JoystickAxisType.kY);
      console.log(`Teleop: Joystick at (${x.toFixed(2)}, ${y.toFixed(2)})`);
    }
  }
}

// Start the robot program
if (require.main === module) {
  RobotBase.main(DriverStationExample);
}
