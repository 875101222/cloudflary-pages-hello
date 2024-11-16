import { Suspense } from "react";
import ImageGrid from "@/components/ImageGrid";
import Loading from "@/components/Loading";

export default function PhotoListPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center">照片库</h1>
        <Suspense fallback={<Loading />}>
          <ImageGrid />
        </Suspense>
      </div>
    </main>
  );
} 