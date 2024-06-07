export interface RaidCliCmd {
  key?: string;
  devID: string;
  refReturn: any;
  refParam: any;
  param?: any;
  parallelCLIParam?: any;
  showArray?: any;
}

export interface ParallelCommand {
  CommandSetKey: string;
  devType: string;
  CLICommands: Array<RaidCliCmd>;
}

export class ParallelCLISeverity {
  public static SEVERITY_STOP_ALL_STAGES = 'stop all stages';
  public static SEVERITY_IGNORE_FAIL_TO_NEXT_COMMAND = 'ignore fail to next command';
}