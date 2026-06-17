"use client";

import { useRef, useState } from "react";

type Lang = "en" | "vi" | "zh";

const translations: Record<
  Lang,
  {
    tagline: string;
    takePhoto: string;
    upload: string;
    explain: string;
    chooseAnother: string;
    comingSoon: string;
    disclaimer: string;
  }
> = {
  en: {
    tagline:
      "Take a photo of a Japanese government document and understand what it is, when it's due, and what to do — in your own language.",
    takePhoto: "📷 Take a photo",
    upload: "📂 Upload an image",
    explain: "✨ Explain this document",
    chooseAnother: "Choose another image",
    comingSoon: "AI analysis coming soon",
    disclaimer:
      "This is reference information only. Please confirm important matters with your local government office.",
  },
  vi: {
    tagline:
      "Chụp ảnh giấy tờ hành chính của Nhật và hiểu đó là gì, hạn nộp khi nào và cần làm gì — bằng ngôn ngữ của bạn.",
    takePhoto: "📷 Chụp ảnh",
    upload: "📂 Tải ảnh lên",
    explain: "✨ Giải thích giấy tờ này",
    chooseAnother: "Chọn ảnh khác",
    comingSoon: "Tính năng phân tích AI sắp ra mắt",
    disclaimer:
      "Đây chỉ là thông tin tham khảo. Vui lòng xác nhận các vấn đề quan trọng với cơ quan hành chính địa phương.",
  },
  zh: {
    tagline:
      "拍下日本政府的文件，用您的母语了解它是什么、截止日期是什么时候、以及需要做什么。",
    takePhoto: "📷 拍照",
    upload: "📂 上传图片",
    explain: "✨ 解释这份文件",
    chooseAnother: "选择其他图片",
    comingSoon: "AI 分析功能即将推出",
    disclaimer: "此为参考信息。重要事项请向当地政府部门确认。",
  },
};

const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "vi", label: "VI" },
  { code: "zh", label: "中" },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [image, setImage] = useState<string | null>(null);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const t = translations[lang];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);

    // Reset so selecting the same file again still fires onChange.
    e.target.value = "";
  };

  return (
    <div className="flex flex-1 flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4">
        <span className="text-xl font-bold text-blue-600">Easy Japan</span>
        <div className="flex gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`min-w-9 rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                lang === code
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-8">
        <div className="w-full max-w-sm">
          <p className="mb-8 text-center text-base leading-relaxed text-slate-600">
            {t.tagline}
          </p>

          {/* Hidden inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={uploadInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />

          {image === null ? (
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-5 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 active:bg-blue-800"
              >
                {t.takePhoto}
              </button>
              <button
                type="button"
                onClick={() => uploadInputRef.current?.click()}
                className="text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-blue-600 hover:underline"
              >
                {t.upload}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Selected document preview"
                className="max-h-80 w-full rounded-2xl object-contain shadow-md ring-1 ring-slate-200"
              />
              <button
                type="button"
                onClick={() => alert(t.comingSoon)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-5 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 active:bg-blue-800"
              >
                {t.explain}
              </button>
              <button
                type="button"
                onClick={() => setImage(null)}
                className="text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-blue-600 hover:underline"
              >
                {t.chooseAnother}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer disclaimer */}
      <footer className="px-5 py-5">
        <p className="mx-auto max-w-sm text-center text-xs leading-relaxed text-slate-400">
          ⚠️ {t.disclaimer}
        </p>
      </footer>
    </div>
  );
}
