import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Download,
    Share2,
    RotateCcw,
    Shield,
    Zap,
    Eye,
    Target
} from 'lucide-react';
import { useRef, useEffect } from 'react';

export interface Detection {
    type: string;
    confidence: number;
    box: [number, number, number, number]; // [x1, y1, x2, y2]
    area: number;
}

export interface ScanResult {
    detections: Detection[];
    imageUrl: string;
    processingTime?: number;
}

interface ScanResultsProps {
    result: ScanResult;
    imageUrl: string;
    onNewScan: () => void;
}

const getDetectionTypeInfo = (type: string) => {
    switch (type) {
        case 'broken_part':
            return {
                label: 'Поврежденная часть',
                color: 'text-red-500',
                bgColor: 'bg-red-500/10',
                borderColor: 'border-red-500/30',
                description: 'Обнаружено повреждение зуба'
            };
        case 'scratch':
            return {
                label: 'Царапена',
                color: 'text-orange-500',
                bgColor: 'bg-orange-500/10',
                borderColor: 'border-orange-500/30',
                description: 'Обнаружен царапена'
            };
        case 'filling':
            return {
                label: 'Пломба',
                color: 'text-blue-500',
                bgColor: 'bg-blue-500/10',
                borderColor: 'border-blue-500/30',
                description: 'Обнаружена пломба'
            };
        default:
            return {
                label: type,
                color: 'text-yellow-500',
                bgColor: 'bg-yellow-500/10',
                borderColor: 'border-yellow-500/30',
                description: 'Обнаружена аномалия'
            };
    }
};

export default function ScanResults({ result, imageUrl, onNewScan }: ScanResultsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const drawDetections = () => {
            const canvas = canvasRef.current;
            const image = imageRef.current;

            if (!canvas || !image || !result.detections.length) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Set canvas size to match image
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw bounding boxes
            result.detections.forEach((detection, index) => {
                const [x1, y1, x2, y2] = detection.box;
                const width = x2 - x1;
                const height = y2 - y1;

                // Set colors based on detection type
                const colors = {
                    'broken_part': '#ef4444',
                    'cavity': '#f97316',
                    'filling': '#3b82f6'
                };
                const color = colors[detection.type as keyof typeof colors] || '#eab308';

                // Draw bounding box
                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                ctx.strokeRect(x1, y1, width, height);

                // Draw semi-transparent fill
                ctx.fillStyle = color + '20';
                ctx.fillRect(x1, y1, width, height);

                // Draw label background
                const label = `${getDetectionTypeInfo(detection.type).label} (${detection.confidence.toFixed(1)}%)`;
                ctx.font = '14px Arial';
                const textMetrics = ctx.measureText(label);
                const textWidth = textMetrics.width;
                const textHeight = 20;

                ctx.fillStyle = color;
                ctx.fillRect(x1, y1 - textHeight - 5, textWidth + 10, textHeight + 5);

                // Draw label text
                ctx.fillStyle = 'white';
                ctx.fillText(label, x1 + 5, y1 - 8);

                // Draw detection number
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x1 + width - 15, y1 + 15, 12, 0, 2 * Math.PI);
                ctx.fill();

                ctx.fillStyle = 'white';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText((index + 1).toString(), x1 + width - 15, y1 + 19);
                ctx.textAlign = 'left';
            });
        };

        if (imageRef.current?.complete) {
            drawDetections();
        } else if (imageRef.current) {
            imageRef.current.onload = drawDetections;
        }
    }, [result.detections]);

    const hasDetections = result.detections && result.detections.length > 0;
    const totalConfidence = hasDetections
        ? Math.round(result.detections.reduce((sum, d) => sum + d.confidence, 0) / result.detections.length)
        : 0;

    return (
        <div className="space-y-6">
            {/* Main Result Card */}
            <Card className={`p-6 ${hasDetections ? 'bg-red-500/10 border-red-500/30' : 'bg-success/10 border-success/30'} border-2`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        {hasDetections ? (
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        ) : (
                            <CheckCircle className="w-8 h-8 text-success" />
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-foreground">
                                {hasDetections ? 'Обнаружены проблемы' : 'Проблем не обнаружено'}
                            </h3>
                            <p className="text-muted-foreground">
                                {hasDetections
                                    ? `Найдено ${result.detections.length} проблем(ы)`
                                    : 'Изображение выглядит нормально'
                                }
                            </p>
                        </div>
                    </div>
                    {hasDetections && (
                        <Badge variant="outline" className="text-red-500 border-current">
                            {totalConfidence}% уверенность
                        </Badge>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Image with Detections */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center">
                            <Eye className="w-4 h-4 mr-2" />
                            Проанализированное изображение
                        </h4>
                        <div className="relative rounded-lg overflow-hidden border border-border">
                            <img
                                ref={imageRef}
                                src={imageUrl}
                                alt="Analyzed dental image"
                                className="w-full h-auto object-contain bg-gray-900"
                                crossOrigin="anonymous"
                            />
                            <canvas
                                ref={canvasRef}
                                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                                style={{ mixBlendMode: 'normal' }}
                            />
                        </div>
                    </div>

                    {/* Detection Details */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center">
                            <Target className="w-4 h-4 mr-2" />
                            Детали обнаружения
                        </h4>

                        {hasDetections ? (
                            <div className="space-y-3 max-h-80 overflow-y-auto">
                                {result.detections.map((detection, index) => {
                                    const typeInfo = getDetectionTypeInfo(detection.type);
                                    return (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg border ${typeInfo.bgColor} ${typeInfo.borderColor}`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <div className={`w-6 h-6 rounded-full ${typeInfo.color.replace('text-', 'bg-')} text-white text-xs flex items-center justify-center font-bold`}>
                                                        {index + 1}
                                                    </div>
                                                    <span className="font-medium text-foreground">{typeInfo.label}</span>
                                                </div>
                                                <Badge variant="outline" className={`${typeInfo.color} border-current text-xs`}>
                                                    {detection.confidence.toFixed(1)}%
                                                </Badge>
                                            </div>

                                            <p className="text-sm text-muted-foreground mb-3">
                                                {typeInfo.description}
                                            </p>

                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div>
                                                    <span className="text-muted-foreground">Область:</span>
                                                    <span className="ml-1 font-medium">{Math.round(detection.area)} px²</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Позиция:</span>
                                                    <span className="ml-1 font-medium">
                                                        ({Math.round(detection.box[0])}, {Math.round(detection.box[1])})
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-6 text-center">
                                <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                                <p className="text-muted-foreground">
                                    ИИ анализ не выявил видимых проблем на данном изображении
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {/* Analysis Summary */}
            <Card className="p-6">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Сводка анализа
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-scan">{result.detections.length}</div>
                        <div className="text-sm text-muted-foreground">Обнаружений</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-scan">{totalConfidence}%</div>
                        <div className="text-sm text-muted-foreground">Ср. уверенность</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-scan">
                            {result.processingTime ? `${result.processingTime}ms` : '<1s'}
                        </div>
                        <div className="text-sm text-muted-foreground">Время анализа</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-scan flex items-center justify-center">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div className="text-sm text-muted-foreground">ИИ анализ</div>
                    </div>
                </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
                <Button onClick={onNewScan} className="bg-scan hover:bg-scan-dark">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Новый анализ
                </Button>
                <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Скачать отчет
                </Button>
                <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Поделиться результатами
                </Button>
            </div>
        </div>
    );
}