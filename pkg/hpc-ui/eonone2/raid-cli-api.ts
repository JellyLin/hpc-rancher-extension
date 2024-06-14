import { RaidCliCmd, ParallelCommand, ParallelCLISeverity } from './interface/raid-cli-cmd';
import { TextToolService as tool } from './utility/text-tool.service';
import * as fssCmd from './interface/cmd-param-fss';
import * as raidCmd from './interface/cmd-param-raid';

/*
// This comment section will be remove after liveDemo is Synced

更新方式:
  1. 刪除 import 和 constructer 區塊
  2. 用 regexp 搜尋 command function :
	  - 舊版: "^  ([^ /}].*\(.*\).*{)$"
	  - 新版: "^  static ([^ /}].*\(.*\).*{)$"
  3. 複製所有搜尋結果，格式化保留其 function name
  4. 使用試算表排序並比對項目差異
*/
export function newRaidCmd(devID:string, refReturn:any, refParam:any): RaidCliCmd {
  return { devID, refReturn, refParam };
}

export class RaidCliAPI {
  constructor() {}

  // scheduleRR create [-tp:tp] [-sf:sf] [-st:st] [-e:e] [-a:a] [-P:P] [-u:u] [-pw:pw] 
  //     [-D:D] [-c:c] [-N:N] [-R:R] [-s:s] [-n:n] [-t:t] [-d:d] [-m:m] [-T:T] 
  //     [-mo:mo] [-sd:sd] [-ed:ed] [-r:r] [-p:p] [-et:et] [-du:du]
  /*
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
  */
  static fssScheduleRRCreate(raidCliCmd: RaidCliCmd, param: fssCmd.FssScheduleRRCreateParam): RaidCliCmd {
    return easyRaidCmd('fssScheduleRRCreate', raidCliCmd, param);
  }

  // create lv [LD-index-list] [name] [assign={assign-to}] [write={write-policy}] [tier={tier-level-list}]
  // - refParam:  'LD-index-list'
  // - refReturn: 'LV-ID'
  static createLV(raidCliCmd: RaidCliCmd, param: raidCmd.CreateLVParam): RaidCliCmd {
    return easyRaidCmd('createLV', raidCliCmd, param);
  }

  // set lv [LV-ID] [name={LV-name}] [assign={assign-to}] [write={write-policy}]
  static setLV(raidCliCmd: RaidCliCmd, param: raidCmd.SetLVParam): RaidCliCmd {
    return easyRaidCmd('setLv', raidCliCmd, param);
  }

  // set lv add [LV-ID] [LD-index-list] [tier={tier-level-list}]
  static setLvAdd(raidCliCmd: RaidCliCmd, param: raidCmd.SetLvAddParam): RaidCliCmd {
    return easyRaidCmd('setLvAdd', raidCliCmd, param);
  }

  // set lv multi-tier [LV-ID] {LD-index-list} {tier-level-list}
  static setLvMultiTier(raidCliCmd: RaidCliCmd, param: raidCmd.SetLvMultiTierParam): RaidCliCmd {
    return easyRaidCmd('setLvMultiTier', raidCliCmd, param);
  }

  // set lv expand [LV-ID] [size={expand-size}]
  static setLvExpand(raidCliCmd: RaidCliCmd, param: raidCmd.SetLvExpandParam): RaidCliCmd {
    return easyRaidCmd('setLvExpand', raidCliCmd, param);
  }

  // set lv tier-disable [LV-ID]
  static setLvTierDisable(raidCliCmd: RaidCliCmd, param: raidCmd.SetLvTierDisableParam): RaidCliCmd {
    return easyRaidCmd('setLvTierDisable', raidCliCmd, param);
  }

  // create lv threshold [lv-ID] [rules]        (rules=percent,policyCode)
  // set    lv threshold [lv-ID] [-m] [rules]   (rules=index,percent,policyCode)
  static addEditPoolThreshold(raidCliCmd: RaidCliCmd, param: raidCmd.AddEditPoolThresholdParam): RaidCliCmd {
    if (param.isEdit)
      return easyRaidCmd('setLvThreshold', raidCliCmd, param);
    else
      return easyRaidCmd('createLvThreshold', raidCliCmd, param);
  }

  // delete lv threshold [lv-ID] [index]
  static deletePoolThreshold(raidCliCmd: RaidCliCmd, param: raidCmd.DeletePoolThresholdParam): RaidCliCmd {
    return easyRaidCmd('deleteLvThreshold', raidCliCmd, param);
  }

