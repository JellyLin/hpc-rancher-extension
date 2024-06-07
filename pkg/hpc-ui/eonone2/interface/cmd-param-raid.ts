export interface BgJobParam {
  key: string;
  param: {
    Type: string;
    Target?: string; // (optional) if you unassign this value, I will assign it as CLIJob-ID automatically in server.
  };
}

export interface CreateLDParam {
  'RAID-level': string;
  'disk-list': string;
  assign?: string; // assignCtrl
  size?: string;
  stripe?: number; // stripeSize
  mode?: string;
  name?: string;
  write?: string; // writePolicy
  op?: string;
  y?: string;
}

export interface CreateLVParam {
  name: string;
  'LD-index-list'?: string;
  assign?: string; // assignCtrl
  write?: string; // writePolicy
  tier?: string;
}

export interface CreatePartParam {
  'LV-ID': string;
  name: string;
  size?: string;
  min?: string;
  init?: string;
  tier?: string;
  impartial?: string;
  enableFileSystem?: string;
  cga?: string; // cloudGateway
  clouddedup?: string;
  cloudmode?: string;
  cloudperiod?: string;
  cloudthreshold?: string;
  fullcache?: string;
  alias?: string;
  f?: string; // isFullRestore
  d?: string; // dedup
  iofirst?: string;
  threshold?: string;
  compression?: string;
  dedupduration?: string;
  dedupstarttimedayofweek?: string;
  dedupstarttimehoursminute?: string;
  category?: string; // volumeCategory
  csDriveType?: string;
  isDockerType?: boolean;
  k?: string;
  caseInsensitive?: string;
  ci?: string;
  fs?: string;
  compressionalgorithm?: string;
}

export interface CreateReplicaParam {
  name: string;
  'source-volume-type': string;
  'source-volume-ID'?: string;
  'target-volume-type': string;
  'target-volume-ID'?: string;
  type?: string;
  priority?: string;
  desc?: string;
  incremental?: string;
  timeout?: string;
  compression?: string;
  si?: string;
  init?: string;
  retain?: string;
}

export interface DeleteFullLDParam {
  'ld-id-list': string;
}

export interface DeleteFullPoolParam {
  'pool-ID': string;
  y?: string;
}

export interface ExportCoreDumpParam {
  filename?: string;
  a?: string; // action
  f?: string; // forceCoredump
  nodename?: string;
}

export interface ExportSupportParam {
  filename?: string;
  mode?: string;
  d?: string; // deleteFile
}


export interface ExportConfigParam {
  mode?: string;
  d?: string; // deleteFile
}

export interface ImportConfigParam {
  path: string;
}

// tslint:disable-next-line: no-empty-interface
export interface MuteParam { }

export interface UpdateFWParam {
  filename: string;
  isRollingUpgrade: boolean;
  isReset: boolean;
  isUI: boolean;
  bgJob?: string;
  biosfilename?: string;
  y: string;
}

export interface UpdateVerifyFileParam {
  filename: string;
}

export interface UpdateClusterFWParam {
  filename: string;
  biosFileName: string;
}

export interface UpdateKSFWParam {
  filePath: string;
  size: number;
}

export interface FssSystemSyncFileParam {
  fullpath: string;
  raidId: any;
  type: number;
}

export interface FssSystemSyncFileStatusParam {
  fullpath: string;
}

export interface RollingUpgradeParam {
  y?: string;
}

export interface ResetControllerParam {
  y?: string;
  flush?: string;
  bgJob?: string;
}
export interface SetRestfulParam {
  path?: string;
  url?: string;
  body: string;
  ip?: string;
  timeout?:string;
  method?:string;
}
export interface ShutdownControllerParam {
  y?: string;
  bgJob?: string;
}

export interface FSSDockerProxyParam {
  s: string;
  p?: string;
}

export interface SetControllerDefaultParam {
  y: string;
  r: string;
}

// Locate drive
export interface SetDiskFlashParam {
  'disk-index': string;
  e?: string;   // expect (if it exists, need to be set '')
}

// Media scan
export interface SetDiskScanParam {
  'disk-index-list': string;
  mode: string;
  priority: string;
}

