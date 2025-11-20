interface Metric {
    serviceName: string;
    cpu: number;
    memory: number;
    errorRate: number;
    timestamp: number;
}

export const getConfig = (DEFAULT_SERVICE_COUNT: number) => {
    const config: { count: number, services: string[] } = {
        count: DEFAULT_SERVICE_COUNT,
        services: []
    }
    for(let i = 1; i <= DEFAULT_SERVICE_COUNT; i++) {
        config.services.push(`service-${i}`);
    }
    return config;
};

export const generateSnapshot=(DEFAULT_SERVICE_COUNT: number): Metric[] => {
    const now = Date.now();
    const metrics: Metric[] = [];
    for(let i = 1; i <= DEFAULT_SERVICE_COUNT; i++) {
        const metric: Metric = {
            serviceName: `service-${i}`,
            cpu: Math.round(Math.random() * (i+5) + 75),
            memory: Math.round(Math.random() * (i+10) + 90),
            errorRate: Math.round(Math.random() * 15 * 10) / 10,
            timestamp: now
        };
        metrics.push(metric);
    }
    return metrics;
};