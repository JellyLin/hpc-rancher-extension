export interface FssTrunkSetConfOnlyParam {
  action: string; // 'add' or 'delete'
  n: string; // eg. 'trunk_0_1'
  m: string; // eg. 'ch0 ch1'
  b?: number; // 4: LACP, 6: ALB
}

export interface FssCliScriptParam {
  cmdSet: Array<any>;
}

export interface FssIfconfigGroupSetParam {
  action: string; // 'set' or 'unset'
  g: string; // eg. 'ch0 ch1'
}

export interface FssSetChannliNetConfOnlyParam {
  controller: string;
  interface: string;
  policy: string;
  ip: string;
  netmask: string;
  gateway?: string;
}

export interface FssSetDladmConfOnlyParam {
  controller: string;
  interface: string;
  p: string; // mtu
}

export interface FssVolumeFuncSetRdmaParam {
  c: string; // clusterName
  a: string; // 'on' 'off'
}

export interface FssClusterFuncShrinkParam {
  c: string; // clusterName
  n: string; // nodeID
}

export interface FssCsDataRecoveryStateParam {
  c: string; // clusterName
  a: string; // operation
}

export interface FssCsIfconfigSetParam {
  controller: string;
  nid: string;
  c: string;
  t: string;
  m: string;
  type4: string;
  ip4?: string;
  nm4?: string;
  gw4?: string;
  type6: string;
  ip6?: string;
  pl6?: string;
  gw6?: string;
  bm?: string;
}

export interface FssCsIfconfigUnsetParam {
  controller: string;
  nid: string;
  c: string;
}

export interface FssCsIfconfigRmNodeParam {
  controller: string;
  nid: string;
}

export interface FssCsSyncInfoParam {
  type: string;
}

export interface FssCsSyncTypes {
  types: {
    user?: boolean;
    group?: boolean;
    ad?: boolean;
    ldap?: boolean;
    nis?: boolean;
    share?: boolean;
    service?: boolean;
    dns?: boolean;
    csnet?: boolean;
    all?: boolean;
    gntp?: boolean;
    schedule?: boolean;
    rsync?: boolean;
    nvr?: boolean;
  };
}

export interface FssCsSyncParam {
  t: string;
  slot: string;
}

export interface FsDnsAddParam {
  address?: string;
}

export interface FsDnsDeleteParam {
  address?: string;
}

export interface FssSetDladmParam {
  controller: string;
  interface: string;
  p: string; // mtu
}

export interface FssNetFuncParam {
  c: string; // clusterName
  n: string; // nodeId
  a: string; // IP
}

export interface FssCsIfconfigRouteSetParam {
  controller: string;
  nid: string;
  c: string;
  d?: string;
  m?: string;
  g?: string;
  p: string;
}

export interface FssShareFolderParam {
  folder_path: string;
  protocal_status?: string;
  protocal?: string;
  nfs?: string;
  cifs?: string;
  afp?: string;
  ftp?: string;
  a?: string; // access_based_enumeration
  e?: string; // SMB_encryption
  A?: string; // cifsAio
  f?: string; // vfs_fruit
  n?: string; // sharename
  h?: string; // host
  p?: string; // access_right
  s?: string; // squash
  g?: string; // gid
  u?: string; // uid
  d?: string; // sharecomment
  c?: string; // clearHost
}

export interface FssNexaclSet {
  f: string; // folder_path
  a: any; // setPermission
  d: any; // deletePermission
}

export interface FssCsEnclosureAddParam {
  clusterName: string;
  nodeId: string;
  'partition-ID'?: string;
}

export interface FssCsIfconfigShowParam {
  controller: string; // 'slotA' | 'slotB'
  t: string; // 'conf' | 'data_info' | 'bond_info'
}

export interface FssCsVolumeCreateSetParam {
  size?: string;
  poolType?: string;
  protectionLevel?: string;
  volumeName?: string;
  clusterName?: string;
  quotaSwitch?: string;
  snapSize?: string;
  description?: string;
  writeBackOpt?: string;
  distributed_number?: string;
  max_distributed_number?: string;
  enclosureList?: string;
  autoRebalance?: string;
  softlimit?: string;
  worm?: string;
  retention?: string;
  lockTime?: string;
  advancedACL?: string;
  nodes?: string;
  CompressPolicy?: string;
  enableDedup?: string;
  fileSystem?: string;
}

