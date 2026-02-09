
let isWaiting = false;

const previewElement = document.querySelector(".preview");
const previewImageElement = previewElement?.querySelector(".ogpImage");
const previewTitleElement = previewElement?.querySelector(".ogpTitle");
const previewDescriptionElement =
  previewElement?.querySelector(".ogpDescription");

previewElement?.addEventListener("interest", async (event) => {
  const sourceElement = event.source;
  const url = sourceElement.href;

  // プレビュー要素を現在のリンクにアンカー
  if (previewElement) {
    previewElement.style.positionAnchor = sourceElement.style.anchorName;
  }
  isWaiting = false;
  const response = await fetch(url);
  const html = await response.text();

  // DOMParserでHTMLをパース
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // タイトルを取得（og:title）
  const title = doc.querySelector(`meta[property="og:title"]`)?.getAttribute("content") ?? "";

  // 説明を取得（og:description）
  const description =
    doc.querySelector(`meta[property="og:description"]`)?.getAttribute("content") ?? "";

  // 画像を取得（og:image）
  const image = doc.querySelector(`meta[property="og:image"]`)?.getAttribute("content") ?? "";

  // 画像の読み込みが完了するまで待つ
  await awaitImageLoad(image);
  previewImageElement.src = image;
  previewTitleElement.textContent = title;
  previewDescriptionElement.textContent = description;

  // OGPデータの取得が完了したらプレビューを表示
  previewElement?.showPopover?.();
});

previewElement?.addEventListener("loseinterest", async () => {
  isWaiting = true;
  // アニメーションを待つために250ms待つ
  await new Promise((resolve) => setTimeout(resolve, 250));

  // プレビューを非表示
  if (isWaiting) {
    // データをクリア
    previewImageElement.src = "";
    previewTitleElement.textContent = "";
    previewDescriptionElement.textContent = "";
    previewElement?.hidePopover?.();
    isWaiting = false;
  }
});

const awaitImageLoad = async (image) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      return resolve();
    };
    img.src = image;
  });
};
