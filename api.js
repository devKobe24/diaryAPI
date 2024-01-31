const morgan = require('morgan');
const url = require('url');
const uuidAPIKey = require('uuid-apikey');
const cors = require('cors');

console.log(uuidAPIKey.create());

const key = {
	apiKey: 'XP1R2ZF-B8XM6VJ-QEES9YK-FVH00HF',
	uuid: 'ed83817d-5a3b-436e-bb9d-94fa7ee20045'
};

/* express app generate */
const express = require('express');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT || 3000);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // 모든 라우터에 cors 적용

/* 테스트를 위한 게시글 데이터 */
let diaryList = [];
let numberOfDiary = 0;

/* 라우팅 설정 */
app.get('/', (req, res) => {
  res.send('this is api.js');
});

/* 게시글 API */
app.get('/diary', (req, res) => {
  res.send(diaryList);
});

/* POST */
app.post('/diary', (req, res) => {
  const diary = {
    "id": ++numberOfDiary,
    "user_id": req.body.user_id,
    "date": new Date(),
    "title": req.body.title,
    "content": req.body.content
  };
  diaryList.push(diary);

  res.redirect('/diary');
});
/* END POST */

/* PUT */
app.put('/diary/:id', (req, res) => {
  // req.params.id 값 찾아 리스트에서 삭제
  const findItem = diaryList.find((item) => {
    return item.id == +req.params.id
  });

  const idx = diaryList.indexOf(findItem);
  diaryList.splice(idx, 1);

  // 리스트에 새로운 요소 추가
  const diary = {
		"id": +req.params.id,
		"user_id": req.body.user_id,
		"date": new Date(),
		"title": req.body.title,
		"content": req.body.content
	};
	diaryList.push(diary);

	res.redirect('/diary');
});
/* END PUT */

/* DELETE */
app.delete('/diary/:id', (req, res) => {
	// req.params.id 값 찾아 리스트에서 삭제
	const findItem = diaryList.find((item) => {
		return item.id == + req.params.id
	});
	const idx = diaryList.indexOf(findItem);
	diaryList.splice(idx, 1);

	res.redirect('/diary');
});
/* END DELETE */

/* 게시글 검색 API using uuid-key */
app.get('/diary/:apikey/:type', (req, res) => {
	let { type, apikey } = req.params;
	const queryData = url.parse(req.url, true).query;

	if (uuidAPIKey.isAPIKey(apikey) && uuidAPIKey.check(apikey, key.uuid)) {
		if (type === 'search') { // 키워드로 게시글 검색
			const keyword = queryData.keyword;
			const result = diaryList.filter((e) => {
				return e.title.includes(keyword)
			})
			res.send(result);
		} else if (type === 'user') { // 유저 이름으로 게시글 검색
			const user_id = queryData.user_id;
			const result = diaryList.filter((e) => {
				return e.user_id === user_id;
			});
			res.send(result);
		} else {
			res.send('Invalid User.');
		}
	} else {
		res.send('Invalid API Key.');
	}
})

/* 서버 포트 연결.. */
app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 서버 실행 중...')
});