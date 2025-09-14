import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Scan, Zap, Shield, CheckCircle } from 'lucide-react';

interface ScanProgressProps {
    isScanning: boolean;
    onComplete: () => void;
}

const scanSteps = [
    { id: 1, label: 'Анализ изображения', icon: Scan, duration: 1000 },
    { id: 2, label: 'Проверка подлинности', icon: Shield, duration: 1500 },
    { id: 3, label: 'ИИ верификация', icon: Zap, duration: 2000 },
    { id: 4, label: 'Формирование отчета', icon: CheckCircle, duration: 500 },
];

export default function ScanProgress({ isScanning, onComplete }: ScanProgressProps) {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (!isScanning) {
            setProgress(0);
            setCurrentStep(0);
            return;
        }

        let totalTime = 0;
        const intervals: NodeJS.Timeout[] = [];

        scanSteps.forEach((step, index) => {
            const timeout = setTimeout(() => {
                setCurrentStep(index);

                // Animate progress for current step
                const stepProgress = ((index + 1) / scanSteps.length) * 100;
                let currentProgress = (index / scanSteps.length) * 100;

                const progressInterval = setInterval(() => {
                    currentProgress += 2;
                    if (currentProgress >= stepProgress) {
                        currentProgress = stepProgress;
                        clearInterval(progressInterval);

                        // If this is the last step, complete the scan
                        if (index === scanSteps.length - 1) {
                            setTimeout(() => {
                                onComplete();
                            }, 500);
                        }
                    }
                    setProgress(currentProgress);
                }, 50);

                intervals.push(progressInterval);
            }, totalTime);

            intervals.push(timeout);
            totalTime += step.duration;
        });

        return () => {
            intervals.forEach(clearTimeout);
        };
    }, [isScanning, onComplete]);

    if (!isScanning) return null;

    return (
        <Card className="p-6 border-scan/20 bg-card/50 backdrop-blur-sm">
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-scan mb-2">Сканирование в процессе</h3>
                    <Progress value={progress} className="w-full h-2" />
                    <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% завершено</p>
                </div>

                <div className="space-y-3">
                    {scanSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <div
                                key={step.id}
                                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${isActive
                                        ? 'bg-scan/10 border border-scan/30'
                                        : isCompleted
                                            ? 'bg-success/10 border border-success/30'
                                            : 'bg-muted/30'
                                    }`}
                            >
                                <Icon
                                    className={`w-5 h-5 ${isActive
                                            ? 'text-scan animate-scan-pulse'
                                            : isCompleted
                                                ? 'text-success'
                                                : 'text-muted-foreground'
                                        }`}
                                />
                                <span
                                    className={`font-medium ${isActive
                                            ? 'text-scan'
                                            : isCompleted
                                                ? 'text-success'
                                                : 'text-muted-foreground'
                                        }`}
                                >
                                    {step.label}
                                </span>
                                {isCompleted && (
                                    <CheckCircle className="w-4 h-4 text-success ml-auto" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
}