export interface FssCsVolumeCreateGetParam {
  c: string;
  t: string;
  o: string;
  x?: string;
  j?: string;
  C?: string;
  P?: string;
  N: string;
}

export interface FssCsVolumeEditParam {
  c: string;
  v: string;
  w?: string;
  p?: string;
  d?: string;
  a?: string;
  q?: string;
  r?: string;
  m?: string;
  A?: string;
  n?: string;
}

export interface FssCsVolumeSetQuotaParam {
  c: string;
  v: string;
  d: string;
  q: string;
  s: string;
}

export interface FssCsVolumeDelQuotaParam {
  c: string;
  v: string;
  d: string;
}

export interface FssCsVolumeWriteBackParam {
  c: string;
  v: string;
  w: string;
}

export interface FssCsVolumeDeleteParam {
  c: string;
  v: string;
}

export interface FssCsVolumeAutoRebalanceParam {
  c: string;
  v: string;
  a: string;
  d: string;
}

export interface FssCsVolumeExpandSetParam {
  c: string;
  v: string;
  a: string;
  j?: string;
}

export interface FssCsVolumeFuncVolumeRebalanceSetParam {
  c: string;
  v: string;
  f?: string;
  a?: string;
}

export interface FssCsCrossHealParam {
  operation: string;
  c: string;
  i: number;
}

export interface FssCsVolumeHealParam {
  operation: string;
  c: string;
  i: number;
}

export interface FssCsRebalanceAbortParam {
  c: string;
}

export interface FssVolumeFuncNodeRebalanceParam {
  c: string;
  o: string;
}

// tslint:disable-next-line: no-empty-interface
export interface FssCsGetBgJobParam { }

export interface FssCsRebalanceStatusParam {
  c: string;
}

export interface FssCsLastReplaceNodeParam {
  c: string;
}

export interface FssClusterFuncReplaceCheckParam {
  c: string;
}

// tslint:disable-next-line: no-empty-interface
export interface FssExplorerStartParam { }

// tslint:disable-next-line: no-empty-interface
export interface FssExplorerStatusParam { }

// tslint:disable-next-line: no-empty-interface
export interface FssExplorerStopParam { }

export interface FssCsSmartSetLoadBalance {
  clusterName: string;
  n: string;
  t: string; // second
  p: string; // { AUTO | RR | CPU | THR | CON }
}

export interface FssCsSmartUnsetLoadBalance {
  clusterName: string;
}

export interface FssGroupAddParam {
  group_name: string;
  userNameArr: string[];
  gdesc?: string;
}

export interface FssGroupRenameParam {
  group_name: string;
  n: string;
}

export interface FssGroupModifyParam {
  groupname: string;
  n: string;
  c: string;
}

export interface FssGroupAddDeleteUserParam {
  group_name: string;
  userNameArr: string[];
}

export interface FssGroupDeleteParam {
  group_name: string;
}

export interface FssUserDeleteParam {
  login_name: string;
  d?: boolean;
}

export interface FssVolumeFuncVolumeHealHealParam {
  c: string; // clusterName
}

export interface FssAddEditUserParam {
  type: 'Add' | 'Edit';
  name: string;
  desc: string;
  pwd: string;
  groupStr: string;
  isSuper: boolean;
  dirType: any;
  directory: string;
  isExpiration: boolean;
  expiration: string | number;
  isExpiryNotification?: boolean;
  expiryNotification?: number;
}

export interface FssModPasswdParam {
  login_name: string;
  p: string;
}

export interface FssConfigPasswdPolicyParam {
  isPolicy: boolean;
  minLenth: string;
  expireDay: string;
  warnDay: string;
  numHistory: string;
  minChar: string;
  minUpperChar: string;
  minLowerChar: string;
  minDigit: string;
  minSpecialChar: string;
  allowLocalUserChangePassword?: any;
}