// Media scan - abort
export interface SetDiskScanAbortParam {
  'index-list': string;
  a: string;
}

// Clone
export interface SetDiskCloneSourceParam {
  'source-disk': string;
  s?: string;   // mode = replaceAfterClone
}

// Clone - abort
export interface SetDiskCloneDestinationParam {
  'destination-disk': string;
  a?: string;
}

// Copy and clone
export interface SetDiskCopyParam {
  'source-disk': string;
  'destination-disk': string;
  priority: string;
}

// Copy and clone - abort
export interface SetDiskCopyAbortParam {
  'destination-disk': string;
  a: string;
}


// Clean Reserved Space
export interface SetDiskClearParam {
  'disk-index-list': string;
}

// Sanitize drive
export interface SetDiskFormatParam {
  'disk-index': string;
}

// Read/Write test
export interface SetDiskRwtestParam {
  'disk-index-list': string;
  mode?: string;
  error?: string;
  recovery?: string;
  a?: string;
}

export interface SetEnclosureLedParam {
  enclosureID: number;
  turnOnServiceLED?: boolean;
  turnOnSystemLED?: boolean;
}

// Manage spare drive
export interface SetDiskSpareParam {
  'disk-index': string;
  type: string;
  ld?: string;
}

// Delete spare drive
export interface SetDiskSpareDeleteParam {
  'disk-index': string;
  d: string;
}

// Erase SED drive
export interface SetSEDEraseParam {
  'disk-index': string;
}

// Add SSD drive
export interface SetSSDCacheAddDiskParam {
  disk: string;   // diskIndexList
  y: string;
}

// Remove SSD drive
export interface SetSSDCacheRemoveDiskParam {
  disk: string;   // value is index in data.ssd, not id in data.disks
}

export interface SetSSDCacheServiceParam{
  switch: string;   // enable or disable
}

export interface SetMultiEnclosureLedParam {
  enclosureIDs?: string;
  service?: string;
  system?: string;
}

export interface SetScheduleHostParam {
  'schedule-ID': string;
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime?: string;
  period: string;
  'day-list': string;
  rule?: string;
  number?: number;
  priority?: string;
  repeat?: string;
  runNow: string;
}

export interface SetDiskParmParam {
  spin?: string;
  smart?: string;
  autospare?: string;
  delay?: string;
  tag?: string;
  io?: string;
  check?: string;
  swap?: string;
  cache?: string;
  life?: string;
  poll?: string;
}

export interface SetDiskSavingParam {
  mode?: string;
  level1?: string;
  level2?: string;
}

export interface UpdateCSDriveRecParam {
  ip: string;
  nodeId: string;
}

export interface ParallelCLIParam {
  customErrorMsgs?: string;
  severity: string;
}

export interface CreateScheduleHostParam {
  type: string;
  name: string;
  IDs?: string;
  startDate: string;
  startTime: string;
  endDate?: string;
  endTime?: string;
  repeat?: string;
  period?: string;
  'day-list'?: string;
  rule?: string;
  number?: number;
  priority?: string;
  reclaim?: string;
  siName?: string;
  siDescription?: string;
  runNow?: string;
}

export interface ShowCloudStorageGatewayHistoryParam {
  n: any;
  p: any;
  S: any;
  t?: any;
  m?: any;
  s?: any;
  b?: any;
  e?: any;
  N?: any;
  D?: any;
  uniqueID?: any;
}

export interface CheckSedKeyParam {
  'sed-key'?: string;
  f?: string;
}

export interface SetControllerPerformanceParam {
  option: number;
}

export interface CreateActionLogParam {
  LogID?: string;
  valuelist: string;
  userType?: string;
  isImmediately?: boolean;
}

export interface DeleteTargetFileParam {
  target: string;
}

export interface CheckNTPParam {
  ip: string;
}

export interface SetControllerParmParam {
  normal?: string;
  init?: string;
  rebuild?: string;
  priority?: string;
  max?: string;
  av?: string;
  post?: string;
  snmp?: string;
  sntpIp?: string;
  sntpPoll?: string;
  readAhead?: string;
}

export interface SetControllerDateParam {
  yyyyMMdd?: string;
  hhmmss?: string;
  gmt?: string;
}

