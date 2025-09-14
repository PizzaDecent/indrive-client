import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Github,
    Mail,
    Code,
    Zap,
    Shield,
    ArrowLeft,
    User,
    Linkedin,
    ExternalLink,
    MapPin,
    Calendar,
    SandwichIcon,
    MousePointer2
} from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <a href="/">
                            <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Назад
                            </button>
                            </a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-green-600/10 border border-green-600/20">
                                <Code className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-foreground">Push - О команде</h1>
                                <p className="text-sm text-muted-foreground">Разработчики ИИ платформы</p>
                            </div>
                        </div>
                        <div className="w-20"></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-6">
                        <h2 className="text-3xl font-bold text-foreground">
                            Команда Push
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Мы создаем передовые ИИ решения для автомобильной диагностики
                        </p>
                    </div>

                    {/* Team Members */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Developer 1 */}
                        <Card className="p-6 bg-gradient-to-br from-green-600/5 to-transparent border-green-600/20 hover:border-green-600/40 transition-all duration-300">
                            <div className="text-center space-y-4">
                                <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-green-600/20 to-green-600/40 flex items-center justify-center border-2 border-green-600/30">
                                    <User className="w-12 h-12 text-green-600" />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                                        <Code className="w-3 h-3 text-white" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-foreground">Stanislav Lavrinovich | Nix Lavr</h3>
                                    <p className="text-green-600 font-medium">Backend & AI Engineer & DevOps</p>
                                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        Петропавлоск, Казахстан
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <p>
                                        Backend Разработчик основных ИИ алгоритмов платформы Push.
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                                        <span className="px-2 py-1 bg-green-600/10 text-green-600 rounded text-xs">Python</span>
                                        <span className="px-2 py-1 bg-green-600/10 text-green-600 rounded text-xs">FastAPI</span>
                                        <span className="px-2 py-1 bg-green-600/10 text-green-600 rounded text-xs">Docker</span>
                                        <span className="px-2 py-1 bg-green-600/10 text-green-600 rounded text-xs">PyTorch</span>
                                    </div>
                                </div>

                                <div className="flex justify-center space-x-3 pt-4">
                                    <a href="https://t.me/lavr_nix">
                                        <Button size="sm" variant="outline" className="text-xs">
                                            <MousePointer2 className="w-3 h-3 mr-1" />
                                            Telegram
                                        </Button>
                                    </a>

                                </div>
                            </div>
                        </Card>

                        {/* Developer 2 */}
                        <Card className="p-6 bg-gradient-to-br from-green-600/5 to-transparent border-green-600/20 hover:border-green-600/40 transition-all duration-300">
                            <div className="text-center space-y-4">
                                <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-green-600/20 to-green-600/40 flex items-center justify-center border-2 border-green-600/30">
                                    <User className="w-12 h-12 text-green-600" />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-600 rounded-full border-2 border-background flex items-center justify-center">
                                        <Zap className="w-3 h-3 text-white" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-foreground">Danil Bessarab</h3>
                                    <p className="text-green-600 font-medium">Full Stack Developer</p>
                                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        Петропавлоск, Казахстан
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <p>
                                        Frontend  разработчик. Создатель пользовательского
                                        интерфейса.
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                                        <span className="px-2 py-1 bg-green-600/10 text-green-600 rounded text-xs">React</span>
                                        <span className="px-2 py-1 bg-green-600/10 text-green-600 rounded text-xs">Node.js</span>
                                        <span className="px-2 py-1 bg-green-600/10 text-green-600 rounded text-xs">TypeScript</span>
                                        <span className="px-2 py-1 bg-green-600/10 text-green-600 rounded text-xs">Docker</span>
                                    </div>
                                </div>
                                <div className="flex justify-center space-x-3 pt-4">
                                    <a href="https://t.me/danilbessarab">
                                        <Button size="sm" variant="outline" className="text-xs">
                                            <MousePointer2 className="w-3 h-3 mr-1" />
                                            Telegram
                                        </Button>
                                    </a>

                                </div>
                            </div>

                        </Card>
                    </div>

                    {/* Project Info Card */}
                    <Card className="p-8 bg-gradient-to-r from-green-600/5 to-green-600/10 border-green-600/20">
                        <div className="text-center space-y-6">
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="p-6 rounded-lg bg-card border border-border hover:border-green-600/30 transition-colors">
                                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                    <h3 className="font-semibold text-foreground mb-2">Безопасность</h3>
                                    <p className="text-sm text-muted-foreground">Защита данных пользователей</p>
                                </div>
                                <div className="p-6 rounded-lg bg-card border border-border hover:border-green-600/30 transition-colors">
                                    <Zap className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                    <h3 className="font-semibold text-foreground mb-2">ИИ технологии</h3>
                                    <p className="text-sm text-muted-foreground">Современные нейросети</p>
                                </div>
                                <div className="p-6 rounded-lg bg-card border border-border hover:border-green-600/30 transition-colors">
                                    <Code className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                    <h3 className="font-semibold text-foreground mb-2">Разработка</h3>
                                    <p className="text-sm text-muted-foreground">Высокое качество кода</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6">
                                <h3 className="text-2xl font-bold text-foreground">О проекте Push</h3>
                                <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                                    Push - это ИИ платформа для анализа автомобильных изображений.
                                    Мы используем передовые технологии машинного обучения для точного
                                    обнаружения автомобильных проблем и помощи механикам в диагностике.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto pt-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">95%</div>
                                    <div className="text-sm text-muted-foreground">Точность</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">10K+</div>
                                    <div className="text-sm text-muted-foreground">Анализов</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">&lt;1s</div>
                                    <div className="text-sm text-muted-foreground">Скорость</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">24/7</div>
                                    <div className="text-sm text-muted-foreground">Доступность</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Journey Timeline */}
                    <Card className="p-6">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-foreground text-center">Наш путь</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600/20 border-2 border-green-600 flex-shrink-0">
                                        <Calendar className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-foreground">2023 - Начало проекта</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Идея создания ИИ для автомобильной диагностики. Исследование рынка и анализ потребностей.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600/20 border-2 border-green-600 flex-shrink-0">
                                        <Code className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-foreground">2024 - Разработка MVP</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Создание первой рабочей версии платформы. Обучение нейронных сетей на первых датасетах.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600/20 border-2 border-green-600 flex-shrink-0">
                                        <Zap className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-foreground">2025 - Запуск в продакшен</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Платформа доступна для широкого использования. Интеграция с автосервисами.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Contact Section */}
                    <div className="text-center space-y-6">
                        <h3 className="text-2xl font-bold text-foreground">Свяжитесь с нами</h3>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Есть вопросы о технологии или предложения по сотрудничеству?
                            Мы всегда открыты для новых идей и партнерства.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button className="bg-green-600 hover:bg-green-700">
                                <Mail className="w-4 h-4 mr-2" />
                                info@push.dev
                            </Button>
                            <a href='https://github.com/PizzaDecent' target="_blank" rel="noopener noreferrer">
                                <Button variant="outline">
                                    <Github className="w-4 h-4 mr-2" />
                                    GitHub
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}