export interface FssTaskOptionsAdParam {
  t: any; // taskMode {on|off}
}

export interface FssServiceOptionsAdParam {
  t?: string; // task
  a: string;  // address
  d?: string; // domain
  P: string;  // port
  s: string;  // security
  u: string;  // username
  p: string;  // password
  A: string;  // authenticationLevel
  c: string;  // domainControllerFQDN
  i: string;  // domainControllerIP
  h?: string; // homeDirectory
  S?: string; // sourcePath
  q?: string; // quota
  e?: string; // event
  m: string;  // domainSelection
  b?: string; // singleBackendAD
}

export interface FssTaskOptionsLdapParam {
  t: any; // taskMode {on|off}
}

export interface FssServiceOptionsLdapParam {
  t?: string; // task
  a: string;  // address
  P: string;  // port
  s: string;  // security
  b: string;  // baseDN
  r: string;  // rootDN
  p: string;  // password
  h?: string; // homeDirectory
  S?: string; // sourcePath
  q?: string; // quota
  e?: string; // event
}

export interface FssServiceStartParam {
  protocal: string;
}

export interface FssServiceStopParam {
  protocal: string;
}

export interface FssScheduleCreateParam {
  c?: string;   // sourceType {rr|av|defrag}
  n?: string;   // scheduleName
  s?: string;  // sourceTask
  t: string;   // scheduleFrequencyType {once|every|daily|weekly|monthly}
  d: string;   // day
  p?: string;   // period
  E?: string;   // enableEndDate {on|off}
  sd: string;  // startDate
  T: string;   // startTime
  ed?: string;  // endDate
  et?: string;  // endTime
  du?: number; // duration
}

export interface FssScheduleRRCreateParam {
  A: string;  // data transfer channel
  D: string;  // rsync target path
  E: string;  // enableEndTime {on|off}
  P: number;  // target port
  R: string;  // duplicateACL {on|off}
  T: string;  // start time
  a: string;  // target ip
  c: string;  // compressFile {on|off}
  d?: string;  // repeatly day of weekly & monthly
  e: string;  // security {on|off}
  ed: string; // end date
  et: string; // end time
  n: string;  // schedule name
  pw: string; // target user password
  r: string;  // deleteOther {on|off}
  s: string;  // handleSparse {on|off}
  sd: string; // start date
  sf: string; // source folder path
  st: string; // targetType {nas|rsync}
  t: string;  // repeat frequency {once|every|daily|weekly|monthly}
  tp: string; // source type {single|all(current not use)|home(current not use)}
  u: string;  // target user
  p?: string; // {10m|20m|30m|01h|03h|06h|12h}
}

export interface FssScheduleOptionsParam {
  schedule_name: string; // scheduleName
  s?: string;            // sourceTask
  t?: string;            // scheduleFrequencyType {once|every|daily|weekly|monthly}
  d?: string;            // day
  p?: string;            // period
  sd: string;            // startDate
  T: string;             // startTime
  n?: string;            // new schedule name
  E?: string;            // enableEndTime {on|off}
  ed?: string;           // end date
  et?: string;           // end time
  du?: number;           // duration
}

export interface FssScheduleDeleteParam {
  schedule_name: string; // scheduleName
}

export interface FssCsDeviceDefragAbortParam {
  c: string;   // cluster name
}

export interface FssServiceStopOrStart {
  protocal: string;
}

export interface FssServiceOptionForNFS {
  v?: string;
  d?: string;
  a?: string;
  c?: string;
}

export interface FssServiceOptionForCIFS {
  w: string;
  p: string;
  s: string;
  i: string;
  l: string;
  n: string;
  m?: string;
}

export interface FssServiceOptionForAFP {
  n: string;
  m: string;
  p: string;
}

export interface FssServiceOptionForFTP {
  P: string;
  l: string;
  d: string;
  s: string;
  e?: string;
  u?: string;
  f?: string;
  p?: string;
}

export interface FssServiceOptionForRysncd {
  P?: string;
  u?: string;
  p?: string;
  a?: string;
  d?: string;
}