export interface SetLVParam {
  'LV-ID': string;
  name?: string;
  assign?: string;
  write?: string;
}

export interface SetLvExpandParam {
  'LV-ID': string;
  size?: string;
}

export interface SetLdParam {
  'LD-id'?: string;
  name?: string;
  assign?: string;
}

export interface SetCacheParam {
  write?: string;
  sync?: string;
}

export interface SetControllerRedundancyParam {
  remote?: string;
  cache?: string;
  adaptive?: string;
  reduction?: string;
  ctlrAssign?: string;
  ldAssign?: string;
}

export interface SetThresholdParam {
  ID?: string;
  min?: string;
  max?: string;
}

export interface SetControllerTriggerParam {
  controller?: string;
  battery?: string;
  powerLoss?: string;
  powerFail?: string;
  fan?: string;
  ted?: string;
}

export interface SetDiskArraySettingParam {
  normal?: string;
  init?: string;
  rebuild?: string;
  priority?: string;
  max?: string;
  av?: string;
  readAhead?: string;
  globalOP?: string;
}

export interface SetLvMultiTierParam {
  'LV-ID': string;
  'LD-index-list': string;
  'tier-level-list': string;
}

export interface SetLvTierDisableParam {
  'LV-ID': string;
}

export interface SetLvAddParam {
  'LV-ID': string;
  'LD-index-list'?: string;
  tier?: string;
}

export interface SetLDAddParam {
  'LD-id': string;
  'disk-list': string;
}

export interface SetLDMigrationParam {
  id: string;
  'RAID-level': string;
  'disk-list'?: string;
}

export interface SetLDRebuildParam {
  'LD-index': string;
  abort?: boolean;
}

export interface SetLDParityParam {
  'LD-id-list': string;
  mode: string;
  abort?: boolean;
}

export interface SetLDExpandParam {
  'id-list': string;
  'expand-size'?: number;
  mode?: string;
}

export interface SetLDSavingParam {
  index: string;
  mode: string;
  level1: string;
  level2: string;
}

export interface SetLDScanParam {
  'index-list': string;
  mode?: string;
  priority?: string;
  abort?: boolean;
}

export interface ImportLicenseParam{
  filename: string;
  y: string;
  r: string;
}

export interface ExportLicenseParam{
  filename: string;
  y: string;
}

export interface CreateMapParam{
  part: string;
  'partition-ID': string;
  'Channel-ID'?: string;
  'Target-ID'?: string;
  'LUN-ID'?: string;
  default?: string;
  customType?: string;
  group?: string;
  host?: string;
  wwn?: string;
  type?: string;
  mode?: string;
  mapSet?: any;
}
export interface DeleteMapParam {
  part: string;
  'partition-ID': string;
  'Channel-ID'?: string;
  'Target-ID'?: string;
  'LUN-ID': string;
  'host-id'?: string ;
  y: string;
}

export interface SetLDShutdownParam {
  index?: string;
}

export interface DeleteLDParam {
  'index-list': string;
  y: string;
}

export interface SetLDSedUnlockParam {
  'ld-index-list'?: string;
  password?: string;
  keyfile?: string;
}
export interface SetControllerDeassertParam {
  y: string;
}

export interface SetControllerForceFailParam {
  slot: string;
  y: string;
}

export interface ShutdownPoweroffParam {
  y: string;
}

export interface SetControllerNameParam {
  name: string;
}

export interface SetSnmpReceiverParam {
  switch: string;
  severity: string;
  ip: string;
  recvseverity: string;
  version: string;
  name: string;
  auth: string;
  authpw: string;
  privacy: string;
  privacypw: string;
  community: string;
}

export interface UnassignReplicationParam{
  type: string;
  id: string;
  d?: string;
  y?: string;
}

export interface SetPartParam{
  'partition-ID': string;
  name: string;
  min?: string;
  cloudcache?: string;
  cloudmode?: string;
  fullcache?: string;
  cloudperiod?: string;
  f?: string; // isFullRestore
  threshold?: string;
  iofirst?: string;
  compression?: string;
  m?: string; // mountFail
  cloudThreshold?: string;
  dedupDuration?: string;
  dedupStartTimeDayOfWeek?: string;
  dedupStartTimeHoursMinute?: string;
}

