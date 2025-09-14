
import { useState } from 'react';
import { Scan, Shield, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ImageUploader from '@/components/ImageUploader';
import ScanProgress from '@/components/ScanProgress';
import ScanResults, { ScanResult, Detection } from '@/components/ScanResults';

export default function Index() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = (file: File) => {
        const url = URL.createObjectURL(file);
        setUploadedImage(url);
        setUploadedFile(file);
        setScanResult(null);
        setError(null);
        setIsScanning(true);
    };

    const handleScanComplete = async () => {
        if (!uploadedFile || !uploadedImage) {
            setError('Файл не найден');
            setIsScanning(false);
            return;
        }

        try {
            const startTime = Date.now();

            // Prepare form data for API
            const formData = new FormData();
            formData.append('file', uploadedFile);

            // Call the dental API
            const response = await fetch('https://dentapi.nixlavr.ru/predict', {
                method: 'POST',
                body: formData,
                headers: {
                    'accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const detections: Detection[] = await response.json();
            const processingTime = Date.now() - startTime;

            const result: ScanResult = {
                detections: detections || [],
                imageUrl: uploadedImage,
                processingTime
            };

            setScanResult(result);
            setError(null);
        } catch (err) {
            console.error('API Error:', err);
            setError(err instanceof Error ? err.message : 'Произошла ошибка при анализе изображения');

            // Fallback to mock data for demo purposes
            const mockResult: ScanResult = {
                detections: [
                    {
                        type: 'broken_part',
                        confidence: 53.61,
                        box: [207.32, 29.64, 294.54, 60.52],
                        area: 2692.99
                    }
                ],
                imageUrl: uploadedImage,
                processingTime: 1500
            };
            setScanResult(mockResult);
        } finally {
            setIsScanning(false);
        }
    };

    const handleNewScan = () => {
        setUploadedImage(null);
        setUploadedFile(null);
        setScanResult(null);
        setIsScanning(false);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-scan/10 border border-scan/20">
                                <Scan className="w-6 h-6 text-scan" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-foreground">Push</h1>
                                <p className="text-sm text-muted-foreground">ИИ анализ автомобильных изображений</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/about">
                                <Button variant="ghost" size="sm">
                                    <Users className="w-4 h-4 mr-2" />
                                    О команде
                                </Button>
                            </Link>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Shield className="w-4 h-4 text-scan" />
                                <span>Защищено</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Zap className="w-4 h-4 text-scan" />
                                <span>ИИ анализ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Hero Section */}
                    {!uploadedImage && !scanResult && (
                        <div className="text-center space-y-6 py-12">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold text-foreground">
                                    ИИ анализ автомобильных изображений
                                </h2>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                    Загрузите фото автомобиля для автоматического обнаружения
                                    повреждений, и других проблем с помощью ИИ.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                                <div className="p-6 rounded-lg bg-card border border-border">
                                    <Shield className="w-8 h-8 text-scan mx-auto mb-3" />
                                    <h3 className="font-semibold text-foreground mb-2">Точность</h3>
                                    <p className="text-sm text-muted-foreground">Высокоточное обнаружение  проблем</p>
                                </div>
                                <div className="p-6 rounded-lg bg-card border border-border">
                                    <Zap className="w-8 h-8 text-scan mx-auto mb-3" />
                                    <h3 className="font-semibold text-foreground mb-2">Скорость</h3>
                                    <p className="text-sm text-muted-foreground">Мгновенный анализ изображений</p>
                                </div>
                                <div className="p-6 rounded-lg bg-card border border-border">
                                    <Scan className="w-8 h-8 text-scan mx-auto mb-3" />
                                    <h3 className="font-semibold text-foreground mb-2">Детализация</h3>
                                    <p className="text-sm text-muted-foreground">Точное определение областей повреждений</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Display */}
                    {error && (
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
                            <p className="font-medium">Ошибка анализа:</p>
                            <p className="text-sm">{error}</p>
                            <p className="text-xs mt-2 text-muted-foreground">Показан демонстрационный результат</p>
                        </div>
                    )}

                    {/* Upload Section */}
                    {!scanResult && (
                        <ImageUploader
                            onImageUpload={handleImageUpload}
                            isScanning={isScanning}
                        />
                    )}

                    {/* Progress Section */}
                    {isScanning && (
                        <ScanProgress
                            isScanning={isScanning}
                            onComplete={handleScanComplete}
                        />
                    )}

                    {/* Results Section */}
                    {scanResult && uploadedImage && (
                        <ScanResults
                            result={scanResult}
                            imageUrl={uploadedImage}
                            onNewScan={handleNewScan}
                        />
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border bg-card/30 mt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                            <Scan className="w-5 h-5 text-scan" />
                            <span className="font-semibold text-foreground">Push</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            ИИ технологии для автомобильной диагностики
                        </p>
                        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                            <Link to="/about" className="hover:text-scan transition-colors">О команде</Link>
                            <span>•</span>
                            <span>Конфиденциальность</span>
                            <span>•</span>
                            <span>Безопасность</span>
                            <span>•</span>
                            <span>Поддержка</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}