export interface FssServiceOptionForNis {
  d?: string;
  a?: string;
}

export interface FssProjectServerStatusParam {
  status: string;
}

export interface FssProjectServerConfigParam {
  status: string;
  f: string;
  a: string;
}

export interface FssDockerStatusParam {
  status: string;
}

export interface FssCsLocalNtpParam {
  opt?: string;
  slot?: string;
}

export interface FssCsGatewayCheckdbtaskParam {
  p?: string;
  f?: string;
}

export interface FssPoolImportParam {
  poolname: string;
  assign: string;
  a?: string;
}

export interface FssConfigRahParam {
  s?: string;
}

export interface FssDiskFlushParam {
  t?: string;
}

// tslint:disable-next-line: no-empty-interface
export interface FssNvidiaInfo { }

export interface FssHostNameParam {
  name: string;
  controller: string;
}

export interface FssWormGclkParam {
  i?: string;
  g?: string;
  s?: string;
}

export interface FssWormSetParam {
  v?: string;
  m?: string;
  r?: number;
  a?: string;
}

export interface FssFolderNtaclParam {
  poolname?: string;
  volumename?: string;
  e?: string;
}
export interface FssFolderCreateParam {
  folder_path: string;
}
export interface FssAdvLogSearchXferlogParam {
  p: string;
  n: string;
  st: any;
  et: any;
  proto: any;
  act: any;
  S: string;
  D: string;
  logic: string;
  ip?: any;
  u?: any;
  f?: any;
}

export interface FssSetDefaultRouteRedundantParam {
  controller: string;
  i: string;
}

export interface FssRouteSetDefault {
  controller: string;
  i: string;
}

export interface FssSetChannelMtuParam {
  controller: string;
  interf: string;
  mtu: string;
  interface?: string;
}

export interface FssSetChanneliNetParam {
  controller: string;
  chNum: string;
  policy: string;
  ip: string;
  netmask: string;
  gateway: string;
  interface?: string;
}

export interface FssSetChannelIPv6iNetParam {
  controller: string;
  chNum: string;
  policy: string;
  v6ip?: string;
  prefix?: string;
  route?: string;
  interface?: string;
}

export interface FssRouteAddParam {
  n: string;
  m: string;
  g: string;
  i: string;
}

export interface FssRouteDeleteParam {
  n: string;
  m: string;
  g: string;
  i: string;
}

export interface FssRouteAddRedundantParam {
  controller: string;
  n: string;
  m: string;
  g: string;
  i: string;
}
export interface FssRouteDeleteRedundantParam {
  controller: string;
  n: string;
  m: string;
  g: string;
  i: string;
}

export interface FssTrunkAddParam {
  n: string;
  m: string;
  b?: string; // '4': LACP, '6': ALB
}

export interface FssTrunkDeleteParam {
  n: string;
  m: string;
}

export interface FssDoDefragParam {
  type: string;
  behavior: string;
  v?: string;
  t?: string;
}

export interface FssThresholdParam {
  p: string;
  v: string;
  t: number;
  d: string;
  type: string;
  i?: string;
}

export interface DeleteThresholdParam {
  p: string;
  v: string;
  i: string;
}

export interface FssDiskExpandParam {
  disk_id: string;
}

export interface FssFolderOptionsParam {
  poolname?: string;
  foldername?: string;
  r?: string;
  n?: string;
  m?: string;
  a?: string;
  c?: string;
  d?: string;
  e?: string;
  k?: string;
  x?: string;
}

export interface FssTerminateShowParam {
  c: string;
}

export interface FssTerminateAddParam {
  a: string;
  h: string;
  m: string;
  c: string;
  u: number;
}

export interface FssTerminateListParam {
  c: string;
}

export interface FssTerminateDelParam {
  a: string;
  c: string;
}

export interface FssK8sCsiClientAddParam {
  i: string;
  u: string;
  p: string;
  r: string;
}

export interface FssK8sCsiClientDeleteParam {
  i: string;
  r: string;
}

