// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow ,ipcMain, Menu} = require('electron')
const path = require('node:path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: `${__dirname},'./media/favicon/1.ico`,
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  const mainMenu=Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(Main)

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//Menu template
const menu={
 label:'File',
 submenu:{
  label:'Quit',
  click:()=>app.quit(),
  accelerator: 'Ctrl+W'
 } 
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});
ipcMain.on('navigate-back', () => {
  if (mainWindow.webContents.canGoBack()) {
    mainWindow.webContents.goBack();
  }
});

ipcMain.on('navigate-forward', () => {
  if (mainWindow.webContents.canGoForward()) {
    mainWindow.webContents.goForward();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.