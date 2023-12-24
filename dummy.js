const { now } = require('moment');
const mqtt = require('mqtt');

// Fungsi untuk membuat data acak dengan timestamp sesuai waktu sekarang
function generateRandomData() {
    const now = new Date();
    return {
        TimeStamp: now.toISOString(),
        ph: parseFloat((Math.random() * (7.5 - 6.5) + 6.5).toFixed(2)),
        tds: parseFloat(Math.floor(Math.random() * 100)),
        tempDs: parseFloat((Math.random() * (30 - 25) + 25).toFixed(2)),
        windDirection: parseFloat((Math.random() * 360).toFixed(1)),
        anemo: parseFloat(Math.floor(Math.random() * 10)),
        infra1: parseFloat(Math.floor(Math.random() * 100)),
        infra2: parseFloat(Math.floor(Math.random() * 100)),
        Berat_1: parseFloat(Math.floor(Math.random() * (7000 - 5000) + 5000)),
        Water_1: parseFloat(Math.floor(Math.random() * 100)),
        Water_2: parseFloat(Math.floor(Math.random() * 100)),
        Water_3: parseFloat(Math.floor(Math.random() * 100)),
        Water_4: parseFloat(Math.floor(Math.random() * 100)),
        Water_5: parseFloat(Math.floor(Math.random() * 100)),
        Water_6: parseFloat(Math.floor(Math.random() * 100)),
        Water_7: parseFloat(Math.floor(Math.random() * 100)),
        Water_8: parseFloat(Math.floor(Math.random() * 100)),
        Water_9: parseFloat(Math.floor(Math.random() * 100)),
        Water_10: parseFloat(Math.floor(Math.random() * 100)),
        Water_11: parseFloat(Math.floor(Math.random() * 100)),
        Water_12: parseFloat(Math.floor(Math.random() * 100)),
        Soil_1: parseFloat((Math.random() * (60 - 50) + 50).toFixed(2)),
        Soil_2: parseFloat((Math.random() * (60 - 50) + 50).toFixed(2)),
        Soil_3: parseFloat((Math.random() * (60 - 50) + 50).toFixed(2)),
        dht: parseFloat(Math.floor(Math.random() * 100)),
        raingauge: parseFloat((Math.random() * (0.00 - 2) + 2).toFixed(2)),
    };
}

// Mendapatkan data acak dan mempublishnya ke MQTT
function publishRandomData() {
    const randomData = generateRandomData();
    const payload = JSON.stringify(randomData);

    const mqttTopic = 'topic/cobadummy';
    const mqttBroker = 'mqtt://vps.isi-net.org:1883';

    // Ganti dengan informasi username dan password yang sesuai
    const mqttOptions = {
        username: 'unila',
        password: 'pwdMQTT@123'
    };

    const client = mqtt.connect(mqttBroker, mqttOptions);

    client.on('connect', () => {
        client.publish(mqttTopic, payload, (err) => {
            if (err) {
                console.error('Error saat mempublikasikan data:', err);
            } else {
                console.log('Data berhasil dipublikasikan:', payload);
            }
            client.end();
        });
    });
}

// Memulai interval untuk mempublish data setiap 10 detik
setInterval(publishRandomData, 10000);