export interface SetPartTierResidedParam{
  'partition-ID': string;
  tier: string;
}

export interface SetLvTierMigrateParam{
  lvId: string;
  partId?: string;
  dataservice?: string;
  priority: string;
}

export interface ImportNVRAMParam{
  filename: string;
  y: string;
}

export interface ExportNVRAMParam{
  filename: string;
  exportToHost: boolean;
}

export interface EventLogExportParam {
  filename: string;
  '1stline'?: string;
}

export interface AddEditPoolThresholdParam {
  'lv-ID': string;
  rules: string;
  isEdit?: boolean;
}

export interface DeletePoolThresholdParam {
  'lv-ID': string;
  index: string;
}

export interface SetPartPurgeParam {
  'partition-ID': string;
  number: string;
  'rule-type': string;
}

export interface CreateIsnsParam {
  'IP-addresses': string;
}

export interface DeleteIsnsParam {
  index: string;
}

export interface SetIqnGroupParam {
  option: string;
  IQN: string;
  'group-name': string;
  m?: string;
}

export interface SetWwnGroupParam {
  option: string;
  WWN: string;
  'group-name': string;
  m?: string;
}

export interface CreateWwnParam {
  WWN: string;
  name: string;
}

export interface DeleteWwnParam {
  name: string;
}

export interface SetWwnParam {
  WWN: string;
  'new-alias-name': string;
}

export interface SetHostParam {
  queueDepth?: string;
  maxLun?: string;
  connMode?: string;
  concurrent?: any;
  numTag?: any;
  devType?: any;
  devQual?: any;
  removeMedia?: any;
  lunApp?: any;
  chs?: any;
  CHAP?: any;
  jumboFrame?: any;
}

export interface SetChannelParam {
  ID: string;
  mode: string;
  aid: string;
  bid: string;
  maxrate: string;
  mcs: string;
}

export interface SetChannelOwnerParam {
  'channel-ID': string;
  type: string;
  f?: string;
}

export interface SetNetParam {
  ID: string;
  netType: string;
  v6NetType: string;
  isRedundant: boolean;
  ip_A: string;
  mask_A: string;
  gw_A: string;
  ip_B: string;
  mask_B: string;
  gw_B: string;
  v6Ip_A: string;
  prefix_A: string;
  route_A: string;
  v6Ip_B: string;
  prefix_B: string;
  route_B: string;
  ip?: string;
  mask?: string;
  gw?: string;
  v6ip?: string;
  prefix?: string;
  route?: string;
}

export interface SetChannelJumboFrameParam {
  channelId: string;
  index: string;
}

export interface CreateTrunkParam {
  'channel-ID-list': string;
  p?: string;
}

export interface DeleteTrunkParam {
  index: string;
  p?: string;
}

export interface SetScifconfigParam {
  t: string;
  controller: string;
  type4: 'static' | 'disable';
  ip4?: string;
  nm4?: string;
  gw4?: string;
  type6: 'static' | 'disable';
}

export interface SetReplicaParam {
  'volume-pair-ID': string;
  op?: string;
  priority?: string;
  name?: string;
  desc?: string;
  timeout?: string;
  si?: string;
}

export interface ShowDiagnosticParam {
  'device-ID': string;
  'packet-amount': number;
  'source-type': string;
}
export interface SetRRChannelParam {
  mode: string;
  'ch-list'?: string;
}
export interface SetPartMountParam {
  'partition-ID': string;
}

export interface CreateScheduleForGSParam {
  'schedule-policy': string;  // period
  command: string;            // command with all schedule configuration
  init: string;               // enable | disable
}

export interface DeleteScheduleParam {
  'job-ID': string;
}

export interface DeleteReplicaParam {
  'volume-pair-ID': string;
  y?: string;
}

export interface CreateMapForAutoMapParam {
  part: string;
  'partition-ID': string;
  'Channel-ID'?: string;
  'Target-ID'?: string;
  'LUN-ID'?: string;
  default?: string;
  customType?: string;
  group?: string;
  host?: string;
  wwn?: string;
  type?: string;
  mode?: string;
  mapSet?: any;
  mapset?: boolean;
  isforAutoMap?: boolean;
}

