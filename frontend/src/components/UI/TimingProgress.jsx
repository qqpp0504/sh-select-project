import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";

export default function TimingProgress({
  isShowing,
  timer,
  time,
  onClose,
  className,
  progress,
  setProgress,
}) {
  useEffect(() => {
    if (isShowing) {
      const totalDuration = time;
      const updateInterval = 100;
      const step = (100 / totalDuration) * updateInterval; // 每次更新的進度

      timer.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + step;
          if (newProgress >= 100) {
            clearInterval(timer.current); // 如果進度條滿了，停止計時器
            onClose();
            return 100;
          }

          return newProgress;
        });
      }, updateInterval);

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowing]);

  return <Progress value={progress} className={className} />;
}
