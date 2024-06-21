# Raid-Cli-API

This Project is meant to be a shared submodule for EonOne-UI and any project that use raidCmd.


## 環境建置 (for EonOne-UI)

EonOne-UI has dependancy on this project, so you need to copy or link the files into EonOne-UI projects:

    git clone http://swcodeserver.infortrend.com/SW_Team/raidcliapi.git
    git clone http://swcodeserver.infortrend.com/phase3/EonOne-ui.git
    cd EonOne-ui
    npm install
    npm run cli

Now, the scripts will copy those files for you.

But, if you are working on your local workspace, and you don't want to copy everytime you change something, then you can choose to create a symbolic link between these project.

## 建立 Symbolic Link

在 Windows 環境, 你會需要執行以下步驟來建立symbolic link

    1. 使用 admin 權限開啟 CMD.
    2. 執行以下 command:
    
    mklink /D <(EonOne-UI 的根目錄路徑)/src/app/shared/raidCmdApi> <(RaidCliAPI 的根目錄路徑)> 

這樣一來，只要 EonOne-UI 就會指到 RaidCliSerivce 的目錄下，不用再執行 npm run cli 去複製檔案了。