export interface SetReplicaAutoMapParam {
  'volume-pair-ID': string;
  op ?: string;
  ip ?: string;
  automap ?: string;
  checktime ?: string;
  runfile ?: string;
  filename ?: string;
  mapto ?: string;
  ch ?: string;
  target ?: string;
  lun ?: string;
  hlun ?: string;
  hostID ?: string;
  hostName ?: string;
  alias ?: string;
  group ?: string;
  mapPriority ?: string;
  accessMode ?: string;
}

export interface DeleteIqnParam {
  name: string
}

export interface CreateIqnParam {
  IQN: string;
  'IQN-alias-name': string;
  user?: string;
  password?: string;
  target?: string;
  targetPsw?: string;
  ip?: string;
  mask?: string;
}


export interface SetIqnParam {
  oldName: string;
  name?: string;
  user?: string;
  password?: string;
  target?: string;
  'target-password'? : string;
  ip?: string;
  mask?: string;
}

export interface SetControllerTimezoneParam{
  gmt: string;
  index: string;
}

export interface SetControllerDaylightParam{
  startDate: string;
  startTime: string;
  'end-date': string;
  'end-time': string;
  offset: string;
}

export interface DeleteScheduleHostParam {
  'schedule-ID': string;
}

export interface DeleteThresholdParam {
  p: string;
  v: string;
  i: string;
}

export interface SetPartExpandParam {
  'partition-ID': string;
  size?: string;
}

export interface SetPartReclaimForGSParam {
  'partition-ID': string;
  priority: string;
  status: string;
}

export interface DeleteFullPartParam {
  'partition-ID': string;
  y?: string;
}

export interface CreateFlushParam {
  'partition-ID': string;
  ip: string;
  'os-type': string;
  disk?: string;
}

export interface SetFlushParam {
  'partition-ID': string;
  index: string;
  ip: string;
  'os-type': string;
  disk?: string;
  f?: string;
}

export interface DeleteFlushParam {
  'partition-ID': string;
  index: string;
}

export interface DbFlushParam {
  ip?: string;
  type?: string;
  user?: string;
  pass?: string;
  port?: string;
  dbname?: string;
  enable?: string;
  clustermodel?: string;
  cluster?: string;
  state?: string;
  l?: string;
}

export interface SetDbFlushParam {
  ip?: string;
  type?: string;
  user?: string;
  pass?: string;
  port?: string;
  enable?: string;
  clusterModel: string;
  cluster: boolean;
  agentip: string;
  name?: string;
  flushlog: boolean;
  nodeip?: string;
}

export interface CreateMultiSIParam {
  part: string;
  'Partition-IDs': string;
  name: string;              // Tag
  desc?: string;             // Description
  c?: string;                // isAllBackupToCloud (value is '')
  reclaim?: string;          // isReclaimAfterBackup (value is 'enable' or 'disable')
}

export interface SetSIParam {
  'snapshot-image-ID'?: string;
  name?: string;
  desc?: string;
  f?: string;       // isFullRestore (value is '')
  c?: string;       // isBackupToCloud (value is '')
  reclaim?: string; // isReclaimAfterBackup (value is 'enable' or 'disable')
}

export interface DeleteSIParam {
  'snapshot-image-ID': string;
}

export interface SetSIRollbackParam {
  'snapshot-image-ID': string;
  complete?: string;   // value is 'enable'
}

export interface SetSIMountParam {
  'snapshot-image-ID': string;
}

export interface CreateSEDFileParam{
  filename: string;
}

export interface SetSedPasswordParam{
  password?: any;
  keyfile?: any;
}

export interface SetSedRefReturnParam{
  isGlobalRefReturn?: boolean;
}

export interface SetSedKeyForceParam{
  isGlobalRefParam?: boolean;
  keyType?: string;
}

export interface SetLdSedForceEnableParam{
  isGlobalRefParam: boolean;
  stringFile: string;
  ldList: any;
  sedKey?: string;
}

export interface SetLdSedForceDisableParam{
  ldList: any;
}