  // create ld [RAID-level] [disk-list] [assign={assign-to}] [size={allocated-disk-capacity}] [stripe={stripe-size}]
  //     [mode={value}] [name={LD-alias-name}] [write={write-policy}] [-y]
  // - refReturn: 'LD', 'LD-ID'
  static createLD(raidCliCmd: RaidCliCmd, param: raidCmd.CreateLDParam): RaidCliCmd {
    return easyRaidCmdWithInject('createLD', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param.name = tool.quotation(param.name);
    });
  }

  // delete ld [index-list] [-y:y]
  static deleteLD(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteLDParam): RaidCliCmd {
    return easyRaidCmd('deleteLD', raidCliCmd, param);
  }

  // create part [LV-ID] [name] [size=size] [min=min] [init=init] [tier=tier] [fullcache=fullcache] 
  //     [alias=alias] [cga] [-f:f] [impartial=impartial] [-d:d] [threshold=threshold]
  //     [cloudmode=cloudmode] [cloudperiod=cloudperiod] [clouddedup=clouddedup] [cloudthreshold=cloudthreshold] 
  //     [enableFileSystem] [iofirst=iofirst] [compression=compression]
  //     [dedupduration=dedupduration] [dedupstarttimedayofweek=dedupstarttimedayofweek] [dedupstarttimehoursminute=dedupstarttimehoursminute]
  //     [-k:k] [category=category] [csDriveType=csDriveType] [bgJob=bgJob]
  // - refParam: 'LV-ID'
  // - refReturn: 'Part-ID'
  static createPart(raidCliCmd: RaidCliCmd, param: raidCmd.CreatePartParam): RaidCliCmd {
    return easyRaidCmdWithInject('createPart', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      
      switch(param.enableFileSystem){
        case "enable":  raidcmd.param['enableFileSystem'] = '-e'; break;
        case "target":  raidcmd.param['enableFileSystem'] = '-t'; break;
        default:
          raidcmd.param['enableFileSystem'] = '';
          delete raidcmd.param['fs'];
          delete raidcmd.param['compressionalgorithm'];
          delete raidcmd.param['inode'];
          break;
      }
      if (param.cga === 'enable') raidcmd.param['cga'] = '-c';
      if (param.isDockerType)     raidcmd.param['k'] = '';
      if (param.caseInsensitive)  raidcmd.param['ci'] = param.caseInsensitive;

    });
  }

  // set part [partition-ID] [name=name] [min=min] [cloudcache=cloudcache]
  static setPart(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartParam): RaidCliCmd {
    return easyRaidCmd('setPart', raidCliCmd, param);
  }

  // set part tier-resided [partition-ID] [tier=tier]
  static setPartTierResided(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartTierResidedParam): RaidCliCmd {
    return easyRaidCmd('setPartTierResided', raidCliCmd, param);
  }

  // show dbflush [ip] [-l:l]
  static getControllerDbFlushParameter(raidCliCmd: RaidCliCmd, param: raidCmd.DbFlushParam, isShowDBset: boolean): RaidCliCmd {
    return easyRaidCmdWithInject('showDBFlush', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      if(isShowDBset) {
        raidcmd.param['l'] = '';
        raidcmd.showArray = 'true';
      }
    });
  }

  // set dbflush [agentip] [clusterModel] [nodeip=nodeip] [cluster=cluster] [flushlog=flushlog]
  //     [type=type] [ip=ip] [port=port] [name=name] [user=user] [pass=pass] [enable=Enable]
  static setDbFlushSetting(raidCliCmd: RaidCliCmd, param: raidCmd.SetDbFlushParam): RaidCliCmd {
    return easyRaidCmd('setDBFlush', raidCliCmd, param);
  }

  // set dbflush [agentip] [clusterModel] [nodeip=nodeip] [cluster=cluster]
  //     [flushlog=flushlog] [type=type] [ip=ip] [port=port] [name=name] [user=user] [pass=pass] [enable=Enable]
  static showDBFlushTestInfo(raidCliCmd: RaidCliCmd, param: raidCmd.DbFlushParam): RaidCliCmd {
    return easyRaidCmd('showDBFlushTestInfo', raidCliCmd, param);
  }

  // delete full-pool [pool-ID] [-y:y] [-d:d] [bgJob=bgJob]
  static deleteFullPool(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteFullPoolParam, callback?: (...val: any) => any): RaidCliCmd {
    const raidcmd = easyRaidCmd('deleteFullPool', raidCliCmd, param);
    raidcmd.param.y = '';

    if (callback) callback(null, raidcmd);
    return raidcmd;
  }

  // delete full-part [partition-ID] [-y:y]
  static deleteFullPart(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteFullPartParam): RaidCliCmd {
    return easyRaidCmdWithInject('deleteFullPart', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param.y = '';
    });
  }
  

  // nvidia info
  static nvidiaInfo(raidCliCmd: RaidCliCmd, param: fssCmd.FssNvidiaInfo): RaidCliCmd {
    return easyRaidCmd('fssNvidiaInfo', raidCliCmd, param);;
  }

  // FSS terminate show [-c:c]
  static terminateShow(raidCliCmd: RaidCliCmd, param: fssCmd.FssTerminateShowParam): RaidCliCmd {
    raidCliCmd.showArray = 'true';
    return easyRaidCmd('fssTerminateShow', raidCliCmd, param);
  }

  // FSS terminate list [-c:c]
  static terminateList(raidCliCmd: RaidCliCmd, param: fssCmd.FssTerminateListParam): RaidCliCmd {
    raidCliCmd.showArray = 'true';
    return easyRaidCmd('fssTerminateList', raidCliCmd, param);
  }

  // FSS terminate add [-a:a] [-h:h] [-m:m] [-c:c] [-u:u]
  static terminateAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssTerminateAddParam): RaidCliCmd {
    return easyRaidCmd('fssTerminateAdd', raidCliCmd, param);
  }

  // FSS terminate del [-a:a] [-c:c]
  static terminateDel(raidCliCmd: RaidCliCmd, param: fssCmd.FssTerminateDelParam): RaidCliCmd {
    return easyRaidCmd('fssTerminateDel', raidCliCmd, param);
  }

  // set part expand [partition-ID] [size=size]
  static setPartExpand(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartExpandParam): RaidCliCmd {
    return easyRaidCmd('setPartExpand', raidCliCmd, param);
  }

  // set part setPartReclaimForGS [partition-ID] [priority=priority] [status]
  static setPartReclaimForGS(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartReclaimForGSParam): RaidCliCmd {
    return easyRaidCmd('setPartReclaimForGS', raidCliCmd, param);
  }

  // set part purge [partition-ID] [number] [rule-type]
  static setPartPurge(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartPurgeParam): RaidCliCmd {
    return easyRaidCmd('setPartPurge', raidCliCmd, param);
  }

  // set part mount [partition-ID]
  static setPartMount(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartMountParam): RaidCliCmd {
    return easyRaidCmd('setPartMount', raidCliCmd, param);
  }

  // set part unmount [partition-ID] [-y:y]
  static setPartUnmount(raidCliCmd: RaidCliCmd, param: raidCmd.SetPartMountParam): RaidCliCmd {
    return easyRaidCmdWithInject('setPartUnmount', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param.y = '';
    });
  }

  // create multi-si part [Partition-IDs] [name=name] [desc=desc] [-c:c] [reclaim=reclaim]
  // - refParam: 'Partition-IDs'
  // - refReturn: 'SI-ID'
  static createMultiSI(raidCliCmd: RaidCliCmd, param: raidCmd.CreateMultiSIParam): RaidCliCmd {
    return easyRaidCmd('createMultiSI', raidCliCmd, param);
  }


  // set si [snapshot-image-ID] [name=name] [desc=desc] [-f:f] [-c:c] [reclaim=reclaim]
  // - refParam: 'snapshot-image-ID'
  static setSI(raidCliCmd: RaidCliCmd, param: raidCmd.SetSIParam): RaidCliCmd {
    return easyRaidCmd('setSI', raidCliCmd, param);
  }

  // set si rollback [snapshot-image-ID] [complete=complete] [-y:y] [bgJob=bgJob]
  static setSIRollback(raidCliCmd: RaidCliCmd, param: raidCmd.SetSIRollbackParam): RaidCliCmd {
    return easyRaidCmdWithInject('setSIRollback', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param.y = '';
    });
  }

  // set si mount [snapshot-image-ID]
  static setSIMount(raidCliCmd: RaidCliCmd, param: raidCmd.SetSIMountParam): RaidCliCmd {
    return easyRaidCmd('setSIMount', raidCliCmd, param);
  }

  // set si unmount [snapshot-image-ID] [-y:y]
  static setSIUnmount(raidCliCmd: RaidCliCmd, param: raidCmd.SetSIMountParam): RaidCliCmd {
    return easyRaidCmdWithInject('setSIUnmount', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param.y = '';
    });
  }

  // delete si [snapshot-image-ID] [-y:y]
  static deleteSI(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteSIParam): RaidCliCmd {
    return easyRaidCmdWithInject('deleteSI', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param.y = '';
    });
  }

  // create map [part] [partition-ID] [default=default] [Channel-ID] [Target-ID] [LUN-ID] 
  //     [assign=assign] [wwn=wwn] [iqn=iqn] [host=host] [bootable=bootable] [mask=mask] 
  //     [type=type] [mode=mode] [name=name] [group=group] [-f:f]
  static createMap(raidCliCmd: RaidCliCmd, param: raidCmd.CreateMapParam): RaidCliCmd {
    return easyRaidCmdWithInject('createMap', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      
      // handle RefParam
      var refParamArr = raidcmd['refParmArr']; // TODO: bad writing
      if (refParamArr && refParamArr.length > 0 && refParamArr[0]) {
        raidcmd.refParam = { 'partition-ID': refParamArr[0] };
      }
      // handle mapSet
      delete raidcmd.param['mapSet'];
      const mapSet = param.mapSet;
      if (mapSet != null) {
        if (mapSet.chkboxCustomExtendSet) {
          raidcmd.param['type'] = mapSet.CustomFilter;
          raidcmd.param['mode'] = mapSet.CustomAsscess;

          var alias = mapSet.CustomAlias;
          switch(param.customType) {
            case "Fibre":
              if (mapSet.groupSet[alias] != null)
                raidcmd.param['group'] = alias;
              else if (mapSet.hostIdList[alias] != null)
                raidcmd.param['wwn']   = alias;
              else 
                raidcmd.param['host']  = (alias.indexOf(' ') >= 0)? tool.quotation(alias): alias;
              
              raidcmd.param['mask'] = mapSet.CustomMask;  
              break;
            case "ISCSI":
              if (mapSet.groupSet[alias] != null)
                raidcmd.param['group'] = alias;
              else
                raidcmd.param['host']  = (alias.indexOf(' ') >= 0)? tool.quotation(alias): alias;
              break;
          }
        }
      }
    });   
  }

  // create map [part] [partition-ID] [default=default] [Channel-ID] [Target-ID] [LUN-ID] 
  //     [assign=assign] [wwn=wwn] [iqn=iqn] [host=host] [bootable=bootable] [mask=mask] 
  //     [type=type] [mode=mode] [name=name] [mapset=mapset] [group=group]
  static createMapForAutoMap(raidCliCmd: RaidCliCmd, param: raidCmd.CreateMapForAutoMapParam): RaidCliCmd {
    return easyRaidCmdWithInject('createMapForAutoMap', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      
      // handle RefParam
      var refParamArr = raidcmd['refParmArr']; // TODO: bad writing
      if (refParamArr && refParamArr.length > 0 && refParamArr[0]) {
        raidcmd.refParam = { 'partition-ID': refParamArr[0] };
      }
      // handle AutoMap
      if (param.isforAutoMap) {
        raidcmd.param['mapset'] = param.isforAutoMap;
      }
      // handle mapSet
      delete raidcmd.param['mapSet'];
      const mapSet = param.mapSet;
      if (mapSet != null) {
        if (mapSet.chkboxCustomExtendSet) {
          raidcmd.param['type'] = mapSet.CustomFilter;
          raidcmd.param['mode'] = mapSet.CustomAsscess;

          var alias = mapSet.CustomAlias;
          switch(param.customType) {
            case "Fibre":
              if (mapSet.groupSet[alias] != null)
                raidcmd.param['group'] = alias;
              else if (mapSet.hostIdList[alias] != null)
                raidcmd.param['wwn']   = alias;
              else 
                raidcmd.param['host']  = (alias.indexOf(' ') >= 0)? tool.quotation(alias): alias;

              raidcmd.param['mask'] = mapSet.CustomMask;  
              break;
            case "ISCSI":
              if (mapSet.groupSet[alias] != null)
                raidcmd.param['group'] = alias;
              else
                raidcmd.param['host']  = (alias.indexOf(' ') >= 0)? tool.quotation(alias): alias;
              break;
          }
        }
      }
    });
  }

  // delete map [part] [partition-ID] [Channel-ID] [Target-ID] [LUN-ID] [host-id=host-id] [-y:y]
  static deleteMap(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteMapParam): RaidCliCmd {
    return easyRaidCmd('deleteMap', raidCliCmd, param);
  }

  // create iqn [IQN] [IQN-alias-name] [user=user] [password=password] [target=target] [target-password=targetPsw] [ip=ip] [mask=mask]
  static createIqn(raidCliCmd: RaidCliCmd, param: raidCmd.CreateIqnParam): RaidCliCmd {
    return easyRaidCmdWithInject('createIqn', raidCliCmd, param, (raidcmd:RaidCliCmd) => {

      raidcmd.param['IQN-alias-name'] = tool.quotation(param['IQN-alias-name']);
      if (!param['ip'])   raidcmd.param['ip'] = '0.0.0.0';
      if (!param['mask']) raidcmd.param['mask'] = "255.255.255.0";

    });
  }

  // set iqn [oldName] [name=name] [user=user] [password=password] [target=target] [target-password=target-password] [ip=ip] [mask=mask]
  static setIqn(raidCliCmd: RaidCliCmd, param: raidCmd.SetIqnParam): RaidCliCmd {
    return easyRaidCmdWithInject('setIqn', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      
      raidcmd.param['oldName'] = tool.quotation(param.oldName);

      if (param.name && param.oldName!=param.name) {
        raidcmd.param['name'] = tool.quotation(param.name);
      } else {
        delete raidcmd.param['name'];
      }

      if (param.user) {
        raidcmd.param['user'] = (param.user != '""') ? (tool.quotation(param.user)) : '""';
      }
      if (param.password) {
        raidcmd.param['password'] = (param.password != '""') ? (tool.quotation(param.password)) : '""';
      }   
      if (param.target) {
        raidcmd.param['target'] = (param['target'] != '""') ? (tool.quotation(param.target)) : '""';
      } 
        if (param['target-password']) {
        raidcmd.param['target-password'] = (param['target-password'] != '""') ? (tool.quotation(param['target-password'])) : '""';
      } 

      // Clear
      if (!param['user'])        delete raidcmd.param['user'];
      if (!param['password'])    delete raidcmd.param['password'];
      if (!param['target'])          delete raidcmd.param['target'];
      if (!param['target-password']) delete raidcmd.param['target-password'];
      if (!param['ip'])   delete raidcmd.param['ip'];
      if (!param['mask']) delete raidcmd.param['mask'];
    });
  }

  // set iqn group [option] [IQN] [group-name] [-m:m]
  static setIqnGroup(raidCliCmd: RaidCliCmd, param: raidCmd.SetIqnGroupParam): RaidCliCmd {
    return easyRaidCmdWithInject('setIqnGroup', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      if(param.m === null)
        delete raidcmd.param['m'];
    });
  }

  // delete iqn [name]
  static deleteIqn(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteIqnParam): RaidCliCmd {
    return easyRaidCmdWithInject('deleteIqn', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      if(param.name && param.name.indexOf(' ') >= 0)
        raidcmd.param['name'] = tool.quotation(param.name);
    });
  }

  // create wwn [WWN] [name]
  static createWwn(raidCliCmd: RaidCliCmd, param: raidCmd.CreateWwnParam): RaidCliCmd {
    return easyRaidCmd('createWwn', raidCliCmd, param);
  }

  // set wwn [WWN] [new-alias-name]
  static setWwn(raidCliCmd: RaidCliCmd, param: raidCmd.SetWwnParam): RaidCliCmd {
    return easyRaidCmd('setWwn', raidCliCmd, param);
  }

  // set wwn group [option] [WWN] [group-name] [-m:m]
  /*
  #   <option = {assign|unassign}>
  */
  static setWwnGroup(raidCliCmd: RaidCliCmd, param: raidCmd.SetWwnGroupParam): RaidCliCmd {
    return easyRaidCmdWithInject('setWwnGroup', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      if(param['m'] === null) delete raidcmd.param['m'];
    });
  }

  // delete wwn [name]
  static deleteWwn(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteWwnParam): RaidCliCmd {
    return easyRaidCmd('deleteWwn', raidCliCmd, param);
  }

  // set disk spare [disk-index] [type=type] [ld=ld]
  // - refParam: 'ld'
  static setDiskSpare(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskSpareParam): RaidCliCmd {
    return easyRaidCmd('setDiskSpare', raidCliCmd, param);
  }

  // set disk spare [disk-index] [-d:d]
  static setDiskSpareDelete(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskSpareDeleteParam): RaidCliCmd {
    return easyRaidCmd('setDiskSpareDelete', raidCliCmd, param);
  }


  // set ssd-cache add [disk=disk] [-y:y] [-v:v]
  static setSSDCacheAddDisk(raidCliCmd: RaidCliCmd, param: raidCmd.SetSSDCacheAddDiskParam): RaidCliCmd {
    return easyRaidCmd('setSSDCacheAddDisk', raidCliCmd, param);
  }

  // set ssd-cache remove [disk=disk]
  static setSSDCacheRemoveDisk(raidCliCmd: RaidCliCmd, param: raidCmd.SetSSDCacheRemoveDiskParam): RaidCliCmd {
    return easyRaidCmd('setSSDCacheRemoveDisk', raidCliCmd, param);
  }

  // set ssd-cache service [switch]
  static setSSDCacheService(raidCliCmd: RaidCliCmd, param: raidCmd.SetSSDCacheServiceParam): RaidCliCmd {
    return easyRaidCmd('setSSDCacheService', raidCliCmd, param);
  }

  // set controller date [yyyyMMdd] [hhmmss] [gmt=gmt]
  static setControllerDate(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerDateParam): RaidCliCmd {
    return easyRaidCmd('setControllerDate', raidCliCmd, param);
  }
  
  // set controller timezone [gmt] [city=index]
  static setControllerTimezone(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerTimezoneParam): RaidCliCmd {
    return easyRaidCmd('setControllerTimezone', raidCliCmd, param);
  }

  // set controller daylight-saving  [startDate] [startTime] [end-date] [end-time] [offset=offset]
  static setControllerDaylight(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerDaylightParam): RaidCliCmd {
    return easyRaidCmd('setControllerDaylight', raidCliCmd, param);
  }

  // reset controller [flush=flush] [-y:y] 
  static resetController(raidCliCmd: RaidCliCmd, param: raidCmd.ResetControllerParam): RaidCliCmd {
    return easyRaidCmdWithInject('resetController', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param.y = '';
    });
  }

  // FSS k8s version get
  static fssK8sVersionGet(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('fssK8sVersionGet', raidCliCmd, {});
  }

  // FSS docker proxy [-s:s] [-p:p]
  static fssDockerProxy(raidCliCmd: RaidCliCmd, param: raidCmd.FSSDockerProxyParam): RaidCliCmd {
    return easyRaidCmd('fssDockerProxy', raidCliCmd, param);
  }

  // shutdown controller [-y:y] [bgJob:bgJob]
  static shutdownController(raidCliCmd: RaidCliCmd, param: raidCmd.ShutdownControllerParam): RaidCliCmd {
    return easyRaidCmdWithInject('shutdownController', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param.y = '';
    });
  }

  // FSS system shutdown
  static systemShutdown(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('fssSystemShutdown', raidCliCmd, {});
  }

  // FSS system reboot
  static systemReboot(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('fssSystemReboot', raidCliCmd, {});
  }


  // shutdown poweroff [-y:y]
  static shutdownPoweroff(raidCliCmd: RaidCliCmd, param: raidCmd.ShutdownPoweroffParam): RaidCliCmd {
    return easyRaidCmdWithInject('shutdownPoweroff', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      raidcmd.param.y = '';
    });
  }

  // set controller default [-y] [-r]
  static setControllerDefault(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerDefaultParam): RaidCliCmd {
    return easyRaidCmd('setControllerDefault', raidCliCmd, param);
  }

  // export config [filename] [-f:f] [-l:l]
  static exportConfig(raidCliCmd: RaidCliCmd, param: raidCmd.ExportConfigParam): RaidCliCmd {
    return easyRaidCmd('ExportConfig', raidCliCmd, param);
  }

  // system restore [path]
  static importConfig(raidCliCmd: RaidCliCmd, param: raidCmd.ImportConfigParam): RaidCliCmd {
    return easyRaidCmd('ImportConfig', raidCliCmd, param);
  }

  // export diagnostic [-f:filename] [-m:mode]
  static exportSupport(raidCliCmd: RaidCliCmd, param: raidCmd.ExportSupportParam): RaidCliCmd {
    return easyRaidCmdWithInject('ExportDiagnostic', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      if(param.filename)
        raidcmd.param['filename'] = param.filename + '-supportsysinfo';
      else
        raidcmd.param['filename'] = raidCliCmd.devID + '-supportsysinfo';
    });
  }

  // export coredump [-a:a] [-f:f] [filename] [nodename]
  static exportCoreDump(raidCliCmd: RaidCliCmd, param: raidCmd.ExportCoreDumpParam): RaidCliCmd {
    return easyRaidCmdWithInject('ExportCoredump', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      if(param.filename)
        raidcmd.param['filename'] = tool.format('{0}', param.filename);
      else
        raidcmd.param['filename'] = raidCliCmd.devID + '_support';
    });
  }

  // update fw [filename] [-y:y] [-u:u] [-r:r] [-c:c] [biosfilename=biosfilename]
  static updateFW(raidCliCmd: RaidCliCmd, param: raidCmd.UpdateFWParam): RaidCliCmd {
    return easyRaidCmdWithInject('updateFW', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      
      raidcmd.param['filename'] = tool.quotation(param.filename);
      raidcmd.param['y'] = '';
      if(param.isRollingUpgrade) raidcmd.param['u'] = ''; // isRollingUpgrade
      if(param.isReset)          raidcmd.param['r'] = ''; // isReset
      if(param.isUI)             raidcmd.param['c'] = ''; // isUI
      if(param.biosfilename)     raidcmd.param['biosfilename'] = tool.quotation(param.biosfilename);
      if(param.bgJob)            raidcmd.param['bgJob'] = '';

    });
  }

  // update verifyfile [filename]
  static updateVerifyFile(raidCliCmd: RaidCliCmd, param: raidCmd.UpdateVerifyFileParam): RaidCliCmd {
    return easyRaidCmdWithInject('updateVerifyFile', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['filename'] = tool.quotation(param.filename);
    });
  }

  // update cluster_fw [filename] [biosfilename=biosfilename] [-y:y] [-c:c] [-u:u]
  static updateClusterFW(raidCliCmd: RaidCliCmd, param: raidCmd.UpdateClusterFWParam): RaidCliCmd {
    return easyRaidCmdWithInject('updateClusterFW', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      
      raidcmd.param['filename'] = tool.quotation(param.filename);
      raidcmd.param['y'] = '';
      raidcmd.param['c'] = '';
      if (param.biosFileName)
        raidcmd.param['biosfilename'] = tool.quotation(param.biosFileName);

    });
  }

  // system updatefw [${filePath}] [${size}] [-r ${r}]
  static updateKSFW(raidCliCmd: RaidCliCmd, param: raidCmd.UpdateKSFWParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssSystemUpdatefw', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['filePath'] = tool.quotation(param.filePath);
      // raidcmd.param['r'] = '';
    });
  }

  // show cloudgateway history [-n:n] [-p:p] [-S:S] [-s:s] [-t:t] [-m:m] [-b:b] [-e:e] [-N:N] [-D:D] [uniqueID:uniqueID]
  static showCloudStorageGatewayHistory(raidCliCmd: RaidCliCmd, param: raidCmd.ShowCloudStorageGatewayHistoryParam): RaidCliCmd {
    raidCliCmd.showArray = 'true';
    return easyRaidCmd('showCloudStorageGatewayHistory', raidCliCmd, param);
  }

  // FSS system syncfile [-n:n] [-t:t] [-c:c]
  static fssSystemSyncFile(raidCliCmd: RaidCliCmd, param: raidCmd.FssSystemSyncFileParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssSystemSyncFile', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {

      raidcmd.param['n'] = tool.quotation(param.fullpath);
      raidcmd.param['c'] = param.type; // 1: update FW, 2: backup config
      if(typeof param.raidId === 'string') {
        raidcmd.param['t'] = param.raidId.startsWith("0x")? param.raidId.toLowerCase() : ("0x" + param.raidId.toLowerCase());
      }
    });
  }

  // FSS system syncfile_status [-n:n]
  static fssSystemSyncFileStatus(raidCliCmd: RaidCliCmd, param: raidCmd.FssSystemSyncFileStatusParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssSystemSyncFileStatus', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      raidcmd.param['n'] = tool.quotation(param.fullpath);
    });
  }

  // import nvram [filename] [-n:n] [-y:y] [-r:r]
  static importNVRam(raidCliCmd: RaidCliCmd, param: raidCmd.ImportNVRAMParam): RaidCliCmd {
    return easyRaidCmdWithInject('importNVRam', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['filename'] = tool.quotation(param.filename);
    });
  }

  // export nvram [filename]
  static exportNVRam(raidCliCmd: RaidCliCmd, param: raidCmd.ExportNVRAMParam) {
    return easyRaidCmdWithInject('exportNVRam', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      raidcmd.param['filename'] = (param.exportToHost)? `${raidcmd.devID}_nvram` : '';
    });
  }

  // import license [filename] [-y:y] [-r:r]
  static importLicense(raidCliCmd: RaidCliCmd, param: raidCmd.ImportLicenseParam): RaidCliCmd {
    return easyRaidCmd('importLicense', raidCliCmd, param);
  }

  // export license [filename] [-y:y]
  static exportLicense(raidCliCmd: RaidCliCmd, param: raidCmd.ExportLicenseParam): RaidCliCmd {
    return easyRaidCmd('exportLicense', raidCliCmd, param);
  }

  // create isns [IP-addresses] [-r:r] [-y:y]
  static createIsns(raidCliCmd: RaidCliCmd, param: raidCmd.CreateIsnsParam): RaidCliCmd {
    return easyRaidCmd('createIsns', raidCliCmd, param);
  }

  // delete isns [index] [-r:r] [-y:y]
  static deleteIsns(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteIsnsParam): RaidCliCmd {
    return easyRaidCmd('deleteIsns', raidCliCmd, param);
  }


  // set controller redundancy [remote=remote] [cache=cache]
  //     [adaptive=adaptive] [reduction=reduction] [ctlr-assign=ctlr-assign]
  //     [ld-assign=ld-assign]
  static setControllerRedundancy(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerRedundancyParam): RaidCliCmd {
    return easyRaidCmd('setControllerRedundancy', raidCliCmd, param);
  }

  // set controller forcefail [slot] [-y]
  static setControllerForceFail(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerForceFailParam): RaidCliCmd {
    return easyRaidCmd('setControllerForceFail', raidCliCmd, param);
  }

  // set controller deassert [-y]
  static setControllerDeassert(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerDeassertParam): RaidCliCmd {
    return easyRaidCmd('setControllerDeassert', raidCliCmd, param);
  }

  // export event [-f:filename] [1stline={switch}]
  static exportEvent(raidCliCmd: RaidCliCmd, param: raidCmd.EventLogExportParam): RaidCliCmd {
    return easyRaidCmd('ExportEventLog', raidCliCmd, param);
  }

  // delete event
  static deleteEvent(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('deleteEvent', raidCliCmd, {});
  }
  
  // export actionlog [filename] [1stline={switch}]
  static exportActionLog(raidCliCmd: RaidCliCmd, param: raidCmd.EventLogExportParam): RaidCliCmd {
    return easyRaidCmd('exportActionLog', raidCliCmd, param);
  }

  // delete actionlog
  static deleteActionLog(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('deleteActionLog', raidCliCmd, {});
  }
  /**
   * # set enclosure-led [enclosure-ID] [service={switch}] [system={switch}]
   * setEnclosureLed=set enclosure-led [enclosure-ID] [service=service] [system=system] #EnclosureView
   */
  static setEnclosureLed(raidCliCmd: RaidCliCmd, param: raidCmd.SetEnclosureLedParam): RaidCliCmd {
    return easyRaidCmdWithInject('setEnclosureLed', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {

      raidcmd.param['enclosure-ID'] = param.enclosureID;
      if (param.turnOnServiceLED !== null) {
        raidcmd.param['service'] = param.turnOnServiceLED ? 'enable' : 'disable';
      }
      if (param.turnOnSystemLED !== null) {
        raidcmd.param['system'] = param.turnOnSystemLED ? 'enable' : 'disable';
      }
    });
  }

  // _this.setMultiEnclosureLed = setMultiEnclosureLed;
  /**
      # set multi-enclosure-led [enclosure={enclosure}] [service={switch}] [system={switch}]
      setMultiEnclosureLed=set multi-enclosure-led [enclosure=enclosure] [service=service] [system=system] #EnclosureView
    */
  static setMultiEnclosureLed(raidCliCmd: RaidCliCmd, param: raidCmd.SetMultiEnclosureLedParam): RaidCliCmd {
    return easyRaidCmd('setMultiEnclosureLed', raidCliCmd, param);
  }


  static setScheduleHost(raidCliCmd: RaidCliCmd, param: raidCmd.SetScheduleHostParam): RaidCliCmd {
    return easyRaidCmd('setScheduleHost', raidCliCmd, param);
  }


  // FSS schedule create [-c:c] [-n:n] [-s:s] [-t:t] [-d:d] [-p:p] [-E:E] [-sd:sd] [-T:T] [-ed:ed] [-et:et] [-du:du]
  static fssCsDeviceDefragAbort(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsDeviceDefragAbortParam): RaidCliCmd {
    return easyRaidCmd('fssCsDeviceDefragAbort', raidCliCmd, param);
  }


  // FSS schedule create [-c:c] [-n:n] [-s:s] [-t:t] [-d:d] [-p:p] [-E:E] [-sd:sd] [-T:T] [-ed:ed] [-et:et] [-du:du]
  /*
   # 
   #   <-c {rr|av|defrag}}>
   #   [-n schedule_name]
   #   <-s source_task>
   #   [-t { once | every | daily | weekly | monthly }]
   #   [-d day]
   #   [-p period]
   #   [-E { on | off }]
   #   [-sd start_date]
   #   [-T start_time]
   #   [-ed end_date]
   #   [-et end_time]
   #   [-du duration]
   */
  static fssScheduleCreate(raidCliCmd: RaidCliCmd, param: fssCmd.FssScheduleCreateParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssScheduleCreate', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      if (param.c) { raidcmd.param['c'] = param.c; }
      if (param.p) { raidcmd.param['p'] = param.p; }
      if (param.t) { raidcmd.param['t'] = param.t; }
      if (param.T) { raidcmd.param['T'] = param.T; }
      if (param.d) { raidcmd.param['d'] = param.d; }
    });
  }

  // FSS schedule options [schedule_name] [-s:s] [-n:n] [-t:t] [-d:d] [-m:m] [-T:T] [-mo:mo] [-sd:sd] [-ed:ed] [-et:et] [-r:r] [-E:E] [-p:p] [-du:du] 
  static fssScheduleOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssScheduleOptionsParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssScheduleOptions', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      if (param.schedule_name) { raidcmd.param['schedule_name'] = param.schedule_name; }
      if (param.p) { raidcmd.param['p'] = param.p; }
      if (param.t) { raidcmd.param['t'] = param.t; }
      if (param.T) { raidcmd.param['T'] = param.T; }
      if (param.d) { raidcmd.param['d'] = param.d; }
    });
  }

  // FSS schedule delete [schedule_name]
  static fssScheduleDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssScheduleDeleteParam): RaidCliCmd {
    return easyRaidCmd('fssScheduleDelete', raidCliCmd, param);
  }

  // FSS dedup close
  static dedupClose(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('fssDedupClose', raidCliCmd, {});
  }

  // delete schedule [job-ID]
  static deleteSchedule(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteScheduleParam): RaidCliCmd {
    return easyRaidCmd('deleteSchedule', raidCliCmd, param);
  }

  // delete schedule host [schedule-ID]
  static deleteScheduleHost(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteScheduleHostParam): RaidCliCmd {
    return easyRaidCmd('deleteScheduleHost', raidCliCmd, param);
  }

  // create schedule host [name] [type] [IDs] [startDate] [startTime] [end-date=endDate] [end-time=endTime] 
  //     [period=period] [day=day-list] [repeat=repeat] [purge=rule] [purge-number=number] 
  //     [priority=priority] [reclaim=reclaim] [si-name=siName] [si-description=siDescription] [run-now=runNow]
  static CreateScheduleHost(raidCliCmd: RaidCliCmd, param: raidCmd.CreateScheduleHostParam): RaidCliCmd {
    return easyRaidCmd('createScheduleHost', raidCliCmd, param);
  }

  // create schedule [schedule-policy] [command] [init=init]
  static createScheduleForGS(raidCliCmd: RaidCliCmd, param: raidCmd.CreateScheduleForGSParam): RaidCliCmd {
    return easyRaidCmd('createSchedule', raidCliCmd, param);
  }

  // set controller name [name]
  static setControllerName(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerNameParam): RaidCliCmd {
    return easyRaidCmd('setControllerName', raidCliCmd, param);
  }

  // set controller parm [normal-verify=normal] [init-verify=init] [rebuild-verify=rebuild] [priority=priority] 
  //     [max-response=max] [av-optimization=av] [post=post] [snmp=snmp] 
  //     [sntp=sntpIp] [sntp-poll=sntpPoll] [read-ahead=readAhead] [global-op=globalOP]
  static setControllerParm(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerParmParam): RaidCliCmd {
    return easyRaidCmd('setControllerParm', raidCliCmd, param);
  }

  // set controller parm [normal-verify=normal] [init-verify=init] [rebuild-verify=rebuild] [priority=priority] 
  //     [max-response=max] [av-optimization=av] [post=post] [snmp=snmp] 
  //     [sntp=sntpIp] [sntp-poll=sntpPoll] [read-ahead=readAhead] [global-op=globalOP]
  static setDiskArraySetting(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskArraySettingParam): RaidCliCmd {
    return easyRaidCmd('setControllerParm', raidCliCmd, param);
  }

  // set snmp receiver [switch] [severity] [ip=ip] [recvseverity=recvseverity] [version=version] 
  //     [name=name] [auth=auth] [authpw=authpw] [privacy=privacy] [privacypw=privacypw] [community=community] [port=port]
  static setSnmpReceiver(raidCliCmd: RaidCliCmd, param: raidCmd.SetSnmpReceiverParam): RaidCliCmd {
    return easyRaidCmdWithInject('setSnmpReceiver', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      
      const keyArr = ['ip', 'recvseverity', 'version', 'name', 'auth', 'authpw', 'privacy', 'privacypw', 'community'];
      Object.keys(param).forEach((key) => {
        if(keyArr.indexOf(key) >= 0)
          raidcmd.param[key] = tool.quotation(param[key]);
      });
      
    });
  }

  // set controller performance [option]
  static setControllerPerformance(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerPerformanceParam): RaidCliCmd {
    return easyRaidCmd('setControllerPerformance', raidCliCmd, param);
  }

  // set controller parm [normal-verify=normal] [init-verify=init] [rebuild-verify=rebuild] [priority=priority] 
  //     [max-response=max] [av-optimization=av] [post=post] [snmp=snmp] 
  //     [sntp=sntpIp] [sntp-poll=sntpPoll] [read-ahead=readAhead] [global-op=globalOP]
  static setSystemSnmpConfig(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerParmParam): RaidCliCmd {
    return easyRaidCmdWithInject('setControllerParm', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['snmp'] = tool.quotation(param.snmp);
    });
  }

  // set cache [write=write] [sync-period=sync] [-r:r] [-y:y]
  static setCache(raidCliCmd: RaidCliCmd, param: raidCmd.SetCacheParam): RaidCliCmd {
    return easyRaidCmd('setCache', raidCliCmd, param);
  }

  // set controller trigger [controller-fail=controller] [battery-fail=battery] 
  //     [power-loss=powerLoss] [power-fail=powerFail] [fan-fail=fan] [temp-exceed-delay=ted]
  static setControllerTrigger(raidCliCmd: RaidCliCmd, param: raidCmd.SetControllerTriggerParam): RaidCliCmd {
    return easyRaidCmd('setControllerTrigger', raidCliCmd, param);
  }

  // set disk parm [spin=spin] [smart=smart] [autospare=autospare] [delay=delay] [tag=tag] 
  //     [io=io] [check=check] [poll=poll] [swap=swap] [cache=cache] [life=life]
  static setDiskParm(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskParmParam): RaidCliCmd {
    return easyRaidCmd('setDiskParm', raidCliCmd, param);
  }

  // set disk saving [mode] [level1=level1] [level2=level2]
  static setDiskSaving(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskSavingParam): RaidCliCmd {
    return easyRaidCmd('setDiskSaving', raidCliCmd, param);
  }

  // set disk clear [disk-index-list] [-p:p] [-v:v]
  static setDiskClear(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskClearParam): RaidCliCmd {
    return easyRaidCmd('setDiskClear', raidCliCmd, param);
  }

  // set disk format [disk-index]
  static setDiskFormat(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskFormatParam): RaidCliCmd {
    return easyRaidCmd('setDiskFormat', raidCliCmd, param);
  }

  // set disk clone [source-disk] [-s:s]
  static setDiskCloneSource(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskCloneSourceParam): RaidCliCmd {
    return easyRaidCmd('setDiskCloneSource', raidCliCmd, param);
  }

  // set disk clone [destination-disk] [-a:a]
  static setDiskCloneDestination(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskCloneDestinationParam): RaidCliCmd {
    return easyRaidCmd('setDiskCloneDestination', raidCliCmd, param);
  }

  // set disk scan [disk-index-list] [mode=mode] [priority=priority]
  static setDiskScan(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskScanParam): RaidCliCmd {
    return easyRaidCmd('setDiskScan', raidCliCmd, param);
  }

  // set disk scan [index-list] [-a:a]
  static setDiskScanAbort(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskScanAbortParam): RaidCliCmd {
    return easyRaidCmd('setDiskScanAbort', raidCliCmd, param);
  }

  // set disk flash [disk-index] [-e:e]
  static setDiskFlash(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskFlashParam): RaidCliCmd {
    return easyRaidCmd('setDiskFlash', raidCliCmd, param);
  }

  // set disk rwtest [disk-index-list] [mode=mode] [error=error] [recovery=recovery] [-a:a] [-k:k]
  static setDiskRwtest(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskRwtestParam): RaidCliCmd {
    return easyRaidCmd('setDiskRwtest', raidCliCmd, param);
  }

  // set disk copy [source-disk] [destination-disk] [priority=priority]
  static setDiskCopy(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskCopyParam): RaidCliCmd {
    return easyRaidCmd('setDiskCopy', raidCliCmd, param);
  }

  // set disk copy [destination-disk] [-a:a]
  static setDiskCopyAbort(raidCliCmd: RaidCliCmd, param: raidCmd.SetDiskCopyAbortParam): RaidCliCmd {
    return easyRaidCmd('setDiskCopyAbort', raidCliCmd, param);
  }

  // set sed erase [disk-index]
  static setSEDErase(raidCliCmd: RaidCliCmd, param: raidCmd.SetSEDEraseParam): RaidCliCmd {
    return easyRaidCmd('setSEDErase', raidCliCmd, param);
  }

  // create sed keyfile [filename]
  static createSedKeyfile(raidCliCmd: RaidCliCmd, param: raidCmd.CreateSEDFileParam): RaidCliCmd {
    return easyRaidCmdWithInject('createSedKeyfile', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['filename'] = param.filename + '_SedKeyfile.key';
    });
  }

  // set sed password [password=password] [keyfile=keyfile]
  /*
  #  password : array[0] = password, array[1] = new-password
  #  keyfile :  array[0] = keyfile,  array[1] = new-keyfile
  */
  static setSedPassword(raidCliCmd: RaidCliCmd, param: raidCmd.SetSedPasswordParam): RaidCliCmd {
    return easyRaidCmdWithInject('setSedPassword', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      
      if (param.password && param.password.length > 0)
        raidcmd.param['password'] = tool.convertArrayToString(param.password, ',');
      if (param.keyfile && param.keyfile.length > 0)
        raidcmd.param['keyfile']  = tool.convertArrayToString(param.keyfile, ',');

    });
  }

  // set ld saving [index] [mode] [level1=level1] [level2=level2]
  static setLDSaving(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDSavingParam): RaidCliCmd {
    return easyRaidCmd('setLDSaving', raidCliCmd, param);
  }

  // set ld scan [index-list] [mode=mode] [priority=priority]
  static setLDScan(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDScanParam): RaidCliCmd {
    return easyRaidCmd('setLDScan', raidCliCmd, param);
  }

  // set ld scan [index-list] -a
  static abortLDScan(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDScanParam): RaidCliCmd {
    return easyRaidCmd('abortLDScan', raidCliCmd, param);
  }

  // set ld shutdown [index] -y
  static setLDShutdown(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDShutdownParam): RaidCliCmd {
    return easyRaidCmd('setLDShutdown', raidCliCmd, param);
  }

  // setLDRebuild   = set ld rebuild [LD-index] -y
  // abortLDRebuild = set ld rebuild [LD-index] -y -a
  static setLDRebuild(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDRebuildParam): RaidCliCmd {
    if (param.abort)
      return easyRaidCmd('abortLDRebuild', raidCliCmd, param);
    else
      return easyRaidCmd('setLDRebuild', raidCliCmd, param);
  }

  // setLDParity   = set ld parity [LD-id-list] [mode=mode]
  // abortLDParity = set ld parity [LD-id-list] -a
  static setLDParity(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDParityParam): RaidCliCmd {
    if (param.abort)
      return easyRaidCmd('abortLDParity', raidCliCmd, param);
    else
      return easyRaidCmd('setLDParity', raidCliCmd, param);
  }

  // set ld migrate [id] [RAID-level] [append=disk-list]
  static setLDMigration(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDMigrationParam): RaidCliCmd {
    return easyRaidCmd('setLDMigration', raidCliCmd, param);
  }

  // set ld add [LD-id] [disk-list] -y
  static setLDAdd(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDAddParam): RaidCliCmd {
    return easyRaidCmd('setLDAdd', raidCliCmd, param);
  }

  // set ld expand [id-list] [size=expand-size] [mode=mode] -y
  static setLDExpand(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDExpandParam): RaidCliCmd {
    return easyRaidCmd('setLDExpand', raidCliCmd, param);
  }

  // set ld [LD-id] [assign=assign] [name=name] [write=write]
  static setLD(raidCliCmd: RaidCliCmd, param: raidCmd.SetLdParam): RaidCliCmd {
    return easyRaidCmd('setLD', raidCliCmd, param);
  }

  // delete full-nc-ld [ld-id-list] [password=password]
  static deleteFullLD(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteFullLDParam, callback?: (...val: any) => any): RaidCliCmd {
    const raidcmd = easyRaidCmd('deleteFullLD', raidCliCmd, param);
    if (callback)  callback(null, raidcmd);
    return raidcmd;
  }

  // set ld sed unlock [ld-index-list] [password=password] [keyfile=keyfile]
  static setLDSedUnlock(raidCliCmd: RaidCliCmd, param: raidCmd.SetLDSedUnlockParam): RaidCliCmd {
    return easyRaidCmd('setLDSedUnlock', raidCliCmd, param);
  }

  // set lv tier-migrate [lvId] [part=partId] [dataservice=dataservice] [priority=priority]
  static setLvTierMigrate(raidCliCmd: RaidCliCmd, param: raidCmd.SetLvTierMigrateParam): RaidCliCmd {
    return easyRaidCmd('setLvTierMigrate', raidCliCmd, param);
  }


  // set threshold [ID] [min=min] [max=max]
  static setThreshold(raidCliCmd: RaidCliCmd, param: raidCmd.SetThresholdParam): RaidCliCmd {
    return easyRaidCmd('setThreshold', raidCliCmd, param);
  }

  // FSS service options rsyncd [-P:P] [-u:u] [-p:p] [-a:a] [-d:d]
  /*
  #  <-P port>
  #  <-u username>
  #  <-p password>
  #  <-a add sharename>
  #  <-d del sharename>
  */
  static setFsrsyncdOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForRysncd): RaidCliCmd {
    return easyRaidCmd('fsRsyncdServiceOptions', raidCliCmd, param);
  }

  // fss service options nis [-d:d] [-a:a]
  /*
  #  <-d domain>
  #  <-a ip_address>
  */
  static setFsNisOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForNis): RaidCliCmd {
    return easyRaidCmd('fsNISServiceOptions', raidCliCmd, param);
  }

  // fss dns delete [address]
  static setFsDnsDeleteOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FsDnsDeleteParam): RaidCliCmd {
    return easyRaidCmd('fsdnsDelete', raidCliCmd, param);
  }

  // fss dns add [address]
  static setFsDnsAddOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FsDnsAddParam): RaidCliCmd {
    return easyRaidCmd('fsdnsAdd', raidCliCmd, param);
  }

  // fss service options ftp [-P:P] [-l:l] [-d:d] [-s:s] [-e:e] [-u:u] [-f:f] [-p:p] [-a:a] [-r:r] [-C:C] [-c:c]
  /*
  #  <-P port>
  #  <-d directory>
  #  <-l maxattempt>
  #  <-s enableSSL>
  #  <-e explicit>
  #  <-u unencrypted>
  #  <-f force>
  #  <-p port>
  */
  static setFsFtpOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForFTP): RaidCliCmd {
    return easyRaidCmd('fsFtpServiceOptions', raidCliCmd, param);
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
    return easyRaidCmd('fsCifsServiceOptions', raidCliCmd, param);
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
    return easyRaidCmdWithInject('fsAfpServiceOptions', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      
      if(param.n) raidcmd.param['n'] = tool.quotation(param.n);
      if(param.m) raidcmd.param['m'] = JSON.stringify(param.m);
    });
  }

  // /*
  //   * service options nfs [ -v {all|2|3|4} ]
  //   * fsNfsServiceOptions=fs service options nfs [-v:v]
  //   * Params:
  //   *         version: String {all|2|3|4}
  //   */
  static setFsNfsOptions(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForNFS): RaidCliCmd {
    return easyRaidCmd('fsNfsServiceOptions', raidCliCmd, param);
  }

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
    return easyRaidCmd('fsAdServiceOptions', raidCliCmd, param);
  }
  static fssServiceOptionsAd(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionsAdParam): RaidCliCmd {
    return easyRaidCmd('fsAdServiceOptions', raidCliCmd, param);
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
    return easyRaidCmd('fsLDAPServiceOptions', raidCliCmd, param);
  }

  static fssServiceOptionsLdap(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionsLdapParam): RaidCliCmd {
    return easyRaidCmd('fsLDAPServiceOptions', raidCliCmd, param);
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
    return easyRaidCmd('fssServiceStartForStatus', raidCliCmd, param);
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
    return easyRaidCmd('fssServiceStopForStatus', raidCliCmd, param);
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
    return easyRaidCmd('fsrefreshdu', raidCliCmd, {});
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
    return easyRaidCmd('fssFolderOptions', raidCliCmd, param);
  }

  // folder ntacl [poolName] [volumeName] [-e]
  static fssFolderNtacl(raidCliCmd: RaidCliCmd, param: fssCmd.FssFolderNtaclParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssFolderNtacl', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['e'] = '';
    });
  }

  // FSS folder create [-p:folder_path]
  static fssFolderCreate(raidCliCmd: RaidCliCmd, param: fssCmd.FssFolderCreateParam): RaidCliCmd {
    return easyRaidCmd('fssFolderCreate', raidCliCmd, param);
  }

  // FSS service start [protocal]
  static fssServiceStartForStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceStopOrStart): RaidCliCmd {
    return easyRaidCmd('fssServiceStartForStatus', raidCliCmd, param);
  }

  // FSS service stop [protocal]
  static fssServiceStopForStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceStopOrStart): RaidCliCmd {
    return easyRaidCmd('fssServiceStopForStatus', raidCliCmd, param);
  }


  // FSS share [folder_path] [protocal] [protocal_status] [-a:a] [-e:e] [-t:t] [-n:n] [-h:h] [-p:p] [-s:s] [-m:m] [-g:g] [-u:u] [-A:A] [-f:f] [slot]
  static fssShare(raidCliCmd: RaidCliCmd, param: fssCmd.FssShareFolderParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssShare', raidCliCmd, param, (raidcmd:RaidCliCmd) => {

      if(param.folder_path) raidcmd.param['folder_path'] = tool.quotation(param.folder_path);
      if(param.n)           raidcmd.param['n'] = tool.quotation(param.n);
      if(param.d)           raidcmd.param['d'] = tool.quotation(param.d);
    });
  }

  // /*
  // * # share options folder_path cifs [-a {on|off}] [-e {on|off}] [{-n share_name | -n="share_name"}]
  // * fssShareOptionsCifs=FSS share options [folder_path] [cifs] [-a:a] [-e:e] [-n=n] #FSShareStatus
  // */
  static fssShareOptionsCifs(raidCliCmd: RaidCliCmd, param: fssCmd.FssShareFolderParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssShareOptionsCifs', raidCliCmd, param, (raidcmd:RaidCliCmd) => {

      if(param.folder_path) raidcmd.param['folder_path'] = tool.quotation(param.folder_path);
      if(param.n)           raidcmd.param['n'] = tool.quotation(param.n);
      if(param.d)           raidcmd.param['d'] = tool.quotation(param.d);
    });
  }

  // /*
  // * # share options folder_path nfs [{-h|-c}host_settings] [-p {ro|rw}] [-s {all|nrs|rs}] [-g gid] [-u uid]
  // * fssShareOptionsNfs=FSS share options [folder_path] [nfs] [-c:c] [-h:h] [-p:p] [-s:s] [-g:g] [-u:u] #FSShareStatus
  // */
  static fssShareOptionsNfs(raidCliCmd: RaidCliCmd, param: fssCmd.FssShareFolderParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssShareOptionsNfs', raidCliCmd, param, (raidcmd:RaidCliCmd) => {

      if(param.folder_path) raidcmd.param['folder_path'] = tool.quotation(param.folder_path);
      if(param.n)           raidcmd.param['n'] = tool.quotation(param.n);
      if(param.d)           raidcmd.param['d'] = tool.quotation(param.d);
    });
  }

  // /*
  // * # share options folder_path afp [{-n share_name|-n="share_name"}]
  // * fssShareOptionsAfp=FSS share options [folder_path] [afp] [-n=n] #FSShareStatus
  // */
  static fssShareOptionsAfp(raidCliCmd: RaidCliCmd, param: fssCmd.FssShareFolderParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssShareOptionsAfp', raidCliCmd, param, (raidcmd:RaidCliCmd) => {

      if(param.folder_path) raidcmd.param['folder_path'] = tool.quotation(param.folder_path);
      if(param.n)           raidcmd.param['n'] = tool.quotation(param.n);
    });
  }

  //FSS share options [folder_path] [ftp] [-n=n]
  static fssShareOptionsFtp(raidCliCmd: RaidCliCmd, param: fssCmd.FssShareFolderParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssShareOptionsFtp', raidCliCmd, param, (raidcmd:RaidCliCmd) => {

      if(param.folder_path) raidcmd.param['folder_path'] = tool.quotation(param.folder_path);
      if(param.n)           raidcmd.param['n'] = tool.quotation(param.n);
      if(param.d)           raidcmd.param['d'] = tool.quotation(param.d);
    });
  }

  // FSS nexacl set [-f:f] [-a:a] [-d:d] [slot]
  static fssNexaclSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssNexaclSet): RaidCliCmd {
    return easyRaidCmdWithInject('fssNexacl', raidCliCmd, param, (raidcmd:RaidCliCmd) => {

      if(param.f) raidcmd.param['f'] = tool.quotation(param.f);
      if(param.a) raidcmd.param['n'] = tool.quotation(param.a);
      if(param.d) raidcmd.param['d'] = tool.quotation(param.d);
    });
  }

  // create replica [name] [source-volume-type] [source-volume-ID] [target-volume-type] [target-volume-ID] 
  //     [type=type] [priority=priority] [desc=desc] [incremental=incremental] [timeout=timeout] 
  //     [compression=compression] [init=init] [si=si] [retain=retain] [deleteonfailed=deleteonfailed]
  // - refParam: 'source-volume-ID', 'target-volume-ID'
  static createReplica(raidCliCmd: RaidCliCmd, param: raidCmd.CreateReplicaParam): RaidCliCmd {
    return easyRaidCmd('createReplica', raidCliCmd, param);
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
    return easyRaidCmd('setReplica', raidCliCmd, param);
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
    return easyRaidCmd('setReplicaAutoMap', raidCliCmd, param);
  }

  // delete replica [volume-pair-ID] [-y:y]
  static deleteReplica(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteReplicaParam): RaidCliCmd {
    return easyRaidCmdWithInject('deleteReplica', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param.y = '';
    });
  }

  // set remote [type] [id] [-d:d] [-y:y]
  static unassignReplication(raidCliCmd: RaidCliCmd, param: raidCmd.UnassignReplicationParam): RaidCliCmd {
    return easyRaidCmd('unassignReplication', raidCliCmd, param);
  }

  // //showDiagnostic = show diagnostic [device-ID] [count=packet-amount] [output=filename] [-p:p] [-a:a] [type=source-type]
  static showDiagnostic(raidCliCmd: RaidCliCmd, param: raidCmd.ShowDiagnosticParam): RaidCliCmd {
    return easyRaidCmd('showDiagnostic', raidCliCmd, param);
  }

  // show rrchannel
  static getReplicateChannelSelectSetting(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('showRRchannel', raidCliCmd, {});
  }

  // set rrchannel [mode] [ch-list]
  static setRRChannel(raidCliCmd: RaidCliCmd, param: raidCmd.SetRRChannelParam): RaidCliCmd {
    return easyRaidCmd('setRRchannel', raidCliCmd, param);
  }

  // sysconfig pwdpolicy [on|off] [-L n] [-p n] [-w n] [-n n] [-c n] [-u n] [-l n] [-d n] [-s n]
  static fssConfigPasswdPolicy(raidCliCmd: RaidCliCmd, param: fssCmd.FssConfigPasswdPolicyParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssSysconfigPwdpolicy', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {

      raidcmd.param['switch'] = param.isPolicy ? 'on' : 'off';
      raidcmd.param['L'] = param.minLenth;
      raidcmd.param['p'] = param.expireDay;
      raidcmd.param['w'] = param.warnDay;
      raidcmd.param['n'] = param.numHistory;
      raidcmd.param['c'] = param.minChar;
      raidcmd.param['u'] = param.minUpperChar;
      raidcmd.param['l'] = param.minLowerChar;
      raidcmd.param['d'] = param.minDigit;
      raidcmd.param['s'] = param.minSpecialChar;
      if (param.allowLocalUserChangePassword !== null) {
        raidcmd.param['a'] = param.allowLocalUserChangePassword;
      }
    });
  }

  // FSS sysconfig rah [-s:s]
  static fssConfigRah(raidCliCmd: RaidCliCmd, param: fssCmd.FssConfigRahParam): RaidCliCmd {
    return easyRaidCmd('fssSysconfigRah', raidCliCmd, param);
  }

  // FSS disk flush [-t:t]
  static setWritePolicyOnSingleController(raidCliCmd: RaidCliCmd, param: fssCmd.FssDiskFlushParam): RaidCliCmd {
    return easyRaidCmd('fssDiskFlush', raidCliCmd, param);
  }

  // FSS passwd [login_name] [p]
  static fssModPasswd(raidCliCmd: RaidCliCmd, param: fssCmd.FssModPasswdParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssPasswdMod', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {

      raidcmd.param['login_name'] = param.login_name;
      raidcmd.param['p'] = tool.quotation(param.p);
    });
  }

  // FSS useradmin group add [group_name] [-u:u] [-c:c] [-i:i]
  /*
  #  <-u loginName1 LoginName2 ...>
  #  <-c comment>
  #  <-i gid>
  */
  static fssGroupAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssGroupAddParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssUserAdminGroupAdd', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {

      raidcmd.param['group_name'] = param.group_name;
      if (param.userNameArr.length > 0) 
        raidcmd.param['u'] = param.userNameArr.join(' ');
      if (param.gdesc !== '') 
        raidcmd.param['c'] = tool.quotation( (param.gdesc || '') );
    });
  }

  // FSS useradmin group delete [group_name]
  static fssGroupDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssGroupDeleteParam): RaidCliCmd {
    return easyRaidCmd('fssUserAdminGroupDelete', raidCliCmd, param);
  }

  // FSS useradmin group rename [group_name] [-n:n]
  static fssGroupRename(raidCliCmd: RaidCliCmd, param: fssCmd.FssGroupRenameParam): RaidCliCmd {
    return easyRaidCmd('fssUserAdminGroupRename', raidCliCmd, param);
  }

  // FSS useradmin group modify [groupname] [-i:i] [-n:n] [-c:c]
  // # <-n newName>
  // # <-c Description>
  static fssGroupModify(raidCliCmd: RaidCliCmd, param: fssCmd.FssGroupModifyParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssUserAdminGroupModify', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      raidcmd.param['group_name'] = param.groupname;
      raidcmd.param['n'] = param.n;
      raidcmd.param['c'] = tool.quotation(param.c);
    });
  }

  // FSS useradmin group adduser [group_name] [userNames]
  // FSS useradmin group deluser [group_name] [userNames]
  static fssGroupAddDeluser(raidCliCmd: RaidCliCmd, param: fssCmd.FssGroupAddDeleteUserParam, opType: 'add' | 'delete'): RaidCliCmd {
    var key = "";
    if(opType === 'add')    key = 'fssUserAdminGroupAdduser';
    if(opType === 'delete') key = 'fssUserAdminGroupDelUser';

    return easyRaidCmdWithInject(key, raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      raidcmd.param['group_name'] = param.group_name;
      if (param.userNameArr.length > 0) {
        raidcmd.param['userNames'] = param.userNameArr.join(' ');
      }
    });
  }

  /* useradmin user add/modify <login_name> [-i uid] [-c comment] <-password
          [-g group1 [group2 ...]] [-s on|off] [-d {off|on [fullpath] [-f]}
          [-e {0|30|60|90|120}]
  */
  // fssUserAdminAddUser    = FSS useradmin user add    [login_name] [-c:c] [-g:g] [-s:s] [-d:d] [-f:f] [-e:e] [-w:w] [-p:p] [-i:i]
  // fssUserAdminModifyUser = FSS useradmin user modify [login_name] [-c:c] [-g:g] [-s:s] [-d:d] [-f:f] [-e:e] [-w:w]
  static fssAddEditUser(raidCliCmd: RaidCliCmd, param: fssCmd.FssAddEditUserParam): RaidCliCmd {
    var key = "";
    if(param.type === 'Add') key = 'fssUserAdminAddUser';
    else                     key = 'fssUserAdminModifyUser';
    
    return easyRaidCmdWithInject(key, raidCliCmd, {}, (raidcmd:RaidCliCmd) => {

      raidcmd.param['login_name'] = param.name;
      raidcmd.param['c'] = tool.quotation(param.desc);
      raidcmd.param['s'] = (param.isSuper)? 'on': 'off';
      raidcmd.param['e'] = (param.isExpiration)? param.expiration: 0;
      if(param.groupStr !== '')
        raidcmd.param['g'] = param.groupStr.replace(/,/g, ' ');
      if(param.isExpiryNotification !== undefined && param.expiryNotification !== undefined)
        raidcmd.param['w'] = (param.isExpiryNotification)? param.expiryNotification: 0;

      if(param.type === 'Add') {
        raidcmd.param['p'] = tool.quotation(param.pwd);
        if(param.dirType === 'noHomeDir') {
          raidcmd.param['d'] = 'off';
        } else {
          raidcmd.param['d'] = 'on ' + param.directory;
          if(param.dirType === 'newHomeDir')
            raidcmd.param['f'] = '';
        }
      } else if (param.dirType !== null && param.dirType !== 'noHomeDir') {
        raidcmd.param['d'] = 'on ' + param.directory;
        if(param.dirType === 'newHomeDir')
          raidcmd.param['f'] = '';
      }
    });
  }

  // FSS useradmin user delete [login_name] [-d:d]
  static fssDeleteUser(raidCliCmd: RaidCliCmd, param: fssCmd.FssUserDeleteParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssUserAdminDelUser', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      
      raidcmd.param['login_name'] = param.login_name;
      if(param.d) raidcmd.param['d'] = '';
    });
  }

  // FSS ifconfig inet [controller] [interface] [policy] [ip] [netmask] [gateway]
  static fssSetChannliNet(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetChanneliNetParam) {
    return easyRaidCmdWithInject('fssIfconfigInetSet', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      // handle [interface]
      if (param.chNum === 'mgmt0') {
        raidcmd.param['interface'] = 'mgmt0';
      } else if ((param.chNum.indexOf('trunk') > -1)   // set ip for nas trunk
              || (param.chNum.indexOf('vch') > -1) ) { // set ip for vlan
        raidcmd.param['interface'] = param.chNum;
      } else {
        raidcmd.param['interface'] = 'ch' + param.chNum;
      }
      // handle [policy]
      if (param.policy === 'Static') {
        raidcmd.param['policy'] = 'static';
        if(param.netmask) raidcmd.param['netmask'] = `netmask ${param.netmask}`;
        if(param.gateway) raidcmd.param['gateway'] = `gateway ${param.gateway}`;

      } else {
        raidcmd.param['policy'] = 'dhcp';
      }
    });
  }

  // FSS ifconfig inet6 [controller] [interface] [policy] [v6ip] [prefix] [route]
  static fssSetChannlIPv6iNet(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetChannelIPv6iNetParam) {
    return easyRaidCmdWithInject('fssIfconfigInetSet', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      // handle [interface]
      if (param.chNum === 'mgmt0') {
        raidcmd.param['interface'] = 'mgmt0';
      } else if ((param.chNum.indexOf('trunk') > -1)   // set ip for nas trunk
              || (param.chNum.indexOf('vch') > -1) ) { // set ip for vlan
        raidcmd.param['interface'] = param.chNum;
      } else {
        raidcmd.param['interface'] = 'ch' + param.chNum;
      }
      // handle [policy]
      if (param.policy === 'Static') {
        raidcmd.param['policy'] = 'static';
        if(param.prefix) raidcmd.param['prefix'] = `prefix ${param.prefix}`;
        if(param.route)  raidcmd.param['route']  = `route ${param.route}`;

      } else if (param.policy === 'Disabled') {
        raidcmd.param['policy'] = 'unplumb';
      } else {
        raidcmd.param['policy'] = 'plumb';
      }
    });
  }

  // FSS dladm set [controller] [interface] -p [mtu=mtu]
  static fssSetDladm(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetDladmParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssDladmSet', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['p'] = 'mtu=' + param.p;
    });
  }

  // FSS dladm set [controller] [interface] [-p:p] --conf-only
  static fssSetDladmConfOnly(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetDladmConfOnlyParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssDladmSetConfOnly', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['p'] = 'mtu=' + param.p;
    });
  }

  /*
  #  <-t {static|dynamic}>
  #  <-n destination>
  #  <-m netmask>
  #  <-g gateway>
  #  <-i interface>
  */
  // FSS route add [-t:t] [-n:n] [-m:m] [-g:g] [-i:i]
  static fssRouteAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssRouteAddParam): RaidCliCmd {
    return easyRaidCmd('fssRouteAdd', raidCliCmd, param);
  }
  // FSS route add [controller] [-t:t] [-n:n] [-m:m] [-g:g] [-i:i]
  static fssRouteAddRedundant(raidCliCmd: RaidCliCmd, param: fssCmd.FssRouteAddRedundantParam): RaidCliCmd {
    return easyRaidCmd('fssRouteAddRedundant', raidCliCmd, param);
  }
  // FSS route delete [-t:t] [-n:n] [-m:m] [-g:g] [-i:i]
  static fssRouteDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssRouteDeleteParam): RaidCliCmd {
    return easyRaidCmd('fssRouteDelete', raidCliCmd, param);
  }
  // FSS route delete [controller] [-t:t] [-n:n] [-m:m] [-g:g] [-i:i]
  static fssRouteDeleteRedundant(raidCliCmd: RaidCliCmd, param: fssCmd.FssRouteDeleteRedundantParam): RaidCliCmd {
    return easyRaidCmd('fssRouteDeleteRedundant', raidCliCmd, param);
  }

  // mute
  static mute(raidCliCmd: RaidCliCmd, param: raidCmd.MuteParam): RaidCliCmd {
    return easyRaidCmd('mute', raidCliCmd, param);
  }

  // FSS hostname [controller] [name]
  static fssHostName(raidCliCmd: RaidCliCmd, param: fssCmd.FssHostNameParam): RaidCliCmd {
    return easyRaidCmd('fssHostName', raidCliCmd, param);
  }

  // FSS disk expand [disk_id]
  static fssDiskExpand(raidCliCmd: RaidCliCmd, param: fssCmd.FssDiskExpandParam): RaidCliCmd {
    return easyRaidCmd('fssDiskExpand', raidCliCmd, param);
  }

  // utility check sed-key [sed-key] [ld=ld] [-f:f]
  static checkSedKey(raidCliCmd: RaidCliCmd, param: raidCmd.CheckSedKeyParam): RaidCliCmd {
    return easyRaidCmd('checkSedKey', raidCliCmd, param);
  }

  // create flush part [partition-ID] [ip] [os-type] [disk=disk]
  static createFlush(raidCliCmd: RaidCliCmd, param: raidCmd.CreateFlushParam): RaidCliCmd {
    return easyRaidCmd('createFlush', raidCliCmd, param);
  }

  // set flush part [partition-ID] [index] [ip=ip] [os=os] [disk=disk] [-f:f]
  static setFlushPart(raidCliCmd: RaidCliCmd, param: raidCmd.SetFlushParam): RaidCliCmd {
    return easyRaidCmd('setFlushPart', raidCliCmd, param);
  }

  // delete flush part [partition-ID] [index]
  static deleteFlush(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteFlushParam): RaidCliCmd {
    return easyRaidCmd('deleteFlush', raidCliCmd, param);
  }

  // FSS worm set [-v:v] [-m:m] [-r:r] [-a:a]
  static fssWormSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssWormSetParam): RaidCliCmd {
    return easyRaidCmd('fssWormSet', raidCliCmd, param);
  }


  // FSS worm gclk [-s:s] [-g:g] [-i:i]
  static fssWormGclk(raidCliCmd: RaidCliCmd, param: fssCmd.FssWormGclkParam): RaidCliCmd {
    return easyRaidCmd('fssWormGclk', raidCliCmd, param);
  }

  // FSS explorer app start
  static fssExplorerStart(raidCliCmd: RaidCliCmd, param: fssCmd.FssExplorerStartParam): RaidCliCmd {
    return easyRaidCmd('fssExplorerStart', raidCliCmd, param);
  }

  // FSS explorer app stop
  static fssExplorerStop(raidCliCmd: RaidCliCmd, param: fssCmd.FssExplorerStopParam): RaidCliCmd {
    return easyRaidCmd('fssExplorerStop', raidCliCmd, param);
  }

  // FSS explorer app status
  static fssExplorerStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssExplorerStatusParam): RaidCliCmd {
    return easyRaidCmd('fssExplorerStatus', raidCliCmd, param);
  }

  // utility rolling-upgrate -y
  static rollingUpgrade(raidCliCmd: RaidCliCmd, param: raidCmd.RollingUpgradeParam): RaidCliCmd {
    param.y = '';
    return easyRaidCmd('rollingUpgrate', raidCliCmd, param);
  }

  // FSS pool import [assign] [poolname] [-a:a]
  static fssPoolImport(raidCliCmd: RaidCliCmd, param: fssCmd.FssPoolImportParam): RaidCliCmd {
    return easyRaidCmd('fssPoolImport', raidCliCmd, param);
  }

  // create actionlog [LogID] [valuelist=valuelist] [userType=userType] [-i:i]
  static createActionLog(raidCliCmd: RaidCliCmd, param: raidCmd.CreateActionLogParam, userType:string): RaidCliCmd {
    return easyRaidCmdWithInject('createActionLog', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      
      raidcmd.param['valuelist'] = tool.quotation(param.valuelist);
      raidcmd.param['userType']  = userType;
      if (param.LogID)         raidcmd.param['LogID'] = param.LogID;
      if (param.isImmediately) raidcmd.param['i'] = '';
    });
  }

  // show checkntp [ip]
  static checkNTP(raidCliCmd: RaidCliCmd, param: raidCmd.CheckNTPParam): RaidCliCmd {
    return easyRaidCmd('showCheckNTP', raidCliCmd, param);
  }

  // ntp client -u [-n:n]
  static updateTimeNTP(raidCliCmd: RaidCliCmd, param: fssCmd.updateTimeNTP): RaidCliCmd {
    return easyRaidCmd('updateTimeNtp', raidCliCmd, param);
  }

  // utility test SNMPTrap
  static testSNMPTrap(raidCliCmd: RaidCliCmd) {
    return easyRaidCmd('utilityTestSNMPTrap', raidCliCmd, {});
  }

  // FSS nvr db [status]
  static fssProjectServerStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssProjectServerStatusParam): RaidCliCmd {
    return easyRaidCmd('fssProjectServerStatus', raidCliCmd, param);
  }

  // FSS nvr db config [-f:f]
  static fssProjectServerConfig(raidCliCmd: RaidCliCmd, param: fssCmd.FssProjectServerConfigParam): RaidCliCmd {
    return easyRaidCmd('fssProjectServerConfig', raidCliCmd, param);
  }

  // FSS docker [status]
  static fssDockerStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssDockerStatusParam): RaidCliCmd {
    return easyRaidCmd('fssDockerStatus', raidCliCmd, param);
  }

  // FSS docker enable
  static fssDockerEnable(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('fssDockerEnable', raidCliCmd, {});
  }

  // FSS docker disable
  static fssDockerDisable(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('fssDockerDisable', raidCliCmd, {});
  }

  // FSS xferlog clear
  static fssFileAuditingClear(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('fssFileAuditingClear', raidCliCmd, {});
  }

  // export fileauditinglog [filename] 
  static exportFileAuditingLog(raidCliCmd: RaidCliCmd, param: raidCmd.EventLogExportParam): RaidCliCmd {
    return easyRaidCmd('exportFileAuditingLog', raidCliCmd, param);
  }

  // FSS advlogsearch xferlog [-p:p] [-n:n] [-ip=ip] [-u=u] [-f=f] [-st:st] [-et:et] [-proto:proto] [-act:act] [-S:S] [-D:D] [-logic:logic]
  static fssAdvLogSearchXferlog(raidCliCmd: RaidCliCmd, param: fssCmd.FssAdvLogSearchXferlogParam): RaidCliCmd {
    return easyRaidCmd('fssAdvLogSearchXferlog', raidCliCmd, param);
  }

  // FSS cliscript
  static fssCliScript(raidCliCmd: RaidCliCmd, param: fssCmd.FssCliScriptParam): RaidCliCmd {
    return easyRaidCmd('fssCliScript', raidCliCmd, param);
  }

  // FSS volumethreshold add  [-p:p] [-v:v] [-t:t] [-d:d]
  // FSS volumethreshold edit [-p:p] [-v:v] [-t:t] [-d:d] [-i:i]
  static addEditVolumeThreshold(raidCliCmd: RaidCliCmd, param: fssCmd.FssThresholdParam): RaidCliCmd {
    if (param.type === 'add')
      return easyRaidCmd('fssThresholdAdd',  raidCliCmd, param);
    else
      return easyRaidCmd('fssThresholdEdit', raidCliCmd, param);
  }

  // FSS volumethreshold del [-p:p] [-v:v] [-i:i]
  static deleteVolumeThreshold(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteThresholdParam): RaidCliCmd {
    return easyRaidCmd('fssThresholdDelete', raidCliCmd, param);
  }

  // FSS csgateway checkdbtask [-p:p] [-f:f]
  /*
  #  <-p volumeId>
  #  <-f folderPath>
  */
  static fssCsGatewayCheckdbtask(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsGatewayCheckdbtaskParam): RaidCliCmd {
    return easyRaidCmd('fssCsGatewayCheckdbtask', raidCliCmd, param);
  }

  // fssDefragStart  = FSS defrag start [type] [-v:v] [-t:t]
  // fssDefragStop   = FSS defrag stop [type] [-v:v] [-t:t]
  // fssDefragCreate = FSS defrag create [-v:v]
  // fssDefragDelete = FSS defrag delete [-t:t]
  static fssDoDefrag(raidCliCmd: RaidCliCmd, param: fssCmd.FssDoDefragParam): RaidCliCmd {
    switch(param.behavior){
      case "start":  return easyRaidCmd('fssDefragStart',  raidCliCmd, param);
      case "stop":   return easyRaidCmd('fssDefragStop',   raidCliCmd, param);
      case "delete": return easyRaidCmd('fssDefragDelete', raidCliCmd, param);
      case "create": 
        const raidcmd = easyRaidCmd('fssDefragCreate', raidCliCmd, param);
        if(raidcmd.refReturn && raidcmd.refReturn.length > 0) {
          raidcmd.refReturn = { taskname: raidcmd.refReturn[0] };
        }
        return raidcmd;
    }
    return raidCliCmd;
  }

  // set sed refReturn
  static setSedRefReturn(raidCliCmd: RaidCliCmd, param: raidCmd.SetSedRefReturnParam): RaidCliCmd {
    return easyRaidCmdWithInject('setSedRefReturn', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.refReturn = { sedKey: 'sedKey' };
    });
  }

  // set sed sedKeyForce [sedKey=sedKey] [keyType=keyType]
  /* 
  #  <keyType {File | String}>
  */
  static setSedKeyForce(raidCliCmd: RaidCliCmd, param: raidCmd.SetSedKeyForceParam): RaidCliCmd {
    return easyRaidCmdWithInject('setSedKeyForce', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.refParam = { sedKey: 'sedKey' };
    });
  }

  // set ld sed force enable [ldList] [sedKey=sedKey] [stringFile=stringFile]
  static setLdSedForceEnable(raidCliCmd: RaidCliCmd, param: raidCmd.SetLdSedForceEnableParam, callback?: (...val: any) => any): RaidCliCmd {
    const raidcmd = easyRaidCmdWithInject('setLdSedForceEnable', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['ldList'] = param.ldList.join(',');
      raidcmd.param['isGlobalRefParam'] = param.isGlobalRefParam;
      if (param.sedKey) {
        raidcmd.param['sedKey'] = param.sedKey;
      } else {
        raidcmd.param['sedKey'] = '';
        raidcmd.refParam = 'sedKey';
      }
    });

    if (callback) callback(null, raidcmd);
    return raidcmd;
  }

  // set ld sed force disable [ldList] 
  static setLdSedForceDisable(raidCliCmd: RaidCliCmd, param: raidCmd.SetLdSedForceDisableParam, callback?: (...val: any) => any): RaidCliCmd {
    const raidcmd = easyRaidCmdWithInject('setLdSedForceDisable', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['ldList'] = param.ldList.join(',');
    });
    
    if (callback)  callback(null, raidcmd);
    return raidcmd;
  }

  // FSS device-func format -c [clusterName] -n [nodeId] -d [Partition-ID]
  static fssCsEnclosureAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsEnclosureAddParam): RaidCliCmd {
    return easyRaidCmd('fssCsDeviceFormat', raidCliCmd, param);
  }

  // FSS volume-func create_get [-c:c] [-t:t] [-o:o] [-x:x] [-j:j] [-C:C] [-P:P] [-N:N]
  static fssCsVolumeCreateGet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeCreateGetParam): RaidCliCmd {
    return easyRaidCmd('fssCsVolumeCreateGet', raidCliCmd, param);
  }

  // FSS volume-func create_set [-c:c] [-v:v] [-t:t] [-s:s] [-o:o] 
  //     [-p:p] [-w:w] [-d:d] [-x:x] [-y:y] [-j:j] [-a:a] [-e:e] 
  //     [-l:l] [-q:q] [-m:m] [-r:r] [-A:A] [-S:S] [-N:N] [-C:C] [-D:D] [-f:f]
  static fssCsVolumeCreateSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeCreateSetParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssCsVolumeCreateSet', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {

      raidcmd.param['c'] = param.clusterName;
      raidcmd.param['v'] = param.volumeName;
      raidcmd.param['t'] = param.protectionLevel;
      raidcmd.param['o'] = param.poolType;
      raidcmd.param['s'] = param.size;
      if (param.quotaSwitch) { raidcmd.param['q'] = 'on'; }
      if (param.description) { raidcmd.param['d'] = param.description; }
      if (param.worm)        { raidcmd.param['w'] = 'on'; }
      if (param.distributed_number)     { raidcmd.param['x'] = param.distributed_number; }
      if (param.max_distributed_number) { raidcmd.param['y'] = param.max_distributed_number; }
      if (param.enclosureList) { raidcmd.param['j'] = JSON.stringify(param.enclosureList); }
      if (param.autoRebalance) { raidcmd.param['a'] = 'on'; }
      if (param.writeBackOpt)  { raidcmd.param['e'] = param.writeBackOpt; }
      if (param.softlimit)     { raidcmd.param['l'] = param.softlimit; }
      if (param.retention)     { raidcmd.param['r'] = param.retention; }
      if (param.lockTime)      { raidcmd.param['m'] = param.lockTime; }
      if (param.advancedACL)   { raidcmd.param['A'] = ""; }
      if (param.nodes)         { raidcmd.param['N'] = param.nodes; }
      if (param.CompressPolicy){ raidcmd.param['C'] = param.CompressPolicy; }
      if (param.enableDedup)   { raidcmd.param['D'] = ""; }
      if (param.fileSystem)    { raidcmd.param['f'] = param.fileSystem; }

    });
  }

  // FSS volume-func edit [-c:c] [-v:v] [-w:w] [-p:p] [-d:d] [-a:a] [-q:q] [-m:m] [-r:r] [-A:A] [-n:n] [-N:N]
  static fssCsVolumeEdit(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeEditParam): RaidCliCmd {
    return easyRaidCmd('fssCsVolumeEdit', raidCliCmd, param);
  }

  // FSS volume-func edit [-c:c] [-v:v] [-a:a] [-d:d] [-N:N]
  static fssCsVolumeAutoRebalance(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeAutoRebalanceParam): RaidCliCmd {
    return easyRaidCmd('fssCsVolumeAutoRebalance', raidCliCmd, param);
  }

  // FSS volume-func delete [-c:c] [-v:v]
  static fssCsVolumeDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeDeleteParam): RaidCliCmd {
    return easyRaidCmd('fssCsVolumeDelete', raidCliCmd, param);
  }

  // FSS volume-func setquota [-c:c] [-v:v] [-d:d] [-q:q] [-s:s]
  static fssCsVolumeSetQuota(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeSetQuotaParam): RaidCliCmd {
    return easyRaidCmd('fssCsVolumeSetQuota', raidCliCmd, param);
  }

  // FSS volume-func delquota [-c:c] [-v:v] [-d:d]
  static fssCsVolumeDelQuota(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeDelQuotaParam): RaidCliCmd {
    return easyRaidCmd('fssCsVolumeDelQuota', raidCliCmd, param);
  }

  // fssNetFuncComModify = FSS net-func com-modify
  static fssNetFunc(raidCliCmd: RaidCliCmd, param: fssCmd.FssNetFuncParam, funcName: string): RaidCliCmd {
    let key = tool.format('fssNetFunc{0}', funcName); // funcName = [ComModify]
    return easyRaidCmd(key, raidCliCmd, param);
  }

  // set restful config csDriveRec [ip=ip] [nodeId=nodeId]
  static updateCSDriveRec(raidCliCmd: RaidCliCmd, param: raidCmd.UpdateCSDriveRecParam, callback?: (...val: any) => any): RaidCliCmd {
    const raidcmd = easyRaidCmd('setRestfulConfigCSDriveRec', raidCliCmd, param);

    if (callback)  callback(null, raidcmd);
    return raidcmd;
  }

  // FSS csifconfig set [controller] [--nid:nid] [-c:c] [-t:t] [-m:m] [--bm:bm]
  //     [--type4:type4] [--ip4:ip4] [--nm4:nm4] [--gw4:gw4] 
  //     [--type6:type6] [--ip6:ip6] [--pl6:pl6] [--gw6:gw6]
  static fssCsIfconfigSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsIfconfigSetParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssCsIfconfigSet', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      
      raidcmd.param['controller'] = param.controller;
      raidcmd.param['nid'] = tool.quotation(param.nid);
      raidcmd.param['c'] = tool.quotation(param.c);
      raidcmd.param['t'] = tool.quotation(param.t);
      raidcmd.param['m'] = tool.quotation(param.m);
      if (param.bm) raidcmd.param['bm'] = tool.quotation(param.bm);

      raidcmd.param['type4'] = tool.quotation(param.type4);
      if (param.type4 === '"static"') {
        raidcmd.param['ip4'] = tool.quotation(param.ip4);
        raidcmd.param['nm4'] = tool.quotation(param.nm4);
        raidcmd.param['gw4'] = tool.quotation(param.gw4);
      }
      raidcmd.param['type6'] = tool.quotation(param.type6);
      if (param.type6 === '"static"') {
        raidcmd.param['ip6'] = tool.quotation(param.ip6);
        raidcmd.param['pl6'] = tool.quotation(param.pl6);
        raidcmd.param['gw6'] = tool.quotation(param.gw6);
      }
    });
  }

  // FSS csifconfig unset [controller] [--nid:nid] [-c:c]
  static fssCsIfconfigUnset(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsIfconfigUnsetParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssCsIfconfigUnset', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['nid'] = tool.quotation(param.nid);
      raidcmd.param['c']   = tool.quotation(param.c);
    });
  }

  // FSS csifconfig addroute [controller] [--nid:nid] [-c:c] [-d:d] [-m:m] [-g:g] [-p:p]
  // FSS csifconfig delroute [controller] [--nid:nid] [-c:c] [-d:d] [-m:m] [-g:g] [-p:p]
  static fssCsIfconfigRouteSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsIfconfigRouteSetParam, action: string): RaidCliCmd {
    let key = "unknown";
    switch(action){
      case "add": key = "fssCsIfconfigAddroute"; break;
      case "del": key = "fssCsIfconfigDelroute"; break;
    }
    
    return easyRaidCmdWithInject(key, raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['nid'] = tool.quotation(param.nid);
      raidcmd.param['c']   = tool.quotation(param.c);
      raidcmd.param['p']   = tool.quotation(param.p);
      if (param.d) raidcmd.param['d'] = tool.quotation(param.d);
      if (param.m) raidcmd.param['m'] = tool.quotation(param.m);
      if (param.g) raidcmd.param['g'] = tool.quotation(param.g);
    });
  }

  // FSS csifconfig rmnode [controller] [--nid:nid]
  static fssCsIfconfigRmNode(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsIfconfigRmNodeParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssCsIfconfigRmNode', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['nid'] = tool.quotation(param.nid);
    });
  }

  // FSS ifconfig inet [controller] [interface] [policy] [ip] [netmask] [gateway] --conf-only
  static fssSetChannliNetConfOnly(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetChannliNetConfOnlyParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssIfconfigInetSetConfOnly', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      
      if (param.policy === 'Static') {
        raidcmd.param['policy'] = 'static';
        if (param.ip === '') { raidcmd.param['ip'] = '0.0.0.0'; }
        if (param.netmask)   { raidcmd.param['netmask'] = 'netmask ' + param.netmask; }
        if (param.gateway)   { raidcmd.param['gateway'] = 'gateway ' + param.gateway; }
      } else {
        raidcmd.param['policy'] = 'dhcp';
      }
      if (param.gateway == null || param.gateway === '') {
        delete raidcmd.param['gateway'];
      }
    });
  }

  // FSS trunk [action] [-n:n] [-m:m] [-b:b] --conf-only
  static fssTrunkSetConfOnly(raidCliCmd: RaidCliCmd, param: fssCmd.FssTrunkSetConfOnlyParam): RaidCliCmd {
    return easyRaidCmd('fssTrunkSetConfOnly', raidCliCmd, param);
  }

  // FSS ifconfig internalgrp [action] [-g:g]
  static fssIfconfigGroupSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssIfconfigGroupSetParam): RaidCliCmd {
    return easyRaidCmd('fssIfconfigGroupSet', raidCliCmd, param);
  }

  // FSS gupdate sync [slot] [-t:t]
  static fssCsSyncInfo(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsSyncInfoParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssCsGupdateSync', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {

      raidcmd.param['t'] = param.type;
      raidcmd.param['slot'] = "slotA";
    });
  }
  // FSS gupdate sync [slot] [-t:t]
  static fssCsSync(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsSyncTypes): RaidCliCmd {
    return easyRaidCmdWithInject('fssCsGupdateSync', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {

      var typeArr = Object.keys(param.types).filter( (item:string) => param.types[item] );
      raidcmd.param['t'] = typeArr.join(',');
      raidcmd.param['slot'] = "slotA";
    });
  }

  // FSS volume-func volume-heal get [-c:c]
  // FSS volume-func volume-heal set [-c:c] [-i:i]
  // FSS volume-func volume-heal heal [-c:c]
  static fssCsVolumeHeal(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeHealParam, callback: any): RaidCliCmd {
    var key = "";
    switch(param.operation){
      case "set": key = "fssVolumeFuncVolumeHealSet"; break;
      case "get": key = "fssVolumeFuncVolumeHealGet"; break;
      default:    key = "fssVolumeFuncVolumeHealHeal"; break;
    }

    const raidcmd = easyRaidCmd(key, raidCliCmd, param);
    if (callback) {
      if (typeof param.c !== 'string') {
        callback('clusterName is not correct');
      } else if (param.operation !== 'heal' && typeof param.i !== 'number') {
        callback('interval is not correct');
      } else if (['get', 'set', 'heal'].indexOf(param.operation) < 0) {
        callback('operation is no correct');
      } else {
        callback(null, raidcmd);
      }
    }
    return raidcmd;
  }

  // FSS cluster-func cross-heal get [-c:c]
  // FSS cluster-func cross-heal set [-c:c] [-i:i] 
  // FSS cluster-func cross-heal heal [-c:c]
  static fssCsCrossHeal(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsCrossHealParam, callback: any): RaidCliCmd {
    var key = "";
    switch(param.operation){
      case "set": key = "fssClusterFuncCrossHealSet"; break;
      case "get": key = "fssClusterFuncCrossHealGet"; break;
      default:    key = "fssClusterFuncCrossHealHeal"; break; 
    }

    const raidcmd = easyRaidCmd(key, raidCliCmd, param);
    if (callback) {
      if (typeof param.c !== 'string') {
        callback('clusterName is not correct');
      } else if (param.operation !== 'heal' && typeof param.i !== 'number') {
        callback('interval is not correct');
      } else if (['get', 'set', 'heal'].indexOf(param.operation) < 0) {
        callback('operation is no correct');
      } else {
        callback(null, raidcmd);
      }
    }
    return raidcmd;
  }

  // FSS info -t
  static fssCsGetBgJob(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('fssCsGetBgJob', raidCliCmd, {});
  }

  // FSS volume-func abort_rebalance [-c:c]
  static fssCsRebalanceAbort(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsRebalanceAbortParam, callback: any): (RaidCliCmd | undefined) {
    const raidcmd = easyRaidCmd('fssVolumeFuncNodeRebalanceAbort', raidCliCmd, param);

    if (callback) callback(null, raidcmd);
    return raidcmd;
  }

  // FSS cluster-func status [-c:c] -b
  static fssCsRebalanceStatus(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsRebalanceStatusParam, callback: any): RaidCliCmd {
    const raidcmd = easyRaidCmd('fssClusterFuncRebalanceStatus', raidCliCmd, param);

    if (callback)  callback(null, raidcmd);
    return raidcmd;
  }

  // FSS cluster-func replace-check [-c:c]
  static fssClusterFuncReplaceCheck(raidCliCmd: RaidCliCmd, param: fssCmd.FssClusterFuncReplaceCheckParam, callback: any): RaidCliCmd {
    const raidcmd = easyRaidCmd('fssClusterFuncReplaceCheck', raidCliCmd, param);

    if (callback) callback(null, raidcmd);
    return raidcmd;
  }

  // FSS cluster-func status [-c:c] -r
  static fssCsLastReplaceNode(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsLastReplaceNodeParam, callback: any): RaidCliCmd {
    const raidcmd = easyRaidCmd('fssClusterFuncLastReplaceNode', raidCliCmd, param);

    if (callback) callback(null, raidcmd);
    return raidcmd;
  }

  // FSS volume-func rebalance [-c:c] [-o:o]
  /*
  #  <c clusterName>
  #  <o operation:{ 'SSD'|'Hybrid'|'HDD'|'ALL' }>
  */
  static fssVolumeFuncNodeRebalance(raidCliCmd: RaidCliCmd, param: fssCmd.FssVolumeFuncNodeRebalanceParam, callback: any): RaidCliCmd {
    const raidcmd = easyRaidCmd('fssVolumeFuncNodeRebalance', raidCliCmd, param);

    if (callback) callback(null, raidcmd);
    return raidcmd;
  }

  // FSS volume-func rebalance_volume [-c:c] [-v:v] [-f:f] [-a:a]
  static fssVolumeFuncVolumeRebalanceSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeFuncVolumeRebalanceSetParam): RaidCliCmd {
    return easyRaidCmd('fssVolumeFuncVolumeRebalanceSet', raidCliCmd, param);
  }

  // FSS volume-func expand_set [-c:c] [-v:v] [-a:a] [-j:j] [-s:s]
  static fssCsVolumeExpandSet(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeExpandSetParam): RaidCliCmd {
    return easyRaidCmd('fssCsVolumeExpandSet', raidCliCmd, param);
  }

  // FSS volume-func volume-heal heal [-c:c]
  static fssVolumeFuncVolumeHealHeal(raidCliCmd: RaidCliCmd, param: fssCmd.FssVolumeFuncVolumeHealHealParam): RaidCliCmd {
    return easyRaidCmd('fssVolumeFuncVolumeHealHeal', raidCliCmd, param);
  }

  // FSS volume-func transport_rdma -v IFTShareVol [-a:a] [-c:c]
  static fssVolumeFuncSetRdma(raidCliCmd: RaidCliCmd, param: fssCmd.FssVolumeFuncSetRdmaParam): RaidCliCmd {
    return easyRaidCmd('fssVolumeFuncSetRdma', raidCliCmd, param);
  }

  // FSS volume-func nfs-ino32 [-c:c] [-a:a]
  static fssVolumeFuncSetNFS32bit(raidCliCmd: RaidCliCmd, param: fssCmd.FssServiceOptionForNFS): RaidCliCmd {
    return easyRaidCmd('fssVolumeFuncSetNFS32bit', raidCliCmd, param);
  }

  // FSS cluster-func shrink [-c:c] [-n:n]
  static fssClusterFuncShrink(raidCliCmd: RaidCliCmd, param: fssCmd.FssClusterFuncShrinkParam): RaidCliCmd {
    return easyRaidCmd('fssClusterFuncShrink', raidCliCmd, param);
  }

  // FSS gntp [slot] [opt]
  static fssCsLocalNtp(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsLocalNtpParam): RaidCliCmd {
    param.slot = 'slotA';
    return easyRaidCmd('fssCsLocalNtp', raidCliCmd, param);
  }

  // FSS volume-func write_back [-c:c] [-v:v] [-w:w]
  static fssCsVolumeWriteBack(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsVolumeWriteBackParam): RaidCliCmd {
    return easyRaidCmd('fssCsVolumeWriteBack', raidCliCmd, param);
  }

  // FSS smart-func set_delegation_config -c [clusterName] [-n:n] [-t:t] [-p:p]
  static fssCsSmartSetLoadBalance(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsSmartSetLoadBalance): RaidCliCmd {
    return easyRaidCmd('fssCsSmartSetLoadBalance', raidCliCmd, param);
  }
  // FSS smart-func cancel_LB -c [clusterName] [-s:s]
  static fssCsSmartUnsetLoadBalance(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsSmartUnsetLoadBalance): RaidCliCmd {
    return easyRaidCmd('fssCsSmartUnsetLoadBalance', raidCliCmd, param);
  }

  // FSS system clusterdown
  static fssSystemClusterDown(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('fssSystemClusterDown', raidCliCmd, {});
  }

  // delete file [target] [subfolder=subfolder] [bgJob=bgJob]
  static deleteTargetFile(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteTargetFileParam): RaidCliCmd {
    return easyRaidCmd('deleteTargetFile', raidCliCmd, param);
  }

  // FSS cluster-func recovery [-c:c] [-a:a]
  static fssCsDataRecoveryState(raidCliCmd: RaidCliCmd, param: fssCmd.FssCsDataRecoveryStateParam): RaidCliCmd {
    return easyRaidCmd('fssCsDataRecoveryState', raidCliCmd, param);
  }


  // FSS gsxfs create [-f:fsName] [-c:createSize] [-s:stripeSize] [-d:deviceIdList] [-n:controllerList] 
  //     [-A:appSizeList] [-t:fsType] [-p:protection] [-a:caseInsensitive] [-T:threshold]
  static fssGSxFSCreate(raidCliCmd: RaidCliCmd, param: fssCmd.FssGSxFSCreateParam): RaidCliCmd {
    

    const processedParam = {

    };

    raidCliCmd.key = 'fssGSxFSCreate';
    raidCliCmd.param = processedParam;
    return easyRaidCmdWithInject('fssGSxFSCreate', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      
      let deviceIdList: string[] = [];
      let controllerList: string[] = [];
      let appSizeList: string[] = [];
      for (const device of param.device) {
        deviceIdList.push(device.deviceId);
        controllerList.push(device.controller);
        appSizeList.push(device.size);
      }

      raidcmd.param['fsName'] = param.fsName;
      raidcmd.param['createSize'] = param.createSize;
      raidcmd.param['stripeSize'] = param.stripeSize;
      raidcmd.param['deviceIdList'] =   deviceIdList.join(',');
      raidcmd.param['controllerList'] = controllerList.join(',');
      raidcmd.param['appSizeList'] =    appSizeList.join(',');
      raidcmd.param['fsType'] = param.fsType;
      raidcmd.param['protection'] = param.protection;
      raidcmd.param['threshold'] = param.threshold;
      raidcmd.param['caseInsensitive'] = param.caseInsensitive ? 'True' : 'False';
    });
  }

  // FSS gsxfs folder create [-p:p] [slot]
  static fssGSxFSFolderCreate(raidCliCmd: RaidCliCmd, param: fssCmd.FssGSxFSFolderCreateParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssGSxFSFolderCreate', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      if(param.p) raidcmd.param.p = tool.quotation(param.p);
    });
  }


  // set host [queue-depth=queueDepth] [max-lun=maxLun] [conn-mode=connMode] [concurrent=concurrent] [num-tag=numTag] 
  //     [dev-type=devType] [dev-qual=devQual] [remove-media=removeMedia] [lun-app=lunApp] 
  //     [chs=chs] [CHAP=CHAP] [jumbo-frame=jumboFrame] [-r:r] [-y:y]
  static setHost(raidCliCmd: RaidCliCmd, param: raidCmd.SetHostParam): RaidCliCmd {
    return easyRaidCmdWithInject('setHost', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param.y = '';
    });
  }

  // FSS route setdefault [controller] [-i:i]
  static fssSetDefaultRouteRedundant(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetDefaultRouteRedundantParam): RaidCliCmd {
    return easyRaidCmd('fssRouteSetDefault', raidCliCmd, param);
  }

  // set channel [ID] [mode=mode] [aid=aid] [bid=bid] [maxrate=maxrate] [mcs=mcs] [rdmaType=rdmaType] [-r:r] [-y:y]
  static setChannel(raidCliCmd: RaidCliCmd, param: raidCmd.SetChannelParam): RaidCliCmd {
    return easyRaidCmdWithInject('setChannel', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      
      if (param.aid === '') { raidcmd.param['aid'] = 'delete'; }
      if (param.bid === '') { raidcmd.param['bid'] = 'delete'; }
    });
  }

  // set channel owner [channel-ID] [type] [-f:f]
  static setChannelOwner(raidCliCmd: RaidCliCmd, param: raidCmd.SetChannelOwnerParam): RaidCliCmd {
    return easyRaidCmd('setChannelOwner', raidCliCmd, param);
  }

  // set net [ID] [ip=ip] [mask=mask] [gw=gw] [v6ip=v6ip] [prefix=prefix] [route=route] [-r:r] [-y:y] [-p:p]
  static setNet(raidCliCmd: RaidCliCmd, param: raidCmd.SetNetParam): RaidCliCmd {
    return easyRaidCmdWithInject('setNet', raidCliCmd, {}, (raidcmd:RaidCliCmd) => {
      
      raidcmd.param['ID'] = param.ID;
      // ipv4
      let ip = '', mask = '', gw = '';
      if (param.netType === 'DHCP') {
        ip = 'dhcp';
      } else {
        if (param.ip_A)   { ip   = param.ip_A; }
        if (param.mask_A) { mask = param.mask_A; }
        if (param.gw_A)   { gw   = param.gw_A; }
        if (param.isRedundant) {
          if (param.ip_B)   { ip   = `${ip},${param.ip_B}`; }
          if (param.mask_B) { mask = `${mask},${param.mask_B}`; }
          if (param.gw_B)   { gw   = `${gw},${param.gw_B}`; }
        }
      }
      if(ip)   raidcmd.param['ip'] = ip;
      if(mask) raidcmd.param['mask'] = mask;
      if(gw)   raidcmd.param['gw'] = gw;

      // ipv6
      let v6Ip = '', prefix = '', route = '';
      if (param.v6NetType === 'Disabled') {
        v6Ip = '';
      } else if (param.v6NetType === 'Auto') {
        v6Ip = 'dhcp';
      } else {
        if (param.v6Ip_A)   { v6Ip   = param.v6Ip_A; }
        if (param.prefix_A) { prefix = param.prefix_A; }
        if (param.route_A)  { route  = param.route_A; }
        if (param.isRedundant) {
          if (param.v6Ip_B)   { v6Ip   = v6Ip + ',' + param.v6Ip_B; }
          if (param.prefix_B) { prefix = prefix + ',' + param.prefix_B; }
          if (param.route_B)  { route  = route + ',' + param.route_B; }
        }
      }
      raidcmd.param['v6ip'] = (v6Ip === '')? '""': v6Ip;
      if(prefix) raidcmd.param['prefix'] = prefix;
      if(route)  raidcmd.param['route'] = route;

    });
  }

  // set channel jumbo-frame [channelId] [index=index]
  static setChannelJumboFrame(raidCliCmd: RaidCliCmd, param: raidCmd.SetChannelJumboFrameParam): RaidCliCmd {
    return easyRaidCmd('setChannelJumboFrame', raidCliCmd, param);
  }

  // FSS dladm set [controller] [interface] -p [mtu=mtu]
  static fssSetChannlMtu(raidCliCmd: RaidCliCmd, param: fssCmd.FssSetChannelMtuParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssDladmSet', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      if (param.interf.indexOf('mgmt')  > -1 || // set ip for nas management port
          param.interf.indexOf('trunk') > -1 || // set ip for nas trunk
          param.interf.indexOf('vch')   > -1 || // set ip for vlan
          param.interf.indexOf('ch')    > -1 || // set ip for normal channel
          param.interf.indexOf('CH')    > -1 || // set ip for normal channel
          param.interf.indexOf('iftnic') > -1) { // set ip for normal channel
        raidcmd.param['interface'] = param.interf;
      } else {
        raidcmd.param['interface'] = 'ch' + param.interf;
      }
    });
  }

  // trunk add <-n trunkname> <-m interfac1 interface2 [interface3 ... ]> [-b mode]
  static fssTrunkAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssTrunkAddParam): RaidCliCmd {
    return easyRaidCmd('fssTrunkAdd', raidCliCmd, param);
  }

  // trunk delete <-n trunkname> <-m interfac1 interface2 [interface3 ... ]>
  static fssTrunkDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssTrunkDeleteParam): RaidCliCmd {
    return easyRaidCmd('fssTrunkDelete', raidCliCmd, param);
  }

  // create trunk [channel-ID-list] [-r:r] [-y:y] [-p:p]
  static createTrunk(raidCliCmd: RaidCliCmd, param: raidCmd.CreateTrunkParam): RaidCliCmd {
    return easyRaidCmdWithInject('createTrunk', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      raidcmd.param['p'] = '';
    });
  }

  // delete trunk [index] [-r:r] [-y:y] [-p:p]
  static deleteTrunk(raidCliCmd: RaidCliCmd, param: raidCmd.DeleteTrunkParam): RaidCliCmd {
    return easyRaidCmd('deleteTrunk', raidCliCmd, param);
  }


  // FSS scifconfig set [controller] [-t:t] [--conf-only:conf-only] [--type4:type4] [--ip4:ip4] [--nm4:nm4] [--gw4:gw4] [--type6:type6] [--ip6:ip6] [--pl6:pl6] [--gw6:gw6]
  static fssScifconfigSet(raidCliCmd: RaidCliCmd, param: raidCmd.SetScifconfigParam): RaidCliCmd {
    return easyRaidCmd('fssScifconfigSet', raidCliCmd, param);
  }

  // FSS k8s csi client add [-i:i] [-u:u] [-p:p] [-r:r]
  /*
  #  <-i ip>
  #  <-u user>
  #  <-p password>
  #  <-r {yes | no}>
  */
  static fssK8sCsiClientAdd(raidCliCmd: RaidCliCmd, param: fssCmd.FssK8sCsiClientAddParam) {
    return easyRaidCmd('fssK8sCsiClientAdd', raidCliCmd, param);
  }

  // FSS k8s csi client delete [-i:i] [-r:r]
  /*
  #  <-i ip>
  #  <-r {yes | no}>
  */
  static fssK8sCsiClientDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssK8sCsiClientDeleteParam) {
    return easyRaidCmd('fssK8sCsiClientDelete', raidCliCmd, param);
  }

  // FSS k8s csi sc apply [-d:d] [-r:r] [-dt:dt] [-i:i] [-p:p] [-n:n] [-id:id]
  /*
  #  <-d device_name>
  #  <-r raid_level>
  #  <-dt drive_type>
  */
  static fssK8sCsiScApply(raidCliCmd: RaidCliCmd, param: fssCmd.FssK8sCsiScApplyParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssK8sCsiScApply', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      
      raidcmd.param['d'] = tool.quotation(param.d);
      if(param.p && param.p != '') {
        raidcmd.param['p'] = param.p.replace(/,/g, ' ');
      }
    });
  }

  // FSS k8s csi sc delete [-n:n]
  /* <-n = storage-class name> */
  static fssK8sCsiScDelete(raidCliCmd: RaidCliCmd, param: fssCmd.FssK8sCsiScDeleteParam): RaidCliCmd {
    return easyRaidCmdWithInject('fssK8sCsiDelete', raidCliCmd, param, (raidcmd:RaidCliCmd) => {
      
      if(param.n != '') {
        raidcmd.param['n'] = param.n.replace(/,/g, ' ');
      }
    });
  }

  // FSS folder attr set [slot] [-p:p] [-e:e] [-t:t] [-c:c] [-d:d] [-o:o] [-m:m]
  static fssFolderAttrSet(raidCliCmd: RaidCliCmd, param: fssCmd.FolderAttrSetParam): RaidCliCmd {
    return easyRaidCmd('fssFolderAttrSet', raidCliCmd, param);
  }

  // FSS filecluster master ntp [-a:a] @GeneralAdmin
  static fssFileClusterMasterNtp(raidCliCmd: RaidCliCmd, param: fssCmd.FssFileClusterMasterNtpParam): RaidCliCmd {
    return easyRaidCmd('fssFileClusterMasterNtp', raidCliCmd, param);
  }

  // FSS system sync_event_log
  static fssSystemSyncEventLog(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('fssSystemSyncEventLog', raidCliCmd, {});
  }

  // disk flash [-s:disk_slot_list]
  static fssDiskFlash(raidCliCmd: RaidCliCmd, param: fssCmd.FssDiskFlashParam): RaidCliCmd {
    return easyRaidCmd('fssDiskFlash', raidCliCmd, param);
  }

  // k8sStorage disk add [device_id=device_id] [disk_slot_list=disk_slot_list]
  static k8sStorageDiskAdd(raidCliCmd: RaidCliCmd, param: fssCmd.K8sStorageDiskAddParam): RaidCliCmd {
    return easyRaidCmd('k8sStorageDiskAdd', raidCliCmd, param);
  }

  // system sanitize [-r:reboot]
  static systemSanitize(raidCliCmd: RaidCliCmd, param: fssCmd.SystemSanitizeParam): RaidCliCmd {
    return easyRaidCmd('fssSystemSanitize', raidCliCmd, param);
  }

  // system defaultrestore [-r:reboot]
  static systemDefaultRestore(raidCliCmd: RaidCliCmd, param: fssCmd.DefaultRestoreParam): RaidCliCmd {
    return easyRaidCmd('fssSystemDefaultrestore', raidCliCmd, param);
  }

  // diskpool removemissing [-n:device_id] [-t:remove_type]
  static fssDiskpoolRemovemissing(raidCliCmd: RaidCliCmd, param: fssCmd.FssDiskpoolRemovemissingParam): RaidCliCmd {
    return easyRaidCmd('fssDiskpoolRemovemissing', raidCliCmd, param);
  }

  // nvme disconnect [-n:disk_sn_list] [-s:unique_id]
  static fssNvmeDisconnect(raidCliCmd: RaidCliCmd, param: fssCmd.FssNvmeDisconnectParam): RaidCliCmd {
    return easyRaidCmd('fssNvmeDisconnect', raidCliCmd, param);
  }

  // FSS disk locate [-s:disk_slot_list]
  static fssDiskLocate(raidCliCmd: RaidCliCmd, param: fssCmd.FssDiskFlashParam): RaidCliCmd {
    return easyRaidCmd('fssDiskLocate', raidCliCmd, param);
  }

  static showExternalStorage(raidCliCmd: RaidCliCmd, param: raidCmd.showExternalStorageParam): RaidCliCmd {
    raidCliCmd.showArray = true;
    return easyRaidCmd('showExternalStorage', raidCliCmd, param);
  }

  static k8sApiKubectlGetConfigmap(raidCliCmd: RaidCliCmd, param: raidCmd.k8sApiKubectlGetConfigmapParam): RaidCliCmd {
    return easyRaidCmd('k8sApiKubectlGetConfigmap', raidCliCmd, param);
  }

  static k8sApiKubectlCreateConfigmap(raidCliCmd: RaidCliCmd, param: raidCmd.k8sApiKubectlGetConfigmapParam): RaidCliCmd {
    return easyRaidCmd('k8sApiKubectlCreateConfigmap', raidCliCmd, param);
  }

  static k8sApiKubectlEditConfigmap(raidCliCmd: RaidCliCmd, param: raidCmd.k8sApiKubectlEditConfigmapParam): RaidCliCmd {
    return easyRaidCmd('k8sApiKubectlEditConfigmap', raidCliCmd, param);
  }


  /****************
   * IPMITool Cmds
   ****************/
  // ipmitool lan print 1
  static getBmcInfo(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('getBmcInfo', raidCliCmd, {});
  }

  // ipmitool lan set 1 ipaddr [ip]
  static setBmcIp(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcIpParam): RaidCliCmd {
    return easyRaidCmd('setBmcIp', raidCliCmd, param);
  }

  // ipmitool lan set 1 ipsrc [policy]
  static setBmcPolicy(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcPolicyParam): RaidCliCmd {
    return easyRaidCmd('setBmcPolicy', raidCliCmd, param);
  }

  // ipmitool lan set 1 netmask [mask]
  static setBmcMask(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcMaskParam): RaidCliCmd {
    return easyRaidCmd('setBmcMask', raidCliCmd, param);
  }

  // ipmitool lan set 1 defgw ipaddr [gateway]
  static setBmcGateway(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcGatewayParam): RaidCliCmd {
    return easyRaidCmd('setBmcGateway', raidCliCmd, param);
  }

  // ipmitool sel time set [option]
  static setBmcTime(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcTimeParam): RaidCliCmd {
    return easyRaidCmd('setBmcTime', raidCliCmd, param);
  }

  // ipmitool raw 0x32 0xa8 [option] [data]
  static setBmcNtp(raidCliCmd: RaidCliCmd, param: fssCmd.setBmcNtpParam): RaidCliCmd {
    return easyRaidCmd('setBmcNtp', raidCliCmd, param);
  }

  // ipmitool raw 0x32 0xa8 0x4
  static restartBmcNtp(raidCliCmd: RaidCliCmd): RaidCliCmd {
    return easyRaidCmd('restartBmcNtp', raidCliCmd, {});
  }

  // Unknown: ???
  static syncBmcTimeSettings(raidCliCmd: RaidCliCmd, param: fssCmd.syncBmcTimeSettingsParam): RaidCliCmd {
    return easyRaidCmd('syncBmcTimeSettings', raidCliCmd, param);
  }

  /****************
   * LVM Cmds
   ****************/
  // lvm full-create [device_id_list=device_id_list] [-r:raid_level] [size=size] [-fs:file_system]
  //     [-ci:ci_option] [-c:compress_type] [-n:name] [-pv_size:pv_size]
  //     [-csi_folder_path:csi_folder_path]
  //     [-pv_description:pv_description] [-pv_access_modes:pv_access_modes]
  static createLvm(raidCliCmd: RaidCliCmd, param: fssCmd.CreateLvmParam): RaidCliCmd {
    return easyRaidCmd('lvmFullCreate', raidCliCmd, param);
  }

  // lvm expand [-u:uuid] [-s:size]
  static expandLvm(raidCliCmd: RaidCliCmd, param: fssCmd.ExpandLvmParam): RaidCliCmd {
    return easyRaidCmd('lvmExpand', raidCliCmd, param);
  }

  // lvm delete [-u:uuid]
  static deleteLvm(raidCliCmd: RaidCliCmd, uuid: string): RaidCliCmd {
    return easyRaidCmd('lvmDelete', raidCliCmd, { uuid: uuid });
  }

  // lvm active [-u:uuid] [-n:name] [-d:devId] [-f:force]
  static activeLvm(raidCliCmd: RaidCliCmd, param: fssCmd.ActiveLVMParam): RaidCliCmd {
    return easyRaidCmd('lvmActive', raidCliCmd, param);
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
    return easyRaidCmdWithInject('k8sApiKubectlCreatePv', raidCliCmd, param, (raidcmd:RaidCliCmd) => {

      raidcmd.param['size'] = param.size || '10Gi';
      raidcmd.param['pv_access_modes'] = param.pv_access_modes || 'ReadWriteOnce';
    });
  }

  // kubectl edit pv [-name:name] [-size:size]
  static k8sEditPv(raidCliCmd: RaidCliCmd, param: fssCmd.K8sEditPvParam): RaidCliCmd {
    return easyRaidCmd('k8sApiKubectlEditPv', raidCliCmd, param);
  }

  // kubectl delete pv [name]
  static kubectlDeleteLvm(raidCliCmd: RaidCliCmd, name: string): RaidCliCmd {
    return easyRaidCmd('kubectlDeletePv', raidCliCmd, { name: name });
  }

  // deploy dns [domain] [start] [DNS]
  static k8sApiDeployDns(raidCliCmd: RaidCliCmd, param: fssCmd.DeployDnsParam): RaidCliCmd {
    return easyRaidCmd('k8sApiDeployDns', raidCliCmd, param);
  }

  // deploy notification [server] [port] [sender] [receiver] [account] [password]
  static k8sApiDeployNotification(raidCliCmd: RaidCliCmd, param: fssCmd.k8sApiDeployNotificationParam): RaidCliCmd {
    return easyRaidCmd('k8sApiDeployNotification', raidCliCmd, param);
  }

  // deploy appserver [address]
  static k8sApiDeployAppserver(raidCliCmd: RaidCliCmd, param: fssCmd.k8sApiDeployAppserverParam): RaidCliCmd {
    return easyRaidCmd('k8sApiDeployAppserver', raidCliCmd, param);
  }

  // deploy lbs [start] [end] [domain [password] [node]
  static k8sApiDeployLbs(raidCliCmd: RaidCliCmd, param: fssCmd.DeployLbsParam): RaidCliCmd {
    return easyRaidCmd('k8sApiDeployLbs', raidCliCmd, param);
  }

  // node set ScMgmtIp [-scmgmtIp:scmgmtIp]
  static k8sApiNodeSetScmgmtIp(raidCliCmd: RaidCliCmd, param: fssCmd.K8sNodeSetScmgmtIpParam): RaidCliCmd {
    return easyRaidCmd('k8sApiNodeSetScmgmtIp', raidCliCmd, param);
  }

  // openFileExplorer restful
  static openFileExplorer(raidCliCmd: RaidCliCmd, param: fssCmd.openFileExplorerParam): RaidCliCmd {
    return easyRaidCmd('openFileExplorer', raidCliCmd, param);
  }

  /****************
   * Command Builder (Parallel, Bg)
   ****************/
  static createParallelCommandBuilder(): {
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
  static commandSetV2(params: any, callback: any): void {
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
  static commandSet(params: any, callback: any): void {
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

  /**
  * #set restful [url=url] [body=body] [method=method] [ip=ip] [timeout=timeout]
  * @param url The segment of url without /cmd/api.
  * e.g. If we want to send to https://127.0.0.1:8817/cmd/api/cliJobREST/sendCLI,
  * the url parameter is /cliJobREST/sendCLI
  * @param body It's the data we want to put in the body of request.
  * @param method (Optional) It should be POST, GET, or PUT. Default value is POST.
  * @param ip (Optional) The IP we want to send request to. Default value is 127.0.0.1.
    @param timeout (Optional) The timeout of restful request. Unit is seconds. Default value is 3600.
  */
  static setRestful(raidCliCmd: RaidCliCmd, param: raidCmd.SetRestfulParam): RaidCliCmd {
    raidCliCmd.key = 'restfulApiSend';
    raidCliCmd.param = param;
    return raidCliCmd;
  }

  static setAsBackgroundJob(cmd: RaidCliCmd, bgJobParam: raidCmd.BgJobParam): (RaidCliCmd | undefined) {
    if (!bgJobParam || !bgJobParam.param || !bgJobParam.key) {
      console.error('If this command is a background job. Param & key are required.');
      return ;
    } else if (!bgJobParam.param.Type) {
      console.error('Type is required.');
      return ;
    }
    if (!bgJobParam.param.Target) {
      bgJobParam.param.Target = tool.generateGUID();
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

  /****************
   * Event Emiter
   ****************/
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
  static emitSWEvent(devID: string, refReturn: any, refParam: any, params: any, callback: any): any {
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
          return tool.format('{0},{1},-1,{2}', param.key, param.type || '%s', param.value);
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
}

// ========================
function easyRaidCmd(key: string, raidCliCmd: RaidCliCmd, param: any): RaidCliCmd {
  const raidCmdObj = Object.assign({}, raidCliCmd);
  raidCmdObj.param = Object.assign({}, param);;
  raidCmdObj.key = key;
  return raidCmdObj;
}
function easyRaidCmdWithInject(key: string, raidCliCmd: RaidCliCmd, param: any, injectFunc:(RaidCliCmd)=>void): RaidCliCmd {
  const raidCmdObj = easyRaidCmd(key, raidCliCmd, param);
  injectFunc(raidCmdObj);
  return raidCmdObj;
}
