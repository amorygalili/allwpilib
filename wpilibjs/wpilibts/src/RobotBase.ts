import { DriverStation } from './DriverStation';

/**
 * RobotBase is the base class for all robot programs in TypeScript.
 *
 * This class provides the basic structure for robot programs, including
 * the main entry point and lifecycle methods.
 */
export abstract class RobotBase {
  private static m_robotInitialized = false;
  private static m_robotRunning = false;

  /**
   * Constructor for a generic robot program.
   * User code should be placed in the constructor that runs before the Autonomous or Operator
   * Control period starts. The constructor will run to completion before Autonomous is entered.
   */
  constructor() {
    console.log(`********** Robot program starting **********`);
  }

  /**
   * Determine if the Robot is currently enabled.
   *
   * @return True if the Robot is currently enabled by the field controls.
   */
  public isEnabled(): boolean {
    return DriverStation.getInstance().isEnabled();
  }

  /**
   * Determine if the Robot is currently disabled.
   *
   * @return True if the Robot is currently disabled by the field controls.
   */
  public isDisabled(): boolean {
    return !this.isEnabled();
  }

  /**
   * Determine if the robot is currently in Autonomous mode.
   *
   * @return True if the robot is currently operating Autonomously.
   */
  public isAutonomous(): boolean {
    return DriverStation.getInstance().isAutonomous();
  }

  /**
   * Determine if the robot is currently in Teleop mode.
   *
   * @return True if the robot is currently operating Teleoperatedly.
   */
  public isTeleop(): boolean {
    return DriverStation.getInstance().isTeleop();
  }

  /**
   * Determine if the robot is currently in Test mode.
   *
   * @return True if the robot is currently running tests.
   */
  public isTest(): boolean {
    return DriverStation.getInstance().isTest();
  }

  /**
   * Determine if the robot is currently in Simulation.
   *
   * @return True if the robot is currently running in simulation.
   */
  public isSimulation(): boolean {
    return true; // For now, always return true since we're in TypeScript
  }

  /**
   * Determine if the robot is currently in Real.
   *
   * @return True if the robot is currently running in the real world.
   */
  public isReal(): boolean {
    return false; // For now, always return false since we're in TypeScript
  }

  /**
   * Robot-wide initialization code should go here.
   *
   * This method is called once when the robot is first started up.
   */
  public robotInit(): void {}

  /**
   * Ends the main robot program.
   */
  public endCompetition(): void {
    RobotBase.m_robotRunning = false;
  }

  /**
   * Provide an alternate "main loop" via startCompetition().
   */
  public abstract startCompetition(): void;

  /**
   * Clean up resources used by the robot.
   *
   * This method should be overridden by subclasses to clean up any resources
   * they have allocated.
   */
  public close(): void {}

  /**
   * Starting point for the robot applications.
   */
  public static main(robotClass: new () => RobotBase): void {
    if (RobotBase.m_robotInitialized) {
      throw new Error("The robot has already been initialized!");
    }
    RobotBase.m_robotInitialized = true;

    RobotBase.m_robotRunning = true;

    let robot: RobotBase | undefined;
    try {
      robot = new robotClass();

      try {
        robot.startCompetition();
      } catch (error) {
        console.error("startCompetition() failed", error);
        throw error;
      }
    } catch (error) {
      console.error("Unhandled exception", error);
      throw error;
    } finally {
      if (robot) {
        try {
          robot.close();
        } catch (error) {
          console.error("Exception during close()", error);
        }
      }
    }
  }
}
