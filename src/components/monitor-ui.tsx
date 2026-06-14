import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FRAME_DROP_THRESHOLD = 1000 / 45;

const MonitorUI = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
    const lastFrameTime = useRef<number | null>(null);
    const frameTimes = useRef<number[]>([]);
    const frameDrops = useRef(0);
    const worstFrame = useRef(0);
    const jsBlocked = useRef(false);

    const [uiData, setUiData] = useState({
        fps: 0,
        frameDrops: 0,
        jsBlocked: false,
        p50: 0,
        p95: 0,
        worst: 0,
    });


    useEffect(() => {
        let rafId: number;

        const loop = (time: number) => {
            if (lastFrameTime.current != null) {
                const delta = time - lastFrameTime.current;

                frameTimes.current.push(delta);

                if (frameTimes.current.length > 300) {
                    frameTimes.current.shift();
                }

                if (delta > FRAME_DROP_THRESHOLD) {
                    frameDrops.current += 1;
                }

                if (delta > worstFrame.current) {
                    worstFrame.current = delta;
                }
            }

            lastFrameTime.current = time;
            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(rafId);
    }, []);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const check = () => {
            const start = Date.now();

            timeout = setTimeout(() => {
                const drift = Date.now() - start;
                jsBlocked.current = drift > 100;
                check();
            }, 50);
        };

        check();

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const frames = [...frameTimes.current];

            if (frames.length === 0) return;

            const sorted = [...frames].sort((a, b) => a - b);

            const p50 = sorted[Math.floor(sorted.length * 0.5)];
            const p95 = sorted[Math.floor(sorted.length * 0.95)];

            const avgFrame =
                frames.reduce((sum, f) => sum + f, 0) / frames.length;

            const fps = Math.round(1000 / avgFrame);

            setUiData({
                fps,
                frameDrops: frameDrops.current,
                jsBlocked: jsBlocked.current,
                p50: Math.round(p50),
                p95: Math.round(p95),
                worst: Math.round(worstFrame.current),
            });
        }, 500); // update UI every 500ms

        return () => clearInterval(interval);
    }, []);

    if (!open) return null;

    return (
        <View style={styles.overlay} pointerEvents="none">
            <View style={styles.container} pointerEvents="none">
                <Text style={styles.text}>FPS: {uiData.fps}</Text>
                <Text style={styles.text}>
                    Frame Drops: {uiData.frameDrops}
                </Text>
                <Text style={styles.text}>
                    JS Thread: {uiData.jsBlocked ? 'BLOCKED ⚠️' : 'OK'}
                </Text>

                <Text style={styles.text}>
                    p50: {uiData.p50} ms
                </Text>
                <Text style={styles.text}>
                    p95: {uiData.p95} ms
                </Text>
                <Text style={styles.text}>
                    Worst: {uiData.worst} ms
                </Text>
            </View>
        </View>
    );
};

export default MonitorUI;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        width: '100%',
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFill,
        zIndex: 9999,
    },
    text: {
        color: '#00FFAA',
        fontSize: 14,
        fontFamily: 'monospace',
    },
});