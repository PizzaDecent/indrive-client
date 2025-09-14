import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
    isScanning: boolean;
}

export default function ImageUploader({ onImageUpload, isScanning }: ImageUploaderProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));

        if (imageFile) {
            onImageUpload(imageFile);
        }
    }, [onImageUpload]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onImageUpload(file);
        }
    }, [onImageUpload]);

    return (
        <Card className="p-8">
            <div
                className={`upload-area rounded-lg p-12 text-center transition-all duration-300 ${isDragOver ? 'drag-over' : ''
                    } ${isScanning ? 'pointer-events-none opacity-50' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 rounded-full bg-scan/10 border border-scan/20">
                        {isScanning ? (
                            <ImageIcon className="w-12 h-12 text-scan animate-scan-pulse" />
                        ) : (
                            <Upload className="w-12 h-12 text-scan" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">
                            {isScanning ? 'Анализ изображения...' : 'Загрузите автомобильное изображение'}
                        </h3>
                        <p className="text-muted-foreground">
                            {isScanning
                                ? 'Пожалуйста, подождите пока идет ИИ анализ'
                                : 'Перетащите фото сюда или нажмите для выбора'
                            }
                        </p>
                    </div>

                    {!isScanning && (
                        <div className="flex flex-col items-center space-y-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="file-upload"
                                disabled={isScanning}
                            />
                            <label
                                htmlFor="file-upload"
                                className="px-6 py-3 bg-scan hover:bg-scan-dark text-white rounded-lg cursor-pointer transition-colors duration-200 font-medium"
                            >
                                Выбрать изображение
                            </label>
                            <p className="text-sm text-muted-foreground">
                                Поддерживаются: JPG, PNG, GIF, WebP
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}