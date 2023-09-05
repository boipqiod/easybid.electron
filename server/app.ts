import {app, dialog} from "electron";
import AppController from "./src/controllers/AppController";

// electron-updater 모듈 불러오기
import {autoUpdater} from 'electron-updater';

let isAvailableUpdate = false;
autoUpdater.autoDownload = true;

app.on('ready', async () => {
    await autoUpdater.checkForUpdates();
    if(!isAvailableUpdate){
        await AppController.init();
    }
});

// 업데이트 가능 이벤트 처리
autoUpdater.on('update-available', async () => {
    isAvailableUpdate = true;
    // 업데이트 다운로드 알림 표시
    await dialog.showOpenDialog({
        title: '업데이트 확인',
        message: '새로운 업데이트가 있습니다. 다운로드를 시작합니다. \n다운로드 완료 후 자동 재시작됩니다.',
    });
    await autoUpdater.downloadUpdate();
});

// 업데이트 다운로드 완료 이벤트 처리
autoUpdater.on('update-downloaded', async () => {

    // 업데이트 완료 알림 표시
    await dialog.showMessageBox({
        type: 'info',
        title: '업데이트 확인',
        message: '새로운 업데이트가 다운로드되었습니다. 앱이 재시작됩니다.',
        buttons: ['확인']
    });

    // 앱 종료 및 업데이트 설치
    autoUpdater.quitAndInstall(false, true)
});
autoUpdater.on('error', async (error) => {
    // 에러 처리
    await dialog.showMessageBox({
        type: 'error',
        title: '문제 발생',
        message: `에러가 발생했습니다. 다시 시작해주세요. ${error}`,
        buttons: ['예']
    });
    app.relaunch();
});
