const morgan = require('morgan');
const url = require('url');
const uuidAPIKey = require('uuid-apikey');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require("./src/config/db");
dotenv.config();

console.log(uuidAPIKey.create());

const key = {
	apiKey: 'XP1R2ZF-B8XM6VJ-QEES9YK-FVH00HF',
	uuid: 'ed83817d-5a3b-436e-bb9d-94fa7ee20045'
};

/* express app generate */
const express = require('express');
const { resolve } = require('path');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT || 3000, '0.0.0.0');

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // 모든 라우터에 cors 적용

/* 테스트를 위한 게시글 데이터 */
let diaryList = [];
// let numberOfDiary = 0;

/* 라우팅 설정 */
app.get('/', (req, res) => {
  res.send('this is api.js');
});

/* 게시글 API */
app.get('/diary', (req, res) => {
	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM diary", (err, data) => {
			if (err) reject(err);
			resolve(data);
			res.send(data);
		});
	});
});

/* POST */
app.post('/diary', (req, res) => {
	return new Promise((resolve, reject) => {
		const query = "INSERT INTO diary(user_name, date, title, content) VALUES(?, ?, ?, ?);";
		db.query(query, [req.body.user_name, new Date(), req.body.title, req.body.content], (err) => {
			if (err) reject(err);
			resolve({ success: true });
			res.redirect('/diary')
		});
	});
});
/* END POST */

/* PUT */
app.put('/diary/:id', (req, res) => {
  // req.params.id 값 찾아 리스트에서 삭제
	return new Promise((resolve, reject) => {
		const query = `UPDATE diary SET user_name = '${req.body.user_name}', title = '${req.body.title}', content = '${req.body.content}' WHERE id = ${req.params.id};`;
		db.query(query, [req.params.id, req.body.user_name, req.body.title, req.body.content], (err) => {
			if (err) reject(err);
			resolve({ success: true });
			res.redirect('/diary');
		});
	});
});
/* END PUT */

/* DELETE */
app.delete('/diary/:id', (req, res) => {
	// req.params.id 값 찾아 리스트에서 삭제
	return new Promise((resolve, reject) => {
		const query = `DELETE FROM diary WHERE id = ${req.params.id};`;
		db.query(query, [], (err) => {
			if (err) reject(err);
			resolve({ success: true });
			res.redirect('/diary');
		});
	});
});
/* END DELETE */

/* 게시글 검색 API using uuid-key */
app.get('/diary/:type', (req, res) => {
	let { type } = req.params;
	let { apiKey } = req.body.apiKey;
	const queryData = url.parse(req.url, true).query;
	console.log("=====================================");
	console.log(req.body.apiKey);
	console.log("=====================================");
	if (uuidAPIKey.isAPIKey(req.body.apiKey) && uuidAPIKey.check(req.body.apiKey, key.uuid)) {
		if (type === 'search') { // 키워드로 게시글 검색
			return new Promise((resolve, reject) => {
				const keyword = queryData.keyword; // queryData
				const query = `SELECT title FROM diary WHERE LIKE '%${keyword}%' OR content LIKE '%${keyword}%'`
				db.query(query, (err, data) => {
					if(err) reject(err);
					
					res.send(queryData);
				});
			});
		} else {
			res.send('ERROR');
		}
	} else {
		res.send('ERROR!!')
	}

	// if (uuidAPIKey.isAPIKey(apikey) && uuidAPIKey.check(apikey, key.uuid)) {
	// 	if (type === 'search') { // 키워드로 게시글 검색
	// 		const keyword = queryData.keyword;
	// 		const result = diaryList.filter((e) => {
	// 			return e.title.includes(keyword)
	// 		})
	// 		res.send(result);
	// 	} else if (type === 'user') { // 유저 이름으로 게시글 검색
	// 		const user_id = queryData.user_id;
	// 		const result = diaryList.filter((e) => {
	// 			return e.user_id === user_id;
	// 		});
	// 		res.send(result);
	// 	} else {
	// 		res.send('Invalid User.');
	// 	}
	// } else {
	// 	res.send('Invalid API Key.');
	// }
})

/* 서버 포트 연결.. */
app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 서버 실행 중...')
});