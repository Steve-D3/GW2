import { useState, useEffect } from "react";
import styles from "../styles/AboutUsPlasticCounter.module.css";

const AboutUsPlasticCounter = () => {
  const [plasticCount, setPlasticCount] = useState(0);

  useEffect(() => {
    const targetCount = 220;
    const countTime = 10;

    let currentCount = 0;

    const interval = setInterval(() => {
      currentCount += 1;
      if (currentCount >= targetCount) {
        clearInterval(interval);
        setPlasticCount(targetCount);
      } else {
        setPlasticCount(Math.floor(currentCount));
      }
    }, countTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles["plastic-counter"]}>
      <p>
        <span>+{plasticCount}</span> million tons{" "}
      </p>{" "}
      <p> plastic waste in 2024</p>
    </div>
  );
};

export default AboutUsPlasticCounter;
