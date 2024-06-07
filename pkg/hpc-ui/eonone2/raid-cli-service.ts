import { RaidCliCmd, ParallelCommand, ParallelCLISeverity } from './interface/raid-cli-cmd';
import { TextToolService } from './utility/text-tool.service';
import * as fssCmd from './interface/cmd-param-fss';
import * as raidCmd from './interface/cmd-param-raid';

export function newRaidCmd(devID:string, refReturn:any, refParam:any): RaidCliCmd {
  return { devID, refReturn, refParam };
}

export class RaidCliService {
  constructor() {}

  /*
  # scheduleRR create
  #   <-tp {all|home|single}>
  #   <-sf source_folder>
  #   <-st {nas|rsync}>
  #   [-e on|off]
  #   <-a target_IP>
  #   [-P port]
  #   <-u username>
  #   <-pw password>
  #   <-D destination>
  #   [-c on|off]
  #   [-N on|off]
  #   [-R on|off]
  #   [-s on|off]
  #   [-n new_schedule_name]
  #   [-t {daily|weekly|monthly}]
  #   [-d day [day...]]
  #   [-m month [month...] ]
  #   [-T start_time]
  #   [-mo modifier]
  #   [-sd start_date]
  #   [-ed end_date]
  #   [-r {on -p period {-et end_time |-du duration} | off}]
  scheduleRRCreate=scheduleRR create [-tp:tp] [-sf:sf] [-st:st] [-e:e] [-a:a] [-P:P] [-u:u] [-pw:pw] [-D:D] [-c:c] [-N:N] [-R:R] [-s:s] [-n:n] [-t:t] [-d:d] [-m:m] [-T:T] [-mo:mo] [-sd:sd] [-ed:ed] [-r:r] [-p:p] [-et:et] [-du:du]
  */
  static fssScheduleRRCreate(raidCliCmd: RaidCliCmd, param: fssCmd.FssScheduleRRCreateParam): RaidCliCmd {
    raidCliCmd.key = 'fssScheduleRRCreate';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // //oss keygen <-u username> <-i uid>
  // function fssOssKeyGen(devID, _refRetunArr, _refParmArr,userName,userId){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssOssKeyGen';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['u'] = userName;
  //     param['i'] = userId;

  //     return cmd;
  // }
  // //oss keydel <-u username> <-a access_key><-i uid>
  // function fssOssKeyDel(devID, _refRetunArr, _refParmArr,userName,access_key,userId){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssOssKeyDel';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['u'] = userName;
  //     param['a'] = access_key;
  //     param['i'] = userId;

  //     return cmd;
  // }



  // /*pwrsche add <-z {a|b}@serviceID> <-c {on|off|reboot}> <-d day1[,day2??�]> <-t hh:mm>*/
  // function fssPwrscheAdd(devID, _refRetunArr, _refParmArr, task, dates, time){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssPwrscheAdd';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['c'] = task;
  //     param['d'] = dates;
  //     param['t'] = time;

  //     return cmd;
  // }
  // /*
  //   * pwrsche edit <-z {a|b}@serviceID> <-i obj_id> <-c {on|off|reboot}> <-d day1[,day2??�]> <-t hh:mm>
  //   * */
  // function fssPwrscheEdit(devID, _refRetunArr, _refParmArr, id, task, date, time){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssPwrscheEdit';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['i'] = id;
  //     param['c'] = task;
  //     param['d'] = date;
  //     param['t'] = time;

  //     return cmd;
  // }
  // /*pwrsche del <-z {a|b}@serviceID> <-i obj_id1[,obj_id2??�]>*/
  // function fssPwrscheDel(devID, _refRetunArr, _refParmArr, id){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssPwrscheDel';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['i'] = id;

  //     return cmd;
  // }
  // /*wol set <-z {a|b}@serviceID> <-s {on|off}>*/
  // function fssSetWOL(devID, _refRetunArr, _refParmArr, onoff){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssWolSet';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['s'] = onoff;

  //     return cmd;
  // }

  // function setHostWOL(devID, _refRetunArr, _refParmArr, switchOption){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setHostWOL';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['wake-on-lan'] = switchOption;

  //     return cmd;
  // }
  // /*
  //   * replicate create
  //   *  source_folder
  //   *  <-T {nas|rsync}>
  //   *  [-e on|off]
  //   *  <-a target_IP>
  //   *  [-P port]
  //   *  <-u username>
  //   *  <-p password>
  //   *  <-D destination>
  //   *  [-c on|off]
  //   *  [-n on|off]
  //   *  [-r on|off]
  //   *  [-s on|off]
  //   *  [-d {daily| mon| tue| wed| thu| fri| sat| sun}]
  //   *  [-t hhmm]
  //   *  remoteReplicate=replicate create [source_folder] [-T:T] [-e:e] [-a:a] [-P:P] [-u:u] [-p:p] [-D:D] [-c:c] [-n:n] [-r:r] [-s:s] [-d:d] [-t:t] [-l:l]
  // */
  // function fssReplicateCreate(devID, _refRetunArr, _refParmArr, sourceIP, sourceFolder, targetType, security, ip, port, userName, password, directory, compress, network, deleteFolder, sparse, acl, pairName) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssReplicateCreate';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['A'] = sourceIP;
  //     param['source_folder'] = "\"" + sourceFolder.replace(/\"/gi, '\\\"') + "\"";
  //     param['T'] = targetType;
  //     param['e'] = security;
  //     param['a'] = ip;
  //     param['P'] = port;
  //     param['u'] = "\"" + userName.replace(/\"/gi, '\\\"') + "\"";
  //     param['p'] = "\"" + password.replace(/\"/gi, '\\\"') + "\"";
  //     param['D'] = "\"" + directory.replace(/\"/gi, '\\\"') + "\"";
  //     param['c'] = compress;
  //     param['n'] = network;
  //     param['r'] = deleteFolder;
  //     param['s'] = sparse;
  //     param['R'] = acl;
  //     param['pn'] = "\"" + pairName.replace(/\"/gi, '\\\"') + "\"";

  //     return cmd;
  // }

  // /*replicate start [taskname]
  //   *
  //   *
  //   *
  //   */
  // function fssReplicateStart(devID, _refRetunArr, _refParmArr, taskName) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssReplicateStart';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(taskName){
  //         param['taskname'] = taskName;
  //     }

  //     return cmd;
  // }

  // /*replicate stop [taskname]
  //   *
  //   *
  //   *
  //   */
  // function fssReplicateStop(devID, _refRetunArr, _refParmArr, taskName) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssReplicateStop';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(taskName){
  //         param['taskname'] = taskName;
  //     }

  //     return cmd;
  // }

  // /*replicate options taskname [-A channel_ctrl][-f source_folder] [-e on|off] [-a IP] [-P port]
  //                 [-u username] [{-p password | -p=???password???}]
  //                 [-D destination] [-c on|off]
  //                 [-R {on|off}]
  //                 [-pn newPairName]
  //                 [-n on|off] [-r on|off] [-s on|off] <-z {a|b}@serviceID>*/

  // function fssReplicateOptions(devID, _refRetunArr, _refParmArr, taskName, channel, sourceFolder, encryption, ip, port, userName, password, directory, compress, acl, pairName, network, deleteFolder, sparse) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssReplicateOptions';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['taskname'] = taskName;
  //     if(channel) {
  //         param['A'] = channel;
  //     } else { // for auto
  //         param['A'] = "None";
  //     }
  //     param['f'] = "\"" + sourceFolder.replace(/\"/gi, '\\\"') + "\"";
  //     param['e'] = encryption;
  //     param['a'] = ip;
  //     param['P'] = port;
  //     if(userName) {
  //         param['u'] = "\"" + userName.replace(/\"/gi, '\\\"') + "\"";
  //     }
  //     if(password) {
  //         param['p'] = "\"" + password.replace(/\"/gi, '\\\"') + "\"";
  //     }
  //     param['D'] = "\"" + directory.replace(/\"/gi, '\\\"') + "\"";
  //     param['c'] = compress;
  //     param['R'] = acl;
  //     param['pn'] = "\"" + pairName.replace(/\"/gi, '\\\"') + "\"";
  //     if(network) {
  //         param['n'] = network;
  //     }
  //     param['r'] = deleteFolder;
  //     param['s'] = sparse;

  //     return cmd;
  // }

  /**
   * {LV-ID}=create lv [LD-index-list] [name] [assign={assign-to}] [write={write-policy}] [tier={tier-level-list}]
   * @raidCliCmd refReturn allows LV-ID. refParam allows LD-index-list
   */
  static createLV(raidCliCmd: RaidCliCmd, param: raidCmd.CreateLVParam): RaidCliCmd {
    raidCliCmd.key = 'createLV';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  // # delete lv [LV-ID] [-y]
  // deleteLV=delete lv [LV-ID] [-y:y] #LogicalVolume
  //   */
  // function deleteLV(devID, _refRetunArr, _refParmArr, lvID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'deleteLV';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['LV-ID'] = lvID;
  //     param['y'] = '';

  //     return cmd;
  // }

  // /**
  //  * # set lv [LV-ID] [name={LV-name}] [assign={assign-to}] [write={write-policy}]
  //  * setLV=set lv [LV-ID] [name:name] [assign:assign] [write:write]
  //  *
  //  *
  //  */
  static setLV(raidCliCmd: RaidCliCmd, param: raidCmd.SetLVParam): RaidCliCmd {
    raidCliCmd.key = 'setLv';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //  * # set lv add [LV-ID] [LD-index-list] [tier={tier-level-list}]
  //  */
  static setLvAdd(raidCliCmd: RaidCliCmd, param: raidCmd.SetLvAddParam): RaidCliCmd {
    raidCliCmd.key = 'setLvAdd';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //  * # set lv multi-tier [LV-ID] {LD-index-list} {tier-level-list}
  //  */
  static setLvMultiTier(raidCliCmd: RaidCliCmd, param: raidCmd.SetLvMultiTierParam): RaidCliCmd {
    raidCliCmd.key = 'setLvMultiTier';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //  * # set ups [status] [ip=ip] [community=community] #ups
  //  *
  //  *
  //  *
  //  */
  // function setUPS(devID, status, ip, community) {
  //     var cmd = {};
  //     var param = {};

  //     cmd.key = 'setUPS';
  //     cmd.devID = devID;
  //     cmd.param = param;

  //     param['status'] = status;
  //     param['ip'] = ip;
  //     param['community'] = community;

  //     return cmd;

  // }

  // /**
  //  * # set lv tier-disable [LV-ID]
  //  */
  static setLvTierDisable(raidCliCmd: RaidCliCmd, param: raidCmd.SetLvTierDisableParam): RaidCliCmd {
    raidCliCmd.key = 'setLvTierDisable';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //  * # create lv threshold [lv-ID] [rules]  (rules=percent,policyCode)
  //  * # set    lv threshold [lv-ID] [-m] [rules] (rules=index,percent,policyCode)
  //  */
  static addEditPoolThreshold(raidCliCmd: RaidCliCmd, param: raidCmd.AddEditPoolThresholdParam): RaidCliCmd {
    if (param.isEdit) {
      raidCliCmd.key = 'setLvThreshold';
    }
    else {
      raidCliCmd.key = 'createLvThreshold';
    }
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //  * # delete lv threshold [lv-ID] [index]
  //  */
  static deletePoolThreshold(raidCliCmd: RaidCliCmd, param: raidCmd.DeletePoolThresholdParam): RaidCliCmd {
    raidCliCmd.key = 'deleteLvThreshold';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  // /**
  //  * # set lv expand [LV-ID] [size={expand-size}]
  //  */
  static setLvExpand(raidCliCmd: RaidCliCmd, param: raidCmd.SetLvExpandParam): RaidCliCmd {
    raidCliCmd.key = 'setLvExpand';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * {LD-ID}=create ld [RAID-level] [disk-list] [assign={assign-to}] [size={allocated-disk-capacity}] [stripe={stripe-size}]
   * [mode={value}] [name={LD-alias-name}] [write={write-policy}] [-y]
   *
   * @raidCliCmd refReturn allows LD and LD-ID
   */
  static createLD(raidCliCmd: RaidCliCmd, param: raidCmd.CreateLDParam): RaidCliCmd {
    raidCliCmd.key = 'createLD';
    raidCliCmd.param = param;
    param.name = '"' + param.name + '"';
    return raidCliCmd;
  }

  // /**
  // # delete ld [index-list] [-y]
  // deleteLD=delete ld [index-list] [-y:y] #LogicalDrive
  // Parameter:
  //     idxList: array
  //   */
  static deleteLD(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteLDParam): RaidCliCmd {
    raidCliCmd.key = 'deleteLD';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * {Partition-ID}=create part [LV-ID] [name] [size=size] [min=min] [init=init] [tier=tier] [cloudmode=cloudmode] [fullcache=fullcache]
   * [cloudperiod=cloudperiod] [enableFileSystem] [alias=alias] [cga] [-f:f] [impartial=impartial] [-d:d] [threshold=threshold]
   * [iofirst=iofirst] [clouddedup=clouddedup] [compression=compression] [cloudthreshold=cloudthreshold] [dedupduration=dedupduration]
   * [dedupstarttimedayofweek=dedupstarttimedayofweek] [dedupstarttimehoursminute=dedupstarttimehoursminute] [-k:k] [category=category]
   * [csDriveType=csDriveType] [bgJob=bgJob]
   *
   * @raidCliCmd refRetun allows Part-ID. refParm allows LV-ID
   */
  static createPart(raidCliCmd: RaidCliCmd, param: raidCmd.CreatePartParam): RaidCliCmd {
    raidCliCmd.key = 'createPart';
    raidCliCmd.param = param;
    if (param.enableFileSystem === 'enable') {
      param.enableFileSystem = '-e';
    } else if (param.enableFileSystem === 'target') {
      param.enableFileSystem = '-t';
    } else {
      param.enableFileSystem = '';
    }

    if (!param.enableFileSystem || !param.fs) { param.fs = undefined; }
    if (!param.enableFileSystem || !param.compressionalgorithm) { param.compressionalgorithm = undefined; }

    if (param.cga === 'enable') {
      param.cga = '-c';
    }
    if (param.isDockerType) {
      param.k = '';
    }
    if (param.caseInsensitive) {
      param.ci = param.caseInsensitive;
    }
    return raidCliCmd;
  }

  static showCloudStorageGatewayHistory(raidCliCmd: RaidCliCmd, param: raidCmd.ShowCloudStorageGatewayHistoryParam): RaidCliCmd {
    raidCliCmd.key = 'showCloudStorageGatewayHistory';
    raidCliCmd.param = param;
    raidCliCmd.showArray = 'true';
    return raidCliCmd;
  }

  /**
   * # set part [partition-ID] [name={partition-name}] [min={minimal-reserve-size}] [cloudcache={switch}]
   * setPart=set part [partition-ID] [name=name] [min=min] [cloudcache=cloudcache] #Partition
   *
   */
  static setPart(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartParam): RaidCliCmd {
    raidCliCmd.key = 'setPart';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  // //        part cloud volumeID bucketID [cloudmode=cloudmode] [cloudperiod=cloudperiod] [iofirst=iofirst] [clouddedup=clouddedup] [cloudthreshold=cloudthreshold] [-up] [-ur] [-f] [-forceset]
  // function setPartCloud(devID, vvID, refRetunArr, refParmArr, cloudmode, cloudperiod, iofirst, clouddedup, cloudThreshold, isUserPause, isUserResume, doFullRestore, forceSet, bucketID, isDR, needReturnInfo, Enc, EncKey, Comp, cloudSchedule) {
  //     var cmd = {};
  //     var param = {};
  //     var refParam = {};
  //     var refReturn = {};

  //     cmd.key = 'setPartCloud';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refParam = refParam;
  //     cmd.refReturn = refReturn;

  //     if (vvID) {
  //         param['partition-ID'] = vvID;
  //     }

  //     if (bucketID) {
  //         param['bucket-ID'] = bucketID;
  //     }

  //     if (cloudmode) {
  //         param['cloudmode'] = cloudmode;
  //     }

  //     if(iofirst){
  //         param['iofirst'] = iofirst;
  //     }

  //     if(clouddedup){
  //         param['clouddedup'] = clouddedup;
  //     }

  //     if (cloudperiod){
  //         param['cloudperiod'] = cloudperiod;
  //     }

  //     if (cloudThreshold){
  //         param['cloudthreshold'] = cloudThreshold;
  //     }

  //     if (isUserPause){
  //         param['up'] = "";
  //     }

  //     if (isUserResume){
  //         param['ur'] = "";
  //     }

  //     if (doFullRestore){
  //         param['f'] = "";
  //     }

  //     if (forceSet){
  //         param['forceset'] = "";
  //     }

  //     if (isDR) {
  //         param['isdr'] = "";
  //     }

  //     if (needReturnInfo) {
  //         param['needreturninfo'] = "";
  //     }

  //     if (Enc){
  //         param['Enc'] = Enc;
  //     }

  //     if(EncKey) {
  //         param['Enc-Key'] = EncKey;
  //     }

  //     if (Comp) {
  //         param['Comp'] = Comp;
  //     }

  //     if (cloudSchedule) {
  //         param['cloudschedule'] = cloudSchedule;
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['partition-ID'] = refParmArr[0];
  //     }
  //     if (refParmArr && refParmArr.length > 0 && refParmArr[1]) {
  //         refParam['bucket-ID'] = refParmArr[1];
  //     }

  //     if (refRetunArr && refRetunArr.length > 0 && refRetunArr[0]) {
  //         refReturn['Partition-ID'] = refRetunArr[0];
  //     }

  //     return cmd;
  // }

  // //      delete part cloud [partition-ID] [-f:f] [-r] #Partition;CloudGateway;
  // function deletePartCloud(devID, vvID, refRetunArr, refParmArr, fullRestoreThenDisable, keepDataOnCloud) {
  //     var cmd = {};
  //     var param = {};
  //     var refParam = {};

  //     cmd.key = 'deletePartCloud';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refParam = refParam;

  //     if (vvID) {
  //         param['partition-ID'] = vvID;
  //     }


  //     if (fullRestoreThenDisable){
  //         param['f'] = "";
  //     }

  //     if (!keepDataOnCloud){
  //         param['r'] = "";
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['partition-ID'] = refParmArr[0];
  //     }

  //     if (refRetunArr && refRetunArr.length > 0 && refRetunArr[0]) {
  //         refParam['partition-ID'] = refRetunArr[0];
  //     }

  //     return cmd;
  // }

  /**
   * # set part tier-resided [partition-ID] [tier=tier]
   * setPartTierResided=set part tier-resided [partition-ID] [tier=tier]  #LogicalVolumeTier;LogicalVolume;Partition
   *
   */
  static setPartTierResided(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartTierResidedParam): RaidCliCmd {
    raidCliCmd.key = 'setPartTierResided';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // function cloudGatewayCreate(devID, refRetunArr, refParmArr, PoolID, ProviderID, AccessKey, SecretKey, Enc, EncKey, Comp, SSL, Server, Auth, Region, ProjectID, DR, bucketName, bucketInfo, bucketPassword, bucketEmail, bucketID, toDoClearBucket, isCSG, isCSBucket){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'cloudGatewayCreate';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if (PoolID) {
  //         param['Pool-ID'] = PoolID;
  //     }
  //     if (ProviderID) {
  //         param['Provider-ID'] = ProviderID;
  //     }
  //     if (AccessKey) {
  //         param['AccessKey'] = "\""+AccessKey+"\"";
  //     }
  //     if (SecretKey) {
  //         param['secretkey'] = "\""+SecretKey+"\"";
  //     }
  //     if (Enc){
  //         param['Enc'] = Enc;
  //     }
  //     if(Enc == 'enable' && EncKey)
  //         param['Enc-Key'] = EncKey;
  //     if (Comp) {
  //         param['Comp'] = Comp;
  //     }
  //     if (SSL) {
  //         param['SSL'] = SSL;
  //     }
  //     if (Server) {
  //         param['Server'] = Server;
  //     }
  //     if (Auth) {
  //         param['authcode'] = Auth;
  //     }
  //     if (Region!=null)
  //         param['Region'] = Region;

  //     if(ProjectID){
  //         param['projectid'] = "\""+ProjectID+"\"";
  //     }

  //     if(DR){
  //         param['DR'] = DR;
  //     }

  //     if(bucketName){
  //         param['bucketname'] = "\"" + bucketName + "\"";
  //     }

  //     if(bucketInfo){
  //         param['bucketinfo'] = "\"" + bucketInfo + "\"";
  //     }

  //     if(bucketPassword){
  //         param['bucketpassword'] = bucketPassword;
  //     }

  //     if(bucketEmail){
  //         param['bucketemail'] = bucketEmail;
  //     }

  //     if(bucketID){
  //         param['bucketid'] = bucketID;
  //     }

  //     if(toDoClearBucket){
  //         param['clr'] = "";
  //     }

  //     if(isCSG){
  //         param['iscsg'] = "";
  //     }

  //     if (isCSBucket) {
  //         param['iscsbucket'] = "";
  //     }

  //     if (refRetunArr && refRetunArr.length > 0 && refRetunArr[0]) {
  //         refReturn['Bucket-ID'] = refRetunArr[0];
  //     }
  //     if (refRetunArr && refRetunArr.length > 0 && refRetunArr[1]) {
  //         refReturn['Unique-ID'] = refRetunArr[1];
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['Pool-ID'] = refParmArr[0];
  //     }

  //     return cmd;
  // }

  // function cloudGatewaySet(devID, refRetunArr, refParmArr, PoolID, AccessKey, SecretKey, Enc, EncKey, Comp, SSL, Server, Auth, Region, ProjectID, isUserPause, isUserResume, bucketName, bucketInfo, newBucketPassword, bucketEmail, oriBucketPassword, passwordForceSet, isCSG){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'cloudGatewaySet';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if (PoolID) {
  //         param['Pool-ID'] = PoolID;
  //     }
  //     if (AccessKey) {
  //         param['accesskey'] = "\""+AccessKey+"\"";
  //     }
  //     if (SecretKey) {
  //         param['secretkey'] = "\""+SecretKey+"\"";
  //     }
  //     if (Enc){
  //         param['Enc'] = Enc;
  //     }
  //     if(EncKey) {
  //         param['Enc-Key'] = EncKey;
  //     }
  //     if (Comp) {
  //         param['Comp'] = Comp;
  //     }
  //     if (SSL) {
  //         param['SSL'] = SSL;
  //     }
  //     if (Server) {
  //         param['Server'] = Server;
  //     }
  //     if (Auth) {
  //         param['authcode'] = "\""+Auth+"\"";
  //     }
  //     if (Region){
  //         param['Region'] = Region;
  //     }
  //     if (ProjectID){
  //         param['projectid'] = "\""+ProjectID+"\"";
  //     }

  //     //            isUserPause, isUserResume, bucketName, bucketInfo, bucketPassword, bucketEmail
  //     if (isUserPause){
  //         param['up'] = "";
  //     }

  //     if (isUserResume){
  //         param['ur'] = "";
  //     }

  //     if (bucketName) {
  //         param['bucketname'] = "\"" + bucketName + "\"";
  //     }

  //     if (bucketInfo || bucketInfo=="") {
  //         param['bucketinfo'] = "\"" + bucketInfo + "\"";
  //     }

  //     if (newBucketPassword || newBucketPassword=="") {
  //         param['newbucketpassword'] = newBucketPassword;
  //     }

  //     if (oriBucketPassword || oriBucketPassword=="") {
  //         param['oribucketpassword'] = oriBucketPassword;
  //     }

  //     if (bucketEmail || bucketEmail=="") {
  //         param['bucketemail'] = bucketEmail;
  //     }

  //     if (passwordForceSet) {
  //         param['f'] = "";
  //     }

  //     if (isCSG) {
  //         param['iscsg'] = "";
  //     }

  //     if (refRetunArr && refRetunArr.length > 0 && refRetunArr[0]) {
  //         refReturn['Partition-ID'] = refRetunArr[0];
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['LV-ID'] = refParmArr[0];
  //     }

  //     return cmd;
  // }

  // //        # show cloudgateway bucket-list [Provider-ID] [Access-Key] [secretkey={key}] [authcode={key}] [projectid={key}] [Server={(IP/port)|(Endpoint/port)|(Node/port)|(Appid/port)}] [SSL={switch}] [Region={index}] [-l]
  // //        # ex: show cloudgateway bucket-list OpenStack_Swift_Storage test
  // //        cloudGateewayShowBucketList = show cloudgateway bucket-list [Provider-ID] [Access-Key] [secretkey=secretkey] [authcode=authcode] [projectid=projectid] [Server=Server] [ssl=ssl] [region=region] [-l:l]
  // function getCloudGatewayBucket(devID, _refRetunAr, _refParmArr, ProviderID, AccessKey, SecretKey, Auth, ProjectID, Server, SSL, Region, ignoreDetail, includeEmpty, bucketID, encCheck, encKey, isCSG, uniqueid){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'cloudGateewayShowBucketList';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.showArray = "true";

  //     param['Provider-ID'] = ProviderID;
  //     param['Access-Key'] = "\""+AccessKey+"\"";

  //     if (SecretKey) {
  //         param['secretkey'] = "\""+SecretKey+"\"";
  //     }
  //     if (Auth) {
  //         param['authcode'] = "\""+Auth+"\"";
  //     }
  //     if (ProjectID){
  //         param['projectid'] = "\""+ProjectID+"\"";
  //     }
  //     if (Server) {
  //         param['Server'] = Server;
  //     }
  //     if (SSL) {
  //         param['ssl'] = SSL;
  //     }
  //     if (Region){
  //         param['region'] = Region;
  //     }
  //     if (!ignoreDetail) {
  //         param['l'] = "";
  //     }
  //     if (includeEmpty) {
  //         param['all'] = "";
  //     }
  //     if (bucketID) {
  //         param['bucketid'] = bucketID;
  //     }
  //     if (encCheck) {
  //         param['e'] = "";
  //     }
  //     if (encKey){
  //         param['enckey'] = encKey;
  //     }
  //     if (isCSG) {
  //         param['iscsg'] = '';
  //     }
  //     if (uniqueid) {
  //         param['uniqueid'] = uniqueid;
  //     }



  //     //            if (refRetunArr && refRetunArr.length > 0 && refRetunArr[0]) {
  //     //                refReturn['Partition-ID'] = refRetunArr[0];
  //     //            }
  //     //
  //     //            if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //     //                refParam['LV-ID'] = refParmArr[0];
  //     //            }

  //     return cmd;
  // }

  // function showCloudgatewaySpeedTest(devID, _refRetunArr, _refParmArr, partID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'showCloudgatewaySpeedTest';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['pool-ID'] = partID;

  //     return cmd;
  // }

  // function showCloudgatewayLogin(devID, _refRetunArr, _refParmArr, poolID, password){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'showCloudgatewayLogin';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['pool-ID'] = poolID;
  //     param['password'] = password;

  //     return cmd;
  // }

  // function showCloudgatewayLogout(devID, _refRetunArr, _refParmArr, partID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'showCloudgatewayLogout';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['pool-ID'] = partID;

  //     return cmd;
  // }


  // // showCloudgatewayVerifyPassword = show cloudgateway verifypassword [bucketID] [password=password]
  // function showCloudgatewayVerifyPassword(devID, _refRetunArr, _refParmArr, bucketID, password) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'showCloudgatewayVerifyPassword';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['bucketID'] = bucketID;
  //     param['password'] = password;

  //     return cmd;
  // }

  // function setCloudgatewayResume(devID, _refRetunArr, _refParmArr, partID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setCloudgatewayResume';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['pool-ID'] = partID;

  //     return cmd;
  // }

  // //        # set cloudgateway convert
  // function cloudGatewaySetConvert(devID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'cloudGatewaySetConvert';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     return cmd;
  // }


  // //        # show dbflush [ip] [-l]
  // //        showDBFlush = show dbflush [ip] [-l:l]
  static getControllerDbFlushParameter(raidCliCmd: RaidCliCmd, param: raidCmd.DbFlushParam, isShowDBset: boolean): RaidCliCmd {
    raidCliCmd.key = 'showDBFlush';
    raidCliCmd.param = param;
    if (isShowDBset) {
      param.l = '';
      raidCliCmd.showArray = 'true';
    }
    return raidCliCmd;
  }

  // set dbflush [agentip] [clusterModel] [nodeip=nodeip] [cluster=cluster] [flushlog=flushlog]
  // [type=type] [ip=ip] [port=port] [name=name] [user=user] [pass=pass] [enable=Enable]
  static setDbFlushSetting(raidCliCmd: RaidCliCmd, param: raidCmd.SetDbFlushParam): RaidCliCmd {
    raidCliCmd.key = 'setDBFlush';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // set dbflush [agentip] [clusterModel] [nodeip=nodeip] [cluster=cluster]
  // [flushlog=flushlog] [type=type] [ip=ip] [port=port] [name=name] [user=user] [pass=pass] [enable=Enable]
  static showDBFlushTestInfo(raidCliCmd: RaidCliCmd, param: raidCmd.DbFlushParam): RaidCliCmd {
    raidCliCmd.key = 'showDBFlushTestInfo';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # delete full-pool [pool-ID] [-y]
  //   * deleteFullPool=delete full-pool [pool-ID] [-y:y] #Partition;LogicalVolume;Pair;HostLunMap;Snapshot
  //   */
  static deleteFullPool(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteFullPoolParam, callback?: (...val: any) => any): RaidCliCmd {
    raidCliCmd.key = 'deleteFullPool';
    raidCliCmd.param = param;
    param.y = '';

    if (callback) {
      callback();
    }
    return raidCliCmd;
  }

  // /**
  //   * # delete cloudgateway [pool-ID]  [-y]  [-f]  [-d] [-k]
  //   * deleteCloudGatewaySetting = delete cloudgateway [pool-ID] [-y:y] [-f:f] [-d:d] [-k:k] #LogicalVolume;CloudGateway
  //   */
  // function deleteCloudGatewaySetting(devID, _refRetunArr, _refParmArr, poolID, needFullRestore, keepDataOnCloud, isCSG) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'deleteCloudGatewaySetting';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['pool-ID'] = poolID;
  //     param['y'] = '';

  //     if(needFullRestore){
  //         param['f'] = '';
  //     }

  //     if(keepDataOnCloud){
  //         param['k'] = '';
  //     }

  //     if(isCSG){
  //         param['iscsg'] = '';
  //     }

  //     return cmd;
  // }

  // function nvidiaInfo(devID){
  //     var cmd = {};
  //     var param = {};

  //     cmd.key = 'fssNvidiaInfo';
  //     cmd.devID = devID;
  //     cmd.param = param;

  //     return cmd;
  // }

  static nvidiaInfo(raidCliCmd: RaidCliCmd, param: fssCmd.FssNvidiaInfo): RaidCliCmd {
    raidCliCmd.key = 'fssNvidiaInfo';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // function nvidiaMonitor(devID){
  //     var cmd = {};
  //     var param = {};

  //     cmd.key = 'fssNvidiaMonitor';
  //     cmd.devID = devID;
  //     cmd.param = param;

  //     return cmd;
  // }

  static terminateShow(raidCliCmd: RaidCliCmd, param: fssCmd.FssTerminateShowParam): RaidCliCmd {
    raidCliCmd.key = 'fssTerminateShow';
    raidCliCmd.param = param;
    raidCliCmd.showArray = 'true';
    return raidCliCmd;
  }

  static terminateList(raidCliCmd: RaidCliCmd, param: fssCmd.FssTerminateListParam): RaidCliCmd {
    raidCliCmd.key = 'fssTerminateList';
    raidCliCmd.param = param;
    raidCliCmd.showArray = 'true';
    return raidCliCmd;
  }

  static terminateAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssTerminateAddParam): RaidCliCmd {
    raidCliCmd.key = 'fssTerminateAdd';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static terminateDel(raidCliCmd: RaidCliCmd, param: fssCmd.FssTerminateDelParam): RaidCliCmd {
    raidCliCmd.key = 'fssTerminateDel';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # delete full-part [partition-ID] [-y]
  //   * deleteFullPart=delete full-part [partition-ID] [-y:y] #Partition;LogicalVolume;Pair;HostLunMap;Snapshot
  //   */
  static deleteFullPart(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteFullPartParam): RaidCliCmd {
    raidCliCmd.key = 'deleteFullPart';
    raidCliCmd.param = param;
    param.y = '';
    return raidCliCmd;
  }

  // /**
  //   * # delete part [partition-ID] [-y]
  //   * deletePart=delete part [partition-ID] [-y:y] #Partition
  //   */
  // function deletePart(devID, _refRetunArr, _refParmArr, partID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'deletePart';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['partition-ID'] = partID;
  //     param['y'] = '';

  //     return cmd;
  // }
  // /**
  //   * # set part expand [partition-ID] [size={expand-size}]
  //   * setPartExpand=set part expand [partition-ID] [size=size]
  //   */
  static setPartExpand(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartExpandParam): RaidCliCmd {
    raidCliCmd.key = 'setPartExpand';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # set part reclaim [partition-ID]
  //   * setPartReclaim=set part reclaim [partition-ID] #Partition
  //   */
  // function setPartReclaim(devID, _refRetunArr, _refParmArr, partID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setPartReclaim';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['partition-ID'] = partID;

  //     return cmd;
  // }

  // /**
  //   * # set part setPartReclaimForGS [partition-ID]
  //   * setPartReclaimForGS=set part setPartReclaimForGS [partition-ID] [priority=priority] [status] #Partition
  //   */
  static setPartReclaimForGS(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartReclaimForGSParam): RaidCliCmd {
    raidCliCmd.key = 'setPartReclaimForGS';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # set part purge [partition-ID] [number] [rule-type]
  //   * setPartPurge=set part purge [partition-ID] [number] [rule-type]
  //   */
  static setPartPurge(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartPurgeParam): RaidCliCmd {
    raidCliCmd.key = 'setPartPurge',
      raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # set part mount [partition-ID]
  //   * setPartMount=set part mount [partition-ID] #HostLunMap
  //   */
  static setPartMount(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartMountParam): RaidCliCmd {
    raidCliCmd.key = 'setPartMount',
      raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # set part unmount [partition-ID] [-y]
  //   * setPartUnmount=set part unmount [partition-ID] [-y:y] #HostLunMap
  //   */
  static setPartUnmount(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartMountParam): RaidCliCmd {
    raidCliCmd.key = 'setPartUnmount';
    raidCliCmd.param = param;
    raidCliCmd.param.y = '';
    return raidCliCmd;
  }

  // /**
  //     # create si part vitual-volume-ID [alias={ID}] [-i] [-f] [-c]
  //     createSI=create si [part] [partition-ID] [-c:c] #Snapshot
  //   */
  // function createSI(devID, refRetunArr, refParmArr, partID, alias, cloudSnapshotForFW, isFullRestore, isBackupToCloud, siName, siDescription, isReclaimAfterBackup) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'createSI';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['part'] = 'part';
  //     param['Partition-ID'] = partID;

  //     if(alias){
  //         param['alias'] = alias;
  //     }

  //     if(cloudSnapshotForFW){
  //         param['i'] = "";
  //     }

  //     if(isFullRestore){
  //         param['f'] = "";
  //     }

  //     if(isBackupToCloud){
  //         param['c'] = "";
  //     }

  //     if(siName){
  //         param['name'] = "\""+siName+"\"";
  //     }

  //     if(siDescription){
  //         param['desc'] = "\""+siDescription+"\"";
  //     }

  //     if(isReclaimAfterBackup){
  //         param['reclaim'] = isReclaimAfterBackup;
  //     }

  //     if (refRetunArr && refRetunArr.length > 0 && refRetunArr[0]) {
  //         refReturn['SI-ID'] = refRetunArr[0];
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['Partition-ID'] = refParmArr[0];
  //     }

  //     return cmd;
  // }


  /**
   * createMultiSI=createMultiSI si [part] [partition-IDs] [name=name] [desc=desc] #Snapshot
   *
   * @raidCliCmd refRetun allows 'SI-ID'. refParm allows 'Partition-IDs'.
   */
  static createMultiSI(raidCliCmd: RaidCliCmd, param: raidCmd.CreateMultiSIParam): RaidCliCmd {
    raidCliCmd.key = 'createMultiSI';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  /**
   * #set si [si-ID] [name="{si name}"}] [desc="{description}"] [-f] [-c]
   * setSI=set si [snapshot-image-ID] [name=name] [desc=desc] [-f:f]
   * [-c:c] #Snapshot
   *
   * @raidCliCmd refParm allows 'snapshot-image-ID'
   */
  static setSI(raidCliCmd: RaidCliCmd, param: raidCmd.SetSIParam): RaidCliCmd {
    raidCliCmd.key = 'setSI';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * # set si rollback [snapshot-image-ID] [-y]
   * setSIRollback=set si rollback [snapshot-image-ID] [-y:y]
   */
  static setSIRollback(raidCliCmd: RaidCliCmd, param: raidCmd.SetSIRollbackParam): RaidCliCmd {
    raidCliCmd.key = 'setSIRollback';
    raidCliCmd.param = param;
    raidCliCmd.param.y = '';
    return raidCliCmd;
  }

  /**
   * # set si mount [snapshot-image-ID]
   * setSIMount=set si mount [snapshot-image-ID] #HostLunMap;Snapshot
   */
  static setSIMount(raidCliCmd: RaidCliCmd, param: raidCmd.SetSIMountParam): RaidCliCmd {
    raidCliCmd.key = 'setSIMount';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * # set si unmount [snapshot-image-ID] [-y]
   * setSIUnmount=set si unmount [snapshot-image-ID] [-y:y] #HostLunMap
   */
  static setSIUnmount(raidCliCmd: RaidCliCmd, param: raidCmd.SetSIMountParam): RaidCliCmd {
    raidCliCmd.key = 'setSIUnmount';
    raidCliCmd.param = param;
    raidCliCmd.param.y = '';
    return raidCliCmd;
  }

  /**
   * # delete si [snapshot-image-ID] [-y]
   * deleteSI=delete si [snapshot-image-ID] [-y:y]
   */
  static deleteSI(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteSIParam): RaidCliCmd {
    raidCliCmd.key = 'deleteSI';
    raidCliCmd.param = param;
    raidCliCmd.param.y = '';
    return raidCliCmd;
  }


  static createMap(raidCliCmd: RaidCliCmd, param: raidCmd.CreateMapParam): RaidCliCmd {
    raidCliCmd.key = 'createMap';
    const mapSet = param['mapSet'];
    if (mapSet != null) {
      if (mapSet.chkboxCustomExtendSet) {
        if (param['customType'] == 'Fibre') {
          if (mapSet.groupSet[mapSet.CustomAlias] != null) {
            param['group'] = mapSet.CustomAlias;
          }
          else if (mapSet.hostIdList[mapSet.CustomAlias] != null) {
            param['wwn'] = mapSet.CustomAlias;
          }
          else {
            if (mapSet.CustomAlias.indexOf(' ') >= 0) {
              param['host'] = '\"' + mapSet.CustomAlias + '\"';
            }
            else {
              param['host'] = mapSet.CustomAlias;
            }
          }
          param['mask'] = mapSet.CustomMask;
        }
        else if (param['customType'] == 'ISCSI') {
          if (mapSet.groupSet[mapSet.CustomAlias] != null) {
            param['group'] = mapSet.CustomAlias;
          } else {
            if (mapSet.CustomAlias.indexOf(' ') >= 0) {
              param['host'] = '\"' + mapSet.CustomAlias + '\"';
            } else {
              param['host'] = mapSet.CustomAlias;
            }
          }
        }
        param['type'] = mapSet.CustomFilter;
        param['mode'] = mapSet.CustomAsscess;
      }
    }

    delete param['mapSet'];

    if (raidCliCmd['refParmArr'] && raidCliCmd['refParmArr'].length > 0 && raidCliCmd['refParmArr'][0]) {
      raidCliCmd['refParam']['partition-ID'] = raidCliCmd['refParmArr'][0];
    }

    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static createMapForAutoMap(raidCliCmd: RaidCliCmd, param: raidCmd.CreateMapForAutoMapParam): RaidCliCmd {
    raidCliCmd.key = 'createMapForAutoMap';
    const mapSet = param['mapSet'];
    if (mapSet != null) {
      if (mapSet.chkboxCustomExtendSet) {
        if (param['customType'] == 'Fibre') {
          if (mapSet.groupSet[mapSet.CustomAlias] != null) {
            param['group'] = mapSet.CustomAlias;
          } else if (mapSet.hostIdList[mapSet.CustomAlias] != null) {
            param['wwn'] = mapSet.CustomAlias;
          } else {
            if (mapSet.CustomAlias.indexOf(' ') >= 0) {
              param['host'] = '\"' + mapSet.CustomAlias + '\"';
            } else {
              param['host'] = mapSet.CustomAlias;
            }
          }
          param['mask'] = mapSet.CustomMask;
        } else if (param['customType'] == 'ISCSI') {
          if (mapSet.groupSet[mapSet.CustomAlias] != null) {
            param['group'] = mapSet.CustomAlias;
          } else {
            if (mapSet.CustomAlias.indexOf(' ') >= 0) {
              param['host'] = '\"' + mapSet.CustomAlias + '\"';
            } else {
              param['host'] = mapSet.CustomAlias;
            }
          }
        }
        param['type'] = mapSet.CustomFilter;
        param['mode'] = mapSet.CustomAsscess;
      }
    }
    if (param['isforAutoMap']) {
      param['mapset'] = param['isforAutoMap'];
    }

    if (raidCliCmd['refParmArr'] && raidCliCmd['refParmArr'].length > 0 && raidCliCmd['refParmArr'][0]) {
      raidCliCmd['refParam']['partition-ID'] = raidCliCmd['refParmArr'][0];
    }
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  // /**
  // * # create map [part] [partition-ID] [Channel-ID] [Target-ID] [LUN-ID]
  // *              [default={channel-type-and-speed}] // Default map
  // *              [assign={assign-to}] [wwn={host-wwn} | iqn={initiator-iqn} | host={alias-name} | group={group-name}]
  // *              [bootable={switch}] // extended lun
  // *              [mask={wwn-mask}] [type={filter-type}] [mode={access-mode}] [name={filter-name}] // filter
  // */
  // function createMap(devID, _refRetunArr, refParmArr, partOrSI, partID, chID, targetID, lunID, defMapType, customType, mapSet) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     var typeFibre = 'Fibre';
  //     var typeISCSI = 'ISCSI';
  //     cmd.key = 'createMap';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['part'] = partOrSI;

  //     if(partID!=null) {
  //         param['partition-ID'] = partID;
  //     }

  //     if(mapSet==null){
  //         param['default'] = defMapType;
  //     }else{
  //         if(chID!=null) {
  //             param['Channel-ID'] = chID;
  //         }
  //         if(targetID!=null) {
  //             param['Target-ID'] = targetID;
  //         }
  //         if(lunID!=null) {
  //             param['LUN-ID'] = lunID;
  //         } else {
  //             param['LUN-ID'] = 'auto';
  //         }

  //         // if(assign!=null) {
  //         //     param['assign'] = assign;
  //         // }

  //         if(mapSet.chkboxCustomExtendSet){
  //             if(customType==typeFibre){
  //                 if(mapSet.groupSet[mapSet.CustomAlias]!=null)
  //                 {
  //                     param['group'] = mapSet.CustomAlias;
  //                 }
  //                 else if( mapSet.hostIdList[mapSet.CustomAlias]!=null )
  //                     param['wwn'] = mapSet.CustomAlias;
  //                 else{
  //                     if(mapSet.CustomAlias.indexOf(' ') >= 0)
  //                         param['host'] = '\"' + mapSet.CustomAlias + '\"';
  //                     else
  //                         param['host'] = mapSet.CustomAlias;
  //                 }
  //                 param['mask'] = mapSet.CustomMask;
  //             }
  //             else if(customType==typeISCSI){
  //                 if(mapSet.groupSet[mapSet.CustomAlias]!=null)
  //                 {
  //                     param['group'] = mapSet.CustomAlias;
  //                 }
  //                 else{
  //                     if(mapSet.CustomAlias.indexOf(' ') >= 0)
  //                         param['host'] = '\"' + mapSet.CustomAlias + '\"';
  //                     else
  //                         param['host'] = mapSet.CustomAlias;
  //                 }
  //             }
  //             param['type'] = mapSet.CustomFilter;
  //             param['mode'] = mapSet.CustomAsscess;

  //             // if(bootable) {
  //             //  param['bootable'] = bootable;
  //             // }
  //         }
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['partition-ID'] = refParmArr[0];
  //     }

  //     return cmd;

  // }
  // /**
  //   * # create map [part] [partition-ID] [Channel-ID] [Target-ID] [LUN-ID]
  //   *              [default={channel-type-and-speed}] // Default map
  //   *              [assign={assign-to}] [wwn={host-wwn} | iqn={initiator-iqn} | host={alias-name}]
  //   *              [bootable={switch}] // extended lun
  //   *              [mask={wwn-mask}] [type={filter-type}] [mode={access-mode}] [name={filter-name}] // filter
  //   *              [mapset=mapset]
  //   */
  // function createMapForAutoMap(devID, _refRetunArr, refParmArr, partOrSI, partID, chID, targetID, lunID, defMapType, customType, mapSet, isforAutoMap) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     var typeFibre = 'Fibre';
  //     var typeISCSI = 'ISCSI';
  //     cmd.key = 'createMapForAutoMap';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['part'] = partOrSI;

  //     if(partID!=null) {
  //         param['partition-ID'] = partID;
  //     }

  //     if(mapSet==null){
  //         param['default'] = defMapType;
  //     }else{
  //         if(chID!=null) {
  //             param['Channel-ID'] = chID;
  //         }
  //         if(targetID!=null) {
  //             param['Target-ID'] = targetID;
  //         }
  //         if(lunID!=null) {
  //             param['LUN-ID'] = lunID;
  //         } else {
  //             param['LUN-ID'] = 'auto';
  //         }

  //         // if(assign!=null) {
  //         //     param['assign'] = assign;
  //         // }

  //         if(mapSet.chkboxCustomExtendSet){
  //             if(customType==typeFibre){
  //                 if(mapSet.groupSet[mapSet.CustomAlias]!=null)
  //                 {
  //                     param['group'] = mapSet.CustomAlias;
  //                 }
  //                 else if( mapSet.hostIdList[mapSet.CustomAlias]!=null ) {
  //                     param['wwn'] = mapSet.CustomAlias;
  //                 }
  //                 else{
  //                     if(mapSet.CustomAlias.indexOf(' ') >= 0) {
  //                         param['host'] = '\"' + mapSet.CustomAlias + '\"';
  //                     }
  //                     else {
  //                         param['host'] = mapSet.CustomAlias;
  //                     }
  //                 }
  //                 param['mask'] = mapSet.CustomMask;
  //             }
  //             else if(customType==typeISCSI){
  //                 if(mapSet.groupSet[mapSet.CustomAlias]!=null)
  //                 {
  //                     param['group'] = mapSet.CustomAlias;
  //                 }
  //                 else {
  //                     if(mapSet.CustomAlias.indexOf(' ') >= 0) {
  //                         param['host'] = '\"' + mapSet.CustomAlias + '\"';
  //                     }
  //                     else {
  //                         param['host'] = mapSet.CustomAlias;
  //                     }
  //                 }
  //             }
  //             param['type'] = mapSet.CustomFilter;
  //             param['mode'] = mapSet.CustomAsscess;

  //             // if(bootable) {
  //             //  param['bootable'] = bootable;
  //             // }
  //         }
  //     }

  //     if(isforAutoMap){
  //         param['mapset'] = isforAutoMap;
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['partition-ID'] = refParmArr[0];
  //     }

  //     return cmd;

  // }

  // /**
  //   * # delete map [part] [partition-ID] [Channel-ID] [Target-ID] [LUN-ID] [host-id=host-id] [-y]
  //   * deleteMap=delete map [part] [partition-ID] [Channel-ID] [Target-ID] [LUN-ID] [host-id=host-id] [-y:y]
  //   */

  static deleteMap(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteMapParam): RaidCliCmd {
    raidCliCmd.key = 'deleteMap';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static createIqn(raidCliCmd: RaidCliCmd, param: raidCmd.CreateIqnParam): RaidCliCmd {
    raidCliCmd.key = 'createIqn';
    param['IQN-alias-name'] = '"' + param['IQN-alias-name'] + '"';
    if (!param['ip']) {
      param['ip'] = "0.0.0.0";
    }
    if (!param['mask']) {
      param['mask'] = "255.255.255.0";
    }
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static setIqn(raidCliCmd: RaidCliCmd, param: raidCmd.SetIqnParam): RaidCliCmd {
    raidCliCmd.key = 'setIqn';
    if (param['name'] && param['oldName'] != param['name']) {
      param['name'] = '\"' + param['name'] + '\"';
    } else {
      delete param['name']
    }

    param['oldName'] = '\"' + param['oldName'] + '\"';

    if (param['user']) {
      param['user'] = (param['user'] != '\"\"') ? ('\"' + param['user'] + '\"') : param['user'];
    } else {
      delete param['user']
    }

    if (param['password']) {
      param['password'] = (param['password'] != '\"\"') ? ('\"' + param['password'] + '\"') : param['password'];
    } else {
      delete param['password']
    }

    if (param['target']) {
      param['target'] = (param['target'] != '\"\"') ? ('\"' + param['target'] + '\"') : param['target'];
    } else {
      delete param['target']
    }

    if (param['target-password']) {
      param['target-password'] = (param['target-password'] != '\"\"') ? ('\"' + param['target-password'] + '\"') : param['target-password'];;
    } else {
      delete param['target-password']
    }

    if (!param['ip']) {
      delete param['ip']
    }

    if (!param['mask']) {
      delete param['mask']
    }

    raidCliCmd.param = param;
    return raidCliCmd;
  }


  static setIqnGroup(raidCliCmd: RaidCliCmd, param: raidCmd.SetIqnGroupParam): RaidCliCmd {
    raidCliCmd.key = 'setIqnGroup';
    if (param['m'] === null) {
      delete param['m'];
    }
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static deleteIqn(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteIqnParam): RaidCliCmd {
    raidCliCmd.key = 'deleteIqn';
    if (param['name']) {
      if (param['name'].indexOf(' ') >= 0)
        param['name'] = '\"' + param['name'] + '\"';
    }
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // /**
  //   * # create wwn [WWN] [name]
  //   * createWwn=create wwn [WWN] [name]
  //   */
  static createWwn(raidCliCmd: RaidCliCmd, param: raidCmd.CreateWwnParam): RaidCliCmd {
    raidCliCmd.key = 'createWwn';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # set wwn [WWN] [new-alias-name]
  //   * setWwn = set wwn [WWN] [new-alias-name]
  //   */
  static setWwn(raidCliCmd: RaidCliCmd, param: raidCmd.SetWwnParam): RaidCliCmd {
    raidCliCmd.key = 'setWwn';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # set wwn group [option] [WWN] [group-name] -m
  //   *                   option = assign / unassign
  //   * setWwnGroup = set wwn group [option] [WWN] [group-name] [-m:m] #WWN;hostWWN
  //   */
  static setWwnGroup(raidCliCmd: RaidCliCmd, param: raidCmd.SetWwnGroupParam): RaidCliCmd {
    raidCliCmd.key = 'setWwnGroup';
    if (param['m'] === null) {
      delete param['m'];
    }
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # delete wwn [name]
  //   * deleteWwn=delete wwn [name]
  //   */
  static deleteWwn(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteWwnParam): RaidCliCmd {
    raidCliCmd.key = 'deleteWwn';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * setDiskSpare = set disk spare [disk-index] [type=type] [ld=ld]
   * @raidCliCmd refParam allows ld.
   */
  static setDiskSpare(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskSpareParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskSpare';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * setDiskSpareDelete = set disk spare [disk-index] [-d:d]
   */
  static setDiskSpareDelete(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskSpareDeleteParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskSpareDelete';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  /**
   * setSSDCacheAddDisk=set ssd-cache add [disk=disk] [-y:y]
   */
  static setSSDCacheAddDisk(raidCliCmd: RaidCliCmd, param: raidCmd.SetSSDCacheAddDiskParam): RaidCliCmd {
    raidCliCmd.key = 'setSSDCacheAddDisk';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  /**
   * setSSDCacheRemoveDisk=set ssd-cache remove [disk=disk] [-y:y]
   */
  static setSSDCacheRemoveDisk(raidCliCmd: RaidCliCmd, param: raidCmd.SetSSDCacheRemoveDiskParam): RaidCliCmd {
    raidCliCmd.key = 'setSSDCacheRemoveDisk';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * setSSDCacheService = set ssd-cache service [switch]
   */
  static setSSDCacheService(raidCliCmd: RaidCliCmd, param: raidCmd.SetSSDCacheServiceParam): RaidCliCmd {
    raidCliCmd.key = 'setSSDCacheService';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * showSSDCache = show ssd-cache
  //   */
  // function showSSDCache(devID) {
  //     var cmd = {};
  //     var param = {};

  //     cmd.key = 'showSSDCache';
  //     cmd.devID = devID;
  //     cmd.param = param;

  //     return cmd;
  // }

  // /**
  //   * setSSDSedEnable = set ssd-cache sed enable [password=password] [keyfile=keyfile]
  //   */
  // function setSSDSedEnable(devID, _refRetunArr, _refParmArr, password, keyfile)
  // {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'setSSDSedEnable';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (password && password.length != 0) {
  //         param['password'] = Tool.convertArrayToString(password, ',');
  //     }

  //     if (keyfile && keyfile.length != 0) {
  //         param['keyfile'] = Tool.convertArrayToString(keyfile, ',');
  //     }

  //     return cmd;

  // }

  // /**
  //   * setSSDSedDisable = set ssd-cache sed disable [password=password] [keyfile=keyfile]
  //   */
  // function setSSDSedDisable(devID, _refRetunArr, _refParmArr, password, keyfile)
  // {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'setSSDSedDisable';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (password && password.length != 0) {
  //         param['password'] = Tool.convertArrayToString(password, ',');
  //     }

  //     if (keyfile && keyfile.length != 0) {
  //         param['keyfile'] = Tool.convertArrayToString(keyfile, ',');
  //     }

  //     return cmd;

  // }

  // /**
  //   * setSSDSedUnlock = set ssd-cache sed unlock [password=password] [keyfile=keyfile]
  //   */
  // function setSSDSedUnlock(devID, _refRetunArr, _refParmArr, password, keyfile)
  // {

  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'setSSDSedUnlock';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (password && password.length != 0) {
  //         param['password'] = Tool.convertArrayToString(password, ',');
  //     }

  //     if (keyfile && keyfile.length != 0) {
  //         param['keyfile'] = Tool.convertArrayToString(keyfile, ',');
  //     }

  //     return cmd;

  // }

  /**
   *    setControllerDate = set controller date [yyyyMMdd] [hhmmss] [gmt=gmt]
   */
  static setControllerDate(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerDateParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerDate';
    raidCliCmd.param = param;

    return raidCliCmd;
  }
  // function setControllerDate(devID, _refRetunArr, _refParmArr, yyyyMMdd, hhmmss, gmt) {
  //     var cmd = {};
  //     var param = {};

  //     cmd.key = 'setControllerDate';
  //     cmd.devID = devID;
  //     cmd.param = param;

  //     if(yyyyMMdd) {
  //         param['yyyyMMdd'] = yyyyMMdd;
  //     }
  //     if(hhmmss) {
  //         param['hhmmss'] = hhmmss;
  //     }
  //     if(gmt) {
  //         param['gmt'] = gmt;
  //     }

  //     return cmd;
  // }

  /*
    *  setControllerTimezone = set controller timezone [value] [city=index]
    */
  static setControllerTimezone(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerTimezoneParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerTimezone';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  /**
   *  setControllerDaylight = set controller daylight-saving [startDate] [startTime] [end-date=endDate] [end-time=endTime] [offset=offset]
   */
  static setControllerDaylight(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerDaylightParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerDaylight';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  /**
   * reset controller [flush={switch}] [-y]
   */
  static resetController(raidCliCmd: RaidCliCmd, param: raidCmd.ResetControllerParam): RaidCliCmd {
    raidCliCmd.key = 'resetController';
    raidCliCmd.param = param;
    raidCliCmd.param.y = '';
    return raidCliCmd;
  }

  /**
  * #set restful [url=url] [body=body] [method=method] [ip=ip] [timeout=timeout]
  * @param url The segment of url without /cmd/api.
  * e.g. If we want to send to https://127.0.0.1:8817/cmd/api/cliJobREST/sendCLI,
  * the url parameter is /cliJobREST/sendCLI
  * @param body It's the data we want to put in the body of request.
  * @param method (Optional) It should be POST, GET, or PUT. Default value is POST.
  * @param ip (Optional) The IP we want to send request to. Default value is 127.0.0.1.
  * @param timeout (Optional) The timeout of restful request. Unit is seconds. Default value is 3600.
  */
  static setRestful(raidCliCmd: RaidCliCmd, param: raidCmd.SetRestfulParam): RaidCliCmd {
    raidCliCmd.key = 'restfulApiSend';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # k8s version get
  //   * fssK8sVersionGet=FSS k8s version get
  //   */
  static fssK8sVersionGet(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'fssK8sVersionGet';
    raidCliCmd.param = {};
    return raidCliCmd;
  }

  // /**
  //   * # docker proxy [-s]
  //   * fssDockerProxy=FSS docker proxy [-s:s] [-p:p]
  //   */
  static fssDockerProxy(raidCliCmd: RaidCliCmd, param: raidCmd.FSSDockerProxyParam): RaidCliCmd {
    raidCliCmd.key = 'fssDockerProxy';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # shutdown controller [-y]
  //   * shutdownController=shutdown controller [-y:y]
  //   */
  static shutdownController(raidCliCmd: RaidCliCmd, param: raidCmd.ShutdownControllerParam): RaidCliCmd {
    raidCliCmd.key = 'shutdownController';
    raidCliCmd.param = param;
    param.y = '';
    return raidCliCmd;
  }

  /**
   * system shutdown <-z {a|b}@serviceID>
   * fss system shutdown
   */
  static systemShutdown(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'fssSystemShutdown';
    return raidCliCmd;
  }

  /**
   * system reboot <-z {a|b}@serviceID>
   * fss system reboot
   */
  static systemReboot(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'fssSystemReboot';
    return raidCliCmd;
  }


  // /**
  //   * # shutdown poweroff [-y]
  //   * shutdownPoweroff=shutdown poweroff [-y:y]
  //   */
  static shutdownPoweroff(raidCliCmd: RaidCliCmd, param: raidCmd.ShutdownPoweroffParam): RaidCliCmd {
    raidCliCmd.key = 'shutdownPoweroff';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # shutdown controller [-y]
  //   * shutdownController=shutdown controller [-y:y]
  //   */
  // function shutdownControllerWithoutUpdateCache(devID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'shutdownControllerWithoutUpdateCache';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['y'] = '';

  //     return cmd;
  // }

  /**
   * # set controller default [-y] [-r]
   */
  static setControllerDefault(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerDefaultParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerDefault';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
    * # export config [filename] [-f | -l]
    * exportConfig=export config [filename] [-f:f] [-l:l]
    */
  static exportConfig(raidCliCmd: RaidCliCmd, param: raidCmd.ExportConfigParam): RaidCliCmd {
    raidCliCmd.key = 'ExportConfig';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static importConfig(raidCliCmd: RaidCliCmd, param: raidCmd.ImportConfigParam): RaidCliCmd {
    raidCliCmd.key = 'ImportConfig';
    raidCliCmd.param = param;
    return raidCliCmd;
  }



  /**
   * export support [filename] [1stline={switch}]
   * exportSupport=export support [filename] [1stline={switch}]
   * switch = enable / disable
   */
  static exportSupport(raidCliCmd: RaidCliCmd, param: raidCmd.ExportSupportParam): RaidCliCmd {
    raidCliCmd.key = 'ExportDiagnostic';
    if (param.filename) {
      param.filename += '-supportsysinfo';
    } else {
      param.filename = raidCliCmd.devID + '-supportsysinfo';
    }
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # export cloudHistory [type] [params=params]
  //   * exportCloudHistory=export cloudHistory [type] [params=params]
  //   */
  // function exportCloudHistory(devID, _refRetunArr, _refParmArr, param) {
  //     var paramArray = [], params = param.params;
  //     for (var idx in params) {
  //         if (params[idx]) {
  //             paramArray.push('{0}={1}'.format(idx, params[idx]));
  //         }
  //     }
  //     return {
  //         key: 'exportCloudHistory',
  //         devID: devID,
  //         param: raidCmd.{
  //             type: param.type,
  //             params: paramArray.map(function(item) {
  //                 return Utility.encodeBase64(item);
  //             }).join(',')
  //         },
  //         refReturn: {},
  //         refParam: {}
  //     };
  // }

  /**
   * export coredump [filename]
   * ExportCoreDump=export coredump [filename]
   */
  static exportCoreDump(raidCliCmd: RaidCliCmd, param: raidCmd.ExportCoreDumpParam): RaidCliCmd {
    raidCliCmd.key = 'ExportCoredump';
    param.filename = (param.filename) ? TextToolService.format('{0}', param.filename) : raidCliCmd.devID + '_support';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  // # update fw [filename] [-y] [-u | -r]
  // updateFW=update fw [filename] [-y:y] [-u:u] [-r:r] [-c:c]
  //   */
  static updateFW(raidCliCmd: RaidCliCmd, param: raidCmd.UpdateFWParam): RaidCliCmd {
    const processedParam: any = {};
    processedParam['filename'] = '"' + param['filename'] + '"';
    processedParam['y'] = '';
    if(param['isRollingUpgrade']) processedParam['u'] = ''; // isRollingUpgrade
    if(param['isReset'])          processedParam['r'] = ''; // isReset
    if(param['isUI'])             processedParam['c'] = ''; // isUI
    if(param['biosfilename']) processedParam['biosfilename'] = '"' + param['biosfilename'] + '"';
    if(param['bgJob'])        processedParam['bgJob'] = '';
    
    raidCliCmd.key = 'updateFW';
    raidCliCmd.param = processedParam;
    return raidCliCmd;
  }

  // /**
  // # update fwbr [fw_filename] [br_filename] [-y] [-u | -r]
  // updateFWBR=update fwbr [fw_filename] [br_filename] [-y:y] [-u:u] [-r:r]
  //   */
  // function updateFWBR(devID, _refRetunArr, _refParmArr, fw_filename, br_filename, isRollingUpgrade) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'updateFWBR';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['fw_filename'] = '"' + fw_filename + '"';
  //     param['br_filename'] = '"' + br_filename + '"';
  //     if (isRollingUpgrade){
  //         param['u'] = '';
  //     }
  //     param['y'] = '';

  //     return cmd;
  // }

  // /**
  // # update verifyfile [filename]
  // updateVerifyFile = update verifyfile [filename]
  //   */
  static updateVerifyFile(raidCliCmd: RaidCliCmd, param: raidCmd.UpdateVerifyFileParam): RaidCliCmd {
    raidCliCmd.key = 'updateVerifyFile';
    param['filename'] = '"' + param['filename'] + '"';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  // # update fw [filename] [-y] [-u | -r]
  // updateFW=update fw [filename] [-y:y] [-u:u] [-r:r] [-c:c]
  //   */
  static updateClusterFW(raidCliCmd: RaidCliCmd, param: raidCmd.UpdateClusterFWParam): RaidCliCmd {
    raidCliCmd.key = 'updateClusterFW';
    param['filename'] = '"' + param['filename'] + '"';
    if (param['biosFileName']) {
      param['biosfilename'] = '"' + param['biosFileName'] + '"';
    }
    param['y'] = '';
    param['c'] = '';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  // # system updatefw [${filePath}] [${size}] [-r ${r}] <-z {a|b}@serviceID>
  // updateKSFW=system updatefw /fullpath/filename [-r:r] <-z {a|b}@serviceID>
  //   */
  static updateKSFW(raidCliCmd: RaidCliCmd, param: raidCmd.UpdateKSFWParam): RaidCliCmd {
    raidCliCmd.key = 'fssSystemUpdatefw';
    param['filename'] = '"' + param['filename'] + '"';
    param['size'] = param['size'];
    // param['r'] = '';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  // # system syncfw [-n] [fullpath]
  // fssSystemSyncFile=FSS system syncfw [-n] [fullpath] [-z:z]
  //   */
  static fssSystemSyncFile(raidCliCmd: RaidCliCmd, param: raidCmd.FssSystemSyncFileParam): RaidCliCmd {
    raidCliCmd.key = 'fssSystemSyncFile';
    param['n'] = '"' + param['fullpath'] + '"';
    if (typeof param['raidId'] === 'string') {
      param['t'] = param['raidId'].startsWith("0x") ? param['raidId'].toLowerCase() : ("0x" + param['raidId'].toLowerCase());
    }
    param['c'] = param['type']; // 1: update FW, 2: backup config
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  // # system syncfw [-n] [fullpath]
  // fssSystemSyncFileStatus=FSS system syncfw_status [-n] [fullpath] [-z:z]
  //   */
  static fssSystemSyncFileStatus(raidCliCmd: RaidCliCmd, param: raidCmd.FssSystemSyncFileStatusParam): RaidCliCmd {
    raidCliCmd.key = 'fssSystemSyncFileStatus';
    param['n'] = '"' + param['fullpath'] + '"';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  // # import nvram [filename] [-n] [-y] [-r]
  // importNVRam=import nvram [filename] [-n:n] [-y:y] [-r:r]
  // Parameter:
  //     filename: String (Import from host disk)
  //     bNotIncludePwd: boolean (Import from RAID disk)
  //   */
  static importNVRam(raidCliCmd: RaidCliCmd, param: raidCmd.ImportNVRAMParam): RaidCliCmd {
    raidCliCmd.key = 'importNVRam';
    raidCliCmd.param = param;

    if (param.filename) {
      param.filename = '\"' + param.filename + '\"';
    }

    return raidCliCmd;
  }

  // /**
  // # export nvram [filename]
  // exportNVRam=export nvram [filename]
  //   */
  exportNVRam(raidCliCmd: RaidCliCmd, param: raidCmd.ExportNVRAMParam) {
    raidCliCmd.key = 'exportNVRam';
    raidCliCmd.param = param;

    param.filename = param.exportToHost ? raidCliCmd.devID + '_nvram' : '';
    //delete param.exportToHost;

    return raidCliCmd;
  }

  // /**
  // * # import license [filename] [-y] [-r]
  // * importLicense=import license [filename] [-y:y] [-r:r]
  // * Parameter:
  // *     filename: Specified a file to import the license file to the controller.
  // */
  static importLicense(raidCliCmd: RaidCliCmd, param: raidCmd.ImportLicenseParam): RaidCliCmd {
    raidCliCmd.key = 'importLicense';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  // /**
  // * # export license [filename] [-y]
  // * exportLicense=export license [filename] [-y:y]
  // * Parameter:
  // *     filename: Specify the file name for saving. If not specified, use the default file name: LicenseApplyFile.bin.
  // * Ex. export license LicenseApplyFile.bin
  // */

  static exportLicense(raidCliCmd: RaidCliCmd, param: raidCmd.ExportLicenseParam): RaidCliCmd {
    raidCliCmd.key = 'exportLicense';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  // /**
  // * # set license enable [-y] [-r]
  // * setLicenseEnable=set license enable [-y:y] [-r:r]
  // */
  // function setLicenseEnable(devID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setLicenseEnable';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['y'] = '';
  //     param['r'] = '';

  //     return cmd;
  // }

  // /**
  //   * # create isns [IP-addresses] [-r] [-y]
  //   */
  static createIsns(raidCliCmd: RaidCliCmd, param: raidCmd.CreateIsnsParam): RaidCliCmd {
    raidCliCmd.key = 'createIsns';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # delete isns [index] [-r][-y]
  //   */
  static deleteIsns(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteIsnsParam): RaidCliCmd {
    raidCliCmd.key = 'deleteIsns';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # set controller parm [normal-verify={switch}]
  //   * [init-verify={switch}] [rebuild-verify={switch}]
  //   * [priority={level}] [max-response={timeout}]
  //   * [av-optimization={category}] [post={switch}]
  //   * [snmp={community-string}] [sntp={SNTP-Server-IPs}]
  //   * [sntp-poll={period}]
  //   */
  // function createSntp(devID, _refRetunArr, _refParmArr, sntp, sntpPoll) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setControllerParm';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if (sntp)
  //         param['sntpIp'] = sntp;
  //     if (sntpPoll)
  //         param['sntpPoll'] = sntpPoll;

  //     return cmd;
  // }

  // /**
  //   * # set controller parm [normal-verify={switch}]
  //   * [init-verify={switch}] [rebuild-verify={switch}]
  //   * [priority={level}] [max-response={timeout}]
  //   * [av-optimization={category}] [post={switch}]
  //   * [snmp={community-string}] [sntp={SNTP-Server-IPs}]
  //   * [sntp-poll={period}]
  //   */
  // function deleteSntp(devID, _refRetunArr, _refParmArr, sntp) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setControllerParm';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['sntpIp'] = sntp;

  //     return cmd;
  // }

  // // set controller redundancy [remote=remote] [cache=cache]
  // // [adaptive=adaptive] [reduction=reduction] [ctlr-assign=ctlr-assign]
  // // [ld-assign=ld-assign]
  static setControllerRedundancy(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerRedundancyParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerRedundancy';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // // set controller forcefail [slot] [-y]
  static setControllerForceFail(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerForceFailParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerForceFail';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // // set controller deassert [-y]
  static setControllerDeassert(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerDeassertParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerDeassert';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // // setPassword=set password password=[secret],[newPassword] [isembedded=isembedded]
  // function setPassword(devID, _refRetunArr, _refParmArr, secret, newPassword, isembedded) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setPassword';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if ( secret )
  //         param['secret'] = secret;
  //     if ( newPassword )
  //         param['newPassword'] = newPassword;

  //     param['isembedded'] = isembedded;

  //     return cmd;
  // }

  // // setPasswordNoConfirm=set password no-confirm password=[newPassword]
  // function setPasswordNoConfirm(devID, _refRetunArr, _refParmArr, newPassword) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setPasswordNoConfirm';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['newPassword'] = newPassword;

  //     return cmd;
  // }

  // /**
  //   * # export event [filename] [1stline={switch}]
  //   * exportEvent=export event [filename] [1stline={switch}]
  //   * 1stline enable, disable
  //   */
  static exportEvent(raidCliCmd: RaidCliCmd, param: raidCmd.EventLogExportParam): RaidCliCmd {

    raidCliCmd.key = 'ExportEventLog';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // /**
  //   * # delete event #Event
  //   * deleteEvent=delete event #Event
  //   */
  static deleteEvent(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'deleteEvent';
    raidCliCmd.param = {};
    return raidCliCmd;
  }
  // /**
  //   * # export action log [filename]
  //   * exportActionLog=export action log [filename]
  //   */
  static exportActionLog(raidCliCmd: RaidCliCmd, param: raidCmd.EventLogExportParam): RaidCliCmd {

    raidCliCmd.key = 'exportActionLog';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // /**
  //   * # delete action log #Event
  //   * deleteActionLog=delete action log #Event
  //   */
  static deleteActionLog(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'deleteActionLog';
    raidCliCmd.param = {};

    return raidCliCmd;
  }
  /**
   * # set enclosure-led [enclosure-ID] [service={switch}] [system={switch}]
   * setEnclosureLed=set enclosure-led [enclosure-ID] [service=service] [system=system] #EnclosureView
   */
  static setEnclosureLed(raidCliCmd: RaidCliCmd, param: raidCmd.SetEnclosureLedParam): RaidCliCmd {
    const processedParam: any = {};
    raidCliCmd.key = 'setEnclosureLed';

    processedParam['enclosure-ID'] = param.enclosureID;
    if (param.turnOnServiceLED !== null) {
      processedParam.service = param.turnOnServiceLED ? 'enable' : 'disable';
    }

    if (param.turnOnSystemLED !== null) {
      processedParam.system = param.turnOnSystemLED ? 'enable' : 'disable';
    }
    raidCliCmd.param = processedParam;
    return raidCliCmd;
  }

  // _this.setMultiEnclosureLed = setMultiEnclosureLed;
  /**
      # set multi-enclosure-led [enclosure={enclosure}] [service={switch}] [system={switch}]
      setMultiEnclosureLed=set multi-enclosure-led [enclosure=enclosure] [service=service] [system=system] #EnclosureView
    */
  static setMultiEnclosureLed(raidCliCmd: RaidCliCmd, param: raidCmd.SetMultiEnclosureLedParam): RaidCliCmd {
    raidCliCmd.key = 'setMultiEnclosureLed';
    raidCliCmd.param = param;
    return raidCliCmd;
  }
  // /*
  //     # set net [ID] [ip={IP-Addresses}] [mask={Netmask-IPs}] [gw={Gateway-IPs}] [v6ip={IPv6-Addresses}] [prefix={prefix-lengths}] [route={route-addresses}] [-r] [-y]
  //     setNet=set net [ID] [ip=ip] [mask=mask] [gw=gw] [v6ip=v6ip] [prefix=prefix] [route=route] [-r:r] [-y:y]
  // */

  // function setNet(devID, _refRetunArr, _refParmArr, ID, netType, ip_A, mask_A, gw_A, ip_B, mask_B, gw_B,
  //     v6NetType, v6Ip_A, prefix_A, route_A, v6Ip_B, prefix_B, route_B, isRedundant){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setNet';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['ID'] = ID;

  //     var ip = "";
  //     var mask = "";
  //     var gw = "";
  //     var v6Ip = "";
  //     var prefix = "";
  //     var route = "";
  //     if(netType == "DHCP"){
  //         ip = "dhcp";
  //     }else{
  //         if(ip_A && ip_A != ""){
  //             ip = ip_A;
  //         }

  //         if(mask_A && mask_A != ""){
  //             mask = mask_A;
  //         }

  //         if(gw_A && gw_A != ""){
  //             gw = gw_A;
  //         }

  //         if(isRedundant){
  //             if(ip_B && ip_B != ""){
  //                 ip = ip + "," + ip_B;
  //             }

  //             if(mask_B && mask_B != ""){
  //                 mask = mask + ","+ mask_B;
  //             }

  //             if(gw_B && gw_B != ""){
  //                 gw = gw + "," + gw_B;
  //             }
  //         }
  //     }

  //     if(v6NetType == "Disabled"){
  //         v6Ip = "";
  //     }else if(v6NetType == "Auto"){
  //         v6Ip = "dhcp";
  //     }else{
  //         if(v6Ip_A){
  //             v6Ip = v6Ip_A;
  //         }

  //         if(prefix_A && prefix_A != ""){
  //             prefix = prefix_A;
  //         }

  //         if(route_A && route_A != ""){
  //             route = route_A;
  //         }

  //         if(isRedundant){
  //             if(v6Ip_B){
  //                 v6Ip = v6Ip + "," + v6Ip_B;
  //             }

  //             if(prefix_B && prefix_B != ""){
  //                 prefix = prefix + "," + prefix_B;
  //             }

  //             if(route_B && route_B != ""){
  //                 route = route + "," + route_B;
  //             }
  //         }
  //     }

  //     if(ip&&ip!=""){
  //         param['ip'] = ip;
  //     }

  //     if(mask&&mask!=""){
  //         param['mask'] = mask;
  //     }

  //     if(gw&&gw!=""){
  //         param['gw'] = gw;
  //     }

  //     if(v6Ip == ""){
  //         param['v6ip'] = '""';
  //     }else{
  //         param['v6ip'] = v6Ip;
  //     }


  //     if(prefix&&prefix!=""){
  //         param['prefix'] = prefix;
  //     }

  //     if(route&&route!=""){
  //         param['route'] = route;
  //     }

  //     return cmd;
  // }

  // /*
  //     # set channel [channel-ID] [mode={value}] [aid={id-list}] [bid={id-list}] [maxrate={value}] [mcs={MCS-ID}] [-r] [-y]
  //     setChannel=set channel [ID] [mode=mode] [aid=aid] [bid=bid] [maxrate=maxrate] [mcs=mcs] [-r:r] [-y:y]
  // */

  // function setChannel(devID, _refRetunArr, _refParmArr, ID, mode, aid, bid, maxrate, mcs){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setChannel';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['ID'] = ID;

  //     if(mode){
  //         param['mode'] = mode;
  //     }

  //     if(aid && aid != ""){
  //         param['aid'] = aid;
  //     }else if(aid == ""){
  //         param['aid'] = "delete";
  //     }

  //     if(bid && bid != ""){
  //         param['bid'] = bid;
  //     }else if(bid == ""){
  //         param['bid'] = "delete";
  //     }

  //     if(maxrate){
  //         param['maxrate'] = maxrate;
  //     }

  //     if(mcs!=null){
  //         param['mcs'] = mcs;
  //     }

  //     return cmd;
  // }

  // /*
  //   * # set channel owner [channel-ID] [type]
  //   * type: The owner type for specify channel Valid values: block, file.
  //   */

  // function setChannelOwner(devID, _refRetunArr, _refParmArr, ID, type){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setChannelOwner';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['channel-ID'] = ID;
  //     param['type'] = type;

  //     return cmd;
  // }

  // /*
  // # set hostboard [hostboard-index] [type-index] [-y] [-r]
  // setHostBoard = set hostboard [hostboard-index] [type-index] [-y:y] [-r:r]
  //   */

  // function setHostboardMode(devID, _refRetunArr, _refParmArr, hostboardId, type, isReset){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setHostBoard';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['hostboard-index'] = hostboardId;
  //     param['type-index'] = type;
  //     param['y'] = "";
  //     if(isReset)
  //         param['r'] = "";

  //     return cmd;
  // }

  static setScheduleHost(raidCliCmd: RaidCliCmd, param: raidCmd.SetScheduleHostParam): RaidCliCmd {
    raidCliCmd.key = 'setScheduleHost';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  //   *# replicate delete [taskname]
  // */
  // function fssReplicateDelete(devID, _refRetunArr, _refParmArr, taskname){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssReplicateDelete';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(taskname){
  //         param['taskname'] = taskname;
  //     }

  //     return cmd;
  // }

  static fssCsDeviceDefragAbort(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsDeviceDefragAbortParam): RaidCliCmd {
    raidCliCmd.key = 'fssScheduleCreate';

    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // function fssCsDeviceDefragAbort(devID, _refReturn, _refParam, clusterName) {
  //     var cmd = {};
  //     var param = {};

  //     cmd.key = 'fssCsDeviceDefragAbort';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = {};
  //     cmd.refParam = {};

  //     param['c'] = clusterName;

  //     return cmd;
  // }


  /*
   *#   schedule create
   *#   <-c {rr|av|defrag}}>
   *#   [-n schedule_name]
   *#   <-s source_task>
   *#   [-t { once | every | daily | weekly | monthly }]
   *#   [-d day [day ??�]]
   *#   [-p period]
   *#   [-E { on | off }]
   *#   [-sd start_date]
   *#   [-T start_time]
   *#   [-ed end_date]
   *#   [-et end_time]
   *#   [-du duration]
   */
  static fssScheduleCreate(raidCliCmd: RaidCliCmd, param: fssCmd.FssScheduleCreateParam): RaidCliCmd {
    raidCliCmd.key = 'fssScheduleCreate';
    raidCliCmd.param = {};
    if (param.c) {
      raidCliCmd.param.c = param.c
    }

    if (param.p) {
      raidCliCmd.param.p = param.p
    }

    if (param.t) {
      raidCliCmd.param.t = param.t
    }

    if (param.T) {
      raidCliCmd.param.T = param.T
    }

    if (param.d) {
      raidCliCmd.param.d = param.d
    }
    return raidCliCmd;
  }

  /*
   *# schedule options schedule_name
   *#   [-s on|off]
   *#   [-n new_schedule_name]
   *#   [-t {daily|weekly|monthly}]
   *#   [-d day [day...]]
   *#   [-m month [month...] ]
   *#   [-T start_time]
   *#   [-mo modifier]
   *#   [-sd start_date]
   *#   [-ed end_date]
   *#   [-r {on -p period {-et end_time |-du duration} | off}]
   */
  static fssScheduleOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssScheduleOptionsParam): RaidCliCmd {
    raidCliCmd.key = 'fssScheduleOptions';
    raidCliCmd.param = {};
    if (param.schedule_name) {
      raidCliCmd.param.schedule_name = param.schedule_name
    }

    if (param.p) {
      raidCliCmd.param.p = param.p
    }

    if (param.t) {
      raidCliCmd.param.t = param.t
    }

    if (param.T) {
      raidCliCmd.param.T = param.T
    }

    if (param.d) {
      raidCliCmd.param.d = param.d
    }
    return raidCliCmd;
  }

  /*
   *# schedule delete [schedule_name]
   */
  static fssScheduleDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssScheduleDeleteParam): RaidCliCmd {
    raidCliCmd.key = 'fssScheduleDelete';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static dedupClose(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'fssDedupClose';
    raidCliCmd.param = {};
    return raidCliCmd;
  }

  static deleteSchedule(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteScheduleParam): RaidCliCmd {
    raidCliCmd.key = 'deleteSchedule';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static deleteScheduleHost(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteScheduleHostParam): RaidCliCmd {
    raidCliCmd.key = 'deleteScheduleHost';
    raidCliCmd.param = param;
    return raidCliCmd;
  }
  // function deleteScheduleHost(devID, _refRetunArr, _refParmArr, scheduleID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'deleteScheduleHost';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(scheduleID){
  //         param['schedule-ID'] = scheduleID;
  //     }

  //     return cmd;
  // }

  // /*
  // # create schedule host [name] [type] [partition-IDs | replication-IDs | LV-ID] [start-date] [start-time] [end-date={date}] [end-time={time}]
  // [repeat={repeat}] [period={period}] [day={day-list}] [purge={rule}] [purge-number={number}] [priority={level}] [reclaim={reclaim}] [si-name={siName}] [si-description={siDescription}] [run-now={runNow}]
  // */
  static CreateScheduleHost(raidCliCmd: RaidCliCmd, param: raidCmd.CreateScheduleHostParam): RaidCliCmd {
    raidCliCmd.key = 'createScheduleHost';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static createScheduleForGS(raidCliCmd: RaidCliCmd, param: raidCmd.CreateScheduleForGSParam): RaidCliCmd {
    raidCliCmd.key = 'createSchedule';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // // # create schedule [schedule-policy] [command] [init={switch}]
  // function createSchedule(devID, _refRetunArr, _refParmArr, mediaScan){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'createSchedule';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     var schedulePolicy;
  //     var command;
  //     var init;
  //     var startTime = mediaScan.startTime.hour + mediaScan.startTime.minute;

  //     if ( mediaScan.customFreq == "once" ) {
  //         schedulePolicy = "once " +  mediaScan.startDate + " " + startTime;
  //     } else if ( mediaScan.customFreq == 'daily' ) {
  //         schedulePolicy = "daily " + startTime;
  //     } else if ( mediaScan.customFreq == 'weekly' ) {
  //         schedulePolicy = "weekly " +  mediaScan.weekDay + " " + startTime;
  //     } else if ( mediaScan.customFreq == 'monthly' ) {
  //         schedulePolicy = "monthly " +  mediaScan.monthDay + " " + startTime;
  //     }

  //     if ( mediaScan.destinationType == 'member' ) {
  //         command = "set ld scan " + mediaScan.selectedLD.id;
  //     } else if ( mediaScan.destinationType == 'all' ) {
  //         command = "set ld scan target=all";
  //     }else {
  //         command = "set disk scan target=" + mediaScan.destinationType ;
  //     }

  //     if ( mediaScan.isExecuteOnce ) {
  //         command += " mode=one-pass priority=" + mediaScan.priority;
  //     } else {
  //         command += " mode=continues priority=" + mediaScan.priority;
  //     }

  //     if ( mediaScan.isExecuteInitial ) {
  //         init = "enable";
  //     } else {
  //         init = "disable";
  //     }

  //     param['schedule-policy'] = schedulePolicy;
  //     param['command'] = command;
  //     param['init'] = init;

  //     return cmd;
  // }

  // /*
  //     set controller name [name]
  // */
  static setControllerName(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerNameParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerName';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // /*
  //     set controller uid [ID] [-y] [-r]
  // */
  // function setControllerUid(devID, _refRetunArr, _refParmArr, id) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setControllerUid';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     if(id){
  //         param['id'] = id;
  //     }

  //     param['y'] = "";

  //     return cmd;
  // }

  /*
      set controller parm [normal-verify={switch}] [init-verify={switch}] [rebuild-verify={switch}] [priority={level}]
      [max-response={timeout}] [av-optimization={category}] [post={switch}] [snmp={community-string}] [sntp={SNTP-Server-IPs}]
      [sntp-poll={period}]
  */
  static setControllerParm(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerParmParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerParm';
    raidCliCmd.param = param;

    return raidCliCmd;
  }
  // /*
  // set controller parm [normal-verify={switch}] [init-verify={switch}] [rebuild-verify={switch}] [priority={level}] [max-response={timeout}]
  // [av-optimization={category}] [post={switch}] [snmp={community-string}] [sntp={SNTP-Server-IPs}] [sntp-poll={period}]
  // */
  static setDiskArraySetting(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskArraySettingParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerParm';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // function getSnmpStatus(devID){

  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'showSnmpStatus';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;

  // }

  // function getSnmpReceiverInfo(devID) {

  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'showSnmpReceiver';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;

  // }

  static setSnmpReceiver(raidCliCmd: RaidCliCmd, param: raidCmd.SetSnmpReceiverParam): RaidCliCmd {
    raidCliCmd.key = 'setSnmpReceiver';
    raidCliCmd.param = param;

    Object.entries(param).forEach(([key, value]) => {
      if (['ip', 'recvseverity', 'version', 'name', 'auth', 'authpw', 'privacy', 'privacypw', 'community'].indexOf(key) === 0) {
        param[key] = `"${value}"`;
      }
    });
    return raidCliCmd;
  }

  static setControllerPerformance(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerPerformanceParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerPerformance';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static setSystemSnmpConfig(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerParmParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerParm';
    raidCliCmd.param = param;
    param.snmp = `"${param.snmp}"`;
    return raidCliCmd;
  }

  // /*
  //     set cache [write={write-policy}] [sync-period={value}] [-r] [-y]
  // */
  static setCache(raidCliCmd: RaidCliCmd, param: raidCmd.SetCacheParam): RaidCliCmd {
    raidCliCmd.key = 'setCache';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  //     set rs232 [port] [baud={value}] [term={switch}]
  // */
  // function setRS232(devID, _refRetunArr, _refParmArr, port, baud, term) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setRS232';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     if(port){
  //         param['port'] = "com"+port;
  //     }

  //     if(baud){
  //         param['baud'] = baud;
  //     }

  //     if(term){
  //         param['term'] = term;
  //     }

  //     return cmd;
  // }

  // /*
  // setNetProtocol=set net protocol [all=all] [telnet=telent] [http=http] [https=https] [ftp=ftp] [ssh=ssh] [oob=oob] [ssl=ssl] [snmp=snmp] [dhcp=dhcp] [ping=ping] [discovery=discovery] #SystemSettingInfo
  // */
  // function setNetProtocol(devID, _refRetunArr, _refParmArr, all, telnet, http, https, ftp, ssh, oob, ssl, snmp, dhcp, ping, discovery) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setNetProtocol';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if ( all )
  //         param['all'] = all;
  //     if ( telnet )
  //         param['telnet'] = telnet;
  //     if ( http )
  //         param['http'] = http;
  //     if ( https )
  //         param['https'] = https;
  //     if ( ftp )
  //         param['ftp'] = ftp;
  //     if ( ssh )
  //         param['ssh'] = ssh;
  //     if ( oob )
  //         param['oob'] = oob;
  //     if ( ssl )
  //         param['ssl'] = ssl;
  //     if ( snmp )
  //         param['snmp'] = snmp;
  //     if ( dhcp )
  //         param['dhcp'] = dhcp;
  //     if ( ping )
  //         param['ping'] = ping;
  //     if ( discovery )
  //         param['discovery'] = discovery;

  //     return cmd;
  // }

  // /*
  //     set controller trigger [controller-fail={switch}] [battery-fail={switch}] [power-loss={switch}]
  //     [power-fail={switch}] [fan-fail={switch}] [temp-exceed-delay={value}]
  // */
  static setControllerTrigger(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerTriggerParam): RaidCliCmd {
    raidCliCmd.key = 'setControllerTrigger';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  //     set host [queue-depth={value}] [max-lun={value}] [conn-mode={value}] [concurrent={value}] [num-tag={value}]
  //               [dev-type={value}] [dev-qual={value}] [remove-media={switch}] [lun-app={value}]
  //               [chs={value-index}] [CHAP={switch}] [jumbo-frame={switch}] [-r] [-y]
  // */
  // function setHost(devID, _refRetunArr, _refParmArr, queueDepth, maxLun, connMode, concurrent, numTag, devType, devQual, removeMedia, lunApp, chs, CHAP, jumboFrame, raidOnly) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setHost';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(queueDepth){
  //         param['queueDepth'] = queueDepth;
  //     }

  //     if(maxLun){
  //         param['maxLun'] = maxLun;
  //     }

  //     if(connMode){
  //         param['connMode'] = connMode;
  //     }

  //     if(concurrent){
  //         param['concurrent'] = concurrent;
  //     }

  //     if(numTag){
  //         param['numTag'] = numTag;
  //     }

  //     if(devType){
  //         param['devType'] = devType;
  //     }

  //     if(devQual){
  //         param['devQual'] = devQual;
  //     }

  //     if(removeMedia){
  //         param['removeMedia'] = removeMedia;
  //     }

  //     if(lunApp){
  //         param['lunApp'] = lunApp;
  //     }

  //     if(chs){
  //         param['chs'] = chs;
  //     }

  //     if(CHAP){
  //         param['CHAP'] = CHAP;
  //     }

  //     if(jumboFrame){
  //         param['jumboFrame'] = jumboFrame;
  //         if (raidOnly) {
  //             param['raidOnly'] = raidOnly; // if true, set block channel only
  //         }
  //     }

  //     param['y'] = '';

  //     return cmd;
  // }

  /*
      set disk parm [spin={switch}] [smart={value}] [autospare={switch}] [delay={time}] [tag={value}]
      [io={timeout}] [check={period}] [poll={period}] [swap={period}]  [cache={switch}] [life={threshold}]
  */
  static setDiskParm(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskParmParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskParm';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /*
      set disk saving [mode] [level1={time}] [level2={time}]
  */
  static setDiskSaving(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskSavingParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskSaving';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * setDiskClear=set disk clear [disk-index-list]
   * diskList: array
   */
  static setDiskClear(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskClearParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskClear';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * setDiskFormat=set disk format [disk-index-list]
   * diskList: array
   */
  static setDiskFormat(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskFormatParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskFormat';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * set disk clone [source-disk] [-s]
   */
  static setDiskCloneSource(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskCloneSourceParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskCloneSource';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * # set disk clone [destination-disk] [-a]
   */
  static setDiskCloneDestination(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskCloneDestinationParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskCloneDestination';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # set disk clone -l
  //   */
  // function setDiskClone(devID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'setDiskClone';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['l'] = '';

  //     return cmd;
  // }

  /**
   * # set disk scan [disk-index-list] [mode={value}] [priority={level}]
   */
  static setDiskScan(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskScanParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskScan';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * # set disk scan [index-list] [-a]
   */
  static setDiskScanAbort(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskScanAbortParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskScanAbort';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * # set disk flash [disk-index] [-e]
   */
  static setDiskFlash(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskFlashParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskFlash';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * # set disk rwtest [disk-index-list] [mode={value}] [error={value}] [recovery={value}] [-a] [-k]
   */
  static setDiskRwtest(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskRwtestParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskRwtest';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * # set disk copy [source-disk] [destination-disk] [priority={level}]
   */
  static setDiskCopy(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskCopyParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskCopy';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * # set disk copy [destination-disk] [-a]
   */
  static setDiskCopyAbort(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskCopyAbortParam): RaidCliCmd {
    raidCliCmd.key = 'setDiskCopyAbort';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /*
  * # set sed erase [disk-index]
  */
  static setSEDErase(raidCliCmd: RaidCliCmd, param: raidCmd.SetSEDEraseParam): RaidCliCmd {
    raidCliCmd.key = 'setSEDErase';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /*
  * # create sed keyfile [filename]
  */
  static createSedKeyfile(raidCliCmd: RaidCliCmd, param: raidCmd.CreateSEDFileParam): RaidCliCmd {
    raidCliCmd.key = 'createSedKeyfile';
    param.filename = param.filename + '_SedKeyfile.key';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  //   * # set sed password
  //   * [[password={password},{new-password}]|[keyfile={keyfile},{new-keyfile}]
  //   * set sed password [password=password] [keyfile=keyfile]
  //   *
  //   * password : array[0] = password, array[1] = new-password
  //   * keyfile : array[0] = keyfile, array[1] = new-keyfile
  //   */
  static setSedPassword(raidCliCmd: RaidCliCmd, param: raidCmd.SetSedPasswordParam): RaidCliCmd {
    raidCliCmd.key = 'setSedPassword';

    if (param.password && param.password.length !== 0) {
      param.password = TextToolService.convertArrayToString(param.password, ',');
    }
    if (param.keyfile && param.keyfile.length !== 0) {
      param.keyfile = TextToolService.convertArrayToString(param.keyfile, ',');
    }

    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // /*
  //   * # set ld saving [index] [mode] [level1={time}] [level2={time}]
  //   * Specify the power saving mode for specific LD
  //   *
  //   */
  static setLDSaving(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDSavingParam): RaidCliCmd {
    raidCliCmd.key = 'setLDSaving';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  //   * # set ld scan [index-list] [mode={value}] [priority={level}]
  //   * Check each block in a specified logical drive for bad blocks
  //   *
  //   */
  static setLDScan(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDScanParam): RaidCliCmd {
    raidCliCmd.key = 'setLDScan';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // //#set ld scan [index-list] [-a]
  static abortLDScan(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDScanParam): RaidCliCmd {
    raidCliCmd.key = 'abortLDScan';
    raidCliCmd.param = param;
    return raidCliCmd;
  }



  // }

  // /*
  //   * # set ld sed enable [ld-id-list]
  //   * [password={password}|keyfile={keyfile}]
  //   *
  //   */
  // function setLdSedEnable(devID, _refRetunArr, refParmArr, ldList,
  //     password, keyfile) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setLdSedEnable';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (ldList) {
  //         param['ldList'] = Tool.convertArrayToString(ldList, ',');
  //     }

  //     if (password && password.length != 0) {
  //         param['password'] = Tool.convertArrayToString(password, ',');
  //     }

  //     if (keyfile && keyfile.length != 0) {
  //         param['keyfile'] = Tool.convertArrayToString(keyfile, ',');
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['ldList'] = refParmArr[0];
  //     }

  //     return cmd;
  // }


  // /*
  //   * # set ld sed disable {ld-id-list}
  //   * [password={password}|keyfile={keyfile}]
  //   */
  // function setLdSedDisable(devID, _refRetunArr, _refParmArr, ldList,
  //     password, keyfile) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setLdSedDisable';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (ldList) {
  //         param['ldList'] = Tool.convertArrayToString(ldList, ',');
  //     }

  //     if (password && password.length != 0) {
  //         param['password'] = Tool.convertArrayToString(password, ',');
  //     }

  //     if (keyfile && keyfile.length != 0) {
  //         param['keyfile'] = Tool.convertArrayToString(keyfile, ',');
  //     }

  //     return cmd;
  // }

  // /*
  //   * # set ld shutdown [index] [-y]
  //   *
  //   */
  static setLDShutdown(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDShutdownParam): RaidCliCmd {
    raidCliCmd.key = 'setLDShutdown';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  // * # set ld rebuild [LD-index] [-y]
  // * setLDRebuild=set ld rebuild [LD-index] -y
  // *
  // * # set ld rebuild [LD-index] [-y] [-a]
  // * abortLDRebuild=set ld rebuild [LD-index] -y -a
  // */
  static setLDRebuild(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDRebuildParam): RaidCliCmd {
    if (param.abort) {
      raidCliCmd.key = 'abortLDRebuild';
    } else {
      raidCliCmd.key = 'setLDRebuild';
    }
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  //   * # set ld parity [LD-index-list] [mode={value}]
  //   *     setLDParity=set ld parity [LD-id-list] [mode=mode] -y #LogicalDrive;Disk
  //   * # set ld parity [LD-index-list] [-a]
  //   *      aboutLDParity=set ld parity [LD-id-list] -y -a #LogicalDrive;Disk
  //   */
  static setLDParity(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDParityParam): RaidCliCmd {
    if (param.abort) {
      raidCliCmd.key = 'abortLDParity';
    } else {
      raidCliCmd.key = 'setLDParity';
    }
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // / **
  //   * set ld migrate [id] [RAID-level] [append={disk-list}]
  //   */
  static setLDMigration(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDMigrationParam): RaidCliCmd {
    raidCliCmd.key = 'setLDMigration';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // / **
  //   * setLDAdd=set ld add [LD-id] [disk-list] -y
  //   */
  static setLDAdd(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDAddParam): RaidCliCmd {
    raidCliCmd.key = 'setLDAdd';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  //   * # set ld expand [id-list] [size={expand-size}] [mode={value}] [-y]
  //       setLDExpand=set ld expand [id-list] [size=expand-size] [mode=value] -y
  //   */
  static setLDExpand(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDExpandParam): RaidCliCmd {
    raidCliCmd.key = 'setLDExpand';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // //# set ld [LD-id] [assign={assign-to}] [name={LD-alias-name}] [write={write-policy}]
  // //setLD=set ld [LD-id] [assign=assign] [name=name] [write=write]
  static setLD(raidCliCmd: RaidCliCmd, param: raidCmd.SetLdParam): RaidCliCmd {
    raidCliCmd.key = 'setLD';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static deleteFullLD(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteFullLDParam, callback?: (...val: any) => any): RaidCliCmd {
    raidCliCmd.key = 'deleteFullLD',
      raidCliCmd.param = param;
    if (callback) {
      callback();
    }
    return raidCliCmd;
  }

  // //# set ld sed unlock {ld-index-list} [password={password}|keyfile={keyfile}]
  // //setLDSedUnlock=set ld sed unlock {ld-index-list} [password=password] [keyfile=keyfile]
  static setLDSedUnlock(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDSedUnlockParam): RaidCliCmd {
    raidCliCmd.key = 'setLDSedUnlock',
      raidCliCmd.param = param;
    return raidCliCmd;
  }

  /*
    * set lv tier-migrate [lvId] [part=partId]
    * [dataservice=dataservice] [priority=priority]
    */
  static setLvTierMigrate(raidCliCmd: RaidCliCmd, param: raidCmd.SetLvTierMigrateParam): RaidCliCmd {
    raidCliCmd.key = 'setLvTierMigrate';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  // /*
  //   * set threshold [SAF-TE-ID] [min={minimal-threshold}] [max={maximal-threshold}]
  //   */
  static setThreshold(raidCliCmd: RaidCliCmd, param: raidCmd.SetThresholdParam): RaidCliCmd {
    raidCliCmd.key = 'setThreshold';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  //     #----------CREATE----------#
  //     # scheduleRR create
  //     #   <-tp {all|home|single}>
  //     #   <-sf source_folder>
  //     #   <-st {nas|rsync}>
  //     #   [-e on|off]
  //     #   <-a target_IP>
  //     #   [-P port]
  //     #   <-u username>
  //     #   <-pw password>
  //     #   <-D destination>
  //     #   [-c on|off]
  //     #   [-N on|off]
  //     #   [-R on|off]
  //     #   [-s on|off]
  //     #   [-t {daily|weekly|monthly}]
  //     #   [-d day [day...]]
  //     #   [-m month [month...] ]
  //     #   [-T start_time]
  //     #   [-mo modifier]
  //     #   [-sd start_date]
  //     #   [-ed end_date]
  //     #   [-r {on -p period {-et end_time |-du duration} | off}]
  //     fsScheduleRRCreate=fs scheduleRR create [-tp:tp] [-sf:sf] [-st:st] [-e:e] [-a:a] [-P:P] [-u:u] [-pw:pw] [-D:D] [-c:c] [-N:N] [-R:R] [-s:s] [-t:t] [-d:d] [-m:m] [-T:T] [-mo:mo] [-sd:sd] [-ed:ed] [-r:r] [-p:p] [-et:et] [-du:du] #BackupSchedule
  //     Params:
  //         sourceType: String{all|home|single}
  //         sourceFolder: String
  //         serverType: String{nas|rsync}
  //         isSecurityOn: Boolean
  //         targetIP: String
  //         port: String
  //         username: String
  //         password: String
  //         destination: String
  //   */

  // function createFSRRSchedule(devID, _refRetunArr, _refParmArr,
  //     sourceType, sourceFolder, serverType,
  //     isSecurityOn, targetIP, port, username, password, destination,
  //     customScheduleParams) {

  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fsScheduleRRCreate';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['tp'] = sourceType;

  //     if (sourceType=='single') {
  //         param['sf'] = sourceFolder;
  //     }

  //     if (serverType) {
  //         param['st'] = serverType;
  //     }

  //     if (isSecurityOn) {
  //         param['e'] = 'on';
  //     }else{
  //         param['e'] = 'off';
  //     }

  //     if (targetIP) {
  //         param['a'] = targetIP;
  //     }

  //     if (port) {
  //         param['P'] = port;
  //     }

  //     if (username) {
  //         param['u'] = username;
  //     }

  //     if (password) {
  //         param['pw'] = password;
  //     }

  //     if (destination) {
  //         param['D'] = destination;
  //     }

  //     //param['c'] = ?;
  //     //param['N'] = ?;
  //     //param['R'] = ?;
  //     //param['s'] = ?;

  //     angular.extend(param, customScheduleParams);

  //     return cmd;
  // }

  // /**
  //     #   [-t {daily|weekly|monthly}]
  //     #   [-d day [day...]]
  //     #   [-m month [month...] ]
  //     #   [-T start_time]
  //     #   [-mo modifier]
  //     #   [-sd start_date]
  //     #   [-ed end_date]
  //     #   [-r {on -p period {-et end_time |-du duration} | off}]
  //     Params:
  //         freq: String{daily|weekly|monthly}
  //         day: String
  //         month: String
  //         startTime: String
  //         modifier: String
  //         startDate: String
  //         endDate: String
  //         isRepeat: Boolean
  //         {
  //             period: String
  //             endTime: String
  //             duration: String
  //         }
  //   * part of customized schedule
  //   */
  // function createFSCustomizedSchedule(freq, day, month, startTime, modifier, startDate, endDate,
  //     isRepeat, period, endTime, duration){
  //     var param = {};
  //     if (freq) {
  //         param['t'] = freq;
  //     }

  //     if (day) {
  //         param['d'] = day;
  //     }

  //     if (month) {
  //         param['m'] = month;
  //     }

  //     if (startTime) {
  //         param['T'] = startTime;
  //     }

  //     if (modifier) {
  //         param['mo'] = modifier;
  //     }

  //     if (startDate) {
  //         param['sd'] = startDate;
  //     }

  //     if (endDate) {
  //         param['ed'] = endDate;
  //     }

  //     if (isRepeat) {
  //         param['r'] = 'on';
  //         if (period) {
  //             param['p'] = period;
  //         }
  //         if (endTime) {
  //             param['et'] = endTime;
  //         }
  //         if (duration) {
  //             param['du'] = duration;
  //         }
  //     }
  //     return param;
  // }


  // /*
  //   *
  //   *  # service options rsyncd <-z {a|b}@serviceID> [ -P port ] [ -u username [ -p password ] ] [-a <sharename> <path> [ -a <sharename> <path> ] ] [ -d sharename [ -d sharename ] ]
  //   *  fss service options rsyncd [-P:P] [-u:u] [-p:p] [-a:a] [-a:a] [-d:d] [-d:d]
  //   *
  //     Params:
  //         Port: String
  //         username: String
  //         password: String
  //         addsharename: String
  //         delsharename: String
  //   *
  //   */
  static setFsrsyncdOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForRysncd): RaidCliCmd {

    raidCliCmd.key = 'fsRsyncdServiceOptions';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // /*
  //   *
  //   * service options nis  [< -d domain > <-a ip_address >]
  //   * fsNISServiceOptions=fss service options nis [-d:d] [-a:a]
  //   *
  //     Params:
  //         domain: String
  //         ip_address: String
  //   *
  //   */
  static setFsNisOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForNis): RaidCliCmd {
    raidCliCmd.key = 'fsNISServiceOptions';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static setFsDnsDeleteOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FsDnsDeleteParam): RaidCliCmd {
    raidCliCmd.key = 'fsdnsDelete';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static setFsDnsAddOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FsDnsAddParam): RaidCliCmd {
    raidCliCmd.key = 'fsdnsAdd';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  //   * sysconfig tcpkeepalive [ -i nn{ s | m | h | d } ]
  //   * fsSetTcpkeepalive =fss sysconfig tcpkeepalive [-i:i]
  //   *
  //     Params:
  //         interval: String
  //   *
  //   */
  // function setTcpkeepalive(devID, _refRetunArr, _refParmArr, interval) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fsSetTcpkeepalive';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (interval) {
  //         param['i'] = interval;
  //     }
  //     return cmd;
  // }
  // /*
  //   * service options ftp [ -P port ] [ -l maxattempt ] [-s off | on  [ -e off | on [ -u on | off ] ] [ -f on | off ] [ -p port ] ]
  //   * fsFtpServiceOptions=fs service options ftp [-P:P] [-l:l] [-s:s] [-e:e] [-u:u] [-f:f] [-p:p]
  //   *
  //     Params:
  //         Port: String
  //         directory: String {home|root}
  //         maxattempt: String
  //         enableSSL: Boolean {on|off}
  //         explicit: String {on|off}
  //         unencrypted: String {on|off}
  //         Force: String {on|off}
  //         port: String
  //   *
  //   */
  static setFsFtpOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForFTP): RaidCliCmd {

    raidCliCmd.key = 'fsFtpServiceOptions';
    raidCliCmd.param = param;
    /*
    if (maxattempt) {
        param['l'] = maxattempt;
    }

    if(directory){
        param['d'] = directory;
    }

    if (enableSSL) {
        param['s'] = enableSSL;
        if(enableSSL == "on"){
            if (explicit) {
                param['e'] = explicit;
                if(explicit == "on"){
                    if (port) {
                        if(port == ""){
                            param['p'] = "990";
                        }else{
                            param['p'] = port;
                        }
                    }
                    if (unencrypted) {
                        param['u'] = unencrypted;
                    }
                }

            }

            if (force) {
                param['f'] = force;
            }
        }
    }

    if (Port) {
        param['P'] = Port;
    }*/

    return raidCliCmd;
  }

  // /*
  //   * service options cifs [-w workgroup][-p primarywins][-s secondarywins][-i interval]
  //   * fsCifsServiceOptions=fs service options cifs [-w:w] [-p:p] [-s:s] [-i:i]
  //   * Params:
  //   *         workgroup: String
  //   *         primarywins: String
  //   *         secondarywins: String
  //   *         interval: String
  //   */
  static setFsCifsOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForCIFS): RaidCliCmd {

    raidCliCmd.key = 'fsCifsServiceOptions';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // /*
  //   * service options afp [ -n name ] [ -m message ] [-p on | off ]
  //   * fsAfpServiceOptions=fs service options afp [-n:n] [-m:m] [-p:p]
  //   * Params:
  //   *         name: String
  //   *         message: String
  //   *         allowPassword: String {on|off}
  //   */
  static setFsAfpOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForAFP): RaidCliCmd {

    raidCliCmd.key = 'fsAfpServiceOptions';
    raidCliCmd.param = param;

    if (param.n) {
      param.n = '"' + param.n + '"';
    }

    if (param.m) {
      param.m = JSON.stringify(param.m);
    }

    return raidCliCmd;
  }

  // /*
  //   * service options nfs [ -v {all|2|3|4} ]
  //   * fsNfsServiceOptions=fs service options nfs [-v:v]
  //   * Params:
  //   *         version: String {all|2|3|4}
  //   */
  static setFsNfsOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForNFS): RaidCliCmd {

    raidCliCmd.key = 'fsNfsServiceOptions';
    raidCliCmd.param = param;

    return raidCliCmd;
  }
  // /*

  // /*
  //   * #hostchk name <-n hostname> [{-d domain | -a address}] <-u username> <-p password>
  //       * fshostnameBindCheck =hostchk name [-n:n] [-a:a] [-u:u] [-p:p] [-z:z] #hostnameBindCheck
  //   * Params:
  //   *         hostname: String
  //   *         domain: String
  //   *         domainIPaddress: String
  //   *         user: String
  //   *         z: String
  //   */
  // function getfshostnameBindCheck(devID, _refRetunArr, _refParmArr, hostname, domain, domainIPaddress, user,z) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fshostnameBindCheck';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (hostname) {
  //         param['n'] = hostname;
  //     }

  //     if (domain) {
  //         param['a'] = domain;
  //     }

  //     if (domainIPaddress) {
  //         param['u'] = domainIPaddress;
  //     }

  //     if (user) {
  //         param['p'] = user;
  //     }
  //     if (z) {
  //         param['z'] = z;
  //     }
  //     return cmd;
  // }

  /*
   * service options ad [ -t on | off ] { -a address | -d domain } [ -P port ] [ -s none | tls ] < -u username > < -p password >
   *         [ -A {2 | 3 | 4 | 5} ] < -c controller > <-i controller_addr> [ -h off | on -S pool [-q {none | size} ] ] [ -e {on|off } ]
   *         [ -m { server,backend;server,backend } ] [-b -1 ]
   *
   * fssServiceOptionsAd = fs service options ad
   *         [-t:t] [-a:a] [-d:d] [-P:P] [-s:s] [-u:u] [-p:p] [-A:A] [-c:c] [-i:i] [-h:h] [-S:S] [-q:q] [-e:e] [-m:m] [-b:b]
   *
   * Params:
   *         task: String {on|off}
   *         address: String
   *         domain: String
   *         port: String
   *         security: String {none|tls}
   *         username: String
   *         password: String
   *         authenticationLevel: String {2|3|4|5}
   *         controllerFQDN: String
   *         controllerIP: String
   *         homeDirectory: String {on|off}
   *         sourcePath: String
   *         quota: String {none|size}
   *         event: String {on|off}
   *         domainSelection: string
   *         singleBackendAD: string
   */
  static fssTaskOptionsAd(raidCliCmd: RaidCliCmd, param: fssCmd.FssTaskOptionsAdParam): RaidCliCmd {
    raidCliCmd.key = 'fsAdServiceOptions';

    raidCliCmd.param = param;

    return raidCliCmd;
  }

  static fssServiceOptionsAd(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionsAdParam): RaidCliCmd {
    raidCliCmd.key = 'fsAdServiceOptions';

    raidCliCmd.param = param;

    return raidCliCmd;
  }

  /*
   * service options ldap < -a address > [ -P port ] [ -s none | tls ] < -b base_dn > < -r root_dn > < -p password >
   *         [ -h off | on -S pool [ -q none | size ] ] [ -e {on | off} ]
   *
   * fssServiceOptionsLdap=service options ldap
   *         [-t:t] [-a:a] [-P:P] [-s:s] [-b:b] [-r:r] [-p:p] [-h:h] [-S:S] [-q:q] [-e:e]
   *
   * Params:
   *         task: String {on|off}
   *         address: String
   *         port: String
   *         security: String {none|tls}
   *         base_dn: String
   *         root_dn: String
   *         password: String
   *         homeDirectory: String {on|off}
   *         sourcePath: String
   *         quota: String {none|size}
   *         event: String {on|off}
   */
  static fssTaskOptionsLdap(raidCliCmd: RaidCliCmd, param: fssCmd.FssTaskOptionsLdapParam): RaidCliCmd {
    raidCliCmd.key = 'fsLDAPServiceOptions';

    raidCliCmd.param = param;

    return raidCliCmd;
  }

  static fssServiceOptionsLdap(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionsLdapParam): RaidCliCmd {
    raidCliCmd.key = 'fsLDAPServiceOptions';

    raidCliCmd.param = param;

    return raidCliCmd;
  }

  /*
   * # service start {for transitional period it would replace fssServiceStart}
   *
   * fssServiceStart = FSS service start [protocal]
   *
   * Params:
   *         protocal: String {for transitional period it would replace fssServiceStart}
   */
  static fssServiceStart(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceStartParam): RaidCliCmd {
    raidCliCmd.key = 'fssServiceStartForStatus';

    raidCliCmd.param = param;

    return raidCliCmd;
  }

  /*
   * # service stop {for transitional period it would replace fssServiceStop}
   *
   * fssServiceStop = FSS service stop [protocal]
   *
   * Params:
   *         protocal: String {for transitional period it would replace fssServiceStop}
   */
  static fssServiceStop(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceStopParam): RaidCliCmd {
    raidCliCmd.key = 'fssServiceStopForStatus';

    raidCliCmd.param = param;

    return raidCliCmd;
  }

  /*
   * # service start { cifs | ftp | sftp | nfs | afp | ldap | ad | nis | rsyncd | bonjour| webdav | oss}
   *
   * fssServiceStart = FSS service start [protocal]
   *
   * Params:
   *         protocal: String { cifs | ftp | sftp | nfs | afp | ldap | ad | nis | rsyncd | bonjour| webdav | oss}
   */
  static fssRefreshdu(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'fsrefreshdu';

    raidCliCmd.param = {};

    return raidCliCmd;
  }

  // * folder options <poolname> <foldername> [-r {size|full}] [-n new_name] [-m {on|off}] [-a {rw|ro}] [{-c path | -d path | -e name new_name}] [ -x subfolder description="xxxxxxxxxxx"]
  // * fssFolderOptions = FSS folder options [poolname] [foldername] [-r:r] [-n:n] [-m:m] [-a:a] [-c:c] [-d:d] [-e:e] [-x:x]
  // * [NOTE] if pool type is disk , -r/-m/-a can not use
  // * Params:
  // *         poolName: String
  // *         folderName: String
  // *         size: String {size|off}
  // *         new_name: String
  // *         mount: String {on|off}
  // *         access: String {rw|ro}
  // *         sub_folder_create: String
  // *         sub_folder_delete: Stirng
  // *         sub_folder_rename: Stirng
  // */
  static fssFolderOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssFolderOptionsParam): RaidCliCmd {
    raidCliCmd.key = 'fssFolderOptions';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /*
  * # folder ntacl [poolName] [volumeName] [-e]
  * FSS folder ntacl [poolname] [volumename] #FSPagelistFolder;FSFolder;;
  */
  static fssFolderNtacl(raidCliCmd: RaidCliCmd, param: fssCmd.FssFolderNtaclParam): RaidCliCmd {
    raidCliCmd.key = 'fssFolderNtacl';
    raidCliCmd.param = param;
    param.e = '';
    return raidCliCmd;
  }

  static fssFolderCreate(raidCliCmd: RaidCliCmd, param: fssCmd.FssFolderCreateParam): RaidCliCmd {
    raidCliCmd.key = 'fssFolderCreate';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /*
   * # service start {for transitional period it would replace fssServiceStart}
   * fssServiceStart = FSS service start [protocal]
   * Params:
   *         protocal: String {for transitional period it would replace fssServiceStart}
   */
  static fssServiceStartForStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceStopOrStart): RaidCliCmd {
    raidCliCmd.key = 'fssServiceStartForStatus';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  /*
   * # service stop {for transitional period it would replace fssServiceStop}
   * fssServiceStop = FSS service start [protocal]
   * Params:
   *         protocal: String {for transitional period it would replace fssServiceStop}
   */
  static fssServiceStopForStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceStopOrStart): RaidCliCmd {
    raidCliCmd.key = 'fssServiceStopForStatus';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // * # service options webdav [-P http_port] [-p https_port]
  // * fssServiceOptions =FSS service options webdav [-P:P] [-p:p]
  // * EX: service options webdav -P 80 -p 8080
  // * Params:
  // *         http_port:  String (80)
  // *         https_port: String (8080)
  // */
  // function setFsWebdavServiceOptions(devID, _refRetunArr, _refParmArr, http_port, https_port) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fsWebdavServiceOptions';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (http_port) {
  //         param['P'] = http_port;
  //     }

  //     if (https_port) {
  //         param['p'] = https_port;
  //     }

  //     return cmd;
  // }

  // /*
  // * # share folder_path
  // *    [    cifs {off|on [-a {on|off}] [-e {on|off}] [-n sharename]}                                 |
  // *        nfs {off|on [-h host][-p {ro|rw}] [-s [all|nrs|rs] [-m {async|sync}] [-g gid][-u uid]}    |
  // *        ftp {off|on}                                                                            |
  // *        sftp {off|on}                                                                            |
  // *        afp {off|on [-n sharename]}                                                                |
  // *        webdav {off|on [-n sharename]}                                                            |
  // *        oss {off|on}
  // *    ]
  // *fssShare=FSS share [folder_path] [protocal] [protocal_status] [-a:a] [-e:e] [-n:n] [-h:h] [-p:p] [-s:s] [-m:m] [-g:g] [-u:u]
  // * Params:
  // *         folder_path: String
  // *         protocal: String
  // *         protocal_status: String
  // *         access_based_enumeration: String {size|off}
  // *         SMB_encryption: String {size|off}
  // *         sharename: String
  // *         host: String
  // *         access_right: Stirng
  // *         squash: Stirng
  // *         sync_mode: String //remove
  // *         gid: String
  // *         uid: String
  // */
  static fssShare(raidCliCmd: RaidCliCmd, param: fssCmd.FssShareFolderParam): RaidCliCmd {
    raidCliCmd.key = 'fssShare';
    raidCliCmd.param = param;

    if (param.folder_path) {
      param.folder_path = '\"' + param.folder_path + '\"';
    }

    if (param.n) {
      param.n = '\"' + param.n + '\"';
    }

    if (param.d) {
      param.d = '"' + param.d + '"';
    }
    return raidCliCmd;
  }

  // /*
  // * # share options folder_path cifs [-a {on|off}] [-e {on|off}] [{-n share_name | -n="share_name"}]
  // * fssShareOptionsCifs=FSS share options [folder_path] [cifs] [-a:a] [-e:e] [-n=n] #FSShareStatus
  // */
  static fssShareOptionsCifs(raidCliCmd: RaidCliCmd, param: fssCmd.FssShareFolderParam): RaidCliCmd {
    raidCliCmd.key = 'fssShareOptionsCifs';
    raidCliCmd.param = param;

    if (param.folder_path) {
      param.folder_path = '"' + param.folder_path + '"';
    }

    if (param.n) {
      param.n = '"' + param.n + '"';
    }

    if (param.d) {
      param.d = '"' + param.d + '"';
    }
    return raidCliCmd;
  }

  // /*
  // * # share options folder_path nfs [{-h|-c}host_settings] [-p {ro|rw}] [-s {all|nrs|rs}] [-g gid] [-u uid]
  // * fssShareOptionsNfs=FSS share options [folder_path] [nfs] [-c:c] [-h:h] [-p:p] [-s:s] [-g:g] [-u:u] #FSShareStatus
  // */
  static fssShareOptionsNfs(raidCliCmd: RaidCliCmd, param: fssCmd.FssShareFolderParam): RaidCliCmd {
    raidCliCmd.key = 'fssShareOptionsNfs';
    raidCliCmd.param = param;

    if (param.folder_path) {
      param.folder_path = '\"' + param.folder_path + '\"';
    }

    if (param.d) {
      param.d = '"' + param.d + '"';
    }

    if (param.n) {
      param.n = '"' + param.n + '"';
    }

    return raidCliCmd;
  }

  // /*
  // * # share options folder_path afp [{-n share_name|-n="share_name"}]
  // * fssShareOptionsAfp=FSS share options [folder_path] [afp] [-n=n] #FSShareStatus
  // */
  static fssShareOptionsAfp(raidCliCmd: RaidCliCmd, param: fssCmd.FssShareFolderParam): RaidCliCmd {
    raidCliCmd.key = 'fssShareOptionsAfp';
    raidCliCmd.param = param;

    if (param.folder_path) {
      param.folder_path = '\"' + param.folder_path + '\"';
    }

    if (param.n) {
      param.n = '"' + param.n + '"';
    }
    return raidCliCmd;
  }

  // /*
  // * # share options folder_path webdav [{-n share_name | -n="share_name"}]
  // * fssShareOptionsWebDAV=FSS share options [folder_path] [webdav] [-n=n] #FSShareStatus
  // */
  // function fssShareOptionsWebDAV(devID, _refRetunArr, _refParmArr, folder_path, protocal, sharename) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssShareOptionsWebDAV';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if(folder_path){
  //         param['folder_path'] = "\""+folder_path+"\"";
  //     }

  //     if (protocal) {
  //         param['webdav'] = protocal;
  //     }

  //     if (sharename) {
  //         param['n'] = '"'+sharename+ '"';
  //     }
  //     return cmd;
  // }

  static fssShareOptionsFtp(raidCliCmd: RaidCliCmd, param: fssCmd.FssShareFolderParam): RaidCliCmd {
    raidCliCmd.key = 'fssShareOptionsFtp';
    raidCliCmd.param = param;

    if (param.folder_path) {
      param.folder_path = '"' + param.folder_path + '"';
    }

    if (param.n) {
      param.n = '"' + param.n + '"';
    }

    if (param.d) {
      param.d = '"' + param.d + '"';
    }
    return raidCliCmd;
  }
  // /*
  // * # acl set folder_path {{-u|-g} name [-i id]|-s {owner|group|other}} -a permission [-p]
  // * fssAclSet = FSS acl set [folder_path] [-u:u] [-g:g] [-i:i] [-s:s] [-a:a] [-p:p]
  // * Params:
  // *         folder_path: String
  // *         user_name: String
  // *         group_name: String
  // *         id : String
  // *         system_user: String
  // *         permission: String
  // *         Propagate: String
  // */
  // function fssAclSet(devID, _refRetunArr, _refParmArr, folder_path, user_name, group_name, id, system_user, permission, Propagate) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssAclSet';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (folder_path) {
  //         param['folder_path'] = "\""+folder_path+"\"";
  //     }

  //     if (user_name) {
  //         param['u'] = "\"" + user_name.replace(/\"/gi, '\\\"') + "\"";//user_name;;
  //     }

  //     if (group_name) {
  //         param['g'] = "\"" + group_name.replace(/\"/gi, '\\\"') + "\"";//group_name;;
  //     }

  //     if (system_user) {
  //         param['s'] = system_user;
  //     }

  //     if (id) {
  //         param['i'] = id;
  //     }

  //     if (permission) {
  //         param['a'] = permission;
  //     }

  //     if (Propagate) {
  //         param['p'] = '';
  //     }

  //     return cmd;
  // }

  // /*
  // * # acl delete folder_path {-u|-g} name
  // * fssAclDelete =FSS acl delete [folder_path] [-u:u] [-g:g] #FSPagelistFolder;
  // * Params:
  // *         folder_path: String
  // */
  // function fssAclDelete(devID, _refRetunArr, _refParmArr, folder_path, user_name, group_name) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssAclDelete';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (folder_path) {
  //         param['folder_path'] = "\""+folder_path+"\"";
  //     }

  //     if (user_name) {
  //         param['u'] = "\"" + user_name.replace(/\"/gi, '\\\"') + "\"";
  //     }

  //     if (group_name) {
  //         param['g'] = "\"" + group_name.replace(/\"/gi, '\\\"') + "\"";
  //     }

  //     return cmd;
  // }

  // function fssNtAclSet(devID, _refRetunArr, _refParmArr, folder_path, permission) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssNtAclSet';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (folder_path) {
  //         param['f'] = '"'+folder_path+'"';
  //     }
  //     if (permission) {
  //         param['a'] = permission;
  //     }else{
  //         param['a'] = '\"\"';
  //     }

  //     return cmd;
  // }
  // function fssNtAclReplace(devID, _refRetunArr, _refParmArr, folder_path, permission) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssNtAclReplace';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if (folder_path) {
  //         param['f'] = '"'+folder_path+'"';
  //     }
  //     if (permission) {
  //         param['a'] = permission;
  //     }else{
  //         param['a'] = '\"\"';
  //     }

  //     return cmd;
  // }

  static fssNexaclSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssNexaclSet): RaidCliCmd {
    raidCliCmd.key = 'fssNexacl';
    raidCliCmd.param = param;

    if (param.f) {
      param.f = '\"' + param.f + '\"';
    }
    if (param.a) {
      param.a = '\"' + param.a + '\"';
    }
    if (param.d) {
      param.d = '\"' + param.d + '\"';
    }

    return raidCliCmd;
  }

  // /**
  // *# create replica [name] [source-volume-type] [source-volume-ID] [target-volume-type] [target-volume-ID] [type=type] [priority=priority] [desc=desc] [incremental=incremental] [timeout=timeout] [compression=compression] [init=init] [si=si]
  // *
  // * refParmArr:  1. source-volume-ID
  // *              2. target-volume-ID
  // */
  static createReplica(raidCliCmd: RaidCliCmd, param: raidCmd.CreateReplicaParam): RaidCliCmd {
    raidCliCmd.key = 'createReplica';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  // * # set replica [volume-pair-ID] [op={operation}] [priority={level}] [name={replication-job-name}] [desc={description}] [timeout={value}]
  // * Params:
  // *     volumePairID: String
  // *     operation: String
  // *     priority: String
  // *     name: String
  // *     desc: String
  // *     timeout: String
  // *     si: String
  // */
  static setReplica(raidCliCmd: RaidCliCmd, param: raidCmd.SetReplicaParam): RaidCliCmd {
    raidCliCmd.key = 'setReplica';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  // * # setReplicaAutoMap=set replica [volume-pair-ID] [op=op] [ip=ip] [automap=automap] [checktime=checktime] [runfile=runfile]
  // *                                   [filename=filename] [mapto=mapto] [ch=ch] [target=target] [lun=lun] [hlun=hlun] [hostID=hostID]
  // *                                   [hostName=hostName] [alias=alias] [group=group] [mapPriority=mapPriority] [accessMode=accessMode] #Pair
  // * Params:
  // *     volumePairID: String
  // *     operation: String
  // *     automap: String
  // *     checktime: String
  // *     runfile: String
  // *     filename: String
  // *     mapto: String
  // *     ch: String
  // *     target: String
  // *     lun: String
  // *     hlun: String
  // *     hostID: String
  // *     hostName: String
  // *     alias: String
  // *     group: String
  // *     mapPriority: String
  // *     accessMode: String
  // */

  static setReplicaAutoMap(raidCliCmd: RaidCliCmd, param: raidCmd.SetReplicaParam): RaidCliCmd {
    raidCliCmd.key = 'setReplicaAutoMap';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  static deleteReplica(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteReplicaParam): RaidCliCmd {
    raidCliCmd.key = 'deleteReplica';
    raidCliCmd.param = param;
    raidCliCmd.param.y = ''; // always 'yes'
    return raidCliCmd;
  }
  // /*
  // * #delete replica [volume-pair-ID] [-y]
  // * Params:
  // *     volumePairID: String
  // */

  static unassignReplication(raidCliCmd: RaidCliCmd, param: raidCmd.UnassignReplicationParam): RaidCliCmd {
    raidCliCmd.key = 'unassignReplication';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /*
  // * # set remote [ld | part] [LD-index | partition-ID] [-d] [-y]
  // * Params:
  // *     type: ld or part in String
  // *    id: ld or part id String
  // */


  // //showDiagnostic = show diagnostic [device-ID] [count=packet-amount] [output=filename] [-p:p] [-a:a] [type=source-type]
  static showDiagnostic(raidCliCmd: RaidCliCmd, param: raidCmd.ShowDiagnosticParam): RaidCliCmd {
    raidCliCmd.key = 'showDiagnostic';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static getReplicateChannelSelectSetting(raidCliCmd: RaidCliCmd, param?: any): RaidCliCmd {
    raidCliCmd.key = 'showRRchannel';
    raidCliCmd.param = param ? param : {};
    return raidCliCmd;
  }

  static setRRChannel(raidCliCmd: RaidCliCmd, param: raidCmd.SetRRChannelParam): RaidCliCmd {
    raidCliCmd.key = 'setRRchannel';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  // // sysconfig pwdpolicy [on|off] [-L n] [-p n] [-w n] [-n n] [-c n] [-u n] [-l n] [-d n] [-s n]
  static fssConfigPasswdPolicy(raidCliCmd: RaidCliCmd, param: fssCmd.FssConfigPasswdPolicyParam): RaidCliCmd {
    const processedParam: any = {};

    raidCliCmd.key = 'fssSysconfigPwdpolicy';
    processedParam.switch = param.isPolicy ? 'on' : 'off';
    processedParam.L = param.minLenth;
    processedParam.p = param.expireDay;
    processedParam.w = param.warnDay;
    processedParam.n = param.numHistory;
    processedParam.c = param.minChar;
    processedParam.u = param.minUpperChar;
    processedParam.l = param.minLowerChar;
    processedParam.d = param.minDigit;
    processedParam.s = param.minSpecialChar;
    if (param.allowLocalUserChangePassword !== null) {
      processedParam.a = param.allowLocalUserChangePassword;
    }
    raidCliCmd.param = processedParam;
    return raidCliCmd;
  }

  static fssConfigRah(raidCliCmd: RaidCliCmd, param: fssCmd.FssConfigRahParam): RaidCliCmd {
    raidCliCmd.key = 'fssSysconfigRah';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static setWritePolicyOnSingleController(raidCliCmd: RaidCliCmd, param: fssCmd.FssDiskFlushParam): RaidCliCmd {
    raidCliCmd.key = 'fssDiskFlush';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssModPasswd(raidCliCmd: RaidCliCmd, param: fssCmd.FssModPasswdParam): RaidCliCmd {
    const processedParam: any = {};

    raidCliCmd.key = 'fssPasswdMod';
    processedParam.login_name = param.login_name;
    processedParam.p = '\"' + param.p.replace(/\"/gi, '\\\"') + '\"';
    raidCliCmd.param = processedParam;
    return raidCliCmd;
  }
  /* useradmin group add group_name [-i gid] [-u loing_name1 [login_name2 ...]] [???c comment] */
  static fssGroupAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssGroupAddParam): RaidCliCmd {
    const processedParam: any = {};

    raidCliCmd.key = 'fssUserAdminGroupAdd';
    processedParam.group_name = param.group_name;
    if (param.userNameArr.length > 0) {
      processedParam.u = param.userNameArr.join(' ');
    }
    if (param.gdesc !== '') {
      let gdesc:string = (param.gdesc) || "";
      processedParam.c = '\"' +gdesc.replace(/\"/gi, '\\\"') + '\"';
    }
    raidCliCmd.param = processedParam;
    return raidCliCmd;
  }
  /* useradmin group delete group_name*/
  static fssGroupDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssGroupDeleteParam): RaidCliCmd {
    raidCliCmd.key = 'fssUserAdminGroupDelete';
    raidCliCmd.param = param;
    return raidCliCmd;
  }
  /* useradmin group rename <group_name> <-n new_name> */
  static fssGroupRename(raidCliCmd: RaidCliCmd, param: fssCmd.FssGroupRenameParam): RaidCliCmd {
    raidCliCmd.key = 'fssUserAdminGroupRename';
    raidCliCmd.param = param;
    return raidCliCmd;
  }
  /* useradmin group modify groupname [-i gid] [-n new_name][-c description]
      -i: group ID. It can???t be changed. It is used to find the correct group.
      -n: The new name of the group.
      -c: Description.*/
  static fssGroupModify(raidCliCmd: RaidCliCmd, param: fssCmd.FssGroupModifyParam): RaidCliCmd {
    const processedParam: any = {};

    raidCliCmd.key = 'fssUserAdminGroupModify';
    processedParam.groupname = param.groupname;
    processedParam.n = param.n;
    processedParam.c = '\"' + param.c.replace(/\"/gi, '\\\"') + '\"';
    raidCliCmd.param = processedParam;
    return raidCliCmd;
  }
  /* # useradmin group adduser/deluser <group_name> <login_name1> [login_name2 ...] */
  static fssGroupAddDeluser(raidCliCmd: RaidCliCmd, param: fssCmd.FssGroupAddDeleteUserParam, opType: 'add' | 'delete'): RaidCliCmd {
    const processedParam: any = {};
    if (opType === 'add') {
      raidCliCmd.key = 'fssUserAdminGroupAdduser';
    } else {
      raidCliCmd.key = 'fssUserAdminGroupDelUser';
    }
    processedParam.group_name = param.group_name;
    if (param.userNameArr.length > 0) {
      processedParam.userNames = param.userNameArr.join(' ');
    }
    raidCliCmd.param = processedParam;
    return raidCliCmd;
  }
  /* useradmin user add/modify <login_name> [-i uid] [-c comment] <-password
          [-g group1 [group2 ...]] [-s on|off] [-d {off|on [fullpath] [-f]}
          [-e {0|30|60|90|120}]
  */
  static fssAddEditUser(raidCliCmd: RaidCliCmd, param: fssCmd.FssAddEditUserParam): RaidCliCmd {
    const processedParam: any = {};

    raidCliCmd.key = 'fssUserAdminDelUser';
    processedParam.login_name = param.name;
    processedParam.c = '\"' + param.desc.replace(/\"/gi, '\\\"') + '\"';
    if (param.groupStr !== '') {
      processedParam.g = param.groupStr.replace(/,/g, ' ');
    }
    processedParam.s = 'off';
    if (param.isSuper) {
      processedParam.s = 'on';
    }
    processedParam.e = 0;
    if (param.isExpiration) {
      processedParam.e = param.expiration;
    }
    if (param.isExpiryNotification !== undefined && param.expiryNotification !== undefined) {
      if (param.isExpiryNotification) {
        processedParam.w = param.expiryNotification;
      } else {
        processedParam.w = 0;
      }
    }
    if (param.type === 'Add') {
      raidCliCmd.key = 'fssUserAdminAddUser';
      processedParam.p = '\"' + param.pwd.replace(/\"/gi, '\\\"') + '\"';
      if (param.dirType === 'noHomeDir') {
        processedParam.d = 'off';
      } else {
        processedParam.d = 'on ' + param.directory;
        if (param.dirType === 'newHomeDir') {
          processedParam.f = '';
        }
      }
    } else {
      raidCliCmd.key = 'fssUserAdminModifyUser';
      if (param.dirType !== null && param.dirType !== 'noHomeDir') {
        processedParam.d = 'on ' + param.directory;
        if (param.dirType === 'newHomeDir') {
          processedParam.f = '';
        }
      }
    }

    raidCliCmd.param = processedParam;
    return raidCliCmd;
  }
  /*useradmin user delete <login_name> [-d]*/
  static fssDeleteUser(raidCliCmd: RaidCliCmd, param: fssCmd.FssUserDeleteParam): RaidCliCmd {
    const processedParam: any = {};

    raidCliCmd.key = 'fssUserAdminDelUser';
    processedParam.login_name = param.login_name;
    if (param.d) {
      processedParam.d = '';
    }
    raidCliCmd.param = processedParam;
    return raidCliCmd;
  }
  // ifconfig inet [controller] [interface] [policy] [ip] netmask [netmask]
  fssSetChannliNet(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetChanneliNetParam) {
    raidCliCmd.key = 'fssIfconfigInetSet';
    raidCliCmd.param = param;
    if (param.chNum === 'mgmt0') {
      param.interface = 'mgmt0';
    } else if (param.chNum.indexOf('trunk') > -1) {// set ip for nas trunk
      param.interface = param.chNum;
    } else if (param.chNum.indexOf('vch') > -1) {// set ip for vlan
      param.interface = param.chNum;
    } else {
      param.interface = 'ch' + param.chNum;
    }
    if (param.policy === 'Static') {
      param.policy = 'static';
      if (param.netmask) {
        param.netmask = 'netmask ' + param.netmask;
      }
      if (param.gateway) {
        param.gateway = 'gateway ' + param.gateway;
      }
    } else {
      param.policy = 'dhcp';
    }
    return raidCliCmd;
  }

  fssSetChannlIPv6iNet(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetChannelIPv6iNetParam) {
    raidCliCmd.key = 'fssIfconfiginet6Set';
    raidCliCmd.param = param;

    if (param.policy === 'Disabled') {
      param.policy = 'unplumb';
    } else if (param.policy === 'Static') {
      param.policy = 'static';
      if (param.prefix) {
        param.prefix = ' prefix ' + param.prefix;
      }
      if (param.route) {
        param.route = ' route ' + param.route;
      }
    } else {
      param.policy = 'plumb';
    }
    if (param.chNum === 'mgmt0') {
      param.interface = 'mgmt0';
    } else if (param.chNum.indexOf('trunk') > -1) { // set ip for nas trunk
      param.interface = param.chNum;
    } else if (param.chNum.indexOf('vch') > -1) { // set ip for vlan
      param.interface = param.chNum;
    } else {
      param.interface = 'ch' + param.chNum;
    }
    return raidCliCmd;
  }

  static fssSetDladm(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetDladmParam): RaidCliCmd {
    raidCliCmd.key = 'fssDladmSet';
    raidCliCmd.param = param;
    param.p = 'mtu=' + param.p;
    return raidCliCmd;
  }

  static fssSetDladmConfOnly(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetDladmConfOnlyParam): RaidCliCmd {
    raidCliCmd.key = 'fssDladmSetConfOnly';
    raidCliCmd.param = param;
    param.p = 'mtu=' + param.p;
    return raidCliCmd;
  }

  /* # route delete <-z {a|b}@serviceID> <-t {static|dynamic}><-n destination> [-m netmask] [-g gateway] [-i interface]
    * fssRouteDelete=FSS route delete [-t:t] [-n:n] [-m:m] [-g:g] [-i:i] #FSRoute
    */
  static fssRouteDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssRouteDeleteParam): RaidCliCmd {
    raidCliCmd.key = 'fssRouteDelete';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /* # route add <-z {a|b}@serviceID> <-t {static|dynamic}> <-n destination> [-m netmask] [-g gateway] [-i interface]
    * fssRouteAdd=FSS route add [-t:t] [-n:n] [-m:m] [-g:g] [-i:i] #FSRoute
    */
  static fssRouteAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssRouteAddParam): RaidCliCmd {
    raidCliCmd.key = 'fssRouteAdd';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /* # route delete <-z {a|b}@serviceID> <-t {static|dynamic}><-n destination> [-m netmask] [-g gateway] [-i interface]
    * fssRouteDelete=FSS route delete [-t:t] [-n:n] [-m:m] [-g:g] [-i:i] #FSRoute
    */
  static fssRouteDeleteRedundant(raidCliCmd: RaidCliCmd, param: fssCmd.FssRouteDeleteRedundantParam): RaidCliCmd {
    raidCliCmd.key = 'fssRouteDeleteRedundant';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /* # route add <-z {a|b}@serviceID> <-t {static|dynamic}> <-n destination> [-m netmask] [-g gateway] [-i interface]
    * fssRouteAdd=FSS route add [-t:t] [-n:n] [-m:m] [-g:g] [-i:i] #FSRoute
    */
  static fssRouteAddRedundant(raidCliCmd: RaidCliCmd, param: fssCmd.FssRouteAddRedundantParam): RaidCliCmd {
    raidCliCmd.key = 'fssRouteAddRedundant';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  // fssSyslogOptions = FSS syslog options [-p:p] [-n:n] [-s:s] [-f:f] [-l:l] #FSSyslog
  //   */
  // function fssSyslogOptions(devID, _refRetunArr, _refParmArr, service ,port, size, folder_path) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssSyslogOptions';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['p'] = service;
  //     param['n'] = port;
  //     param['s'] = size;
  //     param['f'] = '\"' + folder_path + '\"';
  //     //          param['l'] = level;
  //     return cmd;
  // }

  // /**
  // fssSyslogAct = FSS syslog act [-a:a] #FSSyslog
  //   */
  // function fssSyslogAct(devID, _refRetunArr, _refParmArr, act) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssSyslogAct';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['a'] = act;
  //     return cmd;
  // }

  // /**
  // fssSyslogStatus = FSS syslog status
  //   */
  // function fssSyslogStatus(devID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssSyslogStatus';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;
  // }

  // /**
  //     fssSyslogView = FSS syslog view [-p:p] [-l:l]
  //   */
  // function fssSyslogView(devID, _refRetunArr, _refParmArr, page ,events) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssSyslogView';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['z'] = page;
  //     param['l'] = events;
  //     return cmd;
  // }

  // /**
  // fssBwlistAddHost = FSS bwlist add host [-m:m] [-a:a] #FSBwlist
  //   */
  // function fssBwlistAddHost(devID, _refRetunArr, _refParmArr, bwlist ,ip) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssBwlistAddHost';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['m'] = bwlist;
  //     param['a'] = ip;
  //     return cmd;
  // }

  // /**
  // fssBwlistAddSubnet = FSS bwlist add subnet [-m:m] [-n:n] [-M:M] #FSBwlist
  //   */
  // function fssBwlistAddSubnet(devID, _refRetunArr, _refParmArr, bwlist , subnet, netmask) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssBwlistAddSubnet';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['m'] = bwlist;
  //     param['n'] = subnet;
  //     param['M'] = netmask;

  //     return cmd;
  // }

  // /**
  // fssBwlistAddIprange = FSS bwlist add iprange [-m:m] [-F:F] [-T:T] #FSBwlist
  //   */
  // function fssBwlistAddIprange(devID, _refRetunArr, _refParmArr, bwlist , startIP, endIP) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssBwlistAddIprange';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['m'] = bwlist;
  //     param['F'] = startIP;
  //     param['T'] = endIP;

  //     return cmd;
  // }

  // /**
  // fssBwlistAddCountry = FSS bwlist add country [-m:m] [-c:c] #FSBwlist
  //   */
  // function fssBwlistAddCountry(devID, _refRetunArr, _refParmArr, bwlist , country) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssBwlistAddCountry';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['m'] = bwlist;
  //     param['c'] = country;

  //     return cmd;
  // }

  // /**
  // fssBwlistDelete = FSS bwlist delete [-m:m] [-u:u] #FSBwlist
  //   */
  // function fssBwlistDelete(devID, _refRetunArr, _refParmArr, bwlist , uid) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssBwlistDelete';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['m'] = bwlist;
  //     param['u'] = uid;

  //     return cmd;
  // }

  // /**
  // fssBwlistOptions = FSS bwlist options [-s:s] [-m:m] #FSBwlist
  //   */
  // function fssBwlistOptions(devID, _refRetunArr, _refParmArr, status, bwlist) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssBwlistOptions';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     if(status)
  //         param['s'] = status;
  //     if(bwlist)
  //         param['m'] = bwlist;

  //     return cmd;
  // }

  // // ipblock delete {all | <-a ip1 [ip2 ...] > }
  // function fssIPBlockDelete(devID, _refRetunArr, _refParmArr, IPList)
  // {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssIPBlockDelete';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['a'] = IPList;

  //     return cmd;
  // }

  // // ipblock options [-s {on | off}] [-l n] [-i m] [-p { h | d | w | f }]
  // function fssIPBlockOptions(devID, _refRetunArr, _refParmArr, status, loginAttempts, checkingInterval, period)
  // {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssIPBlockOptions';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if(status)
  //         param['s'] = status;
  //     if(loginAttempts)
  //         param['l'] = loginAttempts;
  //     if(checkingInterval)
  //         param['i'] = checkingInterval;
  //     if(period)
  //         param['p'] = period;

  //     return cmd;
  // }

  static mute(raidCliCmd: RaidCliCmd, param: raidCmd.MuteParam): RaidCliCmd {
    raidCliCmd.key = 'mute';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // // hostname [controller] [name]
  static fssHostName(raidCliCmd: RaidCliCmd, param: fssCmd.FssHostNameParam): RaidCliCmd {
    raidCliCmd.key = 'fssHostName';
    raidCliCmd.param = param;
    return raidCliCmd;
  }
  // function fssHostName(devID,  _refRetunArr, _refParmArr, hostName, ctlr){

  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssHostName';
  //     cmd.devID = devID;
  //     cmd.param = param;

  //     param['controller'] = ctlr;
  //     param['name'] = hostName;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;

  // }

  // // FSS disk expand [disk_id]
  static fssDiskExpand(raidCliCmd: RaidCliCmd, param: fssCmd.FssDiskExpandParam): RaidCliCmd {
    raidCliCmd.key = 'fssDiskExpand',
      raidCliCmd.param = param;
    return raidCliCmd;
  }

  // //# utility check sed-key [sed-key] [ld={ld-index}] [-f]
  static checkSedKey(raidCliCmd: RaidCliCmd, param: raidCmd.CheckSedKeyParam): RaidCliCmd {
    raidCliCmd.key = 'checkSedKey';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * #  create flush part [partition-ID] [ip] [os-type] [disk={disk-index-list}]
  //   * createFlush=create flush part [partition-ID] [ip] [os-type] [disk=disk] #Partition
  //   */
  static createFlush(raidCliCmd: RaidCliCmd, param: raidCmd.CreateFlushParam): RaidCliCmd {
    raidCliCmd.key = 'createFlush';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * #  set flush part [partition-ID] [index] [ip={ip}] [os={type}] [disk={disk-index}]
  //   * setFlushPart = set flush part [partition-ID] [index] [ip=ip] [os=os] [disk=disk]#Partition;Flush
  //   */
  static setFlushPart(raidCliCmd: RaidCliCmd, param: raidCmd.SetFlushParam): RaidCliCmd {
    raidCliCmd.key = 'setFlushPart';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * # delete flush part [partition-ID] [index]
  //   * deleteFlush=delete flush part [partition-ID] [index] #Partition;Flush
  //   */
  static deleteFlush(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteFlushParam): RaidCliCmd {
    raidCliCmd.key = 'deleteFlush';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  // /**
  //   * #ldapserver host start/stop/restart/initialize <-z {a|b}@serviceID>
  //   * fssLDAPServerSetting = FSS ldapserver host [op-type] #FSLDAPServer
  //   */
  // function fssLDAPServerSetting(devID, _refRetunArr, _refParmArr, opType) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPServerSetting';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['op-type'] = opType;
  //     return cmd;
  // }

  // /**
  //   * #ldapserver host options [-d domain_name] [-p passwd] <-z {a|b}@serviceID>
  //   * fssLDAPServerOptions = FSS ldapserver host options [-d:d] [-p:p] #FSLDAPServer
  //   */
  // function fssLDAPServerOptions(devID, _refRetunArr, _refParmArr ,domainName, passwd) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPServerOptions';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['d'] = domainName;
  //     param['p'] = passwd;
  //     return cmd;
  // }

  // //vpn config <-z {a|b}@serviceID> [ [-p ip_pool] [-x max_conn] [-a {mschap|pap}] <-k psk> [-d dns_ip] ]
  // //#FSS vpn config [-p:p] [-x:x] [-a:a] [-k:k] [-d:d]
  // function fssVPNServerShowConfig(devID, _refRetunArr, _refParmArr ,psk, ip_pool, max_conn, auth, dns_ip, controller) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssVPNSetConfig';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['k'] = psk;
  //     param['p'] = ip_pool;
  //     param['x'] = max_conn;
  //     param['a'] = auth;
  //     param['controller'] = controller;
  //     if(dns_ip !== '...')
  //         param['d'] = dns_ip;
  //     else
  //         param['d'] = 'None';
  //     return cmd;
  // }

  // function fssVPNUserRefresh(devID, _refRetunArr, _refParmArr, controller){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssVPNView';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['controller'] = controller;
  //     return cmd;
  // }

  // function fssVPNServerAct(devID, _refRetunArr, _refParmArr, opType, controller){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssVPNAct';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['a'] = opType;
  //     param['controller'] = controller;
  //     return cmd;
  // }

  // function fssVPNStop(devID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssVPNStop';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;
  // }


  // //fssVPNCut = FSS vpn cut [-c:c]
  // function fssVPNServerCut(devID, _refRetunArr, _refParmArr, cli_ip, controller){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssVPNCut';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['c'] = cli_ip;
  //     param['controller'] = controller;
  //     return cmd;
  // }

  // function fssVPNMsChap(devID, _refRetunArr, _refParmArr, domain, controller){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssVPNMsChap';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['u'] = domain;
  //     param['controller'] = controller;
  //     return cmd;
  // }



  /**
   *    worm set <-z {a|b}@serviceID> <-v vloume> <-m {com|ent}> <-r lock_period> <-a autolock_time>
   */
  static fssWormSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssWormSetParam): RaidCliCmd {
    raidCliCmd.key = 'fssWormSetParam';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  /**
   *    FSS worm gclk [-s:s] [-g:g] [-i:i]
   */
  static fssWormGclk(raidCliCmd: RaidCliCmd, param: fssCmd.FssWormGclkParam): RaidCliCmd {
    raidCliCmd.key = 'fssWormGclk';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // function fssRecycleBinSetConfig(devID, _refRetunArr, _refParmArr, action, retentionDay, checkTime ){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssRecycleBinSetConfig';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['e']=action;
  //     if(retentionDay)
  //         param['r']=retentionDay;
  //     if(checkTime)
  //         param['c']=checkTime;

  //     return cmd;
  // }

  // function fssRecycleBinFolderEnable(devID, _refRetunArr, _refParmArr, controller, sharename){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssRecycleBinFolderEnable';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['s']="\""+sharename+"\"";

  //     if(controller){
  //         param['controller'] = controller;
  //     }

  //     return cmd;
  // }

  // function fssRecycleBinFolderDisable(devID, _refRetunArr, _refParmArr, controller, sharename){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssRecycleBinFolderDisable';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['s']="\""+sharename+"\"";

  //     if(controller){
  //         param['controller'] = controller;
  //     }

  //     return cmd;
  // }

  // function fssRecycleBinClear(devID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssRecycleBinClear';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;
  // }

  // function fssRecycleBinRecover(devID, _refRetunArr, _refParmArr, controller, sharename, path){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssRecycleBinRecover';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['s']="\""+sharename+"\"";
  //     param['f']=path;

  //     if(controller){
  //         param['controller'] = controller;
  //     }

  //     return cmd;
  // }

  // function fssRecycleBinPrivSet(devID, _refRetunArr, _refParmArr, controller, sharename, permission){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssRecycleBinPrivSet';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['a']=permission;
  //     param['s']="\""+sharename+"\"";

  //     if(controller){
  //         param['controller'] = controller;
  //     }

  //     return cmd;
  // }


  // /*
  //   *#recyclebin config <-z {a|b}@serviceID> [-f share_name] [-s {disable|enable}]
  // */
  // function fssRecycleBinConfig(devID, _refRetunArr, _refParmArr, sharename , action ){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssRecycleBinConfig';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.priority = 0;
  //     cmd.param = param;
  //     if(sharename){
  //         param['f'] = "\"" + sharename.replace(/\"/gi, '\\\"') + "\"";
  //     }
  //     if(action){
  //         param['s'] = action;
  //     }
  //     return cmd;

  // }

  // /*
  //   *# recyclebin create <-z {a|b}@serviceID> <-n schedule_name> <-f share_name1 [,share_name2\u2026]> <-T {start_time|C}> <-sd {start_date|C}> <-t { once | daily | weekly | monthly } [-et {end_time|E}] [-ed {end_date|E}]> <-r {all|old <-ld day>|size <-ts threshold> <-pr {large|old}>}>
  // */
  // function fssRecycleBinAdd(devID, _refRetunArr, _refParmArr, shareName, policy, day, threshold, priority){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssRecycleBinCreate';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(shareName){
  //         param['f'] = "\"" + shareName.replace(/\"/gi, '\\\"') + "\"";
  //     }

  //     if(policy){
  //         param['r'] = policy;
  //     }

  //     if(day){
  //         param['ld'] = day;
  //     }

  //     if(threshold){
  //         param['ts'] = threshold;
  //     }

  //     if(priority){
  //         param['pr'] = priority;
  //     }
  //     return cmd;
  // }

  // /*
  //   *# recyclebin option <-z {a|b}@serviceID> <-n schedule_name> [-f share_name1 [,share_name2??�]] [-T {start_time|C}] [-t { once| daily | weekly | monthly } [-et {end_time|E}][-ed {end_date|E}]] [-r {all|old <-ld day>|size <-ts threshold> <-pr {large|old}>}]
  // */
  // function fssRecycleBinEdit(devID, _refRetunArr, _refParmArr, shareName, policy, day, threshold, priority){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssRecycleBinOption';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(shareName){
  //         param['f'] = "\"" + shareName.replace(/\"/gi, '\\\"') + "\"";
  //     }

  //     if(policy){
  //         param['r'] = policy;
  //     }

  //     if(day){
  //         param['ld'] = day;
  //     }

  //     if(threshold){
  //         param['ts'] = threshold;
  //     }

  //     if(priority){
  //         param['pr'] = priority;
  //     }
  //     return cmd;
  // }

  // /*
  //   *recycle_bin delete <-z {a|b}@serviceID> <-n share_name>
  // */
  // function fssRecycleBinDel(devID, _refRetunArr, _refParmArr, scheduleName){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssRecycleBinDelete';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(scheduleName){
  //         param['n'] = scheduleName;
  //     }
  //     return cmd;
  // }

  // /**
  //   * # ldapserver group add <-g group1> [-d description] <-z {a|b}@serviceID>
  //   * fssLDAPServerGroupAdd = FSS ldapserver group add [-g:g] [-d:d]
  //   */
  // function fssLDAPServerGroupAdd(devID, _refRetunArr, _refParmArr ,groupName, description) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPServerGroupAdd';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['g'] = groupName;
  //     param['d'] = "\"" + description.replace(/\"/gi, '\\\"') + "\"";

  //     return cmd;
  // }

  // /**
  //   * # ldapserver group edit <-g group> [-d description] [-au user1 [user2... ] [-du usera [userb ...] ] <-z {a|b}@serviceID>
  //   * fssLDAPServerGroupEdit = FSS ldapserver group edit [-g:g] [-d:d] [-au:au] [-du:du]
  //   */
  // function fssLDAPServerGroupEdit(devID, _refRetunArr, _refParmArr ,groupName, description, addUserList, delUserList) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPServerGroupEdit';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(groupName)
  //         param['g'] = groupName;
  //     if(description)
  //         param['d'] = "\"" + description.replace(/\"/gi, '\\\"') + "\"";
  //     if(addUserList)
  //         param['au'] = Tool.convertArrayToString(addUserList, " ");
  //     if(delUserList)
  //         param['du'] = Tool.convertArrayToString(delUserList, " ");

  //     return cmd;
  // }

  // /**
  //   * # ldapserver group delete <-g group> <-z {a|b}@serviceID>
  //   * fssLDAPServerGroupDelete = FSS ldapserver group delete [-g:g]
  //   */
  // function fssLDAPServerGroupDelete(devID, _refRetunArr, _refParmArr ,groupName) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPServerGroupDelete';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['g'] = Tool.convertArrayToString(groupName, " ");

  //     return cmd;
  // }

  // /**
  //   * # ldapserver user add <-u user> <-p passwd> [-d description] [-m emailaddr] <-z {a|b}@serviceID>
  //   * fssLDAPServerUserAdd = FSS ldapserver user add [-u:u] [-p:p] [-d:d] [-m:m]
  //   */
  // function fssLDAPServerUserAdd(devID, _refRetunArr, _refParmArr ,userName, password, description, email) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPServerUserAdd';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['u'] = userName;
  //     param['p'] = "\"" + password.replace(/\"/gi, '\\\"') + "\"";

  //     if(description)
  //         param['d'] = "\"" + description.replace(/\"/gi, '\\\"') + "\"";
  //     if(email)
  //         param['m'] = email;

  //     return cmd;
  // }

  // /**
  //   * # ldapserver user batch <-u name_prefix> <-s start_num> <-n number> [-o {on | off}] <-p password> [-l {on | off}] [-m {on | off}] [-e {on | off}][-d {date | now}] <-z {a|b}@serviceID>
  //   * fssLDAPServerUserBatch = FSS ldapserver user batch [-u:u] [-s:s] [-n:n] [-o:o] [-p:p] [-l:l] [-m:m] [-e:e] [-d:d]
  //   */
  // function fssLDAPServerUserBatch(devID, _refRetunArr, _refParmArr ,namePrefix, startName, number, overwrite, password, changePwFirst, canChangePw, accExpiration, date) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPServerUserBatch';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['u'] = namePrefix;
  //     param['s'] = startName;
  //     param['n'] = number;
  //     param['o'] = overwrite;
  //     param['p'] = "\"" + password.replace(/\"/gi, '\\\"') + "\"";
  //     param['l'] = changePwFirst;
  //     param['m'] = canChangePw;
  //     param['e'] = accExpiration;
  //     if(accExpiration=='on')
  //         param['d'] = date;
  //     return cmd;
  // }

  // /* importFssfile = import fssfile [type] [file-path] [overwrite] */
  // function fssLDAPServerUserImport(devID, _refRetunArr, _refParmArr, fpath, overwrite){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'importFssfile';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['type'] = 'ldapServer_user';
  //     param['file-path'] = "\""+fpath+"\"";
  //     param['overwrite'] = overwrite;

  //     return cmd;
  // }

  // /**
  //   * # ldapserver user edit <-u user> [-p passwd] [-d description] [-m emailaddr] [-jg group1 [group2 ...] ] [-lg groupa [groupb ...] ] <-z {a|b}@serviceID>
  //   * fssLDAPServerUserEdit = FSS ldapserver user edit [-u:u] [-p:p] [-d:d] [-m:m] [-jg:jg] [-lg:lg]
  //   */
  // function fssLDAPServerUserEdit(devID, _refRetunArr, _refParmArr ,userName, password, description, email, joinGroup, leaveGroup) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPServerUserEdit';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['u'] = userName;
  //     if(password)
  //         param['p'] = "\"" + password.replace(/\"/gi, '\\\"') + "\"";
  //     if(description)
  //         param['d'] = "\"" + description.replace(/\"/gi, '\\\"') + "\"";
  //     if(email)
  //         param['m'] = email;
  //     if(joinGroup)
  //         param['jg'] = Tool.convertArrayToString(joinGroup, " ");
  //     if(leaveGroup)
  //         param['lg'] = Tool.convertArrayToString(leaveGroup, " ");

  //     return cmd;
  // }

  // /**
  //   * # ldapserver group delete <-g group> <-z {a|b}@serviceID>
  //   * fssLDAPServerGroupDelete = FSS ldapserver group delete [-g:g]
  //   */
  // function fssLDAPServerUserDelete(devID, _refRetunArr, _refParmArr ,userName) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPServerUserDelete';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['u'] = Tool.convertArrayToString(userName, " ");

  //     return cmd;
  // }

  // /**
  //   * # ldapserver user options <-u user> [-l {on | off}] [-m {on | off}] [-e {on | off}] [-d {date | now}] <-z {a|b}@serviceID>
  //   * fssLDAPServerUserOptions = FSS ldapserver user options [-u:u] [-l:l] [-m:m] [-e:e] [-d:d]
  //   */
  // function fssLDAPServerUserOptions(devID, _refRetunArr, _refParmArr ,userName, changePwFirst, canChangePw, accExpiration, date) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPServerUserOptions';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['u'] = userName;
  //     param['l'] = changePwFirst;
  //     param['m'] = canChangePw;
  //     param['e'] = accExpiration;
  //     if(accExpiration=='on')
  //         param['d'] = date;

  //     return cmd;

  // }

  // /**
  //   * #ldapserver backup [-s {on | off}] [-p {daily | mon | tue | wed | thu | fri | sat | sun } [-t hhmm] [-f folder_path] [-n filename] [-m {single | multi}]
  //   * fssLDAPserverBackup = FSS ldapserver backup [-s:s] [-p:p] [-t:t] [-f:f] [-n:n] [-m:m]
  //   */
  // function fssLDAPserverBackup(devID, _refRetunArr, _refParmArr ,start, period, time, outputFolder) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPserverBackup';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['s'] = start;
  //     param['p'] = period;
  //     param['t'] = time;
  //     param['f'] = "\""+outputFolder+"\"";
  //     //            param['n'] = filename;use default setting
  //     //            param['m'] = mode;
  //     return cmd;

  // }

  // /**
  //   * export ldapdb [srcFileName] [dstFilePath]
  //   * exportLDAPDBFile = export ldapdb [srcFileName] [dstFilePath]
  //   * m209 get ldap server backup file from NAS, then download file through m209
  //   */
  // function fssLDAPserverBackupExport(devID/*, dstFilePath*/) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'exportLDAPDBFile';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['srcFileName'] = 'NAS_LDAPBACKUP';//file name decision from m209
  //     param['dstFilePath'] = "\""+"dat/ldapdb/NAS_LDAPBACKUP\"";

  //     return cmd;

  // }

  // /**
  //   *
  //   * #ldapserver host export <-f output_folder> [-n filename] [-m {single | multi}]
  //   * fssLDAPserverExport = FSS ldapserver host export [slot] [-f:f] [-n:n] [-m:m]
  //   */
  // function fssLDAPserverBackupExportNas(devID, _refRetunArr, _refParmArr, slot, srcfolder) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPserverExport';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['slot'] = slot ? 'slotA' : 'slotB' ;
  //     param['f'] = "\""+srcfolder+"\"";
  //     param['n'] = 'NAS_LDAPBACKUP';
  //     param['m'] = 'single';

  //     return cmd;

  // }

  // /**
  //   * export ldapdb [Controller] [srcFileName] [dstFilePath]
  //   * exportLDAPDBFileNew = export ldapdb [Controller] [srcFileName] [dstFilePath]
  //   */
  // function fssLDAPserverBackupExportNew(devID, _refRetunArr, _refParmArr, slot, srcFileName/*, dstFilePath*/) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'exportLDAPDBFileNew';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['slot'] = slot ? 'slotA' : 'slotB' ;
  //     //param['srcFileName'] = "\"" + srcFileName + '/ldapdbbackup' + "\"";//file name decision from m209
  //     param['srcFileName'] = "\"" + srcFileName + '/NAS_LDAPBACKUP' + "\"";//file name decision from m209
  //     param['dstFilePath'] = "\""+"dat/ldapdb/NAS_LDAPBACKUP\"";

  //     return cmd;

  // }

  // /**
  //   *
  //   * #ldapserver host import <-f folder_path> <-n filename>
  //   * fssLDAPserverImport = FSS ldapserver host import [slot] [-f:f] [-n:n]
  //   */
  // function fssLDAPserverBackupImportNas(devID, _refRetunArr, _refParmArr, slot/*, dstFilePath*/) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssLDAPserverImport';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['slot'] = slot ? 'slotA' : 'slotB' ;
  //     param['f'] = "/tmp";//dstFilePath;
  //     param['n'] = "ldapbackup";

  //     return cmd;

  // }

  // /**
  //   * import ldapdb [controller] [file_path] [dst_path]
  //   * importLDAPDBFileNew = import ldapdb [controller] [file_path] [dst_path]
  //   */
  // function fssLDAPserverBackupImportNew(devID, _refRetunArr, _refParmArr, slot, fpath) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'importLDAPDBFileNew';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['controller'] = slot ? 'slotA' : 'slotB' ;
  //     param['file_path'] = "\"" + fpath + "\"";
  //     //param['dst_path'] = "\"" + "/tmp/ldapbackup\"";

  //     return cmd;

  // }

  // /**
  //   * importFssfile = import fssfile [type] [file-path] [overwrite]
  //   * Transfer file to NAS through m209, then NAS import ldap server backup file
  //   * m209 will do command (ldapserver host import <-f folder_path> <-n filename>)
  //   */
  // function fssLDAPServerBackupImport(devID, _refRetunArr, _refParmArr, fpath){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'importFssfile';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['type'] = 'ldapServer_backup';
  //     param['file-path'] = "\""+fpath+"\"";
  //     param['overwrite'] = false;

  //     return cmd;
  // }


  // /**
  //   *
  //   * importFileToNas = import fileToNasByM209 [controller] [file_path] [dst_path]
  //   */
  // function fssUploadFileToNAS(devID, _refRetunArr, _refParmArr, slot, fpath, dst_path) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'importFileToNas';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['controller'] = slot ? 'slotA' : 'slotB' ;
  //     param['file_path'] = '"' + fpath + '"';
  //     param['dst_path'] = '"' + dst_path +'"';

  //     return cmd;

  // }
  // /**
  //   * # proxy switch [-s {on | off}]  [-p port] [-a {on | off}]
  //   * fssProxySwitch=FSS proxy switch [controller] [-s:s] [-p:p] [-a:a]
  //   */
  // function fssProxySwitch(devID, _refRetunArr, _refParmArr, controller, server, port, authentication) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssProxySwitch';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     //check slot A or B
  //     if(controller){
  //         param['controller'] = controller;
  //     }
  //     if(server){
  //         param['s'] = server;
  //     }
  //     if(port){
  //         param['p'] = port;
  //     }
  //     if(authentication){
  //         param['a'] = authentication;
  //     }
  //     return cmd;
  // }

  // /**
  //   * # proxy diskcache [-l location] [-s cachesize] [-x max_file_size] [-n min_file_size] [-r floor] [-g ceiling] [-f]
  //   * fssProxyDiskcache=FSS proxy diskcache [-l:l] [-s:s] [-x:x] [-n:n] [-r:r] [-g:g] [-f:f]
  //   */
  // function fssProxyDiskcache(devID, _refRetunArr, _refParmArr,  location, cacheSize, maxSize, minSize, floor, ceiling, cleanDiskCache) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssProxyDiskcache';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     //check slot A or B
  //     //            if(controller){
  //     //                param['controller'] = controller;
  //     //            }
  //     if(location){
  //         param['l'] = '\"' + location + '\"';
  //     }
  //     if(cacheSize){
  //         param['s'] = cacheSize;
  //     }
  //     if(maxSize){
  //         param['x'] = maxSize;
  //     }
  //     if(minSize){
  //         param['n'] = minSize;
  //     }
  //     if(floor){
  //         param['r'] = floor;
  //     }
  //     if(ceiling){
  //         param['g'] = ceiling;
  //     }
  //     if(cleanDiskCache){
  //         param['f'] = '';
  //     }

  //     return cmd;
  // }

  // /**
  //   * # proxy memcache [-c {on | off}] [-s cachesize] [-x max_file_size]
  //   * fssProxyMemcache=FSS proxy memcache [-c:c] [-s:s] [-x:x]
  //   */
  // function fssProxyMemcache(devID, _refRetunArr, _refParmArr, memoryCache, cacheSize, maxSize) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssProxyMemcache';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     //check slot A or B
  //     //            if(controller){
  //     //                param['controller'] = controller;
  //     //            }
  //     if(memoryCache){
  //         param['c'] = memoryCache;
  //     }
  //     if(cacheSize){
  //         param['s'] = cacheSize;
  //     }
  //     if(maxSize){
  //         param['x'] = maxSize;
  //     }
  //     return cmd;
  // }

  // /**
  //   * # proxy aclmov <-i target_index> <-p {up | down}>
  //   * fssProxyAclmov=FSS proxy aclmov [target_index] [p]
  //   */
  // function fssProxyAclmov(devID, _refRetunArr, _refParmArr, index, move) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssProxyAclmov';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     //check slot A or B
  //     //            if(controller){
  //     //                param['controller'] = controller;
  //     //            }
  //     if(index){
  //         param['target_index'] = index;
  //     }
  //     if(move){
  //         param['p'] = move;
  //     }
  //     return cmd;
  // }


  // /**
  //   * # proxy acldel <-i target_index1[,target_index2...]>
  //   * fssProxyAcldel=FSS proxy acldel [target_index]
  //   */
  // function fssProxyAcldel(devID, _refRetunArr, _refParmArr, index) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssProxyAcldel';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     //check slot A or B
  //     //            if(controller){
  //     //                param['controller'] = controller;
  //     //            }
  //     if(index){
  //         param['target_index'] = index;
  //     }
  //     return cmd;
  // }

  // /**
  //   * # proxy acladd <-a {allow | deny}> <-t {srcIP | srcHost | srcMac | dstIP | dstHost}> <-h host_addr>
  //   * fssProxyAcladd=FSS proxy acladd [-a:a] [-t:t] [-h:h]+ #FSProxyInfo
  //   */
  // function fssProxyAcladd(devID, _refRetunArr, _refParmArr, action, type, IP) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssProxyAcladd';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     //check slot A or B
  //     //            if(controller){
  //     //                param['controller'] = controller;
  //     //            }
  //     if(action){
  //         param['a'] = action;
  //     }
  //     if(type){
  //         param['t'] = type;
  //     }
  //     if(IP){
  //         param['h'] = IP;
  //     }
  //     return cmd;
  // }

  // /**
  //   * # proxy acledit <-i target_index> [-a {allow | deny}] [-t {srcIP |srcHost | srcMac | dstIP |dstHost}] [-h host_addr]
  //   * fssProxyAcledit=FSS proxy acledit [target_index] [-a:a] [-t:t] [-h:h] #FSProxyInfo
  //   */
  // function fssProxyAcledit(devID, _refRetunArr, _refParmArr, index, action, type, IP) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssProxyAcledit';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     //check slot A or B
  //     //            if(controller){
  //     //                param['controller'] = controller;
  //     //            }
  //     if(index){
  //         param['target_index'] = index;
  //     }
  //     if(action){
  //         param['a'] = action;
  //     }
  //     if(type){
  //         param['t'] = type;
  //     }
  //     if(IP){
  //         param['h'] = IP;
  //     }
  //     return cmd;
  // }

  // /**
  //   * # antivirus options [-a {delete | quarantine | none}] [-u on|off] [-f working_folder] [-s size] [-c {on|off}]
  //   * # -a: Action, when infected file detected.
  //   * # -f: Working folder. The folder contains two subfolder: log and Cquarantine. The subfolder log is used to save the log files (generated by ClamAV); the subfolder Cquarantine is used to save the infected files
  //   * # -s: Maximum file size for scanning. The default setting is '25' (MB). The maximum setting is '4096' (MB). The setting will be applied to both slots.
  //   * # -c: Scan the content of the compressed file. The default setting is 'on'
  //   */
  // function fssAntivirusOptions(devID, _refRetunArr, _refParmArr, a, folderPath, size, c){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssAntivirusOptions';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(a){
  //         param['a'] = a;
  //     }
  //     if(folderPath){
  //         param['f'] = "\"" + folderPath.replace(/\"/gi, '\\\"') + "\"";
  //     }
  //     if(size){
  //         param['s'] = size;
  //     }
  //     if(c){
  //         param['c'] = c;
  //     }
  //     return cmd;
  // }

  // /**
  //   * # antivirus update [-f filename] [-p period] [-u]
  //   */
  // function fssAntivirusUpdate(devID, _refRetunArr, _refParmArr, controller, filename, period, online){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssAntivirusUpdate';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(controller){
  //         param['controller'] = controller;
  //     }

  //     if(filename){
  //         param['filename'] = filename;
  //     }
  //     if(period){
  //         param['p'] = period;
  //     }
  //     if(online){
  //         param['u'] = '';
  //     }
  //     return cmd;
  // }

  // //        # antivirus filetype [-s {on|off}] [-a type [type \u2026]] [-d type [type \u2026]] <-z {a|b}@serviceID>
  // //        # -s: Enable(on)/Disable(off) scan specific file type(s). The default setting is \u201Coff\u201D, all file type will be scanned.
  // //        # -a: Add file type
  // //        # -d: Remove file type.
  // function fssAntivirusFiletype(devID, _refRetunArr, refParmArr, scanAllType, addFileType, deleteFileType){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};

  //     cmd.key = 'fssAntivirusFiletype';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParmArr;

  //     if(scanAllType){
  //         param['s'] = scanAllType;
  //     }
  //     if(addFileType && addFileType != ''){
  //         param['a'] = addFileType;
  //     }
  //     if(deleteFileType && deleteFileType != ''){
  //         param['d'] = deleteFileType;
  //     }
  //     return cmd;
  // }
  // //       # antivirus schedule create [<task_name> <-f {full | /folder_path [/folder_path ...] }> <-d {now|daily|weekend|weekday|<day [day ...] >} > <-t hhmm>]
  // //       # -f: Scan type. Full scan or scan the specified folder(s)
  // //       # -d: Date for scan.
  // //       #    weekend: sat and sun.
  // //       #    weekday: mon, tue, wed, thu, and fri.
  // //       #    day: It can be any combination of mon, tue, wed, thu, fri, sat, and sun.
  // //       # -t: Time. The format is \u201Chhmm\u201D (0000 to 2359)
  // //       # -n: new task name
  // function fssAntivirusScheduleCreate(devID, _refRetunArr, refParmArr, controller, jobname, folderPath, day, time){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};

  //     cmd.key = 'fssAntivirusScheduleCreate';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParmArr;
  //     if(controller){
  //         param['controller'] = controller;
  //     }
  //     if(jobname){
  //         param['task_name'] = jobname;
  //     }
  //     if(folderPath){
  //         param['f'] = "\"" + folderPath.replace(/\"/gi, '\\\"') + "\"";
  //     }
  //     if(day){
  //         param['d'] = day;
  //     }
  //     if(time){
  //         param['t'] = time;
  //     }
  //     return cmd;
  // }
  // function fssAntivirusScheduleOptions(devID, _refRetunArr, refParmArr, controller, uuid, folderPath, day, time, newJobname){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};

  //     cmd.key = 'fssAntivirusScheduleOptions';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParmArr;
  //     if(controller){
  //         param['controller'] = controller;
  //     }
  //     if(uuid){
  //         param['uuid'] = uuid;
  //     }
  //     if(folderPath){
  //         param['f'] = "\"" + folderPath.replace(/\"/gi, '\\\"') + "\"";
  //     }
  //     if(day){
  //         param['d'] = day;
  //     }
  //     if(time){
  //         param['t'] = time;
  //     }
  //     if(newJobname){
  //         param['n'] = newJobname;
  //     }
  //     return cmd;
  // }
  // function fssAntivirusScheduleDelete(devID, _refRetunArr, refParmArr, uuid){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};

  //     cmd.key = 'fssAntivirusScheduleDelete';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParmArr;
  //     if(uuid){
  //         param['uuid'] = uuid;
  //     }
  //     return cmd;
  // }
  // function fssAntivirusScheduleExecute(devID, _refRetunArr, refParmArr, uuid){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};

  //     cmd.key = 'fssAntivirusScheduleExecute';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParmArr;
  //     if(uuid){
  //         param['uuid'] = uuid;
  //     }
  //     return cmd;
  // }
  // function fssAntivirusScheduleStop(devID, _refRetunArr, refParmArr, uuid){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};

  //     cmd.key = 'fssAntivirusScheduleStop';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParmArr;
  //     if(uuid){
  //         param['uuid'] = uuid;
  //     }
  //     return cmd;
  // }
  // /**
  //   * FSS antivirus log [-e:e] [-i:i] [-n:n] [-c:c] [-f:f]
  //   * # -e: Export log records to a text file.
  //   * # -i: Index for pagination retrieve log records.
  //   * # -n: Retrieve NUM log records from index.
  //   * # -c: Clear all log records.
  //   * # -f: Forec to perform the specified operation with confirmation.
  //   * # -p: Retention period. The valid value is from 1 to 99. The default setiing is 10.
  //   * # -d: Delete the selected log record and related files.
  //   */
  // function fssAntivirusDownloadLog(devID, _refRetunArr, _refParmArr, controller,filePath, dstFilePath){

  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssAntivirusDownloadLog';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['type'] = "log";
  //     if(controller=='SlotA'){
  //         param['controller'] = 'slotA';
  //     }
  //     else if(controller=='SlotB'){
  //         param['controller'] = 'slotB';
  //     }
  //     if(filePath){
  //         param['filePath'] = "\"" + filePath.replace(/\"/gi, '\\\"') + "\"";
  //     }
  //     if(dstFilePath){
  //         param['dstFilePath'] = "dat/antivirus/log_for_"+dstFilePath+".log";  // dstFilePath is id
  //     }
  //     return cmd;
  // }
  // function fssAntivirusLog(devID, _refRetunArr, _refParmArr, folderPath, index, number, clear, f, period, deleteIdx){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssAntivirusLog';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(folderPath){
  //         param['e'] = "\"" + folderPath.replace(/\"/gi, '\\\"') + "\"";
  //     }
  //     if(index){
  //         param['i'] = index;
  //     }
  //     if(number){
  //         param['n'] = number;
  //     }
  //     if(clear){
  //         param['c'] = clear;
  //     }
  //     if(f){
  //         param['f'] = f;
  //     }
  //     if(period){
  //         param['p'] = period;
  //     }
  //     if(deleteIdx){
  //         param['d'] = deleteIdx;
  //     }
  //     return cmd;
  // }

  // /**
  //   *#antivirus quarantine [-f /folder_path] [-l] [-d /FilePath/FileName] [-r /FilePath/FileName [-w]]
  //   *#no option: display the folder which is used to be the quarantine.
  //   *#-f: Using the folder to be the quarantine.
  //   *#-l: List the infected files.
  //   *#-d: Delete the infected file.
  //   *#-r: Restore the infected file.
  //   *#-w: Add the restored file to whitelist. This option should be assigned with the option ???-r???
  //   */
  // function fssAntivirusQuarantine(devID, _refRetunArr, _refParmArr, controller , list, deleteFolder, restore, whiteList){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssAntivirusQuarantine';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(controller){
  //         param['controller'] = controller;
  //     }

  //     if(list){
  //         param['l'] = list;
  //     }
  //     if(deleteFolder){
  //         param['d'] = "\"" + deleteFolder.replace(/\"/gi, '\\\"') + "\"";
  //     }
  //     if(restore){
  //         param['r'] = "\"" + restore.replace(/\"/gi, '\\\"') + "\"";
  //     }
  //     if(whiteList){
  //         param['w'] = whiteList;
  //     }
  //     return cmd;
  // }

  // function fssAntivirusServiceEnable(devID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssAntivirusServiceEnable';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;
  // }

  // function fssAntivirusServiceDisable(devID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssAntivirusServiceDisable';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;
  // }

  // function fssAntivirusVirusDatabaseImport(devID, _refRetunArr, _refParmArr, controller, fpath, dstpath){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'importAntivirus';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['type'] = 'virus_update';
  //     param['controller'] = controller;
  //     param['file_path'] = "\""+fpath+"\"";
  //     param['dst_path'] = "\""+dstpath+"\"";

  //     return cmd;
  // }

  // function fssAntivirusServiceStatus(devID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssAntivirusServiceStatus';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;
  // }

  // /**
  //   * #fquota create <poolname> <foldername> <limitentry> <size> <-t user | folder> <-z {a|b}@serviceID>
  //   * fssFquotaCreate = FSS fquota create [poolname] [foldername] [limitentry] [size] [-t:t]
  //   */
  // function fssFquotaCreate(devID, _refRetunArr, _refParmArr ,poolName, folderName, limitentry, size, type, initUser, monitoring, threshold) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = initUser ? 'fssFquotaCreate':'fssFquotaCreateNoInit';
  //     //            cmd.key = 'fssFquotaCreate';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['poolname'] = poolName;
  //     param['foldername'] = folderName;
  //     param['limitentry'] = "\""+limitentry+"\"";
  //     param['size'] = size;
  //     param['t'] = type;
  //     if(monitoring){
  //         param['m'] = monitoring;
  //     }
  //     if(threshold){
  //         param['T'] = threshold;
  //     }
  //     return cmd;
  // }

  // /**
  //   * #fquota delete <poolname> <foldername> [limitentry] <-t user | folder> <-z {a|b}@serviceID>
  //   * fssFquotaDelete = FSS fquota delete [poolname] [foldername] [limitentry=limitentry] [-t:t]
  //   */
  // function fssFquotaDelete(devID, _refRetunArr, _refParmArr ,poolName, folderName, limitentry, type, initUser) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = initUser ? 'fssFquotaDelete':'fssFquotaDeleteNoInit' ;
  //     //            cmd.key = 'fssFquotaDelete';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['poolname'] = poolName;
  //     param['foldername'] = folderName;
  //     if(limitentry){
  //         param['limitentry'] = "\""+limitentry+"\"";
  //     }
  //     param['t'] = type;

  //     return cmd;
  // }

  // /**
  //   * #fquota status <poolname> <foldername> [limitentry] <-t user | folder> [-f] <-z {a|b}@serviceID>
  //   *  fssFquotaStatus = FSS fquota status [poolname] [foldername] [limitentry] [-t:t] [-f:f]
  //   */
  // function fssFquotaStatus(devID, _refRetunArr, _refParmArr ,poolName, folderName, limitentry, type, force) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssFquotaStatus';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(poolName){
  //         param['poolname'] = poolName;
  //     }
  //     if(folderName){
  //         param['foldername'] = folderName;
  //     }
  //     if(limitentry){
  //         param['limitentry'] = "\""+limitentry+"\"";
  //     }
  //     param['t'] = type;
  //     if(force){
  //         param['f'] = '';
  //     }

  //     return cmd;
  // }

  // /**
  //   * #explorer app start -z a@0
  //   * fssExplorerStart = FSS explorer app start
  //   */
  static fssExplorerStart(raidCliCmd: RaidCliCmd, param: fssCmd.FssExplorerStartParam): RaidCliCmd {
    raidCliCmd.key = 'fssExplorerStart';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * #explorer app stop -z a@0
  //   * fssExplorerStop = FSS explorer app stop
  //   */
  static fssExplorerStop(raidCliCmd: RaidCliCmd, param: fssCmd.FssExplorerStopParam): RaidCliCmd {
    raidCliCmd.key = 'fssExplorerStop';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * #explorer app Status -z a@0
  //   * fssExplorerStatus = FSS explorer app Status
  //   */
  static fssExplorerStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssExplorerStatusParam): RaidCliCmd {
    raidCliCmd.key = 'fssExplorerStatus';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //   * #synccloud dbdel -z a@0
  //   * fssSynccloudDBDel = FSS synccloud dbdel
  //   */
  // function fssSynccloudDBDel(devID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssSynccloudDBDel';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;
  // }


  // /**
  //   * #synccloud checkdb -z a@0 -l folder_path
  //   * fssSynccloudCheckDB = FSS synccloud checkdb [-l:l]
  //   */
  // function fssSynccloudCheckDB(devID, folderPath) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssSynccloudCheckDB';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['l'] = folderPath;

  //     return cmd;
  // }
  // /**
  //   * #synccloud start -z a@0 -l folder_path
  //   * fssSynccloudStart = FSS synccloud start [-l:l] -o {delete|move}
  //   */
  // function fssSynccloudStart(devID, folderPath, _refRetunArr, _refParmArr, deleteOrMove) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssSynccloudStart';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['l'] = '\"' + folderPath + '\"';
  //     if (typeof deleteOrMove !== 'undefined')
  //         param['o'] = deleteOrMove;

  //     return cmd;
  // }

  // /**
  //   * #synccloud stop -z a@0
  //   * fssSynccloudStop = FSS synccloud stop
  //   */
  // function fssSynccloudStop(devID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssSynccloudStop';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;
  // }

  // /**
  //   * #synccloud usr -z a@0 -u uid
  //   * fssSynccloudUsr = FSS synccloud usr [-u:u]
  //   */
  // function fssSynccloudUsr(devID, uid) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssSynccloudUsr';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['u'] = uid;

  //     return cmd;
  // }

  // /**
  //   * #synccloud status -z a@0
  //   * fssSynccloudStatus = FSS synccloud status
  //   */
  // function fssSynccloudStatus(devID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssSynccloudStatus';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;
  // }

  // function fssSynccloudConnlist(devID) {
  //     var cmd = {};
  //     var param = {};

  //     cmd.key = 'fssSynccloudConnListOld';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     param['u'] = 0;

  //     return cmd;
  // }


  // // utility rolling-upgrate -y
  static rollingUpgrade(raidCliCmd: RaidCliCmd, param: raidCmd.RollingUpgradeParam): RaidCliCmd {
    raidCliCmd.key = 'rollingUpgrate';
    param['y'] = '';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // //pool import poolname [-a {rw|ro}] <-z {a|b}@serviceID>
  static fssPoolImport(raidCliCmd: RaidCliCmd, param: fssCmd.FssPoolImportParam): RaidCliCmd {
    raidCliCmd.key = 'fssPoolImport';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // function fssPoolImport(devID, _refRetunArr, _refParmArr, poolName, assign , wrightPolicy) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssPoolImport';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['poolname'] = poolName;

  //     if(assign)
  //     {
  //         param['assign'] = assign;
  //     }
  //     else
  //     {
  //         param['assign'] = '';
  //     }

  //     if(wrightPolicy)
  //     {
  //         param['a'] = wrightPolicy;
  //     }

  //     return cmd;
  // }

  static createActionLog(raidCliCmd: RaidCliCmd, param: raidCmd.CreateActionLogParam, userType:string): RaidCliCmd {
    const processedParam: any = {};

    raidCliCmd.key = 'createActionLog';
    if (param.LogID) {
      processedParam.LogID = param.LogID;
    }
    processedParam.valuelist = '"' + param.valuelist + '"';
    processedParam.userType = userType;
    if (param.isImmediately) {
      processedParam.i = '';
    }
    raidCliCmd.param = processedParam;

    return raidCliCmd;
  }

  static checkNTP(raidCliCmd: RaidCliCmd, param: raidCmd.CheckNTPParam): RaidCliCmd {
    raidCliCmd.key = 'showCheckNTP';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  static updateTimeNTP(raidCliCmd: RaidCliCmd, param: fssCmd.updateTimeNTP): RaidCliCmd {
    raidCliCmd.key = 'updateTimeNtp';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  testSNMPTrap(raidCliCmd: RaidCliCmd) {
    raidCliCmd.key = 'utilityTestSNMPTrap';
    raidCliCmd.param = {};
    return raidCliCmd;
  }

  // // set CS File
  // function writeCSFile(devID, path, value){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'utilityWriteCSFile';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['path'] = path;
  //     param['value'] = value;

  //     return cmd;

  // }
  // // get CS File
  // function getCSFile(devID, path){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'utilityGetCSFile';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     param['path'] = path;
  //     return cmd;
  // }

  // // NVR
  // function fssNVRServerStatus(devID, _refReturnArr, _refParamArr, ServerStatus){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssNVRServerStatus';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if (ServerStatus)
  //         param['status'] = 'enable';
  //     else
  //         param['status'] = 'disable';

  //     return cmd;
  // }
  // function fssNVRServerConfig(devID, _refReturnArr, _refParamArr, FolderPath){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssNVRServerConfig';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['status'] = 'config';
  //     param['f'] = FolderPath;

  //     return cmd;
  // }
  // function fssNVRServerConfigTwoFolder(devID, _refReturnArr, _refParamArr, FolderPath, DataFolderPath){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssNVRServerConfigTwoFolder';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['status'] = 'config';
  //     param['f'] = FolderPath;
  //     param['c'] = DataFolderPath;

  //     return cmd;
  // }

  // // ProjectServer
  static fssProjectServerStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssProjectServerStatusParam): RaidCliCmd {

    raidCliCmd.key = 'fssProjectServerStatus';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  static fssProjectServerConfig(raidCliCmd: RaidCliCmd, param: fssCmd.FssProjectServerConfigParam): RaidCliCmd {

    raidCliCmd.key = 'fssProjectServerStatus';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  static fssDockerStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssDockerStatusParam): RaidCliCmd {

    raidCliCmd.key = 'fssDockerStatus';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  static fssDockerEnable(raidCliCmd: RaidCliCmd): RaidCliCmd {

    raidCliCmd.key = 'fssDockerEnable';
    raidCliCmd.param = {};

    return raidCliCmd;
  }

  static fssDockerDisable(raidCliCmd: RaidCliCmd): RaidCliCmd {

    raidCliCmd.key = 'fssDockerDisable';
    raidCliCmd.param = {};

    return raidCliCmd;
  }

  // //Docker
  // function fssDockerStatus(devID, _refReturnArr, _refParamArr, ServerStatus){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssDockerStatus';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if (ServerStatus)
  //         param['status'] = 'enable';
  //     else
  //         param['status'] = 'disable';

  //     return cmd;
  // }
  // function fssDockerConfig(devID, _refReturnArr, refParamArr, VolumeID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssDockerConfig';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['status'] = 'config';

  //     if (refParamArr && refParamArr.length > 0 && refParamArr[0]) {
  //         refParam['n'] = refParamArr[0];
  //     }else{
  //         param['n'] = VolumeID;
  //     }

  //     return cmd;
  // }
  // function fssFileAuditingStatus(devID, _refReturnArr, _refParamArr, AuditStatus, ServiceStatus, ServiceType){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssFileAuditingStatus';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     if(AuditStatus){
  //         param['status'] = 'audit';
  //         param['a'] = AuditStatus;
  //     }

  //     if(ServiceStatus)
  //         param['status'] = 'enable';
  //     else if(ServiceStatus == false)
  //         param['status'] = 'disable';

  //     if(ServiceType != null)
  //         param['s'] = ServiceType;

  //     return cmd;
  // }
  // function fssFileAuditingConfig(devID, _refReturnArr, _refParamArr, FolderPath, MaxLogRecords){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};
  //     cmd.key = 'fssFileAuditingConfig';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['f'] = "\""+ FolderPath + "\"";
  //     param['M'] = MaxLogRecords;

  //     return cmd;
  // }
  static fssFileAuditingClear(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'fssFileAuditingClear';
    raidCliCmd.param = {};
    return raidCliCmd;
  }
  // /**
  //   * # export fileauditinglog [filename]
  //   * exportFileAuditingLog=export fileauditinglog [filename]
  //   */
  static exportFileAuditingLog(raidCliCmd: RaidCliCmd, param: raidCmd.EventLogExportParam): RaidCliCmd {
    raidCliCmd.key = 'exportFileAuditingLog';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  static fssAdvLogSearchXferlog(raidCliCmd: RaidCliCmd, param: fssCmd.FssAdvLogSearchXferlogParam): RaidCliCmd {
    raidCliCmd.key = 'fssAdvLogSearchXferlog';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // /**
  //   * fssNettestPing = FSS nettest ping <-a argument> <-r {on|off}> <-z {a|b}@serviceID>
  //   * ex. FSS nettest ping -r on -z a@0 -a "172.26.112.25 -c 3"
  //   * ex. FSS nettest ping -r off -z a@0 -a "172.26.112.25 -c 3 -I ch2
  //   */
  // function fssPing(devID,  _refRetunArr, _refParmArr, ctrl, argumentStr, defaultRoute){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssNettestPing';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['controller'] = ctrl;
  //     param['a'] = argumentStr;
  //     param['r'] = defaultRoute;

  //     return cmd;
  // }

  // /**
  //   * fssNettestTraceRoute = FSS nettest traceroute <-a argument> <-z {a|b}@serviceID>
  //   * ex. FSS nettest traceroute -z a@0 -a "172.26.112.97"
  //   */
  // function fssTraceroute(devID,  _refRetunArr, _refParmArr, ctrl, argumentStr){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssNettestTraceRoute';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['controller'] = ctrl;
  //     param['a'] = argumentStr;

  //     return cmd;
  // }

  // /**
  //   * fssIfconfigVLANAdd = FSS ifconfig vlan add [controller] [-n:n] [-i:i] [-v:v]
  //   * ps. if set trunk_0_1, use CH0 for link_dev param
  //   * FSS ifconfig vlan add slotA -n vch2_0 -i CH2 -v 2
  //   */
  // function fssVLANAdd(devID,  _refRetunArr, _refParmArr, ctlr, vlan, link_dev, vid){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssIfconfigVLANAdd';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['controller'] = ctlr;
  //     param['n'] = vlan;
  //     param['i'] = link_dev;
  //     param['v'] = vid;

  //     return cmd;
  // }

  // /**
  //   * fssIfconfigVLANEdit = FSS ifconfig vlan edit [controller] [-n:n] [-v:v]
  //   * ex. FSS ifconfig vlan edit slotA -n vch2_0 -v 3
  //   */
  // function fssVLANEdit(devID,  _refRetunArr, _refParmArr, ctlr, vlan, vid){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssIfconfigVLANEdit';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['controller'] = ctlr;
  //     param['n'] = vlan;
  //     param['v'] = vid;

  //     return cmd;
  // }

  // /**
  //   * fssIfconfigVLANDelete = FSS ifconfig vlan del [interface]
  //   * ex. FSS ifconfig vlan del vch2_0
  //   */
  // function fssVLANDelete(devID,  _refRetunArr, _refParmArr, vlan){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssIfconfigVLANDelete';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['interface'] = vlan;

  //     return cmd;
  // }

  static fssCliScript(raidCliCmd: RaidCliCmd, param: fssCmd.FssCliScriptParam): RaidCliCmd {
    raidCliCmd.key = 'fssCliScript';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // // FSS volumethreshold add [-p:p] [-v:v] [-t:t] [-d:d]
  // // FSS volumethreshold edit [-p:p] [-v:v] [-i:i] [-t:t] [-d:d]
  static addEditVolumeThreshold(raidCliCmd: RaidCliCmd, param: fssCmd.FssThresholdParam): RaidCliCmd {
    if (param.type === 'add') {
      raidCliCmd.key = 'fssThresholdAdd';
    }
    else {
      raidCliCmd.key = 'fssThresholdEdit';
    }
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // //    FSS volumethreshold del [-p:p] [-v:v] [-i:i]
  static deleteVolumeThreshold(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteThresholdParam): RaidCliCmd {
    raidCliCmd.key = 'fssThresholdDelete';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * FSS csgateway checkdbtask <-p volumeId> <-f folderPath>
   */
  static fssCsGatewayCheckdbtask(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsGatewayCheckdbtaskParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsGatewayCheckdbtask';
    raidCliCmd.param = param;
    return raidCliCmd;
  }


  // function createConnection(devID, _refRetunArr, _refParmArr, ip, account, password){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};



  //     cmd.key = 'createConnection';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['ip'] = ip;
  //     param['account'] = account;
  //     param['password'] = password;
  //     param['type'] = 'unknown';

  //     return cmd;
  // }

  // function deleteConnection(devID, _refRetunArr, _refParmArr, ip){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'deleteConnection';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['ip'] = ip;

  //     return cmd;
  // }

  // /**
  //   * setvCenterVASAReg = set vCenter vasa reg [vCenter_ip_host] [vasa_ip] [username] [password]
  //   */
  // function setvCenterVASAReg(devID, _refRetunArr, _refParmArr, vCenter_ip_host, vasa_ip, username, password){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setvCenterVASAReg';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['vCenter_ip_host'] = vCenter_ip_host;
  //     param['vasa_ip'] = vasa_ip;
  //     param['username'] = username;
  //     param['password'] = password;

  //     return cmd;
  // }

  // /**
  //   * setvCenterVASAUnreg = set vCenter vasa unreg [vCenter_ip_host]
  //   */
  // function setvCenterVASAUnreg(devID, _refRetunArr, _refParmArr, vCenter_ip_host){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setvCenterVASAUnreg';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['vCenter_ip_host'] = vCenter_ip_host;

  //     return cmd;
  // }

  // /**
  //   * createCapabilityProfile = create capability-profile lvID name [tags={tags}]
  //   */
  // function createCapabilityProfile(devID, _refRetunArr, _refParmArr, lvID, name, tags){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'createCapabilityProfile';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['lvID'] = lvID;
  //     param['name'] = "\""+name+"\"";
  //     if ( tags ) {
  //         param['tags'] = tags;
  //     }

  //     return cmd;
  // }

  // /**
  //   * createStorageContainer = create storage-container name type [lv-id-list] [max-size-list]
  //   */
  // function createStorageContainer(devID, refRetunArr, _refParmArr, name, type, lvIDList, maxSizeList){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'createStorageContainer';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['name'] = "\""+name+"\"";
  //     param['type'] = type;
  //     param['lv-id-list'] = lvIDList;
  //     param['max-size-list'] = maxSizeList;

  //     if (refRetunArr && refRetunArr.length > 0 && refRetunArr[0]) {
  //         refReturn['StorageContainer-ID'] = refRetunArr[0];
  //     }

  //     return cmd;
  // }

  // /**
  //   * createVVolDatastore = create vvol-datastore scid  name [type] [esxi-list]
  //   */
  // function createVVolDatastore(devID, _refRetunArr, refParmArr, scid, name, type, esxiList){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'createVVolDatastore';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;


  //     if ( scid ) {
  //         param['scid'] = scid;
  //     }

  //     if ( name ) {
  //         param['name'] = "\""+name+"\"";
  //     }

  //     if ( type ) {
  //         param['type'] = type;
  //     }


  //     if ( esxiList ) {
  //         param['esxi-list'] = esxiList;
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['scid'] = refParmArr[0];
  //     }

  //     return cmd;
  // }

  // /**
  //   * setCapabilityProfile = set capability-profile [lvID] [tags=tags] [-c:c]
  //   */
  // function setCapabilityProfile(devID, _refRetunArr, _refParmArr, lvID, tags){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setCapabilityProfile';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['lvID'] = lvID;
  //     if ( tags ) {
  //         param['tags'] = tags;
  //     } else {
  //         param['c'] = '';
  //     }

  //     return cmd;
  // }


  // /**
  //   * setStorageContainerExpand = set storage-container expand [scid] [lv-id-list] [max-size-list]
  //   */
  // function setStorageContainerExpand(devID, _refRetunArr, _refParmArr, scid, lvIDList, maxSizeList){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setStorageContainerExpand';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['scid'] = scid;
  //     param['lv-id-list'] = lvIDList;
  //     param['max-size-list'] = maxSizeList;

  //     return cmd;
  // }

  // /**
  //   * setStorageContainerAccess = set storage-container access  [scid] [esxi-list]
  //   */
  // function setStorageContainerAccess(devID, _refRetunArr, refParmArr, scid, esxiList){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setStorageContainerAccess';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     if ( scid ) {
  //         param['scid'] = scid;
  //     }

  //     if ( esxiList ) {
  //         param['esxi-list'] = esxiList;
  //     } else {
  //         param['c'] = '';
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['scid'] = refParmArr[0];
  //     }

  //     return cmd;
  // }

  // /**
  //   * deleteCapabilityProfile = delete capability-profile [lvID] [-y:y]
  //   */
  // function deleteCapabilityProfile(devID, _refRetunArr, _refParmArr, lvID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'deleteCapabilityProfile';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['lvID'] = lvID;
  //     param['y'] = '';

  //     return cmd;
  // }

  // /**
  //   * deleteStorageContainer = delete storage-container [scid] [-y:y]
  //   */
  // function deleteStorageContainer(devID, _refRetunArr, _refParmArr, scid){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'deleteStorageContainer';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['scid'] = scid;
  //     param['y'] = '';

  //     return cmd;
  // }

  // /**
  //   * deleteVvol=delete vvol [vvID] #VVol
  //   */
  // function deleteVvol(devID, _refRetunArr, _refParmArr, vvID){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'deleteVvol';
  //     cmd.devID = devID;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;
  //     cmd.param = param;

  //     param['vvID'] = vvID;

  //     return cmd;
  // }

  // /*
  //   * defrag start vol <-v vvid> <-z {a|b}@serviceID>
  //   * defrag start task <-t task_name [task_name...]> <-z {a|b}@serviceID>
  //   */
  static fssDoDefrag(raidCliCmd: RaidCliCmd, param: fssCmd.FssDoDefragParam): RaidCliCmd {
    if (param.behavior === 'start') {
      raidCliCmd.key = 'fssDoDefrag';
    } else if (param.behavior === 'stop') {
      raidCliCmd.key = 'fssDefragStop';
    } else if (param.behavior === 'create') {
      raidCliCmd.key = 'fssDefragCreate';
      if (raidCliCmd.refReturn && raidCliCmd.refReturn.length > 0) {
        raidCliCmd.refReturn.taskname = raidCliCmd.refReturn[0];
      }
    } else if (param.behavior === 'delete') {
      raidCliCmd.key = 'fssDefragDelete';
    }

    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // /**
  //     setBgjobAbort=set bgjob abort [type={type}] [target={target}] [-y:y]
  //   */
  // function setBgjobAbort(devID, _refRetunArr, _refParmArr, type, target) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'setBgjobAbort';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['type'] = type;
  //     param['target'] = target;
  //     param['y'] = '';
  //     return cmd;
  // }

  createParallelCommandBuilder(): {
    parallelCommand: ParallelCommand;
    tools: {
      copyCmdToDevices: (...val: any) => any;
    };
    newStage: (stageKey: string, command: any) => void;
    getParallelCommand: () => ParallelCommand;
  } {
    return {
      parallelCommand: {
        CommandSetKey: 'parallelV2',
        devType: 'raid',
        CLICommands: []
      },
      tools: {
        copyCmdToDevices: (devIds: Array<string>, cmdArray) => {
          if (Array.isArray(devIds) && Array.isArray(cmdArray)) {
            const command = {};
            devIds.forEach((id: string) => {
              const newCmdArray:any[] = [];
              // Clone cmdArray
              for (const idx of Object.keys(cmdArray)) {
                const cmdItem:any = Object.assign({}, cmdArray[idx]);
                newCmdArray.push(cmdItem);
              }
              command[id] = newCmdArray.map((newCmd: any) => {
                newCmd.devID = id;
                return newCmd;
              });
            });
            return command;
          } else {
            console.warn('"devIds" & "cmdArray" must be an array.');
          }
        }
      },
      newStage(stageKey: string, command: any): void {
        this.parallelCommand.CLICommands.push({
          stageKey: stageKey || '',
          command: command || {}
        });
      },
      getParallelCommand(): ParallelCommand {
        return this.parallelCommand;
      }
    };
  }

  /*
    isGlobalRefReturn: (boolean)
    isGlobalRefparam: raidCmd.(boolean)
  */
  commandSetV2(params: any, callback: any): void {
    if (typeof params !== 'object' || Array.isArray(params)) {
      callback('The "params" format is not correct, it should be a JSON object.');
    } else if (!Array.isArray(params.CLICommands) || params.CLICommands.length === 0) {
      if (!params.CLICommands.map((item) => {
        return typeof item === 'object' && !Array.isArray(item);
      }).reduce((a, b) => {
        return a && b;
      })) {
        callback('The "CLICommands" format is not correct, it should be a JSON object array.');
      }
    } else {
      callback(null, {
        CommandSetKey: 'parallelV2',
        devType: 'raid',
        CLICommands: params.CLICommands
      });
    }
  }

  /*
    isGlobalRefReturn: (boolean)
    isGlobalRefparam: raidCmd.(boolean)
  */
  commandSet(params: any, callback: any): void {
    if (typeof params !== 'object' || Array.isArray(params)) {
      callback('The "params" format is not correct, it should be a JSON object.');
    } else if (!Array.isArray(params.CLICommands) || params.CLICommands.length === 0) {
      if (!params.CLICommands.map((item) => {
        return typeof item === 'object' && !Array.isArray(item);
      }).reduce((a, b) => {
        return a && b;
      })) {
        callback('The "CLICommands" format is not correct, it should be a JSON object array.');
      }
    } else {
      if (!params.CLICommands.map((item: any) => {
        return Array.isArray(item.command) && item.command.map((subItem: any) => {
          return Array.isArray(subItem);
        }).reduce((a, b) => {
          return a && b;
        });
      }).reduce((a, b) => {
        return a && b;
      })) {
        callback('The "command" is two dimension, it should contain array.');
      } else {
        callback(null, {
          CommandSetKey: params.CommandSetKey,
          devType: 'raid',
          deviceIdList: params.deviceIdList,
          targetList: params.targetList,
          CLICommands: params.CLICommands,
          fwFilePath: params.fwFilePath,
          biosFilePath: params.biosFilePath,
          isRolling: params.isRolling,
          shutdown: params.shutdown,
          reset: params.reset,
          defaultRestore: params.defaultRestore,
          devID: params.devID,
          waitUntilComplete: params.waitUntilComplete
        });
      }
    }
  }
  /**
   * @param parallelCLIParam = {
   *   customErrorMsgs: (string),
   *   severity: (ParallelCLISeverity string)
   * }
   */
  static setParallelCLIParam(cmd: RaidCliCmd, parallelCLIParam: raidCmd.ParallelCLIParam): RaidCliCmd {
    if (!parallelCLIParam) {
      console.error('If this command required parallelCLIParam.');
      return cmd;
    } else {
      if (parallelCLIParam.severity) {
        let matched = false;
        for (const key in ParallelCLISeverity) {
          if (ParallelCLISeverity[key] === parallelCLIParam.severity) {
            matched = true;
          }
        }
        if (!matched) {
          console.error('ParallelCLISeverity key is not exist.');
          return cmd;
        }
      }
    }
    if (cmd) {
      cmd.parallelCLIParam = parallelCLIParam;
    }
    return cmd;
  }

  setAsBackgroundJob(cmd: RaidCliCmd, bgJobParam: raidCmd.BgJobParam): (RaidCliCmd | undefined) {
    if (!bgJobParam || !bgJobParam.param || !bgJobParam.key) {
      console.error('If this command is a background job. Param & key are required.');
      return ;
    } else if (!bgJobParam.param.Type) {
      console.error('Type is required.');
      return ;
    }
    if (!bgJobParam.param.Target) {
      bgJobParam.param.Target = TextToolService.generateGUID();
    }
    if (cmd) {
      if (cmd.param) {
        cmd.param.bgJob = bgJobParam;
      } else {
        cmd.param = {
          bgJob: bgJobParam
        };
      }
    }
    return cmd;
  }

  // function setSedRefReturn(devID, _refReturn, refParam, param) {
  //     return {
  //         key: 'setSedRefReturn',
  //         devID: devID,
  //         refReturn: {
  //             sedKey: 'sedKey'
  //         },
  //         refParam: refParam,
  //         Param: param
  //     };
  // }
  setSedRefReturn(cmd: RaidCliCmd, param: raidCmd.SetSedRefReturnParam) {
    return {
      key: 'setSedRefReturn',
      devID: cmd.devID,
      refReturn: {
        sedKey: 'sedKey'
      },
      refParam: cmd.refParam,
      param
    };
  }

  // /*
  // param = {
  //     keyType: (string)('File' | 'String')
  // }
  // */
  // function setSedKeyForce(devID, refReturn, _refParam, param) {
  //     return {
  //         key: 'setSedKeyForce',
  //         devID: devID,
  //         refReturn: refReturn,
  //         refParam: {
  //             sedKey: 'sedKey'
  //         },
  //         param: raidCmd.param
  //     };
  // }
  setSedKeyForce(cmd: RaidCliCmd, param: raidCmd.SetSedKeyForceParam) {
    return {
      key: 'setSedKeyForce',
      devID: cmd.devID,
      refReturn: cmd.refReturn,
      refParam: {
        sedKey: 'sedKey'
      },
      param
    };
  }
  // /*
  // param = {
  //     sedKey: (string)
  //     stringFile: (string)('File' | 'String')
  //     ldList: (array)
  // }
  // */
  // function setLdSedForceEnable(devID, param, callback) {
  //     var object = {
  //         key: 'setLdSedForceEnable',
  //         devID: devID,
  //         refReturn: {},
  //         refParam: {},
  //         Param: {
  //             stringFile: param.stringFile,
  //             ldList: param.ldList.join(',')
  //         }
  //     };
  //     if (param.sedKey) {
  //         object.param.sedKey = param.sedKey;
  //     } else {
  //         object.refParam.sedKey = 'sedKey';
  //     }
  //     if (typeof param.isGlobalRefParam === 'boolean') {
  //         object.param.isGlobalRefParam = param.isGlobalRefParam;
  //     }
  //     if (callback) {
  //         callback(null, object);
  //     } else {
  //         return object;
  //     }
  // }
  setLdSedForceEnable(cmd: RaidCliCmd, param: raidCmd.SetLdSedForceEnableParam, callback?: (...val: any) => any) {
    const object = {
      key: 'setLdSedForceEnable',
      devID: cmd.devID,
      refReturn: cmd.refReturn,
      refParam: cmd.refParam,
      param: {
        stringFile: param.stringFile,
        ldList: param.ldList.join(','),
        sedKey: '',
        isGlobalRefParam: true,
      }
    };
    if (param.sedKey) {
      object.param.sedKey = param.sedKey;
    } else {
      object.refParam.sedKey = 'sedKey';
    }
    if (typeof param.isGlobalRefParam === 'boolean') {
      object.param.isGlobalRefParam = param.isGlobalRefParam;
    }
    if (callback) {
      callback(null, object);
    } else {
      return object;
    }
  }
  // /*
  // param = {
  //     ldList: (array)
  // }
  // */
  // function setLdSedForceDisable(devID, param, callback) {
  //     var object = {
  //         key: 'setLdSedForceDisable',
  //         devID: devID,
  //         refReturn: {},
  //         refParam: {},
  //         Param: {
  //             ldList: param.ldList.join(',')
  //         }
  //     };
  //     if (callback) {
  //         callback(null, object);
  //     } else {
  //         return object;
  //     }
  // }

  setLdSedForceDisable(cmd: RaidCliCmd, param: raidCmd.SetLdSedForceDisableParam, callback?: (...val: any) => any) {
    const object = {
      key: 'setLdSedForceDisable',
      devID: cmd.devID,
      refReturn: cmd.refReturn,
      refParam: cmd.refParam,
      param: {
        ldList: param.ldList.join(','),
      }
    };
    if (callback) {
      callback(null, object);
    } else {
      return object;
    }
  }

  static fssCsEnclosureAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsEnclosureAddParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsDeviceFormat';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // function fssCsVolumeCloudCreate(devID ,_refRetunArr, refParmArr, nodeID, volumeID, volumeName, worm, description, writeBack, autoRebalance, clusterName, fullRestore) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssCsVolumeCloudCreate';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['n'] = nodeID;
  //     param['s'] = volumeID;
  //     param['v'] = volumeName;
  //     param['w'] = worm ? "on" : "off";
  //     if (description) {
  //         param['d'] = description;
  //     }
  //     param['e'] = writeBack ? "on" : "off";
  //     param['a'] = autoRebalance ? "on" : "off";
  //     param['c'] = clusterName;
  //     if (fullRestore) {
  //         param['r'] = "";
  //     }

  //     if (refParmArr && refParmArr.length > 0 && refParmArr[0]) {
  //         refParam['s'] = refParmArr[0];
  //     }
  //     return cmd;
  // }
  static fssCsVolumeCreateGet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeCreateGetParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsVolumeCreateGet';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssCsVolumeCreateSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeCreateSetParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsVolumeCreateSet';
    raidCliCmd.param = {};

    raidCliCmd.param['c'] = param.clusterName;
    raidCliCmd.param['v'] = param.volumeName;
    raidCliCmd.param['t'] = param.protectionLevel;
    raidCliCmd.param['o'] = param.poolType;
    raidCliCmd.param['s'] = param.size;

    if (param.quotaSwitch) {
      raidCliCmd.param['q'] = 'on';
    }
    if (param.description) {
      raidCliCmd.param['d'] = param.description;
    }
    if (param.worm) {
      raidCliCmd.param['w'] = 'on';
    }

    if (param.distributed_number) {
      raidCliCmd.param['x'] = param.distributed_number;
    }
    if (param.max_distributed_number) {
      raidCliCmd.param['y'] = param.max_distributed_number;
    }
    if (param.enclosureList) {
      raidCliCmd.param['j'] = JSON.stringify(param.enclosureList);
    }
    if (param.autoRebalance) {
      raidCliCmd.param['a'] = 'on';
    }
    if (param.writeBackOpt) {
      raidCliCmd.param['e'] = param.writeBackOpt;
    }
    if (param.softlimit) {
      raidCliCmd.param['l'] = param.softlimit;
    }
    if (param.retention) {
      raidCliCmd.param['r'] = param.retention;
    }
    if (param.lockTime) {
      raidCliCmd.param['m'] = param.lockTime;
    }
    if (param.advancedACL) {
      raidCliCmd.param['A'] = "";
    }
    if (param.nodes) {
      raidCliCmd.param['N'] = param.nodes;
    }
    if (param.CompressPolicy) {
      raidCliCmd.param['C'] = param.CompressPolicy;
    }
    if (param.enableDedup) {
      raidCliCmd.param['D'] = "";
    }
    if (param.fileSystem) {
      raidCliCmd.param['f'] = param.fileSystem;
    }

    return raidCliCmd;
  }

  static fssCsVolumeEdit(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeEditParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsVolumeEdit';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssCsVolumeAutoRebalance(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeAutoRebalanceParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsVolumeAutoRebalance';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssCsVolumeDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeDeleteParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsVolumeDelete';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssCsVolumeSetQuota(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeSetQuotaParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsVolumeSetQuota';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssCsVolumeDelQuota(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeDelQuotaParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsVolumeDelQuota';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * fssGSxFSCreate = FSS gsxfs create
   */
  static fssGSxFSCreate(raidCliCmd: RaidCliCmd, param: fssCmd.FssGSxFSCreateParam): RaidCliCmd {
    raidCliCmd.key = 'fssGSxFSCreate';

    let deviceIdList: string[] = [];
    let controllerList: string[] = [];
    let appSizeList: string[] = [];

    for (const device of param.device) {
      deviceIdList.push(device.deviceId);
      controllerList.push(device.controller);
      appSizeList.push(device.size);
    }

    raidCliCmd.param = {
      fsName: param.fsName,
      createSize: param.createSize,
      stripeSize: param.stripeSize,
      deviceIdList: deviceIdList.join(','),
      controllerList: controllerList.join(','),
      appSizeList: appSizeList.join(','),
      fsType: param.fsType,
      protection: param.protection,
      threshold: param.threshold,
      caseInsensitive: param.caseInsensitive ? 'True' : 'False',
    };
    return raidCliCmd;
  }

  /*
  * gsx folder create -p <path> -z  <a|b@0>
  * fssGsxFolderCreate =FSS gsx folder create [-p:p]#FSPagelistFolder;FSFolder;
  */
  static fssGSxFSFolderCreate(raidCliCmd: RaidCliCmd, param: fssCmd.FssGSxFSFolderCreateParam): RaidCliCmd {
    raidCliCmd.key = 'fssGSxFSFolderCreate';
    raidCliCmd.param = param;
    if(param.p)
      param.p = '\"' + param.p + '\"';
    return raidCliCmd;
  }

  // function fssCsSnapshotCreate(devID ,_refRetunArr, _refParmArr, clusterName, volumeName, siName, siDescription){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssCsSnapshotCreate';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['c'] = clusterName;
  //     param['v'] = volumeName;
  //     param['s'] = siName;
  //     if (siDescription) {
  //         param['d'] = siDescription;
  //     }
  //     param['t'] = "";

  //     return cmd;

  // }

  // function fssCsSnapshotDelete(devID ,_refRetunArr, _refParmArr, clusterName,  siName){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssCsSnapshotDelete';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['c'] = clusterName;
  //     param['s'] = siName;

  //     return cmd;

  // }

  // function fssCsSnapshotRollback(devID ,_refRetunArr, _refParmArr, clusterName,  siName){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssCsSnapshotRollback';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['c'] = clusterName;
  //     param['s'] = siName;

  //     return cmd;

  // }

  // function fssCsSnapshotMount(devID ,_refRetunArr, _refParmArr, clusterName,  siName){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssCsSnapshotMount';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['c'] = clusterName;
  //     param['s'] = siName;

  //     return cmd;

  // }

  // function fssCsSnapshotUnmount(devID ,_refRetunArr, _refParmArr, clusterName,  siName){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssCsSnapshotUnmount';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['c'] = clusterName;
  //     param['s'] = siName;

  //     return cmd;

  // }

  static fssNetFunc(raidCliCmd: RaidCliCmd, param: fssCmd.FssNetFuncParam, funcName: string): RaidCliCmd {
    raidCliCmd.key = TextToolService.format('fssNetFunc{0}', funcName); // funcName = [ComModify]
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static updateCSDriveRec(raidCliCmd: RaidCliCmd, param: raidCmd.UpdateCSDriveRecParam, callback?: (...val: any) => any): RaidCliCmd {
    raidCliCmd.key = 'setRestfulConfigCSDriveRec',
      raidCliCmd.param = param;
    if (callback) {
      callback(null, raidCliCmd);
    }
    return raidCliCmd;
  }

  static fssCsIfconfigSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsIfconfigSetParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsIfconfigSet';
    raidCliCmd.param = param;

    param.nid = '\"' + param.nid + '\"';
    param.c = '\"' + param.c + '\"';
    param.t = '\"' + param.t + '\"';
    param.m = '\"' + param.m + '\"';
    if (param.bm) {
      param.bm = '\"' + param.bm + '\"';
    }
    param.type4 = '\"' + param.type4 + '\"';
    if (param.type4 === 'static') {
      param.ip4 = '\"' + param.ip4 + '\"';
      param.nm4 = '\"' + param.nm4 + '\"';
      param.gw4 = '\"' + param.gw4 + '\"';
    }

    param.type6 = '\"' + param.type6 + '\"';
    if (param.type6 === 'static') {
      param.ip6 = '\"' + param.ip6 + '\"';
      param.pl6 = '\"' + param.pl6 + '\"';
      param.gw6 = '\"' + param.gw6 + '\"';
    }

    return raidCliCmd;
  }

  static fssCsIfconfigUnset(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsIfconfigUnsetParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsIfconfigUnset';
    raidCliCmd.param = param;

    param.nid = '\"' + param.nid + '\"';
    param.c = '\"' + param.c + '\"';
    return raidCliCmd;
  }

  static fssCsIfconfigRouteSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsIfconfigRouteSetParam, action: string): RaidCliCmd {
    if (action === 'add') {
      raidCliCmd.key = 'fssCsIfconfigAddroute';
    } else if (action === 'del') {
      raidCliCmd.key = 'fssCsIfconfigDelroute';
    } else {
      raidCliCmd.key = 'unknown';
    }
    raidCliCmd.param = param;

    param.nid = '"' + param.nid + '"';
    param.c = '"' + param.c + '"';
    if (param.d) {
      param.d = '"' + param.d + '"';
    }
    if (param.m) {
      param.m = '"' + param.m + '"';
    }
    if (param.g) {
      param.g = '"' + param.g + '"';
    }
    param.p = '"' + param.p + '"';

    return raidCliCmd;
  }

  static fssCsIfconfigRmNode(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsIfconfigRmNodeParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsIfconfigRmNode';
    raidCliCmd.param = param;
    raidCliCmd.param.nid = '\"' + raidCliCmd.param.nid + '\"';
    return raidCliCmd;
  }

  static fssSetChannliNetConfOnly(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetChannliNetConfOnlyParam): RaidCliCmd {
    raidCliCmd.key = 'fssIfconfigInetSetConfOnly';
    raidCliCmd.param = param;
    if (param.policy === 'Static') {
      param.policy = 'static';
      if (param.ip === '') {
        param.ip = '0.0.0.0';
      }
      if (param.netmask) {
        param.netmask = 'netmask ' + param.netmask;
      }
      if (param.gateway) {
        param.gateway = 'gateway ' + param.gateway;
      }
    } else {
      param.policy = 'dhcp';
    }

    if (param.gateway == null || param.gateway === '') {
      delete param.gateway;
    }
    return raidCliCmd;
  }

  static fssTrunkSetConfOnly(raidCliCmd: RaidCliCmd, param: fssCmd.FssTrunkSetConfOnlyParam): RaidCliCmd {
    raidCliCmd.key = 'fssTrunkSetConfOnly';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssIfconfigGroupSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssIfconfigGroupSetParam): RaidCliCmd {
    raidCliCmd.key = 'fssIfconfigGroupSet';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssCsSync(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsSyncTypes): RaidCliCmd {
    raidCliCmd.key = 'fssCsGupdateSync';
    const csSyncParam: fssCmd.FssCsSyncParam = {
      t: Object.keys(param.types).filter((item: string) => {
        return param.types[item];
      }).join(','),
      slot: 'slotA'
    };
    raidCliCmd.param = csSyncParam;
    return raidCliCmd;
  }

  static fssCsSyncInfo(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsSyncInfoParam): RaidCliCmd {
    const csSyncParam: fssCmd.FssCsSyncParam = {
      t: param.type,
      slot: 'slotA',
    };
    raidCliCmd.key = 'fssCsGupdateSync';
    raidCliCmd.param = csSyncParam;
    return raidCliCmd;
  }
  /*
  params = {
      eventId: (string),
      eventType: (string),
      eventSeverity: (number),
      parameterArray: (array) ([param object])
  }
  */
  /*
  eventSeverity:
      1       => Information
      2       => Warning
      3       => Error
      4       => Critical
  */
  /*
  param:
      key     => The key token in language files.
      type    => Token type (%s | %d).
      value   => The value you want to show.
  */
  /*
  CLI example:
      utility sendGeneralEvent 840F815D 7F 1 {0},%s,-1,WTF,{1},%s,-1,WTF2
  event table example:
      840F815D=New JBOD enclosure #{0}# is added to node #{1}#.$2${0}$%s${1}$%s$|
  */
  emitSWEvent(devID: string, refReturn: any, refParam: any, params: any, callback: any): any {
    const eventId = params.eventId;
    const eventType = params.eventType || '7F';
    const eventSeverity = params.eventSeverity || 1;
    const parameterArray = params.parameterArray || [];
    const cmd = {
      key: 'utilitySendGeneralEvent',
      devID,
      param: {
        'event-id': eventId,
        'event-type': eventType,
        'event-severity': eventSeverity,
        parameters: parameterArray.map((param: any) => {
          return TextToolService.format('{0},{1},-1,{2}', param.key, param.type || '%s', param.value);
        }).join(';')
      },
      refReturn,
      refParam,
    };
    if (callback) {
      callback(null, cmd);
    } else {
      return cmd;
    }
  }

  fssCsVolumeHeal(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeHealParam, callback: any): (RaidCliCmd | undefined) {
    const key = param.operation === 'set' ? 'Set' : param.operation === 'get' ? 'Get' : 'Heal';
    raidCliCmd.key = TextToolService.format('fssVolumeFuncVolumeHeal{0}', key);
    raidCliCmd.param = param;
    if (callback) {
      if (typeof param.c !== 'string') {
        callback('clusterName is not correct');
      } else if (param.operation !== 'heal' && typeof param.i !== 'number') {
        callback('interval is not correct');
      } else if (['get', 'set', 'heal'].indexOf(param.operation) < 0) {
        callback('operation is no correct');
      } else {
        callback(null, raidCliCmd);
      }
    } else {
      return raidCliCmd;
    }
  }

  fssCsCrossHeal(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsCrossHealParam, callback: any): (RaidCliCmd | undefined) {
    const key = param.operation === 'set' ? 'Set' : param.operation === 'get' ? 'Get' : 'Heal';
    raidCliCmd.key = TextToolService.format('fssClusterFuncCrossHeal{0}', key);
    raidCliCmd.param = param;
    if (callback) {
      if (typeof param.c !== 'string') {
        callback('clusterName is not correct');
      } else if (param.operation !== 'heal' && typeof param.i !== 'number') {
        callback('interval is not correct');
      } else if (['get', 'set', 'heal'].indexOf(param.operation) < 0) {
        callback('operation is no correct');
      } else {
        callback(null, raidCliCmd);
      }
    } else {
      return raidCliCmd;
    }
  }

  static fssCsGetBgJob(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsGetBgJobParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsGetBgJob';
    return raidCliCmd;
  }

  fssCsRebalanceAbort(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsRebalanceAbortParam, callback: any): (RaidCliCmd | undefined) {
    raidCliCmd.key = 'fssVolumeFuncNodeRebalanceAbort';
    raidCliCmd.param = param;
    if (callback) {
      if (typeof param.c !== 'string') {
        callback('clusterName is not correct');
      } else {
        callback(null, raidCliCmd);
      }
    } else {
      return raidCliCmd;
    }
  }
  // /*
  // params = {
  //     clusterName: (string)
  // }
  // */
  fssCsRebalanceStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsRebalanceStatusParam, callback: any): (RaidCliCmd | undefined) {
    raidCliCmd.key = 'fssClusterFuncRebalanceStatus';
    raidCliCmd.param = param;
    if (callback) {
      if (typeof param.c !== 'string') {
        callback('clusterName is not correct');
      } else {
        callback(null, raidCliCmd);
      }
    } else {
      return raidCliCmd;
    }
  }

  // /*
  // params = {
  //     clusterName: (string)
  // }
  // */
  fssClusterFuncReplaceCheck(raidCliCmd: RaidCliCmd, param: fssCmd.FssClusterFuncReplaceCheckParam, callback: any): (RaidCliCmd | undefined) {
    raidCliCmd.key = 'fssClusterFuncReplaceCheck';
    raidCliCmd.param = param;
    if (callback) {
      if (typeof param.c !== 'string') {
        callback('clusterName is not correct');
      } else {
        callback(null, raidCliCmd);
      }
    } else {
      return raidCliCmd;
    }
  }
  // params = {
  //     clusterName: (string)
  //     sourceNodeId: (string)
  //     targetNodeId: (string)
  //     operationKey: (string)
  //     successOrFail: (string) (success | failed)
  // }
  // */
  // function fssClusterFuncReplaceSet(devID, refReturn, refParam, params, callback) {
  //     var cmd = {
  //         key: 'fssClusterFuncReplaceSet',
  //         devID: devID,
  //         param: raidCmd.{
  //             c: params.clusterName,
  //             s: params.sourceNodeId,
  //             t: params.targetNodeId,
  //             m: params.operationKey
  //         },
  //         refReturn: refReturn,
  //         refParam: refParam
  //     };
  //     if (params.successOrFail) {
  //         cmd.param.u = params.successOrFail;
  //     }
  //     if (callback) {
  //         if (typeof params.clusterName !== 'string') {
  //             callback('clusterName is not correct');
  //         } else {
  //             callback(null, cmd);
  //         }
  //     } else {
  //         return cmd;
  //     }
  // }

  // /*
  // params = {
  //     clusterName: (string)
  // }
  // */
  fssCsLastReplaceNode(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsLastReplaceNodeParam, callback: any): (RaidCliCmd | undefined) {
    raidCliCmd.key = 'fssClusterFuncLastReplaceNode';
    raidCliCmd.param = param;
    if (callback) {
      if (typeof param.c !== 'string') {
        callback('clusterName is not correct');
      } else {
        callback(null, raidCliCmd);
      }
    } else {
      return raidCliCmd;
    }
  }

  // /*
  // params = {
  //     operation: (string)('SSD'|'Hybrid'|'HDD'|'ALL'),
  //     clusterName: (string)
  // }
  // */
  fssVolumeFuncNodeRebalance(raidCliCmd: RaidCliCmd, param: fssCmd.FssVolumeFuncNodeRebalanceParam, callback: any): (RaidCliCmd | undefined) {
    raidCliCmd.key = 'fssVolumeFuncNodeRebalance';
    raidCliCmd.param = param;
    if (callback) {
      if (typeof param.c !== 'string') {
        callback('clusterName is not correct');
      } else {
        callback(null, raidCliCmd);
      }
    } else {
      return raidCliCmd;
    }
  }
  // function fssVolumeFuncNodeRebalance(devID, refReturn, refParam, params, callback) {
  //     var cmd = {
  //         key: 'fssVolumeFuncNodeRebalance',
  //         devID: devID,
  //         param: raidCmd.{
  //             c: params.clusterName,
  //             o: params.operation
  //         },
  //         refReturn: refReturn,
  //         refParam: refParam
  //     };
  //     if (callback) {
  //         if (typeof params.clusterName !== 'string') {
  //             callback('clusterName is not correct');
  //         } else {
  //             callback(null, cmd);
  //         }
  //     } else {
  //         return cmd;
  //     }
  // }

  // /*
  // params = {
  //     old clusterName: (string)
  //     new clusterName: (string)
  // }
  // fss cluster-func rename -c <oldClusterName> -r <newClusterName>
  // */
  // _this.fssClusterFuncRename = fssClusterFuncRename;
  // function fssClusterFuncRename(devID, refReturn, refParam, params) {
  //     var cmd = {};

  //     cmd.key = 'fssClusterFuncRename';
  //     cmd.devID = devID;
  //     cmd.param = params;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     return cmd;
  // }

  // _this.fssClusterFuncCreate = fssClusterFuncCreate;
  // //fssClusterFuncCreate = FSS cluster-func create -c [clusterName] -n [param]
  // function fssClusterFuncCreate(devID, _refRetunArr, _refParmArr, clusterName, param) {
  //     var cmd = {};
  //     var param_in = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssClusterFuncCreate';
  //     cmd.devID = devID;
  //     cmd.param = param_in;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param_in['clusterName'] = clusterName;
  //     param_in['param'] = param;

  //     return cmd;
  // }
  static fssVolumeFuncVolumeRebalanceSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeFuncVolumeRebalanceSetParam): RaidCliCmd {
    raidCliCmd.key = 'fssVolumeFuncVolumeRebalanceSet';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // function fssCsVolumeExpandGet(devID ,_refRetunArr, _refParmArr, clusterName, volumeName, enclosureInfo ){
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssCsVolumeExpandGet';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['c'] = clusterName;
  //     param['v'] = volumeName;
  //     if(enclosureInfo !== ''){
  //         param['j'] = enclosureInfo;
  //     }
  //     return cmd;
  // }
  static fssCsVolumeExpandSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeExpandSetParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsVolumeExpandSet';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssVolumeFuncVolumeHealHeal(raidCliCmd: RaidCliCmd, param: fssCmd.FssVolumeFuncVolumeHealHealParam): RaidCliCmd {
    raidCliCmd.key = 'fssVolumeFuncVolumeHealHeal';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssVolumeFuncSetRdma(raidCliCmd: RaidCliCmd, param: fssCmd.FssVolumeFuncSetRdmaParam): RaidCliCmd {
    raidCliCmd.key = 'fssVolumeFuncSetRdma';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssVolumeFuncSetNFS32bit(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForNFS): RaidCliCmd {

    raidCliCmd.key = 'fssVolumeFuncSetNFS32bit';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  // function fssClusterFuncShrink(devID ,_refRetunArr, _refParmArr, clusterName, nodeID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssClusterFuncShrink';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['c'] = clusterName;
  //     param['n'] = nodeID;

  static fssClusterFuncShrink(raidCliCmd: RaidCliCmd, param: fssCmd.FssClusterFuncShrinkParam): RaidCliCmd {
    raidCliCmd.key = 'fssClusterFuncShrink';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // function fssCsDeviceClear(devID, _refRetunArr, _refParmArr, clusterName, nodeID, csVolumeID) {
  //     var cmd = {};
  //     var param = {};
  //     var refReturn = {};
  //     var refParam = {};

  //     cmd.key = 'fssCsDeviceClear';
  //     cmd.devID = devID;
  //     cmd.param = param;
  //     cmd.refReturn = refReturn;
  //     cmd.refParam = refParam;

  //     param['c'] = clusterName;
  //     param['n'] = nodeID;
  //     param['s'] = csVolumeID;

  //     return cmd;
  // }


  static fssCsLocalNtp(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsLocalNtpParam): RaidCliCmd {
    const csLocalNtpParam: fssCmd.FssCsLocalNtpParam = {
      opt: param.opt,
      slot: 'slotA',
    };
    raidCliCmd.key = 'fssCsLocalNtp';
    raidCliCmd.param = csLocalNtpParam;

    return raidCliCmd;
  }

  static fssCsVolumeWriteBack(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeWriteBackParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsVolumeWriteBack';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * CS smart-func to set load balance
   */
  static fssCsSmartSetLoadBalance(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsSmartSetLoadBalance): RaidCliCmd {
    raidCliCmd.key = 'fssCsSmartSetLoadBalance';
    raidCliCmd.param = param;
    return raidCliCmd;
  }
  /**
   * CS smart-func to unset load balance
   */
  static fssCsSmartUnsetLoadBalance(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsSmartUnsetLoadBalance): RaidCliCmd {
    raidCliCmd.key = 'fssCsSmartUnsetLoadBalance';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * NAS pool down flag
   */
  static fssSystemClusterDown(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'fssSystemClusterDown';
    raidCliCmd.param = {};
    return raidCliCmd;
  }

  static deleteTargetFile(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteTargetFileParam): RaidCliCmd {
    raidCliCmd.key = 'deleteTargetFile';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssCsDataRecoveryState(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsDataRecoveryStateParam): RaidCliCmd {
    raidCliCmd.key = 'fssCsDataRecoveryState';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static setHost(raidCliCmd: RaidCliCmd, param: raidCmd.SetHostParam): RaidCliCmd {
    raidCliCmd.key = 'setHost';
    raidCliCmd.param = param;
    raidCliCmd.param.y = ''; // always 'yes'
    return raidCliCmd;
  }

  static fssSetDefaultRouteRedundant(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetDefaultRouteRedundantParam): RaidCliCmd {
    raidCliCmd.key = 'fssRouteSetDefault';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static setChannel(raidCliCmd: RaidCliCmd, param: raidCmd.SetChannelParam): RaidCliCmd {
    raidCliCmd.key = 'setChannel';
    raidCliCmd.param = param;
    if (raidCliCmd.param.aid === '') {
      raidCliCmd.param.aid = 'delete';
    }
    if (raidCliCmd.param.bid === '') {
      raidCliCmd.param.bid = 'delete';
    }
    return raidCliCmd;
  }

  static setChannelOwner(raidCliCmd: RaidCliCmd, param: raidCmd.SetChannelOwnerParam): RaidCliCmd {
    raidCliCmd.key = 'setChannelOwner';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static setNet(raidCliCmd: RaidCliCmd, param: raidCmd.SetNetParam): RaidCliCmd {
    raidCliCmd.key = 'setNet';
    raidCliCmd.param = param;
    // ipv4
    let ip = '';
    let mask = '';
    let gw = '';
    if (param.netType === 'DHCP') {
      ip = 'dhcp';
    } else {
      if (param.ip_A) {
        ip = param.ip_A;
      }
      if (param.mask_A) {
        mask = param.mask_A;
      }
      if (param.gw_A) {
        gw = param.gw_A;
      }
      if (param.isRedundant) {
        if (param.ip_B) {
          ip = `${ip},${param.ip_B}`;
        }
        if (param.mask_B) {
          mask = `${mask},${param.mask_B}`;
        }
        if (param.gw_B) {
          gw = `${gw},${param.gw_B}`;
        }
      }
    }
    // ipv6
    let v6Ip = '';
    let prefix = '';
    let route = '';
    if (param.v6NetType === 'Disabled') {
      v6Ip = '';
    } else if (param.v6NetType === 'Auto') {
      v6Ip = 'dhcp';
    } else {
      if (param.v6Ip_A) {
        v6Ip = param.v6Ip_A;
      }
      if (param.prefix_A) {
        prefix = param.prefix_A;
      }
      if (param.route_A) {
        route = param.route_A;
      }
      if (param.isRedundant) {
        if (param.v6Ip_B) {
          v6Ip = v6Ip + ',' + param.v6Ip_B;
        }
        if (param.prefix_B) {
          prefix = prefix + ',' + param.prefix_B;
        }
        if (param.route_B) {
          route = route + ',' + param.route_B;
        }
      }
    }
    if (ip) {
      param.ip = ip;
    }
    if (mask) {
      param.mask = mask;
    }
    if (gw) {
      param.gw = gw;
    }
    if (v6Ip === '') {
      param.v6ip = '""';
    } else {
      param.v6ip = v6Ip;
    }
    if (prefix) {
      param.prefix = prefix;
    }
    if (route) {
      param.route = route;
    }
    return raidCliCmd;
  }

  static setChannelJumboFrame(raidCliCmd: RaidCliCmd, param: raidCmd.SetChannelJumboFrameParam): RaidCliCmd {
    raidCliCmd.key = 'setChannelJumboFrame';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static fssSetChannlMtu(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetChannelMtuParam): RaidCliCmd {
    raidCliCmd.key = 'fssDladmSet';
    raidCliCmd.param = param;
    if (param.interf.indexOf('mgmt') > -1 || // set ip for nas management port
      param.interf.indexOf('trunk') > -1 || // set ip for nas trunk
      param.interf.indexOf('vch') > -1 || // set ip for vlan
      param.interf.indexOf('ch') > -1 || // set ip for normal channel
      param.interf.indexOf('CH') > -1 || // set ip for normal channel
      param.interf.indexOf('iftnic') > -1) { // set ip for normal channel
      param.interface = param.interf;
    } else {
      param.interface = 'ch' + param.interf;
    }
    return raidCliCmd;
  }

  // trunk add <-n trunkname> <-m interfac1 interface2 [interface3 ... ]> [-b mode] <-z {a|b}@serviceID>
  static fssTrunkAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssTrunkAddParam): RaidCliCmd {
    raidCliCmd.key = 'fssTrunkDelete';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // trunk delete <-n trunkname> <-m interfac1 interface2 [interface3 ... ]> <-z {a|b}@serviceID>
  static fssTrunkDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssTrunkDeleteParam): RaidCliCmd {
    raidCliCmd.key = 'fssTrunkDelete';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * # create trunk [channel-ID-list] [-r] [-y] [-p]
   */
  static createTrunk(raidCliCmd: RaidCliCmd, param: raidCmd.CreateTrunkParam): RaidCliCmd {
    raidCliCmd.key = 'createTrunk';
    raidCliCmd.param = param;
    param.p = '';
    return raidCliCmd;
  }

  static deleteTrunk(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteTrunkParam): RaidCliCmd {
    raidCliCmd.key = 'deleteTrunk';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * fssScifconfigSet=FSS scifconfig set [controller] [-t:t] [--type4:type4] [--ip4:ip4] [--nm4:nm4] [--gw4:gw4] [--type6:type6] [--ip6:ip6] [--pl6:pl6] [--gw6:gw6]
   */
  fssScifconfigSet(raidCliCmd: RaidCliCmd, param: raidCmd.SetScifconfigParam) {
    raidCliCmd.key = 'fssScifconfigSet';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /**
   * k8s csi client add <-i ip> <-u user> <-p password> [-r {yes|no}] <-z {a|b}@serviceID>
   */
  fssK8sCsiClientAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssK8sCsiClientAddParam) {
    raidCliCmd.key = 'fssK8sCsiClientAdd';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  /**
   * k8s csi client delete <-i ip> [-r {yes|no}] <-z {a|b}@serviceID>
   */
  fssK8sCsiClientDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssK8sCsiClientDeleteParam) {
    raidCliCmd.key = 'fssK8sCsiClientDelete';
    raidCliCmd.param = param;

    return raidCliCmd;
  }

  //FSS k8s csi sc apply <-d device_name> <-r raid_level> <-dt drive_type> [-i ip] [-p pool id]
  static fssK8sCsiScApply(raidCliCmd: RaidCliCmd, param: fssCmd.FssK8sCsiScApplyParam) {
    raidCliCmd.key = 'fssK8sCsiScApply';
    raidCliCmd.param = param;

    param.d = '\"' + param.d.replace(/\"/gi, '\\\"') + '\"';
    if (param.p && param.p != '') {
      param.p = param.p.replace(/,/g, ' ');
    }

    return raidCliCmd;
  }

  // FSS k8s csi sc delete <-n storage-class_name>
  static fssK8sCsiScDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssK8sCsiScDeleteParam) {
    raidCliCmd.key = 'fssK8sCsiDelete';
    raidCliCmd.param = param;

    if (param.n != '') {
      param.n = param.n.replace(/,/g, ' ');
    }

    return raidCliCmd;
  }



  // FSS folder attr set [slot] [-p:p] [-e:e] [-t:t] [-c:c] [-d:d] [-o:o] [-m:m]
  fssFolderAttrSet(raidCliCmd: RaidCliCmd, param: fssCmd.FolderAttrSetParam) {
    raidCliCmd.key = 'fssFolderAttrSet';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // FSS filecluster master ntp [-a:a] @GeneralAdmin
  fssFileClusterMasterNtp(raidCliCmd: RaidCliCmd, param: fssCmd.FssFileClusterMasterNtpParam) {
    raidCliCmd.key = 'fssFileClusterMasterNtp';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // FSS system sync_event_log
  static fssSystemSyncEventLog(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'fssSystemSyncEventLog';
    raidCliCmd.param = {};
    return raidCliCmd;
  }

  // disk flash [-s:disk_slot_list]
  static fssDiskFlash(raidCliCmd: RaidCliCmd, param: fssCmd.FssDiskFlashParam): RaidCliCmd {
    raidCliCmd.key = 'fssDiskFlash';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // k8sStorage disk add [device_id=device_id] [disk_slot_list=disk_slot_list]
  static k8sStorageDiskAdd(raidCliCmd: RaidCliCmd, param: fssCmd.K8sStorageDiskAddParam): RaidCliCmd {
    raidCliCmd.key = 'k8sStorageDiskAdd';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // system sanitize [-r:reboot]
  static systemSanitize(raidCliCmd: RaidCliCmd, param: fssCmd.SystemSanitizeParam): RaidCliCmd {
    raidCliCmd.key = 'fssSystemSanitize';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // system defaultrestore [-r:reboot]
  static systemDefaultRestore(raidCliCmd: RaidCliCmd, param: fssCmd.DefaultRestoreParam): RaidCliCmd {
    raidCliCmd.key = 'fssSystemDefaultrestore';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // diskpool removemissing [-n:device_id] [-t:remove_type]
  static fssDiskpoolRemovemissing(raidCliCmd: RaidCliCmd, param: fssCmd.FssDiskpoolRemovemissingParam): RaidCliCmd {
    raidCliCmd.key = 'fssDiskpoolRemovemissing';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // nvme disconnect [-n:disk_sn_list] [-s:unique_id]
  static fssNvmeDisconnect(raidCliCmd: RaidCliCmd, param: fssCmd.FssNvmeDisconnectParam): RaidCliCmd {
    raidCliCmd.key = 'fssNvmeDisconnect';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // FSS disk locate [-s:disk_slot_list]
  static fssDiskLocate(raidCliCmd: RaidCliCmd, param: fssCmd.FssDiskFlashParam): RaidCliCmd {
    raidCliCmd.key = 'fssDiskLocate';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /****************
   * IPMITool Cmds
   ****************/
  // ipmitool lan print 1
  static getBmcInfo(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'getBmcInfo';
    raidCliCmd.param = {};
    return raidCliCmd;
  }

  // ipmitool lan set 1 ipaddr [ip]
  static setBmcIp(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcIpParam): RaidCliCmd {
    raidCliCmd.key = 'setBmcIp';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // ipmitool lan set 1 ipsrc [policy]
  static setBmcPolicy(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcPolicyParam): RaidCliCmd {
    raidCliCmd.key = 'setBmcPolicy';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // ipmitool lan set 1 netmask [mask]
  static setBmcMask(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcMaskParam): RaidCliCmd {
    raidCliCmd.key = 'setBmcMask';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // ipmitool lan set 1 defgw ipaddr [gateway]
  static setBmcGateway(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcGatewayParam): RaidCliCmd {
    raidCliCmd.key = 'setBmcGateway';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // ipmitool sel time set [option]
  static setBmcTime(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcTimeParam): RaidCliCmd {
    raidCliCmd.key = 'setBmcTime';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // ipmitool raw 0x32 0xa8 [option] [data]
  static setBmcNtp(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcNtpParam): RaidCliCmd {
    raidCliCmd.key = 'setBmcNtp';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // ipmitool raw 0x32 0xa8 0x4
  static restartBmcNtp(raidCliCmd: RaidCliCmd): RaidCliCmd {
    raidCliCmd.key = 'restartBmcNtp';
    raidCliCmd.param = {};
    return raidCliCmd;
  }

  // TODO:???
  static syncBmcTimeSettings(raidCliCmd: RaidCliCmd, param: fssCmd.syncBmcTimeSettingsParam): RaidCliCmd {
    raidCliCmd.key = 'syncBmcTimeSettings';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /****************
   * LVM Cmds
   ****************/
  // lvm full-create [device_id_list=device_id_list] [-r:raid_level] [size=size] [-fs:file_system]
  //     [-ci:ci_option] [-c:compress_type] [-n:name] [-pv_size:pv_size]
  //     [-csi_folder_path:csi_folder_path]
  //     [-pv_description:pv_description] [-pv_access_modes:pv_access_modes]
  static createLvm(raidCliCmd: RaidCliCmd, param: fssCmd.CreateLvmParam): RaidCliCmd {
    raidCliCmd.key = 'lvmFullCreate';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // lvm expand [-u:uuid] [-s:size]
  static expandLvm(raidCliCmd: RaidCliCmd, param: fssCmd.ExpandLvmParam): RaidCliCmd {
    raidCliCmd.key = 'lvmExpand';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // lvm delete [-u:uuid]
  static deleteLvm(raidCliCmd: RaidCliCmd, uuid: string): RaidCliCmd {
    raidCliCmd.key = 'lvmDelete';
    raidCliCmd.param = {
      uuid: uuid
    };
    return raidCliCmd;
  }

  // lvm active [-u:uuid] [-n:name] [-d:devId] [-f:force]
  static activeLvm(raidCliCmd: RaidCliCmd, param: fssCmd.ActiveLVMParam): RaidCliCmd {
    raidCliCmd.key = 'lvmActive';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  /****************
   * K8S-API Cmds
   ****************/
  // kubectl create pv [-name:name] [-size:size]
  //     [-csi_folder_path:csi_folder_path]
  //     [-pv_description:pv_description] [-pv_access_modes:pv_access_modes]
  //     [-sc_name:sc_name}] [-sc_dedupe:sc_dedupe] [-sc_compress:sc_compress]
  //     [-sc_snapshot:sc_snapshot] [-sc_replica:sc_replica] [-sc_drive_type:sc_drive_type]
  //     [-sc_raid_level:sc_raid_level]
  static k8sCreatePv(raidCliCmd: RaidCliCmd, param: fssCmd.K8sCreatePvParam): RaidCliCmd {
    raidCliCmd.key = 'k8sApiKubectlCreatePv';
    raidCliCmd.param = {
      ...param,
      size: param.size || '10Gi',
      pv_access_modes: param.pv_access_modes || 'ReadWriteOnce'
    };
    return raidCliCmd;
  }

  // kubectl edit pv [-name:name] [-size:size]
  static k8sEditPv(raidCliCmd: RaidCliCmd, param: fssCmd.K8sEditPvParam): RaidCliCmd {
    raidCliCmd.key = 'k8sApiKubectlEditPv';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // kubectl delete pv [name]
  static kubectlDeleteLvm(raidCliCmd: RaidCliCmd, name: string): RaidCliCmd {
    raidCliCmd.key = 'kubectlDeletePv';
    raidCliCmd.param = { name: name };
    return raidCliCmd;
  }

  // deploy dns [domain] [start] [DNS]
  static k8sApiDeployDns(raidCliCmd: RaidCliCmd, param: fssCmd.DeployDnsParam): RaidCliCmd {
    raidCliCmd.key = 'k8sApiDeployDns';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // deploy notification [server] [port] [sender] [receiver] [account] [password]
  static k8sApiDeployNotification(raidCliCmd: RaidCliCmd, param: fssCmd.k8sApiDeployNotificationParam): RaidCliCmd {
    raidCliCmd.key = 'k8sApiDeployNotification';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // deploy appserver [address]
  static k8sApiDeployAppserver(raidCliCmd: RaidCliCmd, param: fssCmd.k8sApiDeployAppserverParam): RaidCliCmd {
    raidCliCmd.key = 'k8sApiDeployAppserver';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // deploy lbs [start] [end] [domain [password] [node]
  static k8sApiDeployLbs(raidCliCmd: RaidCliCmd, param: fssCmd.DeployLbsParam): RaidCliCmd {
    raidCliCmd.key = 'k8sApiDeployLbs';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // node set ScMgmtIp [-scmgmtIp:scmgmtIp]
  static k8sApiNodeSetScmgmtIp(raidCliCmd: RaidCliCmd, param: fssCmd.K8sNodeSetScmgmtIpParam): RaidCliCmd {
    raidCliCmd.key = 'k8sApiNodeSetScmgmtIp';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // remote show-external-storage [ip=${ip}] [uid=${uid}]
  static showExternalStorage(raidCliCmd: RaidCliCmd, param: fssCmd.ShowExternalStorageParam): RaidCliCmd {
    raidCliCmd.key = 'showExternalStorage';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  // remote show-external-storage [ip=${ip}] [uid=${uid}]
  static openFileExplorer(raidCliCmd: RaidCliCmd, param: fssCmd.openFileExplorerParam): RaidCliCmd {
    raidCliCmd.key = 'openFileExplorer';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

}