export interface FssK8sCsiScApplyParam {
  d: string;
  r?: string;
  dt?: string;
  i?: string;
  p?: string;
  n?: string;
  id?: string;
}

export interface FssK8sCsiScDeleteParam {
  n: string;
}

export interface k8sApiDeployAppserverParam {
  address: string;
  port: string;
}

export interface setBmcIpParam {
  ip: string;
}

export interface setBmcPolicyParam {
  policy: string;
}

export interface setBmcMaskParam {
  mask: string;
}

export interface setBmcGatewayParam {
  gateway: string;
}

/**
 * @param mode trigger by, ex:UI、deploy、daily task
 */
export interface syncBmcTimeSettingsParam {
  mode: string;
  devID: string;
}

/**
 * @param option 'now' or 'MM/dd/YYYY HH:mm:ss' example:'03/25/2024 18:00:00'
 */
export interface setBmcTimeParam {
  option: string;
}
/**
 * @param iana convert timezone name (iana) to hex string,
 * example: 'Asia/Taipei' => '0x41 0x73 0x69 0x61 0x2f 0x54 0x61 0x69 0x70 0x65 0x69'
 */
/**
 * @param option 1: first ntp, 2: second ntp, 3:ntp status, 4: restart ntp service
 * @param data
 * if option equals 1 or 2, data len = 253byte + 2 byte of null char (\0h)
 * if option equals 3, data len = 1, 0x1 set Enable, 0x0 set disable.
 */
export interface setBmcNtpParam {
  option: string;
  data: string;
}

export interface k8sApiDeployNotificationParam {
  server: string;
  port: string;
  sender: string;
  receiver: string;
  account: string;
  password: string;
}

export interface FolderAttrSetParam {
  d: string;
  p: string;
  slot: string;
}

export interface FssFileClusterMasterNtpParam {
  a: string;
}

export interface updateTimeNTP {
  n: string
}

export interface CreateLvmParam {
  device_id_list: string;
  name: string;
  raid_level: string;
  size: number;
  file_system: string;
  ci_option?: string;
  compress_type?: string;
  pv_size: string;
  csi_folder_path: string;
  pv_description?: string;
  pv_access_modes?: string;
}

export interface ExpandLvmParam {
  uuid: string;
  size: number;
}

export interface K8sCreatePvParam {
  name: string;
  size?: string;
  csi_folder_path: string;
  pv_description?: string;
  pv_access_modes?: string;
  sc_name?: string;
  sc_dedupe?: string;
  sc_compress?: string;
  sc_snapshot?: string;
  sc_replica?: string;
  sc_drive_type?: string;
  sc_raid_level?: string;
}

export interface FssDiskFlashParam {
  disk_slot_list: string;
}

export interface DeployLbsParam {
  start: string;
  end: string;
}

export interface DeployDnsParam {
  domain: string;
  start: string;
  DNS: string;

}

export interface K8sStorageDiskAddParam {
  device_id: string;
  disk_slot_list: string;
}

export interface K8sEditPvParam {
  name: string;
  size: string;
}

export interface SystemSanitizeParam {
  reboot?: string;
}

export interface DefaultRestoreParam {
  reboot?: string;
}

export interface FssDiskpoolRemovemissingParam {
  device_id: string;
  remove_type: string;
}

export interface FssNvmeDisconnectParam {
  disk_sn_list?: string;
  unique_id?: string
}

export interface K8sNodeSetScmgmtIpParam {
  scmgmtIp: string;
}

export interface FssGSxFSCreateParam {
  fsName: string;
  createSize: string;
  stripeSize?: string;
  device: {
    deviceId: string;
    controller: string;
    size: string,
  }[];
  fsType: string;
  protection: string;
  threshold: string;
  caseInsensitive: boolean;
}
export interface FssGSxFSFolderCreateParam {
  p: string;// path
  slot?: string;
}
export interface ActiveLVMParam {
  name: string;
  devId: string;
  uuid: string;
  force: string;
}

export interface ShowExternalStorageParam {
  ip: string;
  uid: string;
}

export interface openFileExplorerParam {
  deviceId: string;
  path: string;
}
