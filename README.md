# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 概要
petampのフロントエンド向けsand_box
お好きにいじってもらって！

## ローカルでの流れ

1. `cp sample.env .env`
2. MAPBOX_API_KEY を @hatake511522 に聞いてください
3. `.env` に API_KEY を貼り付けます
4. `npm install`
5. `npm start`

## Rails との接続方法
[https://github.com/hatake511522/petamp_api](PETAMP_API)をローカルで起動してください。
詳しくは↑のREADME参照

### 作業手順

- 作業の開始
1. masterブランチに移動
`git checkout master`
2. gitに上がっている最新版のアプリケーションをダウンロード
`git pull origin master`
3. 適当な名前をつけてブランチを新規作成、作業開始。(すべて小文字、単語と単語の間はアンダースコアで。：スネークケースと言うよ！)
`git checkout -b tekitou_na_namae`

- 作業の終了、githubへのアップロード
1. **add** : `git add -A`
2. **commit** : `git commit -m "○○を追加"`
3. **push** : `git push origin 作業してたブランチ名`
