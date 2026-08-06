const API_URL = 'https://script.google.com/macros/s/AKfycbwh7ittmItcMDsBZ2MxqU7Iu75TkoidMF_jsXXICsD-RhXL9IDQ-e_6dRVPFToFoGI/exec';
const API_KEY_PUBLIC = 'boda-publica-2026';
const DEV_MODE = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';

const MOCK_INVITADO = {
    ok: true,
    data: { fila: 2, nombre: 'Ana López', boletosAsignados: 3, boletosConfirmados: 0, estado: 'Pendiente', telefono: '' }
};

let invitadoData = null;