const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Crea la ventana del navegador
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Se recomienda desactivar la integración con Node para mayor seguridad
      nodeIntegration: false,
      contextIsolation: true,
      // Si necesitas usar alguna API de Node en el renderizador, consulta la documentación
    }
  });

  // Cargar el index.html generado por Angular
  // Nota: Ajusta la ruta de acuerdo al nombre de tu carpeta de build
  win.loadFile(path.join(__dirname, 'dist/quiz-csa-front/index.html'));

  // Opcional: Abre las DevTools en modo desarrollo
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // En macOS es común reabrir la ventana cuando se hace clic en el icono del dock
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Cierra la aplicación cuando se cierran todas las ventanas, excepto en macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
