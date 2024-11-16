'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Loading from './Loading';

interface Photo {
  id: number;
  url: string;
  title: string;
}

export default function ImageGrid() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver>();
  const lastPhotoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        // 这里替换为你的实际API
        const res = await fetch(`/api/photos?page=${page}&limit=20`);
        const newPhotos = (await res.json()) as Photo[];
        setPhotos(prev => [...prev, ...newPhotos]);
      } catch (error) {
        console.error('加载图片失败:', error);
      }
      setLoading(false);
    };

    fetchPhotos();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (lastPhotoRef.current) {
      observer.observe(lastPhotoRef.current);
    }

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          ref={index === photos.length - 1 ? lastPhotoRef : null}
          className="relative aspect-square overflow-hidden rounded-lg"
        >
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      ))}
      {loading && <Loading />}
    </div>
  );
} 