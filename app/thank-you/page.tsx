import { Suspense } from "react";
import Render from "./render";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>جارٍ تحميل بيانات الطلب...</div>}>
      <Render />
    </Suspense>
  );
}
