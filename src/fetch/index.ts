import type { InterestEvent } from "../types";

const previewElement = document.querySelector<HTMLElement>(".preview");
const previewImageElement = previewElement?.querySelector<HTMLImageElement>(".ogpImage");
const previewTitleElement = previewElement?.querySelector<HTMLHeadingElement>(".ogpTitle");
const previewDescriptionElement =
  previewElement?.querySelector<HTMLParagraphElement>(".ogpDescription");

// 各リンクにユニークなanchor-nameを設定
const links = document.querySelectorAll<HTMLAnchorElement>('a[interestfor="preview"]');
links.forEach((link, index) => {
  link.style.anchorName = `--anchor-${index}`;
});

previewElement?.addEventListener("interest", async (event: InterestEvent) => {
  const sourceElement = event.source as HTMLAnchorElement;
  const url = sourceElement.href;

  // プレビュー要素を現在のリンクにアンカー
  if (previewElement) {
    previewElement.style.positionAnchor = sourceElement.style.anchorName;
  }

  const response = await fetch(url);
  const html = await response.text();

  // DOMParserでHTMLをパース
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // タイトルを取得（og:title → titleタグ）
  const title = doc.querySelector(`meta[property="og:title"]`)?.getAttribute("content") || "";

  // 説明を取得（og:description → meta description）
  const description =
    doc.querySelector(`meta[property="og:description"]`)?.getAttribute("content") || "";

  // 画像を取得（og:image）
  const image = doc.querySelector(`meta[property="og:image"]`)?.getAttribute("content") || "";

  if (previewElement && previewImageElement && previewTitleElement && previewDescriptionElement) {
    previewImageElement.src = image;
    previewTitleElement.textContent = title;
    previewDescriptionElement.textContent = description;

    // OGPデータの取得が完了したらプレビューを表示
    previewElement?.showPopover?.();
  }
});

previewElement?.addEventListener("loseinterest", async () => {
  if (previewElement && previewImageElement && previewTitleElement && previewDescriptionElement) {
    // プレビューを非表示
    previewElement?.hidePopover?.();

    // アニメーションを待つために250ms待つ
    await new Promise((resolve) => setTimeout(resolve, 250));
    // データをクリア
    previewImageElement.src = "";
    previewTitleElement.textContent = "";
    previewDescriptionElement.textContent = "";
  }
});
