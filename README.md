# webcam-switch-test
webcam切り替えのサンプル

## memo
- `navigator.mediaDevices.enumerateDevices()` でカメラ等のデバイスを取得できる
  - https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/enumerateDevices#browser_compatibility
- `navigator.mediaDevices.getUserMedia(constraints)` でstreamを取得できる
  - https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/getUserMedia

## wasm
基本的には https://rustwasm.github.io/docs/book/game-of-life/setup.html に従う

cargo generateのインストール後、テンプレートのクローンを作成する

wasm用にビルドする
`wasm-pack build --target web`
