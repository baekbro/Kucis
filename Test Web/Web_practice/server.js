const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./views/css'))
app.use(express.static('./views'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'views', 'main.html')); 
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',         
    password: '1111',     
    database: 'signup'    
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connection');
});

app.post('/register', (req, res) => {
    const { Name, email, ID, PassWord } = req.body;

    // 필수 입력 값 확인
    if (!Name || !email || !ID || !PassWord) {
        return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
    }

    // 이메일 형식 확인 (간단한 정규식)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: '유효한 이메일을 입력해주세요.' });
    }

    // 비밀번호 해시 처리
    bcrypt.hash(PassWord, 10, (err, hash) => {
        if (err) {
            console.error('비밀번호 해시 처리 에러:', err);
            return res.status(500).json({ error: '서버 에러. 다시 시도해주세요.' });
        }

        // 사용자 정보 데이터베이스에 삽입
        const sql = 'INSERT INTO user (name, email, ID, PassWord) VALUES (?, ?, ?, ?)';
        db.query(sql, [Name, email, ID, hash], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: '이미 존재하는 사용자입니다.' });
                }
                console.error('DB 삽입 에러:', err);
                return res.status(500).json({ error: '서버 에러. 다시 시도해주세요.' });
            }
            res.status(201).json({ message: '회원가입 성공' });
        });
    });
});
