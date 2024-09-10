const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const urls = {
    'cats': ['https://example.com/cats1', 'https://example.com/cats2'],
    'dogs': ['https://example.com/dogs1', 'https://example.com/dogs2']
};

app.get('/api/urls', (req, res) => {
    const keyword = req.query.keyword;
    const data = urls[keyword] || [];
    res.json(data);
});

app.get('/api/download', (req, res) => {
    const url = req.query.url;
    if (!url) {
        res.status(400).json({ error: 'Missing URL parameter' });
    }
    
    res.json({ message: 'Downloading content...' });
    // Code to download content from the provided URL and save it
    // For the sake of simplicity, I'm skipping the actual download logic here
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Статический файл для клиентской части
app.use(express.static('public'));

app.get('/api/view-file', (req, res) => {
    const fileName = req.query.fileName;
    // Чтение содержимого файла с именем fileName
    // Например, можно использовать модуль fs для чтения содержимого файла
    res.send(`Содержимое файла ${fileName}`);
});

// Добавляем обработчик POST запроса для удаления файла
app.delete('/api/delete', (req, res) => {
    const fileName = req.query.fileName;
    if (!fileName) {
        return res.status(400).json({ error: 'Missing fileName parameter' });
    }

    const filePath = path.join(__dirname, 'public', fileName);
    fs.unlink(filePath, (error) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to delete the file' });
        }
        
        res.json({ message: 'File deleted successfully' });
    });
});

// Добавляем обработчик GET запроса для скачивания файла
app.get('/api/download', (req, res) => {
    const url = req.query.url;
    if (!url) {
        res.status(400).json({ error: 'Missing URL parameter' });
    }
    
    // Здесь должен быть код для скачивания файла по URL и сохранения его на сервере
    // Для простоты примера опустим эту часть и просто вернем сообщение об успешном скачивании
    res.json({ message: 'File downloaded successfully' });
});


app.get('/api/download', (req, res) => {
    const fileUrl = req.query.url;
    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

    // Здесь должен быть ваш код для загрузки файла по URL и сохранения его на сервере

    res.json({ success: true, fileName: fileName });
});


app.delete('/api/delete-file', (req, res) => {
    const fileName = req.query.fileName;
    if (!fileName) {
        return res.status(400).json({ error: 'Missing fileName parameter' });
    }

    const filePath = path.join(__dirname, 'public', fileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete the file' });
        }
      
        res.json({ message: 'File has been deleted successfully' });
    });
});


